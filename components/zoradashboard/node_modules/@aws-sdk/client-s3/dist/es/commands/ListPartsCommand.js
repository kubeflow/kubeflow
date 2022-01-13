import { __extends } from "tslib";
import { ListPartsOutput, ListPartsRequest } from "../models/models_0";
import { deserializeAws_restXmlListPartsCommand, serializeAws_restXmlListPartsCommand } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists the parts that have been uploaded for a specific multipart upload. This operation
 *          must include the upload ID, which you obtain by sending the initiate multipart upload
 *          request (see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateMultipartUpload.html">CreateMultipartUpload</a>).
 *          This request returns a maximum of 1,000 uploaded parts. The default number of parts
 *          returned is 1,000 parts. You can restrict the number of parts returned by specifying the
 *             <code>max-parts</code> request parameter. If your multipart upload consists of more than
 *          1,000 parts, the response returns an <code>IsTruncated</code> field with the value of true,
 *          and a <code>NextPartNumberMarker</code> element. In subsequent <code>ListParts</code>
 *          requests you can include the part-number-marker query string parameter and set its value to
 *          the <code>NextPartNumberMarker</code> field value from the previous response.</p>
 *
 *          <p>For more information on multipart uploads, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/uploadobjusingmpu.html">Uploading Objects Using Multipart
 *             Upload</a>.</p>
 *
 *          <p>For information on permissions required to use the multipart upload API, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/mpuAndPermissions.html">Multipart Upload API and
 *          Permissions</a>.</p>
 *
 *          <p>The following operations are related to <code>ListParts</code>:</p>
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
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_AbortMultipartUpload.html">AbortMultipartUpload</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListMultipartUploads.html">ListMultipartUploads</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var ListPartsCommand = /** @class */ (function (_super) {
    __extends(ListPartsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListPartsCommand(input) {
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
    ListPartsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "ListPartsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListPartsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListPartsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListPartsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlListPartsCommand(input, context);
    };
    ListPartsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlListPartsCommand(output, context);
    };
    return ListPartsCommand;
}($Command));
export { ListPartsCommand };
//# sourceMappingURL=ListPartsCommand.js.map