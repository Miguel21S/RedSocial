

import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../../core/middlewares/auth"
import UserModel from "../../entities/users/UsersModel";
import { CustomError, NotFoundError, ServerError, UnauthorizedError } from "../utils/errorHandling";

export const isSuperAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let userRole;
        const user = await UserModel.findById(
            {
                _id: req.tokenData.userId
            }
        )
        if (!user) {
            throw new NotFoundError('No user data found in the request');

        }

        userRole = user.role
        if (userRole !== "superAdmin") {
            throw new UnauthorizedError('Unauthorized user')
        }
        next();
    } catch (error) {
        if (error instanceof CustomError) {
            error.sendResponse(res);

        } else {
            const serverError = new ServerError();
            serverError.sendResponse(res);

        }
    }
}