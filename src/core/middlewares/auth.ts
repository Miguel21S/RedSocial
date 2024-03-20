
// auth.ts
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenData } from "../../types";
import { CustomError, ServerError, UnauthorizedError } from "../utils/errorHandling";

export interface CustomRequest extends Request {
    tokenData: TokenData;
}

export const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
           throw new UnauthorizedError( 'Unauthorized user' )
        }
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET as string,
        )
        req.tokenData = decode as TokenData;
        next();
    } catch (error) {
        if( error instanceof CustomError ){
            error.sendResponse(res);

        } else {
            
            const serverError = new ServerError();
            serverError.sendResponse(res);
        }
    }
};
