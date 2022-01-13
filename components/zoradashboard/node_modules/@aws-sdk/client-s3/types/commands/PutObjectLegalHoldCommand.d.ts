import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";
import { PutObjectLegalHoldOutput, PutObjectLegalHoldRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type PutObjectLegalHoldCommandInput = PutObjectLegalHoldRequest;
export declare type PutObjectLegalHoldCommandOutput = PutObjectLegalHoldOutput & __MetadataBearer;
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
export declare class PutObjectLegalHoldCommand extends $Command<PutObjectLegalHoldCommandInput, PutObjectLegalHoldCommandOutput, S3ClientResolvedConfig> {
    readonly input: PutObjectLegalHoldCommandInput;
    constructor(input: PutObjectLegalHoldCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: S3ClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PutObjectLegalHoldCommandInput, PutObjectLegalHoldCommandOutput>;
    private serialize;
    private deserialize;
}
