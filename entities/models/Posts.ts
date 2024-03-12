
import { Document, Schema, model } from "mongoose";


interface Post extends Document{
    userPost: Schema.Types.ObjectId;
    contenido: String;
    likes?: Schema.Types.ObjectId;
    comentarios?: Schema.Types.ObjectId;
}
const PostSchema = new Schema <Post>(
    {
        userPost:   // ID del usuario que hizo la publicación
            {
                type: Schema.Types.ObjectId,
                ref: "UserModel"
            },

        contenido: String,

        likes:  // IDs de usuarios que han dado like a esta publicación
            {
                type:Schema.Types.ObjectId,
                ref: "UserModel"
            },

        comentarios: [  // IDs de comentarios en esta publicación
            {
                type:Schema.Types.ObjectId,
                ref: "ComentarioModel"
            }
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const PostModel = model<Post>("Post", PostSchema);
export default PostModel