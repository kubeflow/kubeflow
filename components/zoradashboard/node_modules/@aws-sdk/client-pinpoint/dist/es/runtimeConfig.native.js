import { __assign } from "tslib";
import { Sha256 } from "@aws-crypto/sha256-js";
import { parseUrl } from "@aws-sdk/url-parser-native";
import { ClientDefaultValues as BrowserDefaults } from "./runtimeConfig.browser";
/**
 * @internal
 */
export var ClientDefaultValues = __assign(__assign({}, BrowserDefaults), { runtime: "react-native", sha256: Sha256, urlParser: parseUrl });
//# sourceMappingURL=runtimeConfig.native.js.map