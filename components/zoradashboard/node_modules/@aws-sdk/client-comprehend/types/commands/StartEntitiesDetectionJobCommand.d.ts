import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { StartEntitiesDetectionJobRequest, StartEntitiesDetectionJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StartEntitiesDetectionJobCommandInput = StartEntitiesDetectionJobRequest;
export declare type StartEntitiesDetectionJobCommandOutput = StartEntitiesDetectionJobResponse & __MetadataBearer;
/**
 * <p>Starts an asynchronous entity detection job for a collection of documents. Use the  operation to track the status of a job.</p>
 *          <p>This API can be used for either standard entity detection or custom entity recognition. In
 *       order to be used for custom entity recognition, the optional <code>EntityRecognizerArn</code>
 *       must be used in order to provide access to the recognizer being used to detect the custom
 *       entity.</p>
 */
export declare class StartEntitiesDetectionJobCommand extends $Command<StartEntitiesDetectionJobCommandInput, StartEntitiesDetectionJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: StartEntitiesDetectionJobCommandInput;
    constructor(input: StartEntitiesDetectionJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StartEntitiesDetectionJobCommandInput, StartEntitiesDetectionJobCommandOutput>;
    private serialize;
    private deserialize;
}
