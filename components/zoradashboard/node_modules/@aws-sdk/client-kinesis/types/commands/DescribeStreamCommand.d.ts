import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { DescribeStreamInput, DescribeStreamOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeStreamCommandInput = DescribeStreamInput;
export declare type DescribeStreamCommandOutput = DescribeStreamOutput & __MetadataBearer;
/**
 * <p>Describes the specified Kinesis data stream.</p>
 *
 *         <p>The information returned includes the stream name, Amazon Resource Name (ARN),
 *             creation time, enhanced metric configuration, and shard map. The shard map is an array
 *             of shard objects. For each shard object, there is the hash key and sequence number
 *             ranges that the shard spans, and the IDs of any earlier shards that played in a role in
 *             creating the shard. Every record ingested in the stream is identified by a sequence
 *             number, which is assigned when the record is put into the stream.</p>
 *
 *         <p>You can limit the number of shards returned by each call. For more information, see
 *                 <a href="https://docs.aws.amazon.com/kinesis/latest/dev/kinesis-using-sdk-java-retrieve-shards.html">Retrieving
 *                 Shards from a Stream</a> in the <i>Amazon Kinesis Data Streams Developer
 *                 Guide</i>.</p>
 *         <p>There are no guarantees about the chronological order shards returned. To process
 *             shards in chronological order, use the ID of the parent shard to track the lineage to
 *             the oldest shard.</p>
 *         <p>This operation has a limit of 10 transactions per second per account.</p>
 */
export declare class DescribeStreamCommand extends $Command<DescribeStreamCommandInput, DescribeStreamCommandOutput, KinesisClientResolvedConfig> {
    readonly input: DescribeStreamCommandInput;
    constructor(input: DescribeStreamCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KinesisClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeStreamCommandInput, DescribeStreamCommandOutput>;
    private serialize;
    private deserialize;
}
