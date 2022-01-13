import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { RemoveTagsFromStreamInput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type RemoveTagsFromStreamCommandInput = RemoveTagsFromStreamInput;
export declare type RemoveTagsFromStreamCommandOutput = __MetadataBearer;
/**
 * <p>Removes tags from the specified Kinesis data stream. Removed tags are deleted and
 *             cannot be recovered after this operation successfully completes.</p>
 *         <p>If you specify a tag that does not exist, it is ignored.</p>
 *         <p>
 *             <a>RemoveTagsFromStream</a> has a limit of five transactions per second per
 *             account.</p>
 */
export declare class RemoveTagsFromStreamCommand extends $Command<RemoveTagsFromStreamCommandInput, RemoveTagsFromStreamCommandOutput, KinesisClientResolvedConfig> {
    readonly input: RemoveTagsFromStreamCommandInput;
    constructor(input: RemoveTagsFromStreamCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KinesisClientResolvedConfig, options?: __HttpHandlerOptions): Handler<RemoveTagsFromStreamCommandInput, RemoveTagsFromStreamCommandOutput>;
    private serialize;
    private deserialize;
}
