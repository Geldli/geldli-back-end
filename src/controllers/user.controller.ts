import { prisma } from "../server";
import express, { Express, Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.usuario.create({
      data: {
        nome: data.name,
        email: data.email,
        senha: data.password,
      },
    });
    res.status(200).json(post);
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
  updateUser,
  deleteUser,
};
