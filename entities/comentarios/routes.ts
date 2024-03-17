
import { Router } from "express";
import * as comentarios from "./comentarios";
import { auth } from "../../core/middlewares/auth";


const router = Router();
router.post('/comments/:id', auth, comentarios.crearComentario)
router.put('/comments/:id', auth, comentarios.editarComentario);
router.delete('/comments/:id', auth, comentarios.eliminarComentario);
router.get('/comments/filters', auth, comentarios.buscarComentario);

export default router;