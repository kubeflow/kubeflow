import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";
import { HeadObjectOutput, HeadObjectRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type HeadObjectCommandInput = HeadObjectRequest;
export declare type HeadObjectCommandOutput = HeadObjectOutput & __MetadataBearer;
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
export declare class HeadObjectCommand extends $Command<HeadObjectCommandInput, HeadObjectCommandOutput, S3ClientResolvedConfig> {
    readonly input: HeadObjectCommandInput;
    constructor(input: HeadObjectCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: S3ClientResolvedConfig, options?: __HttpHandlerOptions): Handler<HeadObjectCommandInput, HeadObjectCommandOutput>;
    private serialize;
    private deserialize;
}
