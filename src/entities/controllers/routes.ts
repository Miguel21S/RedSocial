
import * as controller from "./authControllers";
import { Router } from "express";

const router = Router();

router.post('/auth/register', controller.registrar);
router.post('/auth/login', controller.login);

export default router;