import { Request, Response } from "express";
import Usuario from "../models/Usuario";


export const statusOnboarding = async (
    req: Request,
    res: Response
) => {

    try {

        const userId = (req as any).userId;

        const usuario = await Usuario
            .findById(userId)
            .select("onboardingCompleto");


        res.json(usuario);


    } catch (error) {

        res.status(500).json({
            message: "Erro ao verificar onboarding"
        });

    }

}



export const completarOnboarding = async (
    req: Request,
    res: Response
) => {


    try {

        const userId = (req as any).userId;


        const usuario = await Usuario.findByIdAndUpdate(
            userId,
            {
                onboardingCompleto: true
            },
            {
                new: true
            }
        );


        res.json(usuario);


    } catch (error) {

        res.status(500).json({
            message: "Erro ao completar onboarding"
        })

    }

}