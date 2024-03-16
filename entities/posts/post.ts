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
                userIdPost: user?.id,
                userName: user?.name
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
                userIdPost: encontartPostId?.id
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

///////////////////////////          MÉTODO ACTUALIZAR POST POR ID       /////////////////////////////
const actualizarPostPorId = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId
        const postId = req.params.id;
        const { title, contenido } = req.body

        const user = await UserModel.findOne( { _id: userId } )

        const encontartPostId = await PostModel.findOne( { _id: postId } )

        if (!encontartPostId) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Post no encontrado"
                }
            )
        }

        const userIdEnPost = await PostModel.findOne( { userIdPost: encontartPostId?.id } )

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

///////////////////////////          MÉTODO LISTAR MIS POSTS       /////////////////////////////
const listarMisPosts = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;

        const user = await UserModel.findOne
            (
                { _id: userId }
            )

        const userIdEnPost = await PostModel.find(
            { userIdPost: user?.id }
        )

        res.status(200).json(
            {
                success: true,
                message: "Tus lista de posts",
                data: userIdEnPost
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: true,
                message: "Error en listar tus posts",
            }
        )
    }
}

///////////////////////////          MÉTODO LISTAR POSTS       /////////////////////////////
const listarPosts = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;

        const listPosts = await PostModel.find()

        res.status(200).json(
            {
                success: true,
                message: "Lista encontrado con succeso",
                data: listPosts
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error en listar los posts"
            }
        )
    }
}

///////////////////////////          MÉTODO LISTAR POSTS POR ID      /////////////////////////////
const listarPostPorId = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const postId = req.params.id;

        const listPost = await PostModel.findOne
        (
            { _id: postId }
        )

        if(!listPost){
           return res.status(404).json(
            {
                success: false,
                message: "Post no encontrado"
            }
        ) 
        }

        res.status(500).json(
            {
                success: true,
                message: "Post encontrado con succeso",
                data: listPost
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error en listar los posts"
            }
        )
    }
}

///////////////////////////          MÉTODO RECUPERAR POSTS DE UN USUARIO POR ID      /////////////////////////////
const recuperarPostDeUnUsuarioPorId = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const idUserEnPost = req.params.id;

        const IdUser = await UserModel.findById( idUserEnPost )
        if(!IdUser){
            return res.status(404).json(
                {
                    success: false,
                    message: "Usuario no encontrado"
                }
            )
        }

        const encontrarUserIdEnPost = await PostModel.findOne(
            { userIdPost: IdUser?.id }
        )

        if( encontrarUserIdEnPost?.id !== IdUser?.id ){
            return res.status(404).json(
                {
                    success: false,
                    message: "Usuario no tine posts"
                }
            )
        }

        const encontrarUserIdEnPosts = await PostModel.find(
            { userIdPost: IdUser?.id}
        )
        return res.status(200).json(
            {
                success: true,
                message: "Posts encontrado con succeso",
                data: encontrarUserIdEnPosts
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Error en buscar posts"
            }
        )
    }
}

export {
    crearPost, EliminarPostPorId, actualizarPostPorId,
    listarMisPosts, listarPosts, listarPostPorId,
    recuperarPostDeUnUsuarioPorId
}