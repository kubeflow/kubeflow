import { __extends } from "tslib";
import { GetBucketLifecycleConfigurationOutput, GetBucketLifecycleConfigurationRequest } from "../models/models_0";
import { deserializeAws_restXmlGetBucketLifecycleConfigurationCommand, serializeAws_restXmlGetBucketLifecycleConfigurationCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <note>
 *             <p>Bucket lifecycle configuration now supports specifying a lifecycle rule using an
 *             object key name prefix, one or more object tags, or a combination of both. Accordingly,
 *             this section describes the latest API. The response describes the new filter element
 *             that you can use to specify a filter to select a subset of objects to which the rule
 *             applies. If you are using a previous version of the lifecycle configuration, it still
 *             works. For the earlier API description, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLifecycle.html">GetBucketLifecycle</a>.</p>
 *          </note>
 *          <p>Returns the lifecycle configuration information set on the bucket. For information about
 *          lifecycle configuration, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html">Object
 *             Lifecycle Management</a>.</p>
 *
 *          <p>To use this operation, you must have permission to perform the
 *             <code>s3:GetLifecycleConfiguration</code> action. The bucket owner has this permission,
 *          by default. The bucket owner can grant this permission to others. For more information
 *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
 *             Resources</a>.</p>
 *
 *          <p>
 *             <code>GetBucketLifecycleConfiguration</code> has the following special error:</p>
 *          <ul>
 *             <li>
 *                <p>Error code: <code>NoSuchLifecycleConfiguration</code>
 *                </p>
 *                <ul>
 *                   <li>
 *                      <p>Description: The lifecycle configuration does not exist.</p>
 *                   </li>
 *                   <li>
 *                      <p>HTTP Status Code: 404 Not Found</p>
 *                   </li>
 *                   <li>
 *                      <p>SOAP Fault Code Prefix: Client</p>
 *                   </li>
 *                </ul>
 *             </li>
 *          </ul>
 *          <p>The following operations are related to
 *          <code>GetBucketLifecycleConfiguration</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLifecycle.html">GetBucketLifecycle</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLifecycle.html">PutBucketLifecycle</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketLifecycle.html">DeleteBucketLifecycle</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetBucketLifecycleConfigurationCommand = /** @class */ (function (_super) {
    __extends(GetBucketLifecycleConfigurationCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetBucketLifecycleConfigurationCommand(input) {
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
    GetBucketLifecycleConfigurationCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetBucketLifecycleConfigurationCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetBucketLifecycleConfigurationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetBucketLifecycleConfigurationOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetBucketLifecycleConfigurationCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetBucketLifecycleConfigurationCommand(input, context);
    };
    GetBucketLifecycleConfigurationCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetBucketLifecycleConfigurationCommand(output, context);
    };
    return GetBucketLifecycleConfigurationCommand;
}($Command));
export { GetBucketLifecycleConfigurationCommand };
//# sourceMappingURL=GetBucketLifecycleConfigurationCommand.js.map