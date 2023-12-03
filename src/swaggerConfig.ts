import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            label: {
              type: 'string'
            },
            status: {
              type: 'string'
            },
            scheduledAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date and time in ISO 8601 format'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date and time in ISO 8601 format'
            },
            completedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date and time in ISO 8601 format'
            },
            cancelledAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date and time in ISO 8601 format'
            }
          }
        },
      },
    },
  },
  // Path to the API docs
  apis: ['./src/routes/*.ts'],
};

export const specs = swaggerJsdoc(options);