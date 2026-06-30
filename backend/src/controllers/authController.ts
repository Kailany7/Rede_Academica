import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = "7d";

// ─── Cadastro ─────────────────────────────────────────────────────────────────

export const cadastrar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, email, senha, curso, semestre, bio } = req.body;

    if (!nome?.trim() || !email?.trim() || !senha?.trim()) {
      res.status(400).json({ message: "Nome, email e senha são obrigatórios." });
      return;
    }

    if (senha.length < 6) {
      res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres." });
      return;
    }

    const emailJaExiste = await Usuario.findOne({
      email: email.trim().toLowerCase(),
    });
    if (emailJaExiste) {
      res.status(409).json({ message: "Este email já está cadastrado." });
      return;
    }

    const novoUsuario = await Usuario.create({
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      senha,
      curso: curso?.trim() || "",
      semestre: semestre?.trim() || "",
      bio: bio?.trim() || "",
    });

    const token = jwt.sign(
      { id: novoUsuario._id, email: novoUsuario.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    res.status(201).json({
      token,
      usuario: {
        id: novoUsuario._id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        curso: novoUsuario.curso,
        semestre: novoUsuario.semestre,
        bio: novoUsuario.bio,
        avatarColor: novoUsuario.avatarColor,
        onboardingCompleto: novoUsuario.onboardingCompleto,
      },
    });
  } catch (error) {
    console.error("ERRO CADASTRO:", error);
    res.status(500).json({ message: "Erro ao realizar cadastro.", error });
  }
};

// ─── Login ────────────────────────────────────────────────────────────────────

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, senha } = req.body;
    console.log("LOGIN TENTATIVA:", email, senha);

    if (!email?.trim() || !senha?.trim()) {
      res.status(400).json({ message: "Email e senha são obrigatórios." });
      return;
    }

    const usuario = await Usuario.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!usuario) {
      res.status(401).json({ message: "Email ou senha incorretos." });
      return;
    }

    const senhaCorreta = await usuario.compararSenha(senha);
    if (!senhaCorreta) {
      res.status(401).json({ message: "Email ou senha incorretos." });
      return;
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    res.status(200).json({
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        curso: usuario.curso,
        semestre: usuario.semestre,
        bio: usuario.bio,
        avatarColor: usuario.avatarColor,
        onboardingCompleto: usuario.onboardingCompleto,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar login.", error });
  }
};

// ─── Dados do usuário logado ──────────────────────────────────────────────────

export const perfil = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;
    const usuario = await Usuario.findById(userId).select("-senha");

    if (!usuario) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar perfil.", error });
  }
};
