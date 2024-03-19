// userP.ts
import { Request, Response } from "express";
import UserModel from "./UsersModel";
import bcrypt from "bcrypt";
import { CustomError, NotFoundError, ServerError } from "../../core/utils/manejoErrores";

/////////////////          MÉTODO LISTAR TODOS LOS USUARIOS         /////////////////////////////////
const ListarTodosUsuarios = async (req: Request, res: Response) => {
    try {
        let limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit
        const lista = await UserModel.find()
            .select("name")
            .select("email")
            .limit(limit)
            .skip(skip);
            
        res.status(200).json(
            {
                success: true,
                message: "Listado",
                data: lista
            }
        )
   
    } catch (error) {
           if( error instanceof CustomError){
            error.sendResponse(res);

           } else {

            const serverError = new ServerError();
            serverError.sendResponse(res);
           }
        
    }
};

/////////////////          MÉTODO ACTUALIZAR         /////////////////////////////////
const actualizarUsuario = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const name = req.body.name;
        const email = req.body.email;
        const newPassword = req.body.password;

        // ENCRIPTACIÓN DEL PASSWORD
        const pwdEncryptado = bcrypt.hashSync(newPassword, 8)

        const updateUser = await UserModel.findByIdAndUpdate(
            {
                _id: userId
            },
            {
                name: name,
                email: email,
                password: pwdEncryptado
            },
            {
                new: true
            }
        )

        res.status(200).json(
            {
                success: false,
                message: "Datos actualizado con suceso",
                data: updateUser
            }
        )

    } catch (error) {
        if( error instanceof CustomError){
            error.sendResponse(res);

        } else {
            const serverError = new ServerError();
            serverError.sendResponse(res);
            
        }
    }
}

/////////////////          MÉTODO BUSCAR POR EMAIL         /////////////////////////////////
const filtrarPorEmail = async (req: Request, res: Response) => {
    try {
        const email = req.query.email;

        interface queryfiltrsI {
            email?: string
        }

        const queryfiltrs: queryfiltrsI = {};
        if (email) {
            queryfiltrs.email = email as string;
        }

        const getEmail = await UserModel.find(queryfiltrs)

        res.status(200).json({
            success: true,
            message: "Usuario encontrado con suceso",
            data: getEmail
        })
    } catch (error) {
        if( error instanceof CustomError){
            error.sendResponse(res);

        } else {
            const serverError = new ServerError();
            serverError.sendResponse(res);
            
        }
    }
}

/////////////////          MÉTODO ELIMINAR POR ID         /////////////////////////////////
const EliminarPorId = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        
        const confirmar = await UserModel.findOne(
            {
                _id:userId
            }
        )

        if(!confirmar){
            throw new NotFoundError( 'No se encontraron datos en la solicitud' );
        }
        const deleteUser = await UserModel.findByIdAndDelete(userId)

        res.status(200).json(
            {
                success: true,
                message: "Usuario eliminado con suceso"
            }
        )
    } catch (error) {
        if( error instanceof CustomError){
            error.sendResponse(res);

        } else {
            const serverError = new ServerError();
            serverError.sendResponse(res);
            
        }
    }
}

/////////////////          MÉTODO BUSCAR POR EMAIL         /////////////////////////////////
const actualizarRolePorId = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const role = req.body.role;

        const updateRole = await UserModel.findOneAndUpdate(
            {
                _id: userId
            },
            {
                role: role
            },
            {
                new: true
            }
        )

        if (!updateRole) {
            throw new NotFoundError( 'No se encontraron datos en la solicitud' )
        }

        res.status(200).json({
            success: true,
            message: "Role actualizado con éxito"
        });
    } catch (error) {
        if( error instanceof CustomError){
            error.sendResponse(res);

        } else {
            const serverError = new ServerError();
            serverError.sendResponse(res);
            
        }
    }
}

export {
    ListarTodosUsuarios, actualizarUsuario, filtrarPorEmail,
    EliminarPorId, actualizarRolePorId
}
