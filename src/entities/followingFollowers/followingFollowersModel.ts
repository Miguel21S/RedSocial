
import { Document, Schema, model } from "mongoose";

interface followingFollowers extends Document {
    idUserFollowers: Schema.Types.ObjectId;
    idUser: Schema.Types.ObjectId;
    nameUserFollowers: string;
    nameUser: string;
    statusFollowers: number;
}

const followingFollowersSchema = new Schema<followingFollowers>(
    {
        idUserFollowers: {
            type: Schema.Types.ObjectId,
            ref: 'UserModel',
        },

        idUser: {
            type: Schema.Types.ObjectId,
            ref: 'UserModel',
        },

        nameUserFollowers: String,
        nameUser: String,
        statusFollowers: Number,

    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const followingFollowersModel = model<followingFollowers>('SeguidoresSeguidos', followingFollowersSchema);
export default followingFollowersModel