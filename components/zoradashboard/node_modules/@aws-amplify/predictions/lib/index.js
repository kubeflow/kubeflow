"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
var Predictions_1 = require("./Predictions");
exports.Predictions = Predictions_1.Predictions;
var Providers_1 = require("./Providers");
exports.AmazonAIConvertPredictionsProvider = Providers_1.AmazonAIConvertPredictionsProvider;
exports.AmazonAIIdentifyPredictionsProvider = Providers_1.AmazonAIIdentifyPredictionsProvider;
exports.AmazonAIPredictionsProvider = Providers_1.AmazonAIPredictionsProvider;
exports.AmazonAIInterpretPredictionsProvider = Providers_1.AmazonAIInterpretPredictionsProvider;
__export(require("./types"));
/**
 * @deprecated use named import
 */
exports.default = Predictions_1.Predictions;
//# sourceMappingURL=index.js.map