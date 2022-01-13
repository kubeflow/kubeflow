import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { ListTagsForStreamInput, ListTagsForStreamOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListTagsForStreamCommandInput = ListTagsForStreamInput;
export declare type ListTagsForStreamCommandOutput = ListTagsForStreamOutput & __MetadataBearer;
/**
 * <p>Lists the tags for the specified Kinesis data stream. This operation has a limit of
 *             five transactions per second per account.</p>
 */
export declare class ListTagsForStreamCommand extends $Command<ListTagsForStreamCommandInput, ListTagsForStreamCommandOutput, KinesisClientResolvedConfig> {
    readonly input: ListTagsForStreamCommandInput;
    constructor(input: ListTagsForStreamCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KinesisClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListTagsForStreamCommandInput, ListTagsForStreamCommandOutput>;
    private serialize;
    private deserialize;
}
