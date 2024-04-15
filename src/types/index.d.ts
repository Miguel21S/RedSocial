import { Number } from "mongoose";

export type TokenData = {
    userId: number,
    userRole: string
};

declare global{
    namespace Express{
        export interface Request{
            tokenData: TokenData;
        }
    }
}