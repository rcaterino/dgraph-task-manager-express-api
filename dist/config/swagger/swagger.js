"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
// Metadata for the Swagger specification file (OpenAPI) 
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de tareas',
            version: '1.0.0',
            description: 'Una API para administrar tareas',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['src/routes/tasks.routes.ts'],
};
const swaggerDocs = () => {
    const swaggerSpec = (0, swagger_jsdoc_1.default)(options); // Define swaggerSpec here
};
exports.swaggerDocs = swaggerDocs;
