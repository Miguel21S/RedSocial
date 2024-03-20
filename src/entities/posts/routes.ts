
import { Router } from "express";
import * as posts from "./post"
import { auth } from "../../core/middlewares/auth";

const router = Router();

router.post('/posts', auth, posts.crearPost);
router.delete('/posts/:id', auth, posts.EliminarPostPorId);
router.put('/posts/:id', auth, posts.actualizarPostPorId);
router.get('/posts/own', auth, posts.listarMisPosts);
router.get('/posts', auth, posts.listarPosts);
router.get('/posts/:id', auth, posts.listarPostPorId);
router.get('/users/posts/:id', auth, posts.recuperarPostDeUnUsuarioPorId);


export default router;