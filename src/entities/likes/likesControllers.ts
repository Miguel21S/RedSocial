
import { Request, Response } from "express";
import UserModel from "../users/UsersModel";
import PostModel, { Post } from "../posts/PostsModel";
import LikeModel from "./LikesModel";
import { CustomError, NotFoundError, ServerError } from "../../core/utils/errorHandling";


const darlikes = async (req: Request, res: Response) => {
    try {
        const idUser = req.tokenData.userId;
        const postId = req.params.id;
        let like = 1;
        const user = await UserModel.findOne({ _id: idUser });

        if (!user) {
            throw new NotFoundError(' No user data found in the request ');
        }

        const post = await PostModel.findOne({ _id: postId });

        if (!post) {
            throw new NotFoundError(' No pos data found in the application ');
        }

        const existLike = await LikeModel.findOne(
            {
                idPost: postId,
                userIdLike: idUser,
            }
        )

        if (existLike) {

            like = existLike.like === 1 ? 0 : 1;
            existLike.like = like;
            await existLike.save();
            await LikeModel.findOneAndDelete({ idPost: postId });

        } else {

            await LikeModel.create(
                {
                    like: like,
                    idPost: post?._id,
                    userIdPost: post?.userIdPost,
                    userIdLike: user?._id,
                    titlePost: post?.title,
                    userNamePost: post.userName,
                    userNameLike: user?.name
                }
            )
        }
        const cantLike = await LikeModel.countDocuments({ idPost: postId, like: 1 });

        res.status(200).json(
            {
                success: true,
                message: "Like",
                cantLikes: cantLike
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

const listAllPostsWithLikes = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;

        const user = await UserModel.findOne({ _id: userId });
        if(!user?._id){
            throw new NotFoundError(' No user data found in the request ');
        }

        const posts: Post[] = await PostModel.find().exec();

        const postsWithLikes = await Promise.all(posts.map(async (post) => {
            const likesCount = await LikeModel.countDocuments({ idPost: post._id }).exec();
       
            return {
                ...post.toObject(),
                likesCount
            };
        }));

        const count = await LikeModel.countDocuments()
        res.json({
            success: true,
            data: postsWithLikes,
            tamanoLike: count
        });
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
    darlikes, listAllPostsWithLikes
}