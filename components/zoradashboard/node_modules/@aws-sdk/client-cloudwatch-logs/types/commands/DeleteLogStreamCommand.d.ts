import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { DeleteLogStreamRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeleteLogStreamCommandInput = DeleteLogStreamRequest;
export declare type DeleteLogStreamCommandOutput = __MetadataBearer;
/**
 * <p>Deletes the specified log stream and permanently deletes all the archived log events associated
 *       with the log stream.</p>
 */
export declare class DeleteLogStreamCommand extends $Command<DeleteLogStreamCommandInput, DeleteLogStreamCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: DeleteLogStreamCommandInput;
    constructor(input: DeleteLogStreamCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteLogStreamCommandInput, DeleteLogStreamCommandOutput>;
    private serialize;
    private deserialize;
}
