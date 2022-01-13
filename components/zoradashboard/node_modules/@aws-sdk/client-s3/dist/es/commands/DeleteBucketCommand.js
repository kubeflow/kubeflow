import { __extends } from "tslib";
import { DeleteBucketRequest } from "../models/models_0";
import { deserializeAws_restXmlDeleteBucketCommand, serializeAws_restXmlDeleteBucketCommand, } from "../protocols/Aws_restXml";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes the S3 bucket. All objects (including all object versions and delete markers) in
 *          the bucket must be deleted before the bucket itself can be deleted.</p>
 *
 *          <p class="title">
 *             <b>Related Resources</b>
 *          </p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObject.html">DeleteObject</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var DeleteBucketCommand = /** @class */ (function (_super) {
    __extends(DeleteBucketCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteBucketCommand(input) {
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
    DeleteBucketCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "DeleteBucketCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteBucketRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteBucketCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlDeleteBucketCommand(input, context);
    };
    DeleteBucketCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlDeleteBucketCommand(output, context);
    };
    return DeleteBucketCommand;
}($Command));
export { DeleteBucketCommand };
//# sourceMappingURL=DeleteBucketCommand.js.map