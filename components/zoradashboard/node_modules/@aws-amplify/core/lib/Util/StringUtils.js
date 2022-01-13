"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function urlSafeEncode(str) {
    return str
        .split('')
        .map(function (char) {
        return char
            .charCodeAt(0)
            .toString(16)
            .padStart(2, '0');
    })
        .join('');
}
exports.urlSafeEncode = urlSafeEncode;
function urlSafeDecode(hex) {
    return hex
        .match(/.{2}/g)
        .map(function (char) { return String.fromCharCode(parseInt(char, 16)); })
        .join('');
}
exports.urlSafeDecode = urlSafeDecode;
//# sourceMappingURL=StringUtils.js.map