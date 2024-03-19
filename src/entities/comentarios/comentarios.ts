
import { Request, Response } from "express"
import ComentarioModel from "./ComentariosModel";
import UserModel from "../users/UsersModel";
import PostModel from "../posts/PostsModel";
import { Types } from "mongoose";
import { CustomError, ForbiddenError, NotFoundError, ServerError } from "../../core/utils/manejoErrores";

////////////////////////// MÉTODO COMENTARIO     ////////////////////////
const crearComentario = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const postId = req.params.id;
        const { comentario } = req.body;

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            throw new NotFoundError(' No se encontraron datos de usuario en la solicitud ');
        }

        const idPosts = await PostModel.findOne({ _id: postId });
        if (!idPosts) {
            throw new NotFoundError(' No se encontraron datos del post en la solicitud ');
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
        if( error instanceof CustomError){
            error.sendResponse(res);
            
        } else {
            const serverError = new ServerError();
            serverError.sendResponse(res);
        }
    }
}

////////////////////////// MÉTODO FILTRAR BUSQUEDA DE COMENTARIO     ////////////////////////
const buscarComentario = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const { idComentario, idPos, userName } = req.query;
        let limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit

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
        .limit(limit)
        .skip(skip)

        res.status(200).json(
            {
                success: true,
                message: "Datos del filtro",
                data: mostrarIdComentario
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

////////////////////////// MÉTODO EDITAR COMENTARIO     ////////////////////////
const editarComentario = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const { comentario } = req.body;
        const comentarioId = req.params.id;

        const user = await UserModel.findOne({ _id: userId });

        const encontrarcomentario = await ComentarioModel.findOne({ _id: comentarioId });
        if (!encontrarcomentario) {
            throw new NotFoundError('No se encontraron datos del comentario en la solicitud');
        }

        const donoComentario = await ComentarioModel.findOne(
            {
                userIdComentario: user?.id
            }
        );

        if (!donoComentario) {
            throw new NotFoundError('No se encontraron datos de usuario en la solicitud');
        }

        const comentarioEditar = await ComentarioModel.findByIdAndUpdate(
            { _id: comentarioId },

            { comentario: comentario },

            { new: true }
        );
        return res.status(200).json(
            {
                success: true,
                message: "Comentario editado con succeso",
                data: comentarioEditar
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

////////////////////////// MÉTODO ELIMINAR COMENTARIO     ////////////////////////
const eliminarComentario = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const idComentario = req.params.id;

        const user = await UserModel.findOne({ _id: userId });

        const comentarioId = await ComentarioModel.findOne({ _id: idComentario });
        if (!comentarioId) {
            throw new NotFoundError('No se encontraron datos del comentario en la solicitud');
        }

        const donoPostId = await ComentarioModel.findOne({ userIdPost: user?.id })

        const donoIdUserComentario = await ComentarioModel.findOne(
            {
                userIdComentario: user?.id,
                _id: comentarioId

            }
        )

        if (!donoPostId && !donoIdUserComentario) {
            throw new ForbiddenError( 'Usuario no permitido' )
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
        if( error instanceof CustomError){
            error.sendResponse(res);
            
        } else {
            const serverError = new ServerError();
            serverError.sendResponse(res);
        }
    }
}

export {
    crearComentario, editarComentario, eliminarComentario,
    buscarComentario
}