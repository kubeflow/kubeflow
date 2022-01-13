import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { StartKeyPhrasesDetectionJobRequest, StartKeyPhrasesDetectionJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StartKeyPhrasesDetectionJobCommandInput = StartKeyPhrasesDetectionJobRequest;
export declare type StartKeyPhrasesDetectionJobCommandOutput = StartKeyPhrasesDetectionJobResponse & __MetadataBearer;
/**
 * <p>Starts an asynchronous key phrase detection job for a collection of documents. Use the
 *          operation to track the status of a
 *       job.</p>
 */
export declare class StartKeyPhrasesDetectionJobCommand extends $Command<StartKeyPhrasesDetectionJobCommandInput, StartKeyPhrasesDetectionJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: StartKeyPhrasesDetectionJobCommandInput;
    constructor(input: StartKeyPhrasesDetectionJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StartKeyPhrasesDetectionJobCommandInput, StartKeyPhrasesDetectionJobCommandOutput>;
    private serialize;
    private deserialize;
}
