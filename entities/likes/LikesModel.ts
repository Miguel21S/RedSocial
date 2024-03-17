import { Document, Schema, model } from "mongoose"

interface Likes extends Document {
    idPost: Schema.Types.ObjectId;
    userIdPost: Schema.Types.ObjectId;
    userIdLike: Schema.Types.ObjectId;
    titlePost: string;
    userNamePost: string;
    userNameLike: string;
    lik: number;
}

const likesSchema = new Schema<Likes>(
    {
        idPost:
        {
            type: Schema.Types.ObjectId,
            ref: "PostModel"
        },

        userIdPost:
        {
            type: Schema.Types.ObjectId,
            ref: "PostModel"
        },

        userIdLike:
        {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },

        titlePost: String,
        userNamePost: String,
        userNameLike: String,
        lik: Number,
    },

    {
        timestamps: true,
        versionKey: false,
    }
)

const LikeModel = model<Likes>("Likes", likesSchema);
export default LikeModel;
