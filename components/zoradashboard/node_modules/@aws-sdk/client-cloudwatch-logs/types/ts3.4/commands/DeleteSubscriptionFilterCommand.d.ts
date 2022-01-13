import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { DeleteSubscriptionFilterRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeleteSubscriptionFilterCommandInput = DeleteSubscriptionFilterRequest;
export declare type DeleteSubscriptionFilterCommandOutput = __MetadataBearer;
/**
 * <p>Deletes the specified subscription filter.</p>
 */
export declare class DeleteSubscriptionFilterCommand extends $Command<DeleteSubscriptionFilterCommandInput, DeleteSubscriptionFilterCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: DeleteSubscriptionFilterCommandInput;
    constructor(input: DeleteSubscriptionFilterCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteSubscriptionFilterCommandInput, DeleteSubscriptionFilterCommandOutput>;
    private serialize;
    private deserialize;
}
