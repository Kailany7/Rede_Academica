import { Request, Response } from "express";
import Mensagem from "../models/Mensagem";
import mongoose from "mongoose";
import Usuario from "../models/Usuario";

export const enviarMensagem = async (
    req: Request,
    res: Response
) => {


    try {

        const remetente = (req as any).userId;

        const {
            destinatario,
            conteudo
        } = req.body;


        const mensagem = await Mensagem.create({

            remetente,
            destinatario,
            conteudo

        });


        res.status(201).json(mensagem);


    } catch (error) {

        res.status(500).json({
            message: "Erro ao enviar mensagem"
        })

    }


}





export const listarMensagens = async (
    req: Request,
    res: Response
) => {


    try {


        const usuario = (req as any).userId;

        const outroUsuario = req.params.id;



        const mensagens =
            await Mensagem.find({

                $or: [

                    {
                        remetente: usuario,
                        destinatario: outroUsuario
                    },

                    {
                        remetente: outroUsuario,
                        destinatario: usuario
                    }

                ]

            })
                .sort({
                    data: 1
                });



        res.json(mensagens);



    } catch (error) {

        res.status(500).json({
            message: "Erro ao buscar mensagens"
        })

    }

}

export const listarConversas = async (
    req: Request,
    res: Response
) => {

    try {

        const usuario = (req as any).userId;

        const conversas = await Mensagem.aggregate([

            {
                $match: {
                    $or: [
                        { remetente: usuario },
                        { destinatario: usuario }
                    ]
                }
            },

            // ordena por data desc pra pegar a última msg de cada conversa
            { $sort: { data: -1 } },

            // define quem é o "outro usuário" da conversa
            {
                $addFields: {
                    outroUsuario: {
                        $cond: [
                            { $eq: ["$remetente", usuario] },
                            "$destinatario",
                            "$remetente"
                        ]
                    }
                }
            },

            // agrupa pelo outro usuário, pegando a primeira (= mais recente, já ordenado)
            {
                $group: {
                    _id: "$outroUsuario",
                    ultimaMensagem: { $first: "$conteudo" },
                    data: { $first: "$data" }
                }
            },

            { $sort: { data: -1 } }

        ]);

        // busca os dados de perfil de cada outro usuário
        const ids = conversas.map((c) => c._id);

        const usuarios = await Usuario.find({
            _id: { $in: ids }
        }).select("nome bio foto");

        const resultado = conversas.map((c) => {

            const dadosUsuario = usuarios.find(
                (u) => u._id.toString() === c._id
            );

            return {
                usuarioId: c._id,
                nome: dadosUsuario?.nome ?? "Usuário",
                bio: dadosUsuario?.bio ?? "",
                foto: dadosUsuario?.avatarColor ?? null,
                ultimaMensagem: c.ultimaMensagem,
                data: c.data
            };

        });

        res.json(resultado);

    } catch (error) {

        res.status(500).json({
            message: "Erro ao listar conversas"
        });

    }

}