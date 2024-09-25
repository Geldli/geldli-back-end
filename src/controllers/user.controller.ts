import { prisma } from "../server";
import express, { Express, Request, Response } from "express";
import { createHash } from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../interfaces/authenticateToken.interfaces";

dotenv.config();

const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.usuario.create({
      data: {
        username: data.username,
        nome: data.name,
        sobrenome: data.surname,
        email: data.email,
        senha: createHash("sha512").update(data.password).digest("hex"),
      },
    });
    res.status(200).json({ registrationSuccessful: true });
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const get = await prisma.usuario.findMany();
    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const getUserByUsernameOrEmail = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.usuario.findFirst({
      where: {
        OR: [
          {
            username: data.login,
          },
          {
            email: data.login,
          },
        ],
      },
      select: {
        username: true,
        email: true,
      },
    });
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const get = await prisma.usuario.findUnique({
      where: {
        id: parseInt(req.user!.userId),
      },
      select: {
        username: true,
        nome: true,
        sobrenome: true,
        email: true,
        foto: true,
      },
    });
    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const userExists = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.usuario.findFirst({
      where: {
        OR: [
          {
            username: data.login,
          },
          {
            email: data.login,
          },
        ],
      },
      select: {
        username: true,
        email: true,
      },
    });
    if (post !== null) {
      res.status(200).json({ userExists: true });
    } else {
      res.status(200).json({ userExists: false });
    }
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const tryLogin = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.usuario.findFirst({
      where: {
        AND: [
          {
            OR: [
              {
                username: data.login,
              },
              {
                email: data.login,
              },
            ],
          },
          {
            senha: createHash("sha512").update(data.password).digest("hex"),
          },
        ],
      },
      select: {
        id: true,
        username: true,
        nome: true,
        sobrenome: true,
        email: true,
        foto: true,
      },
    });

    if (post !== null) {
      const options = {
        secure: false, // TODO change this on deploy to production
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 15,
        domain: "localhost",
      };

      res.cookie(
        "authToken",
        jwt.sign({ userId: post.id }, process.env.JWT_SECRET as string),
        options
      );

      //res.cookie("userId", post.id, options);

      res.status(200).json({ loginSuccessful: true });
    } else {
      res.status(200).json({ loginSuccessful: false });
    }
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const put = await prisma.usuario.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        senha: data.password,
      },
    });
    res.status(200).json(put);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    await prisma.ativo.deleteMany({
      where: {
        idUsuario: parseInt(req.params.id),
      },
    });

    await prisma.despesa.deleteMany({
      where: {
        idUsuario: parseInt(req.params.id),
      },
    });

    await prisma.despesaContinua.deleteMany({
      where: {
        idUsuario: parseInt(req.params.id),
      },
    });

    await prisma.ativoContinuo.deleteMany({
      where: {
        idUsuario: parseInt(req.params.id),
      },
    });

    await prisma.categoriaAtivo.deleteMany({
      where: {
        idUsuario: parseInt(req.params.id),
      },
    });

    await prisma.categoriaDespesa.deleteMany({
      where: {
        idUsuario: parseInt(req.params.id),
      },
    });

    const del = await prisma.usuario.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(200).json(del);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

export default {
  createUser,
  getAllUsers,
  getUserByUsernameOrEmail,
  userExists,
  getUserById,
  tryLogin,
  updateUser,
  deleteUser,
};
