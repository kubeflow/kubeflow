import { __extends } from "tslib";
import { HeadBucketRequest } from "../models/models_0";
import { deserializeAws_restXmlHeadBucketCommand, serializeAws_restXmlHeadBucketCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>This operation is useful to determine if a bucket exists and you have permission to
 *          access it. The operation returns a <code>200 OK</code> if the bucket exists and you have
 *          permission to access it. Otherwise, the operation might return responses such as <code>404
 *             Not Found</code> and <code>403 Forbidden</code>. </p>
 *
 *          <p>To use this operation, you must have permissions to perform the
 *             <code>s3:ListBucket</code> action. The bucket owner has this permission by default and
 *          can grant this permission to others. For more information about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
 *             Resources</a>.</p>
 */
var HeadBucketCommand = /** @class */ (function (_super) {
    __extends(HeadBucketCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function HeadBucketCommand(input) {
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
    HeadBucketCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "HeadBucketCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: HeadBucketRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    HeadBucketCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlHeadBucketCommand(input, context);
    };
    HeadBucketCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlHeadBucketCommand(output, context);
    };
    return HeadBucketCommand;
}($Command));
export { HeadBucketCommand };
//# sourceMappingURL=HeadBucketCommand.js.map