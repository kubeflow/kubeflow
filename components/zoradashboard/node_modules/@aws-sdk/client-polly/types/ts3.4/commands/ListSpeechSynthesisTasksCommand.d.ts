import { PollyClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PollyClient";
import { ListSpeechSynthesisTasksInput, ListSpeechSynthesisTasksOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListSpeechSynthesisTasksCommandInput = ListSpeechSynthesisTasksInput;
export declare type ListSpeechSynthesisTasksCommandOutput = ListSpeechSynthesisTasksOutput & __MetadataBearer;
/**
 * <p>Returns a list of SpeechSynthesisTask objects ordered by their creation date. This
 *       operation can filter the tasks by their status, for example, allowing users to list only tasks
 *       that are completed.</p>
 */
export declare class ListSpeechSynthesisTasksCommand extends $Command<ListSpeechSynthesisTasksCommandInput, ListSpeechSynthesisTasksCommandOutput, PollyClientResolvedConfig> {
    readonly input: ListSpeechSynthesisTasksCommandInput;
    constructor(input: ListSpeechSynthesisTasksCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: PollyClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListSpeechSynthesisTasksCommandInput, ListSpeechSynthesisTasksCommandOutput>;
    private serialize;
    private deserialize;
}
