import request from 'supertest';
import { app } from '../../src/app';
import { Server } from 'http';

let server: Server;
// prueba que la ruta /api/tasks responda con un status 200
describe('GET /api/tasks', () => {
  // Inicializa el servidor antes de ejecutar las pruebas
  beforeAll(async () => {
    server = await app.listen(); // Asume que 'app' es tu aplicación Express
  });
  
  // Cierra el servidor cuando terminen las pruebas
  afterAll(done => {
    server.close(done);
  });

  test('should respond with status 200', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(200);
  });

  // prueba que la ruta /api/tasks responda con un array
  test('should return an array', async () => {
    const res = await request(app).get('/api/tasks');
    expect(Array.isArray(res.body)).toBe(true);
    
  });
});


