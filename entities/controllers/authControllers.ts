
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../users/UsersModel";
import  { CustomError, ServerError } from "../Error/manejoErrores";

////////////   MÉTODO REGISTRAR USUARIO   //////////////////////////
const registrar = async (req: Request, res: Response) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if ((password.length < 8) || (password.length > 15)) {
            return res.status(404).json({
                success: false,
                message: "La contraseña debe ser mayor de 8 caracteres y menor o igual a 15"
            })
        }

        // VALIDACIÓN DEL EMAIL
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "formato de email invalido"
                }
            )
        }

        // ENCRIPTACIÓN DEL PASSWORD
        const pwdEncryptado = bcrypt.hashSync(password, 8)

        const crearNuevoUser = await UserModel.create(
            {
                name: name,
                email: email,
                password: pwdEncryptado
            }
        )

        res.status(200).json(
            {
                success: true,
                message: "Usuario creado con suceso",
                data: crearNuevoUser
            }
        )
    } catch (error) {
        if(error instanceof CustomError){
            error.sendResponse(res)

        } else {

            const serverError = new ServerError();
            serverError.sendResponse(res)
        }
    }
}

////////////   MÉTODO LOGIN   //////////////////////////
const login = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(404).json(
                {
                    success: false,
                    mesage: "Datos del login incorrecto"
                }
            )
        }

        const user = await UserModel.findOne(
            {
                email: email
            }
        ).select("password")

        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    mesage: "Dato incorrecto"
                }
            )
        }

        ///////    VALIDAR PASSWORD
        const validarPwd = bcrypt.compareSync(password, user!.password);
        
        if (!validarPwd) {
            return res.json(
                {
                    success: false,
                    mesage: "Password invalido"
                }
            )
        }

        ///////////     CREAR TOKEN 
        const token = jwt.sign(
            {
                usuarioId: user._id,
                usuarioName: user.role
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "2h"
            }
            
        )
 
        res.status(200).json({
            success: true,
            message: "Se ha loguiado con suceso",
            token: token,
        });
    } catch (error) {
        if(error instanceof CustomError){
            error.sendResponse(res)

        } else {

            const serverError = new ServerError();
            serverError.sendResponse(res)
        }
    }
}

export {
    registrar, login
}