"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usarios = __importStar(require("./user"));
const auth_1 = require("../../core/middlewares/auth");
const isSuperAdmin_1 = require("../../core/middlewares/isSuperAdmin");
const router = (0, express_1.Router)();
// router.put('/token', auth, addSiguiendo);
router.get('/users/profile', auth_1.auth, isSuperAdmin_1.isSuperAdmin, usarios.ListarTodosUsuarios);
router.put('/users/profile', auth_1.auth, usarios.actualizarUsuario);
router.get('/users', auth_1.auth, isSuperAdmin_1.isSuperAdmin, usarios.filtrarPorEmail);
router.delete('/users/:id', auth_1.auth, isSuperAdmin_1.isSuperAdmin, usarios.EliminarPorId);
router.put('/users/:id', auth_1.auth, isSuperAdmin_1.isSuperAdmin, usarios.actualizarRolePorId);
exports.default = router;
