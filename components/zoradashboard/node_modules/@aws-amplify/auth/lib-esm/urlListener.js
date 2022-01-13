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
import { JS } from '@aws-amplify/core';
export default (function (callback) {
    if (JS.browserOrNode().isBrowser && window.location) {
        var url = window.location.href;
        callback({ url: url });
    }
    else if (JS.browserOrNode().isNode) {
        // continue building on ssr
        (function () { }); // noop
    }
    else {
        throw new Error('Not supported');
    }
});
//# sourceMappingURL=urlListener.js.map