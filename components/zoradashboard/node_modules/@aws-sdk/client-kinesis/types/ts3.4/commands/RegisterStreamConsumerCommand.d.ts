import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { RegisterStreamConsumerInput, RegisterStreamConsumerOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type RegisterStreamConsumerCommandInput = RegisterStreamConsumerInput;
export declare type RegisterStreamConsumerCommandOutput = RegisterStreamConsumerOutput & __MetadataBearer;
/**
 * <p>Registers a consumer with a Kinesis data stream. When you use this operation, the
 *             consumer you register can then call <a>SubscribeToShard</a> to receive data
 *             from the stream using enhanced fan-out, at a rate of up to 2 MiB per second for every
 *             shard you subscribe to. This rate is unaffected by the total number of consumers that
 *             read from the same stream.</p>
 *         <p>You can register up to 20 consumers per stream. A given consumer can only be
 *             registered with one stream at a time.</p>
 *         <p>For an example of how to use this operations, see <a href="/streams/latest/dev/building-enhanced-consumers-api.html">Enhanced Fan-Out
 *                 Using the Kinesis Data Streams API</a>.</p>
 *         <p>The use of this operation has a limit of five transactions per second per account.
 *             Also, only 5 consumers can be created simultaneously. In other words, you cannot have
 *             more than 5 consumers in a <code>CREATING</code> status at the same time. Registering a
 *             6th consumer while there are 5 in a <code>CREATING</code> status results in a
 *                 <code>LimitExceededException</code>.</p>
 */
export declare class RegisterStreamConsumerCommand extends $Command<RegisterStreamConsumerCommandInput, RegisterStreamConsumerCommandOutput, KinesisClientResolvedConfig> {
    readonly input: RegisterStreamConsumerCommandInput;
    constructor(input: RegisterStreamConsumerCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KinesisClientResolvedConfig, options?: __HttpHandlerOptions): Handler<RegisterStreamConsumerCommandInput, RegisterStreamConsumerCommandOutput>;
    private serialize;
    private deserialize;
}
