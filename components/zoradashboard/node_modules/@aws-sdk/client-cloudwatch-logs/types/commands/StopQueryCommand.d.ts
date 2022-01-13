import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { StopQueryRequest, StopQueryResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StopQueryCommandInput = StopQueryRequest;
export declare type StopQueryCommandOutput = StopQueryResponse & __MetadataBearer;
/**
 * <p>Stops a CloudWatch Logs Insights query that is in progress. If the query has already ended, the operation
 *     returns an error indicating that the specified query is not running.</p>
 */
export declare class StopQueryCommand extends $Command<StopQueryCommandInput, StopQueryCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: StopQueryCommandInput;
    constructor(input: StopQueryCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StopQueryCommandInput, StopQueryCommandOutput>;
    private serialize;
    private deserialize;
}
