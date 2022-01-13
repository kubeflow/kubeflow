import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";
import { DeleteObjectOutput, DeleteObjectRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeleteObjectCommandInput = DeleteObjectRequest;
export declare type DeleteObjectCommandOutput = DeleteObjectOutput & __MetadataBearer;
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
export declare class DeleteObjectCommand extends $Command<DeleteObjectCommandInput, DeleteObjectCommandOutput, S3ClientResolvedConfig> {
    readonly input: DeleteObjectCommandInput;
    constructor(input: DeleteObjectCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: S3ClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteObjectCommandInput, DeleteObjectCommandOutput>;
    private serialize;
    private deserialize;
}
