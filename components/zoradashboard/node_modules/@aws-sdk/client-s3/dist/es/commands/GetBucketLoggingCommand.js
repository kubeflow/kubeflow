import { __extends } from "tslib";
import { GetBucketLoggingOutput, GetBucketLoggingRequest } from "../models/models_0";
import { deserializeAws_restXmlGetBucketLoggingCommand, serializeAws_restXmlGetBucketLoggingCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the logging status of a bucket and the permissions users have to view and modify
 *          that status. To use GET, you must be the bucket owner.</p>
 *
 *          <p>The following operations are related to <code>GetBucketLogging</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLogging.html">PutBucketLogging</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetBucketLoggingCommand = /** @class */ (function (_super) {
    __extends(GetBucketLoggingCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetBucketLoggingCommand(input) {
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
    GetBucketLoggingCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetBucketLoggingCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetBucketLoggingRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetBucketLoggingOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetBucketLoggingCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetBucketLoggingCommand(input, context);
    };
    GetBucketLoggingCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetBucketLoggingCommand(output, context);
    };
    return GetBucketLoggingCommand;
}($Command));
export { GetBucketLoggingCommand };
//# sourceMappingURL=GetBucketLoggingCommand.js.map