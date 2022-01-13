import { __extends } from "tslib";
import { GetBucketVersioningOutput, GetBucketVersioningRequest } from "../models/models_0";
import { deserializeAws_restXmlGetBucketVersioningCommand, serializeAws_restXmlGetBucketVersioningCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the versioning state of a bucket.</p>
 *          <p>To retrieve the versioning state of a bucket, you must be the bucket owner.</p>
 *
 *          <p>This implementation also returns the MFA Delete status of the versioning state. If the
 *          MFA Delete status is <code>enabled</code>, the bucket owner must use an authentication
 *          device to change the versioning state of the bucket.</p>
 *
 *          <p>The following operations are related to <code>GetBucketVersioning</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html">PutObject</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObject.html">DeleteObject</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetBucketVersioningCommand = /** @class */ (function (_super) {
    __extends(GetBucketVersioningCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetBucketVersioningCommand(input) {
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
    GetBucketVersioningCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetBucketVersioningCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetBucketVersioningRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetBucketVersioningOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetBucketVersioningCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetBucketVersioningCommand(input, context);
    };
    GetBucketVersioningCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetBucketVersioningCommand(output, context);
    };
    return GetBucketVersioningCommand;
}($Command));
export { GetBucketVersioningCommand };
//# sourceMappingURL=GetBucketVersioningCommand.js.map