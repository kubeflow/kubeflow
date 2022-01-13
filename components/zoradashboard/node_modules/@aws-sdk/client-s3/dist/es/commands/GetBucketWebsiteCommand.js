import { __extends } from "tslib";
import { GetBucketWebsiteOutput, GetBucketWebsiteRequest } from "../models/models_0";
import { deserializeAws_restXmlGetBucketWebsiteCommand, serializeAws_restXmlGetBucketWebsiteCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the website configuration for a bucket. To host website on Amazon S3, you can
 *          configure a bucket as website by adding a website configuration. For more information about
 *          hosting websites, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html">Hosting Websites on
 *             Amazon S3</a>. </p>
 *          <p>This GET operation requires the <code>S3:GetBucketWebsite</code> permission. By default,
 *          only the bucket owner can read the bucket website configuration. However, bucket owners can
 *          allow other users to read the website configuration by writing a bucket policy granting
 *          them the <code>S3:GetBucketWebsite</code> permission.</p>
 *          <p>The following operations are related to <code>DeleteBucketWebsite</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketWebsite.html">DeleteBucketWebsite</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketWebsite.html">PutBucketWebsite</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetBucketWebsiteCommand = /** @class */ (function (_super) {
    __extends(GetBucketWebsiteCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetBucketWebsiteCommand(input) {
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
    GetBucketWebsiteCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetBucketWebsiteCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetBucketWebsiteRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetBucketWebsiteOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetBucketWebsiteCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetBucketWebsiteCommand(input, context);
    };
    GetBucketWebsiteCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetBucketWebsiteCommand(output, context);
    };
    return GetBucketWebsiteCommand;
}($Command));
export { GetBucketWebsiteCommand };
//# sourceMappingURL=GetBucketWebsiteCommand.js.map