import { Router } from "express";
import * as seguirSiguiendo from "./seguirSeguidores";
import { auth } from "../../core/middlewares/auth";

const router = Router();
router.post('/users/seguir/:id', auth, seguirSiguiendo.seguirUser);

export default router;