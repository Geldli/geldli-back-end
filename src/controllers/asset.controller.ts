import { prisma } from "../server";
import express, { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

import { AuthRequest } from "../interfaces/authenticateToken.interfaces";


const createAsset = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;    
    const post = await prisma.ativo.create({
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
const getAssetByUserId = async (req: AuthRequest, res: Response) => {

  try {
    const post = await prisma.ativo.findMany({
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

// encontra os ativos do usuario X com categoria Y
const getAssetsByUserIdAndCategory = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.ativo.findMany({
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


const getAssetsSumByUserId = async(req: AuthRequest, res: Response) => {
  try {
    const get = await prisma.ativo.aggregate({
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


const updateAsset = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const put = await prisma.ativo.update({
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

const deleteAsset = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const del = await prisma.ativo.delete({
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
  createAsset,
  getAssetById,
  getAssetsByUserIdAndCategory,
  getAssetByUserId,
  getAllAssets,
  getAssetsSumByUserId,
  updateAsset,
  deleteAsset,
};
