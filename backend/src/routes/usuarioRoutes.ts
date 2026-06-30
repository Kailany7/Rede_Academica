import { Router } from "express";

import {
    listarUsuarios
} from "../controllers/usuarioController";

import {
    autenticar
} from "../middlewares/authMiddleware";


const router = Router();


router.get(
    "/",
    autenticar,
    listarUsuarios
);


export default router;