# Task Management API :clipboard:

Esta API RESTful se encarga de gestionar las tareas utilizando Dgraph como base de datos. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en las tareas y aplica reglas de negocio para mantener la consistencia de los datos.

## Tabla de Contenido

- [Task Management API :clipboard:](#task-management-api-clipboard)
  - [Tabla de Contenido](#tabla-de-contenido)
  - [Tecnologías Utilizadas](#tecnologías-utilizadas)
  - [Características principales](#características-principales)
  - [Esquema de la Base de Datos que subimos a Dgraph](#esquema-de-la-base-de-datos-que-subimos-a-dgraph)
  - [Endpoints](#endpoints)
    - [`GET /api/v1/tasks`](#get-apiv1tasks)
    - [`GET /api/v1/tasks/:taskId`](#get-apiv1taskstaskid)
    - [`POST /api/v1/tasks`](#post-apiv1tasks)
    - [`PATCH /api/v1/tasks/:taskId`](#patch-apiv1taskstaskid)
    - [`DELETE /api/v1/tasks/:taskId`](#delete-apiv1taskstaskid)
  - [Reglas de negocio](#reglas-de-negocio)
  - [Ejecución del proyecto](#ejecución-del-proyecto)
    - [Clonar el repositorio](#clonar-el-repositorio)
    - [Configuración de variables de entorno](#configuración-de-variables-de-entorno)
    - [Instalación de dependencias](#instalación-de-dependencias)
    - [Scripts](#scripts)
    - [Iniciar el servidor de desarrollo](#iniciar-el-servidor-de-desarrollo)
  - [Contribución](#contribución)

## Tecnologías Utilizadas

Esta API se construyó utilizando las siguientes tecnologías:

- **Node.js:** Plataforma de ejecución de JavaScript en el servidor.
- **Express.js:** Framework para construir la API.
- **TypeScript:** Superset de JavaScript que añade tipos estáticos.
- **Dgraph:** Base de datos de gráficos distribuida, utilizada para almacenar los datos de las tareas.
- **Dgraph Cloud:** Servicio en la nube de Dgraph que aloja nuestra base de datos.
- **Jest:** Framework para realizar pruebas en la aplicación.
- **Nodemon:** Utilidad que monitorea los cambios en el código fuente y reinicia automáticamente el servidor cuando la ejecutamos en modo desarrollo.
- **Swagger:** Herramienta utilizada para documentar la API y permitir pruebas interactivas de los endpoints.

## Características principales

- **Gestión de tareas:** Permite crear, leer, actualizar y eliminar tareas.
- **Reglas del negocio:** Aplica reglas para el manejo del estado de las tareas.
- **Integración con Dgraph:** Utiliza peticiones HTTP para interactuar con la base de datos.

## Esquema de la Base de Datos que subimos a Dgraph

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

- **Descripción:** Obtiene todas las tareas. Puedes filtrar las tareas por `status` y `scheduledAt` utilizando parámetros de consulta. Por ejemplo, `/api/v1/tasks?status=done&scheduledAt=2022-01-01` devolverá todas las tareas que estén en estado `done` y programadas para el `2022-01-01`.
- **Parámetros de consulta:**
- `status`: Filtra las tareas por su estado. Los valores posibles son `in_progress`, `done` y `cancelled`.
- `scheduledAt`: Filtra las tareas por la fecha en que están programadas. Debe ser una fecha en formato `YYYY-MM-DD`.
- **Respuesta exitosa:** Lista de tareas.
- **Códigos de error:** 500 si hay un error interno.

### `GET /api/v1/tasks/:taskId`

- **Descripción:** Obtiene una tarea específica por su ID.
- **Parámetro de ruta:** `taskId` (ID de la tarea a obtener).
- **Respuesta exitosa:** Detalles de la tarea solicitada.
- **Códigos de error:** 404 si la tarea no se encuentra, 500 si hay un error interno.

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

   Asegúrate de reemplazar `https://url-del-endpoint-de-dgraph` con la URL real de tu base de datos de Dgraph. Podrás crearte una y desplegarla gratuitamente con el servicio de pruebas que ofrece Dgraph Cloud en: <https://cloud.dgraph.io/login?redirect=/>

### Instalación de dependencias

1. Instala las dependencias del proyecto:

```terminal
npm install
```

### Scripts

- **test:** Ejecuta los tests utilizando Jest, un popular framework de pruebas para JavaScript/TypeScript.
- **test:watch:** Ejecuta los tests en modo de observación. Cada vez que se guarda un archivo, Jest volverá a ejecutar los tests.
- **test:coverage**: Ejecuta los tests y genera un informe de cobertura de código.
- **dev**: Ejecuta la aplicación en modo de desarrollo utilizando Nodemon. Nodemon reiniciará automáticamente la aplicación cuando se realicen cambios en los archivos de origen.
- **build**: Elimina el directorio `dist` existente y compila el proyecto de TypeScript a JavaScript en un nuevo directorio `dist`.
- **start**: Ejecuta el script `build` y luego inicia la aplicación compilada con Node.js.

### Iniciar el servidor de desarrollo

```terminal
npm run dev
```

La API estará disponible en `http://localhost:4000` (o el puerto que hayas especificado) y estará lista para recibir peticiones.

## Contribución

Si quieres contribuir a este proyecto, ¡siéntete libre de abrir un PR!
