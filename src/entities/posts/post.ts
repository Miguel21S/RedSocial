import { Request, Response } from "express"
import PostModel from "./PostsModel";
import UserModel from "../users/UsersModel";
import { CustomError, ForbiddenError, NotFoundError, ServerError } from "../../core/utils/manejoErrores";

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
        if( error instanceof CustomError){
            error.sendResponse(res);

        } else {
            const serverError = new ServerError();
            serverError.sendResponse(res);
        }
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
            throw new NotFoundError( 'No se encontraron datos en la solicitud' );
        }

        const userIdEnPost = await PostModel.findOne( { userIdPost: encontartPostId?.id } )

        if (userIdEnPost?.id !== user?.id) {
            throw new ForbiddenError( 'Usuario no permitido' )
        }

        const updatePost = await PostModel.findByIdAndUpdate(
            {  _id: postId },
            
            {
                title: title,
                contenido: contenido
            },

            { new: true }
        )

        res.status(200).json(
            {
                success: true,
                message: "Post actualizado con suceso"
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

///////////////////////////          MÉTODO LISTAR MIS POSTS       /////////////////////////////
const listarMisPosts = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        let limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit

        const user = await UserModel.findOne
            (
                { _id: userId }
            )

        const userIdEnPost = await PostModel.find(
            { userIdPost: user?.id }
        )
        .limit(limit)
        .skip(skip)

        res.status(200).json(
            {
                success: true,
                message: "Lista de posts",
                data: userIdEnPost
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

///////////////////////////          MÉTODO LISTAR POSTS       /////////////////////////////
const listarPosts = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        let limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit

        const listPosts = await PostModel.find()
        .limit(limit)
        .skip(skip)

        res.status(200).json(
            {
                success: true,
                message: "Lista encontrado con succeso",
                data: listPosts
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
            throw new NotFoundError( 'No se encontraron datos de la lista en la solicitud' );
        }

        res.status(200).json(
            {
                success: true,
                message: "Post encontrado con succeso",
                data: listPost
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

///////////////////////////          MÉTODO RECUPERAR POSTS DE UN USUARIO POR ID      /////////////////////////////
const recuperarPostDeUnUsuarioPorId = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const idUserEnPost = req.params.id;
        let limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit

        const IdUser = await UserModel.findById( idUserEnPost )
        if(!IdUser){
             throw new NotFoundError( 'No se encontraron datos de usuario en la solicitud' );
        }

        const encontrarUserIdEnPost = await PostModel.findOne(
            { userIdPost: IdUser?.id }
        )

        if( encontrarUserIdEnPost?.id !== IdUser?.id ){
            return res.json(
                {
                    success: false,
                    message: "Usuario no tine posts"
                }
            )
        }

        const encontrarUserIdEnPosts = await PostModel.find(
            { userIdPost: IdUser?.id}
        )
        .limit(limit)
        .skip(skip)
        
        return res.status(200).json(
            {
                success: true,
                message: "Posts encontrado con succeso",
                data: encontrarUserIdEnPosts
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

///////////////////////////          MÉTODO ELIMINAR POST           /////////////////////////////////////
const EliminarPostPorId = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const postId = req.params.id;

        const user = await UserModel.findOne( { _id: userId } )

        const encontartPostId = await PostModel.findOne( { _id: postId } )

        if (!encontartPostId) {
            throw new NotFoundError( 'No se encontraron datos en la solicitud' );
        }

        const userIdEnPost = await PostModel.findOne(
            {
                userIdPost: encontartPostId?.id
            }
        )

        if (userIdEnPost?.id !== user?.id) {
            throw new ForbiddenError( 'Usuario no permitido' )

        }

        const deletePost = await PostModel.findByIdAndDelete(postId)

        res.status(200).json(
            {
                success: true,
                message: "Post eliminado con suceso"
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
    crearPost, EliminarPostPorId, actualizarPostPorId,
    listarMisPosts, listarPosts, listarPostPorId,
    recuperarPostDeUnUsuarioPorId
}