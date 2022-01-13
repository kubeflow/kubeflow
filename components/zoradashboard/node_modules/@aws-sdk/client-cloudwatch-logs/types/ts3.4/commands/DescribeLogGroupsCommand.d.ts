import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { DescribeLogGroupsRequest, DescribeLogGroupsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeLogGroupsCommandInput = DescribeLogGroupsRequest;
export declare type DescribeLogGroupsCommandOutput = DescribeLogGroupsResponse & __MetadataBearer;
/**
 * <p>Lists the specified log groups. You can list all your log groups or filter the results by prefix.
 *       The results are ASCII-sorted by log group name.</p>
 */
export declare class DescribeLogGroupsCommand extends $Command<DescribeLogGroupsCommandInput, DescribeLogGroupsCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: DescribeLogGroupsCommandInput;
    constructor(input: DescribeLogGroupsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeLogGroupsCommandInput, DescribeLogGroupsCommandOutput>;
    private serialize;
    private deserialize;
}
