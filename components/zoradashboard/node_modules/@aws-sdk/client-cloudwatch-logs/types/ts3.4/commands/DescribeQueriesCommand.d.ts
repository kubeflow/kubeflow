import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { DescribeQueriesRequest, DescribeQueriesResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeQueriesCommandInput = DescribeQueriesRequest;
export declare type DescribeQueriesCommandOutput = DescribeQueriesResponse & __MetadataBearer;
/**
 * <p>Returns a list of CloudWatch Logs Insights queries that are scheduled, executing, or have
 *       been executed recently in this account. You can request all queries or limit it to queries of
 *       a specific log group or queries with a certain status.</p>
 */
export declare class DescribeQueriesCommand extends $Command<DescribeQueriesCommandInput, DescribeQueriesCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: DescribeQueriesCommandInput;
    constructor(input: DescribeQueriesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeQueriesCommandInput, DescribeQueriesCommandOutput>;
    private serialize;
    private deserialize;
}
