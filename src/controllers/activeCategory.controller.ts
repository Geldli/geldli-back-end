import { prisma } from "../server";
import express, { Express, Request, Response } from "express";

// res.status(500).json({ Error: e });

const createActiveCategory = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.categoriaAtivo.create({
      data: {
        id: data.nome.toLowerCase(),
        cores: data.cores.toLowerCase(),
        idUsuario: parseInt(data.idUsuario),
      },
    });

    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
  const data = req.body;
};

const getAllActiveCategory = async (req: Request, res: Response) => {
  try {
    const get = await prisma.categoriaAtivo.findMany();
    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

// encontra todas as categorias de ativos do usuario X
const getActiveCategoryByUser = async (req: Request, res: Response) => {
  try {
    const get = await prisma.categoriaAtivo.findMany({
      where: {
        idUsuario: parseInt(req.params.id),
      },
    });

    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const deleteActiveCategory = async (req: Request, res: Response) => {
  try {
    const del = await prisma.categoriaAtivo.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(del);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

export default {
  createActiveCategory,
  getAllActiveCategory,
  getActiveCategoryByUser,
  deleteActiveCategory,
};
