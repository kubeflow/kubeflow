import { __extends } from "tslib";
import { PutBucketAccelerateConfigurationRequest } from "../models/models_0";
import { deserializeAws_restXmlPutBucketAccelerateConfigurationCommand, serializeAws_restXmlPutBucketAccelerateConfigurationCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Sets the accelerate configuration of an existing bucket. Amazon S3 Transfer Acceleration is a
 *          bucket-level feature that enables you to perform faster data transfers to Amazon S3.</p>
 *
 *          <p> To use this operation, you must have permission to perform the
 *          s3:PutAccelerateConfiguration action. The bucket owner has this permission by default. The
 *          bucket owner can grant this permission to others. For more information about permissions,
 *          see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
 *             Resources</a>.</p>
 *
 *          <p> The Transfer Acceleration state of a bucket can be set to one of the following two
 *          values:</p>
 *          <ul>
 *             <li>
 *                <p> Enabled – Enables accelerated data transfers to the bucket.</p>
 *             </li>
 *             <li>
 *                <p> Suspended – Disables accelerated data transfers to the bucket.</p>
 *             </li>
 *          </ul>
 *
 *
 *          <p>The <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketAccelerateConfiguration.html">GetBucketAccelerateConfiguration</a> operation returns the transfer acceleration
 *          state of a bucket.</p>
 *
 *          <p>After setting the Transfer Acceleration state of a bucket to Enabled, it might take up
 *          to thirty minutes before the data transfer rates to the bucket increase.</p>
 *
 *          <p> The name of the bucket used for Transfer Acceleration must be DNS-compliant and must
 *          not contain periods (".").</p>
 *
 *          <p> For more information about transfer acceleration, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html">Transfer Acceleration</a>.</p>
 *
 *          <p>The following operations are related to
 *          <code>PutBucketAccelerateConfiguration</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketAccelerateConfiguration.html">GetBucketAccelerateConfiguration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var PutBucketAccelerateConfigurationCommand = /** @class */ (function (_super) {
    __extends(PutBucketAccelerateConfigurationCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutBucketAccelerateConfigurationCommand(input) {
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
    PutBucketAccelerateConfigurationCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "PutBucketAccelerateConfigurationCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutBucketAccelerateConfigurationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutBucketAccelerateConfigurationCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlPutBucketAccelerateConfigurationCommand(input, context);
    };
    PutBucketAccelerateConfigurationCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlPutBucketAccelerateConfigurationCommand(output, context);
    };
    return PutBucketAccelerateConfigurationCommand;
}($Command));
export { PutBucketAccelerateConfigurationCommand };
//# sourceMappingURL=PutBucketAccelerateConfigurationCommand.js.map