import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";
import { GetObjectLegalHoldOutput, GetObjectLegalHoldRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type GetObjectLegalHoldCommandInput = GetObjectLegalHoldRequest;
export declare type GetObjectLegalHoldCommandOutput = GetObjectLegalHoldOutput & __MetadataBearer;
/**
 * <p>Gets an object's current Legal Hold status. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock.html">Locking Objects</a>.</p>
 *          <p>This action is not supported by Amazon S3 on Outposts.</p>
 */
export declare class GetObjectLegalHoldCommand extends $Command<GetObjectLegalHoldCommandInput, GetObjectLegalHoldCommandOutput, S3ClientResolvedConfig> {
    readonly input: GetObjectLegalHoldCommandInput;
    constructor(input: GetObjectLegalHoldCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: S3ClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetObjectLegalHoldCommandInput, GetObjectLegalHoldCommandOutput>;
    private serialize;
    private deserialize;
}
