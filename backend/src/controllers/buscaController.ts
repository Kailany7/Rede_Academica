import { Request, Response } from "express";
import { buscarConteudos } from "../services/buscaService";

export async function buscar(req: Request, res: Response): Promise<void> {
  try {
    const termo = req.query.termo as string;

    if (!termo || termo.trim() === "") {
      res.status(400).json({
        message: "O termo da busca é obrigatório.",
      });
      return;
    }

    // Chama o service, onde está a regra da busca
    const resultado = await buscarConteudos(termo);

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao realizar busca.",
      error,
    });
  }
}