import request from 'supertest';
import { app } from '../../src/app';

// pruebas al recurso /api/v1/tasks con el método GET para obtener todas las tareas
describe('GET /api/v1/tasks', () => {
  test('should respond with status 200', async () => {
    const res = await request(app).get('/api/v1/tasks');
    expect(res.statusCode).toEqual(200);
  });
  // prueba que la ruta /api/tasks responda con un array
  test('should return an array', async () => {
    const res = await request(app).get('/api/v1/tasks');
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// prueba que la ruta /api/tasks/:id con metodo GET para obtener una tarea por id
describe('GET /api/v1/tasks/:id', () => {
  const id = "0x1a504f8a29";
  test('should respond with status 200', async () => {
    const res = await request(app).get(`/api/v1/tasks/${id}`);
    expect(res.statusCode).toEqual(200);
  });
  // prueba que la ruta /api/tasks/:id responda con un objeto
  test('should return an object', async () => {
    const res = await request(app).get(`/api/v1/tasks/${id}`);
    expect(typeof res.body).toBe('object');
  });
  // Prueba para el caso en que se hace una solicitud GET a /api/v1/tasks/:id con un ID que no existe
  const nonExistentId = "0x1a504f8a54";
  test('should respond with status 404 for non-existent id', async () => {
    const res = await request(app).get(`/api/v1/tasks/${nonExistentId}`);
    console.log("Respuesta del test id no existe", res);
    expect(res.statusCode).toEqual(404);
  });
});

// prueba que la ruta /api/tasks con metodo POST  para crear una tarea
describe('POST /api/v1/tasks', () => {
  test('should respond with status 201 and receive an object', async () => {
    // construcción del objeto a enviar
    const body = {
      "label": "Test",
      // scheduledAt mas 1 dia
      "scheduledAt": new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
    // envío de la petición
    const res = await request(app).post('/api/v1/tasks/').send(body);
    
    // comprobación de que el status sea 201
    expect(res.statusCode).toEqual(201);
    
    // comprobación de que el body sea un objeto
    
    expect(typeof res.body).toBe('object');

  });


});

afterAll(async () => {
  app.listen().close();
});

