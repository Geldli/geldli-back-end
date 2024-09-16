import { prisma } from "../server";
import express, { Express, Request, Response } from "express";

// res.status(500).json({ Error: e });

const createAssetCategory = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.categoriaAtivo.create({
      data: {
        id: data.name.toLowerCase(),
        cores: data.color.toLowerCase(),
        idUsuario: parseInt(data.idUser),
      },
    });

    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
  const data = req.body;
};

const getAllAssetCategory = async (req: Request, res: Response) => {
  try {
    const get = await prisma.categoriaAtivo.findMany();
    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

// encontra todas as categorias de ativos do usuario X
const getAssetCategoryByUser = async (req: Request, res: Response) => {
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

const deleteAssetCategory = async (req: Request, res: Response) => {
  try {
    const del = await prisma.categoriaAtivo.delete({
      where: {
        idUsuario: parseInt(req.params.idUser),
        id: req.params.category,
      },
    });

    res.status(200).json(del);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

export default {
  createAssetCategory,
  getAllAssetCategory,
  getAssetCategoryByUser,
  deleteAssetCategory,
};
