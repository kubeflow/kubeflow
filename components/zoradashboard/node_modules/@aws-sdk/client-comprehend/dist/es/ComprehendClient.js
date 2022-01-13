import { __assign, __extends } from "tslib";
import { ClientDefaultValues as __ClientDefaultValues } from "./runtimeConfig";
import { resolveEndpointsConfig, resolveRegionConfig, } from "@aws-sdk/config-resolver";
import { getContentLengthPlugin } from "@aws-sdk/middleware-content-length";
import { getHostHeaderPlugin, resolveHostHeaderConfig, } from "@aws-sdk/middleware-host-header";
import { getLoggerPlugin } from "@aws-sdk/middleware-logger";
import { getRetryPlugin, resolveRetryConfig } from "@aws-sdk/middleware-retry";
import { getAwsAuthPlugin, resolveAwsAuthConfig, } from "@aws-sdk/middleware-signing";
import { getUserAgentPlugin, resolveUserAgentConfig, } from "@aws-sdk/middleware-user-agent";
import { Client as __Client, } from "@aws-sdk/smithy-client";
/**
 * <p>Amazon Comprehend is an AWS service for gaining insight into the content of documents.
 *       Use these actions to determine the topics contained in your documents, the topics they
 *       discuss, the predominant sentiment expressed in them, the predominant language used, and
 *       more.</p>
 */
var ComprehendClient = /** @class */ (function (_super) {
    __extends(ComprehendClient, _super);
    function ComprehendClient(configuration) {
        var _this = this;
        var _config_0 = __assign(__assign({}, __ClientDefaultValues), configuration);
        var _config_1 = resolveRegionConfig(_config_0);
        var _config_2 = resolveEndpointsConfig(_config_1);
        var _config_3 = resolveAwsAuthConfig(_config_2);
        var _config_4 = resolveRetryConfig(_config_3);
        var _config_5 = resolveHostHeaderConfig(_config_4);
        var _config_6 = resolveUserAgentConfig(_config_5);
        _this = _super.call(this, _config_6) || this;
        _this.config = _config_6;
        _this.middlewareStack.use(getAwsAuthPlugin(_this.config));
        _this.middlewareStack.use(getRetryPlugin(_this.config));
        _this.middlewareStack.use(getContentLengthPlugin(_this.config));
        _this.middlewareStack.use(getHostHeaderPlugin(_this.config));
        _this.middlewareStack.use(getLoggerPlugin(_this.config));
        _this.middlewareStack.use(getUserAgentPlugin(_this.config));
        return _this;
    }
    ComprehendClient.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return ComprehendClient;
}(__Client));
export { ComprehendClient };
//# sourceMappingURL=ComprehendClient.js.map