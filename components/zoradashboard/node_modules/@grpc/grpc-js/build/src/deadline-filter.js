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
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeadlineFilterFactory = exports.DeadlineFilter = void 0;
const constants_1 = require("./constants");
const filter_1 = require("./filter");
const units = [
    ['m', 1],
    ['S', 1000],
    ['M', 60 * 1000],
    ['H', 60 * 60 * 1000],
];
function getDeadline(deadline) {
    const now = new Date().getTime();
    const timeoutMs = Math.max(deadline - now, 0);
    for (const [unit, factor] of units) {
        const amount = timeoutMs / factor;
        if (amount < 1e8) {
            return String(Math.ceil(amount)) + unit;
        }
    }
    throw new Error('Deadline is too far in the future');
}
class DeadlineFilter extends filter_1.BaseFilter {
    constructor(channel, callStream) {
        var _a, _b;
        super();
        this.channel = channel;
        this.callStream = callStream;
        this.timer = null;
        const callDeadline = callStream.getDeadline();
        if (callDeadline instanceof Date) {
            this.deadline = callDeadline.getTime();
        }
        else {
            this.deadline = callDeadline;
        }
        const now = new Date().getTime();
        let timeout = this.deadline - now;
        if (timeout <= 0) {
            process.nextTick(() => {
                callStream.cancelWithStatus(constants_1.Status.DEADLINE_EXCEEDED, 'Deadline exceeded');
            });
        }
        else if (this.deadline !== Infinity) {
            this.timer = setTimeout(() => {
                callStream.cancelWithStatus(constants_1.Status.DEADLINE_EXCEEDED, 'Deadline exceeded');
            }, timeout);
            (_b = (_a = this.timer).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
    }
    async sendMetadata(metadata) {
        if (this.deadline === Infinity) {
            return metadata;
        }
        /* The input metadata promise depends on the original channel.connect()
         * promise, so when it is complete that implies that the channel is
         * connected */
        const finalMetadata = await metadata;
        const timeoutString = getDeadline(this.deadline);
        finalMetadata.set('grpc-timeout', timeoutString);
        return finalMetadata;
    }
    receiveTrailers(status) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        return status;
    }
}
exports.DeadlineFilter = DeadlineFilter;
class DeadlineFilterFactory {
    constructor(channel) {
        this.channel = channel;
    }
    createFilter(callStream) {
        return new DeadlineFilter(this.channel, callStream);
    }
}
exports.DeadlineFilterFactory = DeadlineFilterFactory;
//# sourceMappingURL=deadline-filter.js.map