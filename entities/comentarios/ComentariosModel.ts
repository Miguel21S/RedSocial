
import { Schema, model, Document } from "mongoose";

interface Comentario extends Document{
    userComentario: Schema.Types.ObjectId; // ID del usuario que hizo el comentario
    post: Schema.Types.ObjectId; // ID de la publicación a la que se refiere el comentario
    comentario: String
}

const comentariosSchema = new Schema <Comentario>(
{
    userComentario:  // ID del usuario que hizo el comentario
        {
            type:Schema.Types.ObjectId,
            ref: "UserModel"
        },

    post: [ // ID de la publicación a la que se refiere el comentario
        {
            type:Schema.Types.ObjectId,
            ref: "PostModel"
        }
    ],

    comentario: String,
    },

    {
        timestamps: true,
        versionKey: false,
    }
)

const ComentarioModel = model<Comentario>("Comentario", comentariosSchema);
export default ComentarioModel;