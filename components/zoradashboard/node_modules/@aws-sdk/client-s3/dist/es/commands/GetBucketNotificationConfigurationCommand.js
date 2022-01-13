import { __extends } from "tslib";
import { GetBucketNotificationConfigurationRequest, NotificationConfiguration } from "../models/models_0";
import { deserializeAws_restXmlGetBucketNotificationConfigurationCommand, serializeAws_restXmlGetBucketNotificationConfigurationCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the notification configuration of a bucket.</p>
 *          <p>If notifications are not enabled on the bucket, the operation returns an empty
 *             <code>NotificationConfiguration</code> element.</p>
 *
 *          <p>By default, you must be the bucket owner to read the notification configuration of a
 *          bucket. However, the bucket owner can use a bucket policy to grant permission to other
 *          users to read this configuration with the <code>s3:GetBucketNotification</code>
 *          permission.</p>
 *
 *          <p>For more information about setting and reading the notification configuration on a
 *          bucket, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html">Setting Up Notification of
 *             Bucket Events</a>. For more information about bucket policies, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-iam-policies.html">Using Bucket Policies</a>.</p>
 *
 *          <p>The following operation is related to <code>GetBucketNotification</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketNotification.html">PutBucketNotification</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetBucketNotificationConfigurationCommand = /** @class */ (function (_super) {
    __extends(GetBucketNotificationConfigurationCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetBucketNotificationConfigurationCommand(input) {
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
    GetBucketNotificationConfigurationCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetBucketNotificationConfigurationCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetBucketNotificationConfigurationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: NotificationConfiguration.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetBucketNotificationConfigurationCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetBucketNotificationConfigurationCommand(input, context);
    };
    GetBucketNotificationConfigurationCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetBucketNotificationConfigurationCommand(output, context);
    };
    return GetBucketNotificationConfigurationCommand;
}($Command));
export { GetBucketNotificationConfigurationCommand };
//# sourceMappingURL=GetBucketNotificationConfigurationCommand.js.map