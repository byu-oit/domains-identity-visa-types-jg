/*
const SansServer        = require('sans-server');
const SansServerSwagger = require('sans-server-swagger');
const wso2 = require('byu-wso2-request');
const meta = require('meta-ngin');
const auth = require('./auth');

*/



/*
// create a sans-server instance and export it
const api = SansServer();
module.exports = api;
*/

// add swagger middleware to the sans-server instance.\
/*
api.use(SansServerSwagger({
    controllers: './controllers',
    development: true,
    swagger: './swagger.json'
}));
*/

//===========================================================================================================
const AWS = require("aws-sdk");
AWS.config.update({region: 'us-west-2'});
const SansServer = require('sans-server');
const SansServerSwagger = require('sans-server-swagger');
const wso2 = require('byu-wso2-request');
const byuJWT = require('byu-jwt');
const AuthenticationError = byuJWT.AuthenticationError;
const handelUtils = require('handel-utils');
const meta = require('meta-ngin');
const security = require('identity-codes-security');
const controllers = require('identity-code-api-controllers');
const config = controllers.retrieve;
const WELLKNOWN_URL = 'https://api.byu.edu/.well-known/openid-configuration';

let clientKey;
let clientSecret;
let oauth_set = false;
let setup_error = '';

controllers.init({
    bucketName: 'identity-level-of-education-dev-bucket-s3',
    storageFile: 'levels_of_education.json',
    logFile: 'level_of_education_logs.json',
    resourceNameSingular: 'level_of_education',
    resourceNamePlural: 'levels_of_education'
});

handelUtils.fetchParameters(AWS, [`clientKey`, `clientSecret`])
    .then(params => {
        if (typeof params.clientKey !== 'string') throw new Error('Could not obtain clientKey from Parameter Store!');
        if (typeof params.clientSecret !== 'string') throw new Error('Could not obtain clientSecret from Parameter Store');
        clientKey = params.clientKey;
        clientSecret = params.clientSecret;
        console.log('Retrieved Parameter Store Variables');
        return wso2.setOauthSettings({clientKey: clientKey, clientSecret: clientSecret, wellKnownUrl: WELLKNOWN_URL});
    })
    .then(() => {
        oauth_set = true;
        console.log('Set WSO2 Oauth settings');
    })
    .catch(err => {
        setup_error = err.message;
        console.error('    [ERROR] Failed to retrieved Parameter Store variables:', err.message);
    });

const api = SansServer();
module.exports = api;

api.use((req, res, next) => {
    if (!oauth_set) res.status(503).send(meta(503, setup_error));
    else next();
});

api.use((req, res, next) => {
    byuJWT.authenticate(req.headers, WELLKNOWN_URL)
        .then(verifiedJWTs => {
            req.verifiedJWTs = verifiedJWTs;
            next();
        })
        .catch(err => {
            if (err instanceof AuthenticationError) {
                return res.status(401).send(meta(401, err.message));
            }
            console.error(new Date().toISOString(), 'Unexpected error when determining authentication:\n', err);
            return res.status(500).send(meta(500, 'Error determining authentication'));
        });
});

security({
    server: api,
    wso2_request_instance: wso2,
    code_api_name: 'levels_of_education',
});

//===========================================================================================================

api.use(SansServerSwagger({
    controllers: './controllers',
    development: true,
    exception: function (res, state) {
        res.body(meta(state.statusCode, state.body));
    },
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

// Everything before the addition of tutorial 9a works.  Healthy Beanstalk and green codepipeline.
// TUTORIAL 9A BELOW =======================================================================

const controllers = require('identity-code-api-controllers');

controllers.init({
    bucketName: 'visa-types-giles-dev-bucket-s3',
    storageFile: 'visa_types.json',
    logFile: 'visa_types_logs.json',
    resourceNameSingular: 'visa_type',
    resourceNamePlural: 'visa_types'
});

exports.getVisaTypes = controllers.getAllResources;
exports.createVisaType = controllers.createResource;
exports.getVisaType = controllers.getResource;
exports.modifyVisaType = controllers.modifyResource;
exports.removeVisaType = controllers.deleteResource;
exports.getVisaTypeLogs = controllers.getResourceLogs;


// TUTORIAL 9A ABOVE ==========================================================================
