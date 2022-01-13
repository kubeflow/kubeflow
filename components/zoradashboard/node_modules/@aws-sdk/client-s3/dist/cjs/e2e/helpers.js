"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBuffer = void 0;
const createBuffer = (size) => {
    var match;
    var buffer;
    if ((match = size.match(/(\d+)KB/))) {
        buffer = Buffer.alloc(parseInt(match[1]) * 1024);
    }
    else if ((match = size.match(/(\d+)MB/))) {
        buffer = Buffer.alloc(parseInt(match[1]) * 1024 * 1024);
    }
    else {
        buffer = Buffer.alloc(1024 * 1024);
    }
    buffer.fill("x");
    return buffer;
};
exports.createBuffer = createBuffer;
//# sourceMappingURL=helpers.js.map