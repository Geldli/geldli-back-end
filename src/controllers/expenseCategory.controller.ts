import { AuthRequest } from "../interfaces/authenticateToken.interfaces";
import { prisma } from "../server";
import { Request, Response } from "express";


const createExpenseCategory = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.categoriaDespesa.create({
      data: {
        id: data.id,
        cores: data.cores,
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
      select: {
        id: true,
        cores: true
      }
    });

    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const deleteExpenseCategory = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const del = await prisma.categoriaDespesa.delete({
      where: {
        id_idUsuario: {
          id: data.id,
          idUsuario: parseInt(req.user!.userId),
        }
      },
    });

    res.status(200).json(del);
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
