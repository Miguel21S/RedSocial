
import { Router } from "express";
import * as usarios from "./user";
import { auth } from "../../core/middlewares/auth";
import { isSuperAdmin } from "../../core/middlewares/isSuperAdmin";

const router = Router();

// router.put('/token', auth, addSiguiendo);
router.get('/users/profile', auth, isSuperAdmin, usarios.ListarTodosUsuarios);
router.put('/users/profile', auth, usarios.actualizarUsuario);
router.get('/users', auth, isSuperAdmin, usarios.filtrarPorEmail);
router.delete('/users/:id', auth, isSuperAdmin, usarios.EliminarPorId);
router.put('/users/:id', auth, isSuperAdmin, usarios.actualizarRolePorId);


export default router;