import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { StartQueryRequest, StartQueryResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StartQueryCommandInput = StartQueryRequest;
export declare type StartQueryCommandOutput = StartQueryResponse & __MetadataBearer;
/**
 * <p>Schedules a query of a log group using CloudWatch Logs Insights. You specify the log group
 *       and time range to query and the query string to use.</p>
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html">CloudWatch Logs Insights Query Syntax</a>.</p>
 *
 *          <p>Queries time out after 15 minutes of execution. If your queries are timing out, reduce the
 *       time range being searched or partition your query into a number of queries.</p>
 */
export declare class StartQueryCommand extends $Command<StartQueryCommandInput, StartQueryCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: StartQueryCommandInput;
    constructor(input: StartQueryCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StartQueryCommandInput, StartQueryCommandOutput>;
    private serialize;
    private deserialize;
}
