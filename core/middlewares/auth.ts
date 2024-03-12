
// auth.ts
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenData } from "../../types";

export interface CustomRequest extends Request {
    tokenData: TokenData;
}

export const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Usuario no authorizado"
            })
        }
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET as string,
        )
        req.tokenData = decode as TokenData;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "JWT no valido"
        })
    }
};
