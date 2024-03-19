"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SeguidoresSeguidosSchema = new mongoose_1.Schema({
    idUserSiguiendo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'UserModel',
    },
    idUser: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'UserModel',
    },
    NameUserSiguiendo: String,
    NameUser: String,
    estadoSeguiendo: Number,
}, {
    timestamps: true,
    versionKey: false,
});
const SeguidoresSeguidosModel = (0, mongoose_1.model)('SeguidoresSeguidos', SeguidoresSeguidosSchema);
exports.default = SeguidoresSeguidosModel;
