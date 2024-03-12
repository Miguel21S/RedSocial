
import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../../core/middlewares/auth"

export const isSuperAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        // console.log(req.tokenData.usuarioId)
        // console.log(req.tokenData)
        if(req.tokenData.usuarioName !== "superAdmin"){
            return res.status(401).json({
                success: false,
                message: "No authorizado"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "No tienes permiso"
        })
    }
}