
import { Request, Response } from "express";
import UserModel from "../users/UsersModel";
import PostModel from "../posts/PostsModel";
import LikeModel from "./LikesModel";
import { CustomError, NotFoundError, ServerError } from "../../core/utils/manejoErrores";


const darlikes = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const postId = req.params.id;
        let like = 1;

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            throw new NotFoundError(' No se encontraron datos de usuario en la solicitud ');
        }

        const post = await PostModel.findOne({ _id: postId });
        if (!post) {
            throw new NotFoundError(' No se encontraron datos del en la solicitud ');
        }

        const existLike = await LikeModel.findOne(
            {
                idPost: postId,
                userIdLike: userId,
            }
        )

        if (existLike) {

            like = existLike.like === 1 ? 0 : 1;
            existLike.like = like;
            await existLike.save();

        } else {

            await LikeModel.create(
                {
                    type: like,
                    idPost: post?._id,
                    userIdPost: post?.userIdPost,
                    userIdLike: user?._id,
                    titlePost: post?.title,
                    userNamePost: post.userName,
                    userNameLike: user?.name
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                message: "Like",
            }
        )
    } catch (error) {
        if( error instanceof CustomError ){
            error.sendResponse(res);

        } else {
            
            const serverError = new ServerError();
            serverError.sendResponse(res);
        }
    }
}

export {
    darlikes
}