
import { Router } from "express";
import * as seguirSiguiendo from "./seguirSeguidores";
import { auth } from "../../core/middlewares/auth";

const router = Router();
router.post('/users/follow/:id', auth, seguirSiguiendo.seguirUser);
router.get('/users/following', auth, seguirSiguiendo.verMisSeguidores);
router.get('/users/followers', auth, seguirSiguiendo.losSiguidos);

export default router;