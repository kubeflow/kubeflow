import { __extends } from "tslib";
import { GetBucketMetricsConfigurationOutput, GetBucketMetricsConfigurationRequest } from "../models/models_0";
import { deserializeAws_restXmlGetBucketMetricsConfigurationCommand, serializeAws_restXmlGetBucketMetricsConfigurationCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets a metrics configuration (specified by the metrics configuration ID) from the
 *          bucket. Note that this doesn't include the daily storage metrics.</p>
 *
 *          <p> To use this operation, you must have permissions to perform the
 *             <code>s3:GetMetricsConfiguration</code> action. The bucket owner has this permission by
 *          default. The bucket owner can grant this permission to others. For more information about
 *          permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
 *             Resources</a>.</p>
 *
 *          <p> For information about CloudWatch request metrics for Amazon S3, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html">Monitoring Metrics with Amazon
 *             CloudWatch</a>.</p>
 *
 *          <p>The following operations are related to
 *          <code>GetBucketMetricsConfiguration</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketMetricsConfiguration.html">PutBucketMetricsConfiguration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketMetricsConfiguration.html">DeleteBucketMetricsConfiguration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBucketMetricsConfigurations.html">ListBucketMetricsConfigurations</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html">Monitoring Metrics with Amazon
 *                   CloudWatch</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetBucketMetricsConfigurationCommand = /** @class */ (function (_super) {
    __extends(GetBucketMetricsConfigurationCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetBucketMetricsConfigurationCommand(input) {
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
    GetBucketMetricsConfigurationCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetBucketMetricsConfigurationCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetBucketMetricsConfigurationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetBucketMetricsConfigurationOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetBucketMetricsConfigurationCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetBucketMetricsConfigurationCommand(input, context);
    };
    GetBucketMetricsConfigurationCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetBucketMetricsConfigurationCommand(output, context);
    };
    return GetBucketMetricsConfigurationCommand;
}($Command));
export { GetBucketMetricsConfigurationCommand };
//# sourceMappingURL=GetBucketMetricsConfigurationCommand.js.map