import { Request, Response } from "express"
import PostModel from "./PostsModel";
import UserModel from "../users/UsersModel";
import { CustomError, ForbiddenError, NotFoundError, ServerError } from "../../core/utils/errorHandling";

///////////////////////////          CREATE POST METHOD           /////////////////////////////////////
const creatPost = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const { title, tests } = req.body;

        const user = await UserModel.findOne({ _id: userId })
    
        const publicPost = await PostModel.create(
            {
                title,
                tests,
                userIdPost: user?.id,
                userName: user?.name
            },
        )
       
        res.status(200).json(
            {
                success: true,
                message: "Post created with success",
                data: publicPost
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

///////////////////////////          METHOD UPDATE POST BY ID       /////////////////////////////
const updatePostById = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId
        const postId = req.params.id;
        const { title, tests } = req.body

        const user = await UserModel.findOne( { _id: userId } )

        const foundPostById = await PostModel.findOne( { _id: postId } )

        if (!foundPostById) {
            throw new NotFoundError( 'No data found in the request' );
        }

        const userIdEnPost = await PostModel.findOne( { userIdPost: foundPostById?.id } )

        if (userIdEnPost?.id !== user?.id) {
            throw new ForbiddenError( 'User not allowed' )
        }

        const updatePost = await PostModel.findByIdAndUpdate(
            {  _id: postId },
            
            {
                title: title,
                tests: tests
            },

            { new: true }
        )

        res.status(200).json(
            {
                success: true,
                message: "Post update with success"
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

///////////////////////////          METHOD LIST MY POSTS       /////////////////////////////
const listMyPosts = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        let limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit

        const user = await UserModel.findOne
            (
                { _id: userId }
            )

        const userIdInPost = await PostModel.find(
            { userIdPost: user?.id }
        )
        .limit(limit)
        .skip(skip)

        res.status(200).json(
            {
                success: true,
                message: "List of posts",
                data: userIdInPost
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

///////////////////////////          LIST POSTS METHOD       /////////////////////////////
const listPosts = async (req: Request, res: Response) => {
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
                message: "List found with success",
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

///////////////////////////          LIST POSTS BY ID METHOD      /////////////////////////////
const listPostById = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const postId = req.params.id;

        const listPost = await PostModel.findOne
        (
            { _id: postId }
        )

        if(!listPost){
            throw new NotFoundError( 'No list data found in the application' );
        }

        res.status(200).json(
            {
                success: true,
                message: "Post found with success",
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

///////////////////////////          METHOD TO RETRIEVE POSTS OF A USER BY ID      /////////////////////////////
const retrieveUserPostById = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const idUserEnPost = req.params.id;
        let limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit

        const IdUser = await UserModel.findById( idUserEnPost )
        if(!IdUser){
             throw new NotFoundError( 'No user data found in the request' );
        }

        const foundUserIdInPost = await PostModel.findOne(
            { userIdPost: IdUser?.id }
        )

        if( foundUserIdInPost?.id !== IdUser?.id ){
            return res.json(
                {
                    success: false,
                    message: "User has no posts"
                }
            )
        }

        const foundUserIdInPosts = await PostModel.find(
            { userIdPost: IdUser?.id}
        )
        .limit(limit)
        .skip(skip)
        
        return res.status(200).json(
            {
                success: true,
                message: "Posts found with succeso",
                data: foundUserIdInPosts
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

///////////////////////////          DELETE POST METHOD           /////////////////////////////////////
const deletePostById = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const postId = req.params.id;

        const user = await UserModel.findOne( { _id: userId } )

        const foundPostById = await PostModel.findOne( { _id: postId } )

        if (!foundPostById) {
            throw new NotFoundError( 'No data found in the request' );
        }

        const userIdInPost = await PostModel.findOne(
            {
                userIdPost: foundPostById?.id
            }
        )

        if (userIdInPost?.id !== user?.id) {
            throw new ForbiddenError( 'User not allowed' )

        }

        const deletePost = await PostModel.findByIdAndDelete(postId)

        res.status(200).json(
            {
                success: true,
                message: "Post successfully deleted"
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
    creatPost, updatePostById, listMyPosts,
    listPosts, listPostById, retrieveUserPostById,
    deletePostById
}