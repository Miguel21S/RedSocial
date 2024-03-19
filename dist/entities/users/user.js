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
exports.actualizarRolePorId = exports.EliminarPorId = exports.filtrarPorEmail = exports.actualizarUsuario = exports.ListarTodosUsuarios = void 0;
const UsersModel_1 = __importDefault(require("./UsersModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const manejoErrores_1 = require("../../core/utils/manejoErrores");
/////////////////          MÉTODO LISTAR TODOS LOS USUARIOS         /////////////////////////////////
const ListarTodosUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const skip = (page - 1) * limit;
        const lista = yield UsersModel_1.default.find()
            .select("name")
            .select("email")
            .limit(limit)
            .skip(skip);
        res.status(200).json({
            success: true,
            message: "Listado",
            data: lista
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
exports.ListarTodosUsuarios = ListarTodosUsuarios;
/////////////////          MÉTODO ACTUALIZAR         /////////////////////////////////
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.usuarioId;
        const name = req.body.name;
        const email = req.body.email;
        const newPassword = req.body.password;
        // ENCRIPTACIÓN DEL PASSWORD
        const pwdEncryptado = bcrypt_1.default.hashSync(newPassword, 8);
        const updateUser = yield UsersModel_1.default.findByIdAndUpdate({
            _id: userId
        }, {
            name: name,
            email: email,
            password: pwdEncryptado
        }, {
            new: true
        });
        res.status(200).json({
            success: false,
            message: "Datos actualizado con suceso",
            data: updateUser
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
exports.actualizarUsuario = actualizarUsuario;
/////////////////          MÉTODO BUSCAR POR EMAIL         /////////////////////////////////
const filtrarPorEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const queryfiltrs = {};
        if (email) {
            queryfiltrs.email = email;
        }
        const getEmail = yield UsersModel_1.default.find(queryfiltrs);
        res.status(200).json({
            success: true,
            message: "Usuario encontrado con suceso",
            data: getEmail
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
exports.filtrarPorEmail = filtrarPorEmail;
/////////////////          MÉTODO ELIMINAR POR ID         /////////////////////////////////
const EliminarPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const confirmar = yield UsersModel_1.default.findOne({
            _id: userId
        });
        if (!confirmar) {
            throw new manejoErrores_1.NotFoundError('No se encontraron datos en la solicitud');
        }
        const deleteUser = yield UsersModel_1.default.findByIdAndDelete(userId);
        res.status(200).json({
            success: true,
            message: "Usuario eliminado con suceso"
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
exports.EliminarPorId = EliminarPorId;
/////////////////          MÉTODO BUSCAR POR EMAIL         /////////////////////////////////
const actualizarRolePorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const role = req.body.role;
        const updateRole = yield UsersModel_1.default.findOneAndUpdate({
            _id: userId
        }, {
            role: role
        }, {
            new: true
        });
        if (!updateRole) {
            throw new manejoErrores_1.NotFoundError('No se encontraron datos en la solicitud');
        }
        res.status(200).json({
            success: true,
            message: "Role actualizado con éxito"
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
exports.actualizarRolePorId = actualizarRolePorId;
