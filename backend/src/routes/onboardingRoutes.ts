import { Router } from "express";
import {
    statusOnboarding,
    completarOnboarding
} from "../controllers/onboardingController";

import { autenticar } from "../middlewares/authMiddleware";


const router = Router();


router.get(
    "/",
    autenticar,
    statusOnboarding
);


router.patch(
    "/complete",
    autenticar,
    completarOnboarding
);


export default router;