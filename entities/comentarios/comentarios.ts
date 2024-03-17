
import { Request, Response } from "express"
import ComentarioModel from "./ComentariosModel";
import UserModel from "../users/UsersModel";
import PostModel from "../posts/PostsModel";
import { Types } from "mongoose";

////////////////////////// MÉTODO COMENTARIO     ////////////////////////
const crearComentario = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const postId = req.params.id;
        const { comentario } = req.body;

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
        console.log(idPosts)
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
                userNamePost: idPosts?.userName,
                userIdComentario: user?.id,
                userNameComentario: user.name
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

////////////////////////// MÉTODO FILTRAR BUSQUEDA DE COMENTARIO     ////////////////////////
const buscarComentario = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const { idComentario, idPos, userName } = req.query;

        interface queryfiltrsI {
            idComentario?: Types.ObjectId;
            idPost?: Types.ObjectId;
            userName?: string;
        }

        const queryfiltrs: queryfiltrsI = {}
        if (idComentario && Types.ObjectId.isValid(idComentario as string)) {
            queryfiltrs.idComentario = new Types.ObjectId(idComentario as string)
        }

        if (idPos && Types.ObjectId.isValid(idPos as string)) {
            queryfiltrs.idPost = new Types.ObjectId(idPos as string);
        }

        if (userName) {
            queryfiltrs.userName = userName as string
        }

        const mostrarIdComentario = await ComentarioModel.find(queryfiltrs)

        res.status(200).json(
            {
                success: true,
                message: "Datos del filtro",
                data: mostrarIdComentario
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                meassage: "Error en filtrar datos"
            }
        )
    }
}

////////////////////////// MÉTODO EDITAR COMENTARIO     ////////////////////////
const editarComentario = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const { comentario } = req.body;
        const comentarioId = req.params.id;

        const user = await UserModel.findOne({ _id: userId });

        const encontrarcomentario = await ComentarioModel.findOne({ _id: comentarioId });
        if (!encontrarcomentario) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Comentario no encontrado"
                }
            )
        }

        const donoComentario = await ComentarioModel.findOne(
            {
                userIdComentario: user?.id
            }
        );

        if (!donoComentario) {
            return res.status(404).json(
                {
                    success: false,
                    message: "No tienes permisión para editar post"
                }
            )
        }

        const comentarioEditar = await ComentarioModel.findByIdAndUpdate(
            {
                _id: comentarioId
            },
            {
                comentario: comentario
            },
            {
                new: true
            }
        );
        return res.status(200).json(
            {
                success: true,
                message: "Comentario editado con succeso",
                data: comentarioEditar
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: true,
                message: "Error en editar comentario"
            }
        )
    }
}

////////////////////////// MÉTODO ELIMINAR COMENTARIO     ////////////////////////
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

        const comentarioEliminar = await ComentarioModel.findByIdAndDelete(comentarioId);
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
    crearComentario, editarComentario, eliminarComentario,
    buscarComentario
}