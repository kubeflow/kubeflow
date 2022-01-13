"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadObjectCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restXml_1 = require("../protocols/Aws_restXml");
const middleware_bucket_endpoint_1 = require("@aws-sdk/middleware-bucket-endpoint");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const middleware_ssec_1 = require("@aws-sdk/middleware-ssec");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>The HEAD operation retrieves metadata from an object without returning the object
 *          itself. This operation is useful if you're only interested in an object's metadata. To use
 *          HEAD, you must have READ access to the object.</p>
 *
 *          <p>A <code>HEAD</code> request has the same options as a <code>GET</code> operation on an
 *          object. The response is identical to the <code>GET</code> response except that there is no
 *          response body.</p>
 *
 *          <p>If you encrypt an object by using server-side encryption with customer-provided
 *          encryption keys (SSE-C) when you store the object in Amazon S3, then when you retrieve the
 *          metadata from the object, you must use the following headers:</p>
 *          <ul>
 *             <li>
 *                <p>x-amz-server-side-encryption-customer-algorithm</p>
 *             </li>
 *             <li>
 *                <p>x-amz-server-side-encryption-customer-key</p>
 *             </li>
 *             <li>
 *                <p>x-amz-server-side-encryption-customer-key-MD5</p>
 *             </li>
 *          </ul>
 *          <p>For more information about SSE-C, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/ServerSideEncryptionCustomerKeys.html">Server-Side Encryption (Using
 *             Customer-Provided Encryption Keys)</a>.</p>
 *          <note>
 *             <p>Encryption request headers, like <code>x-amz-server-side-encryption</code>, should
 *             not be sent for GET requests if your object uses server-side encryption with CMKs stored
 *             in AWS KMS (SSE-KMS) or server-side encryption with Amazon S3–managed encryption keys
 *             (SSE-S3). If your object does use these types of keys, you’ll get an HTTP 400 BadRequest
 *             error.</p>
 *          </note>
 *
 *
 *
 *
 *
 *
 *
 *          <p>Request headers are limited to 8 KB in size. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/RESTCommonRequestHeaders.html">Common Request
 *             Headers</a>.</p>
 *          <p>Consider the following when using request headers:</p>
 *          <ul>
 *             <li>
 *                <p> Consideration 1 – If both of the <code>If-Match</code> and
 *                   <code>If-Unmodified-Since</code> headers are present in the request as
 *                follows:</p>
 *                <ul>
 *                   <li>
 *                      <p>
 *                         <code>If-Match</code> condition evaluates to <code>true</code>, and;</p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <code>If-Unmodified-Since</code> condition evaluates to
 *                      <code>false</code>;</p>
 *                   </li>
 *                </ul>
 *                <p>Then Amazon S3 returns <code>200 OK</code> and the data requested.</p>
 *             </li>
 *             <li>
 *                <p> Consideration 2 – If both of the <code>If-None-Match</code> and
 *                   <code>If-Modified-Since</code> headers are present in the request as
 *                follows:</p>
 *                <ul>
 *                   <li>
 *                      <p>
 *                         <code>If-None-Match</code> condition evaluates to <code>false</code>,
 *                      and;</p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <code>If-Modified-Since</code> condition evaluates to
 *                      <code>true</code>;</p>
 *                   </li>
 *                </ul>
 *                <p>Then Amazon S3 returns the <code>304 Not Modified</code> response code.</p>
 *             </li>
 *          </ul>
 *
 *          <p>For more information about conditional requests, see <a href="https://tools.ietf.org/html/rfc7232">RFC 7232</a>.</p>
 *
 *          <p>
 *             <b>Permissions</b>
 *          </p>
 *          <p>You need the <code>s3:GetObject</code> permission for this operation. For more
 *          information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html">Specifying Permissions
 *             in a Policy</a>. If the object you request does not exist, the error Amazon S3 returns
 *          depends on whether you also have the s3:ListBucket permission.</p>
 *          <ul>
 *             <li>
 *                <p>If you have the <code>s3:ListBucket</code> permission on the bucket, Amazon S3 returns
 *                an HTTP status code 404 ("no such key") error.</p>
 *             </li>
 *             <li>
 *                <p>If you don’t have the <code>s3:ListBucket</code> permission, Amazon S3 returns an HTTP
 *                status code 403 ("access denied") error.</p>
 *             </li>
 *          </ul>
 *
 *          <p>The following operation is related to <code>HeadObject</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>
 *                </p>
 *             </li>
 *          </ul>
 */
class HeadObjectCommand extends smithy_client_1.Command {
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
        this.middlewareStack.use(middleware_ssec_1.getSsecPlugin(configuration));
        this.middlewareStack.use(middleware_bucket_endpoint_1.getBucketEndpointPlugin(configuration));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "S3Client";
        const commandName = "HeadObjectCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.HeadObjectRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.HeadObjectOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restXml_1.serializeAws_restXmlHeadObjectCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restXml_1.deserializeAws_restXmlHeadObjectCommand(output, context);
    }
}
exports.HeadObjectCommand = HeadObjectCommand;
//# sourceMappingURL=HeadObjectCommand.js.map