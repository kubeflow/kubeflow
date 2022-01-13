"use strict";
/*
 * Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var GraphQLAPI_1 = require("./GraphQLAPI");
var types_1 = require("./types");
exports.GraphQLAuthError = types_1.GraphQLAuthError;
exports.GRAPHQL_AUTH_MODE = types_1.GRAPHQL_AUTH_MODE;
var GraphQLAPI_2 = require("./GraphQLAPI");
exports.GraphQLAPI = GraphQLAPI_2.GraphQLAPI;
exports.GraphQLAPIClass = GraphQLAPI_2.GraphQLAPIClass;
exports.graphqlOperation = GraphQLAPI_2.graphqlOperation;
__export(require("./types"));
exports.default = GraphQLAPI_1.GraphQLAPI;
//# sourceMappingURL=index.js.map