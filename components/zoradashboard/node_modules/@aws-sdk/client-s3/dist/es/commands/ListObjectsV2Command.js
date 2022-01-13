import { __extends } from "tslib";
import { ListObjectsV2Output, ListObjectsV2Request } from "../models/models_0";
import { deserializeAws_restXmlListObjectsV2Command, serializeAws_restXmlListObjectsV2Command, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns some or all (up to 1,000) of the objects in a bucket. You can use the request
 *          parameters as selection criteria to return a subset of the objects in a bucket. A <code>200
 *             OK</code> response can contain valid or invalid XML. Make sure to design your
 *          application to parse the contents of the response and handle it appropriately.</p>
 *
 *          <p>To use this operation, you must have READ access to the bucket.</p>
 *
 *          <p>To use this operation in an AWS Identity and Access Management (IAM) policy, you must
 *          have permissions to perform the <code>s3:ListBucket</code> action. The bucket owner has
 *          this permission by default and can grant this permission to others. For more information
 *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
 *             Resources</a>.</p>
 *          <important>
 *             <p>This section describes the latest revision of the API. We recommend that you use this
 *             revised API for application development. For backward compatibility, Amazon S3 continues to
 *             support the prior version of this API, <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjects.html">ListObjects</a>.</p>
 *          </important>
 *
 *          <p>To get a list of your buckets, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBuckets.html">ListBuckets</a>.</p>
 *
 *          <p>The following operations are related to <code>ListObjectsV2</code>:</p>
 *          <ul>
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
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var ListObjectsV2Command = /** @class */ (function (_super) {
    __extends(ListObjectsV2Command, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListObjectsV2Command(input) {
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
    ListObjectsV2Command.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "ListObjectsV2Command";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListObjectsV2Request.filterSensitiveLog,
            outputFilterSensitiveLog: ListObjectsV2Output.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListObjectsV2Command.prototype.serialize = function (input, context) {
        return serializeAws_restXmlListObjectsV2Command(input, context);
    };
    ListObjectsV2Command.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlListObjectsV2Command(output, context);
    };
    return ListObjectsV2Command;
}($Command));
export { ListObjectsV2Command };
//# sourceMappingURL=ListObjectsV2Command.js.map