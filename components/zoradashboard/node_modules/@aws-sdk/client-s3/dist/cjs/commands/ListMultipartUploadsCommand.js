"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListMultipartUploadsCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restXml_1 = require("../protocols/Aws_restXml");
const middleware_bucket_endpoint_1 = require("@aws-sdk/middleware-bucket-endpoint");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
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
class ListMultipartUploadsCommand extends smithy_client_1.Command {
    // Start section: command_properties
    // End section: command_properties
    constructor(input) {
        // Start section: command_constructor
        super();
        this.input = input;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use(middleware_serde_1.getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(middleware_bucket_endpoint_1.getBucketEndpointPlugin(configuration));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "S3Client";
        const commandName = "ListMultipartUploadsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListMultipartUploadsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListMultipartUploadsOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restXml_1.serializeAws_restXmlListMultipartUploadsCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restXml_1.deserializeAws_restXmlListMultipartUploadsCommand(output, context);
    }
}
exports.ListMultipartUploadsCommand = ListMultipartUploadsCommand;
//# sourceMappingURL=ListMultipartUploadsCommand.js.map