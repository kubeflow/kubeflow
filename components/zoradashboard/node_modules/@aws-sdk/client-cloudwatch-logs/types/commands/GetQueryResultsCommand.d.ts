import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { GetQueryResultsRequest, GetQueryResultsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type GetQueryResultsCommandInput = GetQueryResultsRequest;
export declare type GetQueryResultsCommandOutput = GetQueryResultsResponse & __MetadataBearer;
/**
 * <p>Returns the results from the specified query.</p>
 *          <p>Only the fields requested in the query are returned, along with a <code>@ptr</code>
 *       field, which is the identifier for the log record. You can use the value of <code>@ptr</code>
 *       in a <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_GetLogRecord.html">GetLogRecord</a>
 *       operation to get the full log record.</p>
 *          <p>
 *             <code>GetQueryResults</code>
 *       does not start a query execution. To run a query, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_StartQuery.html">StartQuery</a>.</p>
 *          <p>If the value of the <code>Status</code> field in the output is <code>Running</code>, this operation
 *       returns only partial results. If you see a value of <code>Scheduled</code> or <code>Running</code> for the status,
 *       you can retry the operation later to see the final results. </p>
 */
export declare class GetQueryResultsCommand extends $Command<GetQueryResultsCommandInput, GetQueryResultsCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: GetQueryResultsCommandInput;
    constructor(input: GetQueryResultsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetQueryResultsCommandInput, GetQueryResultsCommandOutput>;
    private serialize;
    private deserialize;
}
