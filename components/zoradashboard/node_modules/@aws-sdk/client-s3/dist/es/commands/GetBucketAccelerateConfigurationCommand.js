import { __extends } from "tslib";
import { GetBucketAccelerateConfigurationOutput, GetBucketAccelerateConfigurationRequest } from "../models/models_0";
import { deserializeAws_restXmlGetBucketAccelerateConfigurationCommand, serializeAws_restXmlGetBucketAccelerateConfigurationCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>This implementation of the GET operation uses the <code>accelerate</code> subresource to
 *          return the Transfer Acceleration state of a bucket, which is either <code>Enabled</code> or
 *             <code>Suspended</code>. Amazon S3 Transfer Acceleration is a bucket-level feature that
 *          enables you to perform faster data transfers to and from Amazon S3.</p>
 *          <p>To use this operation, you must have permission to perform the
 *             <code>s3:GetAccelerateConfiguration</code> action. The bucket owner has this permission
 *          by default. The bucket owner can grant this permission to others. For more information
 *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to your Amazon S3
 *             Resources</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
 *          <p>You set the Transfer Acceleration state of an existing bucket to <code>Enabled</code> or
 *             <code>Suspended</code> by using the <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketAccelerateConfiguration.html">PutBucketAccelerateConfiguration</a> operation. </p>
 *          <p>A GET <code>accelerate</code> request does not return a state value for a bucket that
 *          has no transfer acceleration state. A bucket has no Transfer Acceleration state if a state
 *          has never been set on the bucket. </p>
 *
 *          <p>For more information about transfer acceleration, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html">Transfer Acceleration</a> in the
 *          Amazon Simple Storage Service Developer Guide.</p>
 *          <p class="title">
 *             <b>Related Resources</b>
 *          </p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketAccelerateConfiguration.html">PutBucketAccelerateConfiguration</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetBucketAccelerateConfigurationCommand = /** @class */ (function (_super) {
    __extends(GetBucketAccelerateConfigurationCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetBucketAccelerateConfigurationCommand(input) {
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
    GetBucketAccelerateConfigurationCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetBucketAccelerateConfigurationCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetBucketAccelerateConfigurationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetBucketAccelerateConfigurationOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetBucketAccelerateConfigurationCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetBucketAccelerateConfigurationCommand(input, context);
    };
    GetBucketAccelerateConfigurationCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetBucketAccelerateConfigurationCommand(output, context);
    };
    return GetBucketAccelerateConfigurationCommand;
}($Command));
export { GetBucketAccelerateConfigurationCommand };
//# sourceMappingURL=GetBucketAccelerateConfigurationCommand.js.map