import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { StopTrainingEntityRecognizerRequest, StopTrainingEntityRecognizerResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StopTrainingEntityRecognizerCommandInput = StopTrainingEntityRecognizerRequest;
export declare type StopTrainingEntityRecognizerCommandOutput = StopTrainingEntityRecognizerResponse & __MetadataBearer;
/**
 * <p>Stops an entity recognizer training job while in progress.</p>
 *          <p>If the training job state is <code>TRAINING</code>, the job is marked for termination and
 *       put into the <code>STOP_REQUESTED</code> state. If the training job completes before it can be
 *       stopped, it is put into the <code>TRAINED</code>; otherwise the training job is stopped and
 *       putted into the <code>STOPPED</code> state and the service sends back an HTTP 200 response
 *       with an empty HTTP body.</p>
 */
export declare class StopTrainingEntityRecognizerCommand extends $Command<StopTrainingEntityRecognizerCommandInput, StopTrainingEntityRecognizerCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: StopTrainingEntityRecognizerCommandInput;
    constructor(input: StopTrainingEntityRecognizerCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StopTrainingEntityRecognizerCommandInput, StopTrainingEntityRecognizerCommandOutput>;
    private serialize;
    private deserialize;
}
