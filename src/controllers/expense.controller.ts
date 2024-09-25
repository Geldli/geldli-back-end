import { AuthRequest } from "../interfaces/authenticateToken.interfaces";
import { prisma } from "../server";
import express, { Express, Request, Response } from "express";

// res.status(500).json({ Error: e });

const createExpense = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.despesa.create({
      data: {
        data: new Date(),
        valor: parseFloat(data.valor),
        nome: data.name,
        descricao: data.description,
        idCategoria: data.idCategory,
        idUsuario: parseInt(req.user!.userId),
      },
    });
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const get = await prisma.despesa.findMany();
    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const getExpenseByID = async (req: Request, res: Response) => {
  try {
    const get = await prisma.despesa.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const getExpensesByUserID = async (req: AuthRequest, res: Response) => {
  try {
    const get = await prisma.despesa.findMany({
      where: {
        idUsuario: parseInt(req.user!.userId),
      },
    });
    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

// encontra todas as despesas do usuario X e com categoria Y
const getExpensesByUserCategory = async (req: Request, res: Response) => {
  try {
    const get = await prisma.despesa.findMany({
      where: {
        idUsuario: parseInt(req.params.idUser),
        idCategoria: req.params.category,
      },
    });
    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};


const getexpenseSumByUserId = async(req: AuthRequest, res: Response) => {
  try {
    const get = await prisma.despesa.aggregate({
      where: {
        idUsuario: parseInt(req.user!.userId),
      },
      _sum: {
        valor: true,
      },
    });
    res.json(get._sum);
  } catch(e) {
    res.status(500).json({ Error: e })
  }
}


const updateExpense = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const put = await prisma.despesa.update({
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

const deleteExpense = async (req: Request, res: Response) => {
  try {
    const del = await prisma.despesa.delete({
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
  createExpense,
  getAllExpenses,
  getExpenseByID,
  getExpensesByUserID,
  getExpensesByUserCategory,
  getexpenseSumByUserId,
  updateExpense,
  deleteExpense,
};
