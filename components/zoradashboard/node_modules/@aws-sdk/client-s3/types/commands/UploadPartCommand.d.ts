/// <reference types="node" />
import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";
import { UploadPartOutput, UploadPartRequest } from "../models/models_1";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type UploadPartCommandInput = Omit<UploadPartRequest, "Body"> & {
    Body?: UploadPartRequest["Body"] | string | Uint8Array | Buffer;
};
export declare type UploadPartCommandOutput = UploadPartOutput & __MetadataBearer;
/**
 * <p>Uploads a part in a multipart upload.</p>
 *          <note>
 *             <p>In this operation, you provide part data in your request. However, you have an option
 *             to specify your existing Amazon S3 object as a data source for the part you are uploading. To
 *             upload a part from an existing object, you use the <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_UploadPartCopy.html">UploadPartCopy</a> operation.
 *          </p>
 *          </note>
 *
 *          <p>You must initiate a multipart upload (see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateMultipartUpload.html">CreateMultipartUpload</a>)
 *          before you can upload any part. In response to your initiate request, Amazon S3 returns an
 *          upload ID, a unique identifier, that you must include in your upload part request.</p>
 *          <p>Part numbers can be any number from 1 to 10,000, inclusive. A part number uniquely
 *          identifies a part and also defines its position within the object being created. If you
 *          upload a new part using the same part number that was used with a previous part, the
 *          previously uploaded part is overwritten. Each part must be at least 5 MB in size, except
 *          the last part. There is no size limit on the last part of your multipart upload.</p>
 *          <p>To ensure that data is not corrupted when traversing the network, specify the
 *             <code>Content-MD5</code> header in the upload part request. Amazon S3 checks the part data
 *          against the provided MD5 value. If they do not match, Amazon S3 returns an error. </p>
 *
 *          <p>If the upload request is signed with Signature Version 4, then AWS S3 uses the
 *             <code>x-amz-content-sha256</code> header as a checksum instead of
 *             <code>Content-MD5</code>. For more information see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-auth-using-authorization-header.html">Authenticating Requests: Using the Authorization Header (AWS Signature Version
 *             4)</a>. </p>
 *
 *
 *
 *          <p>
 *             <b>Note:</b> After you initiate multipart upload and upload
 *          one or more parts, you must either complete or abort multipart upload in order to stop
 *          getting charged for storage of the uploaded parts. Only after you either complete or abort
 *          multipart upload, Amazon S3 frees up the parts storage and stops charging you for the parts
 *          storage.</p>
 *
 *          <p>For more information on multipart uploads, go to <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/mpuoverview.html">Multipart Upload Overview</a> in the
 *             <i>Amazon Simple Storage Service Developer Guide </i>.</p>
 *          <p>For information on the permissions required to use the multipart upload API, go to
 *             <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/mpuAndPermissions.html">Multipart Upload API and
 *             Permissions</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
 *
 *          <p>You can optionally request server-side encryption where Amazon S3 encrypts your data as it
 *          writes it to disks in its data centers and decrypts it for you when you access it. You have
 *          the option of providing your own encryption key, or you can use the AWS managed encryption
 *          keys. If you choose to provide your own encryption key, the request headers you provide in
 *          the request must match the headers you used in the request to initiate the upload by using
 *             <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateMultipartUpload.html">CreateMultipartUpload</a>. For more information, go to <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html">Using Server-Side Encryption</a> in
 *          the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
 *
 *          <p>Server-side encryption is supported by the S3 Multipart Upload actions. Unless you are
 *          using a customer-provided encryption key, you don't need to specify the encryption
 *          parameters in each UploadPart request. Instead, you only need to specify the server-side
 *          encryption parameters in the initial Initiate Multipart request. For more information, see
 *             <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateMultipartUpload.html">CreateMultipartUpload</a>.</p>
 *
 *          <p>If you requested server-side encryption using a customer-provided encryption key in your
 *          initiate multipart upload request, you must provide identical encryption information in
 *          each part upload using the following headers.</p>
 *
 *
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
 *                         <i> HTTP Status Code: 404 Not Found </i>
 *                      </p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <i>SOAP Fault Code Prefix: Client</i>
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
export declare class UploadPartCommand extends $Command<UploadPartCommandInput, UploadPartCommandOutput, S3ClientResolvedConfig> {
    readonly input: UploadPartCommandInput;
    constructor(input: UploadPartCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: S3ClientResolvedConfig, options?: __HttpHandlerOptions): Handler<UploadPartCommandInput, UploadPartCommandOutput>;
    private serialize;
    private deserialize;
}
