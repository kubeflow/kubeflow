import { ServiceInputTypes, ServiceOutputTypes, TranslateClientResolvedConfig } from "../TranslateClient";
import { StopTextTranslationJobRequest, StopTextTranslationJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StopTextTranslationJobCommandInput = StopTextTranslationJobRequest;
export declare type StopTextTranslationJobCommandOutput = StopTextTranslationJobResponse & __MetadataBearer;
/**
 * <p>Stops an asynchronous batch translation job that is in progress.</p>
 *          <p>If the job's state is <code>IN_PROGRESS</code>, the job will be marked for termination and
 *       put into the <code>STOP_REQUESTED</code> state. If the job completes before it can be stopped,
 *       it is put into the <code>COMPLETED</code> state. Otherwise, the job is put into the
 *         <code>STOPPED</code> state.</p>
 *          <p>Asynchronous batch translation jobs are started with the <a>StartTextTranslationJob</a> operation. You can use the <a>DescribeTextTranslationJob</a> or <a>ListTextTranslationJobs</a>
 *       operations to get a batch translation job's <code>JobId</code>.</p>
 */
export declare class StopTextTranslationJobCommand extends $Command<StopTextTranslationJobCommandInput, StopTextTranslationJobCommandOutput, TranslateClientResolvedConfig> {
    readonly input: StopTextTranslationJobCommandInput;
    constructor(input: StopTextTranslationJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: TranslateClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StopTextTranslationJobCommandInput, StopTextTranslationJobCommandOutput>;
    private serialize;
    private deserialize;
}
