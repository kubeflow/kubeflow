import { __extends } from "tslib";
import { ListMultipartUploadsOutput, ListMultipartUploadsRequest } from "../models/models_0";
import { deserializeAws_restXmlListMultipartUploadsCommand, serializeAws_restXmlListMultipartUploadsCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>This operation lists in-progress multipart uploads. An in-progress multipart upload is a
 *          multipart upload that has been initiated using the Initiate Multipart Upload request, but
 *          has not yet been completed or aborted.</p>
 *
 *          <p>This operation returns at most 1,000 multipart uploads in the response. 1,000 multipart
 *          uploads is the maximum number of uploads a response can include, which is also the default
 *          value. You can further limit the number of uploads in a response by specifying the
 *             <code>max-uploads</code> parameter in the response. If additional multipart uploads
 *          satisfy the list criteria, the response will contain an <code>IsTruncated</code> element
 *          with the value true. To list the additional multipart uploads, use the
 *             <code>key-marker</code> and <code>upload-id-marker</code> request parameters.</p>
 *
 *          <p>In the response, the uploads are sorted by key. If your application has initiated more
 *          than one multipart upload using the same object key, then uploads in the response are first
 *          sorted by key. Additionally, uploads are sorted in ascending order within each key by the
 *          upload initiation time.</p>
 *
 *          <p>For more information on multipart uploads, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/uploadobjusingmpu.html">Uploading Objects Using Multipart
 *             Upload</a>.</p>
 *
 *          <p>For information on permissions required to use the multipart upload API, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/mpuAndPermissions.html">Multipart Upload API and
 *          Permissions</a>.</p>
 *
 *          <p>The following operations are related to <code>ListMultipartUploads</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateMultipartUpload.html">CreateMultipartUpload</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_UploadPart.html">UploadPart</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CompleteMultipartUpload.html">CompleteMultipartUpload</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListParts.html">ListParts</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_AbortMultipartUpload.html">AbortMultipartUpload</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var ListMultipartUploadsCommand = /** @class */ (function (_super) {
    __extends(ListMultipartUploadsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListMultipartUploadsCommand(input) {
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
    ListMultipartUploadsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "ListMultipartUploadsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListMultipartUploadsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListMultipartUploadsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListMultipartUploadsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlListMultipartUploadsCommand(input, context);
    };
    ListMultipartUploadsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlListMultipartUploadsCommand(output, context);
    };
    return ListMultipartUploadsCommand;
}($Command));
export { ListMultipartUploadsCommand };
//# sourceMappingURL=ListMultipartUploadsCommand.js.map