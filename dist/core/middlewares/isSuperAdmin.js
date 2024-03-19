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
exports.isSuperAdmin = void 0;
const UsersModel_1 = __importDefault(require("../../entities/users/UsersModel"));
const manejoErrores_1 = require("../utils/manejoErrores");
const isSuperAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userRole;
        const user = yield UsersModel_1.default.findById({
            _id: req.tokenData.usuarioId
        });
        if (!user) {
            throw new manejoErrores_1.NotFoundError('No se encontraron datos de usuario en la solicitud');
        }
        userRole = user.role;
        if (userRole !== "superAdmin") {
            throw new manejoErrores_1.UnauthorizedError('Usuario no autorizado');
        }
        next();
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
exports.isSuperAdmin = isSuperAdmin;
