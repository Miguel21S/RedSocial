
import { Router } from "express";
import * as posts from "./post"
import { auth } from "../../core/middlewares/auth";

const router = Router();

// router.put('/token', auth, addSiguiendo);
router.post('/post', auth, posts.crearPost);
router.delete('/posts/:id', auth, posts.EliminarPostPorId);


export default router;