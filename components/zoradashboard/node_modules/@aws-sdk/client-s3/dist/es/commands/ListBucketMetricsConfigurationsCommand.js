import { __extends } from "tslib";
import { ListBucketMetricsConfigurationsOutput, ListBucketMetricsConfigurationsRequest } from "../models/models_0";
import { deserializeAws_restXmlListBucketMetricsConfigurationsCommand, serializeAws_restXmlListBucketMetricsConfigurationsCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists the metrics configurations for the bucket. The metrics configurations are only for
 *          the request metrics of the bucket and do not provide information on daily storage metrics.
 *          You can have up to 1,000 configurations per bucket.</p>
 *
 *          <p>This operation supports list pagination and does not return more than 100 configurations
 *          at a time. Always check the <code>IsTruncated</code> element in the response. If there are
 *          no more configurations to list, <code>IsTruncated</code> is set to false. If there are more
 *          configurations to list, <code>IsTruncated</code> is set to true, and there is a value in
 *             <code>NextContinuationToken</code>. You use the <code>NextContinuationToken</code> value
 *          to continue the pagination of the list by passing the value in
 *             <code>continuation-token</code> in the request to <code>GET</code> the next page.</p>
 *
 *          <p>To use this operation, you must have permissions to perform the
 *             <code>s3:GetMetricsConfiguration</code> action. The bucket owner has this permission by
 *          default. The bucket owner can grant this permission to others. For more information about
 *          permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
 *             Resources</a>.</p>
 *
 *          <p>For more information about metrics configurations and CloudWatch request metrics, see
 *             <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html">Monitoring Metrics with Amazon
 *             CloudWatch</a>.</p>
 *
 *          <p>The following operations are related to
 *          <code>ListBucketMetricsConfigurations</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketMetricsConfiguration.html">PutBucketMetricsConfiguration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketMetricsConfiguration.html">GetBucketMetricsConfiguration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketMetricsConfiguration.html">DeleteBucketMetricsConfiguration</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var ListBucketMetricsConfigurationsCommand = /** @class */ (function (_super) {
    __extends(ListBucketMetricsConfigurationsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListBucketMetricsConfigurationsCommand(input) {
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
    ListBucketMetricsConfigurationsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "ListBucketMetricsConfigurationsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListBucketMetricsConfigurationsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListBucketMetricsConfigurationsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListBucketMetricsConfigurationsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlListBucketMetricsConfigurationsCommand(input, context);
    };
    ListBucketMetricsConfigurationsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlListBucketMetricsConfigurationsCommand(output, context);
    };
    return ListBucketMetricsConfigurationsCommand;
}($Command));
export { ListBucketMetricsConfigurationsCommand };
//# sourceMappingURL=ListBucketMetricsConfigurationsCommand.js.map