import { Request, Response } from "express";
import Publicacao from "../models/Publicacao";
import Comentario from "../models/Comentario";

export const criarPublicacao = async (req: Request, res: Response): Promise<void> => {
  try {
    const { autor, autorCurso, avatarColor, conteudo } = req.body;

    if (!autor?.trim() || !conteudo?.trim()) {
      res.status(400).json({ message: "Autor e conteúdo são obrigatórios." });
      return;
    }

    const novaPublicacao = await Publicacao.create({
      autor: autor.trim(),
      autorCurso: autorCurso?.trim() || "",
      avatarColor: avatarColor || "#1B4F8A",
      conteudo: conteudo.trim(),
      curtidas: 0,
      comentarios: [],
    });

    res.status(201).json(novaPublicacao);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar publicação.", error });
  }
};

export const listarPublicacoes = async (req: Request, res: Response): Promise<void> => {
  try {
    const publicacoes = await Publicacao.find()
      .populate({
        path: "comentarios",
      })
      .sort({ data: -1 });

    res.status(200).json(publicacoes);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar publicações.", error });
  }
};

export const curtirPublicacao = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const publicacao = await Publicacao.findByIdAndUpdate(
      id,
      { $inc: { curtidas: 1 } },
      { new: true }
    );

    if (!publicacao) {
      res.status(404).json({ message: "Publicação não encontrada." });
      return;
    }

    res.status(200).json(publicacao);
  } catch (error) {
    res.status(500).json({ message: "Erro ao curtir publicação.", error });
  }
};

export const comentarPublicacao = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { autor, autorCurso, avatarColor, conteudo } = req.body;

    if (!autor?.trim() || !conteudo?.trim()) {
      res.status(400).json({ message: "Autor e conteúdo são obrigatórios." });
      return;
    }

    const publicacao = await Publicacao.findById(id);
    if (!publicacao) {
      res.status(404).json({ message: "Publicação não encontrada." });
      return;
    }

    const novoComentario = await Comentario.create({
      autor: autor.trim(),
      autorCurso: autorCurso?.trim() || "",
      avatarColor: avatarColor || "#1B4F8A",
      publicacao: id,
      conteudo: conteudo.trim(),
    });

    publicacao.comentarios.push(novoComentario._id);
    await publicacao.save();

    res.status(201).json(novoComentario);
  } catch (error) {
    res.status(500).json({ message: "Erro ao comentar na publicação.", error });
  }
};
