
import { Schema, model, Document, Types } from "mongoose";

interface User extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    seguidores?: Schema.Types.ObjectId;
    siguiendo?: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: false,
        },

        email: {
            type: String,
            required: false,
            unique: true,
        },

        password: {
            type: String,
            required: false,
        },

        role: {
            type: String,
            enum: ["user", "admin", "superAdmin"],
            default: "user",
        },
        seguidores: [  // IDs de usuarios que siguen a este usuario
            {
                type: Schema.Types.ObjectId,
                ref: "UserModel"
            }
        ],

        siguiendo:   // IDs de usuarios que este usuario sigue
            [{
                type: Schema.Types.ObjectId,
                ref: "UserModel"
            }
            ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const UserModel = model<User>("User", UserSchema);

export default UserModel;