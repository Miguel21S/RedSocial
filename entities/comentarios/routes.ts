
import { Router } from "express";
import { crearComentario } from "./comentarios";
import { auth } from "../../core/middlewares/auth";


const router = Router();
router.post('/comments', auth, crearComentario)

export default router;