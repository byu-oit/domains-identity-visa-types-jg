const SansServer        = require('sans-server');
const SansServerSwagger = require('sans-server-swagger');
let port = 8081;

// create a sans-server instance and export it
const api = SansServer();
module.exports = api;

// add swagger middleware to the sans-server instance.
api.use(SansServerSwagger({
    controllers: './controllers',
    development: true,
    swagger: './swagger.json'
}));

//======== Below is the Express Example from node framework github ============================

//const api               = require('./api');
const bodyParser        = require('body-parser');
const express           = require('express');
const expressTranslator = require('sans-server-express');

// create an express app
const app = express();

// add the body parser middleware - only needed if the API will accept JSON bodies in the request
app.use(bodyParser.json());

// integrate sans-server instance with express
app.use(expressTranslator(api));

// start the server listening
// app.listen(port, function(err) {
//     if (err) {
//         console.error(err.stack);
//         process.exit(1);
//     } else {
//         console.log('Server listening on port ' + port);
//     }
// });