
import { Request, Response } from "express"
import ComentarioModel from "./ComentariosModel";
import UserModel from "../users/UsersModel";
import PostModel from "../posts/PostsModel";

const crearComentario = async (req: Request, res: Response) => {
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

        const idPosts = await PostModel.findOne({ _id: postId });
        if (!idPosts) {
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
                idPost: idPosts?._id,
                userIdPost: idPosts?.userIdPost,
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

const eliminarComentario = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const idComentario = req.params.id;

        const user = await UserModel.findOne({ _id: userId });

        const comentarioId = await ComentarioModel.findOne({ _id: idComentario });
        if (!comentarioId) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Comentario no encontrado"
                }
            )
        }
        
        const donoPostId = await ComentarioModel.findOne({ userIdPost: user?.id })
        
        const donoIdUserComentario = await ComentarioModel.findOne(
            {
                userIdComentario: user?.id,
                _id: comentarioId

            }
        )
        
        if (!donoPostId && !donoIdUserComentario) {
            return res.status(404).json(
                {
                    success: false,
                    message: "No tienes permisión para eliminar el post"
                }
            )
        }

        const comentarioEliminar = await ComentarioModel.findByIdAndDelete( comentarioId );
        return res.status(200).json(
            {
                success: true,
                message: "Comentario eliminado con succeso",
                data: comentarioEliminar
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error al intentar eliminar comentario"
            }
        )
    }
}

export {
    crearComentario, eliminarComentario
}