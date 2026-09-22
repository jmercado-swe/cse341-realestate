const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Real Estate Listings API',
        description: 'API documentation for the Real Estate Listings project (CSE 341 Week 3-4 project)',
    },
    host: 'localhost:8080',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);