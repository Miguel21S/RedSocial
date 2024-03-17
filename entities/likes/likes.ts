
import { Request, Response } from "express";
import UserModel from "../users/UsersModel";
import PostModel from "../posts/PostsModel";
import LikeModel from "./LikesModel";


const darlikes = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.usuarioId;
        const postId = req.params.id;
        let like = 1;

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Usuario no encontrado"
                }
            )
        }

        const post = await PostModel.findOne({ _id: postId });
        if (!post) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Post no encontrado"
                }
            )
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
            // const likes = like === like ? 1 : 0;
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
        res.status(500).json(
            {
                success: true,
                message: "Error al dar el like"
            }
        )
    }
}

export {
    darlikes
}