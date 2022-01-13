import { __extends } from "tslib";
import { PutBucketRequestPaymentRequest } from "../models/models_0";
import { deserializeAws_restXmlPutBucketRequestPaymentCommand, serializeAws_restXmlPutBucketRequestPaymentCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Sets the request payment configuration for a bucket. By default, the bucket owner pays
 *          for downloads from the bucket. This configuration parameter enables the bucket owner (only)
 *          to specify that the person requesting the download will be charged for the download. For
 *          more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/RequesterPaysBuckets.html">Requester Pays
 *             Buckets</a>.</p>
 *
 *          <p>The following operations are related to <code>PutBucketRequestPayment</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketRequestPayment.html">GetBucketRequestPayment</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var PutBucketRequestPaymentCommand = /** @class */ (function (_super) {
    __extends(PutBucketRequestPaymentCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutBucketRequestPaymentCommand(input) {
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
    PutBucketRequestPaymentCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "PutBucketRequestPaymentCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutBucketRequestPaymentRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutBucketRequestPaymentCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlPutBucketRequestPaymentCommand(input, context);
    };
    PutBucketRequestPaymentCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlPutBucketRequestPaymentCommand(output, context);
    };
    return PutBucketRequestPaymentCommand;
}($Command));
export { PutBucketRequestPaymentCommand };
//# sourceMappingURL=PutBucketRequestPaymentCommand.js.map