const SansServer        = require('sans-server');
const SansServerSwagger = require('sans-server-swagger');

// create a sans-server instance and export it
const api = SansServer();
module.exports = api;

// add swagger middleware to the sans-server instance.
api.use(SansServerSwagger({
    controllers: './controllers',
    development: true,
    swagger: './swagger.json'
}));