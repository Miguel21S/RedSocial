
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../users/UsersModel";
import  { CustomError, ServerError } from "../../core/utils/errorHandling";

////////////   METHOD REGISTER USER   //////////////////////////
const register = async (req: Request, res: Response) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const validPwd = /^(?=.*\d)(?=.*[!\"#\$%&'()*+,-./:;<=>?@[\\\]^_])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/
        if(password.length < 8){
            return res.status(404).json({
                success: false,
                message: "Password must be longer than 8 characters"
            })
        }

        if (!validPwd.test(password)) {
            return res.status(404).json({
                success: false,
                message: "Password must have at least one digit, one special character, one uppercase letter, one lowercase letter, and no space."
            })
        }

        // VALIDACIÓN DEL EMAIL
        const validEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "invalid email format"
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
                message: "User successfully created",
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

////////////   LOGIN METHOD   //////////////////////////
const login = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(404).json(
                {
                    success: false,
                    mesage: "Incorrect login data"
                }
            )
        }

        const user = await UserModel.findOne( { email: email } )

        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    mesage: "Incorrect data"
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
                name:user.name,
                email:user.email,
                userId: user._id,
                userRole: user.role
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "5h"
            }
            
        )
 
        res.status(200).json({
            success: true,
            message: "Successfully completed",
            token: token,
        });
    } catch (error: any) {
        if(error instanceof CustomError){
            error.sendResponse(res)

        } else {

            const serverError = new ServerError();
            serverError.sendResponse(res)
        }
    }
}

export {
    register, login
}