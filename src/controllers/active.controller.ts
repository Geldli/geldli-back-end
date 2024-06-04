import { prisma } from "../server";
import express, { Express, Request, Response } from "express";

// res.status(500).json({ Error: e });

const createActive = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.ativo.create({
      data: {
        data: new Date(),
        valor: data.valor,
        nome: data.nome,
        descricao: data.descricao,
        idCategoria: data.idCategoria,
        idUsuario: data.idUsuario,
      },
    });

    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const getAllActives = async (req: Request, res: Response) => {
  try {
    const get = await prisma.ativo.findMany();
    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

// econtra o ativo com id X
const getActiveById = async (req: Request, res: Response) => {
  try {
    const get = await prisma.ativo.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

//encontra os ativos do usuario X
const getActiveByUserId = async (req: Request, res: Response) => {
  try {
    const get = await prisma.ativo.findMany({
      where: {
        idUsuario: parseInt(req.params.id),
      },
    });

    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

// encontra os ativos do usuario X com categoria Y
const getActiveByUserCategory = async (req: Request, res: Response) => {
  try {
    const get = await prisma.ativo.findMany({
      where: {
        idUsuario: parseInt(req.params.idUsuario),
        idCategoria: req.params.categoria,
      },
    });
    res.json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const updateActive = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const put = await prisma.ativo.update({
      where: {
        id: data.id,
      },
      data: {
        valor: data.valor,
        nome: data.nome,
        descricao: data.descricao,
        idCategoria: data.idCategoria,
      },
    });
    res.status(200).json(put);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const deleteActive = async (req: Request, res: Response) => {
  try {
    const del = await prisma.ativo.delete({
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
  createActive,
  getActiveById,
  getActiveByUserCategory,
  getActiveByUserId,
  getAllActives,
  updateActive,
  deleteActive,
};
