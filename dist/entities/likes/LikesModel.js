"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const likesSchema = new mongoose_1.Schema({
    idPost: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "PostModel"
    },
    userIdPost: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "PostModel"
    },
    userIdLike: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    titlePost: String,
    userNamePost: String,
    userNameLike: String,
    like: Number,
}, {
    timestamps: true,
    versionKey: false,
});
const LikeModel = (0, mongoose_1.model)("Likes", likesSchema);
exports.default = LikeModel;
