import { __extends } from "tslib";
import { CompleteMultipartUploadOutput, CompleteMultipartUploadRequest } from "../models/models_0";
import { deserializeAws_restXmlCompleteMultipartUploadCommand, serializeAws_restXmlCompleteMultipartUploadCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getThrow200ExceptionsPlugin } from "@aws-sdk/middleware-sdk-s3";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Completes a multipart upload by assembling previously uploaded parts.</p>
 *          <p>You first initiate the multipart upload and then upload all parts using the <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_UploadPart.html">UploadPart</a>
 *          operation. After successfully uploading all relevant parts of an upload, you call this
 *          operation to complete the upload. Upon receiving this request, Amazon S3 concatenates all
 *          the parts in ascending order by part number to create a new object. In the Complete
 *          Multipart Upload request, you must provide the parts list. You must ensure that the parts
 *          list is complete. This operation concatenates the parts that you provide in the list. For
 *          each part in the list, you must provide the part number and the <code>ETag</code> value,
 *          returned after that part was uploaded.</p>
 *          <p>Processing of a Complete Multipart Upload request could take several minutes to
 *          complete. After Amazon S3 begins processing the request, it sends an HTTP response header that
 *          specifies a 200 OK response. While processing is in progress, Amazon S3 periodically sends white
 *          space characters to keep the connection from timing out. Because a request could fail after
 *          the initial 200 OK response has been sent, it is important that you check the response body
 *          to determine whether the request succeeded.</p>
 *          <p>Note that if <code>CompleteMultipartUpload</code> fails, applications should be prepared
 *          to retry the failed requests. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/ErrorBestPractices.html">Amazon S3 Error Best Practices</a>.</p>
 *          <p>For more information about multipart uploads, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/uploadobjusingmpu.html">Uploading Objects Using Multipart
 *             Upload</a>.</p>
 *          <p>For information about permissions required to use the multipart upload API, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/mpuAndPermissions.html">Multipart Upload API and
 *          Permissions</a>.</p>
 *
 *
 *          <p>
 *             <code>CompleteMultipartUpload</code> has the following special errors:</p>
 *          <ul>
 *             <li>
 *                <p>Error code: <code>EntityTooSmall</code>
 *                </p>
 *                <ul>
 *                   <li>
 *                      <p>Description: Your proposed upload is smaller than the minimum allowed object
 *                      size. Each part must be at least 5 MB in size, except the last part.</p>
 *                   </li>
 *                   <li>
 *                      <p>400 Bad Request</p>
 *                   </li>
 *                </ul>
 *             </li>
 *             <li>
 *                <p>Error code: <code>InvalidPart</code>
 *                </p>
 *                <ul>
 *                   <li>
 *                      <p>Description: One or more of the specified parts could not be found. The part
 *                      might not have been uploaded, or the specified entity tag might not have
 *                      matched the part's entity tag.</p>
 *                   </li>
 *                   <li>
 *                      <p>400 Bad Request</p>
 *                   </li>
 *                </ul>
 *             </li>
 *             <li>
 *                <p>Error code: <code>InvalidPartOrder</code>
 *                </p>
 *                <ul>
 *                   <li>
 *                      <p>Description: The list of parts was not in ascending order. The parts list
 *                      must be specified in order by part number.</p>
 *                   </li>
 *                   <li>
 *                      <p>400 Bad Request</p>
 *                   </li>
 *                </ul>
 *             </li>
 *             <li>
 *                <p>Error code: <code>NoSuchUpload</code>
 *                </p>
 *                <ul>
 *                   <li>
 *                      <p>Description: The specified multipart upload does not exist. The upload ID
 *                      might be invalid, or the multipart upload might have been aborted or
 *                      completed.</p>
 *                   </li>
 *                   <li>
 *                      <p>404 Not Found</p>
 *                   </li>
 *                </ul>
 *             </li>
 *          </ul>
 *
 *          <p>The following operations are related to <code>CompleteMultipartUpload</code>:</p>
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
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_AbortMultipartUpload.html">AbortMultipartUpload</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListParts.html">ListParts</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListMultipartUploads.html">ListMultipartUploads</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var CompleteMultipartUploadCommand = /** @class */ (function (_super) {
    __extends(CompleteMultipartUploadCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CompleteMultipartUploadCommand(input) {
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
    CompleteMultipartUploadCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getThrow200ExceptionsPlugin(configuration));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "CompleteMultipartUploadCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CompleteMultipartUploadRequest.filterSensitiveLog,
            outputFilterSensitiveLog: CompleteMultipartUploadOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CompleteMultipartUploadCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlCompleteMultipartUploadCommand(input, context);
    };
    CompleteMultipartUploadCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlCompleteMultipartUploadCommand(output, context);
    };
    return CompleteMultipartUploadCommand;
}($Command));
export { CompleteMultipartUploadCommand };
//# sourceMappingURL=CompleteMultipartUploadCommand.js.map