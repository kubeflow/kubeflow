"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadPartCopyCommand = void 0;
const models_1_1 = require("../models/models_1");
const Aws_restXml_1 = require("../protocols/Aws_restXml");
const middleware_bucket_endpoint_1 = require("@aws-sdk/middleware-bucket-endpoint");
const middleware_sdk_s3_1 = require("@aws-sdk/middleware-sdk-s3");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const middleware_ssec_1 = require("@aws-sdk/middleware-ssec");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Uploads a part by copying data from an existing object as data source. You specify the
 *          data source by adding the request header <code>x-amz-copy-source</code> in your request and
 *          a byte range by adding the request header <code>x-amz-copy-source-range</code> in your
 *          request. </p>
 *          <p>The minimum allowable part size for a multipart upload is 5 MB. For more information
 *          about multipart upload limits, go to <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/qfacts.html">Quick
 *             Facts</a> in the <i>Amazon Simple Storage Service Developer Guide</i>. </p>
 *          <note>
 *             <p>Instead of using an existing object as part data, you might use the <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_UploadPart.html">UploadPart</a>
 *             operation and provide data in your request.</p>
 *          </note>
 *
 *          <p>You must initiate a multipart upload before you can upload any part. In response to your
 *          initiate request. Amazon S3 returns a unique identifier, the upload ID, that you must include in
 *          your upload part request.</p>
 *          <p>For more information about using the <code>UploadPartCopy</code> operation, see the
 *          following:</p>
 *
 *          <ul>
 *             <li>
 *                <p>For conceptual information about multipart uploads, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/uploadobjusingmpu.html">Uploading Objects Using Multipart
 *                   Upload</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
 *             </li>
 *             <li>
 *                <p>For information about permissions required to use the multipart upload API, see
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/mpuAndPermissions.html">Multipart Upload API and
 *                   Permissions</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
 *             </li>
 *             <li>
 *                <p>For information about copying objects using a single atomic operation vs. the
 *                multipart upload, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/ObjectOperations.html">Operations on
 *                   Objects</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
 *             </li>
 *             <li>
 *                <p>For information about using server-side encryption with customer-provided
 *                encryption keys with the UploadPartCopy operation, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CopyObject.html">CopyObject</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_UploadPart.html">UploadPart</a>.</p>
 *             </li>
 *          </ul>
 *          <p>Note the following additional considerations about the request headers
 *             <code>x-amz-copy-source-if-match</code>, <code>x-amz-copy-source-if-none-match</code>,
 *             <code>x-amz-copy-source-if-unmodified-since</code>, and
 *             <code>x-amz-copy-source-if-modified-since</code>:</p>
 *          <p> </p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <b>Consideration 1</b> - If both of the
 *                   <code>x-amz-copy-source-if-match</code> and
 *                   <code>x-amz-copy-source-if-unmodified-since</code> headers are present in the
 *                request as follows:</p>
 *                <p>
 *                   <code>x-amz-copy-source-if-match</code> condition evaluates to <code>true</code>,
 *                and;</p>
 *                <p>
 *                   <code>x-amz-copy-source-if-unmodified-since</code> condition evaluates to
 *                   <code>false</code>;</p>
 *                <p>Amazon S3 returns <code>200 OK</code> and copies the data.
 *                </p>
 *
 *             </li>
 *             <li>
 *                <p>
 *                   <b>Consideration 2</b> - If both of the
 *                   <code>x-amz-copy-source-if-none-match</code> and
 *                   <code>x-amz-copy-source-if-modified-since</code> headers are present in the
 *                request as follows:</p>
 *                <p>
 *                   <code>x-amz-copy-source-if-none-match</code> condition evaluates to
 *                   <code>false</code>, and;</p>
 *                <p>
 *                   <code>x-amz-copy-source-if-modified-since</code> condition evaluates to
 *                   <code>true</code>;</p>
 *                <p>Amazon S3 returns <code>412 Precondition Failed</code> response code.
 *                </p>
 *             </li>
 *          </ul>
 *          <p>
 *             <b>Versioning</b>
 *          </p>
 *          <p>If your bucket has versioning enabled, you could have multiple versions of the same
 *          object. By default, <code>x-amz-copy-source</code> identifies the current version of the
 *          object to copy. If the current version is a delete marker and you don't specify a versionId
 *          in the <code>x-amz-copy-source</code>, Amazon S3 returns a 404 error, because the object does
 *          not exist. If you specify versionId in the <code>x-amz-copy-source</code> and the versionId
 *          is a delete marker, Amazon S3 returns an HTTP 400 error, because you are not allowed to specify
 *          a delete marker as a version for the <code>x-amz-copy-source</code>. </p>
 *          <p>You can optionally specify a specific version of the source object to copy by adding the
 *             <code>versionId</code> subresource as shown in the following example:</p>
 *          <p>
 *             <code>x-amz-copy-source: /bucket/object?versionId=version id</code>
 *          </p>
 *
 *          <p class="title">
 *             <b>Special Errors</b>
 *          </p>
 *          <ul>
 *             <li>
 *                <ul>
 *                   <li>
 *                      <p>
 *                         <i>Code: NoSuchUpload</i>
 *                      </p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <i>Cause: The specified multipart upload does not exist. The upload
 *                         ID might be invalid, or the multipart upload might have been aborted or
 *                         completed.</i>
 *                      </p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <i>HTTP Status Code: 404 Not Found</i>
 *                      </p>
 *                   </li>
 *                </ul>
 *             </li>
 *             <li>
 *                <ul>
 *                   <li>
 *                      <p>
 *                         <i>Code: InvalidRequest</i>
 *                      </p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <i>Cause: The specified copy source is not supported as a byte-range
 *                         copy source.</i>
 *                      </p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <i>HTTP Status Code: 400 Bad Request</i>
 *                      </p>
 *                   </li>
 *                </ul>
 *             </li>
 *          </ul>
 *
 *
 *
 *
 *
 *
 *          <p class="title">
 *             <b>Related Resources</b>
 *          </p>
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
class UploadPartCopyCommand extends smithy_client_1.Command {
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
        this.middlewareStack.use(middleware_sdk_s3_1.getThrow200ExceptionsPlugin(configuration));
        this.middlewareStack.use(middleware_ssec_1.getSsecPlugin(configuration));
        this.middlewareStack.use(middleware_bucket_endpoint_1.getBucketEndpointPlugin(configuration));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "S3Client";
        const commandName = "UploadPartCopyCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_1_1.UploadPartCopyRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_1_1.UploadPartCopyOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restXml_1.serializeAws_restXmlUploadPartCopyCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restXml_1.deserializeAws_restXmlUploadPartCopyCommand(output, context);
    }
}
exports.UploadPartCopyCommand = UploadPartCopyCommand;
//# sourceMappingURL=UploadPartCopyCommand.js.map