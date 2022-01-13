import { FirehoseClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../FirehoseClient";
import { UntagDeliveryStreamInput, UntagDeliveryStreamOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type UntagDeliveryStreamCommandInput = UntagDeliveryStreamInput;
export declare type UntagDeliveryStreamCommandOutput = UntagDeliveryStreamOutput & __MetadataBearer;
/**
 * <p>Removes tags from the specified delivery stream. Removed tags are deleted, and you
 *          can't recover them after this operation successfully completes.</p>
 *          <p>If you specify a tag that doesn't exist, the operation ignores it.</p>
 *          <p>This operation has a limit of five transactions per second per account. </p>
 */
export declare class UntagDeliveryStreamCommand extends $Command<UntagDeliveryStreamCommandInput, UntagDeliveryStreamCommandOutput, FirehoseClientResolvedConfig> {
    readonly input: UntagDeliveryStreamCommandInput;
    constructor(input: UntagDeliveryStreamCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: FirehoseClientResolvedConfig, options?: __HttpHandlerOptions): Handler<UntagDeliveryStreamCommandInput, UntagDeliveryStreamCommandOutput>;
    private serialize;
    private deserialize;
}
