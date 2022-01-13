import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { ListStreamsInput, ListStreamsOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListStreamsCommandInput = ListStreamsInput;
export declare type ListStreamsCommandOutput = ListStreamsOutput & __MetadataBearer;
/**
 * <p>Lists your Kinesis data streams.</p>
 *         <p>The number of streams may be too large to return from a single call to
 *                 <code>ListStreams</code>. You can limit the number of returned streams using the
 *                 <code>Limit</code> parameter. If you do not specify a value for the
 *                 <code>Limit</code> parameter, Kinesis Data Streams uses the default limit, which is
 *             currently 10.</p>
 *         <p>You can detect if there are more streams available to list by using the
 *                 <code>HasMoreStreams</code> flag from the returned output. If there are more streams
 *             available, you can request more streams by using the name of the last stream returned by
 *             the <code>ListStreams</code> request in the <code>ExclusiveStartStreamName</code>
 *             parameter in a subsequent request to <code>ListStreams</code>. The group of stream names
 *             returned by the subsequent request is then added to the list. You can continue this
 *             process until all the stream names have been collected in the list. </p>
 *         <p>
 *             <a>ListStreams</a> has a limit of five transactions per second per
 *             account.</p>
 */
export declare class ListStreamsCommand extends $Command<ListStreamsCommandInput, ListStreamsCommandOutput, KinesisClientResolvedConfig> {
    readonly input: ListStreamsCommandInput;
    constructor(input: ListStreamsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KinesisClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListStreamsCommandInput, ListStreamsCommandOutput>;
    private serialize;
    private deserialize;
}
