import { Router } from "express";
import * as perfilController from "../controllers/perfilController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.get("/perfil", perfilController.getMyPerfil);

router.get("/perfil/:id", perfilController.getPerfilById);

router.put("/perfil", perfilController.updatePerfil);

router.get("/conexoes", perfilController.getConnections);

router.get("/solicitacoes", perfilController.getRequests);

router.post("/conectar/:id", perfilController.sendRequest);

router.post("/aceitar/:id", perfilController.acceptRequest);

router.post("/recusar/:id", perfilController.rejectRequest);

export default router;
