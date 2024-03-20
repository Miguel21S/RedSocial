
import { Response } from 'express';

///////////////////         CLASE PARA MANEJO DE ERRORES          /////////////////////////////
class CustomError extends Error {
    constructor(public message: string, public statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

         ////   MÉTODO DE ENVIO DE RESPUESTAS DE ERRORES AL CLIENTE         /////////////////////////////
    sendResponse(res: Response) {
        res.status(this.statusCode).json({
            error: {
                message: this.message
            }
        });
    }
}

class UnauthorizedError extends CustomError {
    constructor(message = 'Unauthorized user') {
        super(message, 401);
    }
}

class NotFoundError extends CustomError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

class ForbiddenError extends CustomError {
    constructor(message = 'User not allowed') {
        super(message, 403);
    }
}

class ServerError extends CustomError {
    constructor(message = 'Internal server error') {
        super(message, 500);
    }
}

export{
    CustomError, UnauthorizedError, NotFoundError,
    ForbiddenError, ServerError
}