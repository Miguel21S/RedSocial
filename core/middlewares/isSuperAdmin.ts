
import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../../core/middlewares/auth"
import UserModel from "../../entities/users/UsersModel";
import { NotFoundError, UnauthorizedError } from "../../entities/Error/manejoErrores";

export const isSuperAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let userRole;
        const user = await UserModel.findById(
            {
                _id: req.tokenData.usuarioId
            }
        )
        if (!user) {
            throw new NotFoundError('No se encontraron datos de usuario en la solicitud');

        }

        userRole = user.role
        console.log(userRole)

        if( userRole !== "superAdmin"){
            throw new UnauthorizedError( 'Usuario no autorizado' )
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "No tienes permiso"
        })
    }
}