
import { Router } from "express";
import * as likes from "./likesControllers";
import { auth } from "../../core/middlewares/auth";

const router = Router();
router.post('/posts/like/:id', auth, likes.darlikes);

export default router