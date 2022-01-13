import { __extends } from "tslib";
import { GetBucketRequestPaymentOutput, GetBucketRequestPaymentRequest } from "../models/models_0";
import { deserializeAws_restXmlGetBucketRequestPaymentCommand, serializeAws_restXmlGetBucketRequestPaymentCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the request payment configuration of a bucket. To use this version of the
 *          operation, you must be the bucket owner. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/RequesterPaysBuckets.html">Requester Pays Buckets</a>.</p>
 *
 *          <p>The following operations are related to <code>GetBucketRequestPayment</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjects.html">ListObjects</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetBucketRequestPaymentCommand = /** @class */ (function (_super) {
    __extends(GetBucketRequestPaymentCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetBucketRequestPaymentCommand(input) {
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
    GetBucketRequestPaymentCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetBucketRequestPaymentCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetBucketRequestPaymentRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetBucketRequestPaymentOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetBucketRequestPaymentCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetBucketRequestPaymentCommand(input, context);
    };
    GetBucketRequestPaymentCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetBucketRequestPaymentCommand(output, context);
    };
    return GetBucketRequestPaymentCommand;
}($Command));
export { GetBucketRequestPaymentCommand };
//# sourceMappingURL=GetBucketRequestPaymentCommand.js.map