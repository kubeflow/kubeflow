import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { DescribeLimitsInput, DescribeLimitsOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeLimitsCommandInput = DescribeLimitsInput;
export declare type DescribeLimitsCommandOutput = DescribeLimitsOutput & __MetadataBearer;
/**
 * <p>Describes the shard limits and usage for the account.</p>
 *         <p>If you update your account limits, the old limits might be returned for a few
 *             minutes.</p>
 *         <p>This operation has a limit of one transaction per second per account.</p>
 */
export declare class DescribeLimitsCommand extends $Command<DescribeLimitsCommandInput, DescribeLimitsCommandOutput, KinesisClientResolvedConfig> {
    readonly input: DescribeLimitsCommandInput;
    constructor(input: DescribeLimitsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KinesisClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeLimitsCommandInput, DescribeLimitsCommandOutput>;
    private serialize;
    private deserialize;
}
