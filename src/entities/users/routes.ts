
import { Router } from "express";
import * as users from "./userControllers";
import { auth } from "../../core/middlewares/auth";
import { isSuperAdmin } from "../../core/middlewares/isSuperAdmin";

const router = Router();

// router.put('/token', auth, addSiguiendo);
router.get('/users/profile', auth, users.myProfile)
router.get('/users', auth, isSuperAdmin, users.listAllUsers);
router.put('/users/profile', auth, users.updateUser);
router.get('/users', auth, isSuperAdmin, users.updateRoleById);
router.delete('/users/:id', auth, isSuperAdmin, users.filtrarByEmail);
router.put('/users/:id', auth, isSuperAdmin, users.DeleteById);


export default router;