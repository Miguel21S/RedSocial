
import { Router } from "express";
import * as comentarios from "./comentarios";
import { auth } from "../../core/middlewares/auth";


const router = Router();
router.post('/comments/:id', auth, comentarios.crearComentario)
router.put('/comments/:id', auth, comentarios.editarComentario);
router.get('/comments/filters', auth, comentarios.buscarComentario);
router.delete('/comments/:id', auth, comentarios.eliminarComentario);

export default router;