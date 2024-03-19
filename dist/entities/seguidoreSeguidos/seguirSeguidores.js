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
exports.losSiguidos = exports.listarMisSeguidores = exports.seguirUser = void 0;
const UsersModel_1 = __importDefault(require("../users/UsersModel"));
const seguidoresSeguidosModel_1 = __importDefault(require("./seguidoresSeguidosModel"));
const manejoErrores_1 = require("../../core/utils/manejoErrores");
///////////////////////////           MÉTODO SEGUIR Y DEJAR DE SEGUIR      /////////////////////////////////////
const seguirUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.usuarioId;
        const idUserSiguiendo = req.params.id;
        let estadoSeguiendo = 1;
        const user = yield UsersModel_1.default.findOne({ _id: userId });
        if (!(user === null || user === void 0 ? void 0 : user._id)) {
            throw new manejoErrores_1.NotFoundError('No se encontraron datos del usuario en la solicitud');
        }
        const userSeguiendo = yield UsersModel_1.default.findOne({ _id: idUserSiguiendo });
        if (!(userSeguiendo === null || userSeguiendo === void 0 ? void 0 : userSeguiendo._id)) {
            throw new manejoErrores_1.NotFoundError('No se encontraron datos del usuario a seguir en la solicitud');
        }
        if (user === null || user === void 0 ? void 0 : user._id.equals(userSeguiendo === null || userSeguiendo === void 0 ? void 0 : userSeguiendo._id)) {
            return res.json({
                success: false,
                message: "No se puedes seguirte a ti mismo"
            });
        }
        const yaSuigues = yield seguidoresSeguidosModel_1.default.findOne({
            idUser: user === null || user === void 0 ? void 0 : user._id,
            idUserSiguiendo: userSeguiendo === null || userSeguiendo === void 0 ? void 0 : userSeguiendo._id,
        });
        if (yaSuigues) {
            estadoSeguiendo = yaSuigues.estadoSeguiendo === 1 ? 0 : 1;
            yaSuigues.estadoSeguiendo = estadoSeguiendo;
            yield yaSuigues.save();
        }
        else {
            yield seguidoresSeguidosModel_1.default.create({
                estadoSeguiendo: estadoSeguiendo,
                idUserSiguiendo: userSeguiendo === null || userSeguiendo === void 0 ? void 0 : userSeguiendo._id,
                NameUserSiguiendo: userSeguiendo === null || userSeguiendo === void 0 ? void 0 : userSeguiendo.name,
                idUser: user === null || user === void 0 ? void 0 : user._id,
                NameUser: user === null || user === void 0 ? void 0 : user.name
            });
        }
        res.status(200).json({
            success: true,
            message: "Listo ahora estas siguiendo a ..."
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
exports.seguirUser = seguirUser;
///////////////////////////           MÉTODO QUE LISTA TODOS MIS SEGUIDORES      /////////////////////////////////////
const listarMisSeguidores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.usuarioId;
        let limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const skip = (page - 1) * limit;
        const user = yield UsersModel_1.default.findOne({ _id: userId });
        if (!user) {
            throw new manejoErrores_1.NotFoundError('No se encontraron datos del usuario en la solicitud');
        }
        const misSeguidores = yield seguidoresSeguidosModel_1.default.find({ idUserSiguiendo: userId, estadoSeguiendo: 1 })
            .select("NameUser")
            .limit(limit)
            .skip(skip);
        res.status(200).json({
            success: true,
            message: "Lista de seguidores",
            data: misSeguidores
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
exports.listarMisSeguidores = listarMisSeguidores;
///////////////////////////           MÉTODO SEGUIR QUE LISTA DOTOS LOS USUARIOS QUE SIGO      /////////////////////////////////////
const losSiguidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.usuarioId;
        let limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const skip = (page - 1) * limit;
        const user = yield UsersModel_1.default.findOne({ _id: userId });
        if (!user) {
            throw new manejoErrores_1.NotFoundError('No se encontraron datos del usuario en la solicitud');
        }
        const siguiendo = yield seguidoresSeguidosModel_1.default.find({ idUser: userId, estadoSeguiendo: 1 })
            .select("NameUserSiguiendo")
            .limit(limit)
            .skip(skip);
        res.status(200).json({
            success: true,
            message: "Lista de siguiendo",
            data: siguiendo
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
exports.losSiguidos = losSiguidos;
