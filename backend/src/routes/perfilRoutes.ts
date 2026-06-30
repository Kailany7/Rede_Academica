import { Router } from "express";
import * as perfilController from "../controllers/perfilController";
import { autenticar } from "../middlewares/authMiddleware";
const router = Router();

router.use(autenticar);

router.get("/", perfilController.getMyPerfil);
router.get("/conexoes", perfilController.getConnections);
router.get("/solicitacoes", perfilController.getRequests);
router.get("/sugestoes", perfilController.getSuggestions);

router.get("/:id", perfilController.getPerfilById);

router.put("/", perfilController.updatePerfil);

router.post("/conectar/:id", perfilController.sendRequest);
router.post("/aceitar/:id", perfilController.acceptRequest);
router.post("/recusar/:id", perfilController.rejectRequest);

router.delete("/conexoes/:id", perfilController.removeConnection);

export default router;