
import { Request, Response } from "express";
import UserModel from "../users/UsersModel";
import { CustomError, NotFoundError, ServerError } from "../../core/utils/errorHandling";
import followingFollowersModel from "./followingFollowersModel";

///////////////////////////           FOLLOW AND STOP FOLLOWING METHOD      /////////////////////////////////////
const followingUser = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;
        const idUserFollowers = req.params.id;
        let statusFollowers = 1;

        const user = await UserModel.findOne({ _id: userId });
        if (!user?._id) {
            throw new NotFoundError('No user data found in the request');
        }

        const userFollowers = await UserModel.findOne({ _id: idUserFollowers });

        if (!userFollowers?._id) {
            throw new NotFoundError('No user data found to follow up on the request');
        }

        if (user?._id.equals(userFollowers?._id)) {
            return res.json(
                {
                    success: false,
                    message: "You cannot follow yourself"
                }
            )
        }

        const yaSuigues = await followingFollowersModel.findOne(
            {
                idUser: user?._id,
                idUserFollowers: userFollowers?._id,

            }
        )

        if (yaSuigues) {
            statusFollowers = yaSuigues.statusFollowers === 1 ? 0 : 1;
            yaSuigues.statusFollowers = statusFollowers;
            await yaSuigues.save();

        } else {

            await followingFollowersModel.create(
                {
                    statusFollowers: statusFollowers,
                    idUserFollowers: userFollowers?._id,
                    nameUserFollowers: userFollowers?.name,
                    idUser: user?._id,
                    nameUser: user?.name
                }
            );
        }

        res.status(200).json(
            {
                success: true,
                message: "Ready now you are following ..."
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

///////////////////////////           METHOD THAT LISTS ALL MY FOLLOWERS      /////////////////////////////////////
const listMyFollowing = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;
        // let limit = Number(req.query.limit) || 10
        // const page = Number(req.query.page) || 1
        // const skip = (page - 1) * limit

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            throw new NotFoundError( 'No user data found in the request' );
        }

        const cantFollew = await followingFollowersModel.countDocuments({ idUserFollowers: userId, statusFollowers: 1 });
        const misSeguidores = await followingFollowersModel.find( { idUserFollowers: userId, statusFollowers: 1 }  )
        .select("nameUser")
        // .limit(limit)
        // .skip(skip);

        res.status(200).json({
            success: true,
            message: "List of followers",
            data: misSeguidores,
            cantFollewer: cantFollew
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

///////////////////////////           METHOD TO FOLLOW WHICH LIST THE USERS I FOLLOW      /////////////////////////////////////
const followers = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;
        // let limit = Number(req.query.limit) || 10
        // const page = Number(req.query.page) || 1
        // const skip = (page - 1) * limit

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            throw new NotFoundError('No user data found in the request');
        }

        const cantFollow = await followingFollowersModel.countDocuments({ idUser: userId, statusFollowers: 1  });
        const follow = await followingFollowersModel.find({ idUser: userId, statusFollowers: 1 })
        .select("nameUserFollowers")
        // .limit(limit)
        // .skip(skip)

        res.status(200).json({
            success: true,
            message: "List of followers",
            data: follow,
            cantFollowin: cantFollow
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
    followingUser, listMyFollowing, followers
}