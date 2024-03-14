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
        const id = req.params.id;

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

        const userIdEnPost = await PostModel.findOne(
            
              {  id: encontartPostId?.id}
            
        )

        if(userIdEnPost?.id !== user?.id){
            return res.status(404).json(
                {
                    success: false,
                    message: "Usuario no tienes permiso para eliminar Post"
                }
            )

        }

        if(!encontartPostId){
            return res.status(404).json(
                {
                    success: false,
                    message: "Post no encontrado"
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

export {
    crearPost, EliminarPostPorId
}