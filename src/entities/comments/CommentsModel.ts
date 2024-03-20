
import { Schema, model, Document } from "mongoose";

interface Comments extends Document {
    idPost: Schema.Types.ObjectId;
    userIdPost: Schema.Types.ObjectId;
    userIdComments: Schema.Types.ObjectId;
    userNamePost: string;
    userNameComments: String;
    Comments: String;
}

const commentsSchema = new Schema<Comments>(
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

        userIdComments:
        {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },

        userNamePost: String,
        userNameComments: String,
        Comments: String,
    },

    {
        timestamps: true,
        versionKey: false,
    }
)

const CommentsModel = model<Comments>("Comentario", commentsSchema);
export default CommentsModel;