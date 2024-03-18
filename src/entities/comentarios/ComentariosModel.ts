
import { Schema, model, Document } from "mongoose";

interface Comentario extends Document {
    idPost: Schema.Types.ObjectId;
    userIdPost: Schema.Types.ObjectId;
    userIdComentario: Schema.Types.ObjectId;
    userNamePost: string;
    userNameComentario: String;
    comentario: String;
}

const comentariosSchema = new Schema<Comentario>(
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

        userIdComentario:
        {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },

        userNamePost: String,
        userNameComentario: String,
        comentario: String,
    },

    {
        timestamps: true,
        versionKey: false,
    }
)

const ComentarioModel = model<Comentario>("Comentario", comentariosSchema);
export default ComentarioModel;