import { __extends } from "tslib";
import { DeleteBucketTaggingRequest } from "../models/models_0";
import { deserializeAws_restXmlDeleteBucketTaggingCommand, serializeAws_restXmlDeleteBucketTaggingCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes the tags from the bucket.</p>
 *
 *          <p>To use this operation, you must have permission to perform the
 *             <code>s3:PutBucketTagging</code> action. By default, the bucket owner has this
 *          permission and can grant this permission to others. </p>
 *          <p>The following operations are related to <code>DeleteBucketTagging</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketTagging.html">GetBucketTagging</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketTagging.html">PutBucketTagging</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var DeleteBucketTaggingCommand = /** @class */ (function (_super) {
    __extends(DeleteBucketTaggingCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteBucketTaggingCommand(input) {
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
    DeleteBucketTaggingCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "DeleteBucketTaggingCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteBucketTaggingRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteBucketTaggingCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlDeleteBucketTaggingCommand(input, context);
    };
    DeleteBucketTaggingCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlDeleteBucketTaggingCommand(output, context);
    };
    return DeleteBucketTaggingCommand;
}($Command));
export { DeleteBucketTaggingCommand };
//# sourceMappingURL=DeleteBucketTaggingCommand.js.map