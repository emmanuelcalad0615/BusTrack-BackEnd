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
      { url: 'http://localhost:3000/api/v1', description: 'Desarrollo local' }
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
