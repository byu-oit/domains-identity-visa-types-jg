const SansServer = require('sans-server');
const SansServerSwagger = require('sans-server-swagger');
const wso2 = require('byu-wso2-request');
const meta = require('meta-ngin');
const auth = require('./auth');

const api = SansServer();
module.exports = api;

api.use(SansServerSwagger({
    controllers: './controllers',
    development: true,
    exception: function (res, state) {
        res.body(meta(state.statusCode, state.body));
    },
    swagger: './swagger.json'
}));