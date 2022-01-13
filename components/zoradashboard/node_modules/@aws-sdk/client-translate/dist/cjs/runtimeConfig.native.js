"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDefaultValues = void 0;
const sha256_js_1 = require("@aws-crypto/sha256-js");
const url_parser_native_1 = require("@aws-sdk/url-parser-native");
const runtimeConfig_browser_1 = require("./runtimeConfig.browser");
/**
 * @internal
 */
exports.ClientDefaultValues = {
    ...runtimeConfig_browser_1.ClientDefaultValues,
    runtime: "react-native",
    sha256: sha256_js_1.Sha256,
    urlParser: url_parser_native_1.parseUrl,
};
//# sourceMappingURL=runtimeConfig.native.js.map