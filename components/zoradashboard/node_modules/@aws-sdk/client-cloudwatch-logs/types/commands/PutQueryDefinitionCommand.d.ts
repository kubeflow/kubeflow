import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { PutQueryDefinitionRequest, PutQueryDefinitionResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type PutQueryDefinitionCommandInput = PutQueryDefinitionRequest;
export declare type PutQueryDefinitionCommandOutput = PutQueryDefinitionResponse & __MetadataBearer;
/**
 * <p>Creates or updates a query definition for CloudWatch Logs Insights. For
 *       more information, see <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html">Analyzing Log Data with CloudWatch Logs Insights</a>.</p>
 *
 *          <p>To update a query definition, specify its
 *         <code>queryDefinitionId</code> in your request. The values of <code>name</code>, <code>queryString</code>,
 *       and <code>logGroupNames</code> are changed to the values that you specify in your update
 *       operation. No current values are retained from the current query definition. For example, if
 *       you update a current query definition that includes log groups, and you don't specify the
 *         <code>logGroupNames</code> parameter in your update operation, the query definition changes
 *       to contain no log groups.</p>
 *          <p>You must have the <code>logs:PutQueryDefinition</code> permission to be able to perform
 *     this operation.</p>
 */
export declare class PutQueryDefinitionCommand extends $Command<PutQueryDefinitionCommandInput, PutQueryDefinitionCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: PutQueryDefinitionCommandInput;
    constructor(input: PutQueryDefinitionCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PutQueryDefinitionCommandInput, PutQueryDefinitionCommandOutput>;
    private serialize;
    private deserialize;
}
