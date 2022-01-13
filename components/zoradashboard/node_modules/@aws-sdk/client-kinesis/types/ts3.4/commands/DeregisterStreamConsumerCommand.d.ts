import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { DeregisterStreamConsumerInput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeregisterStreamConsumerCommandInput = DeregisterStreamConsumerInput;
export declare type DeregisterStreamConsumerCommandOutput = __MetadataBearer;
/**
 * <p>To deregister a consumer, provide its ARN. Alternatively, you can provide the ARN of
 *             the data stream and the name you gave the consumer when you registered it. You may also
 *             provide all three parameters, as long as they don't conflict with each other. If you
 *             don't know the name or ARN of the consumer that you want to deregister, you can use the
 *                 <a>ListStreamConsumers</a> operation to get a list of the descriptions of
 *             all the consumers that are currently registered with a given data stream. The
 *             description of a consumer contains its name and ARN.</p>
 *         <p>This operation has a limit of five transactions per second per stream.</p>
 */
export declare class DeregisterStreamConsumerCommand extends $Command<DeregisterStreamConsumerCommandInput, DeregisterStreamConsumerCommandOutput, KinesisClientResolvedConfig> {
    readonly input: DeregisterStreamConsumerCommandInput;
    constructor(input: DeregisterStreamConsumerCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KinesisClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeregisterStreamConsumerCommandInput, DeregisterStreamConsumerCommandOutput>;
    private serialize;
    private deserialize;
}
