import { __extends } from "tslib";
import { GetObjectTaggingOutput, GetObjectTaggingRequest } from "../models/models_0";
import { deserializeAws_restXmlGetObjectTaggingCommand, serializeAws_restXmlGetObjectTaggingCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the tag-set of an object. You send the GET request against the tagging
 *          subresource associated with the object.</p>
 *
 *          <p>To use this operation, you must have permission to perform the
 *             <code>s3:GetObjectTagging</code> action. By default, the GET operation returns
 *          information about current version of an object. For a versioned bucket, you can have
 *          multiple versions of an object in your bucket. To retrieve tags of any other version, use
 *          the versionId query parameter. You also need permission for the
 *             <code>s3:GetObjectVersionTagging</code> action.</p>
 *
 *          <p> By default, the bucket owner has this permission and can grant this permission to
 *          others.</p>
 *
 *          <p> For information about the Amazon S3 object tagging feature, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-tagging.html">Object Tagging</a>.</p>
 *
 *          <p>The following operation is related to <code>GetObjectTagging</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObjectTagging.html">PutObjectTagging</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetObjectTaggingCommand = /** @class */ (function (_super) {
    __extends(GetObjectTaggingCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetObjectTaggingCommand(input) {
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
    GetObjectTaggingCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetObjectTaggingCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetObjectTaggingRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetObjectTaggingOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetObjectTaggingCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetObjectTaggingCommand(input, context);
    };
    GetObjectTaggingCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetObjectTaggingCommand(output, context);
    };
    return GetObjectTaggingCommand;
}($Command));
export { GetObjectTaggingCommand };
//# sourceMappingURL=GetObjectTaggingCommand.js.map