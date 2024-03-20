
import { Router } from "express";
import * as posts from "./postControllers"
import { auth } from "../../core/middlewares/auth";

const router = Router();

router.post('/posts', auth, posts.creatPost);
router.delete('/posts/:id', auth, posts.deletePostById);
router.put('/posts/:id', auth, posts.updatePostById);
router.get('/posts/own', auth, posts.listMyPosts);
router.get('/posts', auth, posts.listPosts);
router.get('/posts/:id', auth, posts.listPostById);
router.get('/users/posts/:id', auth, posts.retrieveUserPostById);


export default router;