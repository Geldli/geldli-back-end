import { AuthRequest } from "../interfaces/authenticateToken.interfaces";
import { prisma } from "../server";
import { Request, Response } from "express";


const createAssetCategory = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const post = await prisma.categoriaAtivo.create({
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

const getAllAssetCategory = async (req: Request, res: Response) => {
  try {
    const get = await prisma.categoriaAtivo.findMany();
    res.status(200).json(get);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

// encontra todas as categorias de ativos do usuario X
const getAssetCategoryByUser = async (req: AuthRequest, res: Response) => {
  try {
    const post = await prisma.categoriaAtivo.findMany({
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

const deleteAssetCategory = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const del = await prisma.categoriaAtivo.delete({
      where: {
        id_idUsuario: {
          id: data.id,
          idUsuario: parseInt(req.user!.userId),
        }
      },
    });

    res.status(200).json(del);
  } catch (e) {
    console.log(e)
    res.status(500).json({ Error: e });
  }
};

export default {
  createAssetCategory,
  getAllAssetCategory,
  getAssetCategoryByUser,
  deleteAssetCategory,
};
