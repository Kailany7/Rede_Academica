import { Router } from "express";
import { cadastrar, login, perfil } from "../controllers/authController";
import { autenticar } from "../middlewares/authMiddleware";

const router = Router();

router.post("/cadastro", cadastrar);
router.post("/login", login);
router.get("/perfil", autenticar, perfil);

export default router;
