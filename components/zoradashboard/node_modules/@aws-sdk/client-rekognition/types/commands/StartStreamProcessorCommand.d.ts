import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { StartStreamProcessorRequest, StartStreamProcessorResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StartStreamProcessorCommandInput = StartStreamProcessorRequest;
export declare type StartStreamProcessorCommandOutput = StartStreamProcessorResponse & __MetadataBearer;
/**
 * <p>Starts processing a stream processor. You create a stream processor by calling <a>CreateStreamProcessor</a>.
 *             To tell <code>StartStreamProcessor</code> which stream processor to start, use the value of the <code>Name</code> field specified in the call to
 *             <code>CreateStreamProcessor</code>.</p>
 */
export declare class StartStreamProcessorCommand extends $Command<StartStreamProcessorCommandInput, StartStreamProcessorCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: StartStreamProcessorCommandInput;
    constructor(input: StartStreamProcessorCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StartStreamProcessorCommandInput, StartStreamProcessorCommandOutput>;
    private serialize;
    private deserialize;
}
