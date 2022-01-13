import { __extends } from "tslib";
import { ListObjectVersionsOutput, ListObjectVersionsRequest } from "../models/models_0";
import { deserializeAws_restXmlListObjectVersionsCommand, serializeAws_restXmlListObjectVersionsCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns metadata about all versions of the objects in a bucket. You can also use request
 *          parameters as selection criteria to return metadata about a subset of all the object
 *          versions. </p>
 *          <note>
 *             <p> A 200 OK response can contain valid or invalid XML. Make sure to design your
 *             application to parse the contents of the response and handle it appropriately.</p>
 *          </note>
 *          <p>To use this operation, you must have READ access to the bucket.</p>
 *          <p>This action is not supported by Amazon S3 on Outposts.</p>
 *          <p>The following operations are related to
 *             <code>ListObjectVersions</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjectsV2.html">ListObjectsV2</a>
 *                </p>
 *             </li>
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
var ListObjectVersionsCommand = /** @class */ (function (_super) {
    __extends(ListObjectVersionsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListObjectVersionsCommand(input) {
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
    ListObjectVersionsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "ListObjectVersionsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListObjectVersionsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListObjectVersionsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListObjectVersionsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlListObjectVersionsCommand(input, context);
    };
    ListObjectVersionsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlListObjectVersionsCommand(output, context);
    };
    return ListObjectVersionsCommand;
}($Command));
export { ListObjectVersionsCommand };
//# sourceMappingURL=ListObjectVersionsCommand.js.map