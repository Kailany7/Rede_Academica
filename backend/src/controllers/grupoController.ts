import { Request, Response } from "express";
import Grupo from "../models/Grupo";

export const criarGrupo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, descricao } = req.body;

    // Valida se os campos foram preenchidos
    if (!nome?.trim() || !descricao?.trim()) {
      res.status(400).json({
        message: "Nome e descrição são obrigatórios.",
      });
      return;
    }

    // Verifica se já existe grupo com o mesmo nome
    const grupoExistente = await Grupo.findOne({
      nome: { $regex: `^${nome.trim()}$`, $options: "i" },
    });

    if (grupoExistente) {
      res.status(409).json({
        message: "Já existe um grupo com esse nome.",
      });
      return;
    }

    // Cria o grupo no banco
    const novoGrupo = await Grupo.create({
      nome: nome.trim(),
      descricao: descricao.trim(),
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