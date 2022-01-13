import { __extends } from "tslib";
import { ListBucketAnalyticsConfigurationsOutput, ListBucketAnalyticsConfigurationsRequest } from "../models/models_0";
import { deserializeAws_restXmlListBucketAnalyticsConfigurationsCommand, serializeAws_restXmlListBucketAnalyticsConfigurationsCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists the analytics configurations for the bucket. You can have up to 1,000 analytics
 *          configurations per bucket.</p>
 *
 *          <p>This operation supports list pagination and does not return more than 100 configurations
 *          at a time. You should always check the <code>IsTruncated</code> element in the response. If
 *          there are no more configurations to list, <code>IsTruncated</code> is set to false. If
 *          there are more configurations to list, <code>IsTruncated</code> is set to true, and there
 *          will be a value in <code>NextContinuationToken</code>. You use the
 *             <code>NextContinuationToken</code> value to continue the pagination of the list by
 *          passing the value in continuation-token in the request to <code>GET</code> the next
 *          page.</p>
 *
 *          <p>To use this operation, you must have permissions to perform the
 *             <code>s3:GetAnalyticsConfiguration</code> action. The bucket owner has this permission
 *          by default. The bucket owner can grant this permission to others. For more information
 *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
 *             Resources</a>.</p>
 *
 *          <p>For information about Amazon S3 analytics feature, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/analytics-storage-class.html">Amazon S3 Analytics – Storage Class
 *             Analysis</a>. </p>
 *
 *          <p>The following operations are related to
 *          <code>ListBucketAnalyticsConfigurations</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketAnalyticsConfiguration.html">GetBucketAnalyticsConfiguration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketAnalyticsConfiguration.html">DeleteBucketAnalyticsConfiguration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketAnalyticsConfiguration.html">PutBucketAnalyticsConfiguration</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var ListBucketAnalyticsConfigurationsCommand = /** @class */ (function (_super) {
    __extends(ListBucketAnalyticsConfigurationsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListBucketAnalyticsConfigurationsCommand(input) {
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
    ListBucketAnalyticsConfigurationsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "ListBucketAnalyticsConfigurationsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListBucketAnalyticsConfigurationsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListBucketAnalyticsConfigurationsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListBucketAnalyticsConfigurationsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlListBucketAnalyticsConfigurationsCommand(input, context);
    };
    ListBucketAnalyticsConfigurationsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlListBucketAnalyticsConfigurationsCommand(output, context);
    };
    return ListBucketAnalyticsConfigurationsCommand;
}($Command));
export { ListBucketAnalyticsConfigurationsCommand };
//# sourceMappingURL=ListBucketAnalyticsConfigurationsCommand.js.map