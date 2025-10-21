import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LeetHub API',
      version: '1.0.0',
      description: 'API documentation for LeetHub project',
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: ['./src/controllers/*.js', './src/routes/*.js'], // <-- key fix
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerUi, swaggerSpec };
