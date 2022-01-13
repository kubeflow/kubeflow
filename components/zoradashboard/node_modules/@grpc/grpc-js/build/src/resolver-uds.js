"use strict";
/*
 * Copyright 2019 gRPC authors.
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
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const resolver_1 = require("./resolver");
class UdsResolver {
    constructor(target, listener, channelOptions) {
        this.listener = listener;
        this.addresses = [];
        let path;
        if (target.authority === '') {
            path = '/' + target.path;
        }
        else {
            path = target.path;
        }
        this.addresses = [{ path }];
    }
    updateResolution() {
        process.nextTick(this.listener.onSuccessfulResolution, this.addresses, null, null, null, {});
    }
    destroy() {
        // This resolver owns no resources, so we do nothing here.
    }
    static getDefaultAuthority(target) {
        return 'localhost';
    }
}
function setup() {
    resolver_1.registerResolver('unix', UdsResolver);
}
exports.setup = setup;
//# sourceMappingURL=resolver-uds.js.map