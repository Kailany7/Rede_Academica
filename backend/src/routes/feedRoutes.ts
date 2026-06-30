import { Router } from "express";
import { autenticar } from "../middlewares/authMiddleware";
import {
  criarPublicacao,
  listarPublicacoes,
  curtirPublicacao,
  comentarPublicacao,
} from "../controllers/feedController";

const router = Router();

router.post("/", autenticar, criarPublicacao);
router.get("/", autenticar, listarPublicacoes);
router.post("/:id/curtir", autenticar, curtirPublicacao);
router.post("/:id/comentar", autenticar, comentarPublicacao);

export default router;
