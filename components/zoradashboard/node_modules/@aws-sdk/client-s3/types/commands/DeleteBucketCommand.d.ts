import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";
import { DeleteBucketRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeleteBucketCommandInput = DeleteBucketRequest;
export declare type DeleteBucketCommandOutput = __MetadataBearer;
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
export declare class DeleteBucketCommand extends $Command<DeleteBucketCommandInput, DeleteBucketCommandOutput, S3ClientResolvedConfig> {
    readonly input: DeleteBucketCommandInput;
    constructor(input: DeleteBucketCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: S3ClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteBucketCommandInput, DeleteBucketCommandOutput>;
    private serialize;
    private deserialize;
}
