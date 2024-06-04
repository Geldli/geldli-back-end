import { prisma } from "../server";
import express, { Express, Request, Response } from "express";

const createContinuousActive = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.ativoContinuo.create({
      data: {
        data: new Date(),
        valor: data.valor,
        nome: data.nome,
        descricao: data.descricao,
        mesComeco: data.mesComeco,
        diaPagamento: data.diaPagamento,
        anualmente: data.anualmente,
        idCategoria: data.idCategoria,
        idUsuario: data.idUsuario,
      },
    });

    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const getAllContinuousActive = async (req: Request, res: Response) => {
  try {
    const get = await prisma.ativoContinuo.findMany();
    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

// encontra os ativos contínuos  com id X
const getContinousActiveById = async (req: Request, res: Response) => {
  try {
    const get = await prisma.ativoContinuo.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(200).json();
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

// encontra todos os ativos contínuos do usuário  X
const getContinuousActiveByUserId = async (req: Request, res: Response) => {
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

const getContinuousActiveByUserAndCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const get = await prisma.ativoContinuo.findMany({
      where: {
        idUsuario: parseInt(req.params.id),
        idCategoria: req.params.categoria,
      },
    });
    console.log(req.params.categoria);
    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const updateContinuousActive = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const put = await prisma.ativoContinuo.update({
      where: {
        id: data.id,
      },
      data: {
        valor: data.valor,
        nome: data.nome,
        descricao: data.descricao,
        mesComeco: data.mesComeco,
        diaPagamento: data.diaPagamento,
        anualmente: data.anualmente,
      },
    });
    res.status(200).json(put);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const deleteContinuousActive = async (req: Request, res: Response) => {
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
  createContinuousActive,
  getAllContinuousActive,
  getContinousActiveById,
  getContinuousActiveByUserAndCategory,
  getContinuousActiveByUserId,
  updateContinuousActive,
  deleteContinuousActive,
};
