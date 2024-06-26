import { prisma } from "../server";
import express, { Express, Request, Response } from "express";

// res.status(500).json({ Error: e });

const createExpenseCategory = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.categoriaDespesa.create({
      data: {
        id: data.nome.toLowerCase(),
        cores: data.cores.toLowerCase(),
        idUsuario: data.idUsuario,
      },
    });

    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const getAllExpenseCategory = async (req: Request, res: Response) => {
  try {
    const get = await prisma.categoriaDespesa.findMany();
    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const getExpenseCategoryByUser = async (req: Request, res: Response) => {
  try {
    const get = await prisma.categoriaDespesa.findMany({
      where: {
        idUsuario: parseInt(req.params.id),
      },
    });

    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const deleteExpenseCategory = async (req: Request, res: Response) => {
  try {
    const del = await prisma.categoriaDespesa.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json(del);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

export default {
  createExpenseCategory,
  getAllExpenseCategory,
  getExpenseCategoryByUser,
  deleteExpenseCategory,
};
