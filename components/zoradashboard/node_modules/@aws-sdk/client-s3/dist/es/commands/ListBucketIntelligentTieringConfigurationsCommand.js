import { __extends } from "tslib";
import { ListBucketIntelligentTieringConfigurationsOutput, ListBucketIntelligentTieringConfigurationsRequest, } from "../models/models_0";
import { deserializeAws_restXmlListBucketIntelligentTieringConfigurationsCommand, serializeAws_restXmlListBucketIntelligentTieringConfigurationsCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists the S3 Intelligent-Tiering configuration from the specified bucket.</p>
 *          <p>The S3 Intelligent-Tiering storage class is designed to optimize storage costs by automatically moving data to the most cost-effective storage access tier, without additional operational overhead. S3 Intelligent-Tiering delivers automatic cost savings by moving data between access tiers, when access patterns change.</p>
 *          <p>The S3 Intelligent-Tiering storage class is suitable for objects larger than 128 KB that you plan to store for at least 30 days. If the size of an object is less than 128 KB, it is not eligible for auto-tiering. Smaller objects can be stored, but they are always charged at the frequent access tier rates in the S3 Intelligent-Tiering storage class. </p>
 *          <p>If you delete an object before the end of the 30-day minimum storage duration period, you are charged for 30 days. For more information, see  <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html#sc-dynamic-data-access">Storage class for automatically optimizing frequently and infrequently accessed objects</a>.</p>
 *          <p>Operations related to
 *             <code>ListBucketIntelligentTieringConfigurations</code> include: </p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketIntelligentTieringConfiguration.html">DeleteBucketIntelligentTieringConfiguration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketIntelligentTieringConfiguration.html">PutBucketIntelligentTieringConfiguration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketIntelligentTieringConfiguration.html">GetBucketIntelligentTieringConfiguration</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var ListBucketIntelligentTieringConfigurationsCommand = /** @class */ (function (_super) {
    __extends(ListBucketIntelligentTieringConfigurationsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListBucketIntelligentTieringConfigurationsCommand(input) {
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
    ListBucketIntelligentTieringConfigurationsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "ListBucketIntelligentTieringConfigurationsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListBucketIntelligentTieringConfigurationsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListBucketIntelligentTieringConfigurationsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListBucketIntelligentTieringConfigurationsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlListBucketIntelligentTieringConfigurationsCommand(input, context);
    };
    ListBucketIntelligentTieringConfigurationsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlListBucketIntelligentTieringConfigurationsCommand(output, context);
    };
    return ListBucketIntelligentTieringConfigurationsCommand;
}($Command));
export { ListBucketIntelligentTieringConfigurationsCommand };
//# sourceMappingURL=ListBucketIntelligentTieringConfigurationsCommand.js.map