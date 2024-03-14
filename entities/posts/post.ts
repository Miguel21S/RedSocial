import { Request, Response } from "express"
import PostModel from "./PostsModel";
import UserModel from "../users/UsersModel";

///////////////////////////          MÉTODO CREAR POST           /////////////////////////////////////
const crearPost = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const { title, contenido } = req.body;

        const user = await UserModel.findOne({ _id: userId })

        const publicarPost = await PostModel.create(
            {
                title,
                contenido,
                id: user?.id,
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

///////////////////////////          MÉTODO ELIMINAR POST           /////////////////////////////////////
const EliminarPostPorId = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const postId = req.params.id;

        const user = await UserModel.findOne(
            {
                _id: userId
            }
        )

        const encontartPostId = await PostModel.findOne(
            {
                _id: postId
            }
        )

        if (!encontartPostId) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Post no encontrado"
                }
            )
        }

        const userIdEnPost = await PostModel.findOne(
            {
                id: encontartPostId?.id
            }
        )

        if (userIdEnPost?.id !== user?.id) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Usuario no tienes permiso para eliminar Post"
                }
            )

        }

        const deletePost = await PostModel.findByIdAndDelete(postId)

        res.status(200).json(
            {
                success: true,
                message: "Post eliminado con suceso"
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error al intentar eliminar el post"
            }
        )
    }

}

///////////////////////////          MÉTODO ACTUALIZAR POST POR ID          /////////////////////////////////////
const actualizarPostPorId = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId
        const postId = req.params.id;
        const { title, contenido } = req.body

        const user = await UserModel.findOne(
            {
                _id: userId
            }
        )

        const encontartPostId = await PostModel.findOne(
            {
                _id: postId
            }
        )

        if (!encontartPostId) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Post no encontrado"
                }
            )
        }

        const userIdEnPost = await PostModel.findOne(
            {
                id: encontartPostId?.id
            }
        )

        if (userIdEnPost?.id !== user?.id) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Usuario no tienes permiso para editar Post"
                }
            )
        }

        const updatePost = await PostModel.findByIdAndUpdate(
            {
                _id: postId
            },
            {
                title: title,
                contenido: contenido
            },
            {
                new: true
            }
        )

        res.status(200).json(
            {
                success: true,
                message: "Post actualizado con suceso"
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error al intentar actualizar el post"
            }
        )
    }
}

export {
    crearPost, EliminarPostPorId, actualizarPostPorId
}