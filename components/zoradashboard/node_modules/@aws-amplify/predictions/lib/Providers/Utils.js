"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Changes object keys to camel case. If optional parameter `keys` is given, then we extract only the
 * keys specified in `keys`.
 */
function makeCamelCase(obj, keys) {
    if (!obj)
        return undefined;
    var newObj = {};
    var keysToRename = keys ? keys : Object.keys(obj);
    keysToRename.forEach(function (key) {
        var _a;
        if (obj.hasOwnProperty(key)) {
            // change the key to camelcase.
            var camelCaseKey = key.charAt(0).toLowerCase() + key.substr(1);
            Object.assign(newObj, (_a = {}, _a[camelCaseKey] = obj[key], _a));
        }
    });
    return newObj;
}
exports.makeCamelCase = makeCamelCase;
/**
 * Given an array of object, call makeCamelCase(...) on each option.
 */
function makeCamelCaseArray(objArr, keys) {
    if (!objArr)
        return undefined;
    return objArr.map(function (obj) { return makeCamelCase(obj, keys); });
}
exports.makeCamelCaseArray = makeCamelCaseArray;
/**
 * Converts blob to array buffer
 */
function blobToArrayBuffer(blob) {
    return new Promise(function (res, rej) {
        var reader = new FileReader();
        reader.onload = function (_event) {
            res(reader.result);
        };
        reader.onerror = function (err) {
            rej(err);
        };
        try {
            reader.readAsArrayBuffer(blob);
        }
        catch (err) {
            rej(err); // in case user gives invalid type
        }
    });
}
exports.blobToArrayBuffer = blobToArrayBuffer;
//# sourceMappingURL=Utils.js.map