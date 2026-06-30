import { Request, Response } from "express";
import * as perfilService from "../services/perfilService";

// Buscar meu perfil
export const getMyPerfil = async (req: Request, res: Response) => {
  try {
    const userId = String((req as any).userId);

    const perfil = await perfilService.getMyPerfil(userId);

    return res.status(200).json(perfil);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Buscar perfil por ID
export const getPerfilById = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const perfil = await perfilService.getPerfilById(id);

    return res.status(200).json(perfil);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Editar perfil
export const updatePerfil = async (req: Request, res: Response) => {
  try {
    const userId = String((req as any).userId);

    const data = req.body;

    const perfil = await perfilService.updatePerfil(userId, data);

    return res.status(200).json(perfil);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Listar conexões
export const getConnections = async (req: Request, res: Response) => {
  try {
    const userId = String((req as any).userId);

    const connections = await perfilService.getConnections(userId);

    return res.status(200).json(connections);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Listar solicitações recebidas
export const getRequests = async (req: Request, res: Response) => {
  try {
    const userId = String((req as any).userId);

    const requests = await perfilService.getRequests(userId);

    return res.status(200).json(requests);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Enviar solicitação de conexão
export const sendRequest = async (req: Request, res: Response) => {
  try {
    const userId = String((req as any).userId);
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const response = await perfilService.sendRequest(userId, id);

    return res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Aceitar solicitação
export const acceptRequest = async (req: Request, res: Response) => {
  try {
    const userId = String((req as any).userId);
    const id = String(req.params.id);

    const response = await perfilService.acceptRequest(userId, id);

    return res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Recusar solicitação
export const rejectRequest = async (req: Request, res: Response) => {
  try {
    const userId = String((req as any).userId);
    const id = String(req.params.id);

    const response = await perfilService.rejectRequest(userId, id);

    return res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
