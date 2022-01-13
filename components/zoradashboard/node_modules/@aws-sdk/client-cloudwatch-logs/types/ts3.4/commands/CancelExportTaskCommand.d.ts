import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { CancelExportTaskRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type CancelExportTaskCommandInput = CancelExportTaskRequest;
export declare type CancelExportTaskCommandOutput = __MetadataBearer;
/**
 * <p>Cancels the specified export task.</p>
 *          <p>The task must be in the <code>PENDING</code> or <code>RUNNING</code> state.</p>
 */
export declare class CancelExportTaskCommand extends $Command<CancelExportTaskCommandInput, CancelExportTaskCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: CancelExportTaskCommandInput;
    constructor(input: CancelExportTaskCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CancelExportTaskCommandInput, CancelExportTaskCommandOutput>;
    private serialize;
    private deserialize;
}
