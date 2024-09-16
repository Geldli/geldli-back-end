import { prisma } from "../server";
import express, { Express, Request, Response } from "express";

const createContinuousExpense = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.despesaContinua.create({
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

const getAllContinuousExpense = async (req: Request, res: Response) => {
  try {
    const get = await prisma.despesaContinua.findMany();
    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const getContinuousExpenseById = async (req: Request, res: Response) => {
  try {
    const get = await prisma.despesaContinua.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const getContinuousExpenseByUserId = async (req: Request, res: Response) => {
  try {
    const get = await prisma.despesaContinua.findMany({
      where: {
        idUsuario: parseInt(req.params.id),
      },
    });

    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const getContinuousExpenseByUserAndCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const get = await prisma.despesaContinua.findMany({
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

const updateContinuousExpense = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const put = await prisma.despesaContinua.update({
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

const deleteContinuousExpense = async (req: Request, res: Response) => {
  try {
    const del = await prisma.despesaContinua.delete({
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
  createContinuousExpense,
  getAllContinuousExpense,
  getContinuousExpenseById,
  getContinuousExpenseByUserAndCategory,
  getContinuousExpenseByUserId,
  updateContinuousExpense,
  deleteContinuousExpense,
};
