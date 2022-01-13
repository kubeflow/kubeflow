import { S3Client } from "./S3Client";
import {
  AbortMultipartUploadCommand,
  AbortMultipartUploadCommandInput,
  AbortMultipartUploadCommandOutput,
} from "./commands/AbortMultipartUploadCommand";
import {
  CompleteMultipartUploadCommand,
  CompleteMultipartUploadCommandInput,
  CompleteMultipartUploadCommandOutput,
} from "./commands/CompleteMultipartUploadCommand";
import { CopyObjectCommand, CopyObjectCommandInput, CopyObjectCommandOutput } from "./commands/CopyObjectCommand";
import {
  CreateBucketCommand,
  CreateBucketCommandInput,
  CreateBucketCommandOutput,
} from "./commands/CreateBucketCommand";
import {
  CreateMultipartUploadCommand,
  CreateMultipartUploadCommandInput,
  CreateMultipartUploadCommandOutput,
} from "./commands/CreateMultipartUploadCommand";
import {
  DeleteBucketAnalyticsConfigurationCommand,
  DeleteBucketAnalyticsConfigurationCommandInput,
  DeleteBucketAnalyticsConfigurationCommandOutput,
} from "./commands/DeleteBucketAnalyticsConfigurationCommand";
import {
  DeleteBucketCommand,
  DeleteBucketCommandInput,
  DeleteBucketCommandOutput,
} from "./commands/DeleteBucketCommand";
import {
  DeleteBucketCorsCommand,
  DeleteBucketCorsCommandInput,
  DeleteBucketCorsCommandOutput,
} from "./commands/DeleteBucketCorsCommand";
import {
  DeleteBucketEncryptionCommand,
  DeleteBucketEncryptionCommandInput,
  DeleteBucketEncryptionCommandOutput,
} from "./commands/DeleteBucketEncryptionCommand";
import {
  DeleteBucketIntelligentTieringConfigurationCommand,
  DeleteBucketIntelligentTieringConfigurationCommandInput,
  DeleteBucketIntelligentTieringConfigurationCommandOutput,
} from "./commands/DeleteBucketIntelligentTieringConfigurationCommand";
import {
  DeleteBucketInventoryConfigurationCommand,
  DeleteBucketInventoryConfigurationCommandInput,
  DeleteBucketInventoryConfigurationCommandOutput,
} from "./commands/DeleteBucketInventoryConfigurationCommand";
import {
  DeleteBucketLifecycleCommand,
  DeleteBucketLifecycleCommandInput,
  DeleteBucketLifecycleCommandOutput,
} from "./commands/DeleteBucketLifecycleCommand";
import {
  DeleteBucketMetricsConfigurationCommand,
  DeleteBucketMetricsConfigurationCommandInput,
  DeleteBucketMetricsConfigurationCommandOutput,
} from "./commands/DeleteBucketMetricsConfigurationCommand";
import {
  DeleteBucketOwnershipControlsCommand,
  DeleteBucketOwnershipControlsCommandInput,
  DeleteBucketOwnershipControlsCommandOutput,
} from "./commands/DeleteBucketOwnershipControlsCommand";
import {
  DeleteBucketPolicyCommand,
  DeleteBucketPolicyCommandInput,
  DeleteBucketPolicyCommandOutput,
} from "./commands/DeleteBucketPolicyCommand";
import {
  DeleteBucketReplicationCommand,
  DeleteBucketReplicationCommandInput,
  DeleteBucketReplicationCommandOutput,
} from "./commands/DeleteBucketReplicationCommand";
import {
  DeleteBucketTaggingCommand,
  DeleteBucketTaggingCommandInput,
  DeleteBucketTaggingCommandOutput,
} from "./commands/DeleteBucketTaggingCommand";
import {
  DeleteBucketWebsiteCommand,
  DeleteBucketWebsiteCommandInput,
  DeleteBucketWebsiteCommandOutput,
} from "./commands/DeleteBucketWebsiteCommand";
import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  DeleteObjectCommandOutput,
} from "./commands/DeleteObjectCommand";
import {
  DeleteObjectTaggingCommand,
  DeleteObjectTaggingCommandInput,
  DeleteObjectTaggingCommandOutput,
} from "./commands/DeleteObjectTaggingCommand";
import {
  DeleteObjectsCommand,
  DeleteObjectsCommandInput,
  DeleteObjectsCommandOutput,
} from "./commands/DeleteObjectsCommand";
import {
  DeletePublicAccessBlockCommand,
  DeletePublicAccessBlockCommandInput,
  DeletePublicAccessBlockCommandOutput,
} from "./commands/DeletePublicAccessBlockCommand";
import {
  GetBucketAccelerateConfigurationCommand,
  GetBucketAccelerateConfigurationCommandInput,
  GetBucketAccelerateConfigurationCommandOutput,
} from "./commands/GetBucketAccelerateConfigurationCommand";
import {
  GetBucketAclCommand,
  GetBucketAclCommandInput,
  GetBucketAclCommandOutput,
} from "./commands/GetBucketAclCommand";
import {
  GetBucketAnalyticsConfigurationCommand,
  GetBucketAnalyticsConfigurationCommandInput,
  GetBucketAnalyticsConfigurationCommandOutput,
} from "./commands/GetBucketAnalyticsConfigurationCommand";
import {
  GetBucketCorsCommand,
  GetBucketCorsCommandInput,
  GetBucketCorsCommandOutput,
} from "./commands/GetBucketCorsCommand";
import {
  GetBucketEncryptionCommand,
  GetBucketEncryptionCommandInput,
  GetBucketEncryptionCommandOutput,
} from "./commands/GetBucketEncryptionCommand";
import {
  GetBucketIntelligentTieringConfigurationCommand,
  GetBucketIntelligentTieringConfigurationCommandInput,
  GetBucketIntelligentTieringConfigurationCommandOutput,
} from "./commands/GetBucketIntelligentTieringConfigurationCommand";
import {
  GetBucketInventoryConfigurationCommand,
  GetBucketInventoryConfigurationCommandInput,
  GetBucketInventoryConfigurationCommandOutput,
} from "./commands/GetBucketInventoryConfigurationCommand";
import {
  GetBucketLifecycleConfigurationCommand,
  GetBucketLifecycleConfigurationCommandInput,
  GetBucketLifecycleConfigurationCommandOutput,
} from "./commands/GetBucketLifecycleConfigurationCommand";
import {
  GetBucketLocationCommand,
  GetBucketLocationCommandInput,
  GetBucketLocationCommandOutput,
} from "./commands/GetBucketLocationCommand";
import {
  GetBucketLoggingCommand,
  GetBucketLoggingCommandInput,
  GetBucketLoggingCommandOutput,
} from "./commands/GetBucketLoggingCommand";
import {
  GetBucketMetricsConfigurationCommand,
  GetBucketMetricsConfigurationCommandInput,
  GetBucketMetricsConfigurationCommandOutput,
} from "./commands/GetBucketMetricsConfigurationCommand";
import {
  GetBucketNotificationConfigurationCommand,
  GetBucketNotificationConfigurationCommandInput,
  GetBucketNotificationConfigurationCommandOutput,
} from "./commands/GetBucketNotificationConfigurationCommand";
import {
  GetBucketOwnershipControlsCommand,
  GetBucketOwnershipControlsCommandInput,
  GetBucketOwnershipControlsCommandOutput,
} from "./commands/GetBucketOwnershipControlsCommand";
import {
  GetBucketPolicyCommand,
  GetBucketPolicyCommandInput,
  GetBucketPolicyCommandOutput,
} from "./commands/GetBucketPolicyCommand";
import {
  GetBucketPolicyStatusCommand,
  GetBucketPolicyStatusCommandInput,
  GetBucketPolicyStatusCommandOutput,
} from "./commands/GetBucketPolicyStatusCommand";
import {
  GetBucketReplicationCommand,
  GetBucketReplicationCommandInput,
  GetBucketReplicationCommandOutput,
} from "./commands/GetBucketReplicationCommand";
import {
  GetBucketRequestPaymentCommand,
  GetBucketRequestPaymentCommandInput,
  GetBucketRequestPaymentCommandOutput,
} from "./commands/GetBucketRequestPaymentCommand";
import {
  GetBucketTaggingCommand,
  GetBucketTaggingCommandInput,
  GetBucketTaggingCommandOutput,
} from "./commands/GetBucketTaggingCommand";
import {
  GetBucketVersioningCommand,
  GetBucketVersioningCommandInput,
  GetBucketVersioningCommandOutput,
} from "./commands/GetBucketVersioningCommand";
import {
  GetBucketWebsiteCommand,
  GetBucketWebsiteCommandInput,
  GetBucketWebsiteCommandOutput,
} from "./commands/GetBucketWebsiteCommand";
import {
  GetObjectAclCommand,
  GetObjectAclCommandInput,
  GetObjectAclCommandOutput,
} from "./commands/GetObjectAclCommand";
import { GetObjectCommand, GetObjectCommandInput, GetObjectCommandOutput } from "./commands/GetObjectCommand";
import {
  GetObjectLegalHoldCommand,
  GetObjectLegalHoldCommandInput,
  GetObjectLegalHoldCommandOutput,
} from "./commands/GetObjectLegalHoldCommand";
import {
  GetObjectLockConfigurationCommand,
  GetObjectLockConfigurationCommandInput,
  GetObjectLockConfigurationCommandOutput,
} from "./commands/GetObjectLockConfigurationCommand";
import {
  GetObjectRetentionCommand,
  GetObjectRetentionCommandInput,
  GetObjectRetentionCommandOutput,
} from "./commands/GetObjectRetentionCommand";
import {
  GetObjectTaggingCommand,
  GetObjectTaggingCommandInput,
  GetObjectTaggingCommandOutput,
} from "./commands/GetObjectTaggingCommand";
import {
  GetObjectTorrentCommand,
  GetObjectTorrentCommandInput,
  GetObjectTorrentCommandOutput,
} from "./commands/GetObjectTorrentCommand";
import {
  GetPublicAccessBlockCommand,
  GetPublicAccessBlockCommandInput,
  GetPublicAccessBlockCommandOutput,
} from "./commands/GetPublicAccessBlockCommand";
import { HeadBucketCommand, HeadBucketCommandInput, HeadBucketCommandOutput } from "./commands/HeadBucketCommand";
import { HeadObjectCommand, HeadObjectCommandInput, HeadObjectCommandOutput } from "./commands/HeadObjectCommand";
import {
  ListBucketAnalyticsConfigurationsCommand,
  ListBucketAnalyticsConfigurationsCommandInput,
  ListBucketAnalyticsConfigurationsCommandOutput,
} from "./commands/ListBucketAnalyticsConfigurationsCommand";
import {
  ListBucketIntelligentTieringConfigurationsCommand,
  ListBucketIntelligentTieringConfigurationsCommandInput,
  ListBucketIntelligentTieringConfigurationsCommandOutput,
} from "./commands/ListBucketIntelligentTieringConfigurationsCommand";
import {
  ListBucketInventoryConfigurationsCommand,
  ListBucketInventoryConfigurationsCommandInput,
  ListBucketInventoryConfigurationsCommandOutput,
} from "./commands/ListBucketInventoryConfigurationsCommand";
import {
  ListBucketMetricsConfigurationsCommand,
  ListBucketMetricsConfigurationsCommandInput,
  ListBucketMetricsConfigurationsCommandOutput,
} from "./commands/ListBucketMetricsConfigurationsCommand";
import { ListBucketsCommand, ListBucketsCommandInput, ListBucketsCommandOutput } from "./commands/ListBucketsCommand";
import {
  ListMultipartUploadsCommand,
  ListMultipartUploadsCommandInput,
  ListMultipartUploadsCommandOutput,
} from "./commands/ListMultipartUploadsCommand";
import {
  ListObjectVersionsCommand,
  ListObjectVersionsCommandInput,
  ListObjectVersionsCommandOutput,
} from "./commands/ListObjectVersionsCommand";
import { ListObjectsCommand, ListObjectsCommandInput, ListObjectsCommandOutput } from "./commands/ListObjectsCommand";
import {
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  ListObjectsV2CommandOutput,
} from "./commands/ListObjectsV2Command";
import { ListPartsCommand, ListPartsCommandInput, ListPartsCommandOutput } from "./commands/ListPartsCommand";
import {
  PutBucketAccelerateConfigurationCommand,
  PutBucketAccelerateConfigurationCommandInput,
  PutBucketAccelerateConfigurationCommandOutput,
} from "./commands/PutBucketAccelerateConfigurationCommand";
import {
  PutBucketAclCommand,
  PutBucketAclCommandInput,
  PutBucketAclCommandOutput,
} from "./commands/PutBucketAclCommand";
import {
  PutBucketAnalyticsConfigurationCommand,
  PutBucketAnalyticsConfigurationCommandInput,
  PutBucketAnalyticsConfigurationCommandOutput,
} from "./commands/PutBucketAnalyticsConfigurationCommand";
import {
  PutBucketCorsCommand,
  PutBucketCorsCommandInput,
  PutBucketCorsCommandOutput,
} from "./commands/PutBucketCorsCommand";
import {
  PutBucketEncryptionCommand,
  PutBucketEncryptionCommandInput,
  PutBucketEncryptionCommandOutput,
} from "./commands/PutBucketEncryptionCommand";
import {
  PutBucketIntelligentTieringConfigurationCommand,
  PutBucketIntelligentTieringConfigurationCommandInput,
  PutBucketIntelligentTieringConfigurationCommandOutput,
} from "./commands/PutBucketIntelligentTieringConfigurationCommand";
import {
  PutBucketInventoryConfigurationCommand,
  PutBucketInventoryConfigurationCommandInput,
  PutBucketInventoryConfigurationCommandOutput,
} from "./commands/PutBucketInventoryConfigurationCommand";
import {
  PutBucketLifecycleConfigurationCommand,
  PutBucketLifecycleConfigurationCommandInput,
  PutBucketLifecycleConfigurationCommandOutput,
} from "./commands/PutBucketLifecycleConfigurationCommand";
import {
  PutBucketLoggingCommand,
  PutBucketLoggingCommandInput,
  PutBucketLoggingCommandOutput,
} from "./commands/PutBucketLoggingCommand";
import {
  PutBucketMetricsConfigurationCommand,
  PutBucketMetricsConfigurationCommandInput,
  PutBucketMetricsConfigurationCommandOutput,
} from "./commands/PutBucketMetricsConfigurationCommand";
import {
  PutBucketNotificationConfigurationCommand,
  PutBucketNotificationConfigurationCommandInput,
  PutBucketNotificationConfigurationCommandOutput,
} from "./commands/PutBucketNotificationConfigurationCommand";
import {
  PutBucketOwnershipControlsCommand,
  PutBucketOwnershipControlsCommandInput,
  PutBucketOwnershipControlsCommandOutput,
} from "./commands/PutBucketOwnershipControlsCommand";
import {
  PutBucketPolicyCommand,
  PutBucketPolicyCommandInput,
  PutBucketPolicyCommandOutput,
} from "./commands/PutBucketPolicyCommand";
import {
  PutBucketReplicationCommand,
  PutBucketReplicationCommandInput,
  PutBucketReplicationCommandOutput,
} from "./commands/PutBucketReplicationCommand";
import {
  PutBucketRequestPaymentCommand,
  PutBucketRequestPaymentCommandInput,
  PutBucketRequestPaymentCommandOutput,
} from "./commands/PutBucketRequestPaymentCommand";
import {
  PutBucketTaggingCommand,
  PutBucketTaggingCommandInput,
  PutBucketTaggingCommandOutput,
} from "./commands/PutBucketTaggingCommand";
import {
  PutBucketVersioningCommand,
  PutBucketVersioningCommandInput,
  PutBucketVersioningCommandOutput,
} from "./commands/PutBucketVersioningCommand";
import {
  PutBucketWebsiteCommand,
  PutBucketWebsiteCommandInput,
  PutBucketWebsiteCommandOutput,
} from "./commands/PutBucketWebsiteCommand";
import {
  PutObjectAclCommand,
  PutObjectAclCommandInput,
  PutObjectAclCommandOutput,
} from "./commands/PutObjectAclCommand";
import { PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput } from "./commands/PutObjectCommand";
import {
  PutObjectLegalHoldCommand,
  PutObjectLegalHoldCommandInput,
  PutObjectLegalHoldCommandOutput,
} from "./commands/PutObjectLegalHoldCommand";
import {
  PutObjectLockConfigurationCommand,
  PutObjectLockConfigurationCommandInput,
  PutObjectLockConfigurationCommandOutput,
} from "./commands/PutObjectLockConfigurationCommand";
import {
  PutObjectRetentionCommand,
  PutObjectRetentionCommandInput,
  PutObjectRetentionCommandOutput,
} from "./commands/PutObjectRetentionCommand";
import {
  PutObjectTaggingCommand,
  PutObjectTaggingCommandInput,
  PutObjectTaggingCommandOutput,
} from "./commands/PutObjectTaggingCommand";
import {
  PutPublicAccessBlockCommand,
  PutPublicAccessBlockCommandInput,
  PutPublicAccessBlockCommandOutput,
} from "./commands/PutPublicAccessBlockCommand";
import {
  RestoreObjectCommand,
  RestoreObjectCommandInput,
  RestoreObjectCommandOutput,
} from "./commands/RestoreObjectCommand";
import {
  SelectObjectContentCommand,
  SelectObjectContentCommandInput,
  SelectObjectContentCommandOutput,
} from "./commands/SelectObjectContentCommand";
import { UploadPartCommand, UploadPartCommandInput, UploadPartCommandOutput } from "./commands/UploadPartCommand";
import {
  UploadPartCopyCommand,
  UploadPartCopyCommandInput,
  UploadPartCopyCommandOutput,
} from "./commands/UploadPartCopyCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";

/**
 * <p></p>
 */
export class S3 extends S3Client {
  /**
   * <p>This operation aborts a multipart upload. After a multipart upload is aborted, no
   *          additional parts can be uploaded using that upload ID. The storage consumed by any
   *          previously uploaded parts will be freed. However, if any part uploads are currently in
   *          progress, those part uploads might or might not succeed. As a result, it might be necessary
   *          to abort a given multipart upload multiple times in order to completely free all storage
   *          consumed by all parts. </p>
   *          <p>To verify that all parts have been removed, so you don't get charged for the part
   *          storage, you should call the <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListParts.html">ListParts</a> operation and ensure that
   *          the parts list is empty.</p>
   *          <p>For information about permissions required to use the multipart upload API, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/mpuAndPermissions.html">Multipart Upload API and
   *          Permissions</a>.</p>
   *          <p>The following operations are related to <code>AbortMultipartUpload</code>:</p>
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
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListMultipartUploads.html">ListMultipartUploads</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public abortMultipartUpload(
    args: AbortMultipartUploadCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<AbortMultipartUploadCommandOutput>;
  public abortMultipartUpload(
    args: AbortMultipartUploadCommandInput,
    cb: (err: any, data?: AbortMultipartUploadCommandOutput) => void
  ): void;
  public abortMultipartUpload(
    args: AbortMultipartUploadCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: AbortMultipartUploadCommandOutput) => void
  ): void;
  public abortMultipartUpload(
    args: AbortMultipartUploadCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: AbortMultipartUploadCommandOutput) => void),
    cb?: (err: any, data?: AbortMultipartUploadCommandOutput) => void
  ): Promise<AbortMultipartUploadCommandOutput> | void {
    const command = new AbortMultipartUploadCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public completeMultipartUpload(
    args: CompleteMultipartUploadCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CompleteMultipartUploadCommandOutput>;
  public completeMultipartUpload(
    args: CompleteMultipartUploadCommandInput,
    cb: (err: any, data?: CompleteMultipartUploadCommandOutput) => void
  ): void;
  public completeMultipartUpload(
    args: CompleteMultipartUploadCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CompleteMultipartUploadCommandOutput) => void
  ): void;
  public completeMultipartUpload(
    args: CompleteMultipartUploadCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CompleteMultipartUploadCommandOutput) => void),
    cb?: (err: any, data?: CompleteMultipartUploadCommandOutput) => void
  ): Promise<CompleteMultipartUploadCommandOutput> | void {
    const command = new CompleteMultipartUploadCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates a copy of an object that is already stored in Amazon S3.</p>
   *          <note>
   *             <p>You can store individual objects of up to 5 TB in Amazon S3. You create a copy of your
   *             object up to 5 GB in size in a single atomic operation using this API. However, to copy
   *             an object greater than 5 GB, you must use the multipart upload Upload Part - Copy API.
   *             For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/CopyingObjctsUsingRESTMPUapi.html">Copy Object Using the REST Multipart Upload API</a>.</p>
   *          </note>
   *          <p>All copy requests must be authenticated. Additionally, you must have
   *             <i>read</i> access to the source object and <i>write</i>
   *          access to the destination bucket. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html">REST Authentication</a>. Both the Region
   *          that you want to copy the object from and the Region that you want to copy the object to
   *          must be enabled for your account.</p>
   *          <p>A copy request might return an error when Amazon S3 receives the copy request or while Amazon S3
   *          is copying the files. If the error occurs before the copy operation starts, you receive a
   *          standard Amazon S3 error. If the error occurs during the copy operation, the error response is
   *          embedded in the <code>200 OK</code> response. This means that a <code>200 OK</code>
   *          response can contain either a success or an error. Design your application to parse the
   *          contents of the response and handle it appropriately.</p>
   *          <p>If the copy is successful, you receive a response with information about the copied
   *          object.</p>
   *          <note>
   *             <p>If the request is an HTTP 1.1 request, the response is chunk encoded. If it were not,
   *             it would not contain the content-length, and you would need to read the entire
   *             body.</p>
   *          </note>
   *          <p>The copy request charge is based on the storage class and Region that you specify for
   *          the destination object. For pricing information, see <a href="https://aws.amazon.com/s3/pricing/">Amazon S3 pricing</a>.</p>
   *          <important>
   *             <p>Amazon S3 transfer acceleration does not support cross-Region copies. If you request a
   *             cross-Region copy using a transfer acceleration endpoint, you get a 400 <code>Bad
   *                Request</code> error. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html">Transfer Acceleration</a>.</p>
   *          </important>
   *          <p>
   *             <b>Metadata</b>
   *          </p>
   *          <p>When copying an object, you can preserve all metadata (default) or specify new metadata.
   *          However, the ACL is not preserved and is set to private for the user making the request. To
   *          override the default ACL setting, specify a new ACL when generating a copy request. For
   *          more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/S3_ACLs_UsingACLs.html">Using ACLs</a>. </p>
   *          <p>To specify whether you want the object metadata copied from the source object or
   *          replaced with metadata provided in the request, you can optionally add the
   *             <code>x-amz-metadata-directive</code> header. When you grant permissions, you can use
   *          the <code>s3:x-amz-metadata-directive</code> condition key to enforce certain metadata
   *          behavior when objects are uploaded. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/amazon-s3-policy-keys.html">Specifying Conditions in a
   *             Policy</a> in the <i>Amazon S3 Developer Guide</i>. For a complete list of
   *          Amazon S3-specific condition keys, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/list_amazons3.html">Actions, Resources, and Condition Keys for
   *             Amazon S3</a>.</p>
   *          <p>
   *             <b>
   *                <code>x-amz-copy-source-if</code> Headers</b>
   *          </p>
   *          <p>To only copy an object under certain conditions, such as whether the <code>Etag</code>
   *          matches or whether the object was modified before or after a specified date, use the
   *          following request parameters:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <code>x-amz-copy-source-if-match</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>x-amz-copy-source-if-none-match</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>x-amz-copy-source-if-unmodified-since</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>x-amz-copy-source-if-modified-since</code>
   *                </p>
   *             </li>
   *          </ul>
   *          <p> If both the <code>x-amz-copy-source-if-match</code> and
   *             <code>x-amz-copy-source-if-unmodified-since</code> headers are present in the request
   *          and evaluate as follows, Amazon S3 returns <code>200 OK</code> and copies the data:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <code>x-amz-copy-source-if-match</code> condition evaluates to true</p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>x-amz-copy-source-if-unmodified-since</code> condition evaluates to
   *                false</p>
   *             </li>
   *          </ul>
   *
   *          <p>If both the <code>x-amz-copy-source-if-none-match</code> and
   *             <code>x-amz-copy-source-if-modified-since</code> headers are present in the request and
   *          evaluate as follows, Amazon S3 returns the <code>412 Precondition Failed</code> response
   *          code:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <code>x-amz-copy-source-if-none-match</code> condition evaluates to false</p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>x-amz-copy-source-if-modified-since</code> condition evaluates to
   *                true</p>
   *             </li>
   *          </ul>
   *
   *          <note>
   *             <p>All headers with the <code>x-amz-</code> prefix, including
   *                <code>x-amz-copy-source</code>, must be signed.</p>
   *          </note>
   *          <p>
   *             <b>Server-side encryption</b>
   *          </p>
   *          <p>When you perform a CopyObject operation, you can optionally use the appropriate encryption-related headers to encrypt the object using server-side encryption with AWS managed encryption keys (SSE-S3 or SSE-KMS) or a customer-provided encryption key. With server-side encryption, Amazon S3 encrypts your data as it writes it to disks in its data centers and decrypts the data when you access it. For more information about server-side encryption, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/serv-side-encryption.html">Using
   *          Server-Side Encryption</a>.</p>
   *          <p>If a target object uses SSE-KMS, you can enable an S3 Bucket Key for the object. For more
   *          information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-key.html">Amazon S3 Bucket Keys</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *          <p>
   *             <b>Access Control List (ACL)-Specific Request
   *          Headers</b>
   *          </p>
   *          <p>When copying an object, you can optionally use headers to grant ACL-based permissions.
   *          By default, all objects are private. Only the owner has full access control. When adding a
   *          new object, you can grant permissions to individual AWS accounts or to predefined groups
   *          defined by Amazon S3. These permissions are then added to the ACL on the object. For more
   *          information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html">Access Control List (ACL) Overview</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-using-rest-api.html">Managing ACLs Using the REST
   *             API</a>. </p>
   *
   *          <p>
   *             <b>Storage Class Options</b>
   *          </p>
   *          <p>You can use the <code>CopyObject</code> operation to change the storage class of an
   *          object that is already stored in Amazon S3 using the <code>StorageClass</code> parameter. For
   *          more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html">Storage
   *             Classes</a> in the <i>Amazon S3 Service Developer Guide</i>.</p>
   *          <p>
   *             <b>Versioning</b>
   *          </p>
   *          <p>By default, <code>x-amz-copy-source</code> identifies the current version of an object
   *          to copy. If the current version is a delete marker, Amazon S3 behaves as if the object was
   *          deleted. To copy a different version, use the <code>versionId</code> subresource.</p>
   *          <p>If you enable versioning on the target bucket, Amazon S3 generates a unique version ID for
   *          the object being copied. This version ID is different from the version ID of the source
   *          object. Amazon S3 returns the version ID of the copied object in the
   *             <code>x-amz-version-id</code> response header in the response.</p>
   *          <p>If you do not enable versioning or suspend it on the target bucket, the version ID that
   *          Amazon S3 generates is always null.</p>
   *          <p>If the source object's storage class is GLACIER, you must restore a copy of this object
   *          before you can use it as a source object for the copy operation. For more information, see
   *             <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_RestoreObject.html">RestoreObject</a>.</p>
   *          <p>The following operations are related to <code>CopyObject</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html">PutObject</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>
   *                </p>
   *             </li>
   *          </ul>
   *          <p>For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/CopyingObjectsExamples.html">Copying
   *             Objects</a>.</p>
   */
  public copyObject(args: CopyObjectCommandInput, options?: __HttpHandlerOptions): Promise<CopyObjectCommandOutput>;
  public copyObject(args: CopyObjectCommandInput, cb: (err: any, data?: CopyObjectCommandOutput) => void): void;
  public copyObject(
    args: CopyObjectCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CopyObjectCommandOutput) => void
  ): void;
  public copyObject(
    args: CopyObjectCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CopyObjectCommandOutput) => void),
    cb?: (err: any, data?: CopyObjectCommandOutput) => void
  ): Promise<CopyObjectCommandOutput> | void {
    const command = new CopyObjectCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates a new S3 bucket. To create a bucket, you must register with Amazon S3 and have a
   *          valid AWS Access Key ID to authenticate requests. Anonymous requests are never allowed to
   *          create buckets. By creating the bucket, you become the bucket owner.</p>
   *          <p>Not every string is an acceptable bucket name. For information about bucket naming
   *          restrictions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html">Working with Amazon S3
   *             buckets</a>. </p>
   *          <p>If you want to create an Amazon S3 on Outposts bucket, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_control_CreateBucket.html">Create Bucket</a>. </p>
   *          <p>By default, the bucket is created in the US East (N. Virginia) Region. You can
   *          optionally specify a Region in the request body. You might choose a Region to optimize
   *          latency, minimize costs, or address regulatory requirements. For example, if you reside in
   *          Europe, you will probably find it advantageous to create buckets in the Europe (Ireland)
   *          Region. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html#access-bucket-intro">Accessing a
   *          bucket</a>.</p>
   *          <note>
   *             <p>If you send your create bucket request to the <code>s3.amazonaws.com</code> endpoint,
   *             the request goes to the us-east-1 Region. Accordingly, the signature calculations in
   *             Signature Version 4 must use us-east-1 as the Region, even if the location constraint in
   *             the request specifies another Region where the bucket is to be created. If you create a
   *             bucket in a Region other than US East (N. Virginia), your application must be able to
   *             handle 307 redirect. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/VirtualHosting.html">Virtual hosting of buckets</a>.</p>
   *          </note>
   *          <p>When creating a bucket using this operation, you can optionally specify the accounts or
   *          groups that should be granted specific permissions on the bucket. There are two ways to
   *          grant the appropriate permissions using the request headers.</p>
   *          <ul>
   *             <li>
   *                <p>Specify a canned ACL using the <code>x-amz-acl</code> request header. Amazon S3
   *                supports a set of predefined ACLs, known as <i>canned ACLs</i>. Each
   *                canned ACL has a predefined set of grantees and permissions. For more information,
   *                see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#CannedACL">Canned ACL</a>.</p>
   *             </li>
   *             <li>
   *                <p>Specify access permissions explicitly using the <code>x-amz-grant-read</code>,
   *                   <code>x-amz-grant-write</code>, <code>x-amz-grant-read-acp</code>,
   *                   <code>x-amz-grant-write-acp</code>, and <code>x-amz-grant-full-control</code>
   *                headers. These headers map to the set of permissions Amazon S3 supports in an ACL. For
   *                more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html">Access control list
   *                   (ACL) overview</a>.</p>
   *                <p>You specify each grantee as a type=value pair, where the type is one of the
   *                following:</p>
   *                <ul>
   *                   <li>
   *                      <p>
   *                         <code>id</code> – if the value specified is the canonical user ID of an AWS
   *                      account</p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <code>uri</code> – if you are granting permissions to a predefined
   *                      group</p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <code>emailAddress</code> – if the value specified is the email address of
   *                      an AWS account</p>
   *                      <note>
   *                         <p>Using email addresses to specify a grantee is only supported in the following AWS Regions: </p>
   *                         <ul>
   *                            <li>
   *                               <p>US East (N. Virginia)</p>
   *                            </li>
   *                            <li>
   *                               <p>US West (N. California)</p>
   *                            </li>
   *                            <li>
   *                               <p> US West (Oregon)</p>
   *                            </li>
   *                            <li>
   *                               <p> Asia Pacific (Singapore)</p>
   *                            </li>
   *                            <li>
   *                               <p>Asia Pacific (Sydney)</p>
   *                            </li>
   *                            <li>
   *                               <p>Asia Pacific (Tokyo)</p>
   *                            </li>
   *                            <li>
   *                               <p>Europe (Ireland)</p>
   *                            </li>
   *                            <li>
   *                               <p>South America (São Paulo)</p>
   *                            </li>
   *                         </ul>
   *                         <p>For a list of all the Amazon S3 supported Regions and endpoints, see <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region">Regions and Endpoints</a> in the AWS General Reference.</p>
   *                      </note>
   *                   </li>
   *                </ul>
   *                <p>For example, the following <code>x-amz-grant-read</code> header grants the AWS accounts identified by account IDs permissions to read object data and its metadata:</p>
   *                <p>
   *                   <code>x-amz-grant-read: id="11112222333", id="444455556666" </code>
   *                </p>
   *             </li>
   *          </ul>
   *          <note>
   *             <p>You can use either a canned ACL or specify access permissions explicitly. You cannot
   *             do both.</p>
   *          </note>
   *
   *
   *          <p>The following operations are related to <code>CreateBucket</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html">PutObject</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucket.html">DeleteBucket</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public createBucket(
    args: CreateBucketCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateBucketCommandOutput>;
  public createBucket(args: CreateBucketCommandInput, cb: (err: any, data?: CreateBucketCommandOutput) => void): void;
  public createBucket(
    args: CreateBucketCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateBucketCommandOutput) => void
  ): void;
  public createBucket(
    args: CreateBucketCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateBucketCommandOutput) => void),
    cb?: (err: any, data?: CreateBucketCommandOutput) => void
  ): Promise<CreateBucketCommandOutput> | void {
    const command = new CreateBucketCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public createMultipartUpload(
    args: CreateMultipartUploadCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateMultipartUploadCommandOutput>;
  public createMultipartUpload(
    args: CreateMultipartUploadCommandInput,
    cb: (err: any, data?: CreateMultipartUploadCommandOutput) => void
  ): void;
  public createMultipartUpload(
    args: CreateMultipartUploadCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateMultipartUploadCommandOutput) => void
  ): void;
  public createMultipartUpload(
    args: CreateMultipartUploadCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateMultipartUploadCommandOutput) => void),
    cb?: (err: any, data?: CreateMultipartUploadCommandOutput) => void
  ): Promise<CreateMultipartUploadCommandOutput> | void {
    const command = new CreateMultipartUploadCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes the S3 bucket. All objects (including all object versions and delete markers) in
   *          the bucket must be deleted before the bucket itself can be deleted.</p>
   *
   *          <p class="title">
   *             <b>Related Resources</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObject.html">DeleteObject</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public deleteBucket(
    args: DeleteBucketCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteBucketCommandOutput>;
  public deleteBucket(args: DeleteBucketCommandInput, cb: (err: any, data?: DeleteBucketCommandOutput) => void): void;
  public deleteBucket(
    args: DeleteBucketCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteBucketCommandOutput) => void
  ): void;
  public deleteBucket(
    args: DeleteBucketCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteBucketCommandOutput) => void),
    cb?: (err: any, data?: DeleteBucketCommandOutput) => void
  ): Promise<DeleteBucketCommandOutput> | void {
    const command = new DeleteBucketCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes an analytics configuration for the bucket (specified by the analytics
   *          configuration ID).</p>
   *          <p>To use this operation, you must have permissions to perform the
   *             <code>s3:PutAnalyticsConfiguration</code> action. The bucket owner has this permission
   *          by default. The bucket owner can grant this permission to others. For more information
   *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>.</p>
   *
   *          <p>For information about the Amazon S3 analytics feature, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/analytics-storage-class.html">Amazon S3 Analytics – Storage Class
   *             Analysis</a>. </p>
   *
   *          <p>The following operations are related to
   *          <code>DeleteBucketAnalyticsConfiguration</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketAnalyticsConfiguration.html">GetBucketAnalyticsConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBucketAnalyticsConfigurations.html">ListBucketAnalyticsConfigurations</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketAnalyticsConfiguration.html">PutBucketAnalyticsConfiguration</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public deleteBucketAnalyticsConfiguration(
    args: DeleteBucketAnalyticsConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteBucketAnalyticsConfigurationCommandOutput>;
  public deleteBucketAnalyticsConfiguration(
    args: DeleteBucketAnalyticsConfigurationCommandInput,
    cb: (err: any, data?: DeleteBucketAnalyticsConfigurationCommandOutput) => void
  ): void;
  public deleteBucketAnalyticsConfiguration(
    args: DeleteBucketAnalyticsConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteBucketAnalyticsConfigurationCommandOutput) => void
  ): void;
  public deleteBucketAnalyticsConfiguration(
    args: DeleteBucketAnalyticsConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteBucketAnalyticsConfigurationCommandOutput) => void),
    cb?: (err: any, data?: DeleteBucketAnalyticsConfigurationCommandOutput) => void
  ): Promise<DeleteBucketAnalyticsConfigurationCommandOutput> | void {
    const command = new DeleteBucketAnalyticsConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes the <code>cors</code> configuration information set for the bucket.</p>
   *          <p>To use this operation, you must have permission to perform the
   *             <code>s3:PutBucketCORS</code> action. The bucket owner has this permission by default
   *          and can grant this permission to others. </p>
   *          <p>For information about <code>cors</code>, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html">Enabling
   *             Cross-Origin Resource Sharing</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *
   *          <p class="title">
   *             <b>Related Resources:</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketCors.html">PutBucketCors</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/RESTOPTIONSobject.html">RESTOPTIONSobject</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public deleteBucketCors(
    args: DeleteBucketCorsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteBucketCorsCommandOutput>;
  public deleteBucketCors(
    args: DeleteBucketCorsCommandInput,
    cb: (err: any, data?: DeleteBucketCorsCommandOutput) => void
  ): void;
  public deleteBucketCors(
    args: DeleteBucketCorsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteBucketCorsCommandOutput) => void
  ): void;
  public deleteBucketCors(
    args: DeleteBucketCorsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteBucketCorsCommandOutput) => void),
    cb?: (err: any, data?: DeleteBucketCorsCommandOutput) => void
  ): Promise<DeleteBucketCorsCommandOutput> | void {
    const command = new DeleteBucketCorsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>This implementation of the DELETE operation removes default encryption from the bucket.
   *          For information about the Amazon S3 default encryption feature, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html">Amazon S3 Default Bucket Encryption</a> in the
   *             <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *          <p>To use this operation, you must have permissions to perform the
   *             <code>s3:PutEncryptionConfiguration</code> action. The bucket owner has this permission
   *          by default. The bucket owner can grant this permission to others. For more information
   *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to your Amazon S3
   *             Resources</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *
   *          <p class="title">
   *             <b>Related Resources</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketEncryption.html">PutBucketEncryption</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketEncryption.html">GetBucketEncryption</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public deleteBucketEncryption(
    args: DeleteBucketEncryptionCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteBucketEncryptionCommandOutput>;
  public deleteBucketEncryption(
    args: DeleteBucketEncryptionCommandInput,
    cb: (err: any, data?: DeleteBucketEncryptionCommandOutput) => void
  ): void;
  public deleteBucketEncryption(
    args: DeleteBucketEncryptionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteBucketEncryptionCommandOutput) => void
  ): void;
  public deleteBucketEncryption(
    args: DeleteBucketEncryptionCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteBucketEncryptionCommandOutput) => void),
    cb?: (err: any, data?: DeleteBucketEncryptionCommandOutput) => void
  ): Promise<DeleteBucketEncryptionCommandOutput> | void {
    const command = new DeleteBucketEncryptionCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes the S3 Intelligent-Tiering configuration from the specified bucket.</p>
   *          <p>The S3 Intelligent-Tiering storage class is designed to optimize storage costs by automatically moving data to the most cost-effective storage access tier, without additional operational overhead. S3 Intelligent-Tiering delivers automatic cost savings by moving data between access tiers, when access patterns change.</p>
   *          <p>The S3 Intelligent-Tiering storage class is suitable for objects larger than 128 KB that you plan to store for at least 30 days. If the size of an object is less than 128 KB, it is not eligible for auto-tiering. Smaller objects can be stored, but they are always charged at the frequent access tier rates in the S3 Intelligent-Tiering storage class. </p>
   *          <p>If you delete an object before the end of the 30-day minimum storage duration period, you are charged for 30 days. For more information, see  <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html#sc-dynamic-data-access">Storage class for automatically optimizing frequently and infrequently accessed objects</a>.</p>
   *          <p>Operations related to
   *             <code>DeleteBucketIntelligentTieringConfiguration</code> include: </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketIntelligentTieringConfiguration.html">GetBucketIntelligentTieringConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketIntelligentTieringConfiguration.html">PutBucketIntelligentTieringConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBucketIntelligentTieringConfigurations.html">ListBucketIntelligentTieringConfigurations</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public deleteBucketIntelligentTieringConfiguration(
    args: DeleteBucketIntelligentTieringConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteBucketIntelligentTieringConfigurationCommandOutput>;
  public deleteBucketIntelligentTieringConfiguration(
    args: DeleteBucketIntelligentTieringConfigurationCommandInput,
    cb: (err: any, data?: DeleteBucketIntelligentTieringConfigurationCommandOutput) => void
  ): void;
  public deleteBucketIntelligentTieringConfiguration(
    args: DeleteBucketIntelligentTieringConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteBucketIntelligentTieringConfigurationCommandOutput) => void
  ): void;
  public deleteBucketIntelligentTieringConfiguration(
    args: DeleteBucketIntelligentTieringConfigurationCommandInput,
    optionsOrCb?:
      | __HttpHandlerOptions
      | ((err: any, data?: DeleteBucketIntelligentTieringConfigurationCommandOutput) => void),
    cb?: (err: any, data?: DeleteBucketIntelligentTieringConfigurationCommandOutput) => void
  ): Promise<DeleteBucketIntelligentTieringConfigurationCommandOutput> | void {
    const command = new DeleteBucketIntelligentTieringConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes an inventory configuration (identified by the inventory ID) from the
   *          bucket.</p>
   *          <p>To use this operation, you must have permissions to perform the
   *             <code>s3:PutInventoryConfiguration</code> action. The bucket owner has this permission
   *          by default. The bucket owner can grant this permission to others. For more information
   *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>.</p>
   *          <p>For information about the Amazon S3 inventory feature, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-inventory.html">Amazon S3 Inventory</a>.</p>
   *          <p>Operations related to <code>DeleteBucketInventoryConfiguration</code> include: </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketInventoryConfiguration.html">GetBucketInventoryConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketInventoryConfiguration.html">PutBucketInventoryConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBucketInventoryConfigurations.html">ListBucketInventoryConfigurations</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public deleteBucketInventoryConfiguration(
    args: DeleteBucketInventoryConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteBucketInventoryConfigurationCommandOutput>;
  public deleteBucketInventoryConfiguration(
    args: DeleteBucketInventoryConfigurationCommandInput,
    cb: (err: any, data?: DeleteBucketInventoryConfigurationCommandOutput) => void
  ): void;
  public deleteBucketInventoryConfiguration(
    args: DeleteBucketInventoryConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteBucketInventoryConfigurationCommandOutput) => void
  ): void;
  public deleteBucketInventoryConfiguration(
    args: DeleteBucketInventoryConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteBucketInventoryConfigurationCommandOutput) => void),
    cb?: (err: any, data?: DeleteBucketInventoryConfigurationCommandOutput) => void
  ): Promise<DeleteBucketInventoryConfigurationCommandOutput> | void {
    const command = new DeleteBucketInventoryConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes the lifecycle configuration from the specified bucket. Amazon S3 removes all the
   *          lifecycle configuration rules in the lifecycle subresource associated with the bucket. Your
   *          objects never expire, and Amazon S3 no longer automatically deletes any objects on the basis of
   *          rules contained in the deleted lifecycle configuration.</p>
   *          <p>To use this operation, you must have permission to perform the
   *             <code>s3:PutLifecycleConfiguration</code> action. By default, the bucket owner has this
   *          permission and the bucket owner can grant this permission to others.</p>
   *
   *          <p>There is usually some time lag before lifecycle configuration deletion is fully
   *          propagated to all the Amazon S3 systems.</p>
   *
   *          <p>For more information about the object expiration, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/intro-lifecycle-rules.html#intro-lifecycle-rules-actions">Elements to
   *             Describe Lifecycle Actions</a>.</p>
   *          <p>Related actions include:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLifecycleConfiguration.html">PutBucketLifecycleConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLifecycleConfiguration.html">GetBucketLifecycleConfiguration</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public deleteBucketLifecycle(
    args: DeleteBucketLifecycleCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteBucketLifecycleCommandOutput>;
  public deleteBucketLifecycle(
    args: DeleteBucketLifecycleCommandInput,
    cb: (err: any, data?: DeleteBucketLifecycleCommandOutput) => void
  ): void;
  public deleteBucketLifecycle(
    args: DeleteBucketLifecycleCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteBucketLifecycleCommandOutput) => void
  ): void;
  public deleteBucketLifecycle(
    args: DeleteBucketLifecycleCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteBucketLifecycleCommandOutput) => void),
    cb?: (err: any, data?: DeleteBucketLifecycleCommandOutput) => void
  ): Promise<DeleteBucketLifecycleCommandOutput> | void {
    const command = new DeleteBucketLifecycleCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes a metrics configuration for the Amazon CloudWatch request metrics (specified by the
   *          metrics configuration ID) from the bucket. Note that this doesn't include the daily storage
   *          metrics.</p>
   *
   *          <p> To use this operation, you must have permissions to perform the
   *             <code>s3:PutMetricsConfiguration</code> action. The bucket owner has this permission by
   *          default. The bucket owner can grant this permission to others. For more information about
   *          permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>.</p>
   *
   *          <p>For information about CloudWatch request metrics for Amazon S3, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html">Monitoring Metrics with Amazon CloudWatch</a>. </p>
   *          <p>The following operations are related to
   *          <code>DeleteBucketMetricsConfiguration</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketMetricsConfiguration.html">GetBucketMetricsConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketMetricsConfiguration.html">PutBucketMetricsConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBucketMetricsConfigurations.html">ListBucketMetricsConfigurations</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html">Monitoring Metrics with Amazon
   *                   CloudWatch</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public deleteBucketMetricsConfiguration(
    args: DeleteBucketMetricsConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteBucketMetricsConfigurationCommandOutput>;
  public deleteBucketMetricsConfiguration(
    args: DeleteBucketMetricsConfigurationCommandInput,
    cb: (err: any, data?: DeleteBucketMetricsConfigurationCommandOutput) => void
  ): void;
  public deleteBucketMetricsConfiguration(
    args: DeleteBucketMetricsConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteBucketMetricsConfigurationCommandOutput) => void
  ): void;
  public deleteBucketMetricsConfiguration(
    args: DeleteBucketMetricsConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteBucketMetricsConfigurationCommandOutput) => void),
    cb?: (err: any, data?: DeleteBucketMetricsConfigurationCommandOutput) => void
  ): Promise<DeleteBucketMetricsConfigurationCommandOutput> | void {
    const command = new DeleteBucketMetricsConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Removes <code>OwnershipControls</code> for an Amazon S3 bucket. To use this operation, you
   *          must have the <code>s3:PutBucketOwnershipControls</code> permission. For more information
   *          about Amazon S3 permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html">Specifying
   *             Permissions in a Policy</a>.</p>
   *          <p>For information about Amazon S3 Object Ownership, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html">Using Object Ownership</a>. </p>
   *          <p>The following operations are related to
   *          <code>DeleteBucketOwnershipControls</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a>GetBucketOwnershipControls</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a>PutBucketOwnershipControls</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public deleteBucketOwnershipControls(
    args: DeleteBucketOwnershipControlsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteBucketOwnershipControlsCommandOutput>;
  public deleteBucketOwnershipControls(
    args: DeleteBucketOwnershipControlsCommandInput,
    cb: (err: any, data?: DeleteBucketOwnershipControlsCommandOutput) => void
  ): void;
  public deleteBucketOwnershipControls(
    args: DeleteBucketOwnershipControlsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteBucketOwnershipControlsCommandOutput) => void
  ): void;
  public deleteBucketOwnershipControls(
    args: DeleteBucketOwnershipControlsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteBucketOwnershipControlsCommandOutput) => void),
    cb?: (err: any, data?: DeleteBucketOwnershipControlsCommandOutput) => void
  ): Promise<DeleteBucketOwnershipControlsCommandOutput> | void {
    const command = new DeleteBucketOwnershipControlsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>This implementation of the DELETE operation uses the policy subresource to delete the
   *          policy of a specified bucket. If you are using an identity other than the root user of the
   *          AWS account that owns the bucket, the calling identity must have the
   *             <code>DeleteBucketPolicy</code> permissions on the specified bucket and belong to the
   *          bucket owner's account to use this operation. </p>
   *
   *          <p>If you don't have <code>DeleteBucketPolicy</code> permissions, Amazon S3 returns a <code>403
   *             Access Denied</code> error. If you have the correct permissions, but you're not using an
   *          identity that belongs to the bucket owner's account, Amazon S3 returns a <code>405 Method Not
   *             Allowed</code> error. </p>
   *
   *
   *          <important>
   *             <p>As a security precaution, the root user of the AWS account that owns a bucket can
   *             always use this operation, even if the policy explicitly denies the root user the
   *             ability to perform this action.</p>
   *          </important>
   *
   *          <p>For more information about bucket policies, see <a href=" https://docs.aws.amazon.com/AmazonS3/latest/dev/using-iam-policies.html">Using Bucket Policies and
   *             UserPolicies</a>. </p>
   *          <p>The following operations are related to <code>DeleteBucketPolicy</code>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObject.html">DeleteObject</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public deleteBucketPolicy(
    args: DeleteBucketPolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteBucketPolicyCommandOutput>;
  public deleteBucketPolicy(
    args: DeleteBucketPolicyCommandInput,
    cb: (err: any, data?: DeleteBucketPolicyCommandOutput) => void
  ): void;
  public deleteBucketPolicy(
    args: DeleteBucketPolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteBucketPolicyCommandOutput) => void
  ): void;
  public deleteBucketPolicy(
    args: DeleteBucketPolicyCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteBucketPolicyCommandOutput) => void),
    cb?: (err: any, data?: DeleteBucketPolicyCommandOutput) => void
  ): Promise<DeleteBucketPolicyCommandOutput> | void {
    const command = new DeleteBucketPolicyCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p> Deletes the replication configuration from the bucket.</p>
   *          <p>To use this operation, you must have permissions to perform the
   *             <code>s3:PutReplicationConfiguration</code> action. The bucket owner has these
   *          permissions by default and can grant it to others. For more information about permissions,
   *          see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>. </p>
   *          <note>
   *             <p>It can take a while for the deletion of a replication configuration to fully
   *             propagate.</p>
   *          </note>
   *
   *          <p> For information about replication configuration, see <a href=" https://docs.aws.amazon.com/AmazonS3/latest/dev/replication.html">Replication</a> in the <i>Amazon S3 Developer
   *             Guide</i>. </p>
   *
   *          <p>The following operations are related to <code>DeleteBucketReplication</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketReplication.html">PutBucketReplication</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketReplication.html">GetBucketReplication</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public deleteBucketReplication(
    args: DeleteBucketReplicationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteBucketReplicationCommandOutput>;
  public deleteBucketReplication(
    args: DeleteBucketReplicationCommandInput,
    cb: (err: any, data?: DeleteBucketReplicationCommandOutput) => void
  ): void;
  public deleteBucketReplication(
    args: DeleteBucketReplicationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteBucketReplicationCommandOutput) => void
  ): void;
  public deleteBucketReplication(
    args: DeleteBucketReplicationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteBucketReplicationCommandOutput) => void),
    cb?: (err: any, data?: DeleteBucketReplicationCommandOutput) => void
  ): Promise<DeleteBucketReplicationCommandOutput> | void {
    const command = new DeleteBucketReplicationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes the tags from the bucket.</p>
   *
   *          <p>To use this operation, you must have permission to perform the
   *             <code>s3:PutBucketTagging</code> action. By default, the bucket owner has this
   *          permission and can grant this permission to others. </p>
   *          <p>The following operations are related to <code>DeleteBucketTagging</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketTagging.html">GetBucketTagging</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketTagging.html">PutBucketTagging</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public deleteBucketTagging(
    args: DeleteBucketTaggingCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteBucketTaggingCommandOutput>;
  public deleteBucketTagging(
    args: DeleteBucketTaggingCommandInput,
    cb: (err: any, data?: DeleteBucketTaggingCommandOutput) => void
  ): void;
  public deleteBucketTagging(
    args: DeleteBucketTaggingCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteBucketTaggingCommandOutput) => void
  ): void;
  public deleteBucketTagging(
    args: DeleteBucketTaggingCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteBucketTaggingCommandOutput) => void),
    cb?: (err: any, data?: DeleteBucketTaggingCommandOutput) => void
  ): Promise<DeleteBucketTaggingCommandOutput> | void {
    const command = new DeleteBucketTaggingCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>This operation removes the website configuration for a bucket. Amazon S3 returns a <code>200
   *             OK</code> response upon successfully deleting a website configuration on the specified
   *          bucket. You will get a <code>200 OK</code> response if the website configuration you are
   *          trying to delete does not exist on the bucket. Amazon S3 returns a <code>404</code> response if
   *          the bucket specified in the request does not exist.</p>
   *
   *          <p>This DELETE operation requires the <code>S3:DeleteBucketWebsite</code> permission. By
   *          default, only the bucket owner can delete the website configuration attached to a bucket.
   *          However, bucket owners can grant other users permission to delete the website configuration
   *          by writing a bucket policy granting them the <code>S3:DeleteBucketWebsite</code>
   *          permission. </p>
   *
   *          <p>For more information about hosting websites, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html">Hosting Websites on Amazon S3</a>. </p>
   *
   *          <p>The following operations are related to <code>DeleteBucketWebsite</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketWebsite.html">GetBucketWebsite</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketWebsite.html">PutBucketWebsite</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public deleteBucketWebsite(
    args: DeleteBucketWebsiteCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteBucketWebsiteCommandOutput>;
  public deleteBucketWebsite(
    args: DeleteBucketWebsiteCommandInput,
    cb: (err: any, data?: DeleteBucketWebsiteCommandOutput) => void
  ): void;
  public deleteBucketWebsite(
    args: DeleteBucketWebsiteCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteBucketWebsiteCommandOutput) => void
  ): void;
  public deleteBucketWebsite(
    args: DeleteBucketWebsiteCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteBucketWebsiteCommandOutput) => void),
    cb?: (err: any, data?: DeleteBucketWebsiteCommandOutput) => void
  ): Promise<DeleteBucketWebsiteCommandOutput> | void {
    const command = new DeleteBucketWebsiteCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Removes the null version (if there is one) of an object and inserts a delete marker,
   *          which becomes the latest version of the object. If there isn't a null version, Amazon S3 does
   *          not remove any objects.</p>
   *
   *          <p>To remove a specific version, you must be the bucket owner and you must use the version
   *          Id subresource. Using this subresource permanently deletes the version. If the object
   *          deleted is a delete marker, Amazon S3 sets the response header,
   *          <code>x-amz-delete-marker</code>, to true. </p>
   *
   *          <p>If the object you want to delete is in a bucket where the bucket versioning
   *          configuration is MFA Delete enabled, you must include the <code>x-amz-mfa</code> request
   *          header in the DELETE <code>versionId</code> request. Requests that include
   *             <code>x-amz-mfa</code> must use HTTPS. </p>
   *
   *          <p> For more information about MFA Delete, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMFADelete.html">Using MFA Delete</a>. To see sample requests that use versioning, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectDELETE.html#ExampleVersionObjectDelete">Sample Request</a>. </p>
   *
   *          <p>You can delete objects by explicitly calling the DELETE Object API or configure its
   *          lifecycle (<a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLifecycle.html">PutBucketLifecycle</a>) to
   *          enable Amazon S3 to remove them for you. If you want to block users or accounts from removing or
   *          deleting objects from your bucket, you must deny them the <code>s3:DeleteObject</code>,
   *             <code>s3:DeleteObjectVersion</code>, and <code>s3:PutLifeCycleConfiguration</code>
   *          actions. </p>
   *
   *          <p>The following operation is related to <code>DeleteObject</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html">PutObject</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public deleteObject(
    args: DeleteObjectCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteObjectCommandOutput>;
  public deleteObject(args: DeleteObjectCommandInput, cb: (err: any, data?: DeleteObjectCommandOutput) => void): void;
  public deleteObject(
    args: DeleteObjectCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteObjectCommandOutput) => void
  ): void;
  public deleteObject(
    args: DeleteObjectCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteObjectCommandOutput) => void),
    cb?: (err: any, data?: DeleteObjectCommandOutput) => void
  ): Promise<DeleteObjectCommandOutput> | void {
    const command = new DeleteObjectCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>This operation enables you to delete multiple objects from a bucket using a single HTTP
   *          request. If you know the object keys that you want to delete, then this operation provides
   *          a suitable alternative to sending individual delete requests, reducing per-request
   *          overhead.</p>
   *
   *          <p>The request contains a list of up to 1000 keys that you want to delete. In the XML, you
   *          provide the object key names, and optionally, version IDs if you want to delete a specific
   *          version of the object from a versioning-enabled bucket. For each key, Amazon S3 performs a
   *          delete operation and returns the result of that delete, success, or failure, in the
   *          response. Note that if the object specified in the request is not found, Amazon S3 returns the
   *          result as deleted.</p>
   *
   *          <p> The operation supports two modes for the response: verbose and quiet. By default, the
   *          operation uses verbose mode in which the response includes the result of deletion of each
   *          key in your request. In quiet mode the response includes only keys where the delete
   *          operation encountered an error. For a successful deletion, the operation does not return
   *          any information about the delete in the response body.</p>
   *
   *          <p>When performing this operation on an MFA Delete enabled bucket, that attempts to delete
   *          any versioned objects, you must include an MFA token. If you do not provide one, the entire
   *          request will fail, even if there are non-versioned objects you are trying to delete. If you
   *          provide an invalid token, whether there are versioned keys in the request or not, the
   *          entire Multi-Object Delete request will fail. For information about MFA Delete, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html#MultiFactorAuthenticationDelete"> MFA
   *          Delete</a>.</p>
   *
   *          <p>Finally, the Content-MD5 header is required for all Multi-Object Delete requests. Amazon
   *          S3 uses the header value to ensure that your request body has not been altered in
   *          transit.</p>
   *
   *          <p>The following operations are related to <code>DeleteObjects</code>:</p>
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
  public deleteObjects(
    args: DeleteObjectsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteObjectsCommandOutput>;
  public deleteObjects(
    args: DeleteObjectsCommandInput,
    cb: (err: any, data?: DeleteObjectsCommandOutput) => void
  ): void;
  public deleteObjects(
    args: DeleteObjectsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteObjectsCommandOutput) => void
  ): void;
  public deleteObjects(
    args: DeleteObjectsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteObjectsCommandOutput) => void),
    cb?: (err: any, data?: DeleteObjectsCommandOutput) => void
  ): Promise<DeleteObjectsCommandOutput> | void {
    const command = new DeleteObjectsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Removes the entire tag set from the specified object. For more information about
   *          managing object tags, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-tagging.html"> Object
   *             Tagging</a>.</p>
   *
   *          <p>To use this operation, you must have permission to perform the
   *             <code>s3:DeleteObjectTagging</code> action.</p>
   *
   *          <p>To delete tags of a specific object version, add the <code>versionId</code> query
   *          parameter in the request. You will need permission for the
   *             <code>s3:DeleteObjectVersionTagging</code> action.</p>
   *
   *          <p>The following operations are related to
   *          <code>DeleteBucketMetricsConfiguration</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObjectTagging.html">PutObjectTagging</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObjectTagging.html">GetObjectTagging</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public deleteObjectTagging(
    args: DeleteObjectTaggingCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteObjectTaggingCommandOutput>;
  public deleteObjectTagging(
    args: DeleteObjectTaggingCommandInput,
    cb: (err: any, data?: DeleteObjectTaggingCommandOutput) => void
  ): void;
  public deleteObjectTagging(
    args: DeleteObjectTaggingCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteObjectTaggingCommandOutput) => void
  ): void;
  public deleteObjectTagging(
    args: DeleteObjectTaggingCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteObjectTaggingCommandOutput) => void),
    cb?: (err: any, data?: DeleteObjectTaggingCommandOutput) => void
  ): Promise<DeleteObjectTaggingCommandOutput> | void {
    const command = new DeleteObjectTaggingCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Removes the <code>PublicAccessBlock</code> configuration for an Amazon S3 bucket. To use this
   *          operation, you must have the <code>s3:PutBucketPublicAccessBlock</code> permission. For
   *          more information about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>.</p>
   *
   *          <p>The following operations are related to <code>DeletePublicAccessBlock</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html">Using Amazon S3 Block
   *                   Public Access</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetPublicAccessBlock.html">GetPublicAccessBlock</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutPublicAccessBlock.html">PutPublicAccessBlock</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketPolicyStatus.html">GetBucketPolicyStatus</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public deletePublicAccessBlock(
    args: DeletePublicAccessBlockCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeletePublicAccessBlockCommandOutput>;
  public deletePublicAccessBlock(
    args: DeletePublicAccessBlockCommandInput,
    cb: (err: any, data?: DeletePublicAccessBlockCommandOutput) => void
  ): void;
  public deletePublicAccessBlock(
    args: DeletePublicAccessBlockCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeletePublicAccessBlockCommandOutput) => void
  ): void;
  public deletePublicAccessBlock(
    args: DeletePublicAccessBlockCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeletePublicAccessBlockCommandOutput) => void),
    cb?: (err: any, data?: DeletePublicAccessBlockCommandOutput) => void
  ): Promise<DeletePublicAccessBlockCommandOutput> | void {
    const command = new DeletePublicAccessBlockCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>This implementation of the GET operation uses the <code>accelerate</code> subresource to
   *          return the Transfer Acceleration state of a bucket, which is either <code>Enabled</code> or
   *             <code>Suspended</code>. Amazon S3 Transfer Acceleration is a bucket-level feature that
   *          enables you to perform faster data transfers to and from Amazon S3.</p>
   *          <p>To use this operation, you must have permission to perform the
   *             <code>s3:GetAccelerateConfiguration</code> action. The bucket owner has this permission
   *          by default. The bucket owner can grant this permission to others. For more information
   *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to your Amazon S3
   *             Resources</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *          <p>You set the Transfer Acceleration state of an existing bucket to <code>Enabled</code> or
   *             <code>Suspended</code> by using the <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketAccelerateConfiguration.html">PutBucketAccelerateConfiguration</a> operation. </p>
   *          <p>A GET <code>accelerate</code> request does not return a state value for a bucket that
   *          has no transfer acceleration state. A bucket has no Transfer Acceleration state if a state
   *          has never been set on the bucket. </p>
   *
   *          <p>For more information about transfer acceleration, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html">Transfer Acceleration</a> in the
   *          Amazon Simple Storage Service Developer Guide.</p>
   *          <p class="title">
   *             <b>Related Resources</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketAccelerateConfiguration.html">PutBucketAccelerateConfiguration</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketAccelerateConfiguration(
    args: GetBucketAccelerateConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketAccelerateConfigurationCommandOutput>;
  public getBucketAccelerateConfiguration(
    args: GetBucketAccelerateConfigurationCommandInput,
    cb: (err: any, data?: GetBucketAccelerateConfigurationCommandOutput) => void
  ): void;
  public getBucketAccelerateConfiguration(
    args: GetBucketAccelerateConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketAccelerateConfigurationCommandOutput) => void
  ): void;
  public getBucketAccelerateConfiguration(
    args: GetBucketAccelerateConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketAccelerateConfigurationCommandOutput) => void),
    cb?: (err: any, data?: GetBucketAccelerateConfigurationCommandOutput) => void
  ): Promise<GetBucketAccelerateConfigurationCommandOutput> | void {
    const command = new GetBucketAccelerateConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>This implementation of the <code>GET</code> operation uses the <code>acl</code>
   *          subresource to return the access control list (ACL) of a bucket. To use <code>GET</code> to
   *          return the ACL of the bucket, you must have <code>READ_ACP</code> access to the bucket. If
   *             <code>READ_ACP</code> permission is granted to the anonymous user, you can return the
   *          ACL of the bucket without using an authorization header.</p>
   *
   *          <p class="title">
   *             <b>Related Resources</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjects.html">ListObjects</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketAcl(
    args: GetBucketAclCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketAclCommandOutput>;
  public getBucketAcl(args: GetBucketAclCommandInput, cb: (err: any, data?: GetBucketAclCommandOutput) => void): void;
  public getBucketAcl(
    args: GetBucketAclCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketAclCommandOutput) => void
  ): void;
  public getBucketAcl(
    args: GetBucketAclCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketAclCommandOutput) => void),
    cb?: (err: any, data?: GetBucketAclCommandOutput) => void
  ): Promise<GetBucketAclCommandOutput> | void {
    const command = new GetBucketAclCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>This implementation of the GET operation returns an analytics configuration (identified
   *          by the analytics configuration ID) from the bucket.</p>
   *          <p>To use this operation, you must have permissions to perform the
   *             <code>s3:GetAnalyticsConfiguration</code> action. The bucket owner has this permission
   *          by default. The bucket owner can grant this permission to others. For more information
   *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources"> Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a> in the <i>Amazon Simple Storage Service Developer Guide</i>. </p>
   *          <p>For information about Amazon S3 analytics feature, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/analytics-storage-class.html">Amazon S3 Analytics – Storage Class
   *             Analysis</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *
   *          <p class="title">
   *             <b>Related Resources</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketAnalyticsConfiguration.html">DeleteBucketAnalyticsConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBucketAnalyticsConfigurations.html">ListBucketAnalyticsConfigurations</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketAnalyticsConfiguration.html">PutBucketAnalyticsConfiguration</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketAnalyticsConfiguration(
    args: GetBucketAnalyticsConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketAnalyticsConfigurationCommandOutput>;
  public getBucketAnalyticsConfiguration(
    args: GetBucketAnalyticsConfigurationCommandInput,
    cb: (err: any, data?: GetBucketAnalyticsConfigurationCommandOutput) => void
  ): void;
  public getBucketAnalyticsConfiguration(
    args: GetBucketAnalyticsConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketAnalyticsConfigurationCommandOutput) => void
  ): void;
  public getBucketAnalyticsConfiguration(
    args: GetBucketAnalyticsConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketAnalyticsConfigurationCommandOutput) => void),
    cb?: (err: any, data?: GetBucketAnalyticsConfigurationCommandOutput) => void
  ): Promise<GetBucketAnalyticsConfigurationCommandOutput> | void {
    const command = new GetBucketAnalyticsConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns the cors configuration information set for the bucket.</p>
   *
   *          <p> To use this operation, you must have permission to perform the s3:GetBucketCORS action.
   *          By default, the bucket owner has this permission and can grant it to others.</p>
   *
   *          <p> For more information about cors, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html"> Enabling
   *             Cross-Origin Resource Sharing</a>.</p>
   *
   *          <p>The following operations are related to <code>GetBucketCors</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketCors.html">PutBucketCors</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketCors.html">DeleteBucketCors</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketCors(
    args: GetBucketCorsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketCorsCommandOutput>;
  public getBucketCors(
    args: GetBucketCorsCommandInput,
    cb: (err: any, data?: GetBucketCorsCommandOutput) => void
  ): void;
  public getBucketCors(
    args: GetBucketCorsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketCorsCommandOutput) => void
  ): void;
  public getBucketCors(
    args: GetBucketCorsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketCorsCommandOutput) => void),
    cb?: (err: any, data?: GetBucketCorsCommandOutput) => void
  ): Promise<GetBucketCorsCommandOutput> | void {
    const command = new GetBucketCorsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns the default encryption configuration for an Amazon S3 bucket. For information about
   *          the Amazon S3 default encryption feature, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html">Amazon S3 Default Bucket Encryption</a>.</p>
   *
   *          <p> To use this operation, you must have permission to perform the
   *             <code>s3:GetEncryptionConfiguration</code> action. The bucket owner has this permission
   *          by default. The bucket owner can grant this permission to others. For more information
   *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>.</p>
   *          <p>The following operations are related to <code>GetBucketEncryption</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketEncryption.html">PutBucketEncryption</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketEncryption.html">DeleteBucketEncryption</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketEncryption(
    args: GetBucketEncryptionCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketEncryptionCommandOutput>;
  public getBucketEncryption(
    args: GetBucketEncryptionCommandInput,
    cb: (err: any, data?: GetBucketEncryptionCommandOutput) => void
  ): void;
  public getBucketEncryption(
    args: GetBucketEncryptionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketEncryptionCommandOutput) => void
  ): void;
  public getBucketEncryption(
    args: GetBucketEncryptionCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketEncryptionCommandOutput) => void),
    cb?: (err: any, data?: GetBucketEncryptionCommandOutput) => void
  ): Promise<GetBucketEncryptionCommandOutput> | void {
    const command = new GetBucketEncryptionCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets the S3 Intelligent-Tiering configuration from the specified bucket.</p>
   *          <p>The S3 Intelligent-Tiering storage class is designed to optimize storage costs by automatically moving data to the most cost-effective storage access tier, without additional operational overhead. S3 Intelligent-Tiering delivers automatic cost savings by moving data between access tiers, when access patterns change.</p>
   *          <p>The S3 Intelligent-Tiering storage class is suitable for objects larger than 128 KB that you plan to store for at least 30 days. If the size of an object is less than 128 KB, it is not eligible for auto-tiering. Smaller objects can be stored, but they are always charged at the frequent access tier rates in the S3 Intelligent-Tiering storage class. </p>
   *          <p>If you delete an object before the end of the 30-day minimum storage duration period, you are charged for 30 days. For more information, see  <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html#sc-dynamic-data-access">Storage class for automatically optimizing frequently and infrequently accessed objects</a>.</p>
   *          <p>Operations related to
   *             <code>GetBucketIntelligentTieringConfiguration</code> include: </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketIntelligentTieringConfiguration.html">DeleteBucketIntelligentTieringConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketIntelligentTieringConfiguration.html">PutBucketIntelligentTieringConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBucketIntelligentTieringConfigurations.html">ListBucketIntelligentTieringConfigurations</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketIntelligentTieringConfiguration(
    args: GetBucketIntelligentTieringConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketIntelligentTieringConfigurationCommandOutput>;
  public getBucketIntelligentTieringConfiguration(
    args: GetBucketIntelligentTieringConfigurationCommandInput,
    cb: (err: any, data?: GetBucketIntelligentTieringConfigurationCommandOutput) => void
  ): void;
  public getBucketIntelligentTieringConfiguration(
    args: GetBucketIntelligentTieringConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketIntelligentTieringConfigurationCommandOutput) => void
  ): void;
  public getBucketIntelligentTieringConfiguration(
    args: GetBucketIntelligentTieringConfigurationCommandInput,
    optionsOrCb?:
      | __HttpHandlerOptions
      | ((err: any, data?: GetBucketIntelligentTieringConfigurationCommandOutput) => void),
    cb?: (err: any, data?: GetBucketIntelligentTieringConfigurationCommandOutput) => void
  ): Promise<GetBucketIntelligentTieringConfigurationCommandOutput> | void {
    const command = new GetBucketIntelligentTieringConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns an inventory configuration (identified by the inventory configuration ID) from
   *          the bucket.</p>
   *
   *          <p>To use this operation, you must have permissions to perform the
   *             <code>s3:GetInventoryConfiguration</code> action. The bucket owner has this permission
   *          by default and can grant this permission to others. For more information about permissions,
   *          see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>.</p>
   *
   *          <p>For information about the Amazon S3 inventory feature, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-inventory.html">Amazon S3 Inventory</a>.</p>
   *
   *          <p>The following operations are related to
   *          <code>GetBucketInventoryConfiguration</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketInventoryConfiguration.html">DeleteBucketInventoryConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBucketInventoryConfigurations.html">ListBucketInventoryConfigurations</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketInventoryConfiguration.html">PutBucketInventoryConfiguration</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketInventoryConfiguration(
    args: GetBucketInventoryConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketInventoryConfigurationCommandOutput>;
  public getBucketInventoryConfiguration(
    args: GetBucketInventoryConfigurationCommandInput,
    cb: (err: any, data?: GetBucketInventoryConfigurationCommandOutput) => void
  ): void;
  public getBucketInventoryConfiguration(
    args: GetBucketInventoryConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketInventoryConfigurationCommandOutput) => void
  ): void;
  public getBucketInventoryConfiguration(
    args: GetBucketInventoryConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketInventoryConfigurationCommandOutput) => void),
    cb?: (err: any, data?: GetBucketInventoryConfigurationCommandOutput) => void
  ): Promise<GetBucketInventoryConfigurationCommandOutput> | void {
    const command = new GetBucketInventoryConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <note>
   *             <p>Bucket lifecycle configuration now supports specifying a lifecycle rule using an
   *             object key name prefix, one or more object tags, or a combination of both. Accordingly,
   *             this section describes the latest API. The response describes the new filter element
   *             that you can use to specify a filter to select a subset of objects to which the rule
   *             applies. If you are using a previous version of the lifecycle configuration, it still
   *             works. For the earlier API description, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLifecycle.html">GetBucketLifecycle</a>.</p>
   *          </note>
   *          <p>Returns the lifecycle configuration information set on the bucket. For information about
   *          lifecycle configuration, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html">Object
   *             Lifecycle Management</a>.</p>
   *
   *          <p>To use this operation, you must have permission to perform the
   *             <code>s3:GetLifecycleConfiguration</code> action. The bucket owner has this permission,
   *          by default. The bucket owner can grant this permission to others. For more information
   *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>.</p>
   *
   *          <p>
   *             <code>GetBucketLifecycleConfiguration</code> has the following special error:</p>
   *          <ul>
   *             <li>
   *                <p>Error code: <code>NoSuchLifecycleConfiguration</code>
   *                </p>
   *                <ul>
   *                   <li>
   *                      <p>Description: The lifecycle configuration does not exist.</p>
   *                   </li>
   *                   <li>
   *                      <p>HTTP Status Code: 404 Not Found</p>
   *                   </li>
   *                   <li>
   *                      <p>SOAP Fault Code Prefix: Client</p>
   *                   </li>
   *                </ul>
   *             </li>
   *          </ul>
   *          <p>The following operations are related to
   *          <code>GetBucketLifecycleConfiguration</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLifecycle.html">GetBucketLifecycle</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLifecycle.html">PutBucketLifecycle</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketLifecycle.html">DeleteBucketLifecycle</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketLifecycleConfiguration(
    args: GetBucketLifecycleConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketLifecycleConfigurationCommandOutput>;
  public getBucketLifecycleConfiguration(
    args: GetBucketLifecycleConfigurationCommandInput,
    cb: (err: any, data?: GetBucketLifecycleConfigurationCommandOutput) => void
  ): void;
  public getBucketLifecycleConfiguration(
    args: GetBucketLifecycleConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketLifecycleConfigurationCommandOutput) => void
  ): void;
  public getBucketLifecycleConfiguration(
    args: GetBucketLifecycleConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketLifecycleConfigurationCommandOutput) => void),
    cb?: (err: any, data?: GetBucketLifecycleConfigurationCommandOutput) => void
  ): Promise<GetBucketLifecycleConfigurationCommandOutput> | void {
    const command = new GetBucketLifecycleConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns the Region the bucket resides in. You set the bucket's Region using the
   *             <code>LocationConstraint</code> request parameter in a <code>CreateBucket</code>
   *          request. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>.</p>
   *
   *          <p> To use this implementation of the operation, you must be the bucket owner.</p>
   *
   *          <p>The following operations are related to <code>GetBucketLocation</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketLocation(
    args: GetBucketLocationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketLocationCommandOutput>;
  public getBucketLocation(
    args: GetBucketLocationCommandInput,
    cb: (err: any, data?: GetBucketLocationCommandOutput) => void
  ): void;
  public getBucketLocation(
    args: GetBucketLocationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketLocationCommandOutput) => void
  ): void;
  public getBucketLocation(
    args: GetBucketLocationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketLocationCommandOutput) => void),
    cb?: (err: any, data?: GetBucketLocationCommandOutput) => void
  ): Promise<GetBucketLocationCommandOutput> | void {
    const command = new GetBucketLocationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns the logging status of a bucket and the permissions users have to view and modify
   *          that status. To use GET, you must be the bucket owner.</p>
   *
   *          <p>The following operations are related to <code>GetBucketLogging</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLogging.html">PutBucketLogging</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketLogging(
    args: GetBucketLoggingCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketLoggingCommandOutput>;
  public getBucketLogging(
    args: GetBucketLoggingCommandInput,
    cb: (err: any, data?: GetBucketLoggingCommandOutput) => void
  ): void;
  public getBucketLogging(
    args: GetBucketLoggingCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketLoggingCommandOutput) => void
  ): void;
  public getBucketLogging(
    args: GetBucketLoggingCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketLoggingCommandOutput) => void),
    cb?: (err: any, data?: GetBucketLoggingCommandOutput) => void
  ): Promise<GetBucketLoggingCommandOutput> | void {
    const command = new GetBucketLoggingCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets a metrics configuration (specified by the metrics configuration ID) from the
   *          bucket. Note that this doesn't include the daily storage metrics.</p>
   *
   *          <p> To use this operation, you must have permissions to perform the
   *             <code>s3:GetMetricsConfiguration</code> action. The bucket owner has this permission by
   *          default. The bucket owner can grant this permission to others. For more information about
   *          permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>.</p>
   *
   *          <p> For information about CloudWatch request metrics for Amazon S3, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html">Monitoring Metrics with Amazon
   *             CloudWatch</a>.</p>
   *
   *          <p>The following operations are related to
   *          <code>GetBucketMetricsConfiguration</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketMetricsConfiguration.html">PutBucketMetricsConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketMetricsConfiguration.html">DeleteBucketMetricsConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBucketMetricsConfigurations.html">ListBucketMetricsConfigurations</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html">Monitoring Metrics with Amazon
   *                   CloudWatch</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketMetricsConfiguration(
    args: GetBucketMetricsConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketMetricsConfigurationCommandOutput>;
  public getBucketMetricsConfiguration(
    args: GetBucketMetricsConfigurationCommandInput,
    cb: (err: any, data?: GetBucketMetricsConfigurationCommandOutput) => void
  ): void;
  public getBucketMetricsConfiguration(
    args: GetBucketMetricsConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketMetricsConfigurationCommandOutput) => void
  ): void;
  public getBucketMetricsConfiguration(
    args: GetBucketMetricsConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketMetricsConfigurationCommandOutput) => void),
    cb?: (err: any, data?: GetBucketMetricsConfigurationCommandOutput) => void
  ): Promise<GetBucketMetricsConfigurationCommandOutput> | void {
    const command = new GetBucketMetricsConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns the notification configuration of a bucket.</p>
   *          <p>If notifications are not enabled on the bucket, the operation returns an empty
   *             <code>NotificationConfiguration</code> element.</p>
   *
   *          <p>By default, you must be the bucket owner to read the notification configuration of a
   *          bucket. However, the bucket owner can use a bucket policy to grant permission to other
   *          users to read this configuration with the <code>s3:GetBucketNotification</code>
   *          permission.</p>
   *
   *          <p>For more information about setting and reading the notification configuration on a
   *          bucket, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html">Setting Up Notification of
   *             Bucket Events</a>. For more information about bucket policies, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-iam-policies.html">Using Bucket Policies</a>.</p>
   *
   *          <p>The following operation is related to <code>GetBucketNotification</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketNotification.html">PutBucketNotification</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketNotificationConfiguration(
    args: GetBucketNotificationConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketNotificationConfigurationCommandOutput>;
  public getBucketNotificationConfiguration(
    args: GetBucketNotificationConfigurationCommandInput,
    cb: (err: any, data?: GetBucketNotificationConfigurationCommandOutput) => void
  ): void;
  public getBucketNotificationConfiguration(
    args: GetBucketNotificationConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketNotificationConfigurationCommandOutput) => void
  ): void;
  public getBucketNotificationConfiguration(
    args: GetBucketNotificationConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketNotificationConfigurationCommandOutput) => void),
    cb?: (err: any, data?: GetBucketNotificationConfigurationCommandOutput) => void
  ): Promise<GetBucketNotificationConfigurationCommandOutput> | void {
    const command = new GetBucketNotificationConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves <code>OwnershipControls</code> for an Amazon S3 bucket. To use this operation, you
   *          must have the <code>s3:GetBucketOwnershipControls</code> permission. For more information
   *          about Amazon S3 permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html">Specifying
   *             Permissions in a Policy</a>. </p>
   *          <p>For information about Amazon S3 Object Ownership, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html">Using Object Ownership</a>. </p>
   *          <p>The following operations are related to <code>GetBucketOwnershipControls</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a>PutBucketOwnershipControls</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a>DeleteBucketOwnershipControls</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketOwnershipControls(
    args: GetBucketOwnershipControlsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketOwnershipControlsCommandOutput>;
  public getBucketOwnershipControls(
    args: GetBucketOwnershipControlsCommandInput,
    cb: (err: any, data?: GetBucketOwnershipControlsCommandOutput) => void
  ): void;
  public getBucketOwnershipControls(
    args: GetBucketOwnershipControlsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketOwnershipControlsCommandOutput) => void
  ): void;
  public getBucketOwnershipControls(
    args: GetBucketOwnershipControlsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketOwnershipControlsCommandOutput) => void),
    cb?: (err: any, data?: GetBucketOwnershipControlsCommandOutput) => void
  ): Promise<GetBucketOwnershipControlsCommandOutput> | void {
    const command = new GetBucketOwnershipControlsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns the policy of a specified bucket. If you are using an identity other than the
   *          root user of the AWS account that owns the bucket, the calling identity must have the
   *             <code>GetBucketPolicy</code> permissions on the specified bucket and belong to the
   *          bucket owner's account in order to use this operation.</p>
   *
   *          <p>If you don't have <code>GetBucketPolicy</code> permissions, Amazon S3 returns a <code>403
   *             Access Denied</code> error. If you have the correct permissions, but you're not using an
   *          identity that belongs to the bucket owner's account, Amazon S3 returns a <code>405 Method Not
   *             Allowed</code> error.</p>
   *
   *          <important>
   *             <p>As a security precaution, the root user of the AWS account that owns a bucket can
   *             always use this operation, even if the policy explicitly denies the root user the
   *             ability to perform this action.</p>
   *          </important>
   *
   *          <p>For more information about bucket policies, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-iam-policies.html">Using Bucket Policies and User
   *             Policies</a>.</p>
   *
   *          <p>The following operation is related to <code>GetBucketPolicy</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketPolicy(
    args: GetBucketPolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketPolicyCommandOutput>;
  public getBucketPolicy(
    args: GetBucketPolicyCommandInput,
    cb: (err: any, data?: GetBucketPolicyCommandOutput) => void
  ): void;
  public getBucketPolicy(
    args: GetBucketPolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketPolicyCommandOutput) => void
  ): void;
  public getBucketPolicy(
    args: GetBucketPolicyCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketPolicyCommandOutput) => void),
    cb?: (err: any, data?: GetBucketPolicyCommandOutput) => void
  ): Promise<GetBucketPolicyCommandOutput> | void {
    const command = new GetBucketPolicyCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves the policy status for an Amazon S3 bucket, indicating whether the bucket is public.
   *          In order to use this operation, you must have the <code>s3:GetBucketPolicyStatus</code>
   *          permission. For more information about Amazon S3 permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html">Specifying Permissions in a
   *          Policy</a>.</p>
   *
   *          <p> For more information about when Amazon S3 considers a bucket public, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html#access-control-block-public-access-policy-status">The Meaning of "Public"</a>. </p>
   *
   *          <p>The following operations are related to <code>GetBucketPolicyStatus</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html">Using Amazon S3 Block
   *                   Public Access</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetPublicAccessBlock.html">GetPublicAccessBlock</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutPublicAccessBlock.html">PutPublicAccessBlock</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeletePublicAccessBlock.html">DeletePublicAccessBlock</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketPolicyStatus(
    args: GetBucketPolicyStatusCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketPolicyStatusCommandOutput>;
  public getBucketPolicyStatus(
    args: GetBucketPolicyStatusCommandInput,
    cb: (err: any, data?: GetBucketPolicyStatusCommandOutput) => void
  ): void;
  public getBucketPolicyStatus(
    args: GetBucketPolicyStatusCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketPolicyStatusCommandOutput) => void
  ): void;
  public getBucketPolicyStatus(
    args: GetBucketPolicyStatusCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketPolicyStatusCommandOutput) => void),
    cb?: (err: any, data?: GetBucketPolicyStatusCommandOutput) => void
  ): Promise<GetBucketPolicyStatusCommandOutput> | void {
    const command = new GetBucketPolicyStatusCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns the replication configuration of a bucket.</p>
   *          <note>
   *             <p> It can take a while to propagate the put or delete a replication configuration to
   *             all Amazon S3 systems. Therefore, a get request soon after put or delete can return a wrong
   *             result. </p>
   *          </note>
   *          <p> For information about replication configuration, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/replication.html">Replication</a> in the
   *             <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *
   *          <p>This operation requires permissions for the <code>s3:GetReplicationConfiguration</code>
   *          action. For more information about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-iam-policies.html">Using Bucket Policies and User
   *             Policies</a>.</p>
   *
   *          <p>If you include the <code>Filter</code> element in a replication configuration, you must
   *          also include the <code>DeleteMarkerReplication</code> and <code>Priority</code> elements.
   *          The response also returns those elements.</p>
   *
   *          <p>For information about <code>GetBucketReplication</code> errors, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/ErrorResponses.html#ReplicationErrorCodeList">List of
   *             replication-related error codes</a>
   *          </p>
   *
   *
   *          <p>The following operations are related to <code>GetBucketReplication</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketReplication.html">PutBucketReplication</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketReplication.html">DeleteBucketReplication</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketReplication(
    args: GetBucketReplicationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketReplicationCommandOutput>;
  public getBucketReplication(
    args: GetBucketReplicationCommandInput,
    cb: (err: any, data?: GetBucketReplicationCommandOutput) => void
  ): void;
  public getBucketReplication(
    args: GetBucketReplicationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketReplicationCommandOutput) => void
  ): void;
  public getBucketReplication(
    args: GetBucketReplicationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketReplicationCommandOutput) => void),
    cb?: (err: any, data?: GetBucketReplicationCommandOutput) => void
  ): Promise<GetBucketReplicationCommandOutput> | void {
    const command = new GetBucketReplicationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns the request payment configuration of a bucket. To use this version of the
   *          operation, you must be the bucket owner. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/RequesterPaysBuckets.html">Requester Pays Buckets</a>.</p>
   *
   *          <p>The following operations are related to <code>GetBucketRequestPayment</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjects.html">ListObjects</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketRequestPayment(
    args: GetBucketRequestPaymentCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketRequestPaymentCommandOutput>;
  public getBucketRequestPayment(
    args: GetBucketRequestPaymentCommandInput,
    cb: (err: any, data?: GetBucketRequestPaymentCommandOutput) => void
  ): void;
  public getBucketRequestPayment(
    args: GetBucketRequestPaymentCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketRequestPaymentCommandOutput) => void
  ): void;
  public getBucketRequestPayment(
    args: GetBucketRequestPaymentCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketRequestPaymentCommandOutput) => void),
    cb?: (err: any, data?: GetBucketRequestPaymentCommandOutput) => void
  ): Promise<GetBucketRequestPaymentCommandOutput> | void {
    const command = new GetBucketRequestPaymentCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns the tag set associated with the bucket.</p>
   *          <p>To use this operation, you must have permission to perform the
   *             <code>s3:GetBucketTagging</code> action. By default, the bucket owner has this
   *          permission and can grant this permission to others.</p>
   *
   *          <p>
   *             <code>GetBucketTagging</code> has the following special error:</p>
   *          <ul>
   *             <li>
   *                <p>Error code: <code>NoSuchTagSetError</code>
   *                </p>
   *                <ul>
   *                   <li>
   *                      <p>Description: There is no tag set associated with the bucket.</p>
   *                   </li>
   *                </ul>
   *             </li>
   *          </ul>
   *
   *          <p>The following operations are related to <code>GetBucketTagging</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketTagging.html">PutBucketTagging</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketTagging.html">DeleteBucketTagging</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketTagging(
    args: GetBucketTaggingCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketTaggingCommandOutput>;
  public getBucketTagging(
    args: GetBucketTaggingCommandInput,
    cb: (err: any, data?: GetBucketTaggingCommandOutput) => void
  ): void;
  public getBucketTagging(
    args: GetBucketTaggingCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketTaggingCommandOutput) => void
  ): void;
  public getBucketTagging(
    args: GetBucketTaggingCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketTaggingCommandOutput) => void),
    cb?: (err: any, data?: GetBucketTaggingCommandOutput) => void
  ): Promise<GetBucketTaggingCommandOutput> | void {
    const command = new GetBucketTaggingCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns the versioning state of a bucket.</p>
   *          <p>To retrieve the versioning state of a bucket, you must be the bucket owner.</p>
   *
   *          <p>This implementation also returns the MFA Delete status of the versioning state. If the
   *          MFA Delete status is <code>enabled</code>, the bucket owner must use an authentication
   *          device to change the versioning state of the bucket.</p>
   *
   *          <p>The following operations are related to <code>GetBucketVersioning</code>:</p>
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
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObject.html">DeleteObject</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketVersioning(
    args: GetBucketVersioningCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketVersioningCommandOutput>;
  public getBucketVersioning(
    args: GetBucketVersioningCommandInput,
    cb: (err: any, data?: GetBucketVersioningCommandOutput) => void
  ): void;
  public getBucketVersioning(
    args: GetBucketVersioningCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketVersioningCommandOutput) => void
  ): void;
  public getBucketVersioning(
    args: GetBucketVersioningCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketVersioningCommandOutput) => void),
    cb?: (err: any, data?: GetBucketVersioningCommandOutput) => void
  ): Promise<GetBucketVersioningCommandOutput> | void {
    const command = new GetBucketVersioningCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns the website configuration for a bucket. To host website on Amazon S3, you can
   *          configure a bucket as website by adding a website configuration. For more information about
   *          hosting websites, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html">Hosting Websites on
   *             Amazon S3</a>. </p>
   *          <p>This GET operation requires the <code>S3:GetBucketWebsite</code> permission. By default,
   *          only the bucket owner can read the bucket website configuration. However, bucket owners can
   *          allow other users to read the website configuration by writing a bucket policy granting
   *          them the <code>S3:GetBucketWebsite</code> permission.</p>
   *          <p>The following operations are related to <code>DeleteBucketWebsite</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketWebsite.html">DeleteBucketWebsite</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketWebsite.html">PutBucketWebsite</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getBucketWebsite(
    args: GetBucketWebsiteCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBucketWebsiteCommandOutput>;
  public getBucketWebsite(
    args: GetBucketWebsiteCommandInput,
    cb: (err: any, data?: GetBucketWebsiteCommandOutput) => void
  ): void;
  public getBucketWebsite(
    args: GetBucketWebsiteCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBucketWebsiteCommandOutput) => void
  ): void;
  public getBucketWebsite(
    args: GetBucketWebsiteCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBucketWebsiteCommandOutput) => void),
    cb?: (err: any, data?: GetBucketWebsiteCommandOutput) => void
  ): Promise<GetBucketWebsiteCommandOutput> | void {
    const command = new GetBucketWebsiteCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves objects from Amazon S3. To use <code>GET</code>, you must have <code>READ</code>
   *          access to the object. If you grant <code>READ</code> access to the anonymous user, you can
   *          return the object without using an authorization header.</p>
   *
   *          <p>An Amazon S3 bucket has no directory hierarchy such as you would find in a typical computer
   *          file system. You can, however, create a logical hierarchy by using object key names that
   *          imply a folder structure. For example, instead of naming an object <code>sample.jpg</code>,
   *          you can name it <code>photos/2006/February/sample.jpg</code>.</p>
   *
   *          <p>To get an object from such a logical hierarchy, specify the full key name for the object
   *          in the <code>GET</code> operation. For a virtual hosted-style request example, if you have
   *          the object <code>photos/2006/February/sample.jpg</code>, specify the resource as
   *             <code>/photos/2006/February/sample.jpg</code>. For a path-style request example, if you
   *          have the object <code>photos/2006/February/sample.jpg</code> in the bucket named
   *             <code>examplebucket</code>, specify the resource as
   *             <code>/examplebucket/photos/2006/February/sample.jpg</code>. For more information about
   *          request types, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/VirtualHosting.html#VirtualHostingSpecifyBucket">HTTP Host Header Bucket Specification</a>.</p>
   *
   *          <p>To distribute large files to many people, you can save bandwidth costs by using
   *          BitTorrent. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/S3Torrent.html">Amazon S3
   *             Torrent</a>. For more information about returning the ACL of an object, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObjectAcl.html">GetObjectAcl</a>.</p>
   *
   *          <p>If the object you are retrieving is stored in the S3 Glacier or
   *          S3 Glacier Deep Archive storage class, or S3 Intelligent-Tiering Archive or
   *          S3 Intelligent-Tiering Deep Archive tiers, before you can retrieve the object you must first restore a
   *          copy using <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_RestoreObject.html">RestoreObject</a>. Otherwise, this operation returns an
   *             <code>InvalidObjectStateError</code> error. For information about restoring archived
   *          objects, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/restoring-objects.html">Restoring Archived
   *             Objects</a>.</p>
   *
   *          <p>Encryption request headers, like <code>x-amz-server-side-encryption</code>, should not
   *          be sent for GET requests if your object uses server-side encryption with CMKs stored in AWS
   *          KMS (SSE-KMS) or server-side encryption with Amazon S3–managed encryption keys (SSE-S3). If your
   *          object does use these types of keys, you’ll get an HTTP 400 BadRequest error.</p>
   *          <p>If you encrypt an object by using server-side encryption with customer-provided
   *          encryption keys (SSE-C) when you store the object in Amazon S3, then when you GET the object,
   *          you must use the following headers:</p>
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
   *
   *          <p>Assuming you have permission to read object tags (permission for the
   *             <code>s3:GetObjectVersionTagging</code> action), the response also returns the
   *             <code>x-amz-tagging-count</code> header that provides the count of number of tags
   *          associated with the object. You can use <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObjectTagging.html">GetObjectTagging</a> to retrieve
   *          the tag set associated with an object.</p>
   *
   *          <p>
   *             <b>Permissions</b>
   *          </p>
   *          <p>You need the <code>s3:GetObject</code> permission for this operation. For more
   *          information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html">Specifying Permissions
   *             in a Policy</a>. If the object you request does not exist, the error Amazon S3 returns
   *          depends on whether you also have the <code>s3:ListBucket</code> permission.</p>
   *          <ul>
   *             <li>
   *                <p>If you have the <code>s3:ListBucket</code> permission on the bucket, Amazon S3 will
   *                return an HTTP status code 404 ("no such key") error.</p>
   *             </li>
   *             <li>
   *                <p>If you don’t have the <code>s3:ListBucket</code> permission, Amazon S3 will return an
   *                HTTP status code 403 ("access denied") error.</p>
   *             </li>
   *          </ul>
   *
   *
   *          <p>
   *             <b>Versioning</b>
   *          </p>
   *          <p>By default, the GET operation returns the current version of an object. To return a
   *          different version, use the <code>versionId</code> subresource.</p>
   *
   *          <note>
   *             <p>If the current version of the object is a delete marker, Amazon S3 behaves as if the
   *             object was deleted and includes <code>x-amz-delete-marker: true</code> in the
   *             response.</p>
   *          </note>
   *
   *
   *          <p>For more information about versioning, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketVersioning.html">PutBucketVersioning</a>. </p>
   *
   *          <p>
   *             <b>Overriding Response Header Values</b>
   *          </p>
   *          <p>There are times when you want to override certain response header values in a GET
   *          response. For example, you might override the Content-Disposition response header value in
   *          your GET request.</p>
   *
   *          <p>You can override values for a set of response headers using the following query
   *          parameters. These response header values are sent only on a successful request, that is,
   *          when status code 200 OK is returned. The set of headers you can override using these
   *          parameters is a subset of the headers that Amazon S3 accepts when you create an object. The
   *          response headers that you can override for the GET response are <code>Content-Type</code>,
   *             <code>Content-Language</code>, <code>Expires</code>, <code>Cache-Control</code>,
   *             <code>Content-Disposition</code>, and <code>Content-Encoding</code>. To override these
   *          header values in the GET response, you use the following request parameters.</p>
   *
   *          <note>
   *             <p>You must sign the request, either using an Authorization header or a presigned URL,
   *             when using these parameters. They cannot be used with an unsigned (anonymous)
   *             request.</p>
   *          </note>
   *          <ul>
   *             <li>
   *                <p>
   *                   <code>response-content-type</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>response-content-language</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>response-expires</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>response-cache-control</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>response-content-disposition</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>response-content-encoding</code>
   *                </p>
   *             </li>
   *          </ul>
   *
   *          <p>
   *             <b>Additional Considerations about Request Headers</b>
   *          </p>
   *
   *          <p>If both of the <code>If-Match</code> and <code>If-Unmodified-Since</code> headers are
   *          present in the request as follows: <code>If-Match</code> condition evaluates to
   *             <code>true</code>, and; <code>If-Unmodified-Since</code> condition evaluates to
   *             <code>false</code>; then, S3 returns 200 OK and the data requested. </p>
   *
   *          <p>If both of the <code>If-None-Match</code> and <code>If-Modified-Since</code> headers are
   *          present in the request as follows:<code> If-None-Match</code> condition evaluates to
   *             <code>false</code>, and; <code>If-Modified-Since</code> condition evaluates to
   *             <code>true</code>; then, S3 returns 304 Not Modified response code.</p>
   *
   *          <p>For more information about conditional requests, see <a href="https://tools.ietf.org/html/rfc7232">RFC 7232</a>.</p>
   *
   *          <p>The following operations are related to <code>GetObject</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBuckets.html">ListBuckets</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObjectAcl.html">GetObjectAcl</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getObject(args: GetObjectCommandInput, options?: __HttpHandlerOptions): Promise<GetObjectCommandOutput>;
  public getObject(args: GetObjectCommandInput, cb: (err: any, data?: GetObjectCommandOutput) => void): void;
  public getObject(
    args: GetObjectCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetObjectCommandOutput) => void
  ): void;
  public getObject(
    args: GetObjectCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetObjectCommandOutput) => void),
    cb?: (err: any, data?: GetObjectCommandOutput) => void
  ): Promise<GetObjectCommandOutput> | void {
    const command = new GetObjectCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns the access control list (ACL) of an object. To use this operation, you must have
   *             <code>READ_ACP</code> access to the object.</p>
   *          <p>This action is not supported by Amazon S3 on Outposts.</p>
   *             <p>
   *             <b>Versioning</b>
   *          </p>
   *          <p>By default, GET returns ACL information about the current version of an object. To
   *          return ACL information about a different version, use the versionId subresource.</p>
   *
   *          <p>The following operations are related to <code>GetObjectAcl</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObject.html">DeleteObject</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html">PutObject</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getObjectAcl(
    args: GetObjectAclCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetObjectAclCommandOutput>;
  public getObjectAcl(args: GetObjectAclCommandInput, cb: (err: any, data?: GetObjectAclCommandOutput) => void): void;
  public getObjectAcl(
    args: GetObjectAclCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetObjectAclCommandOutput) => void
  ): void;
  public getObjectAcl(
    args: GetObjectAclCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetObjectAclCommandOutput) => void),
    cb?: (err: any, data?: GetObjectAclCommandOutput) => void
  ): Promise<GetObjectAclCommandOutput> | void {
    const command = new GetObjectAclCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets an object's current Legal Hold status. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock.html">Locking Objects</a>.</p>
   *          <p>This action is not supported by Amazon S3 on Outposts.</p>
   */
  public getObjectLegalHold(
    args: GetObjectLegalHoldCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetObjectLegalHoldCommandOutput>;
  public getObjectLegalHold(
    args: GetObjectLegalHoldCommandInput,
    cb: (err: any, data?: GetObjectLegalHoldCommandOutput) => void
  ): void;
  public getObjectLegalHold(
    args: GetObjectLegalHoldCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetObjectLegalHoldCommandOutput) => void
  ): void;
  public getObjectLegalHold(
    args: GetObjectLegalHoldCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetObjectLegalHoldCommandOutput) => void),
    cb?: (err: any, data?: GetObjectLegalHoldCommandOutput) => void
  ): Promise<GetObjectLegalHoldCommandOutput> | void {
    const command = new GetObjectLegalHoldCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets the Object Lock configuration for a bucket. The rule specified in the Object Lock
   *          configuration will be applied by default to every new object placed in the specified
   *          bucket. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock.html">Locking
   *             Objects</a>.</p>
   */
  public getObjectLockConfiguration(
    args: GetObjectLockConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetObjectLockConfigurationCommandOutput>;
  public getObjectLockConfiguration(
    args: GetObjectLockConfigurationCommandInput,
    cb: (err: any, data?: GetObjectLockConfigurationCommandOutput) => void
  ): void;
  public getObjectLockConfiguration(
    args: GetObjectLockConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetObjectLockConfigurationCommandOutput) => void
  ): void;
  public getObjectLockConfiguration(
    args: GetObjectLockConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetObjectLockConfigurationCommandOutput) => void),
    cb?: (err: any, data?: GetObjectLockConfigurationCommandOutput) => void
  ): Promise<GetObjectLockConfigurationCommandOutput> | void {
    const command = new GetObjectLockConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves an object's retention settings. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock.html">Locking Objects</a>.</p>
   *          <p>This action is not supported by Amazon S3 on Outposts.</p>
   */
  public getObjectRetention(
    args: GetObjectRetentionCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetObjectRetentionCommandOutput>;
  public getObjectRetention(
    args: GetObjectRetentionCommandInput,
    cb: (err: any, data?: GetObjectRetentionCommandOutput) => void
  ): void;
  public getObjectRetention(
    args: GetObjectRetentionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetObjectRetentionCommandOutput) => void
  ): void;
  public getObjectRetention(
    args: GetObjectRetentionCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetObjectRetentionCommandOutput) => void),
    cb?: (err: any, data?: GetObjectRetentionCommandOutput) => void
  ): Promise<GetObjectRetentionCommandOutput> | void {
    const command = new GetObjectRetentionCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns the tag-set of an object. You send the GET request against the tagging
   *          subresource associated with the object.</p>
   *
   *          <p>To use this operation, you must have permission to perform the
   *             <code>s3:GetObjectTagging</code> action. By default, the GET operation returns
   *          information about current version of an object. For a versioned bucket, you can have
   *          multiple versions of an object in your bucket. To retrieve tags of any other version, use
   *          the versionId query parameter. You also need permission for the
   *             <code>s3:GetObjectVersionTagging</code> action.</p>
   *
   *          <p> By default, the bucket owner has this permission and can grant this permission to
   *          others.</p>
   *
   *          <p> For information about the Amazon S3 object tagging feature, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-tagging.html">Object Tagging</a>.</p>
   *
   *          <p>The following operation is related to <code>GetObjectTagging</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObjectTagging.html">PutObjectTagging</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getObjectTagging(
    args: GetObjectTaggingCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetObjectTaggingCommandOutput>;
  public getObjectTagging(
    args: GetObjectTaggingCommandInput,
    cb: (err: any, data?: GetObjectTaggingCommandOutput) => void
  ): void;
  public getObjectTagging(
    args: GetObjectTaggingCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetObjectTaggingCommandOutput) => void
  ): void;
  public getObjectTagging(
    args: GetObjectTaggingCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetObjectTaggingCommandOutput) => void),
    cb?: (err: any, data?: GetObjectTaggingCommandOutput) => void
  ): Promise<GetObjectTaggingCommandOutput> | void {
    const command = new GetObjectTaggingCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns torrent files from a bucket. BitTorrent can save you bandwidth when you're
   *          distributing large files. For more information about BitTorrent, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/S3Torrent.html">Using BitTorrent with Amazon S3</a>.</p>
   *          <note>
   *             <p>You can get torrent only for objects that are less than 5 GB in size, and that are
   *             not encrypted using server-side encryption with a customer-provided encryption
   *             key.</p>
   *          </note>
   *          <p>To use GET, you must have READ access to the object.</p>
   *          <p>This action is not supported by Amazon S3 on Outposts.</p>
   *          <p>The following operation is related to <code>GetObjectTorrent</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getObjectTorrent(
    args: GetObjectTorrentCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetObjectTorrentCommandOutput>;
  public getObjectTorrent(
    args: GetObjectTorrentCommandInput,
    cb: (err: any, data?: GetObjectTorrentCommandOutput) => void
  ): void;
  public getObjectTorrent(
    args: GetObjectTorrentCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetObjectTorrentCommandOutput) => void
  ): void;
  public getObjectTorrent(
    args: GetObjectTorrentCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetObjectTorrentCommandOutput) => void),
    cb?: (err: any, data?: GetObjectTorrentCommandOutput) => void
  ): Promise<GetObjectTorrentCommandOutput> | void {
    const command = new GetObjectTorrentCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves the <code>PublicAccessBlock</code> configuration for an Amazon S3 bucket. To use
   *          this operation, you must have the <code>s3:GetBucketPublicAccessBlock</code> permission.
   *          For more information about Amazon S3 permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html">Specifying Permissions in a
   *          Policy</a>.</p>
   *
   *          <important>
   *             <p>When Amazon S3 evaluates the <code>PublicAccessBlock</code> configuration for a bucket or
   *             an object, it checks the <code>PublicAccessBlock</code> configuration for both the
   *             bucket (or the bucket that contains the object) and the bucket owner's account. If the
   *                <code>PublicAccessBlock</code> settings are different between the bucket and the
   *             account, Amazon S3 uses the most restrictive combination of the bucket-level and
   *             account-level settings.</p>
   *          </important>
   *
   *          <p>For more information about when Amazon S3 considers a bucket or an object public, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html#access-control-block-public-access-policy-status">The Meaning of "Public"</a>.</p>
   *
   *          <p>The following operations are related to <code>GetPublicAccessBlock</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html">Using Amazon S3 Block
   *                   Public Access</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutPublicAccessBlock.html">PutPublicAccessBlock</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetPublicAccessBlock.html">GetPublicAccessBlock</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeletePublicAccessBlock.html">DeletePublicAccessBlock</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public getPublicAccessBlock(
    args: GetPublicAccessBlockCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetPublicAccessBlockCommandOutput>;
  public getPublicAccessBlock(
    args: GetPublicAccessBlockCommandInput,
    cb: (err: any, data?: GetPublicAccessBlockCommandOutput) => void
  ): void;
  public getPublicAccessBlock(
    args: GetPublicAccessBlockCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetPublicAccessBlockCommandOutput) => void
  ): void;
  public getPublicAccessBlock(
    args: GetPublicAccessBlockCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetPublicAccessBlockCommandOutput) => void),
    cb?: (err: any, data?: GetPublicAccessBlockCommandOutput) => void
  ): Promise<GetPublicAccessBlockCommandOutput> | void {
    const command = new GetPublicAccessBlockCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>This operation is useful to determine if a bucket exists and you have permission to
   *          access it. The operation returns a <code>200 OK</code> if the bucket exists and you have
   *          permission to access it. Otherwise, the operation might return responses such as <code>404
   *             Not Found</code> and <code>403 Forbidden</code>. </p>
   *
   *          <p>To use this operation, you must have permissions to perform the
   *             <code>s3:ListBucket</code> action. The bucket owner has this permission by default and
   *          can grant this permission to others. For more information about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>.</p>
   */
  public headBucket(args: HeadBucketCommandInput, options?: __HttpHandlerOptions): Promise<HeadBucketCommandOutput>;
  public headBucket(args: HeadBucketCommandInput, cb: (err: any, data?: HeadBucketCommandOutput) => void): void;
  public headBucket(
    args: HeadBucketCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: HeadBucketCommandOutput) => void
  ): void;
  public headBucket(
    args: HeadBucketCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: HeadBucketCommandOutput) => void),
    cb?: (err: any, data?: HeadBucketCommandOutput) => void
  ): Promise<HeadBucketCommandOutput> | void {
    const command = new HeadBucketCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public headObject(args: HeadObjectCommandInput, options?: __HttpHandlerOptions): Promise<HeadObjectCommandOutput>;
  public headObject(args: HeadObjectCommandInput, cb: (err: any, data?: HeadObjectCommandOutput) => void): void;
  public headObject(
    args: HeadObjectCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: HeadObjectCommandOutput) => void
  ): void;
  public headObject(
    args: HeadObjectCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: HeadObjectCommandOutput) => void),
    cb?: (err: any, data?: HeadObjectCommandOutput) => void
  ): Promise<HeadObjectCommandOutput> | void {
    const command = new HeadObjectCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Lists the analytics configurations for the bucket. You can have up to 1,000 analytics
   *          configurations per bucket.</p>
   *
   *          <p>This operation supports list pagination and does not return more than 100 configurations
   *          at a time. You should always check the <code>IsTruncated</code> element in the response. If
   *          there are no more configurations to list, <code>IsTruncated</code> is set to false. If
   *          there are more configurations to list, <code>IsTruncated</code> is set to true, and there
   *          will be a value in <code>NextContinuationToken</code>. You use the
   *             <code>NextContinuationToken</code> value to continue the pagination of the list by
   *          passing the value in continuation-token in the request to <code>GET</code> the next
   *          page.</p>
   *
   *          <p>To use this operation, you must have permissions to perform the
   *             <code>s3:GetAnalyticsConfiguration</code> action. The bucket owner has this permission
   *          by default. The bucket owner can grant this permission to others. For more information
   *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>.</p>
   *
   *          <p>For information about Amazon S3 analytics feature, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/analytics-storage-class.html">Amazon S3 Analytics – Storage Class
   *             Analysis</a>. </p>
   *
   *          <p>The following operations are related to
   *          <code>ListBucketAnalyticsConfigurations</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketAnalyticsConfiguration.html">GetBucketAnalyticsConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketAnalyticsConfiguration.html">DeleteBucketAnalyticsConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketAnalyticsConfiguration.html">PutBucketAnalyticsConfiguration</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public listBucketAnalyticsConfigurations(
    args: ListBucketAnalyticsConfigurationsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListBucketAnalyticsConfigurationsCommandOutput>;
  public listBucketAnalyticsConfigurations(
    args: ListBucketAnalyticsConfigurationsCommandInput,
    cb: (err: any, data?: ListBucketAnalyticsConfigurationsCommandOutput) => void
  ): void;
  public listBucketAnalyticsConfigurations(
    args: ListBucketAnalyticsConfigurationsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListBucketAnalyticsConfigurationsCommandOutput) => void
  ): void;
  public listBucketAnalyticsConfigurations(
    args: ListBucketAnalyticsConfigurationsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListBucketAnalyticsConfigurationsCommandOutput) => void),
    cb?: (err: any, data?: ListBucketAnalyticsConfigurationsCommandOutput) => void
  ): Promise<ListBucketAnalyticsConfigurationsCommandOutput> | void {
    const command = new ListBucketAnalyticsConfigurationsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Lists the S3 Intelligent-Tiering configuration from the specified bucket.</p>
   *          <p>The S3 Intelligent-Tiering storage class is designed to optimize storage costs by automatically moving data to the most cost-effective storage access tier, without additional operational overhead. S3 Intelligent-Tiering delivers automatic cost savings by moving data between access tiers, when access patterns change.</p>
   *          <p>The S3 Intelligent-Tiering storage class is suitable for objects larger than 128 KB that you plan to store for at least 30 days. If the size of an object is less than 128 KB, it is not eligible for auto-tiering. Smaller objects can be stored, but they are always charged at the frequent access tier rates in the S3 Intelligent-Tiering storage class. </p>
   *          <p>If you delete an object before the end of the 30-day minimum storage duration period, you are charged for 30 days. For more information, see  <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html#sc-dynamic-data-access">Storage class for automatically optimizing frequently and infrequently accessed objects</a>.</p>
   *          <p>Operations related to
   *             <code>ListBucketIntelligentTieringConfigurations</code> include: </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketIntelligentTieringConfiguration.html">DeleteBucketIntelligentTieringConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketIntelligentTieringConfiguration.html">PutBucketIntelligentTieringConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketIntelligentTieringConfiguration.html">GetBucketIntelligentTieringConfiguration</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public listBucketIntelligentTieringConfigurations(
    args: ListBucketIntelligentTieringConfigurationsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListBucketIntelligentTieringConfigurationsCommandOutput>;
  public listBucketIntelligentTieringConfigurations(
    args: ListBucketIntelligentTieringConfigurationsCommandInput,
    cb: (err: any, data?: ListBucketIntelligentTieringConfigurationsCommandOutput) => void
  ): void;
  public listBucketIntelligentTieringConfigurations(
    args: ListBucketIntelligentTieringConfigurationsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListBucketIntelligentTieringConfigurationsCommandOutput) => void
  ): void;
  public listBucketIntelligentTieringConfigurations(
    args: ListBucketIntelligentTieringConfigurationsCommandInput,
    optionsOrCb?:
      | __HttpHandlerOptions
      | ((err: any, data?: ListBucketIntelligentTieringConfigurationsCommandOutput) => void),
    cb?: (err: any, data?: ListBucketIntelligentTieringConfigurationsCommandOutput) => void
  ): Promise<ListBucketIntelligentTieringConfigurationsCommandOutput> | void {
    const command = new ListBucketIntelligentTieringConfigurationsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns a list of inventory configurations for the bucket. You can have up to 1,000
   *          analytics configurations per bucket.</p>
   *
   *          <p>This operation supports list pagination and does not return more than 100 configurations
   *          at a time. Always check the <code>IsTruncated</code> element in the response. If there are
   *          no more configurations to list, <code>IsTruncated</code> is set to false. If there are more
   *          configurations to list, <code>IsTruncated</code> is set to true, and there is a value in
   *             <code>NextContinuationToken</code>. You use the <code>NextContinuationToken</code> value
   *          to continue the pagination of the list by passing the value in continuation-token in the
   *          request to <code>GET</code> the next page.</p>
   *
   *          <p> To use this operation, you must have permissions to perform the
   *             <code>s3:GetInventoryConfiguration</code> action. The bucket owner has this permission
   *          by default. The bucket owner can grant this permission to others. For more information
   *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>.</p>
   *
   *          <p>For information about the Amazon S3 inventory feature, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-inventory.html">Amazon S3 Inventory</a>
   *          </p>
   *
   *          <p>The following operations are related to
   *          <code>ListBucketInventoryConfigurations</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketInventoryConfiguration.html">GetBucketInventoryConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketInventoryConfiguration.html">DeleteBucketInventoryConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketInventoryConfiguration.html">PutBucketInventoryConfiguration</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public listBucketInventoryConfigurations(
    args: ListBucketInventoryConfigurationsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListBucketInventoryConfigurationsCommandOutput>;
  public listBucketInventoryConfigurations(
    args: ListBucketInventoryConfigurationsCommandInput,
    cb: (err: any, data?: ListBucketInventoryConfigurationsCommandOutput) => void
  ): void;
  public listBucketInventoryConfigurations(
    args: ListBucketInventoryConfigurationsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListBucketInventoryConfigurationsCommandOutput) => void
  ): void;
  public listBucketInventoryConfigurations(
    args: ListBucketInventoryConfigurationsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListBucketInventoryConfigurationsCommandOutput) => void),
    cb?: (err: any, data?: ListBucketInventoryConfigurationsCommandOutput) => void
  ): Promise<ListBucketInventoryConfigurationsCommandOutput> | void {
    const command = new ListBucketInventoryConfigurationsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Lists the metrics configurations for the bucket. The metrics configurations are only for
   *          the request metrics of the bucket and do not provide information on daily storage metrics.
   *          You can have up to 1,000 configurations per bucket.</p>
   *
   *          <p>This operation supports list pagination and does not return more than 100 configurations
   *          at a time. Always check the <code>IsTruncated</code> element in the response. If there are
   *          no more configurations to list, <code>IsTruncated</code> is set to false. If there are more
   *          configurations to list, <code>IsTruncated</code> is set to true, and there is a value in
   *             <code>NextContinuationToken</code>. You use the <code>NextContinuationToken</code> value
   *          to continue the pagination of the list by passing the value in
   *             <code>continuation-token</code> in the request to <code>GET</code> the next page.</p>
   *
   *          <p>To use this operation, you must have permissions to perform the
   *             <code>s3:GetMetricsConfiguration</code> action. The bucket owner has this permission by
   *          default. The bucket owner can grant this permission to others. For more information about
   *          permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>.</p>
   *
   *          <p>For more information about metrics configurations and CloudWatch request metrics, see
   *             <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html">Monitoring Metrics with Amazon
   *             CloudWatch</a>.</p>
   *
   *          <p>The following operations are related to
   *          <code>ListBucketMetricsConfigurations</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketMetricsConfiguration.html">PutBucketMetricsConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketMetricsConfiguration.html">GetBucketMetricsConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketMetricsConfiguration.html">DeleteBucketMetricsConfiguration</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public listBucketMetricsConfigurations(
    args: ListBucketMetricsConfigurationsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListBucketMetricsConfigurationsCommandOutput>;
  public listBucketMetricsConfigurations(
    args: ListBucketMetricsConfigurationsCommandInput,
    cb: (err: any, data?: ListBucketMetricsConfigurationsCommandOutput) => void
  ): void;
  public listBucketMetricsConfigurations(
    args: ListBucketMetricsConfigurationsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListBucketMetricsConfigurationsCommandOutput) => void
  ): void;
  public listBucketMetricsConfigurations(
    args: ListBucketMetricsConfigurationsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListBucketMetricsConfigurationsCommandOutput) => void),
    cb?: (err: any, data?: ListBucketMetricsConfigurationsCommandOutput) => void
  ): Promise<ListBucketMetricsConfigurationsCommandOutput> | void {
    const command = new ListBucketMetricsConfigurationsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns a list of all buckets owned by the authenticated sender of the request.</p>
   */
  public listBuckets(args: ListBucketsCommandInput, options?: __HttpHandlerOptions): Promise<ListBucketsCommandOutput>;
  public listBuckets(args: ListBucketsCommandInput, cb: (err: any, data?: ListBucketsCommandOutput) => void): void;
  public listBuckets(
    args: ListBucketsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListBucketsCommandOutput) => void
  ): void;
  public listBuckets(
    args: ListBucketsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListBucketsCommandOutput) => void),
    cb?: (err: any, data?: ListBucketsCommandOutput) => void
  ): Promise<ListBucketsCommandOutput> | void {
    const command = new ListBucketsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public listMultipartUploads(
    args: ListMultipartUploadsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListMultipartUploadsCommandOutput>;
  public listMultipartUploads(
    args: ListMultipartUploadsCommandInput,
    cb: (err: any, data?: ListMultipartUploadsCommandOutput) => void
  ): void;
  public listMultipartUploads(
    args: ListMultipartUploadsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListMultipartUploadsCommandOutput) => void
  ): void;
  public listMultipartUploads(
    args: ListMultipartUploadsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListMultipartUploadsCommandOutput) => void),
    cb?: (err: any, data?: ListMultipartUploadsCommandOutput) => void
  ): Promise<ListMultipartUploadsCommandOutput> | void {
    const command = new ListMultipartUploadsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns some or all (up to 1,000) of the objects in a bucket. You can use the request
   *          parameters as selection criteria to return a subset of the objects in a bucket. A 200 OK
   *          response can contain valid or invalid XML. Be sure to design your application to parse the
   *          contents of the response and handle it appropriately.</p>
   *          <important>
   *             <p>This API has been revised. We recommend that you use the newer version, <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjectsV2.html">ListObjectsV2</a>, when developing applications. For backward compatibility,
   *             Amazon S3 continues to support <code>ListObjects</code>.</p>
   *          </important>
   *
   *
   *          <p>The following operations are related to <code>ListObjects</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjectsV2.html">ListObjectsV2</a>
   *                </p>
   *             </li>
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
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBuckets.html">ListBuckets</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public listObjects(args: ListObjectsCommandInput, options?: __HttpHandlerOptions): Promise<ListObjectsCommandOutput>;
  public listObjects(args: ListObjectsCommandInput, cb: (err: any, data?: ListObjectsCommandOutput) => void): void;
  public listObjects(
    args: ListObjectsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListObjectsCommandOutput) => void
  ): void;
  public listObjects(
    args: ListObjectsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListObjectsCommandOutput) => void),
    cb?: (err: any, data?: ListObjectsCommandOutput) => void
  ): Promise<ListObjectsCommandOutput> | void {
    const command = new ListObjectsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public listObjectsV2(
    args: ListObjectsV2CommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListObjectsV2CommandOutput>;
  public listObjectsV2(
    args: ListObjectsV2CommandInput,
    cb: (err: any, data?: ListObjectsV2CommandOutput) => void
  ): void;
  public listObjectsV2(
    args: ListObjectsV2CommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListObjectsV2CommandOutput) => void
  ): void;
  public listObjectsV2(
    args: ListObjectsV2CommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListObjectsV2CommandOutput) => void),
    cb?: (err: any, data?: ListObjectsV2CommandOutput) => void
  ): Promise<ListObjectsV2CommandOutput> | void {
    const command = new ListObjectsV2Command(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns metadata about all versions of the objects in a bucket. You can also use request
   *          parameters as selection criteria to return metadata about a subset of all the object
   *          versions. </p>
   *          <note>
   *             <p> A 200 OK response can contain valid or invalid XML. Make sure to design your
   *             application to parse the contents of the response and handle it appropriately.</p>
   *          </note>
   *          <p>To use this operation, you must have READ access to the bucket.</p>
   *          <p>This action is not supported by Amazon S3 on Outposts.</p>
   *          <p>The following operations are related to
   *             <code>ListObjectVersions</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjectsV2.html">ListObjectsV2</a>
   *                </p>
   *             </li>
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
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObject.html">DeleteObject</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public listObjectVersions(
    args: ListObjectVersionsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListObjectVersionsCommandOutput>;
  public listObjectVersions(
    args: ListObjectVersionsCommandInput,
    cb: (err: any, data?: ListObjectVersionsCommandOutput) => void
  ): void;
  public listObjectVersions(
    args: ListObjectVersionsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListObjectVersionsCommandOutput) => void
  ): void;
  public listObjectVersions(
    args: ListObjectVersionsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListObjectVersionsCommandOutput) => void),
    cb?: (err: any, data?: ListObjectVersionsCommandOutput) => void
  ): Promise<ListObjectVersionsCommandOutput> | void {
    const command = new ListObjectVersionsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public listParts(args: ListPartsCommandInput, options?: __HttpHandlerOptions): Promise<ListPartsCommandOutput>;
  public listParts(args: ListPartsCommandInput, cb: (err: any, data?: ListPartsCommandOutput) => void): void;
  public listParts(
    args: ListPartsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListPartsCommandOutput) => void
  ): void;
  public listParts(
    args: ListPartsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListPartsCommandOutput) => void),
    cb?: (err: any, data?: ListPartsCommandOutput) => void
  ): Promise<ListPartsCommandOutput> | void {
    const command = new ListPartsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Sets the accelerate configuration of an existing bucket. Amazon S3 Transfer Acceleration is a
   *          bucket-level feature that enables you to perform faster data transfers to Amazon S3.</p>
   *
   *          <p> To use this operation, you must have permission to perform the
   *          s3:PutAccelerateConfiguration action. The bucket owner has this permission by default. The
   *          bucket owner can grant this permission to others. For more information about permissions,
   *          see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>.</p>
   *
   *          <p> The Transfer Acceleration state of a bucket can be set to one of the following two
   *          values:</p>
   *          <ul>
   *             <li>
   *                <p> Enabled – Enables accelerated data transfers to the bucket.</p>
   *             </li>
   *             <li>
   *                <p> Suspended – Disables accelerated data transfers to the bucket.</p>
   *             </li>
   *          </ul>
   *
   *
   *          <p>The <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketAccelerateConfiguration.html">GetBucketAccelerateConfiguration</a> operation returns the transfer acceleration
   *          state of a bucket.</p>
   *
   *          <p>After setting the Transfer Acceleration state of a bucket to Enabled, it might take up
   *          to thirty minutes before the data transfer rates to the bucket increase.</p>
   *
   *          <p> The name of the bucket used for Transfer Acceleration must be DNS-compliant and must
   *          not contain periods (".").</p>
   *
   *          <p> For more information about transfer acceleration, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html">Transfer Acceleration</a>.</p>
   *
   *          <p>The following operations are related to
   *          <code>PutBucketAccelerateConfiguration</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketAccelerateConfiguration.html">GetBucketAccelerateConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putBucketAccelerateConfiguration(
    args: PutBucketAccelerateConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBucketAccelerateConfigurationCommandOutput>;
  public putBucketAccelerateConfiguration(
    args: PutBucketAccelerateConfigurationCommandInput,
    cb: (err: any, data?: PutBucketAccelerateConfigurationCommandOutput) => void
  ): void;
  public putBucketAccelerateConfiguration(
    args: PutBucketAccelerateConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBucketAccelerateConfigurationCommandOutput) => void
  ): void;
  public putBucketAccelerateConfiguration(
    args: PutBucketAccelerateConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutBucketAccelerateConfigurationCommandOutput) => void),
    cb?: (err: any, data?: PutBucketAccelerateConfigurationCommandOutput) => void
  ): Promise<PutBucketAccelerateConfigurationCommandOutput> | void {
    const command = new PutBucketAccelerateConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Sets the permissions on an existing bucket using access control lists (ACL). For more
   *          information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/S3_ACLs_UsingACLs.html">Using ACLs</a>. To set
   *          the ACL of a bucket, you must have <code>WRITE_ACP</code> permission.</p>
   *
   *          <p>You can use one of the following two ways to set a bucket's permissions:</p>
   *          <ul>
   *             <li>
   *                <p>Specify the ACL in the request body</p>
   *             </li>
   *             <li>
   *                <p>Specify permissions using request headers</p>
   *             </li>
   *          </ul>
   *
   *          <note>
   *             <p>You cannot specify access permission using both the body and the request
   *             headers.</p>
   *          </note>
   *
   *          <p>Depending on your application needs, you may choose to set the ACL on a bucket using
   *          either the request body or the headers. For example, if you have an existing application
   *          that updates a bucket ACL using the request body, then you can continue to use that
   *          approach.</p>
   *
   *
   *          <p>
   *             <b>Access Permissions</b>
   *          </p>
   *          <p>You can set access permissions using one of the following methods:</p>
   *          <ul>
   *             <li>
   *                <p>Specify a canned ACL with the <code>x-amz-acl</code> request header. Amazon S3 supports
   *                a set of predefined ACLs, known as <i>canned ACLs</i>. Each canned ACL
   *                has a predefined set of grantees and permissions. Specify the canned ACL name as the
   *                value of <code>x-amz-acl</code>. If you use this header, you cannot use other access
   *                control-specific headers in your request. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#CannedACL">Canned ACL</a>.</p>
   *             </li>
   *             <li>
   *                <p>Specify access permissions explicitly with the <code>x-amz-grant-read</code>,
   *                   <code>x-amz-grant-read-acp</code>, <code>x-amz-grant-write-acp</code>, and
   *                   <code>x-amz-grant-full-control</code> headers. When using these headers, you
   *                specify explicit access permissions and grantees (AWS accounts or Amazon S3 groups) who
   *                will receive the permission. If you use these ACL-specific headers, you cannot use
   *                the <code>x-amz-acl</code> header to set a canned ACL. These parameters map to the
   *                set of permissions that Amazon S3 supports in an ACL. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html">Access Control List (ACL)
   *                Overview</a>.</p>
   *                <p>You specify each grantee as a type=value pair, where the type is one of the
   *                following:</p>
   *                <ul>
   *                   <li>
   *                      <p>
   *                         <code>id</code> – if the value specified is the canonical user ID of an AWS
   *                      account</p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <code>uri</code> – if you are granting permissions to a predefined
   *                      group</p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <code>emailAddress</code> – if the value specified is the email address of
   *                      an AWS account</p>
   *                      <note>
   *                         <p>Using email addresses to specify a grantee is only supported in the following AWS Regions: </p>
   *                         <ul>
   *                            <li>
   *                               <p>US East (N. Virginia)</p>
   *                            </li>
   *                            <li>
   *                               <p>US West (N. California)</p>
   *                            </li>
   *                            <li>
   *                               <p> US West (Oregon)</p>
   *                            </li>
   *                            <li>
   *                               <p> Asia Pacific (Singapore)</p>
   *                            </li>
   *                            <li>
   *                               <p>Asia Pacific (Sydney)</p>
   *                            </li>
   *                            <li>
   *                               <p>Asia Pacific (Tokyo)</p>
   *                            </li>
   *                            <li>
   *                               <p>Europe (Ireland)</p>
   *                            </li>
   *                            <li>
   *                               <p>South America (São Paulo)</p>
   *                            </li>
   *                         </ul>
   *                         <p>For a list of all the Amazon S3 supported Regions and endpoints, see <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region">Regions and Endpoints</a> in the AWS General Reference.</p>
   *                      </note>
   *                   </li>
   *                </ul>
   *                <p>For example, the following <code>x-amz-grant-write</code> header grants create,
   *                overwrite, and delete objects permission to LogDelivery group predefined by Amazon S3 and
   *                two AWS accounts identified by their email addresses.</p>
   *                <p>
   *                   <code>x-amz-grant-write: uri="http://acs.amazonaws.com/groups/s3/LogDelivery",
   *                   id="111122223333", id="555566667777" </code>
   *                </p>
   *
   *             </li>
   *          </ul>
   *          <p>You can use either a canned ACL or specify access permissions explicitly. You cannot do
   *          both.</p>
   *          <p>
   *             <b>Grantee Values</b>
   *          </p>
   *          <p>You can specify the person (grantee) to whom you're assigning access rights (using
   *          request elements) in the following ways:</p>
   *          <ul>
   *             <li>
   *                <p>By the person's ID:</p>
   *                <p>
   *                   <code><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   *                   xsi:type="CanonicalUser"><ID><>ID<></ID><DisplayName><>GranteesEmail<></DisplayName>
   *                   </Grantee></code>
   *                </p>
   *                <p>DisplayName is optional and ignored in the request</p>
   *             </li>
   *             <li>
   *                <p>By URI:</p>
   *                <p>
   *                   <code><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   *                   xsi:type="Group"><URI><>http://acs.amazonaws.com/groups/global/AuthenticatedUsers<></URI></Grantee></code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>By Email address:</p>
   *                <p>
   *                   <code><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   *                   xsi:type="AmazonCustomerByEmail"><EmailAddress><>Grantees@email.com<></EmailAddress>lt;/Grantee></code>
   *                </p>
   *                <p>The grantee is resolved to the CanonicalUser and, in a response to a GET Object
   *                acl request, appears as the CanonicalUser. </p>
   *                <note>
   *                   <p>Using email addresses to specify a grantee is only supported in the following AWS Regions: </p>
   *                   <ul>
   *                      <li>
   *                         <p>US East (N. Virginia)</p>
   *                      </li>
   *                      <li>
   *                         <p>US West (N. California)</p>
   *                      </li>
   *                      <li>
   *                         <p> US West (Oregon)</p>
   *                      </li>
   *                      <li>
   *                         <p> Asia Pacific (Singapore)</p>
   *                      </li>
   *                      <li>
   *                         <p>Asia Pacific (Sydney)</p>
   *                      </li>
   *                      <li>
   *                         <p>Asia Pacific (Tokyo)</p>
   *                      </li>
   *                      <li>
   *                         <p>Europe (Ireland)</p>
   *                      </li>
   *                      <li>
   *                         <p>South America (São Paulo)</p>
   *                      </li>
   *                   </ul>
   *                   <p>For a list of all the Amazon S3 supported Regions and endpoints, see <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region">Regions and Endpoints</a> in the AWS General Reference.</p>
   *                </note>
   *             </li>
   *          </ul>
   *
   *
   *          <p class="title">
   *             <b>Related Resources</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucket.html">DeleteBucket</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObjectAcl.html">GetObjectAcl</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putBucketAcl(
    args: PutBucketAclCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBucketAclCommandOutput>;
  public putBucketAcl(args: PutBucketAclCommandInput, cb: (err: any, data?: PutBucketAclCommandOutput) => void): void;
  public putBucketAcl(
    args: PutBucketAclCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBucketAclCommandOutput) => void
  ): void;
  public putBucketAcl(
    args: PutBucketAclCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutBucketAclCommandOutput) => void),
    cb?: (err: any, data?: PutBucketAclCommandOutput) => void
  ): Promise<PutBucketAclCommandOutput> | void {
    const command = new PutBucketAclCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Sets an analytics configuration for the bucket (specified by the analytics configuration
   *          ID). You can have up to 1,000 analytics configurations per bucket.</p>
   *
   *          <p>You can choose to have storage class analysis export analysis reports sent to a
   *          comma-separated values (CSV) flat file. See the <code>DataExport</code> request element.
   *          Reports are updated daily and are based on the object filters that you configure. When
   *          selecting data export, you specify a destination bucket and an optional destination prefix
   *          where the file is written. You can export the data to a destination bucket in a different
   *          account. However, the destination bucket must be in the same Region as the bucket that you
   *          are making the PUT analytics configuration to. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/analytics-storage-class.html">Amazon S3 Analytics – Storage Class
   *             Analysis</a>. </p>
   *
   *          <important>
   *             <p>You must create a bucket policy on the destination bucket where the exported file is
   *             written to grant permissions to Amazon S3 to write objects to the bucket. For an example
   *             policy, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html#example-bucket-policies-use-case-9">Granting Permissions for Amazon S3 Inventory and Storage Class Analysis</a>.</p>
   *          </important>
   *
   *          <p>To use this operation, you must have permissions to perform the
   *             <code>s3:PutAnalyticsConfiguration</code> action. The bucket owner has this permission
   *          by default. The bucket owner can grant this permission to others. For more information
   *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>.</p>
   *
   *
   *          <p class="title">
   *             <b>Special Errors</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <ul>
   *                   <li>
   *                      <p>
   *                         <i>HTTP Error: HTTP 400 Bad Request</i>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>Code: InvalidArgument</i>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>Cause: Invalid argument.</i>
   *                      </p>
   *                   </li>
   *                </ul>
   *             </li>
   *             <li>
   *                <ul>
   *                   <li>
   *                      <p>
   *                         <i>HTTP Error: HTTP 400 Bad Request</i>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>Code: TooManyConfigurations</i>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>Cause: You are attempting to create a new configuration but have
   *                         already reached the 1,000-configuration limit.</i>
   *                      </p>
   *                   </li>
   *                </ul>
   *             </li>
   *             <li>
   *                <ul>
   *                   <li>
   *                      <p>
   *                         <i>HTTP Error: HTTP 403 Forbidden</i>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>Code: AccessDenied</i>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>Cause: You are not the owner of the specified bucket, or you do
   *                         not have the s3:PutAnalyticsConfiguration bucket permission to set the
   *                         configuration on the bucket.</i>
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
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketAnalyticsConfiguration.html">GetBucketAnalyticsConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketAnalyticsConfiguration.html">DeleteBucketAnalyticsConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBucketAnalyticsConfigurations.html">ListBucketAnalyticsConfigurations</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putBucketAnalyticsConfiguration(
    args: PutBucketAnalyticsConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBucketAnalyticsConfigurationCommandOutput>;
  public putBucketAnalyticsConfiguration(
    args: PutBucketAnalyticsConfigurationCommandInput,
    cb: (err: any, data?: PutBucketAnalyticsConfigurationCommandOutput) => void
  ): void;
  public putBucketAnalyticsConfiguration(
    args: PutBucketAnalyticsConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBucketAnalyticsConfigurationCommandOutput) => void
  ): void;
  public putBucketAnalyticsConfiguration(
    args: PutBucketAnalyticsConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutBucketAnalyticsConfigurationCommandOutput) => void),
    cb?: (err: any, data?: PutBucketAnalyticsConfigurationCommandOutput) => void
  ): Promise<PutBucketAnalyticsConfigurationCommandOutput> | void {
    const command = new PutBucketAnalyticsConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Sets the <code>cors</code> configuration for your bucket. If the configuration exists,
   *          Amazon S3 replaces it.</p>
   *          <p>To use this operation, you must be allowed to perform the <code>s3:PutBucketCORS</code>
   *          action. By default, the bucket owner has this permission and can grant it to others.</p>
   *          <p>You set this configuration on a bucket so that the bucket can service cross-origin
   *          requests. For example, you might want to enable a request whose origin is
   *             <code>http://www.example.com</code> to access your Amazon S3 bucket at
   *             <code>my.example.bucket.com</code> by using the browser's <code>XMLHttpRequest</code>
   *          capability.</p>
   *          <p>To enable cross-origin resource sharing (CORS) on a bucket, you add the
   *             <code>cors</code> subresource to the bucket. The <code>cors</code> subresource is an XML
   *          document in which you configure rules that identify origins and the HTTP methods that can
   *          be executed on your bucket. The document is limited to 64 KB in size. </p>
   *          <p>When Amazon S3 receives a cross-origin request (or a pre-flight OPTIONS request) against a
   *          bucket, it evaluates the <code>cors</code> configuration on the bucket and uses the first
   *             <code>CORSRule</code> rule that matches the incoming browser request to enable a
   *          cross-origin request. For a rule to match, the following conditions must be met:</p>
   *          <ul>
   *             <li>
   *                <p>The request's <code>Origin</code> header must match <code>AllowedOrigin</code>
   *                elements.</p>
   *             </li>
   *             <li>
   *                <p>The request method (for example, GET, PUT, HEAD, and so on) or the
   *                   <code>Access-Control-Request-Method</code> header in case of a pre-flight
   *                   <code>OPTIONS</code> request must be one of the <code>AllowedMethod</code>
   *                elements. </p>
   *             </li>
   *             <li>
   *                <p>Every header specified in the <code>Access-Control-Request-Headers</code> request
   *                header of a pre-flight request must match an <code>AllowedHeader</code> element.
   *             </p>
   *             </li>
   *          </ul>
   *          <p> For more information about CORS, go to <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html">Enabling
   *             Cross-Origin Resource Sharing</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *
   *          <p class="title">
   *             <b>Related Resources</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketCors.html">GetBucketCors</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketCors.html">DeleteBucketCors</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/RESTOPTIONSobject.html">RESTOPTIONSobject</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putBucketCors(
    args: PutBucketCorsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBucketCorsCommandOutput>;
  public putBucketCors(
    args: PutBucketCorsCommandInput,
    cb: (err: any, data?: PutBucketCorsCommandOutput) => void
  ): void;
  public putBucketCors(
    args: PutBucketCorsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBucketCorsCommandOutput) => void
  ): void;
  public putBucketCors(
    args: PutBucketCorsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutBucketCorsCommandOutput) => void),
    cb?: (err: any, data?: PutBucketCorsCommandOutput) => void
  ): Promise<PutBucketCorsCommandOutput> | void {
    const command = new PutBucketCorsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>This operation uses the <code>encryption</code> subresource to configure default
   *          encryption and Amazon S3 Bucket Key for an existing bucket.</p>
   *          <p>Default encryption for a bucket can use server-side encryption with Amazon S3-managed keys
   *          (SSE-S3) or AWS KMS customer master keys (SSE-KMS). If you specify default encryption
   *          using SSE-KMS, you can also configure Amazon S3 Bucket Key. For information about default
   *          encryption, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html">Amazon S3 default bucket encryption</a>
   *          in the <i>Amazon Simple Storage Service Developer Guide</i>. For more information about S3 Bucket Keys,
   *          see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-key.html">Amazon S3 Bucket Keys</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *          <important>
   *             <p>This operation requires AWS Signature Version 4. For more information, see <a href="sig-v4-authenticating-requests.html"> Authenticating Requests (AWS Signature
   *                Version 4)</a>. </p>
   *          </important>
   *          <p>To use this operation, you must have permissions to perform the
   *             <code>s3:PutEncryptionConfiguration</code> action. The bucket owner has this permission
   *          by default. The bucket owner can grant this permission to others. For more information
   *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a> in the Amazon Simple Storage Service Developer Guide. </p>
   *
   *          <p class="title">
   *             <b>Related Resources</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketEncryption.html">GetBucketEncryption</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketEncryption.html">DeleteBucketEncryption</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putBucketEncryption(
    args: PutBucketEncryptionCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBucketEncryptionCommandOutput>;
  public putBucketEncryption(
    args: PutBucketEncryptionCommandInput,
    cb: (err: any, data?: PutBucketEncryptionCommandOutput) => void
  ): void;
  public putBucketEncryption(
    args: PutBucketEncryptionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBucketEncryptionCommandOutput) => void
  ): void;
  public putBucketEncryption(
    args: PutBucketEncryptionCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutBucketEncryptionCommandOutput) => void),
    cb?: (err: any, data?: PutBucketEncryptionCommandOutput) => void
  ): Promise<PutBucketEncryptionCommandOutput> | void {
    const command = new PutBucketEncryptionCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Puts a S3 Intelligent-Tiering configuration to the specified bucket.</p>
   *          <p>The S3 Intelligent-Tiering storage class is designed to optimize storage costs by automatically moving data to the most cost-effective storage access tier, without additional operational overhead. S3 Intelligent-Tiering delivers automatic cost savings by moving data between access tiers, when access patterns change.</p>
   *          <p>The S3 Intelligent-Tiering storage class is suitable for objects larger than 128 KB that you plan to store for at least 30 days. If the size of an object is less than 128 KB, it is not eligible for auto-tiering. Smaller objects can be stored, but they are always charged at the frequent access tier rates in the S3 Intelligent-Tiering storage class. </p>
   *          <p>If you delete an object before the end of the 30-day minimum storage duration period, you are charged for 30 days. For more information, see  <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html#sc-dynamic-data-access">Storage class for automatically optimizing frequently and infrequently accessed objects</a>.</p>
   *          <p>Operations related to
   *             <code>PutBucketIntelligentTieringConfiguration</code> include: </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketIntelligentTieringConfiguration.html">DeleteBucketIntelligentTieringConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketIntelligentTieringConfiguration.html">GetBucketIntelligentTieringConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBucketIntelligentTieringConfigurations.html">ListBucketIntelligentTieringConfigurations</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putBucketIntelligentTieringConfiguration(
    args: PutBucketIntelligentTieringConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBucketIntelligentTieringConfigurationCommandOutput>;
  public putBucketIntelligentTieringConfiguration(
    args: PutBucketIntelligentTieringConfigurationCommandInput,
    cb: (err: any, data?: PutBucketIntelligentTieringConfigurationCommandOutput) => void
  ): void;
  public putBucketIntelligentTieringConfiguration(
    args: PutBucketIntelligentTieringConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBucketIntelligentTieringConfigurationCommandOutput) => void
  ): void;
  public putBucketIntelligentTieringConfiguration(
    args: PutBucketIntelligentTieringConfigurationCommandInput,
    optionsOrCb?:
      | __HttpHandlerOptions
      | ((err: any, data?: PutBucketIntelligentTieringConfigurationCommandOutput) => void),
    cb?: (err: any, data?: PutBucketIntelligentTieringConfigurationCommandOutput) => void
  ): Promise<PutBucketIntelligentTieringConfigurationCommandOutput> | void {
    const command = new PutBucketIntelligentTieringConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>This implementation of the <code>PUT</code> operation adds an inventory configuration
   *          (identified by the inventory ID) to the bucket. You can have up to 1,000 inventory
   *          configurations per bucket. </p>
   *          <p>Amazon S3 inventory generates inventories of the objects in the bucket on a daily or weekly
   *          basis, and the results are published to a flat file. The bucket that is inventoried is
   *          called the <i>source</i> bucket, and the bucket where the inventory flat file
   *          is stored is called the <i>destination</i> bucket. The
   *             <i>destination</i> bucket must be in the same AWS Region as the
   *             <i>source</i> bucket. </p>
   *          <p>When you configure an inventory for a <i>source</i> bucket, you specify
   *          the <i>destination</i> bucket where you want the inventory to be stored, and
   *          whether to generate the inventory daily or weekly. You can also configure what object
   *          metadata to include and whether to inventory all object versions or only current versions.
   *          For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-inventory.html">Amazon S3
   *             Inventory</a> in the Amazon Simple Storage Service Developer Guide.</p>
   *          <important>
   *             <p>You must create a bucket policy on the <i>destination</i> bucket to
   *             grant permissions to Amazon S3 to write objects to the bucket in the defined location. For an
   *             example policy, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html#example-bucket-policies-use-case-9">
   *                Granting Permissions for Amazon S3 Inventory and Storage Class Analysis</a>.</p>
   *          </important>
   *          <p>To use this operation, you must have permissions to perform the
   *             <code>s3:PutInventoryConfiguration</code> action. The bucket owner has this permission
   *          by default and can grant this permission to others. For more information about permissions,
   *          see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a> in the Amazon Simple Storage Service Developer Guide.</p>
   *
   *          <p class="title">
   *             <b>Special Errors</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p class="title">
   *                   <b>HTTP 400 Bad Request Error</b>
   *                </p>
   *                <ul>
   *                   <li>
   *                      <p>
   *                         <i>Code:</i> InvalidArgument</p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>Cause:</i> Invalid Argument</p>
   *                   </li>
   *                </ul>
   *             </li>
   *             <li>
   *                <p class="title">
   *                   <b>HTTP 400 Bad Request Error</b>
   *                </p>
   *                <ul>
   *                   <li>
   *                      <p>
   *                         <i>Code:</i> TooManyConfigurations</p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>Cause:</i> You are attempting to create a new configuration
   *                      but have already reached the 1,000-configuration limit. </p>
   *                   </li>
   *                </ul>
   *             </li>
   *             <li>
   *                <p class="title">
   *                   <b>HTTP 403 Forbidden Error</b>
   *                </p>
   *                <ul>
   *                   <li>
   *                      <p>
   *                         <i>Code:</i> AccessDenied</p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>Cause:</i> You are not the owner of the specified bucket,
   *                      or you do not have the <code>s3:PutInventoryConfiguration</code> bucket
   *                      permission to set the configuration on the bucket. </p>
   *                   </li>
   *                </ul>
   *             </li>
   *          </ul>
   *
   *          <p class="title">
   *             <b>Related Resources</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketInventoryConfiguration.html">GetBucketInventoryConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketInventoryConfiguration.html">DeleteBucketInventoryConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBucketInventoryConfigurations.html">ListBucketInventoryConfigurations</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putBucketInventoryConfiguration(
    args: PutBucketInventoryConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBucketInventoryConfigurationCommandOutput>;
  public putBucketInventoryConfiguration(
    args: PutBucketInventoryConfigurationCommandInput,
    cb: (err: any, data?: PutBucketInventoryConfigurationCommandOutput) => void
  ): void;
  public putBucketInventoryConfiguration(
    args: PutBucketInventoryConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBucketInventoryConfigurationCommandOutput) => void
  ): void;
  public putBucketInventoryConfiguration(
    args: PutBucketInventoryConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutBucketInventoryConfigurationCommandOutput) => void),
    cb?: (err: any, data?: PutBucketInventoryConfigurationCommandOutput) => void
  ): Promise<PutBucketInventoryConfigurationCommandOutput> | void {
    const command = new PutBucketInventoryConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates a new lifecycle configuration for the bucket or replaces an existing lifecycle
   *          configuration. For information about lifecycle configuration, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>.</p>
   *
   *          <note>
   *             <p>Bucket lifecycle configuration now supports specifying a lifecycle rule using an
   *             object key name prefix, one or more object tags, or a combination of both. Accordingly,
   *             this section describes the latest API. The previous version of the API supported
   *             filtering based only on an object key name prefix, which is supported for backward
   *             compatibility. For the related API description, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLifecycle.html">PutBucketLifecycle</a>.</p>
   *          </note>
   *
   *
   *
   *          <p>
   *             <b>Rules</b>
   *          </p>
   *          <p>You specify the lifecycle configuration in your request body. The lifecycle
   *          configuration is specified as XML consisting of one or more rules. Each rule consists of
   *          the following:</p>
   *
   *          <ul>
   *             <li>
   *                <p>Filter identifying a subset of objects to which the rule applies. The filter can
   *                be based on a key name prefix, object tags, or a combination of both.</p>
   *             </li>
   *             <li>
   *                <p>Status whether the rule is in effect.</p>
   *             </li>
   *             <li>
   *                <p>One or more lifecycle transition and expiration actions that you want Amazon S3 to
   *                perform on the objects identified by the filter. If the state of your bucket is
   *                versioning-enabled or versioning-suspended, you can have many versions of the same
   *                object (one current version and zero or more noncurrent versions). Amazon S3 provides
   *                predefined actions that you can specify for current and noncurrent object
   *                versions.</p>
   *             </li>
   *          </ul>
   *
   *          <p>For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html">Object
   *             Lifecycle Management</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/intro-lifecycle-rules.html">Lifecycle Configuration Elements</a>.</p>
   *
   *
   *          <p>
   *             <b>Permissions</b>
   *          </p>
   *
   *
   *          <p>By default, all Amazon S3 resources are private, including buckets, objects, and related
   *          subresources (for example, lifecycle configuration and website configuration). Only the
   *          resource owner (that is, the AWS account that created it) can access the resource. The
   *          resource owner can optionally grant access permissions to others by writing an access
   *          policy. For this operation, a user must get the s3:PutLifecycleConfiguration
   *          permission.</p>
   *
   *          <p>You can also explicitly deny permissions. Explicit deny also supersedes any other
   *          permissions. If you want to block users or accounts from removing or deleting objects from
   *          your bucket, you must deny them permissions for the following actions:</p>
   *
   *          <ul>
   *             <li>
   *                <p>s3:DeleteObject</p>
   *             </li>
   *             <li>
   *                <p>s3:DeleteObjectVersion</p>
   *             </li>
   *             <li>
   *                <p>s3:PutLifecycleConfiguration</p>
   *             </li>
   *          </ul>
   *
   *
   *          <p>For more information about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>.</p>
   *
   *          <p>The following are related to <code>PutBucketLifecycleConfiguration</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/lifecycle-configuration-examples.html">Examples of
   *                   Lifecycle Configuration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLifecycleConfiguration.html">GetBucketLifecycleConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketLifecycle.html">DeleteBucketLifecycle</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putBucketLifecycleConfiguration(
    args: PutBucketLifecycleConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBucketLifecycleConfigurationCommandOutput>;
  public putBucketLifecycleConfiguration(
    args: PutBucketLifecycleConfigurationCommandInput,
    cb: (err: any, data?: PutBucketLifecycleConfigurationCommandOutput) => void
  ): void;
  public putBucketLifecycleConfiguration(
    args: PutBucketLifecycleConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBucketLifecycleConfigurationCommandOutput) => void
  ): void;
  public putBucketLifecycleConfiguration(
    args: PutBucketLifecycleConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutBucketLifecycleConfigurationCommandOutput) => void),
    cb?: (err: any, data?: PutBucketLifecycleConfigurationCommandOutput) => void
  ): Promise<PutBucketLifecycleConfigurationCommandOutput> | void {
    const command = new PutBucketLifecycleConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Set the logging parameters for a bucket and to specify permissions for who can view and
   *          modify the logging parameters. All logs are saved to buckets in the same AWS Region as the
   *          source bucket. To set the logging status of a bucket, you must be the bucket owner.</p>
   *
   *          <p>The bucket owner is automatically granted FULL_CONTROL to all logs. You use the
   *             <code>Grantee</code> request element to grant access to other people. The
   *             <code>Permissions</code> request element specifies the kind of access the grantee has to
   *          the logs.</p>
   *
   *          <p>
   *             <b>Grantee Values</b>
   *          </p>
   *          <p>You can specify the person (grantee) to whom you're assigning access rights (using
   *          request elements) in the following ways:</p>
   *
   *          <ul>
   *             <li>
   *                <p>By the person's ID:</p>
   *                <p>
   *                   <code><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   *                   xsi:type="CanonicalUser"><ID><>ID<></ID><DisplayName><>GranteesEmail<></DisplayName>
   *                   </Grantee></code>
   *                </p>
   *                <p>DisplayName is optional and ignored in the request.</p>
   *             </li>
   *             <li>
   *                <p>By Email address:</p>
   *                <p>
   *                   <code> <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   *                   xsi:type="AmazonCustomerByEmail"><EmailAddress><>Grantees@email.com<></EmailAddress></Grantee></code>
   *                </p>
   *                <p>The grantee is resolved to the CanonicalUser and, in a response to a GET Object
   *                acl request, appears as the CanonicalUser.</p>
   *             </li>
   *             <li>
   *                <p>By URI:</p>
   *                <p>
   *                   <code><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   *                   xsi:type="Group"><URI><>http://acs.amazonaws.com/groups/global/AuthenticatedUsers<></URI></Grantee></code>
   *                </p>
   *             </li>
   *          </ul>
   *
   *
   *          <p>To enable logging, you use LoggingEnabled and its children request elements. To disable
   *          logging, you use an empty BucketLoggingStatus request element:</p>
   *
   *          <p>
   *             <code><BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"
   *             /></code>
   *          </p>
   *
   *          <p>For more information about server access logging, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/ServerLogs.html">Server Access Logging</a>. </p>
   *
   *          <p>For more information about creating a bucket, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>. For more
   *          information about returning the logging status of a bucket, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLogging.html">GetBucketLogging</a>.</p>
   *
   *          <p>The following operations are related to <code>PutBucketLogging</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html">PutObject</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucket.html">DeleteBucket</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLogging.html">GetBucketLogging</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putBucketLogging(
    args: PutBucketLoggingCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBucketLoggingCommandOutput>;
  public putBucketLogging(
    args: PutBucketLoggingCommandInput,
    cb: (err: any, data?: PutBucketLoggingCommandOutput) => void
  ): void;
  public putBucketLogging(
    args: PutBucketLoggingCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBucketLoggingCommandOutput) => void
  ): void;
  public putBucketLogging(
    args: PutBucketLoggingCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutBucketLoggingCommandOutput) => void),
    cb?: (err: any, data?: PutBucketLoggingCommandOutput) => void
  ): Promise<PutBucketLoggingCommandOutput> | void {
    const command = new PutBucketLoggingCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Sets a metrics configuration (specified by the metrics configuration ID) for the bucket.
   *          You can have up to 1,000 metrics configurations per bucket. If you're updating an existing
   *          metrics configuration, note that this is a full replacement of the existing metrics
   *          configuration. If you don't include the elements you want to keep, they are erased.</p>
   *
   *          <p>To use this operation, you must have permissions to perform the
   *             <code>s3:PutMetricsConfiguration</code> action. The bucket owner has this permission by
   *          default. The bucket owner can grant this permission to others. For more information about
   *          permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>.</p>
   *
   *          <p>For information about CloudWatch request metrics for Amazon S3, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html">Monitoring Metrics with Amazon
   *             CloudWatch</a>.</p>
   *
   *          <p>The following operations are related to
   *          <code>PutBucketMetricsConfiguration</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketMetricsConfiguration.html">DeleteBucketMetricsConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketMetricsConfiguration.html">PutBucketMetricsConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBucketMetricsConfigurations.html">ListBucketMetricsConfigurations</a>
   *                </p>
   *             </li>
   *          </ul>
   *
   *
   *
   *
   *
   *
   *          <p>
   *             <code>GetBucketLifecycle</code> has the following special error:</p>
   *          <ul>
   *             <li>
   *                <p>Error code: <code>TooManyConfigurations</code>
   *                </p>
   *                <ul>
   *                   <li>
   *                      <p>Description: You are attempting to create a new configuration but have
   *                      already reached the 1,000-configuration limit.</p>
   *                   </li>
   *                   <li>
   *                      <p>HTTP Status Code: HTTP 400 Bad Request</p>
   *                   </li>
   *                </ul>
   *             </li>
   *          </ul>
   */
  public putBucketMetricsConfiguration(
    args: PutBucketMetricsConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBucketMetricsConfigurationCommandOutput>;
  public putBucketMetricsConfiguration(
    args: PutBucketMetricsConfigurationCommandInput,
    cb: (err: any, data?: PutBucketMetricsConfigurationCommandOutput) => void
  ): void;
  public putBucketMetricsConfiguration(
    args: PutBucketMetricsConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBucketMetricsConfigurationCommandOutput) => void
  ): void;
  public putBucketMetricsConfiguration(
    args: PutBucketMetricsConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutBucketMetricsConfigurationCommandOutput) => void),
    cb?: (err: any, data?: PutBucketMetricsConfigurationCommandOutput) => void
  ): Promise<PutBucketMetricsConfigurationCommandOutput> | void {
    const command = new PutBucketMetricsConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Enables notifications of specified events for a bucket. For more information about event
   *          notifications, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html">Configuring Event
   *             Notifications</a>.</p>
   *
   *          <p>Using this API, you can replace an existing notification configuration. The
   *          configuration is an XML file that defines the event types that you want Amazon S3 to publish and
   *          the destination where you want Amazon S3 to publish an event notification when it detects an
   *          event of the specified type.</p>
   *
   *          <p>By default, your bucket has no event notifications configured. That is, the notification
   *          configuration will be an empty <code>NotificationConfiguration</code>.</p>
   *
   *          <p>
   *             <code><NotificationConfiguration></code>
   *          </p>
   *          <p>
   *             <code></NotificationConfiguration></code>
   *          </p>
   *          <p>This operation replaces the existing notification configuration with the configuration
   *          you include in the request body.</p>
   *
   *          <p>After Amazon S3 receives this request, it first verifies that any Amazon Simple Notification
   *          Service (Amazon SNS) or Amazon Simple Queue Service (Amazon SQS) destination exists, and
   *          that the bucket owner has permission to publish to it by sending a test notification. In
   *          the case of AWS Lambda destinations, Amazon S3 verifies that the Lambda function permissions
   *          grant Amazon S3 permission to invoke the function from the Amazon S3 bucket. For more information,
   *          see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html">Configuring Notifications for Amazon S3
   *             Events</a>.</p>
   *
   *          <p>You can disable notifications by adding the empty NotificationConfiguration
   *          element.</p>
   *
   *          <p>By default, only the bucket owner can configure notifications on a bucket. However,
   *          bucket owners can use a bucket policy to grant permission to other users to set this
   *          configuration with <code>s3:PutBucketNotification</code> permission.</p>
   *
   *          <note>
   *             <p>The PUT notification is an atomic operation. For example, suppose your notification
   *             configuration includes SNS topic, SQS queue, and Lambda function configurations. When
   *             you send a PUT request with this configuration, Amazon S3 sends test messages to your SNS
   *             topic. If the message fails, the entire PUT operation will fail, and Amazon S3 will not add
   *             the configuration to your bucket.</p>
   *          </note>
   *
   *          <p>
   *             <b>Responses</b>
   *          </p>
   *          <p>If the configuration in the request body includes only one
   *             <code>TopicConfiguration</code> specifying only the
   *             <code>s3:ReducedRedundancyLostObject</code> event type, the response will also include
   *          the <code>x-amz-sns-test-message-id</code> header containing the message ID of the test
   *          notification sent to the topic.</p>
   *
   *          <p>The following operation is related to
   *          <code>PutBucketNotificationConfiguration</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketNotificationConfiguration.html">GetBucketNotificationConfiguration</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putBucketNotificationConfiguration(
    args: PutBucketNotificationConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBucketNotificationConfigurationCommandOutput>;
  public putBucketNotificationConfiguration(
    args: PutBucketNotificationConfigurationCommandInput,
    cb: (err: any, data?: PutBucketNotificationConfigurationCommandOutput) => void
  ): void;
  public putBucketNotificationConfiguration(
    args: PutBucketNotificationConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBucketNotificationConfigurationCommandOutput) => void
  ): void;
  public putBucketNotificationConfiguration(
    args: PutBucketNotificationConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutBucketNotificationConfigurationCommandOutput) => void),
    cb?: (err: any, data?: PutBucketNotificationConfigurationCommandOutput) => void
  ): Promise<PutBucketNotificationConfigurationCommandOutput> | void {
    const command = new PutBucketNotificationConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates or modifies <code>OwnershipControls</code> for an Amazon S3 bucket. To use this
   *          operation, you must have the <code>s3:PutBucketOwnershipControls</code> permission. For
   *          more information about Amazon S3 permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html">Specifying Permissions in a Policy</a>. </p>
   *          <p>For information about Amazon S3 Object Ownership, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html">Using Object Ownership</a>. </p>
   *          <p>The following operations are related to <code>PutBucketOwnershipControls</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a>GetBucketOwnershipControls</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a>DeleteBucketOwnershipControls</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putBucketOwnershipControls(
    args: PutBucketOwnershipControlsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBucketOwnershipControlsCommandOutput>;
  public putBucketOwnershipControls(
    args: PutBucketOwnershipControlsCommandInput,
    cb: (err: any, data?: PutBucketOwnershipControlsCommandOutput) => void
  ): void;
  public putBucketOwnershipControls(
    args: PutBucketOwnershipControlsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBucketOwnershipControlsCommandOutput) => void
  ): void;
  public putBucketOwnershipControls(
    args: PutBucketOwnershipControlsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutBucketOwnershipControlsCommandOutput) => void),
    cb?: (err: any, data?: PutBucketOwnershipControlsCommandOutput) => void
  ): Promise<PutBucketOwnershipControlsCommandOutput> | void {
    const command = new PutBucketOwnershipControlsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Applies an Amazon S3 bucket policy to an Amazon S3 bucket. If you are using an identity other than
   *          the root user of the AWS account that owns the bucket, the calling identity must have the
   *             <code>PutBucketPolicy</code> permissions on the specified bucket and belong to the
   *          bucket owner's account in order to use this operation.</p>
   *
   *          <p>If you don't have <code>PutBucketPolicy</code> permissions, Amazon S3 returns a <code>403
   *             Access Denied</code> error. If you have the correct permissions, but you're not using an
   *          identity that belongs to the bucket owner's account, Amazon S3 returns a <code>405 Method Not
   *             Allowed</code> error.</p>
   *
   *          <important>
   *             <p> As a security precaution, the root user of the AWS account that owns a bucket can
   *             always use this operation, even if the policy explicitly denies the root user the
   *             ability to perform this action. </p>
   *          </important>
   *
   *
   *          <p>For more information about bucket policies, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-iam-policies.html">Using Bucket Policies and User
   *             Policies</a>.</p>
   *
   *          <p>The following operations are related to <code>PutBucketPolicy</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucket.html">DeleteBucket</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putBucketPolicy(
    args: PutBucketPolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBucketPolicyCommandOutput>;
  public putBucketPolicy(
    args: PutBucketPolicyCommandInput,
    cb: (err: any, data?: PutBucketPolicyCommandOutput) => void
  ): void;
  public putBucketPolicy(
    args: PutBucketPolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBucketPolicyCommandOutput) => void
  ): void;
  public putBucketPolicy(
    args: PutBucketPolicyCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutBucketPolicyCommandOutput) => void),
    cb?: (err: any, data?: PutBucketPolicyCommandOutput) => void
  ): Promise<PutBucketPolicyCommandOutput> | void {
    const command = new PutBucketPolicyCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p> Creates a replication configuration or replaces an existing one. For more information,
   *          see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/replication.html">Replication</a> in the <i>Amazon S3 Developer Guide</i>. </p>
   *          <note>
   *             <p>To perform this operation, the user or role performing the operation must have the
   *                <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html">iam:PassRole</a> permission.</p>
   *          </note>
   *          <p>Specify the replication configuration in the request body. In the replication
   *          configuration, you provide the name of the destination bucket or buckets where you want
   *          Amazon S3 to replicate objects, the IAM role that Amazon S3 can assume to replicate objects on your
   *          behalf, and other relevant information.</p>
   *
   *
   *          <p>A replication configuration must include at least one rule, and can contain a maximum of
   *          1,000. Each rule identifies a subset of objects to replicate by filtering the objects in
   *          the source bucket. To choose additional subsets of objects to replicate, add a rule for
   *          each subset.</p>
   *
   *          <p>To specify a subset of the objects in the source bucket to apply a replication rule to,
   *          add the Filter element as a child of the Rule element. You can filter objects based on an
   *          object key prefix, one or more object tags, or both. When you add the Filter element in the
   *          configuration, you must also add the following elements:
   *             <code>DeleteMarkerReplication</code>, <code>Status</code>, and
   *          <code>Priority</code>.</p>
   *          <note>
   *             <p>If you are using an earlier version of the replication configuration, Amazon S3 handles
   *             replication of delete markers differently. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/replication-add-config.html#replication-backward-compat-considerations">Backward Compatibility</a>.</p>
   *          </note>
   *          <p>For information about enabling versioning on a bucket, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html">Using Versioning</a>.</p>
   *
   *          <p>By default, a resource owner, in this case the AWS account that created the bucket, can
   *          perform this operation. The resource owner can also grant others permissions to perform the
   *          operation. For more information about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html">Specifying Permissions in a Policy</a>
   *          and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your
   *             Amazon S3 Resources</a>.</p>
   *
   *          <p>
   *             <b>Handling Replication of Encrypted Objects</b>
   *          </p>
   *          <p>By default, Amazon S3 doesn't replicate objects that are stored at rest using server-side
   *          encryption with CMKs stored in AWS KMS. To replicate AWS KMS-encrypted objects, add the
   *          following: <code>SourceSelectionCriteria</code>, <code>SseKmsEncryptedObjects</code>,
   *             <code>Status</code>, <code>EncryptionConfiguration</code>, and
   *             <code>ReplicaKmsKeyID</code>. For information about replication configuration, see
   *             <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/replication-config-for-kms-objects.html">Replicating Objects
   *             Created with SSE Using CMKs stored in AWS KMS</a>.</p>
   *
   *          <p>For information on <code>PutBucketReplication</code> errors, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/ErrorResponses.html#ReplicationErrorCodeList">List of
   *             replication-related error codes</a>
   *          </p>
   *
   *
   *          <p>The following operations are related to <code>PutBucketReplication</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketReplication.html">GetBucketReplication</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketReplication.html">DeleteBucketReplication</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putBucketReplication(
    args: PutBucketReplicationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBucketReplicationCommandOutput>;
  public putBucketReplication(
    args: PutBucketReplicationCommandInput,
    cb: (err: any, data?: PutBucketReplicationCommandOutput) => void
  ): void;
  public putBucketReplication(
    args: PutBucketReplicationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBucketReplicationCommandOutput) => void
  ): void;
  public putBucketReplication(
    args: PutBucketReplicationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutBucketReplicationCommandOutput) => void),
    cb?: (err: any, data?: PutBucketReplicationCommandOutput) => void
  ): Promise<PutBucketReplicationCommandOutput> | void {
    const command = new PutBucketReplicationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Sets the request payment configuration for a bucket. By default, the bucket owner pays
   *          for downloads from the bucket. This configuration parameter enables the bucket owner (only)
   *          to specify that the person requesting the download will be charged for the download. For
   *          more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/RequesterPaysBuckets.html">Requester Pays
   *             Buckets</a>.</p>
   *
   *          <p>The following operations are related to <code>PutBucketRequestPayment</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketRequestPayment.html">GetBucketRequestPayment</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putBucketRequestPayment(
    args: PutBucketRequestPaymentCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBucketRequestPaymentCommandOutput>;
  public putBucketRequestPayment(
    args: PutBucketRequestPaymentCommandInput,
    cb: (err: any, data?: PutBucketRequestPaymentCommandOutput) => void
  ): void;
  public putBucketRequestPayment(
    args: PutBucketRequestPaymentCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBucketRequestPaymentCommandOutput) => void
  ): void;
  public putBucketRequestPayment(
    args: PutBucketRequestPaymentCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutBucketRequestPaymentCommandOutput) => void),
    cb?: (err: any, data?: PutBucketRequestPaymentCommandOutput) => void
  ): Promise<PutBucketRequestPaymentCommandOutput> | void {
    const command = new PutBucketRequestPaymentCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Sets the tags for a bucket.</p>
   *          <p>Use tags to organize your AWS bill to reflect your own cost structure. To do this, sign
   *          up to get your AWS account bill with tag key values included. Then, to see the cost of
   *          combined resources, organize your billing information according to resources with the same
   *          tag key values. For example, you can tag several resources with a specific application
   *          name, and then organize your billing information to see the total cost of that application
   *          across several services. For more information, see <a href="https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html">Cost Allocation
   *             and Tagging</a>.</p>
   *
   *          <note>
   *             <p>Within a bucket, if you add a tag that has the same key as an existing tag, the new
   *             value overwrites the old value. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/CostAllocTagging.html">Using Cost Allocation in Amazon S3 Bucket
   *                Tags</a>.</p>
   *          </note>
   *          <p>To use this operation, you must have permissions to perform the
   *             <code>s3:PutBucketTagging</code> action. The bucket owner has this permission by default
   *          and can grant this permission to others. For more information about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a>.</p>
   *
   *          <p>
   *             <code>PutBucketTagging</code> has the following special errors:</p>
   *          <ul>
   *             <li>
   *                <p>Error code: <code>InvalidTagError</code>
   *                </p>
   *                <ul>
   *                   <li>
   *                      <p>Description: The tag provided was not a valid tag. This error can occur if
   *                      the tag did not pass input validation. For information about tag restrictions,
   *                      see <a href="https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/allocation-tag-restrictions.html">User-Defined Tag Restrictions</a> and <a href="https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/aws-tag-restrictions.html">AWS-Generated Cost Allocation Tag Restrictions</a>.</p>
   *                   </li>
   *                </ul>
   *             </li>
   *             <li>
   *                <p>Error code: <code>MalformedXMLError</code>
   *                </p>
   *                <ul>
   *                   <li>
   *                      <p>Description: The XML provided does not match the schema.</p>
   *                   </li>
   *                </ul>
   *             </li>
   *             <li>
   *                <p>Error code: <code>OperationAbortedError </code>
   *                </p>
   *                <ul>
   *                   <li>
   *                      <p>Description: A conflicting conditional operation is currently in progress
   *                      against this resource. Please try again.</p>
   *                   </li>
   *                </ul>
   *             </li>
   *             <li>
   *                <p>Error code: <code>InternalError</code>
   *                </p>
   *                <ul>
   *                   <li>
   *                      <p>Description: The service was unable to apply the provided tag to the
   *                      bucket.</p>
   *                   </li>
   *                </ul>
   *             </li>
   *          </ul>
   *
   *
   *          <p>The following operations are related to <code>PutBucketTagging</code>:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketTagging.html">GetBucketTagging</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketTagging.html">DeleteBucketTagging</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putBucketTagging(
    args: PutBucketTaggingCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBucketTaggingCommandOutput>;
  public putBucketTagging(
    args: PutBucketTaggingCommandInput,
    cb: (err: any, data?: PutBucketTaggingCommandOutput) => void
  ): void;
  public putBucketTagging(
    args: PutBucketTaggingCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBucketTaggingCommandOutput) => void
  ): void;
  public putBucketTagging(
    args: PutBucketTaggingCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutBucketTaggingCommandOutput) => void),
    cb?: (err: any, data?: PutBucketTaggingCommandOutput) => void
  ): Promise<PutBucketTaggingCommandOutput> | void {
    const command = new PutBucketTaggingCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Sets the versioning state of an existing bucket. To set the versioning state, you must
   *          be the bucket owner.</p>
   *          <p>You can set the versioning state with one of the following values:</p>
   *
   *          <p>
   *             <b>Enabled</b>—Enables versioning for the objects in the
   *          bucket. All objects added to the bucket receive a unique version ID.</p>
   *
   *          <p>
   *             <b>Suspended</b>—Disables versioning for the objects in the
   *          bucket. All objects added to the bucket receive the version ID null.</p>
   *
   *          <p>If the versioning state has never been set on a bucket, it has no versioning state; a
   *             <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketVersioning.html">GetBucketVersioning</a> request does not return a versioning state value.</p>
   *
   *          <p>If the bucket owner enables MFA Delete in the bucket versioning configuration, the
   *          bucket owner must include the <code>x-amz-mfa request</code> header and the
   *             <code>Status</code> and the <code>MfaDelete</code> request elements in a request to set
   *          the versioning state of the bucket.</p>
   *
   *          <important>
   *             <p>If you have an object expiration lifecycle policy in your non-versioned bucket and
   *             you want to maintain the same permanent delete behavior when you enable versioning, you
   *             must add a noncurrent expiration policy. The noncurrent expiration lifecycle policy will
   *             manage the deletes of the noncurrent object versions in the version-enabled bucket. (A
   *             version-enabled bucket maintains one current and zero or more noncurrent object
   *             versions.) For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html#lifecycle-and-other-bucket-config">Lifecycle and Versioning</a>.</p>
   *          </important>
   *
   *          <p class="title">
   *             <b>Related Resources</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucket.html">DeleteBucket</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketVersioning.html">GetBucketVersioning</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putBucketVersioning(
    args: PutBucketVersioningCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBucketVersioningCommandOutput>;
  public putBucketVersioning(
    args: PutBucketVersioningCommandInput,
    cb: (err: any, data?: PutBucketVersioningCommandOutput) => void
  ): void;
  public putBucketVersioning(
    args: PutBucketVersioningCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBucketVersioningCommandOutput) => void
  ): void;
  public putBucketVersioning(
    args: PutBucketVersioningCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutBucketVersioningCommandOutput) => void),
    cb?: (err: any, data?: PutBucketVersioningCommandOutput) => void
  ): Promise<PutBucketVersioningCommandOutput> | void {
    const command = new PutBucketVersioningCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Sets the configuration of the website that is specified in the <code>website</code>
   *          subresource. To configure a bucket as a website, you can add this subresource on the bucket
   *          with website configuration information such as the file name of the index document and any
   *          redirect rules. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html">Hosting Websites on Amazon S3</a>.</p>
   *
   *          <p>This PUT operation requires the <code>S3:PutBucketWebsite</code> permission. By default,
   *          only the bucket owner can configure the website attached to a bucket; however, bucket
   *          owners can allow other users to set the website configuration by writing a bucket policy
   *          that grants them the <code>S3:PutBucketWebsite</code> permission.</p>
   *
   *          <p>To redirect all website requests sent to the bucket's website endpoint, you add a
   *          website configuration with the following elements. Because all requests are sent to another
   *          website, you don't need to provide index document name for the bucket.</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <code>WebsiteConfiguration</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>RedirectAllRequestsTo</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>HostName</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>Protocol</code>
   *                </p>
   *             </li>
   *          </ul>
   *
   *          <p>If you want granular control over redirects, you can use the following elements to add
   *          routing rules that describe conditions for redirecting requests and information about the
   *          redirect destination. In this case, the website configuration must provide an index
   *          document for the bucket, because some requests might not be redirected. </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <code>WebsiteConfiguration</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>IndexDocument</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>Suffix</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>ErrorDocument</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>Key</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>RoutingRules</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>RoutingRule</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>Condition</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>HttpErrorCodeReturnedEquals</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>KeyPrefixEquals</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>Redirect</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>Protocol</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>HostName</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>ReplaceKeyPrefixWith</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>ReplaceKeyWith</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>HttpRedirectCode</code>
   *                </p>
   *             </li>
   *          </ul>
   *
   *          <p>Amazon S3 has a limitation of 50 routing rules per website configuration. If you require more
   *          than 50 routing rules, you can use object redirect. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-page-redirect.html">Configuring an
   *             Object Redirect</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   */
  public putBucketWebsite(
    args: PutBucketWebsiteCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutBucketWebsiteCommandOutput>;
  public putBucketWebsite(
    args: PutBucketWebsiteCommandInput,
    cb: (err: any, data?: PutBucketWebsiteCommandOutput) => void
  ): void;
  public putBucketWebsite(
    args: PutBucketWebsiteCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBucketWebsiteCommandOutput) => void
  ): void;
  public putBucketWebsite(
    args: PutBucketWebsiteCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutBucketWebsiteCommandOutput) => void),
    cb?: (err: any, data?: PutBucketWebsiteCommandOutput) => void
  ): Promise<PutBucketWebsiteCommandOutput> | void {
    const command = new PutBucketWebsiteCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Adds an object to a bucket. You must have WRITE permissions on a bucket to add an object
   *          to it.</p>
   *
   *
   *          <p>Amazon S3 never adds partial objects; if you receive a success response, Amazon S3 added the
   *          entire object to the bucket.</p>
   *
   *          <p>Amazon S3 is a distributed system. If it receives multiple write requests for the same object
   *          simultaneously, it overwrites all but the last object written. Amazon S3 does not provide object
   *          locking; if you need this, make sure to build it into your application layer or use
   *          versioning instead.</p>
   *
   *          <p>To ensure that data is not corrupted traversing the network, use the
   *             <code>Content-MD5</code> header. When you use this header, Amazon S3 checks the object
   *          against the provided MD5 value and, if they do not match, returns an error. Additionally,
   *          you can calculate the MD5 while putting an object to Amazon S3 and compare the returned ETag to
   *          the calculated MD5 value.</p>
   *          <note>
   *             <p> The <code>Content-MD5</code> header is required for any request to upload an object
   *             with a retention period configured using Amazon S3 Object Lock. For more information about
   *             Amazon S3 Object Lock, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock-overview.html">Amazon S3 Object Lock Overview</a>
   *             in the <i>Amazon Simple Storage Service Developer Guide</i>. </p>
   *          </note>
   *
   *
   *          <p>
   *             <b>Server-side Encryption</b>
   *          </p>
   *          <p>You can optionally request server-side encryption. With server-side encryption, Amazon S3 encrypts your data as it writes it to disks in its data centers and decrypts the data
   *          when you access it. You have the option to provide your own encryption key or use AWS
   *          managed encryption keys (SSE-S3 or SSE-KMS). For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html">Using Server-Side
   *             Encryption</a>.</p>
   *          <p>If you request server-side encryption using AWS Key Management Service (SSE-KMS), you can enable an S3 Bucket Key at the object-level. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-key.html">Amazon S3 Bucket Keys</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *          <p>
   *             <b>Access Control List (ACL)-Specific Request
   *          Headers</b>
   *          </p>
   *          <p>You can use headers to grant ACL- based permissions. By default, all objects are
   *          private. Only the owner has full access control. When adding a new object, you can grant
   *          permissions to individual AWS accounts or to predefined groups defined by Amazon S3. These
   *          permissions are then added to the ACL on the object. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html">Access Control List
   *             (ACL) Overview</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-using-rest-api.html">Managing ACLs Using the REST
   *             API</a>. </p>
   *
   *          <p>
   *             <b>Storage Class Options</b>
   *          </p>
   *          <p>By default, Amazon S3 uses the STANDARD Storage Class to store newly created objects. The
   *          STANDARD storage class provides high durability and high availability. Depending on
   *          performance needs, you can specify a different Storage Class. Amazon S3 on Outposts only uses
   *          the OUTPOSTS Storage Class. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html">Storage Classes</a> in the <i>Amazon S3
   *             Service Developer Guide</i>.</p>
   *
   *
   *          <p>
   *             <b>Versioning</b>
   *          </p>
   *          <p>If you enable versioning for a bucket, Amazon S3 automatically generates a unique version ID
   *          for the object being stored. Amazon S3 returns this ID in the response. When you enable
   *          versioning for a bucket, if Amazon S3 receives multiple write requests for the same object
   *          simultaneously, it stores all of the objects.</p>
   *          <p>For more information about versioning, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/AddingObjectstoVersioningEnabledBuckets.html">Adding Objects to
   *             Versioning Enabled Buckets</a>. For information about returning the versioning state
   *          of a bucket, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketVersioning.html">GetBucketVersioning</a>. </p>
   *
   *
   *          <p class="title">
   *             <b>Related Resources</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CopyObject.html">CopyObject</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObject.html">DeleteObject</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putObject(args: PutObjectCommandInput, options?: __HttpHandlerOptions): Promise<PutObjectCommandOutput>;
  public putObject(args: PutObjectCommandInput, cb: (err: any, data?: PutObjectCommandOutput) => void): void;
  public putObject(
    args: PutObjectCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutObjectCommandOutput) => void
  ): void;
  public putObject(
    args: PutObjectCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutObjectCommandOutput) => void),
    cb?: (err: any, data?: PutObjectCommandOutput) => void
  ): Promise<PutObjectCommandOutput> | void {
    const command = new PutObjectCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Uses the <code>acl</code> subresource to set the access control list (ACL) permissions
   *          for a new or existing object in an S3 bucket. You must have <code>WRITE_ACP</code>
   *          permission to set the ACL of an object. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#permissions">What
   *             permissions can I grant?</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *          <p>This action is not supported by Amazon S3 on Outposts.</p>
   *          <p>Depending on your application needs, you can choose to set
   *          the ACL on an object using either the request body or the headers. For example, if you have
   *          an existing application that updates a bucket ACL using the request body, you can continue
   *          to use that approach. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html">Access Control List (ACL) Overview</a> in the <i>Amazon S3 Developer
   *             Guide</i>.</p>
   *
   *
   *
   *          <p>
   *             <b>Access Permissions</b>
   *          </p>
   *          <p>You can set access permissions using one of the following methods:</p>
   *          <ul>
   *             <li>
   *                <p>Specify a canned ACL with the <code>x-amz-acl</code> request header. Amazon S3 supports
   *                a set of predefined ACLs, known as canned ACLs. Each canned ACL has a predefined set
   *                of grantees and permissions. Specify the canned ACL name as the value of
   *                   <code>x-amz-ac</code>l. If you use this header, you cannot use other access
   *                control-specific headers in your request. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#CannedACL">Canned ACL</a>.</p>
   *             </li>
   *             <li>
   *                <p>Specify access permissions explicitly with the <code>x-amz-grant-read</code>,
   *                   <code>x-amz-grant-read-acp</code>, <code>x-amz-grant-write-acp</code>, and
   *                   <code>x-amz-grant-full-control</code> headers. When using these headers, you
   *                specify explicit access permissions and grantees (AWS accounts or Amazon S3 groups) who
   *                will receive the permission. If you use these ACL-specific headers, you cannot use
   *                   <code>x-amz-acl</code> header to set a canned ACL. These parameters map to the set
   *                of permissions that Amazon S3 supports in an ACL. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html">Access Control List (ACL)
   *                Overview</a>.</p>
   *
   *                <p>You specify each grantee as a type=value pair, where the type is one of the
   *                following:</p>
   *                <ul>
   *                   <li>
   *                      <p>
   *                         <code>id</code> – if the value specified is the canonical user ID of an AWS
   *                      account</p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <code>uri</code> – if you are granting permissions to a predefined
   *                      group</p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <code>emailAddress</code> – if the value specified is the email address of
   *                      an AWS account</p>
   *                      <note>
   *                         <p>Using email addresses to specify a grantee is only supported in the following AWS Regions: </p>
   *                         <ul>
   *                            <li>
   *                               <p>US East (N. Virginia)</p>
   *                            </li>
   *                            <li>
   *                               <p>US West (N. California)</p>
   *                            </li>
   *                            <li>
   *                               <p> US West (Oregon)</p>
   *                            </li>
   *                            <li>
   *                               <p> Asia Pacific (Singapore)</p>
   *                            </li>
   *                            <li>
   *                               <p>Asia Pacific (Sydney)</p>
   *                            </li>
   *                            <li>
   *                               <p>Asia Pacific (Tokyo)</p>
   *                            </li>
   *                            <li>
   *                               <p>Europe (Ireland)</p>
   *                            </li>
   *                            <li>
   *                               <p>South America (São Paulo)</p>
   *                            </li>
   *                         </ul>
   *                         <p>For a list of all the Amazon S3 supported Regions and endpoints, see <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region">Regions and Endpoints</a> in the AWS General Reference.</p>
   *                      </note>
   *                   </li>
   *                </ul>
   *                <p>For example, the following <code>x-amz-grant-read</code> header grants list
   *                objects permission to the two AWS accounts identified by their email
   *                addresses.</p>
   *                <p>
   *                   <code>x-amz-grant-read: emailAddress="xyz@amazon.com",
   *                   emailAddress="abc@amazon.com" </code>
   *                </p>
   *
   *             </li>
   *          </ul>
   *          <p>You can use either a canned ACL or specify access permissions explicitly. You cannot do
   *          both.</p>
   *          <p>
   *             <b>Grantee Values</b>
   *          </p>
   *          <p>You can specify the person (grantee) to whom you're assigning access rights (using
   *          request elements) in the following ways:</p>
   *          <ul>
   *             <li>
   *                <p>By the person's ID:</p>
   *                <p>
   *                   <code><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   *                   xsi:type="CanonicalUser"><ID><>ID<></ID><DisplayName><>GranteesEmail<></DisplayName>
   *                   </Grantee></code>
   *                </p>
   *                <p>DisplayName is optional and ignored in the request.</p>
   *             </li>
   *             <li>
   *                <p>By URI:</p>
   *                <p>
   *                   <code><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   *                   xsi:type="Group"><URI><>http://acs.amazonaws.com/groups/global/AuthenticatedUsers<></URI></Grantee></code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>By Email address:</p>
   *                <p>
   *                   <code><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   *                   xsi:type="AmazonCustomerByEmail"><EmailAddress><>Grantees@email.com<></EmailAddress>lt;/Grantee></code>
   *                </p>
   *                <p>The grantee is resolved to the CanonicalUser and, in a response to a GET Object
   *                acl request, appears as the CanonicalUser.</p>
   *                <note>
   *                   <p>Using email addresses to specify a grantee is only supported in the following AWS Regions: </p>
   *                   <ul>
   *                      <li>
   *                         <p>US East (N. Virginia)</p>
   *                      </li>
   *                      <li>
   *                         <p>US West (N. California)</p>
   *                      </li>
   *                      <li>
   *                         <p> US West (Oregon)</p>
   *                      </li>
   *                      <li>
   *                         <p> Asia Pacific (Singapore)</p>
   *                      </li>
   *                      <li>
   *                         <p>Asia Pacific (Sydney)</p>
   *                      </li>
   *                      <li>
   *                         <p>Asia Pacific (Tokyo)</p>
   *                      </li>
   *                      <li>
   *                         <p>Europe (Ireland)</p>
   *                      </li>
   *                      <li>
   *                         <p>South America (São Paulo)</p>
   *                      </li>
   *                   </ul>
   *                   <p>For a list of all the Amazon S3 supported Regions and endpoints, see <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region">Regions and Endpoints</a> in the AWS General Reference.</p>
   *                </note>
   *             </li>
   *          </ul>
   *          <p>
   *             <b>Versioning</b>
   *          </p>
   *          <p>The ACL of an object is set at the object version level. By default, PUT sets the ACL of
   *          the current version of an object. To set the ACL of a different version, use the
   *             <code>versionId</code> subresource.</p>
   *          <p class="title">
   *             <b>Related Resources</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CopyObject.html">CopyObject</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putObjectAcl(
    args: PutObjectAclCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutObjectAclCommandOutput>;
  public putObjectAcl(args: PutObjectAclCommandInput, cb: (err: any, data?: PutObjectAclCommandOutput) => void): void;
  public putObjectAcl(
    args: PutObjectAclCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutObjectAclCommandOutput) => void
  ): void;
  public putObjectAcl(
    args: PutObjectAclCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutObjectAclCommandOutput) => void),
    cb?: (err: any, data?: PutObjectAclCommandOutput) => void
  ): Promise<PutObjectAclCommandOutput> | void {
    const command = new PutObjectAclCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Applies a Legal Hold configuration to the specified object.</p>
   *          <p>This action is not supported by Amazon S3 on Outposts.</p>
   *          <p class="title">
   *             <b>Related Resources</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock.html">Locking Objects</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putObjectLegalHold(
    args: PutObjectLegalHoldCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutObjectLegalHoldCommandOutput>;
  public putObjectLegalHold(
    args: PutObjectLegalHoldCommandInput,
    cb: (err: any, data?: PutObjectLegalHoldCommandOutput) => void
  ): void;
  public putObjectLegalHold(
    args: PutObjectLegalHoldCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutObjectLegalHoldCommandOutput) => void
  ): void;
  public putObjectLegalHold(
    args: PutObjectLegalHoldCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutObjectLegalHoldCommandOutput) => void),
    cb?: (err: any, data?: PutObjectLegalHoldCommandOutput) => void
  ): Promise<PutObjectLegalHoldCommandOutput> | void {
    const command = new PutObjectLegalHoldCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Places an Object Lock configuration on the specified bucket. The rule specified in the
   *          Object Lock configuration will be applied by default to every new object placed in the
   *          specified bucket.</p>
   *          <note>
   *             <p>
   *                <code>DefaultRetention</code> requires either Days or Years. You can't specify both
   *             at the same time.</p>
   *          </note>
   *          <p class="title">
   *             <b>Related Resources</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock.html">Locking
   *                   Objects</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putObjectLockConfiguration(
    args: PutObjectLockConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutObjectLockConfigurationCommandOutput>;
  public putObjectLockConfiguration(
    args: PutObjectLockConfigurationCommandInput,
    cb: (err: any, data?: PutObjectLockConfigurationCommandOutput) => void
  ): void;
  public putObjectLockConfiguration(
    args: PutObjectLockConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutObjectLockConfigurationCommandOutput) => void
  ): void;
  public putObjectLockConfiguration(
    args: PutObjectLockConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutObjectLockConfigurationCommandOutput) => void),
    cb?: (err: any, data?: PutObjectLockConfigurationCommandOutput) => void
  ): Promise<PutObjectLockConfigurationCommandOutput> | void {
    const command = new PutObjectLockConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Places an Object Retention configuration on an object.</p>
   *          <p>This action is not supported by Amazon S3 on Outposts.</p>
   *          <p class="title">
   *             <b>Related Resources</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock.html">Locking Objects</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putObjectRetention(
    args: PutObjectRetentionCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutObjectRetentionCommandOutput>;
  public putObjectRetention(
    args: PutObjectRetentionCommandInput,
    cb: (err: any, data?: PutObjectRetentionCommandOutput) => void
  ): void;
  public putObjectRetention(
    args: PutObjectRetentionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutObjectRetentionCommandOutput) => void
  ): void;
  public putObjectRetention(
    args: PutObjectRetentionCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutObjectRetentionCommandOutput) => void),
    cb?: (err: any, data?: PutObjectRetentionCommandOutput) => void
  ): Promise<PutObjectRetentionCommandOutput> | void {
    const command = new PutObjectRetentionCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Sets the supplied tag-set to an object that already exists in a bucket.</p>
   *          <p>A tag is a key-value pair. You can associate tags with an object by sending a PUT
   *          request against the tagging subresource that is associated with the object. You can
   *          retrieve tags by sending a GET request. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObjectTagging.html">GetObjectTagging</a>.</p>
   *
   *          <p>For tagging-related restrictions related to characters and encodings, see <a href="https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/allocation-tag-restrictions.html">Tag
   *             Restrictions</a>. Note that Amazon S3 limits the maximum number of tags to 10 tags per
   *          object.</p>
   *
   *          <p>To use this operation, you must have permission to perform the
   *             <code>s3:PutObjectTagging</code> action. By default, the bucket owner has this
   *          permission and can grant this permission to others.</p>
   *
   *          <p>To put tags of any other version, use the <code>versionId</code> query parameter. You
   *          also need permission for the <code>s3:PutObjectVersionTagging</code> action.</p>
   *
   *          <p>For information about the Amazon S3 object tagging feature, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-tagging.html">Object Tagging</a>.</p>
   *
   *
   *          <p class="title">
   *             <b>Special Errors</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <ul>
   *                   <li>
   *                      <p>
   *                         <i>Code: InvalidTagError </i>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>Cause: The tag provided was not a valid tag. This error can occur
   *                         if the tag did not pass input validation. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-tagging.html">Object Tagging</a>.</i>
   *                      </p>
   *                   </li>
   *                </ul>
   *             </li>
   *             <li>
   *                <ul>
   *                   <li>
   *                      <p>
   *                         <i>Code: MalformedXMLError </i>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>Cause: The XML provided does not match the schema.</i>
   *                      </p>
   *                   </li>
   *                </ul>
   *             </li>
   *             <li>
   *                <ul>
   *                   <li>
   *                      <p>
   *                         <i>Code: OperationAbortedError </i>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>Cause: A conflicting conditional operation is currently in
   *                         progress against this resource. Please try again.</i>
   *                      </p>
   *                   </li>
   *                </ul>
   *             </li>
   *             <li>
   *                <ul>
   *                   <li>
   *                      <p>
   *                         <i>Code: InternalError</i>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>Cause: The service was unable to apply the provided tag to the
   *                         object.</i>
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
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObjectTagging.html">GetObjectTagging</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putObjectTagging(
    args: PutObjectTaggingCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutObjectTaggingCommandOutput>;
  public putObjectTagging(
    args: PutObjectTaggingCommandInput,
    cb: (err: any, data?: PutObjectTaggingCommandOutput) => void
  ): void;
  public putObjectTagging(
    args: PutObjectTaggingCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutObjectTaggingCommandOutput) => void
  ): void;
  public putObjectTagging(
    args: PutObjectTaggingCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutObjectTaggingCommandOutput) => void),
    cb?: (err: any, data?: PutObjectTaggingCommandOutput) => void
  ): Promise<PutObjectTaggingCommandOutput> | void {
    const command = new PutObjectTaggingCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates or modifies the <code>PublicAccessBlock</code> configuration for an Amazon S3 bucket.
   *          To use this operation, you must have the <code>s3:PutBucketPublicAccessBlock</code>
   *          permission. For more information about Amazon S3 permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html">Specifying Permissions in a
   *          Policy</a>.</p>
   *
   *          <important>
   *             <p>When Amazon S3 evaluates the <code>PublicAccessBlock</code> configuration for a bucket or
   *             an object, it checks the <code>PublicAccessBlock</code> configuration for both the
   *             bucket (or the bucket that contains the object) and the bucket owner's account. If the
   *                <code>PublicAccessBlock</code> configurations are different between the bucket and
   *             the account, Amazon S3 uses the most restrictive combination of the bucket-level and
   *             account-level settings.</p>
   *          </important>
   *
   *
   *          <p>For more information about when Amazon S3 considers a bucket or an object public, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html#access-control-block-public-access-policy-status">The Meaning of "Public"</a>.</p>
   *
   *
   *
   *          <p class="title">
   *             <b>Related Resources</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetPublicAccessBlock.html">GetPublicAccessBlock</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeletePublicAccessBlock.html">DeletePublicAccessBlock</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketPolicyStatus.html">GetBucketPolicyStatus</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html">Using Amazon S3 Block
   *                   Public Access</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public putPublicAccessBlock(
    args: PutPublicAccessBlockCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutPublicAccessBlockCommandOutput>;
  public putPublicAccessBlock(
    args: PutPublicAccessBlockCommandInput,
    cb: (err: any, data?: PutPublicAccessBlockCommandOutput) => void
  ): void;
  public putPublicAccessBlock(
    args: PutPublicAccessBlockCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutPublicAccessBlockCommandOutput) => void
  ): void;
  public putPublicAccessBlock(
    args: PutPublicAccessBlockCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutPublicAccessBlockCommandOutput) => void),
    cb?: (err: any, data?: PutPublicAccessBlockCommandOutput) => void
  ): Promise<PutPublicAccessBlockCommandOutput> | void {
    const command = new PutPublicAccessBlockCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Restores an archived copy of an object back into Amazon S3</p>
   *          <p>This action is not supported by Amazon S3 on Outposts.</p>
   *          <p>This action performs the following types of requests: </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <code>select</code> - Perform a select query on an archived object</p>
   *             </li>
   *             <li>
   *                <p>
   *                   <code>restore an archive</code> - Restore an archived object</p>
   *             </li>
   *          </ul>
   *          <p>To use this operation, you must have permissions to perform the
   *             <code>s3:RestoreObject</code> action. The bucket owner has this permission by default
   *          and can grant this permission to others. For more information about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
   *             Resources</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *          <p>
   *             <b>Querying Archives with Select Requests</b>
   *          </p>
   *          <p>You use a select type of request to perform SQL queries on archived objects. The
   *          archived objects that are being queried by the select request must be formatted as
   *          uncompressed comma-separated values (CSV) files. You can run queries and custom analytics
   *          on your archived data without having to restore your data to a hotter Amazon S3 tier. For an
   *          overview about select requests, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/querying-glacier-archives.html">Querying Archived Objects</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *          <p>When making a select request, do the following:</p>
   *          <ul>
   *             <li>
   *                <p>Define an output location for the select query's output. This must be an Amazon S3
   *                bucket in the same AWS Region as the bucket that contains the archive object that is
   *                being queried. The AWS account that initiates the job must have permissions to write
   *                to the S3 bucket. You can specify the storage class and encryption for the output
   *                objects stored in the bucket. For more information about output, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/querying-glacier-archives.html">Querying Archived Objects</a>
   *                in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *                <p>For more information about the <code>S3</code> structure in the request body, see
   *                the following:</p>
   *                <ul>
   *                   <li>
   *                      <p>
   *                         <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html">PutObject</a>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/S3_ACLs_UsingACLs.html">Managing Access with
   *                         ACLs</a> in the <i>Amazon Simple Storage Service Developer Guide</i>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/serv-side-encryption.html">Protecting Data Using
   *                         Server-Side Encryption</a> in the
   *                      <i>Amazon Simple Storage Service Developer Guide</i>
   *                      </p>
   *                   </li>
   *                </ul>
   *             </li>
   *             <li>
   *                <p>Define the SQL expression for the <code>SELECT</code> type of restoration for your
   *                query in the request body's <code>SelectParameters</code> structure. You can use
   *                expressions like the following examples.</p>
   *                <ul>
   *                   <li>
   *                      <p>The following expression returns all records from the specified
   *                      object.</p>
   *                      <p>
   *                         <code>SELECT * FROM Object</code>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>Assuming that you are not using any headers for data stored in the object,
   *                      you can specify columns with positional headers.</p>
   *                      <p>
   *                         <code>SELECT s._1, s._2 FROM Object s WHERE s._3 > 100</code>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>If you have headers and you set the <code>fileHeaderInfo</code> in the
   *                         <code>CSV</code> structure in the request body to <code>USE</code>, you can
   *                      specify headers in the query. (If you set the <code>fileHeaderInfo</code> field
   *                      to <code>IGNORE</code>, the first row is skipped for the query.) You cannot mix
   *                      ordinal positions with header column names. </p>
   *                      <p>
   *                         <code>SELECT s.Id, s.FirstName, s.SSN FROM S3Object s</code>
   *                      </p>
   *                   </li>
   *                </ul>
   *             </li>
   *          </ul>
   *          <p>For more information about using SQL with S3 Glacier Select restore, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-glacier-select-sql-reference.html">SQL Reference for Amazon S3 Select and
   *             S3 Glacier Select</a> in the <i>Amazon Simple Storage Service Developer Guide</i>. </p>
   *          <p>When making a select request, you can also do the following:</p>
   *          <ul>
   *             <li>
   *                <p>To expedite your queries, specify the <code>Expedited</code> tier. For more
   *                information about tiers, see "Restoring Archives," later in this topic.</p>
   *             </li>
   *             <li>
   *                <p>Specify details about the data serialization format of both the input object that
   *                is being queried and the serialization of the CSV-encoded query results.</p>
   *             </li>
   *          </ul>
   *          <p>The following are additional important facts about the select feature:</p>
   *          <ul>
   *             <li>
   *                <p>The output results are new Amazon S3 objects. Unlike archive retrievals, they are
   *                stored until explicitly deleted-manually or through a lifecycle policy.</p>
   *             </li>
   *             <li>
   *                <p>You can issue more than one select request on the same Amazon S3 object. Amazon S3 doesn't
   *                deduplicate requests, so avoid issuing duplicate requests.</p>
   *             </li>
   *             <li>
   *                <p> Amazon S3 accepts a select request even if the object has already been restored. A
   *                select request doesn’t return error response <code>409</code>.</p>
   *             </li>
   *          </ul>
   *          <p>
   *             <b>Restoring objects</b>
   *          </p>
   *          <p>Objects that you archive to the S3 Glacier or
   *          S3 Glacier Deep Archive storage class, and S3 Intelligent-Tiering Archive or
   *          S3 Intelligent-Tiering Deep Archive tiers are not accessible in real time. For objects in
   *          Archive Access or Deep Archive Access tiers you must first initiate a restore request, and
   *          then wait until the object is moved into the Frequent Access tier. For objects in
   *          S3 Glacier or S3 Glacier Deep Archive storage classes you must
   *          first initiate a restore request, and then wait until a temporary copy of the object is
   *          available. To access an archived object, you must restore the object for the duration
   *          (number of days) that you specify.</p>
   *          <p>To restore a specific object version, you can provide a version ID. If you don't provide
   *          a version ID, Amazon S3 restores the current version.</p>
   *          <p>When restoring an archived object (or using a select request), you can specify one of
   *          the following data access tier options in the <code>Tier</code> element of the request
   *          body: </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <b>
   *                      <code>Expedited</code>
   *                   </b> - Expedited retrievals
   *                allow you to quickly access your data stored in the S3 Glacier
   *                storage class or S3 Intelligent-Tiering Archive tier when occasional urgent requests for a
   *                subset of archives are required. For all but the largest archived objects (250 MB+),
   *                data accessed using Expedited retrievals is typically made available within 1–5
   *                minutes. Provisioned capacity ensures that retrieval capacity for Expedited
   *                retrievals is available when you need it. Expedited retrievals and provisioned
   *                capacity are not available for objects stored in the S3 Glacier Deep Archive
   *                storage class or S3 Intelligent-Tiering Deep Archive tier.</p>
   *             </li>
   *             <li>
   *                <p>
   *                   <b>
   *                      <code>Standard</code>
   *                   </b> - Standard retrievals allow
   *                you to access any of your archived objects within several hours. This is the default
   *                option for retrieval requests that do not specify the retrieval option. Standard
   *                retrievals typically finish within 3–5 hours for objects stored in the
   *                S3 Glacier storage class or S3 Intelligent-Tiering Archive tier. They
   *                typically finish within 12 hours for objects stored in the
   *                S3 Glacier Deep Archive storage class or S3 Intelligent-Tiering Deep Archive tier.
   *                Standard retrievals are free for objects stored in S3 Intelligent-Tiering.</p>
   *             </li>
   *             <li>
   *                <p>
   *                   <b>
   *                      <code>Bulk</code>
   *                   </b> - Bulk retrievals are the
   *                lowest-cost retrieval option in S3 Glacier, enabling you to retrieve large amounts,
   *                even petabytes, of data inexpensively. Bulk retrievals typically finish within 5–12
   *                hours for objects stored in the S3 Glacier storage class or
   *                S3 Intelligent-Tiering Archive tier. They typically finish within 48 hours for objects stored
   *                in the S3 Glacier Deep Archive storage class or S3 Intelligent-Tiering Deep Archive tier.
   *                Bulk retrievals are free for objects stored in S3 Intelligent-Tiering.</p>
   *             </li>
   *          </ul>
   *          <p>For more information about archive retrieval options and provisioned capacity for
   *             <code>Expedited</code> data access, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/restoring-objects.html">Restoring Archived Objects</a> in the <i>Amazon Simple Storage Service Developer Guide</i>. </p>
   *          <p>You can use Amazon S3 restore speed upgrade to change the restore speed to a faster speed
   *          while it is in progress. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/restoring-objects.html#restoring-objects-upgrade-tier.title.html">
   *             Upgrading the speed of an in-progress restore</a> in the
   *             <i>Amazon Simple Storage Service Developer Guide</i>. </p>
   *          <p>To get the status of object restoration, you can send a <code>HEAD</code> request.
   *          Operations return the <code>x-amz-restore</code> header, which provides information about
   *          the restoration status, in the response. You can use Amazon S3 event notifications to notify you
   *          when a restore is initiated or completed. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html">Configuring Amazon S3 Event Notifications</a> in
   *          the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *          <p>After restoring an archived object, you can update the restoration period by reissuing
   *          the request with a new period. Amazon S3 updates the restoration period relative to the current
   *          time and charges only for the request-there are no data transfer charges. You cannot
   *          update the restoration period when Amazon S3 is actively processing your current restore request
   *          for the object.</p>
   *          <p>If your bucket has a lifecycle configuration with a rule that includes an expiration
   *          action, the object expiration overrides the life span that you specify in a restore
   *          request. For example, if you restore an object copy for 10 days, but the object is
   *          scheduled to expire in 3 days, Amazon S3 deletes the object in 3 days. For more information
   *          about lifecycle configuration, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLifecycleConfiguration.html">PutBucketLifecycleConfiguration</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html">Object Lifecycle Management</a> in
   *             <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *          <p>
   *             <b>Responses</b>
   *          </p>
   *          <p>A successful operation returns either the <code>200 OK</code> or <code>202
   *             Accepted</code> status code. </p>
   *          <ul>
   *             <li>
   *                <p>If the object is not previously restored, then Amazon S3 returns <code>202
   *                   Accepted</code> in the response. </p>
   *             </li>
   *             <li>
   *                <p>If the object is previously restored, Amazon S3 returns <code>200 OK</code> in the
   *                response. </p>
   *             </li>
   *          </ul>
   *          <p class="title">
   *             <b>Special Errors</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <ul>
   *                   <li>
   *                      <p>
   *                         <i>Code: RestoreAlreadyInProgress</i>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>Cause: Object restore is already in progress. (This error does not
   *                         apply to SELECT type requests.)</i>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>HTTP Status Code: 409 Conflict</i>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>SOAP Fault Code Prefix: Client</i>
   *                      </p>
   *                   </li>
   *                </ul>
   *             </li>
   *             <li>
   *                <ul>
   *                   <li>
   *                      <p>
   *                         <i>Code: GlacierExpeditedRetrievalNotAvailable</i>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>Cause: expedited retrievals are currently not available. Try again
   *                         later. (Returned if there is insufficient capacity to process the Expedited
   *                         request. This error applies only to Expedited retrievals and not to
   *                         S3 Standard or Bulk retrievals.)</i>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>HTTP Status Code: 503</i>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <i>SOAP Fault Code Prefix: N/A</i>
   *                      </p>
   *                   </li>
   *                </ul>
   *             </li>
   *          </ul>
   *
   *          <p class="title">
   *             <b>Related Resources</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLifecycleConfiguration.html">PutBucketLifecycleConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketNotificationConfiguration.html">GetBucketNotificationConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-glacier-select-sql-reference.html">SQL Reference for
   *                   Amazon S3 Select and S3 Glacier Select </a> in the
   *                   <i>Amazon Simple Storage Service Developer Guide</i>
   *                </p>
   *             </li>
   *          </ul>
   */
  public restoreObject(
    args: RestoreObjectCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<RestoreObjectCommandOutput>;
  public restoreObject(
    args: RestoreObjectCommandInput,
    cb: (err: any, data?: RestoreObjectCommandOutput) => void
  ): void;
  public restoreObject(
    args: RestoreObjectCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: RestoreObjectCommandOutput) => void
  ): void;
  public restoreObject(
    args: RestoreObjectCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: RestoreObjectCommandOutput) => void),
    cb?: (err: any, data?: RestoreObjectCommandOutput) => void
  ): Promise<RestoreObjectCommandOutput> | void {
    const command = new RestoreObjectCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>This operation filters the contents of an Amazon S3 object based on a simple structured query
   *          language (SQL) statement. In the request, along with the SQL expression, you must also
   *          specify a data serialization format (JSON, CSV, or Apache Parquet) of the object. Amazon S3 uses
   *          this format to parse object data into records, and returns only records that match the
   *          specified SQL expression. You must also specify the data serialization format for the
   *          response.</p>
   *          <p>This action is not supported by Amazon S3 on Outposts.</p>
   *          <p>For more information about Amazon S3 Select,
   *          see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/selecting-content-from-objects.html">Selecting Content from
   *             Objects</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *          <p>For more information about using SQL with Amazon S3 Select, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-glacier-select-sql-reference.html"> SQL Reference for Amazon S3 Select
   *             and S3 Glacier Select</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *          <p></p>
   *          <p>
   *             <b>Permissions</b>
   *          </p>
   *          <p>You must have <code>s3:GetObject</code> permission for this operation. Amazon S3 Select does
   *          not support anonymous access. For more information about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html">Specifying Permissions in a Policy</a>
   *          in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *          <p></p>
   *          <p>
   *             <i>Object Data Formats</i>
   *          </p>
   *          <p>You can use Amazon S3 Select to query objects that have the following format
   *          properties:</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <i>CSV, JSON, and Parquet</i> - Objects must be in CSV, JSON, or
   *                Parquet format.</p>
   *             </li>
   *             <li>
   *                <p>
   *                   <i>UTF-8</i> - UTF-8 is the only encoding type Amazon S3 Select
   *                supports.</p>
   *             </li>
   *             <li>
   *                <p>
   *                   <i>GZIP or BZIP2</i> - CSV and JSON files can be compressed using
   *                GZIP or BZIP2. GZIP and BZIP2 are the only compression formats that Amazon S3 Select
   *                supports for CSV and JSON files. Amazon S3 Select supports columnar compression for
   *                Parquet using GZIP or Snappy. Amazon S3 Select does not support whole-object compression
   *                for Parquet objects.</p>
   *             </li>
   *             <li>
   *                <p>
   *                   <i>Server-side encryption</i> - Amazon S3 Select supports querying
   *                objects that are protected with server-side encryption.</p>
   *                <p>For objects that are encrypted with customer-provided encryption keys (SSE-C), you
   *                must use HTTPS, and you must use the headers that are documented in the <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>. For more information about SSE-C, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/ServerSideEncryptionCustomerKeys.html">Server-Side Encryption
   *                   (Using Customer-Provided Encryption Keys)</a> in the
   *                   <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *                <p>For objects that are encrypted with Amazon S3 managed encryption keys (SSE-S3) and
   *                customer master keys (CMKs) stored in AWS Key Management Service (SSE-KMS),
   *                server-side encryption is handled transparently, so you don't need to specify
   *                anything. For more information about server-side encryption, including SSE-S3 and
   *                SSE-KMS, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/serv-side-encryption.html">Protecting Data Using
   *                   Server-Side Encryption</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *             </li>
   *          </ul>
   *
   *          <p>
   *             <b>Working with the Response Body</b>
   *          </p>
   *          <p>Given the response size is unknown, Amazon S3 Select streams the response as a series of
   *          messages and includes a <code>Transfer-Encoding</code> header with <code>chunked</code> as
   *          its value in the response. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/RESTSelectObjectAppendix.html">Appendix: SelectObjectContent
   *             Response</a>
   *          .</p>
   *
   *          <p></p>
   *          <p>
   *             <b>GetObject Support</b>
   *          </p>
   *          <p>The <code>SelectObjectContent</code> operation does not support the following
   *             <code>GetObject</code> functionality. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>.</p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <code>Range</code>: Although you can specify a scan range for an Amazon S3 Select request
   *                (see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_SelectObjectContent.html#AmazonS3-SelectObjectContent-request-ScanRange">SelectObjectContentRequest - ScanRange</a> in the request parameters),
   *                you cannot specify the range of bytes of an object to return. </p>
   *             </li>
   *             <li>
   *                <p>GLACIER, DEEP_ARCHIVE and REDUCED_REDUNDANCY storage classes: You cannot specify
   *                the GLACIER, DEEP_ARCHIVE, or <code>REDUCED_REDUNDANCY</code> storage classes. For
   *                more information, about storage classes see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html#storage-class-intro">Storage Classes</a>
   *                in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
   *             </li>
   *          </ul>
   *          <p></p>
   *          <p>
   *             <b>Special Errors</b>
   *          </p>
   *
   *          <p>For a list of special errors for this operation, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/ErrorResponses.html#SelectObjectContentErrorCodeList">List of
   *             SELECT Object Content Error Codes</a>
   *          </p>
   *          <p class="title">
   *             <b>Related Resources</b>
   *          </p>
   *          <ul>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLifecycleConfiguration.html">GetBucketLifecycleConfiguration</a>
   *                </p>
   *             </li>
   *             <li>
   *                <p>
   *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLifecycleConfiguration.html">PutBucketLifecycleConfiguration</a>
   *                </p>
   *             </li>
   *          </ul>
   */
  public selectObjectContent(
    args: SelectObjectContentCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<SelectObjectContentCommandOutput>;
  public selectObjectContent(
    args: SelectObjectContentCommandInput,
    cb: (err: any, data?: SelectObjectContentCommandOutput) => void
  ): void;
  public selectObjectContent(
    args: SelectObjectContentCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: SelectObjectContentCommandOutput) => void
  ): void;
  public selectObjectContent(
    args: SelectObjectContentCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: SelectObjectContentCommandOutput) => void),
    cb?: (err: any, data?: SelectObjectContentCommandOutput) => void
  ): Promise<SelectObjectContentCommandOutput> | void {
    const command = new SelectObjectContentCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public uploadPart(args: UploadPartCommandInput, options?: __HttpHandlerOptions): Promise<UploadPartCommandOutput>;
  public uploadPart(args: UploadPartCommandInput, cb: (err: any, data?: UploadPartCommandOutput) => void): void;
  public uploadPart(
    args: UploadPartCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UploadPartCommandOutput) => void
  ): void;
  public uploadPart(
    args: UploadPartCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UploadPartCommandOutput) => void),
    cb?: (err: any, data?: UploadPartCommandOutput) => void
  ): Promise<UploadPartCommandOutput> | void {
    const command = new UploadPartCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public uploadPartCopy(
    args: UploadPartCopyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UploadPartCopyCommandOutput>;
  public uploadPartCopy(
    args: UploadPartCopyCommandInput,
    cb: (err: any, data?: UploadPartCopyCommandOutput) => void
  ): void;
  public uploadPartCopy(
    args: UploadPartCopyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UploadPartCopyCommandOutput) => void
  ): void;
  public uploadPartCopy(
    args: UploadPartCopyCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UploadPartCopyCommandOutput) => void),
    cb?: (err: any, data?: UploadPartCopyCommandOutput) => void
  ): Promise<UploadPartCopyCommandOutput> | void {
    const command = new UploadPartCopyCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }
}
