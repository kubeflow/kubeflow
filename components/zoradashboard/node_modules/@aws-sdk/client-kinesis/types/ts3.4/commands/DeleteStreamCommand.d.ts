import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { DeleteStreamInput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeleteStreamCommandInput = DeleteStreamInput;
export declare type DeleteStreamCommandOutput = __MetadataBearer;
/**
 * <p>Deletes a Kinesis data stream and all its shards and data. You must shut down any
 *             applications that are operating on the stream before you delete the stream. If an
 *             application attempts to operate on a deleted stream, it receives the exception
 *                 <code>ResourceNotFoundException</code>.</p>
 *         <p>If the stream is in the <code>ACTIVE</code> state, you can delete it. After a
 *                 <code>DeleteStream</code> request, the specified stream is in the
 *                 <code>DELETING</code> state until Kinesis Data Streams completes the
 *             deletion.</p>
 *         <p>
 *             <b>Note:</b> Kinesis Data Streams might continue to accept
 *             data read and write operations, such as <a>PutRecord</a>, <a>PutRecords</a>, and <a>GetRecords</a>, on a stream in the
 *                 <code>DELETING</code> state until the stream deletion is complete.</p>
 *         <p>When you delete a stream, any shards in that stream are also deleted, and any tags
 *             are dissociated from the stream.</p>
 *         <p>You can use the <a>DescribeStream</a> operation to check the state of
 *             the stream, which is returned in <code>StreamStatus</code>.</p>
 *         <p>
 *             <a>DeleteStream</a> has a limit of five transactions per second per
 *             account.</p>
 */
export declare class DeleteStreamCommand extends $Command<DeleteStreamCommandInput, DeleteStreamCommandOutput, KinesisClientResolvedConfig> {
    readonly input: DeleteStreamCommandInput;
    constructor(input: DeleteStreamCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KinesisClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteStreamCommandInput, DeleteStreamCommandOutput>;
    private serialize;
    private deserialize;
}
