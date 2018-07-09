/*
 * Copyright 2017 Brigham Young University
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
'use strict';

const controllers = require('identity-code-api-controllers');

// controllers.init({
//     bucketName: 'visa-types-giles-dev-bucket-s3',
//     storageFile: 'visa_types.json',
//     logFile: 'visa_types_logs.json',
//     resourceNameSingular: 'visa_type',
//     resourceNamePlural: 'visa_types',
//     raiseEvents: true
// });

//exports.getVisaTypes = controllers.getAllResources;
//exports.createVisaType = controllers.createResource;
exports.getVisaType = controllers.getResource;
exports.modifyVisaType = controllers.modifyResource;
exports.removeVisaType = controllers.deleteResource;
//exports.getVisaTypeLogs = controllers.getResourceLogs;

// ----- Exported Endpoint Handlers -----
exports.getVisaType = function (req, res) {
  console.log("Invoked getVisaType")
  exports.getVisaType.mock(req, res);
};

exports.getVisaType.mock = function (req, res) {
  console.log("Invoked getVisaType.mock")
  res.send(req.swagger.root['x-mock_json'].visa_types.values[0]);
};

exports.modifyVisaType = function (req, res) {
  console.log("Invoked modifyVisaType")
  exports.modifyVisaType.mock(req, res);
};

exports.modifyVisaType.mock = function (req, res) {
  console.log("Invoked modifyVisaType.mock")
  res.send(req.swagger.root['x-mock_json'].visa_types.values[0]);
};

exports.removeVisaType = function (req, res) {
  console.log("Invoked removeVisaType")
  exports.removeVisaType.mock(req, res);
};

exports.removeVisaType.mock = function (req, res) {
  console.log("Invoked removeVisaType.mock")
  res.status(204).send();
};
