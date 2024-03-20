
import { Document, ObjectId, Schema, model } from "mongoose";

interface Post extends Document {
    userIdPost: Schema.Types.ObjectId;
    userName: string;
    title: string;
    tests: String;
    likes?: Schema.Types.ObjectId;
    comments?: Schema.Types.ObjectId;
}
const PostSchema = new Schema<Post>(
    {
        userName: String,
        title: String,
        tests: String,
        
        userIdPost:
        {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },

    },

    {
        timestamps: true,
        versionKey: false,
    }
)

const PostModel = model<Post>("Post", PostSchema);
export default PostModel