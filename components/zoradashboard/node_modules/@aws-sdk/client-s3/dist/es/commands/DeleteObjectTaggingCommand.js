import { __extends } from "tslib";
import { DeleteObjectTaggingOutput, DeleteObjectTaggingRequest } from "../models/models_0";
import { deserializeAws_restXmlDeleteObjectTaggingCommand, serializeAws_restXmlDeleteObjectTaggingCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Removes the entire tag set from the specified object. For more information about
 *          managing object tags, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-tagging.html"> Object
 *             Tagging</a>.</p>
 *
 *          <p>To use this operation, you must have permission to perform the
 *             <code>s3:DeleteObjectTagging</code> action.</p>
 *
 *          <p>To delete tags of a specific object version, add the <code>versionId</code> query
 *          parameter in the request. You will need permission for the
 *             <code>s3:DeleteObjectVersionTagging</code> action.</p>
 *
 *          <p>The following operations are related to
 *          <code>DeleteBucketMetricsConfiguration</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObjectTagging.html">PutObjectTagging</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObjectTagging.html">GetObjectTagging</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var DeleteObjectTaggingCommand = /** @class */ (function (_super) {
    __extends(DeleteObjectTaggingCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteObjectTaggingCommand(input) {
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
    DeleteObjectTaggingCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "DeleteObjectTaggingCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteObjectTaggingRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteObjectTaggingOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteObjectTaggingCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlDeleteObjectTaggingCommand(input, context);
    };
    DeleteObjectTaggingCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlDeleteObjectTaggingCommand(output, context);
    };
    return DeleteObjectTaggingCommand;
}($Command));
export { DeleteObjectTaggingCommand };
//# sourceMappingURL=DeleteObjectTaggingCommand.js.map