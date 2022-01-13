import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { DescribeStreamSummaryInput, DescribeStreamSummaryOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeStreamSummaryCommandInput = DescribeStreamSummaryInput;
export declare type DescribeStreamSummaryCommandOutput = DescribeStreamSummaryOutput & __MetadataBearer;
/**
 * <p>Provides a summarized description of the specified Kinesis data stream without the
 *             shard list.</p>
 *         <p>The information returned includes the stream name, Amazon Resource Name (ARN),
 *             status, record retention period, approximate creation time, monitoring, encryption
 *             details, and open shard count. </p>
 *         <p>
 *             <a>DescribeStreamSummary</a> has a limit of 20 transactions per second
 *             per account.</p>
 */
export declare class DescribeStreamSummaryCommand extends $Command<DescribeStreamSummaryCommandInput, DescribeStreamSummaryCommandOutput, KinesisClientResolvedConfig> {
    readonly input: DescribeStreamSummaryCommandInput;
    constructor(input: DescribeStreamSummaryCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KinesisClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeStreamSummaryCommandInput, DescribeStreamSummaryCommandOutput>;
    private serialize;
    private deserialize;
}
