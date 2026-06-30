import { Request, Response } from "express";
import Publicacao from "../models/Publicacao";
import Comentario from "../models/Comentario";

export const criarPublicacao = async (req: Request, res: Response): Promise<void> => {
  try {
    const { conteudo } = req.body;
    const autorId = (req as any).userId;

    if (!conteudo?.trim()) {
      res.status(400).json({ message: "Conteúdo é obrigatório." });
      return;
    }

    const novaPublicacao = await Publicacao.create({
      autor: autorId,
      conteudo: conteudo.trim(),
    });

    const populada = await Publicacao.findById(novaPublicacao._id)
      .populate("autor", "nome email curso avatarColor");

    res.status(201).json(populada);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar publicação.", error });
  }
};

export const listarPublicacoes = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = (req as any).userId;

    const publicacoes = await Publicacao.find()
      .populate("autor", "nome email curso avatarColor")
      .populate({
        path: "comentarios",
        populate: { path: "autor", select: "nome email avatarColor" },
      })
      .sort({ data: -1 });

    const resultado = publicacoes.map((pub) => {
      const pubObj = pub.toObject();
      return {
        ...pubObj,
        curtidas: pub.curtidoPor.length,
        curtido: pub.curtidoPor.some((id) => id.toString() === usuarioId),
      };
    });

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar publicações.", error });
  }
};

export const curtirPublicacao = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const usuarioId = (req as any).userId;

    const publicacao = await Publicacao.findById(id);
    if (!publicacao) {
      res.status(404).json({ message: "Publicação não encontrada." });
      return;
    }

    const index = publicacao.curtidoPor.findIndex(
      (idStr) => idStr.toString() === usuarioId
    );

    if (index === -1) {
      publicacao.curtidoPor.push(usuarioId);
    } else {
      publicacao.curtidoPor.splice(index, 1);
    }

    await publicacao.save();

    const populada = await Publicacao.findById(publicacao._id)
      .populate("autor", "nome email curso avatarColor")
      .populate({
        path: "comentarios",
        populate: { path: "autor", select: "nome email avatarColor" },
      });

    res.status(200).json({
      ...populada!.toObject(),
      curtidas: populada!.curtidoPor.length,
      curtido: populada!.curtidoPor.some((id) => id.toString() === usuarioId),
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao curtir publicação.", error });
  }
};

export const comentarPublicacao = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { conteudo } = req.body;
    const autorId = (req as any).userId;

    if (!conteudo?.trim()) {
      res.status(400).json({ message: "Conteúdo é obrigatório." });
      return;
    }

    const publicacao = await Publicacao.findById(id);
    if (!publicacao) {
      res.status(404).json({ message: "Publicação não encontrada." });
      return;
    }

    const novoComentario = await Comentario.create({
      autor: autorId,
      publicacao: id,
      conteudo: conteudo.trim(),
    });

    publicacao.comentarios.push(novoComentario._id);
    await publicacao.save();

    const comentarioPopulado = await Comentario.findById(novoComentario._id)
      .populate("autor", "nome email avatarColor");

    res.status(201).json(comentarioPopulado);
  } catch (error) {
    res.status(500).json({ message: "Erro ao comentar na publicação.", error });
  }
};
