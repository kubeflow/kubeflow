import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { DeleteRetentionPolicyRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeleteRetentionPolicyCommandInput = DeleteRetentionPolicyRequest;
export declare type DeleteRetentionPolicyCommandOutput = __MetadataBearer;
/**
 * <p>Deletes the specified retention policy.</p>
 *          <p>Log events do not expire if they belong to log groups without a retention policy.</p>
 */
export declare class DeleteRetentionPolicyCommand extends $Command<DeleteRetentionPolicyCommandInput, DeleteRetentionPolicyCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: DeleteRetentionPolicyCommandInput;
    constructor(input: DeleteRetentionPolicyCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteRetentionPolicyCommandInput, DeleteRetentionPolicyCommandOutput>;
    private serialize;
    private deserialize;
}
