import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { AddTagsToStreamInput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type AddTagsToStreamCommandInput = AddTagsToStreamInput;
export declare type AddTagsToStreamCommandOutput = __MetadataBearer;
/**
 * <p>Adds or updates tags for the specified Kinesis data stream. Each time you invoke
 *             this operation, you can specify up to 10 tags. If you want to add more than 10 tags to
 *             your stream, you can invoke this operation multiple times. In total, each stream can
 *             have up to 50 tags.</p>
 *         <p>If tags have already been assigned to the stream, <code>AddTagsToStream</code>
 *             overwrites any existing tags that correspond to the specified tag keys.</p>
 *         <p>
 *             <a>AddTagsToStream</a> has a limit of five transactions per second per
 *             account.</p>
 */
export declare class AddTagsToStreamCommand extends $Command<AddTagsToStreamCommandInput, AddTagsToStreamCommandOutput, KinesisClientResolvedConfig> {
    readonly input: AddTagsToStreamCommandInput;
    constructor(input: AddTagsToStreamCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KinesisClientResolvedConfig, options?: __HttpHandlerOptions): Handler<AddTagsToStreamCommandInput, AddTagsToStreamCommandOutput>;
    private serialize;
    private deserialize;
}
