import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { ListStreamConsumersInput, ListStreamConsumersOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListStreamConsumersCommandInput = ListStreamConsumersInput;
export declare type ListStreamConsumersCommandOutput = ListStreamConsumersOutput & __MetadataBearer;
/**
 * <p>Lists the consumers registered to receive data from a stream using enhanced fan-out,
 *             and provides information about each consumer.</p>
 *         <p>This operation has a limit of 5 transactions per second per stream.</p>
 */
export declare class ListStreamConsumersCommand extends $Command<ListStreamConsumersCommandInput, ListStreamConsumersCommandOutput, KinesisClientResolvedConfig> {
    readonly input: ListStreamConsumersCommandInput;
    constructor(input: ListStreamConsumersCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KinesisClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListStreamConsumersCommandInput, ListStreamConsumersCommandOutput>;
    private serialize;
    private deserialize;
}
