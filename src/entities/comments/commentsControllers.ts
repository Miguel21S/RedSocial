
import { Request, Response } from "express";
import UserModel from "../users/UsersModel";
import PostModel from "../posts/PostsModel";
import { Types } from "mongoose";
import { CustomError, ForbiddenError, NotFoundError, ServerError } from "../../core/utils/errorHandling";
import CommentsModel from "./CommentsModel";

////////////////////////// COMMENTARY METHOD     ////////////////////////
const createComment = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;
        const postId = req.params.id;
        const { comments } = req.body;

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            throw new NotFoundError(' No user data found in the request ');
        }

        const idPosts = await PostModel.findOne({ _id: postId });
        if (!idPosts) {
            throw new NotFoundError(' No post data found in the request ');
        }

        const comentarPost = await CommentsModel.create(
            {
                comments,
                idPost: idPosts?._id,
                userIdPost: idPosts?.userIdPost,
                userNamePost: idPosts?.userName,
                userIdComments: user?.id,
                userNameComments: user.name
            }
        )

        return res.status(200).json(
            {
                success: true,
                message: "Post created with success",
                data: comentarPost
            }
        )
    } catch (error) {
        if (error instanceof CustomError) {
            error.sendResponse(res);

        } else {
            const serverError = new ServerError();
            serverError.sendResponse(res);
        }
    }
}

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;
        let limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit

        const post = await PostModel.find()

        const commentsDPost = await CommentsModel.find({ idPost: post })
            .select("Comments")
            .select("idPost")
            .limit(limit)
            .skip(skip)

        return res.status(200).json(
            {
                success: true,
                message: " **************** ",
                data: commentsDPost
            }
        )
    } catch (error) {
        if (error instanceof CustomError) {
            error.sendResponse(res);

        } else {
            const serverError = new ServerError();
            serverError.sendResponse(res);
        }
    }
}

////////////////////////// FILTER COMMENT SEARCH METHOD     ////////////////////////
const searchComment = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;
        const { idComment, idPos, userName } = req.query;
        let limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit

        interface queryfiltrsI {
            idComment?: Types.ObjectId;
            idPost?: Types.ObjectId;
            userName?: string;
        }

        const queryfiltrs: queryfiltrsI = {}
        if (idComment && Types.ObjectId.isValid(idComment as string)) {
            queryfiltrs.idComment = new Types.ObjectId(idComment as string)
        }

        if (idPos && Types.ObjectId.isValid(idPos as string)) {
            queryfiltrs.idPost = new Types.ObjectId(idPos as string);
        }

        if (userName) {
            queryfiltrs.userName = userName as string
        }

        const showIdComment = await CommentsModel.find(queryfiltrs)
            .select("userNamePost")
            .select("userNameComentario")
            .select("comentario")
            .limit(limit)
            .skip(skip)

        res.status(200).json(
            {
                success: true,
                message: "Filter data",
                data: showIdComment
            }
        )

    } catch (error) {
        if (error instanceof CustomError) {
            error.sendResponse(res);

        } else {
            const serverError = new ServerError();
            serverError.sendResponse(res);
        }
    }
}

////////////////////////// EDIT COMMENT METHOD     ////////////////////////
const editComment = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;
        const { comment } = req.body;
        const commentId = req.params.id;

        const user = await UserModel.findOne({ _id: userId });

        const foundcomment = await CommentsModel.findOne({ _id: commentId });
        if (!foundcomment) {
            throw new NotFoundError('No comment data found in the request');
        }

        const authorComment = await CommentsModel.findOne(
            {
                userIdComments: user?.id
            }
        );

        if (!authorComment) {
            throw new NotFoundError('No user data found in the request');
        }

        const commentEdit = await CommentsModel.findByIdAndUpdate(
            { _id: commentId },

            { comment: comment },

            { new: true }
        );
        return res.status(200).json(
            {
                success: true,
                message: "Comentario editado con succeso",
                data: commentEdit
            }
        )
    } catch (error) {
        if (error instanceof CustomError) {
            error.sendResponse(res);

        } else {
            const serverError = new ServerError();
            serverError.sendResponse(res);
        }
    }
}

////////////////////////// DELETE COMMENT METHOD     ////////////////////////
const deleteComment = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;
        const idComment = req.params.id;

        const user = await UserModel.findOne({ _id: userId });

        const commentId = await CommentsModel.findOne({ _id: idComment });
        if (!commentId) {
            throw new NotFoundError('No comment data found in the request');
        }

        const donoPostId = await CommentsModel.findOne({ userIdPost: user?.id })

        const donoIdUserComentario = await CommentsModel.findOne(
            {
                userIdComments: user?.id,
                _id: commentId

            }
        )

        if (!donoPostId && !donoIdUserComentario) {
            throw new ForbiddenError('User not allowed')
        }

        const comentarioEliminar = await CommentsModel.findByIdAndDelete(commentId);
        return res.status(200).json(
            {
                success: true,
                message: "Comment successfully deleted",
                data: comentarioEliminar
            }
        )

    } catch (error) {
        if (error instanceof CustomError) {
            error.sendResponse(res);

        } else {
            const serverError = new ServerError();
            serverError.sendResponse(res);
        }
    }
}

export {
    createComment, searchComment,
    editComment, deleteComment,
    getAllPosts

}