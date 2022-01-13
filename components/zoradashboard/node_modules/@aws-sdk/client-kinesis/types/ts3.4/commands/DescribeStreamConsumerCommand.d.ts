import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { DescribeStreamConsumerInput, DescribeStreamConsumerOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeStreamConsumerCommandInput = DescribeStreamConsumerInput;
export declare type DescribeStreamConsumerCommandOutput = DescribeStreamConsumerOutput & __MetadataBearer;
/**
 * <p>To get the description of a registered consumer, provide the ARN of the consumer.
 *             Alternatively, you can provide the ARN of the data stream and the name you gave the
 *             consumer when you registered it. You may also provide all three parameters, as long as
 *             they don't conflict with each other. If you don't know the name or ARN of the consumer
 *             that you want to describe, you can use the <a>ListStreamConsumers</a>
 *             operation to get a list of the descriptions of all the consumers that are currently
 *             registered with a given data stream.</p>
 *         <p>This operation has a limit of 20 transactions per second per stream.</p>
 */
export declare class DescribeStreamConsumerCommand extends $Command<DescribeStreamConsumerCommandInput, DescribeStreamConsumerCommandOutput, KinesisClientResolvedConfig> {
    readonly input: DescribeStreamConsumerCommandInput;
    constructor(input: DescribeStreamConsumerCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KinesisClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeStreamConsumerCommandInput, DescribeStreamConsumerCommandOutput>;
    private serialize;
    private deserialize;
}
