"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const db_1 = require("./core/database/db");
const routes_1 = __importDefault(require("./entities/controllers/routes"));
const routes_2 = __importDefault(require("./entities/users/routes"));
const routes_3 = __importDefault(require("./entities/posts/routes"));
const routes_4 = __importDefault(require("./entities/comentarios/routes"));
const routes_5 = __importDefault(require("./entities/likes/routes"));
const routes_6 = __importDefault(require("./entities/seguidoreSeguidos/routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4998;
app.use(body_parser_1.default.json());
app.use('/api', routes_1.default);
app.use('/api', routes_2.default);
app.use('/api', routes_3.default);
app.use('/api', routes_4.default);
app.use('/api', routes_5.default);
app.use('/api', routes_6.default);
(0, db_1.dbConnection)()
    .then(() => {
    console.log('Database connected');
})
    .catch(error => {
    console.log(error);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
