import { Request, Response } from "express";
import Usuario from "../models/Usuario";


export const listarUsuarios = async (
    req: Request,
    res: Response
) => {

    try {

        const usuarioLogado = (req as any).userId;


        const usuarios = await Usuario.find({
            _id: {
                $ne: usuarioLogado
            }
        })
            .select(
                "nome curso semestre bio avatarColor"
            );


        res.json(usuarios);


    } catch (error) {

        res.status(500).json({
            message: "Erro ao buscar usuários"
        });

    }

}