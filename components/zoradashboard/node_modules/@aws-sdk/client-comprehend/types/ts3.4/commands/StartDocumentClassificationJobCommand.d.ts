import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { StartDocumentClassificationJobRequest, StartDocumentClassificationJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StartDocumentClassificationJobCommandInput = StartDocumentClassificationJobRequest;
export declare type StartDocumentClassificationJobCommandOutput = StartDocumentClassificationJobResponse & __MetadataBearer;
/**
 * <p>Starts an asynchronous document classification job. Use the  operation to track the progress of the
 *       job.</p>
 */
export declare class StartDocumentClassificationJobCommand extends $Command<StartDocumentClassificationJobCommandInput, StartDocumentClassificationJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: StartDocumentClassificationJobCommandInput;
    constructor(input: StartDocumentClassificationJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StartDocumentClassificationJobCommandInput, StartDocumentClassificationJobCommandOutput>;
    private serialize;
    private deserialize;
}
