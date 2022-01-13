import { FirehoseClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../FirehoseClient";
import { ListTagsForDeliveryStreamInput, ListTagsForDeliveryStreamOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListTagsForDeliveryStreamCommandInput = ListTagsForDeliveryStreamInput;
export declare type ListTagsForDeliveryStreamCommandOutput = ListTagsForDeliveryStreamOutput & __MetadataBearer;
/**
 * <p>Lists the tags for the specified delivery stream. This operation has a limit of five
 *          transactions per second per account. </p>
 */
export declare class ListTagsForDeliveryStreamCommand extends $Command<ListTagsForDeliveryStreamCommandInput, ListTagsForDeliveryStreamCommandOutput, FirehoseClientResolvedConfig> {
    readonly input: ListTagsForDeliveryStreamCommandInput;
    constructor(input: ListTagsForDeliveryStreamCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: FirehoseClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListTagsForDeliveryStreamCommandInput, ListTagsForDeliveryStreamCommandOutput>;
    private serialize;
    private deserialize;
}
