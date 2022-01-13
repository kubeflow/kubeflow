import { __extends } from "tslib";
import { GetBucketAclOutput, GetBucketAclRequest } from "../models/models_0";
import { deserializeAws_restXmlGetBucketAclCommand, serializeAws_restXmlGetBucketAclCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>This implementation of the <code>GET</code> operation uses the <code>acl</code>
 *          subresource to return the access control list (ACL) of a bucket. To use <code>GET</code> to
 *          return the ACL of the bucket, you must have <code>READ_ACP</code> access to the bucket. If
 *             <code>READ_ACP</code> permission is granted to the anonymous user, you can return the
 *          ACL of the bucket without using an authorization header.</p>
 *
 *          <p class="title">
 *             <b>Related Resources</b>
 *          </p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjects.html">ListObjects</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetBucketAclCommand = /** @class */ (function (_super) {
    __extends(GetBucketAclCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetBucketAclCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    GetBucketAclCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetBucketAclCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetBucketAclRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetBucketAclOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetBucketAclCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetBucketAclCommand(input, context);
    };
    GetBucketAclCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetBucketAclCommand(output, context);
    };
    return GetBucketAclCommand;
}($Command));
export { GetBucketAclCommand };
//# sourceMappingURL=GetBucketAclCommand.js.map