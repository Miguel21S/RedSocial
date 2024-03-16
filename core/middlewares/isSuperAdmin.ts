
import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../../core/middlewares/auth"
import UserModel from "../../entities/users/UsersModel";

export const isSuperAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const user = await UserModel.findById(
            {
                _id: req.tokenData.usuarioId
            }
        )
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }
        const userRole = user.role
        console.log(userRole)

        if( userRole !== "superAdmin"){
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