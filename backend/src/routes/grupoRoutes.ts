import { Router } from "express";
import { criarGrupo, listarGrupos } from "../controllers/grupoController";

const router = Router();

router.post("/", criarGrupo);
router.get("/", listarGrupos);

export default router;