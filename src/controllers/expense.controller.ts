import { prisma } from "../server";
import express, { Express, Request, Response } from "express";


// res.status(500).json({ Error: e });

const createExpense = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const post = await prisma.despesa.create({
            data: {
                data: new Date(),
                valor: data.valor,
                nome: data.nome,
                descricao: data.descricao,
                idCategoria: data.idCategoria,
                idUsuario: data.idUsuario
            }
        })
        res.status(200).json(post);
    } catch (e) {
        res.status(500).json({ Error: e });
    }
}

const getAllExpenses = async (req: Request, res: Response) => {
    try {
        const get = await prisma.despesa.findMany();
        res.status(200).json(get);
    } catch (e) {
        res.status(500).json({ Error: e });
    }
}

const getExpenseByID = async (req: Request, res: Response) => {
    try {
        const get = await prisma.despesa.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(200).json(get);
    } catch (e) {
        res.status(500).json({ Error: e });
    }
}

const getExpensesByUserID = async (req: Request, res: Response) => {
    try {
        const get = await prisma.despesa.findMany({
            where: {
                idUsuario: parseInt(req.params.id)
            }
        })
        res.status(200).json(get);
    } catch (e) {
        res.status(500).json({ Error: e });
    }
}

// encontra todas as despesas do usuario X e com categoria Y
const getExpensesByUserCategory = async (req: Request, res: Response) => {
    try {
        const get = await prisma.despesa.findMany({
            where: {
                idUsuario: parseInt(req.params.idUsuario),
                idCategoria: req.params.categoria
            }
        })
        res.status(200).json(get);
    } catch (e) {
        res.status(500).json({ Error: e });
    }
}

const updateExpense = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const put = await prisma.despesa.update({
            where: {
                id: data.id
            },
            data: {
                valor: data.valor,
                nome: data.nome,
                descricao: data.descricao,
                idCategoria: data.idCategoria,
            }
        })
        res.status(200).json(put);
    } catch (e) {
        res.status(500).json({ Error: e });
    }
}

const deleteExpense = async (req: Request, res: Response) => {
    try {
        const del = await prisma.despesa.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(200).json(del);
    } catch (e) {
        res.status(500).json({ Error: e });
    }
}

export default{
    createExpense,
    getAllExpenses,
    getExpenseByID,
    getExpensesByUserID,
    getExpensesByUserCategory,
    updateExpense,
    deleteExpense
}