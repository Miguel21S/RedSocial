
import { Request, Response } from "express"
import ComentarioModel from "./ComentariosModel";
import UserModel from "../users/UsersModel";
import PostModel from "../posts/PostsModel";

export const crearComentario = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const { comentario, postId } = req.body;

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Usuario no encontrado"
                }
            )
        }

        const idPost = await PostModel.findOne({ _id: postId });
        if (!idPost) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Post no encontrado"
                }
            )
        }

        const comentarPost = await ComentarioModel.create(
            {
                comentario,
                postID: postId,
                postId: idPost?._id,
                userIdComentario: user?.id,
                userName: user.name
            }
        )

        return res.status(200).json(
            {
                success: true,
                message: "Post creado con succeso",
                data: comentarPost
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error en encontar el post"
            }
        )
    }
}