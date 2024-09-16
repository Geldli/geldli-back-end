import { prisma } from "../server";
import express, { Express, Request, Response } from "express";

const createContinuousAsset = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.ativoContinuo.create({
      data: {
        data: new Date(),
        valor: data.valor,
        nome: data.name,
        descricao: data.description,
        mesComeco: data.startMonth,
        diaPagamento: data.paymentDay,
        anualmente: data.annually,
        idCategoria: data.idCategory,
        idUsuario: data.idUser,
      },
    });

    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const getAllContinuousAsset = async (req: Request, res: Response) => {
  try {
    const get = await prisma.ativoContinuo.findMany();
    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

// encontra os ativos contínuos  com id X
const getContinousAssetById = async (req: Request, res: Response) => {
  try {
    const get = await prisma.ativoContinuo.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

// encontra todos os ativos contínuos do usuário  X
const getContinuousAssetByUserId = async (req: Request, res: Response) => {
  try {
    const get = await prisma.ativoContinuo.findMany({
      where: {
        idUsuario: parseInt(req.params.id),
      },
    });

    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

// encontra todas os ativos contínuos do usuário X com a categoria Y

const getContinuousAssetByUserAndCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const get = await prisma.ativoContinuo.findMany({
      where: {
        idUsuario: parseInt(req.params.id),
        idCategoria: req.params.category,
      },
    });
    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const updateContinuousAsset = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const put = await prisma.ativoContinuo.update({
      where: {
        id: data.id,
      },
      data: {
        valor: data.valor,
        nome: data.name,
        descricao: data.description,
        mesComeco: data.startMonth,
        diaPagamento: data.paymentDay,
        anualmente: data.annually,
      },
    });
    res.status(200).json(put);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const deleteContinuousAsset = async (req: Request, res: Response) => {
  try {
    const del = await prisma.ativoContinuo.delete({
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
  createContinuousAsset,
  getAllContinuousAsset,
  getContinousAssetById,
  getContinuousAssetByUserAndCategory,
  getContinuousAssetByUserId,
  updateContinuousAsset,
  deleteContinuousAsset,
};
