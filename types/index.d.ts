import { Number } from "mongoose";

export type TokenData = {
    usuarioId: number,
    usuarioName: string
};

declare global{
    namespace Express{
        export interface Request{
            tokenData: TokenData;
        }
    }
}