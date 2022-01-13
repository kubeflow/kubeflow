import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { DescribeQueryDefinitionsRequest, DescribeQueryDefinitionsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeQueryDefinitionsCommandInput = DescribeQueryDefinitionsRequest;
export declare type DescribeQueryDefinitionsCommandOutput = DescribeQueryDefinitionsResponse & __MetadataBearer;
/**
 * <p>This operation returns a paginated list of your saved CloudWatch Logs Insights query definitions.</p>
 *          <p>You can use the <code>queryDefinitionNamePrefix</code> parameter to limit the results to only the
 *       query definitions that have names that start with a certain string.</p>
 */
export declare class DescribeQueryDefinitionsCommand extends $Command<DescribeQueryDefinitionsCommandInput, DescribeQueryDefinitionsCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: DescribeQueryDefinitionsCommandInput;
    constructor(input: DescribeQueryDefinitionsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeQueryDefinitionsCommandInput, DescribeQueryDefinitionsCommandOutput>;
    private serialize;
    private deserialize;
}
