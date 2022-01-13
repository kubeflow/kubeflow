import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { ListShardsInput, ListShardsOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListShardsCommandInput = ListShardsInput;
export declare type ListShardsCommandOutput = ListShardsOutput & __MetadataBearer;
/**
 * <p>Lists the shards in a stream and provides information about each shard. This
 *             operation has a limit of 100 transactions per second per data stream.</p>
 *         <important>
 *             <p>This API is a new operation that is used by the Amazon Kinesis Client Library
 *                 (KCL). If you have a fine-grained IAM policy that only allows specific operations,
 *                 you must update your policy to allow calls to this API. For more information, see
 *                     <a href="https://docs.aws.amazon.com/streams/latest/dev/controlling-access.html">Controlling Access to Amazon Kinesis Data Streams Resources Using
 *                 IAM</a>.</p>
 *         </important>
 */
export declare class ListShardsCommand extends $Command<ListShardsCommandInput, ListShardsCommandOutput, KinesisClientResolvedConfig> {
    readonly input: ListShardsCommandInput;
    constructor(input: ListShardsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KinesisClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListShardsCommandInput, ListShardsCommandOutput>;
    private serialize;
    private deserialize;
}
