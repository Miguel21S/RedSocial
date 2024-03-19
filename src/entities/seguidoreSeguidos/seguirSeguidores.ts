
import { Request, Response } from "express";
import UserModel from "../users/UsersModel";
import SeguidoresSeguidosModel from "./seguidoresSeguidosModel";
import { CustomError, NotFoundError, ServerError } from "../../core/utils/manejoErrores";

const seguirUser = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const idUserSiguiendo = req.params.id;
        let estadoSeguiendo = 1;

        const user = await UserModel.findOne({ _id: userId });
        if (!user?._id) {
            throw new NotFoundError('No se encontraron datos del usuario en la solicitud');
        }

        const userSeguiendo = await UserModel.findOne({ _id: idUserSiguiendo });

        if (!userSeguiendo?._id) {
            throw new NotFoundError('No se encontraron datos del usuario a seguir en la solicitud');
        }

        if (user?._id.equals(userSeguiendo?._id)) {
            return res.json(
                {
                    success: false,
                    message: "No se puedes seguirte a ti mismo"
                }
            )
        }

        const yaSuigues = await SeguidoresSeguidosModel.findOne(
            {
                IdUser: user?._id,
                idUserSiguiendo: userSeguiendo?._id,

            }
        )

        if (yaSuigues) {
            estadoSeguiendo = yaSuigues.estadoSeguiendo === 1 ? 0 : 1;
            yaSuigues.estadoSeguiendo = estadoSeguiendo;
            await yaSuigues.save();

        } else {

            await SeguidoresSeguidosModel.create(
                {
                    estadoSeguiendo: estadoSeguiendo,
                    idUserSiguiendo: userSeguiendo?._id,
                    NameUserSiguiendo: userSeguiendo?.name,
                    IdUser: user?._id,
                    NameUser: user?.name
                }
            );
        }

        res.status(200).json(
            {
                success: true,
                message: "Listo ahora estas siguiendo a ..."
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

const verMisSeguidores = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;

        const user = await UserModel.findOne( { _id: userId } )
        if(!user?._id){
            throw new NotFoundError('No se encontraron datos del usuario a seguir en la solicitud');
        }
        
        const miSeguidores = await SeguidoresSeguidosModel.find(
            {
                idUserSiguiendo: user?._id
            }
        ). select("NameUser")
     
        res.status(200).json(
            {
                success: false,
                message: "Lista de seguidores",
                data: miSeguidores
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

export {
    seguirUser, verMisSeguidores
}