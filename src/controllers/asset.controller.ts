import { prisma } from "../server";
import express, { Express, Request, Response } from "express";

// res.status(500).json({ Error: e });

const createAsset = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.ativo.create({
      data: {
        data: new Date(),
        valor: data.valor,
        nome: data.name,
        descricao: data.description,
        idCategoria: data.idCategory,
        idUsuario: data.idUser,
      },
    });

    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const getAllAssets = async (req: Request, res: Response) => {
  try {
    const get = await prisma.ativo.findMany();
    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

// econtra o ativo com id X
const getAssetById = async (req: Request, res: Response) => {
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
const getAssetByUserId = async (req: Request, res: Response) => {
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
const getAssetByUserCategory = async (req: Request, res: Response) => {
  try {
    const get = await prisma.ativo.findMany({
      where: {
        idUsuario: parseInt(req.params.idUser),
        idCategoria: req.params.category,
      },
    });
    res.json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const updateAsset = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const put = await prisma.ativo.update({
      where: {
        id: data.id,
      },
      data: {
        valor: data.valor,
        nome: data.name,
        descricao: data.description,
        idCategoria: data.idCategory,
      },
    });
    res.status(200).json(put);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const deleteAsset = async (req: Request, res: Response) => {
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
  createAsset,
  getAssetById,
  getAssetByUserCategory,
  getAssetByUserId,
  getAllAssets,
  updateAsset,
  deleteAsset,
};
