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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importStar(require("express"));
const dotenv = __importStar(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger/swagger");
const cors_middleware_1 = require("./middlewares/cors.middleware");
const tasks_routes_1 = require("./routes/tasks.routes");
dotenv.config();
exports.app = (0, express_1.default)();
exports.app.use((0, express_1.json)());
exports.app.disable('x-powered-by');
exports.app.use((0, cors_middleware_1.corsMiddleware)());
const PORT = process.env.PORT || 3000;
exports.app.get('/', (req, res) => {
    res.send('¡Hola, mundo desde tu API!');
});
exports.app.use('/api/v1/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerDocs, { explorer: true }));
exports.app.use('/api/v1/tasks', tasks_routes_1.tasksRouter);
exports.app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/api/v1/docs`);
});
