import { __extends } from "tslib";
import { ListBucketInventoryConfigurationsOutput, ListBucketInventoryConfigurationsRequest } from "../models/models_0";
import { deserializeAws_restXmlListBucketInventoryConfigurationsCommand, serializeAws_restXmlListBucketInventoryConfigurationsCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns a list of inventory configurations for the bucket. You can have up to 1,000
 *          analytics configurations per bucket.</p>
 *
 *          <p>This operation supports list pagination and does not return more than 100 configurations
 *          at a time. Always check the <code>IsTruncated</code> element in the response. If there are
 *          no more configurations to list, <code>IsTruncated</code> is set to false. If there are more
 *          configurations to list, <code>IsTruncated</code> is set to true, and there is a value in
 *             <code>NextContinuationToken</code>. You use the <code>NextContinuationToken</code> value
 *          to continue the pagination of the list by passing the value in continuation-token in the
 *          request to <code>GET</code> the next page.</p>
 *
 *          <p> To use this operation, you must have permissions to perform the
 *             <code>s3:GetInventoryConfiguration</code> action. The bucket owner has this permission
 *          by default. The bucket owner can grant this permission to others. For more information
 *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
 *             Resources</a>.</p>
 *
 *          <p>For information about the Amazon S3 inventory feature, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-inventory.html">Amazon S3 Inventory</a>
 *          </p>
 *
 *          <p>The following operations are related to
 *          <code>ListBucketInventoryConfigurations</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketInventoryConfiguration.html">GetBucketInventoryConfiguration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketInventoryConfiguration.html">DeleteBucketInventoryConfiguration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketInventoryConfiguration.html">PutBucketInventoryConfiguration</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var ListBucketInventoryConfigurationsCommand = /** @class */ (function (_super) {
    __extends(ListBucketInventoryConfigurationsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListBucketInventoryConfigurationsCommand(input) {
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
    ListBucketInventoryConfigurationsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "ListBucketInventoryConfigurationsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListBucketInventoryConfigurationsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListBucketInventoryConfigurationsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListBucketInventoryConfigurationsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlListBucketInventoryConfigurationsCommand(input, context);
    };
    ListBucketInventoryConfigurationsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlListBucketInventoryConfigurationsCommand(output, context);
    };
    return ListBucketInventoryConfigurationsCommand;
}($Command));
export { ListBucketInventoryConfigurationsCommand };
//# sourceMappingURL=ListBucketInventoryConfigurationsCommand.js.map