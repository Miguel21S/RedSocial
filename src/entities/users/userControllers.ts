// userP.ts
import { Request, Response } from "express";
import UserModel from "./UsersModel";
import bcrypt from "bcrypt";
import { CustomError, NotFoundError, ServerError, UnauthorizedError } from "../../core/utils/errorHandling";

/////////////////          METHOD MY PROFILE         /////////////////////////////////
const myProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;

        const user = await UserModel.findOne({ _id: userId });
        if (!userId) {
            throw new NotFoundError('No data found in the request');
        }

        const frofile = await UserModel.find({ _id: user?._id })
            .select("name")
            .select("email")

        res.status(200).json(
            {
                success: true,
                message: "My Profile",
                data: frofile
            }
        )

    } catch (error) {
        if (error instanceof CustomError) {
            error.sendResponse(res);

        } else {
            const serverError = new ServerError();
            serverError.sendResponse(res);

        }
    }
}
/////////////////          METHOD LIST ALL USERS         /////////////////////////////////
const listAllUsers = async (req: Request, res: Response) => {
    try {
        // let limit = Number(req.query.limit) || 10
        // const page = Number(req.query.page) || 1
        // const skip = (page - 1) * limit

        const lista = await UserModel.find()
            .select("name")
            .select("email")
            .select("role")
        // .limit(limit)
        // .skip(skip);

        res.status(200).json(
            {
                success: true,
                message: "Listado",
                data: lista
            }
        )

    } catch (error) {
        if (error instanceof CustomError) {
            error.sendResponse(res);

        } else {

            const serverError = new ServerError();
            serverError.sendResponse(res);
        }

    }
};

/////////////////          UPDATE METHOD         /////////////////////////////////
const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;
        const name = req.body.name;
        const email = req.body.email;
        // const newPassword = req.body.password;

        // ENCRIPTACIÓN DEL PASSWORD
        // const pwdEncryptado = bcrypt.hashSync(newPassword, 8)

        const updateUser = await UserModel.findByIdAndUpdate(
            {
                _id: userId
            },
            {
                name: name,
                email: email,
                // password: pwdEncryptado
            },
            {
                new: true
            }
        )

        res.status(200).json(
            {
                success: true,
                message: "Data updated with success",
                data: updateUser
            }
        )

    } catch (error) {
        if (error instanceof CustomError) {
            error.sendResponse(res);

        } else {
            const serverError = new ServerError();
            serverError.sendResponse(res);

        }
    }
}

/////////////////          SEARCH BY EMAIL METHOD         /////////////////////////////////
const filtrarByEmail = async (req: Request, res: Response) => {
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
            message: "User found with success",
            data: getEmail
        })
    } catch (error) {
        if (error instanceof CustomError) {
            error.sendResponse(res);

        } else {
            const serverError = new ServerError();
            serverError.sendResponse(res);

        }
    }
}

/////////////////          MÉTODO ELIMINAR POR ID         /////////////////////////////////
///////////////  REVISAR METODO ELIMINAR USUARIO  ///////////////////////
const DeleteById = async (req: Request, res: Response) => {
    try {
        const userIdLogin = req.tokenData.userId;
        const userId = req.params.id;

        console.log("userIdLogin: ", userIdLogin)
        console.log("ID PARAMS: ", userId);

        const userToken = await UserModel.findById({ _id: userIdLogin });
        console.log("userToken: ", userToken)
        if (!userToken) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        if (userToken.role  !== "superAdmin") {
            throw new UnauthorizedError ("You do not have authorization to delete users");
            // return res.status(403).json({
            //     success: false,
            //     message: "You do not have authorization to delete users"
            // });
        }
        console.log("userToken.userRole: ", userToken.role)

        const userToDelete = await UserModel.findById(userId);

        if (!userToDelete) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (userToDelete?._id.userRole === "superAdmin") {
            return res.status(403).json({
                success: false,
                message: "You cannot delete a superAdmin user"
            });
        }

        await UserModel.findByIdAndDelete(userId);

        console.log("userToDelete: ", userToDelete)

        res.status(200).json({
            success: true,
            message: "User successfully deleted"
        });
    } catch (error) {
        if (error instanceof CustomError) {
            error.sendResponse(res);

        } else {
            const serverError = new ServerError();
            serverError.sendResponse(res);

        }
    }
}

/////////////////          MÉTODO BUSCAR POR EMAIL         /////////////////////////////////
const updateRoleById = async (req: Request, res: Response) => {
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
            throw new NotFoundError('No data found in the request')
        }

        res.status(200).json({
            success: true,
            message: "Role successfully updated"
        });
    } catch (error) {
        if (error instanceof CustomError) {
            error.sendResponse(res);

        } else {
            const serverError = new ServerError();
            serverError.sendResponse(res);

        }
    }
}

export {
    myProfile, listAllUsers, updateUser,
    filtrarByEmail, DeleteById, updateRoleById
}