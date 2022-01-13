import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { StartDominantLanguageDetectionJobRequest, StartDominantLanguageDetectionJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StartDominantLanguageDetectionJobCommandInput = StartDominantLanguageDetectionJobRequest;
export declare type StartDominantLanguageDetectionJobCommandOutput = StartDominantLanguageDetectionJobResponse & __MetadataBearer;
/**
 * <p>Starts an asynchronous dominant language detection job for a collection of documents. Use
 *       the  operation to track the status
 *       of a job.</p>
 */
export declare class StartDominantLanguageDetectionJobCommand extends $Command<StartDominantLanguageDetectionJobCommandInput, StartDominantLanguageDetectionJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: StartDominantLanguageDetectionJobCommandInput;
    constructor(input: StartDominantLanguageDetectionJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StartDominantLanguageDetectionJobCommandInput, StartDominantLanguageDetectionJobCommandOutput>;
    private serialize;
    private deserialize;
}
