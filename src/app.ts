import express, { Request, Response, json } from 'express';
import * as dotenv from 'dotenv';
import { corsMiddleware } from './middlewares/cors.middleware';

dotenv.config();

const app = express();

app.use(json());
app.disable('x-powered-by');
app.use(corsMiddleware());

const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola, mundo desde tu API!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
