import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { DescribeExportTasksRequest, DescribeExportTasksResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeExportTasksCommandInput = DescribeExportTasksRequest;
export declare type DescribeExportTasksCommandOutput = DescribeExportTasksResponse & __MetadataBearer;
/**
 * <p>Lists the specified export tasks. You can list all your export tasks or filter
 *       the results based on task ID or task status.</p>
 */
export declare class DescribeExportTasksCommand extends $Command<DescribeExportTasksCommandInput, DescribeExportTasksCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: DescribeExportTasksCommandInput;
    constructor(input: DescribeExportTasksCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeExportTasksCommandInput, DescribeExportTasksCommandOutput>;
    private serialize;
    private deserialize;
}
