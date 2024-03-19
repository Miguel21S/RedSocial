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
exports.buscarComentario = exports.eliminarComentario = exports.editarComentario = exports.crearComentario = void 0;
const ComentariosModel_1 = __importDefault(require("./ComentariosModel"));
const UsersModel_1 = __importDefault(require("../users/UsersModel"));
const PostsModel_1 = __importDefault(require("../posts/PostsModel"));
const mongoose_1 = require("mongoose");
const manejoErrores_1 = require("../../core/utils/manejoErrores");
////////////////////////// MÉTODO COMENTARIO     ////////////////////////
const crearComentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.usuarioId;
        const postId = req.params.id;
        const { comentario } = req.body;
        const user = yield UsersModel_1.default.findOne({ _id: userId });
        if (!user) {
            throw new manejoErrores_1.NotFoundError(' No se encontraron datos de usuario en la solicitud ');
        }
        const idPosts = yield PostsModel_1.default.findOne({ _id: postId });
        if (!idPosts) {
            throw new manejoErrores_1.NotFoundError(' No se encontraron datos del post en la solicitud ');
        }
        const comentarPost = yield ComentariosModel_1.default.create({
            comentario,
            idPost: idPosts === null || idPosts === void 0 ? void 0 : idPosts._id,
            userIdPost: idPosts === null || idPosts === void 0 ? void 0 : idPosts.userIdPost,
            userNamePost: idPosts === null || idPosts === void 0 ? void 0 : idPosts.userName,
            userIdComentario: user === null || user === void 0 ? void 0 : user.id,
            userNameComentario: user.name
        });
        return res.status(200).json({
            success: true,
            message: "Post creado con succeso",
            data: comentarPost
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
exports.crearComentario = crearComentario;
////////////////////////// MÉTODO FILTRAR BUSQUEDA DE COMENTARIO     ////////////////////////
const buscarComentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.usuarioId;
        const { idComentario, idPos, userName } = req.query;
        let limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const skip = (page - 1) * limit;
        const queryfiltrs = {};
        if (idComentario && mongoose_1.Types.ObjectId.isValid(idComentario)) {
            queryfiltrs.idComentario = new mongoose_1.Types.ObjectId(idComentario);
        }
        if (idPos && mongoose_1.Types.ObjectId.isValid(idPos)) {
            queryfiltrs.idPost = new mongoose_1.Types.ObjectId(idPos);
        }
        if (userName) {
            queryfiltrs.userName = userName;
        }
        const mostrarIdComentario = yield ComentariosModel_1.default.find(queryfiltrs)
            .select("userNamePost")
            .select("userNameComentario")
            .select("comentario")
            .limit(limit)
            .skip(skip);
        res.status(200).json({
            success: true,
            message: "Datos del filtro",
            data: mostrarIdComentario
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
exports.buscarComentario = buscarComentario;
////////////////////////// MÉTODO EDITAR COMENTARIO     ////////////////////////
const editarComentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.usuarioId;
        const { comentario } = req.body;
        const comentarioId = req.params.id;
        const user = yield UsersModel_1.default.findOne({ _id: userId });
        const encontrarcomentario = yield ComentariosModel_1.default.findOne({ _id: comentarioId });
        if (!encontrarcomentario) {
            throw new manejoErrores_1.NotFoundError('No se encontraron datos del comentario en la solicitud');
        }
        const donoComentario = yield ComentariosModel_1.default.findOne({
            userIdComentario: user === null || user === void 0 ? void 0 : user.id
        });
        if (!donoComentario) {
            throw new manejoErrores_1.NotFoundError('No se encontraron datos de usuario en la solicitud');
        }
        const comentarioEditar = yield ComentariosModel_1.default.findByIdAndUpdate({ _id: comentarioId }, { comentario: comentario }, { new: true });
        return res.status(200).json({
            success: true,
            message: "Comentario editado con succeso",
            data: comentarioEditar
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
exports.editarComentario = editarComentario;
////////////////////////// MÉTODO ELIMINAR COMENTARIO     ////////////////////////
const eliminarComentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.usuarioId;
        const idComentario = req.params.id;
        const user = yield UsersModel_1.default.findOne({ _id: userId });
        const comentarioId = yield ComentariosModel_1.default.findOne({ _id: idComentario });
        if (!comentarioId) {
            throw new manejoErrores_1.NotFoundError('No se encontraron datos del comentario en la solicitud');
        }
        const donoPostId = yield ComentariosModel_1.default.findOne({ userIdPost: user === null || user === void 0 ? void 0 : user.id });
        const donoIdUserComentario = yield ComentariosModel_1.default.findOne({
            userIdComentario: user === null || user === void 0 ? void 0 : user.id,
            _id: comentarioId
        });
        if (!donoPostId && !donoIdUserComentario) {
            throw new manejoErrores_1.ForbiddenError('Usuario no permitido');
        }
        const comentarioEliminar = yield ComentariosModel_1.default.findByIdAndDelete(comentarioId);
        return res.status(200).json({
            success: true,
            message: "Comentario eliminado con succeso",
            data: comentarioEliminar
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
exports.eliminarComentario = eliminarComentario;
