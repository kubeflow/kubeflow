"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = function (stream) {
    if (stream instanceof Blob || stream instanceof ReadableStream) {
        return new Response(stream)
            .arrayBuffer()
            .then(function (buffer) { return new Uint8Array(buffer); });
    }
    else {
        throw new Error('Readable is not supported.');
    }
};
//# sourceMappingURL=convert.js.map