import { __extends } from "tslib";
import { PutBucketAnalyticsConfigurationRequest } from "../models/models_0";
import { deserializeAws_restXmlPutBucketAnalyticsConfigurationCommand, serializeAws_restXmlPutBucketAnalyticsConfigurationCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Sets an analytics configuration for the bucket (specified by the analytics configuration
 *          ID). You can have up to 1,000 analytics configurations per bucket.</p>
 *
 *          <p>You can choose to have storage class analysis export analysis reports sent to a
 *          comma-separated values (CSV) flat file. See the <code>DataExport</code> request element.
 *          Reports are updated daily and are based on the object filters that you configure. When
 *          selecting data export, you specify a destination bucket and an optional destination prefix
 *          where the file is written. You can export the data to a destination bucket in a different
 *          account. However, the destination bucket must be in the same Region as the bucket that you
 *          are making the PUT analytics configuration to. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/analytics-storage-class.html">Amazon S3 Analytics – Storage Class
 *             Analysis</a>. </p>
 *
 *          <important>
 *             <p>You must create a bucket policy on the destination bucket where the exported file is
 *             written to grant permissions to Amazon S3 to write objects to the bucket. For an example
 *             policy, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html#example-bucket-policies-use-case-9">Granting Permissions for Amazon S3 Inventory and Storage Class Analysis</a>.</p>
 *          </important>
 *
 *          <p>To use this operation, you must have permissions to perform the
 *             <code>s3:PutAnalyticsConfiguration</code> action. The bucket owner has this permission
 *          by default. The bucket owner can grant this permission to others. For more information
 *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
 *             Resources</a>.</p>
 *
 *
 *          <p class="title">
 *             <b>Special Errors</b>
 *          </p>
 *          <ul>
 *             <li>
 *                <ul>
 *                   <li>
 *                      <p>
 *                         <i>HTTP Error: HTTP 400 Bad Request</i>
 *                      </p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <i>Code: InvalidArgument</i>
 *                      </p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <i>Cause: Invalid argument.</i>
 *                      </p>
 *                   </li>
 *                </ul>
 *             </li>
 *             <li>
 *                <ul>
 *                   <li>
 *                      <p>
 *                         <i>HTTP Error: HTTP 400 Bad Request</i>
 *                      </p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <i>Code: TooManyConfigurations</i>
 *                      </p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <i>Cause: You are attempting to create a new configuration but have
 *                         already reached the 1,000-configuration limit.</i>
 *                      </p>
 *                   </li>
 *                </ul>
 *             </li>
 *             <li>
 *                <ul>
 *                   <li>
 *                      <p>
 *                         <i>HTTP Error: HTTP 403 Forbidden</i>
 *                      </p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <i>Code: AccessDenied</i>
 *                      </p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <i>Cause: You are not the owner of the specified bucket, or you do
 *                         not have the s3:PutAnalyticsConfiguration bucket permission to set the
 *                         configuration on the bucket.</i>
 *                      </p>
 *                   </li>
 *                </ul>
 *             </li>
 *          </ul>
 *
 *
 *
 *
 *
 *
 *          <p class="title">
 *             <b>Related Resources</b>
 *          </p>
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
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBucketAnalyticsConfigurations.html">ListBucketAnalyticsConfigurations</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var PutBucketAnalyticsConfigurationCommand = /** @class */ (function (_super) {
    __extends(PutBucketAnalyticsConfigurationCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutBucketAnalyticsConfigurationCommand(input) {
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
    PutBucketAnalyticsConfigurationCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "PutBucketAnalyticsConfigurationCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutBucketAnalyticsConfigurationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutBucketAnalyticsConfigurationCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlPutBucketAnalyticsConfigurationCommand(input, context);
    };
    PutBucketAnalyticsConfigurationCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlPutBucketAnalyticsConfigurationCommand(output, context);
    };
    return PutBucketAnalyticsConfigurationCommand;
}($Command));
export { PutBucketAnalyticsConfigurationCommand };
//# sourceMappingURL=PutBucketAnalyticsConfigurationCommand.js.map