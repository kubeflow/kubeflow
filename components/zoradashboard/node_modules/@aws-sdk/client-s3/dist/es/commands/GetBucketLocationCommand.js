import { __extends } from "tslib";
import { GetBucketLocationOutput, GetBucketLocationRequest } from "../models/models_0";
import { deserializeAws_restXmlGetBucketLocationCommand, serializeAws_restXmlGetBucketLocationCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the Region the bucket resides in. You set the bucket's Region using the
 *             <code>LocationConstraint</code> request parameter in a <code>CreateBucket</code>
 *          request. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>.</p>
 *
 *          <p> To use this implementation of the operation, you must be the bucket owner.</p>
 *
 *          <p>The following operations are related to <code>GetBucketLocation</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetBucketLocationCommand = /** @class */ (function (_super) {
    __extends(GetBucketLocationCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetBucketLocationCommand(input) {
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
    GetBucketLocationCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetBucketLocationCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetBucketLocationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetBucketLocationOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetBucketLocationCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetBucketLocationCommand(input, context);
    };
    GetBucketLocationCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetBucketLocationCommand(output, context);
    };
    return GetBucketLocationCommand;
}($Command));
export { GetBucketLocationCommand };
//# sourceMappingURL=GetBucketLocationCommand.js.map