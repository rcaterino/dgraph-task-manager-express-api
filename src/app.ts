import express, { Request, Response, json } from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swaggerConfig';
import * as dotenv from 'dotenv';

import { corsMiddleware } from './middlewares/cors.middleware';
import { tasksRouter } from './routes/tasks.routes';


dotenv.config();


//Express application instance.

export const app = express();

// Middleware to parse incoming JSON data
app.use(json());

// Disable 'x-powered-by' header for security reasons
app.disable('x-powered-by');

// Apply CORS middleware for cross-origin resource sharing
app.use(corsMiddleware());

// Set the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Swagger endpoint for API documentation and specification output in JSON format
app.use('/api/v1/documentation', swaggerUi.serve, swaggerUi.setup(specs));

// Define a simple route for the root endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola, mundo desde tu API!');
});

// Mount tasksRouter for handling '/api/v1/tasks' endpoint
app.use('/api/v1/tasks', tasksRouter);

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/api/v1/documentation`); // Log the server start with the specified port
});
