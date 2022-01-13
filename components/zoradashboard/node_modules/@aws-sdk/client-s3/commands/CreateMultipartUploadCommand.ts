import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";
import { CreateMultipartUploadOutput, CreateMultipartUploadRequest } from "../models/models_0";
import {
  deserializeAws_restXmlCreateMultipartUploadCommand,
  serializeAws_restXmlCreateMultipartUploadCommand,
} from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { getSsecPlugin } from "@aws-sdk/middleware-ssec";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  MiddlewareStack,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

export type CreateMultipartUploadCommandInput = CreateMultipartUploadRequest;
export type CreateMultipartUploadCommandOutput = CreateMultipartUploadOutput & __MetadataBearer;

/**
 * <p>This operation initiates a multipart upload and returns an upload ID. This upload ID is
 *          used to associate all of the parts in the specific multipart upload. You specify this
 *          upload ID in each of your subsequent upload part requests (see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_UploadPart.html">UploadPart</a>). You also include this
 *          upload ID in the final request to either complete or abort the multipart upload
 *          request.</p>
 *
 *          <p>For more information about multipart uploads, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/mpuoverview.html">Multipart Upload Overview</a>.</p>
 *
 *          <p>If you have configured a lifecycle rule to abort incomplete multipart uploads, the
 *          upload must complete within the number of days specified in the bucket lifecycle
 *          configuration. Otherwise, the incomplete multipart upload becomes eligible for an abort
 *          operation and Amazon S3 aborts the multipart upload. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/mpuoverview.html#mpu-abort-incomplete-mpu-lifecycle-config">Aborting
 *             Incomplete Multipart Uploads Using a Bucket Lifecycle Policy</a>.</p>
 *
 *          <p>For information about the permissions required to use the multipart upload API, see
 *             <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/mpuAndPermissions.html">Multipart Upload API and
 *             Permissions</a>.</p>
 *
 *          <p>For request signing, multipart upload is just a series of regular requests. You initiate
 *          a multipart upload, send one or more requests to upload parts, and then complete the
 *          multipart upload process. You sign each request individually. There is nothing special
 *          about signing multipart upload requests. For more information about signing, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-authenticating-requests.html">Authenticating
 *             Requests (AWS Signature Version 4)</a>.</p>
 *
 *          <note>
 *             <p> After you initiate a multipart upload and upload one or more parts, to stop being
 *             charged for storing the uploaded parts, you must either complete or abort the multipart
 *             upload. Amazon S3 frees up the space used to store the parts and stop charging you for
 *             storing them only after you either complete or abort a multipart upload. </p>
 *          </note>
 *
 *          <p>You can optionally request server-side encryption. For server-side encryption, Amazon S3
 *          encrypts your data as it writes it to disks in its data centers and decrypts it when you
 *          access it. You can provide your own encryption key, or use AWS Key Management Service (AWS
 *          KMS) customer master keys (CMKs) or Amazon S3-managed encryption keys. If you choose to provide
 *          your own encryption key, the request headers you provide in <a href="AmazonS3/latest/API/API_UploadPart.html">UploadPart</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_UploadPartCopy.html">UploadPartCopy</a> requests must match the headers you used in the request to
 *          initiate the upload by using <code>CreateMultipartUpload</code>. </p>
 *          <p>To perform a multipart upload with encryption using an AWS KMS CMK, the requester must
 *          have permission to the <code>kms:Encrypt</code>, <code>kms:Decrypt</code>,
 *             <code>kms:ReEncrypt*</code>, <code>kms:GenerateDataKey*</code>, and
 *             <code>kms:DescribeKey</code> actions on the key. These permissions are required because
 *          Amazon S3 must decrypt and read data from the encrypted file parts before it completes the
 *          multipart upload.</p>
 *
 *          <p>If your AWS Identity and Access Management (IAM) user or role is in the same AWS account
 *          as the AWS KMS CMK, then you must have these permissions on the key policy. If your IAM
 *          user or role belongs to a different account than the key, then you must have the
 *          permissions on both the key policy and your IAM user or role.</p>
 *
 *
 *          <p> For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/serv-side-encryption.html">Protecting
 *             Data Using Server-Side Encryption</a>.</p>
 *
 *          <dl>
 *             <dt>Access Permissions</dt>
 *             <dd>
 *                <p>When copying an object, you can optionally specify the accounts or groups that
 *                   should be granted specific permissions on the new object. There are two ways to
 *                   grant the permissions using the request headers:</p>
 *                <ul>
 *                   <li>
 *                      <p>Specify a canned ACL with the <code>x-amz-acl</code> request header. For
 *                         more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#CannedACL">Canned ACL</a>.</p>
 *                   </li>
 *                   <li>
 *                      <p>Specify access permissions explicitly with the
 *                            <code>x-amz-grant-read</code>, <code>x-amz-grant-read-acp</code>,
 *                            <code>x-amz-grant-write-acp</code>, and
 *                            <code>x-amz-grant-full-control</code> headers. These parameters map to
 *                         the set of permissions that Amazon S3 supports in an ACL. For more information,
 *                         see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html">Access Control List (ACL)
 *                            Overview</a>.</p>
 *                   </li>
 *                </ul>
 *                <p>You can use either a canned ACL or specify access permissions explicitly. You
 *                   cannot do both.</p>
 *             </dd>
 *             <dt>Server-Side- Encryption-Specific Request Headers</dt>
 *             <dd>
 *                <p>You can optionally tell Amazon S3 to encrypt data at rest using server-side
 *                   encryption. Server-side encryption is for data encryption at rest. Amazon S3 encrypts
 *                   your data as it writes it to disks in its data centers and decrypts it when you
 *                   access it. The option you use depends on whether you want to use AWS managed
 *                   encryption keys or provide your own encryption key. </p>
 *                <ul>
 *                   <li>
 *                      <p>Use encryption keys managed by Amazon S3 or customer master keys (CMKs) stored
 *                         in AWS Key Management Service (AWS KMS) – If you want AWS to manage the keys
 *                         used to encrypt data, specify the following headers in the request.</p>
 *                      <ul>
 *                         <li>
 *                            <p>x-amz-server-side-encryption</p>
 *                         </li>
 *                         <li>
 *                            <p>x-amz-server-side-encryption-aws-kms-key-id</p>
 *                         </li>
 *                         <li>
 *                            <p>x-amz-server-side-encryption-context</p>
 *                         </li>
 *                      </ul>
 *                      <note>
 *                         <p>If you specify <code>x-amz-server-side-encryption:aws:kms</code>, but
 *                            don't provide <code>x-amz-server-side-encryption-aws-kms-key-id</code>,
 *                            Amazon S3 uses the AWS managed CMK in AWS KMS to protect the data.</p>
 *                      </note>
 *                      <important>
 *                         <p>All GET and PUT requests for an object protected by AWS KMS fail if
 *                            you don't make them with SSL or by using SigV4.</p>
 *                      </important>
 *                      <p>For more information about server-side encryption with CMKs stored in AWS
 *                         KMS (SSE-KMS), see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html">Protecting Data Using Server-Side Encryption with CMKs stored in AWS
 *                            KMS</a>.</p>
 *                   </li>
 *                   <li>
 *                      <p>Use customer-provided encryption keys – If you want to manage your own
 *                         encryption keys, provide all the following headers in the request.</p>
 *                      <ul>
 *                         <li>
 *                            <p>x-amz-server-side-encryption-customer-algorithm</p>
 *                         </li>
 *                         <li>
 *                            <p>x-amz-server-side-encryption-customer-key</p>
 *                         </li>
 *                         <li>
 *                            <p>x-amz-server-side-encryption-customer-key-MD5</p>
 *                         </li>
 *                      </ul>
 *                      <p>For more information about server-side encryption with CMKs stored in AWS
 *                         KMS (SSE-KMS), see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html">Protecting Data Using Server-Side Encryption with CMKs stored in AWS
 *                            KMS</a>.</p>
 *                   </li>
 *                </ul>
 *             </dd>
 *             <dt>Access-Control-List (ACL)-Specific Request Headers</dt>
 *             <dd>
 *                <p>You also can use the following access control–related headers with this
 *                   operation. By default, all objects are private. Only the owner has full access
 *                   control. When adding a new object, you can grant permissions to individual AWS
 *                   accounts or to predefined groups defined by Amazon S3. These permissions are then added
 *                   to the access control list (ACL) on the object. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/S3_ACLs_UsingACLs.html">Using ACLs</a>. With this
 *                   operation, you can grant access permissions using one of the following two
 *                   methods:</p>
 *                <ul>
 *                   <li>
 *                      <p>Specify a canned ACL (<code>x-amz-acl</code>) — Amazon S3 supports a set of
 *                         predefined ACLs, known as <i>canned ACLs</i>. Each canned ACL
 *                         has a predefined set of grantees and permissions. For more information, see
 *                            <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#CannedACL">Canned
 *                         ACL</a>.</p>
 *                   </li>
 *                   <li>
 *                      <p>Specify access permissions explicitly — To explicitly grant access
 *                         permissions to specific AWS accounts or groups, use the following headers.
 *                         Each header maps to specific permissions that Amazon S3 supports in an ACL. For
 *                         more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html">Access
 *                            Control List (ACL) Overview</a>. In the header, you specify a list of
 *                         grantees who get the specific permission. To grant permissions explicitly,
 *                         use:</p>
 *                      <ul>
 *                         <li>
 *                            <p>x-amz-grant-read</p>
 *                         </li>
 *                         <li>
 *                            <p>x-amz-grant-write</p>
 *                         </li>
 *                         <li>
 *                            <p>x-amz-grant-read-acp</p>
 *                         </li>
 *                         <li>
 *                            <p>x-amz-grant-write-acp</p>
 *                         </li>
 *                         <li>
 *                            <p>x-amz-grant-full-control</p>
 *                         </li>
 *                      </ul>
 *                      <p>You specify each grantee as a type=value pair, where the type is one of
 *                         the following:</p>
 *                      <ul>
 *                         <li>
 *                            <p>
 *                               <code>id</code> – if the value specified is the canonical user ID
 *                               of an AWS account</p>
 *                         </li>
 *                         <li>
 *                            <p>
 *                               <code>uri</code> – if you are granting permissions to a predefined
 *                               group</p>
 *                         </li>
 *                         <li>
 *                            <p>
 *                               <code>emailAddress</code> – if the value specified is the email
 *                               address of an AWS account</p>
 *                            <note>
 *                               <p>Using email addresses to specify a grantee is only supported in the following AWS Regions: </p>
 *                               <ul>
 *                                  <li>
 *                                     <p>US East (N. Virginia)</p>
 *                                  </li>
 *                                  <li>
 *                                     <p>US West (N. California)</p>
 *                                  </li>
 *                                  <li>
 *                                     <p> US West (Oregon)</p>
 *                                  </li>
 *                                  <li>
 *                                     <p> Asia Pacific (Singapore)</p>
 *                                  </li>
 *                                  <li>
 *                                     <p>Asia Pacific (Sydney)</p>
 *                                  </li>
 *                                  <li>
 *                                     <p>Asia Pacific (Tokyo)</p>
 *                                  </li>
 *                                  <li>
 *                                     <p>Europe (Ireland)</p>
 *                                  </li>
 *                                  <li>
 *                                     <p>South America (São Paulo)</p>
 *                                  </li>
 *                               </ul>
 *                               <p>For a list of all the Amazon S3 supported Regions and endpoints, see <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region">Regions and Endpoints</a> in the AWS General Reference.</p>
 *                            </note>
 *                         </li>
 *                      </ul>
 *                      <p>For example, the following <code>x-amz-grant-read</code> header grants the AWS accounts identified by account IDs permissions to read object data and its metadata:</p>
 *                      <p>
 *                         <code>x-amz-grant-read: id="11112222333", id="444455556666" </code>
 *                      </p>
 *                   </li>
 *                </ul>
 *
 *             </dd>
 *          </dl>
 *
 *          <p>The following operations are related to <code>CreateMultipartUpload</code>:</p>
 *          <ul>
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
export class CreateMultipartUploadCommand extends $Command<
  CreateMultipartUploadCommandInput,
  CreateMultipartUploadCommandOutput,
  S3ClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CreateMultipartUploadCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: S3ClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<CreateMultipartUploadCommandInput, CreateMultipartUploadCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    this.middlewareStack.use(getSsecPlugin(configuration));
    this.middlewareStack.use(getBucketEndpointPlugin(configuration));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "S3Client";
    const commandName = "CreateMultipartUploadCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: CreateMultipartUploadRequest.filterSensitiveLog,
      outputFilterSensitiveLog: CreateMultipartUploadOutput.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: CreateMultipartUploadCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_restXmlCreateMultipartUploadCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<CreateMultipartUploadCommandOutput> {
    return deserializeAws_restXmlCreateMultipartUploadCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
