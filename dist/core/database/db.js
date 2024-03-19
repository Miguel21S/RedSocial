"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = () => {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        throw new Error("No se encontro el MONGO_URI ");
    }
    return mongoose_1.default.connect(mongoURI, {});
};
exports.dbConnection = dbConnection;
