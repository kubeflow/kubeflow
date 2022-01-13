import { __assign, __extends } from "tslib";
import { ClientDefaultValues as __ClientDefaultValues } from "./runtimeConfig";
import { resolveEndpointsConfig, resolveRegionConfig, } from "@aws-sdk/config-resolver";
import { resolveEventStreamSerdeConfig, } from "@aws-sdk/eventstream-serde-config-resolver";
import { resolveBucketEndpointConfig, } from "@aws-sdk/middleware-bucket-endpoint";
import { getContentLengthPlugin } from "@aws-sdk/middleware-content-length";
import { getAddExpectContinuePlugin } from "@aws-sdk/middleware-expect-continue";
import { getHostHeaderPlugin, resolveHostHeaderConfig, } from "@aws-sdk/middleware-host-header";
import { getLoggerPlugin } from "@aws-sdk/middleware-logger";
import { getRetryPlugin, resolveRetryConfig } from "@aws-sdk/middleware-retry";
import { getUseRegionalEndpointPlugin, getValidateBucketNamePlugin } from "@aws-sdk/middleware-sdk-s3";
import { getAwsAuthPlugin, resolveAwsAuthConfig, } from "@aws-sdk/middleware-signing";
import { getUserAgentPlugin, resolveUserAgentConfig, } from "@aws-sdk/middleware-user-agent";
import { Client as __Client, } from "@aws-sdk/smithy-client";
/**
 * <p></p>
 */
var S3Client = /** @class */ (function (_super) {
    __extends(S3Client, _super);
    function S3Client(configuration) {
        var _this = this;
        var _config_0 = __assign(__assign({}, __ClientDefaultValues), configuration);
        var _config_1 = resolveRegionConfig(_config_0);
        var _config_2 = resolveEndpointsConfig(_config_1);
        var _config_3 = resolveAwsAuthConfig(_config_2);
        var _config_4 = resolveRetryConfig(_config_3);
        var _config_5 = resolveHostHeaderConfig(_config_4);
        var _config_6 = resolveBucketEndpointConfig(_config_5);
        var _config_7 = resolveUserAgentConfig(_config_6);
        var _config_8 = resolveEventStreamSerdeConfig(_config_7);
        _this = _super.call(this, _config_8) || this;
        _this.config = _config_8;
        _this.middlewareStack.use(getAwsAuthPlugin(_this.config));
        _this.middlewareStack.use(getRetryPlugin(_this.config));
        _this.middlewareStack.use(getContentLengthPlugin(_this.config));
        _this.middlewareStack.use(getHostHeaderPlugin(_this.config));
        _this.middlewareStack.use(getLoggerPlugin(_this.config));
        _this.middlewareStack.use(getValidateBucketNamePlugin(_this.config));
        _this.middlewareStack.use(getUseRegionalEndpointPlugin(_this.config));
        _this.middlewareStack.use(getAddExpectContinuePlugin(_this.config));
        _this.middlewareStack.use(getUserAgentPlugin(_this.config));
        return _this;
    }
    S3Client.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return S3Client;
}(__Client));
export { S3Client };
//# sourceMappingURL=S3Client.js.map