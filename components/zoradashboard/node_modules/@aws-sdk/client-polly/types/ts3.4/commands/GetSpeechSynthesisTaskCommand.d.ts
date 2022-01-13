import { PollyClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PollyClient";
import { GetSpeechSynthesisTaskInput, GetSpeechSynthesisTaskOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type GetSpeechSynthesisTaskCommandInput = GetSpeechSynthesisTaskInput;
export declare type GetSpeechSynthesisTaskCommandOutput = GetSpeechSynthesisTaskOutput & __MetadataBearer;
/**
 * <p>Retrieves a specific SpeechSynthesisTask object based on its TaskID. This object contains
 *       information about the given speech synthesis task, including the status of the task, and a
 *       link to the S3 bucket containing the output of the task.</p>
 */
export declare class GetSpeechSynthesisTaskCommand extends $Command<GetSpeechSynthesisTaskCommandInput, GetSpeechSynthesisTaskCommandOutput, PollyClientResolvedConfig> {
    readonly input: GetSpeechSynthesisTaskCommandInput;
    constructor(input: GetSpeechSynthesisTaskCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: PollyClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetSpeechSynthesisTaskCommandInput, GetSpeechSynthesisTaskCommandOutput>;
    private serialize;
    private deserialize;
}
