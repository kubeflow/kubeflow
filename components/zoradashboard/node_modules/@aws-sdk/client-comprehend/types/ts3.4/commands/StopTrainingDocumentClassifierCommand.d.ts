import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { StopTrainingDocumentClassifierRequest, StopTrainingDocumentClassifierResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StopTrainingDocumentClassifierCommandInput = StopTrainingDocumentClassifierRequest;
export declare type StopTrainingDocumentClassifierCommandOutput = StopTrainingDocumentClassifierResponse & __MetadataBearer;
/**
 * <p>Stops a document classifier training job while in progress.</p>
 *          <p>If the training job state is <code>TRAINING</code>, the job is marked for termination and
 *       put into the <code>STOP_REQUESTED</code> state. If the training job completes before it can be
 *       stopped, it is put into the <code>TRAINED</code>; otherwise the training job is stopped and
 *       put into the <code>STOPPED</code> state and the service sends back an HTTP 200 response with
 *       an empty HTTP body. </p>
 */
export declare class StopTrainingDocumentClassifierCommand extends $Command<StopTrainingDocumentClassifierCommandInput, StopTrainingDocumentClassifierCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: StopTrainingDocumentClassifierCommandInput;
    constructor(input: StopTrainingDocumentClassifierCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StopTrainingDocumentClassifierCommandInput, StopTrainingDocumentClassifierCommandOutput>;
    private serialize;
    private deserialize;
}
