
import { Router } from "express";
import * as followingFollowers from "./followingFollowersControllers";
import { auth } from "../../core/middlewares/auth";

const router = Router();
router.post('/users/follow/:id', auth, followingFollowers.followingUser);
router.get('/users/following', auth, followingFollowers.listMyFollowing);
router.get('/users/followers', auth, followingFollowers.followers);


export default router;