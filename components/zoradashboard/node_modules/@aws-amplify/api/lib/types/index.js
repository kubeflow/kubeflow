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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This exports from the types directory is a temporary workaround, since Amplify CLI currently
 * generates code that relies on this import path https://github.com/aws-amplify/amplify-cli/issues/3863
 * This will be removed in future release when CLI and customers moves to recommeneded import styles.
 */
var api_graphql_1 = require("@aws-amplify/api-graphql");
exports.graphqlOperation = api_graphql_1.graphqlOperation;
exports.GraphQLAuthError = api_graphql_1.GraphQLAuthError;
exports.GRAPHQL_AUTH_MODE = api_graphql_1.GRAPHQL_AUTH_MODE;
//# sourceMappingURL=index.js.map