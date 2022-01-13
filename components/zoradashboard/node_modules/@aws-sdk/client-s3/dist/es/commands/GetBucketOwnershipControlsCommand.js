import { __extends } from "tslib";
import { GetBucketOwnershipControlsOutput, GetBucketOwnershipControlsRequest } from "../models/models_0";
import { deserializeAws_restXmlGetBucketOwnershipControlsCommand, serializeAws_restXmlGetBucketOwnershipControlsCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Retrieves <code>OwnershipControls</code> for an Amazon S3 bucket. To use this operation, you
 *          must have the <code>s3:GetBucketOwnershipControls</code> permission. For more information
 *          about Amazon S3 permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html">Specifying
 *             Permissions in a Policy</a>. </p>
 *          <p>For information about Amazon S3 Object Ownership, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html">Using Object Ownership</a>. </p>
 *          <p>The following operations are related to <code>GetBucketOwnershipControls</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a>PutBucketOwnershipControls</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>DeleteBucketOwnershipControls</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetBucketOwnershipControlsCommand = /** @class */ (function (_super) {
    __extends(GetBucketOwnershipControlsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetBucketOwnershipControlsCommand(input) {
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
    GetBucketOwnershipControlsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetBucketOwnershipControlsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetBucketOwnershipControlsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetBucketOwnershipControlsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetBucketOwnershipControlsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetBucketOwnershipControlsCommand(input, context);
    };
    GetBucketOwnershipControlsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetBucketOwnershipControlsCommand(output, context);
    };
    return GetBucketOwnershipControlsCommand;
}($Command));
export { GetBucketOwnershipControlsCommand };
//# sourceMappingURL=GetBucketOwnershipControlsCommand.js.map