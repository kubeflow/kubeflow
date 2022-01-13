import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { DecreaseStreamRetentionPeriodInput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DecreaseStreamRetentionPeriodCommandInput = DecreaseStreamRetentionPeriodInput;
export declare type DecreaseStreamRetentionPeriodCommandOutput = __MetadataBearer;
/**
 * <p>Decreases the Kinesis data stream's retention period, which is the length of time
 *             data records are accessible after they are added to the stream. The minimum value of a
 *             stream's retention period is 24 hours.</p>
 *         <p>This operation may result in lost data. For example, if the stream's retention
 *             period is 48 hours and is decreased to 24 hours, any data already in the stream that is
 *             older than 24 hours is inaccessible.</p>
 */
export declare class DecreaseStreamRetentionPeriodCommand extends $Command<DecreaseStreamRetentionPeriodCommandInput, DecreaseStreamRetentionPeriodCommandOutput, KinesisClientResolvedConfig> {
    readonly input: DecreaseStreamRetentionPeriodCommandInput;
    constructor(input: DecreaseStreamRetentionPeriodCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KinesisClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DecreaseStreamRetentionPeriodCommandInput, DecreaseStreamRetentionPeriodCommandOutput>;
    private serialize;
    private deserialize;
}
