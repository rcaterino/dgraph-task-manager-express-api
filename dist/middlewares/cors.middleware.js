"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:3000',
    'http://localhost:4000'
];
const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => (0, cors_1.default)({
    origin: (origin, callback) => {
        if (origin && acceptedOrigins.includes(origin)) {
            return callback(null, true);
        }
        if (!origin) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    }
});
exports.corsMiddleware = corsMiddleware;
