import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";
import { PutBucketOwnershipControlsRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type PutBucketOwnershipControlsCommandInput = PutBucketOwnershipControlsRequest;
export declare type PutBucketOwnershipControlsCommandOutput = __MetadataBearer;
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
export declare class PutBucketOwnershipControlsCommand extends $Command<PutBucketOwnershipControlsCommandInput, PutBucketOwnershipControlsCommandOutput, S3ClientResolvedConfig> {
    readonly input: PutBucketOwnershipControlsCommandInput;
    constructor(input: PutBucketOwnershipControlsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: S3ClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PutBucketOwnershipControlsCommandInput, PutBucketOwnershipControlsCommandOutput>;
    private serialize;
    private deserialize;
}
