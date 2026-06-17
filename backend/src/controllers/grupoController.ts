import { Request, Response } from "express";
import Grupo from "../models/Grupo";

// POST /grupos
export const criarGrupo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
      res.status(400).json({
        message: "Nome e descrição são obrigatórios.",
      });
      return;
    }

    const novoGrupo = await Grupo.create({
      nome,
      descricao,
      membros: [],
    });

    res.status(201).json(novoGrupo);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao criar grupo.",
      error,
    });
  }
};

// GET /grupos
export const listarGrupos = async (req: Request, res: Response): Promise<void> => {
  try {
    const grupos = await Grupo.find().sort({ data: -1 });

    res.status(200).json(grupos);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao listar grupos.",
      error,
    });
  }
};