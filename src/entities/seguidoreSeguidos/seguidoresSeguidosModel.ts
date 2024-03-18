import { timeStamp } from "console";
import { Document, Schema, model } from "mongoose";

interface SeguidoresSeguidos extends Document {
    idUserSiguiendo: Schema.Types.ObjectId;
    IdUser: Schema.Types.ObjectId;
    NameUserSiguiendo: string;
    NameUser: string;
    estadoSeguiendo: number;
}

const SeguidoresSeguidosSchema = new Schema<SeguidoresSeguidos>(
    {
        idUserSiguiendo: {
            type: Schema.Types.ObjectId,
            ref: 'UserModel',
        },

        IdUser: {
            type: Schema.Types.ObjectId,
            ref: 'UserModel',
        },

        NameUserSiguiendo: String,
        NameUser: String,
        estadoSeguiendo: Number,

    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const SeguidoresSeguidosModel = model<SeguidoresSeguidos>('SeguidoresSeguidos', SeguidoresSeguidosSchema);
export default SeguidoresSeguidosModel