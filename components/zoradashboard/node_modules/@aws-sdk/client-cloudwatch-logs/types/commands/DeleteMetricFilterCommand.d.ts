import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { DeleteMetricFilterRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeleteMetricFilterCommandInput = DeleteMetricFilterRequest;
export declare type DeleteMetricFilterCommandOutput = __MetadataBearer;
/**
 * <p>Deletes the specified metric filter.</p>
 */
export declare class DeleteMetricFilterCommand extends $Command<DeleteMetricFilterCommandInput, DeleteMetricFilterCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: DeleteMetricFilterCommandInput;
    constructor(input: DeleteMetricFilterCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteMetricFilterCommandInput, DeleteMetricFilterCommandOutput>;
    private serialize;
    private deserialize;
}
