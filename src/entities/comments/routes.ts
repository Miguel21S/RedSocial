
import { Router } from "express";
import * as comment from "./commentsControllers";
import { auth } from "../../core/middlewares/auth";


const router = Router();
router.post('/comment/:id', auth, comment.createComment)
router.get('/comment/filters', auth, comment.searchComment);
router.put('/comment/:id', auth, comment.editComment);
router.delete('/comment/:id', auth, comment.deleteComment);

export default router;