
import { Router } from "express";
import * as comentarios from "./comentarios";
import { auth } from "../../core/middlewares/auth";


const router = Router();
router.post('/comments', auth, comentarios.crearComentario)
router.delete('/remove/:id', auth, comentarios.eliminarComentario);

export default router;