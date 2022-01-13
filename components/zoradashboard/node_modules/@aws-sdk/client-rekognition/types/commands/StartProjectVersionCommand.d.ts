import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { StartProjectVersionRequest, StartProjectVersionResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StartProjectVersionCommandInput = StartProjectVersionRequest;
export declare type StartProjectVersionCommandOutput = StartProjectVersionResponse & __MetadataBearer;
/**
 * <p>Starts the running of the version of a model. Starting a model takes a while
 *       to complete. To check the current state of the model, use <a>DescribeProjectVersions</a>.</p>
 *          <p>Once the model is running, you can detect custom labels in new images by calling
 *          <a>DetectCustomLabels</a>.</p>
 *          <note>
 *             <p>You are charged for the amount of time that the model is running. To stop a running
 *       model, call <a>StopProjectVersion</a>.</p>
 *          </note>
 *          <p>This operation requires permissions to perform the
 *          <code>rekognition:StartProjectVersion</code> action.</p>
 */
export declare class StartProjectVersionCommand extends $Command<StartProjectVersionCommandInput, StartProjectVersionCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: StartProjectVersionCommandInput;
    constructor(input: StartProjectVersionCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StartProjectVersionCommandInput, StartProjectVersionCommandOutput>;
    private serialize;
    private deserialize;
}
