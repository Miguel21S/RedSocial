
import { Document, ObjectId, Schema, model } from "mongoose";


interface Post extends Document {
    userIdPost: Schema.Types.ObjectId;
    userName: string;
    title: string;
    contenido: String;
    likes?: Schema.Types.ObjectId;
    comentarios?: Schema.Types.ObjectId;
}
const PostSchema = new Schema<Post>(
    {
        userIdPost:
        {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },

        userName: String,
        title: String,
        contenido: String,

        likes:
        {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },

        // comentarios:
        // {
        //     type: Schema.Types.ObjectId,
        //     ref: "ComentarioModel"
        // },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const PostModel = model<Post>("Post", PostSchema);
export default PostModel