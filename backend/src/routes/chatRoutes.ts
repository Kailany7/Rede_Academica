import { Router } from "express";

import {
    enviarMensagem,
    listarMensagens,
    listarConversas
} from "../controllers/chatController";

import { autenticar } from "../middlewares/authMiddleware";


const router = Router();


router.post(
    "/",
    autenticar,
    enviarMensagem
);

router.get(
    "/conversas",
    autenticar,
    listarConversas
);

router.get(
    "/:id",
    autenticar,
    listarMensagens
);


export default router;