import { AuthRequest } from "../interfaces/authenticateToken.interfaces";
import { prisma } from "../server";
import express, { Express, Request, Response } from "express";


const createExpenseCategory = async (req: AuthRequest, res: Response) => {
  console.log('a')
  try {
    const data = req.body;
    const post = await prisma.categoriaDespesa.create({
      data: {
        id: data.name,
        cores: data.color,
        idUsuario: parseInt(req.user!.userId),
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

const getExpenseCategoryByUser = async (req: AuthRequest, res: Response) => {
  try {
    const post = await prisma.categoriaDespesa.findMany({
      where: {
        idUsuario: parseInt(req.user!.userId),
      },
    });

    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const deleteExpenseCategory = async (req: Request, res: Response) => {
  try {
    const del = await prisma.categoriaDespesa.delete({
      where: {
        idUsuario: parseInt(req.params.idUser),
        id: req.params.category,
      },
    });
    console.log(req.params.idUser + req.params.category);
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
