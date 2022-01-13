import { __extends } from "tslib";
import { GetBucketTaggingOutput, GetBucketTaggingRequest } from "../models/models_0";
import { deserializeAws_restXmlGetBucketTaggingCommand, serializeAws_restXmlGetBucketTaggingCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the tag set associated with the bucket.</p>
 *          <p>To use this operation, you must have permission to perform the
 *             <code>s3:GetBucketTagging</code> action. By default, the bucket owner has this
 *          permission and can grant this permission to others.</p>
 *
 *          <p>
 *             <code>GetBucketTagging</code> has the following special error:</p>
 *          <ul>
 *             <li>
 *                <p>Error code: <code>NoSuchTagSetError</code>
 *                </p>
 *                <ul>
 *                   <li>
 *                      <p>Description: There is no tag set associated with the bucket.</p>
 *                   </li>
 *                </ul>
 *             </li>
 *          </ul>
 *
 *          <p>The following operations are related to <code>GetBucketTagging</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketTagging.html">PutBucketTagging</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketTagging.html">DeleteBucketTagging</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetBucketTaggingCommand = /** @class */ (function (_super) {
    __extends(GetBucketTaggingCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetBucketTaggingCommand(input) {
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
    GetBucketTaggingCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetBucketTaggingCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetBucketTaggingRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetBucketTaggingOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetBucketTaggingCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetBucketTaggingCommand(input, context);
    };
    GetBucketTaggingCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetBucketTaggingCommand(output, context);
    };
    return GetBucketTaggingCommand;
}($Command));
export { GetBucketTaggingCommand };
//# sourceMappingURL=GetBucketTaggingCommand.js.map