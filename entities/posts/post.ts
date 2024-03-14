import { Request, Response } from "express"
import PostModel from "./PostsModel";
import UserModel from "../users/UsersModel";

///////////////////////////          MÉTODO CREAR POST           /////////////////////////////////////
const crearPost = async (req: Request, res:Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const { title, contenido } = req.body;

        const user = await UserModel.findOne( {_id:userId} )
        .select("name")

        const publicarPost = await PostModel.create(
            {
                title,
                contenido,
                name: user?.name
            },
        )

        res.status(200).json(
            {
                success: true,
                message: "Post creado con succeso",
                data: publicarPost
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error al crear post"
            }
        )
    }
}

export{
    crearPost
}