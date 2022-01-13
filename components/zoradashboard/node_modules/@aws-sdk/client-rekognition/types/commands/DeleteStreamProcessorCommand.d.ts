import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { DeleteStreamProcessorRequest, DeleteStreamProcessorResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeleteStreamProcessorCommandInput = DeleteStreamProcessorRequest;
export declare type DeleteStreamProcessorCommandOutput = DeleteStreamProcessorResponse & __MetadataBearer;
/**
 * <p>Deletes the stream processor identified by <code>Name</code>. You assign the value for <code>Name</code> when you create the stream processor with
 *             <a>CreateStreamProcessor</a>. You might not be able to use the same name for a stream processor for a few seconds after calling <code>DeleteStreamProcessor</code>.</p>
 */
export declare class DeleteStreamProcessorCommand extends $Command<DeleteStreamProcessorCommandInput, DeleteStreamProcessorCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: DeleteStreamProcessorCommandInput;
    constructor(input: DeleteStreamProcessorCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteStreamProcessorCommandInput, DeleteStreamProcessorCommandOutput>;
    private serialize;
    private deserialize;
}
