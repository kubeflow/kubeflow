import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { DeleteQueryDefinitionRequest, DeleteQueryDefinitionResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeleteQueryDefinitionCommandInput = DeleteQueryDefinitionRequest;
export declare type DeleteQueryDefinitionCommandOutput = DeleteQueryDefinitionResponse & __MetadataBearer;
/**
 * <p>Deletes a saved CloudWatch Logs Insights query definition.
 *       A query definition contains details about a saved CloudWatch Logs Insights query.</p>
 *          <p>Each <code>DeleteQueryDefinition</code> operation can delete one query definition.</p>
 *          <p>You must have the <code>logs:DeleteQueryDefinition</code> permission to be able to perform
 *       this operation.</p>
 */
export declare class DeleteQueryDefinitionCommand extends $Command<DeleteQueryDefinitionCommandInput, DeleteQueryDefinitionCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: DeleteQueryDefinitionCommandInput;
    constructor(input: DeleteQueryDefinitionCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteQueryDefinitionCommandInput, DeleteQueryDefinitionCommandOutput>;
    private serialize;
    private deserialize;
}
