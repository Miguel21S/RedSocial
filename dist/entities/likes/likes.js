"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.darlikes = void 0;
const UsersModel_1 = __importDefault(require("../users/UsersModel"));
const PostsModel_1 = __importDefault(require("../posts/PostsModel"));
const LikesModel_1 = __importDefault(require("./LikesModel"));
const manejoErrores_1 = require("../../core/utils/manejoErrores");
const darlikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.usuarioId;
        const postId = req.params.id;
        let like = 1;
        const user = yield UsersModel_1.default.findOne({ _id: userId });
        if (!user) {
            throw new manejoErrores_1.NotFoundError(' No se encontraron datos de usuario en la solicitud ');
        }
        const post = yield PostsModel_1.default.findOne({ _id: postId });
        if (!post) {
            throw new manejoErrores_1.NotFoundError(' No se encontraron datos del en la solicitud ');
        }
        const existLike = yield LikesModel_1.default.findOne({
            idPost: postId,
            userIdLike: userId,
        });
        if (existLike) {
            like = existLike.like === 1 ? 0 : 1;
            existLike.like = like;
            yield existLike.save();
        }
        else {
            yield LikesModel_1.default.create({
                like: like,
                idPost: post === null || post === void 0 ? void 0 : post._id,
                userIdPost: post === null || post === void 0 ? void 0 : post.userIdPost,
                userIdLike: user === null || user === void 0 ? void 0 : user._id,
                titlePost: post === null || post === void 0 ? void 0 : post.title,
                userNamePost: post.userName,
                userNameLike: user === null || user === void 0 ? void 0 : user.name
            });
        }
        res.status(200).json({
            success: true,
            message: "Like",
        });
    }
    catch (error) {
        if (error instanceof manejoErrores_1.CustomError) {
            error.sendResponse(res);
        }
        else {
            const serverError = new manejoErrores_1.ServerError();
            serverError.sendResponse(res);
        }
    }
});
exports.darlikes = darlikes;
