import { AuthRequest } from "../interfaces/authenticateToken.interfaces";
import { prisma } from "../server";
import { Request, Response } from "express";


const createExpense = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.despesa.create({
      data: {
        data: new Date(data.data),
        valor: parseFloat(data.valor),
        nome: data.nome,
        descricao: data.descricao,
        idUsuario: parseInt(req.user!.userId),
        idCategoria: data.idCategoria,
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
    const post = await prisma.despesa.findMany({
      where: {
        idUsuario: parseInt(req.user!.userId),
      },
      select: {
        id: true,
        data: true,
        valor: true,
        nome: true,
        descricao: true,
        idCategoria: true,
      }
    });
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

// encontra todas as despesas do usuario X e com categoria Y
const getExpensesByUserIdAndCategory = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.despesa.findMany({
      where: {
        idUsuario: parseInt(req.user!.userId),
        idCategoria: data.idCategoria,
      },
    });
    res.status(200).json(post);
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


const updateExpense = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;

    const put = await prisma.despesa.update({
      where: {
        id: data.id,
        idUsuario: req.user!.userId
      },
        
      data: {
        data: new Date(data.data),
        valor: parseFloat(data.valor),
        nome: data.nome,
        descricao: data.descricao,
        idCategoria: data.idCategoria,
      },
    });
    res.status(200).json(put);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const deleteExpense = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const del = await prisma.despesa.delete({
      where: {
        id: data.id,
        idUsuario: parseInt(req.user!.userId),
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
  getExpensesByUserIdAndCategory,
  getexpenseSumByUserId,
  updateExpense,
  deleteExpense,
};
