import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";
import { GetBucketVersioningOutput, GetBucketVersioningRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type GetBucketVersioningCommandInput = GetBucketVersioningRequest;
export declare type GetBucketVersioningCommandOutput = GetBucketVersioningOutput & __MetadataBearer;
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
export declare class GetBucketVersioningCommand extends $Command<GetBucketVersioningCommandInput, GetBucketVersioningCommandOutput, S3ClientResolvedConfig> {
    readonly input: GetBucketVersioningCommandInput;
    constructor(input: GetBucketVersioningCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: S3ClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetBucketVersioningCommandInput, GetBucketVersioningCommandOutput>;
    private serialize;
    private deserialize;
}
