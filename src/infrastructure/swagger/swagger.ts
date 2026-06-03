import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BusTrack API',
      version: '1.0.0',
      description: 'API REST para rastreo de buses en tiempo real',
    },
    servers: [
      { url: '/api/v1', description: 'Servidor actual' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    }
  },
  apis: ['./src/infrastructure/swagger/docs/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
