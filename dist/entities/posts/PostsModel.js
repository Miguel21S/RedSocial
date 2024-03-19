"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    userName: String,
    title: String,
    contenido: String,
    userIdPost: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserModel"
    },
}, {
    timestamps: true,
    versionKey: false,
});
const PostModel = (0, mongoose_1.model)("Post", PostSchema);
exports.default = PostModel;
