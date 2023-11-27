# Task Management API :clipboard:

Esta API RESTful se encarga de gestionar las tareas utilizando Dgraph como base de datos. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en las tareas y aplica reglas de negocio para mantener la consistencia de los datos.

## Características principales

- **Gestión de tareas:** Permite crear, leer, actualizar y eliminar tareas.
- **Reglas del negocio:** Aplica reglas para el manejo del estado de las tareas.
- **Integración con Dgraph:** Utiliza peticiones HTTP para interactuar con la base de datos.

## Esquema de la Base de Datos

### Schema para cargar en Dgraph

```graphql
enum TaskStatus {
  IN_PROGRESS
  DONE
  CANCELLED
}

input statusFilter {
  status: TaskStatus
}

type Task {
  id: ID!
  label: String!
  status: TaskStatus!
  createdAt: DateTime!
  scheduledAt: DateTime!
  completedAt: DateTime
  cancelledAt: DateTime
  description: String
  priority: Int
  tags: [String]
  comments: [String]
}
```

## Endpoints

### `GET /api/v1/tasks`

- **Descripción:** Obtiene todas las tareas.
- **Respuesta exitosa:** Lista de tareas.
- **Códigos de error:** 500 si hay un error interno.

### `GET /api/v1/tasks/:taskId`

- **Descripción:** Obtiene una tarea específica por su ID.
- **Parámetro de ruta:** `taskId` (ID de la tarea a obtener).
- **Respuesta exitosa:** Detalles de la tarea solicitada.
- **Códigos de error:** 404 si la tarea no se encuentra, 500 si hay un error interno.

### `GET /api/v1/tasks?status=:status`

- **Descripción:** Obtiene todas las tareas filtradas por estado.
- **Parámetro de consulta:** `status` (estado de la tarea: IN_PROGRESS, DONE o CANCELLED).
- **Respuesta exitosa:** Lista de tareas filtradas por estado.
- **Códigos de error:** 500 si hay un error interno, 400 si el estado proporcionado no es válido.

### `POST /api/v1/tasks`

- **Descripción:** Crea una nueva tarea.
- **Cuerpo de la solicitud:** Datos de la tarea a crear.
- **Respuesta exitosa:** Detalles de la tarea creada.
- **Códigos de error:** 400 si la solicitud es incorrecta, 500 si hay un error interno.

### `PATCH /api/v1/tasks/:taskId`

- **Descripción:** Actualiza una tarea existente.
- **Parámetro de ruta:** `taskId` (ID de la tarea a actualizar).
- **Cuerpo de la solicitud:** Datos actualizados de la tarea.
- **Respuesta exitosa:** Detalles de la tarea actualizada.
- **Códigos de error:** 400 si la solicitud es incorrecta, 404 si la tarea no se encuentra, 500 si hay un error interno.

### `DELETE /api/v1/tasks/:taskId`

- **Descripción:** Elimina una tarea existente.
- **Parámetro de ruta:** `taskId` (ID de la tarea a eliminar).
- **Respuesta exitosa:** Mensaje de confirmación.
- **Códigos de error:** 404 si la tarea no se encuentra, 500 si hay un error interno.

## Reglas de negocio

- **Manipulación de fechas:** Las fechas `createdAt`, `completedAt` y `cancelledAt` se generan y escriben desde el backend, no se reciben desde el frontend.
- **Cambios de estado:** No se permite cambiar el estado de la tarea al mismo estado actual. Tampoco se permite cambiar el estado si la tarea está cancelada o completada.

## Ejecución del proyecto

### Clonar el repositorio

1. Clona este repositorio a tu máquina local:

```terminal
git clone https://url-del-repositorio.git
```

1. Entra al directorio del proyecto:

```terminal
cd nombre-del-proyecto
```

### Configuración de variables de entorno

1. Crea un archivo `.env` en el directorio raíz del proyecto.
2. Agrega las siguientes variables de entorno al archivo `.env`:

```.env
    PORT = 4000         # Elige el puerto que desees para la API
    DGRAPH_ENDPOINT =   # Aquí va la url del endpoint de tu base de datos en Dgraph
    X_AUTH_TOKEN=       # Aqui va el token de autenticación de tu base de datos en Dgraph
```

   Asegúrate de reemplazar `https://url-del-endpoint-de-dgraph` con la URL real de tu base de datos de Dgraph.

### Instalación de dependencias

1. Instala las dependencias del proyecto:

```terminal
npm install
```

### Scripts

- **test:** Ejecuta los tests utilizando Jest, un popular framework de pruebas para JavaScript/TypeScript. El comando `--forceExit` asegura que Jest salga después de que las pruebas se completen.
- **dev:** Inicia el servidor en modo de desarrollo utilizando Nodemon. Nodemon reiniciará automáticamente el servidor cada vez que detecte cambios en los archivos, lo que facilita el desarrollo continuo.
- **build:** Borra el directorio `dist` si existe (utilizando `rimraf`) y luego compila los archivos TypeScript (`tsc`) para generar el código JavaScript en el directorio `dist`.
- **start:** Ejecuta el código compilado desde el directorio `dist` usando `node`, después de haber realizado el paso de construcción (`build`) anteriormente.

### Iniciar el servidor

1. Inicia el servidor de desarrollo:

```terminal
npm run dev
```

2. La API estará disponible en `http://localhost:3000` (o el puerto que hayas especificado) y estará lista para recibir peticiones.

## Contribución

Si quieres contribuir a este proyecto, ¡siéntete libre de abrir un PR!
