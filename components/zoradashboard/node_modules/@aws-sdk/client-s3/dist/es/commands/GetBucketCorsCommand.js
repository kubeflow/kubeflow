import { __extends } from "tslib";
import { GetBucketCorsOutput, GetBucketCorsRequest } from "../models/models_0";
import { deserializeAws_restXmlGetBucketCorsCommand, serializeAws_restXmlGetBucketCorsCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the cors configuration information set for the bucket.</p>
 *
 *          <p> To use this operation, you must have permission to perform the s3:GetBucketCORS action.
 *          By default, the bucket owner has this permission and can grant it to others.</p>
 *
 *          <p> For more information about cors, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html"> Enabling
 *             Cross-Origin Resource Sharing</a>.</p>
 *
 *          <p>The following operations are related to <code>GetBucketCors</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketCors.html">PutBucketCors</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketCors.html">DeleteBucketCors</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetBucketCorsCommand = /** @class */ (function (_super) {
    __extends(GetBucketCorsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetBucketCorsCommand(input) {
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
    GetBucketCorsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetBucketCorsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetBucketCorsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetBucketCorsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetBucketCorsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetBucketCorsCommand(input, context);
    };
    GetBucketCorsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetBucketCorsCommand(output, context);
    };
    return GetBucketCorsCommand;
}($Command));
export { GetBucketCorsCommand };
//# sourceMappingURL=GetBucketCorsCommand.js.map