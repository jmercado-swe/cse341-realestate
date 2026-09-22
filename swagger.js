const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Real Estate Listings API',
        description: 'API documentation for the Real Estate Listings project (CSE 341 Week 3-4 project)',
    },
    host: 'cse341-realestate-nqk3.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);