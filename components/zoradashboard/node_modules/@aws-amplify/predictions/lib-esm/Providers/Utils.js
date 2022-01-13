/**
 * Changes object keys to camel case. If optional parameter `keys` is given, then we extract only the
 * keys specified in `keys`.
 */
export function makeCamelCase(obj, keys) {
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
/**
 * Given an array of object, call makeCamelCase(...) on each option.
 */
export function makeCamelCaseArray(objArr, keys) {
    if (!objArr)
        return undefined;
    return objArr.map(function (obj) { return makeCamelCase(obj, keys); });
}
/**
 * Converts blob to array buffer
 */
export function blobToArrayBuffer(blob) {
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
//# sourceMappingURL=Utils.js.map