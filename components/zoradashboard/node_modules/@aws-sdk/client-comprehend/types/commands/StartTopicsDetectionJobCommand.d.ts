import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { StartTopicsDetectionJobRequest, StartTopicsDetectionJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StartTopicsDetectionJobCommandInput = StartTopicsDetectionJobRequest;
export declare type StartTopicsDetectionJobCommandOutput = StartTopicsDetectionJobResponse & __MetadataBearer;
/**
 * <p>Starts an asynchronous topic detection job. Use the
 *         <code>DescribeTopicDetectionJob</code> operation to track the status of a job.</p>
 */
export declare class StartTopicsDetectionJobCommand extends $Command<StartTopicsDetectionJobCommandInput, StartTopicsDetectionJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: StartTopicsDetectionJobCommandInput;
    constructor(input: StartTopicsDetectionJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StartTopicsDetectionJobCommandInput, StartTopicsDetectionJobCommandOutput>;
    private serialize;
    private deserialize;
}
