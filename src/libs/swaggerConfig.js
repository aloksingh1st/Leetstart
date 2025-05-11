import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger configuration
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API Docs',
            version: '1.0.0',
            description: 'API documentation for user authentication and more',
        },
        servers: [
            {
                url: 'http://localhost:8000',
            },
        ],
    },
    apis: ['./routes/auth.js'] // to test if it’s being picked

};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerUi, swaggerSpec };