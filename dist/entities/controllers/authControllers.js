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
exports.login = exports.registrar = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UsersModel_1 = __importDefault(require("../users/UsersModel"));
const manejoErrores_1 = require("../../core/utils/manejoErrores");
////////////   MÉTODO REGISTRAR USUARIO   //////////////////////////
const registrar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const validPwd = /^(?=.*\d)(?=.*[!\"#\$%&'()*+,-./:;<=>?@[\\\]^_])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/;
        if (password.length < 8) {
            return res.status(404).json({
                success: false,
                message: "La contraseña debe más de 8 caracteres"
            });
        }
        if (!validPwd.test(password)) {
            return res.status(404).json({
                success: false,
                message: "La contraseña debe tener al menos un dígito, un carácter especia, una letra mayúscula, una letra minúscula, y que no tenga espacio."
            });
        }
        // VALIDACIÓN DEL EMAIL
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json({
                success: false,
                message: "formato de email invalido"
            });
        }
        // ENCRIPTACIÓN DEL PASSWORD
        const pwdEncryptado = bcrypt_1.default.hashSync(password, 8);
        const crearNuevoUser = yield UsersModel_1.default.create({
            name: name,
            email: email,
            password: pwdEncryptado
        });
        res.status(200).json({
            success: true,
            message: "Usuario creado con suceso",
            data: crearNuevoUser
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
exports.registrar = registrar;
////////////   MÉTODO LOGIN   //////////////////////////
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                mesage: "Datos del login incorrecto"
            });
        }
        const user = yield UsersModel_1.default.findOne({
            email: email
        }).select("password");
        if (!user) {
            return res.status(404).json({
                success: false,
                mesage: "Dato incorrecto"
            });
        }
        ///////    VALIDAR PASSWORD
        const validarPwd = bcrypt_1.default.compareSync(password, user.password);
        if (!validarPwd) {
            return res.json({
                success: false,
                mesage: "Password invalido"
            });
        }
        ///////////     CREAR TOKEN 
        const token = jsonwebtoken_1.default.sign({
            usuarioId: user._id,
            usuarioName: user.role
        }, process.env.JWT_SECRET, {
            expiresIn: "2h"
        });
        res.status(200).json({
            success: true,
            message: "Se ha loguiado con suceso",
            token: token,
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
exports.login = login;
