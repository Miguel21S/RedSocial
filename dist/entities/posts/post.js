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
exports.recuperarPostDeUnUsuarioPorId = exports.listarPostPorId = exports.listarPosts = exports.listarMisPosts = exports.actualizarPostPorId = exports.EliminarPostPorId = exports.crearPost = void 0;
const PostsModel_1 = __importDefault(require("./PostsModel"));
const UsersModel_1 = __importDefault(require("../users/UsersModel"));
const manejoErrores_1 = require("../../core/utils/manejoErrores");
///////////////////////////          MÉTODO CREAR POST           /////////////////////////////////////
const crearPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.usuarioId;
        const { title, contenido } = req.body;
        const user = yield UsersModel_1.default.findOne({ _id: userId });
        const publicarPost = yield PostsModel_1.default.create({
            title,
            contenido,
            userIdPost: user === null || user === void 0 ? void 0 : user.id,
            userName: user === null || user === void 0 ? void 0 : user.name
        });
        res.status(200).json({
            success: true,
            message: "Post creado con succeso",
            data: publicarPost
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
exports.crearPost = crearPost;
///////////////////////////          MÉTODO ACTUALIZAR POST POR ID       /////////////////////////////
const actualizarPostPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.usuarioId;
        const postId = req.params.id;
        const { title, contenido } = req.body;
        const user = yield UsersModel_1.default.findOne({ _id: userId });
        const encontartPostId = yield PostsModel_1.default.findOne({ _id: postId });
        if (!encontartPostId) {
            throw new manejoErrores_1.NotFoundError('No se encontraron datos en la solicitud');
        }
        const userIdEnPost = yield PostsModel_1.default.findOne({ userIdPost: encontartPostId === null || encontartPostId === void 0 ? void 0 : encontartPostId.id });
        if ((userIdEnPost === null || userIdEnPost === void 0 ? void 0 : userIdEnPost.id) !== (user === null || user === void 0 ? void 0 : user.id)) {
            throw new manejoErrores_1.ForbiddenError('Usuario no permitido');
        }
        const updatePost = yield PostsModel_1.default.findByIdAndUpdate({ _id: postId }, {
            title: title,
            contenido: contenido
        }, { new: true });
        res.status(200).json({
            success: true,
            message: "Post actualizado con suceso"
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
exports.actualizarPostPorId = actualizarPostPorId;
///////////////////////////          MÉTODO LISTAR MIS POSTS       /////////////////////////////
const listarMisPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.usuarioId;
        let limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const skip = (page - 1) * limit;
        const user = yield UsersModel_1.default.findOne({ _id: userId });
        const userIdEnPost = yield PostsModel_1.default.find({ userIdPost: user === null || user === void 0 ? void 0 : user.id })
            .limit(limit)
            .skip(skip);
        res.status(200).json({
            success: true,
            message: "Lista de posts",
            data: userIdEnPost
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
exports.listarMisPosts = listarMisPosts;
///////////////////////////          MÉTODO LISTAR POSTS       /////////////////////////////
const listarPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.usuarioId;
        let limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const skip = (page - 1) * limit;
        const listPosts = yield PostsModel_1.default.find()
            .limit(limit)
            .skip(skip);
        res.status(200).json({
            success: true,
            message: "Lista encontrado con succeso",
            data: listPosts
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
exports.listarPosts = listarPosts;
///////////////////////////          MÉTODO LISTAR POSTS POR ID      /////////////////////////////
const listarPostPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.usuarioId;
        const postId = req.params.id;
        const listPost = yield PostsModel_1.default.findOne({ _id: postId });
        if (!listPost) {
            throw new manejoErrores_1.NotFoundError('No se encontraron datos de la lista en la solicitud');
        }
        res.status(200).json({
            success: true,
            message: "Post encontrado con succeso",
            data: listPost
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
exports.listarPostPorId = listarPostPorId;
///////////////////////////          MÉTODO RECUPERAR POSTS DE UN USUARIO POR ID      /////////////////////////////
const recuperarPostDeUnUsuarioPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.usuarioId;
        const idUserEnPost = req.params.id;
        let limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const skip = (page - 1) * limit;
        const IdUser = yield UsersModel_1.default.findById(idUserEnPost);
        if (!IdUser) {
            throw new manejoErrores_1.NotFoundError('No se encontraron datos de usuario en la solicitud');
        }
        const encontrarUserIdEnPost = yield PostsModel_1.default.findOne({ userIdPost: IdUser === null || IdUser === void 0 ? void 0 : IdUser.id });
        if ((encontrarUserIdEnPost === null || encontrarUserIdEnPost === void 0 ? void 0 : encontrarUserIdEnPost.id) !== (IdUser === null || IdUser === void 0 ? void 0 : IdUser.id)) {
            return res.json({
                success: false,
                message: "Usuario no tine posts"
            });
        }
        const encontrarUserIdEnPosts = yield PostsModel_1.default.find({ userIdPost: IdUser === null || IdUser === void 0 ? void 0 : IdUser.id })
            .limit(limit)
            .skip(skip);
        return res.status(200).json({
            success: true,
            message: "Posts encontrado con succeso",
            data: encontrarUserIdEnPosts
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
exports.recuperarPostDeUnUsuarioPorId = recuperarPostDeUnUsuarioPorId;
///////////////////////////          MÉTODO ELIMINAR POST           /////////////////////////////////////
const EliminarPostPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.usuarioId;
        const postId = req.params.id;
        const user = yield UsersModel_1.default.findOne({ _id: userId });
        const encontartPostId = yield PostsModel_1.default.findOne({ _id: postId });
        if (!encontartPostId) {
            throw new manejoErrores_1.NotFoundError('No se encontraron datos en la solicitud');
        }
        const userIdEnPost = yield PostsModel_1.default.findOne({
            userIdPost: encontartPostId === null || encontartPostId === void 0 ? void 0 : encontartPostId.id
        });
        if ((userIdEnPost === null || userIdEnPost === void 0 ? void 0 : userIdEnPost.id) !== (user === null || user === void 0 ? void 0 : user.id)) {
            throw new manejoErrores_1.ForbiddenError('Usuario no permitido');
        }
        const deletePost = yield PostsModel_1.default.findByIdAndDelete(postId);
        res.status(200).json({
            success: true,
            message: "Post eliminado con suceso"
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
exports.EliminarPostPorId = EliminarPostPorId;
const postSeguidores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.usuarioId;
    }
    catch (error) {
    }
});
