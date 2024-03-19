"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const comentariosSchema = new mongoose_1.Schema({
    idPost: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "PostModel"
    },
    userIdPost: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "PostModel"
    },
    userIdComentario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    userNamePost: String,
    userNameComentario: String,
    comentario: String,
}, {
    timestamps: true,
    versionKey: false,
});
const ComentarioModel = (0, mongoose_1.model)("Comentario", comentariosSchema);
exports.default = ComentarioModel;
