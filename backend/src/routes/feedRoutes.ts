import { Router } from "express";
import {
  criarPublicacao,
  listarPublicacoes,
  curtirPublicacao,
  comentarPublicacao,
} from "../controllers/feedController";

const router = Router();

router.post("/", criarPublicacao);
router.get("/", listarPublicacoes);
router.post("/:id/curtir", curtirPublicacao);
router.post("/:id/comentar", comentarPublicacao);

export default router;
