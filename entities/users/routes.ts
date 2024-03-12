
import { Router } from "express";
import * as usarios from "./userP";
import { auth } from "../../core/middlewares/auth";

const router = Router();

// router.put('/token', auth, addSiguiendo);
router.get('/users/profile', auth, usarios.ListarTodosUsuarios);
router.put('/users/profile', auth, usarios.actualizarUsuario);
router.get('/users', auth, usarios.filtrarPorEmail);



export default router;