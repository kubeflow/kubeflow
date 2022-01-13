export function urlSafeEncode(str) {
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
export function urlSafeDecode(hex) {
    return hex
        .match(/.{2}/g)
        .map(function (char) { return String.fromCharCode(parseInt(char, 16)); })
        .join('');
}
//# sourceMappingURL=StringUtils.js.map