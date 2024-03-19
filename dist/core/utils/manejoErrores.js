"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = exports.ForbiddenError = exports.NotFoundError = exports.UnauthorizedError = exports.CustomError = void 0;
///////////////////         CLASE PARA MANEJO DE ERRORES          /////////////////////////////
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
    ////   MÉTODO DE ENVIO DE RESPUESTAS DE ERRORES AL CLIENTE         /////////////////////////////
    sendResponse(res) {
        res.status(this.statusCode).json({
            error: {
                message: this.message
            }
        });
    }
}
exports.CustomError = CustomError;
class UnauthorizedError extends CustomError {
    constructor(message = 'Usuario no autenticado') {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class NotFoundError extends CustomError {
    constructor(message = 'Recurso no encontrado') {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class ForbiddenError extends CustomError {
    constructor(message = 'Usuario no permitido') {
        super(message, 403);
    }
}
exports.ForbiddenError = ForbiddenError;
class ServerError extends CustomError {
    constructor(message = 'Error interno del servidor') {
        super(message, 500);
    }
}
exports.ServerError = ServerError;
