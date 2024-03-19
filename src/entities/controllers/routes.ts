
import * as controller from "./authControllers";
import { Request, Response, Router } from "express";

const router = Router();

router.post('/auth/register', controller.registrar);
router.post('/auth/login', controller.login);
router.get("/api/healthy", (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: "server is healthy" })
  })

export default router;