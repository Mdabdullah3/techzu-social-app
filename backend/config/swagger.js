import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Techzu Mini Social Feed API',
            version: '1.0.0',
            description: 'API documentation for the Mini Social Feed application',
        },
        servers: [
            {
                url: 'http://localhost:5000/api/v1',
                description: 'Development server (v1)',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./docs/*.js', './routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;