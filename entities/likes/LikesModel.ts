import { Document, Schema } from "mongoose"


interface likes extends Document {
    userIdPost: Schema.Types.ObjectId;
    userName: string;
    
}