import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { PutRetentionPolicyRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type PutRetentionPolicyCommandInput = PutRetentionPolicyRequest;
export declare type PutRetentionPolicyCommandOutput = __MetadataBearer;
/**
 * <p>Sets the retention of the specified log group. A retention policy allows you to
 *       configure the number of days for which to retain log events in the specified log
 *       group.</p>
 */
export declare class PutRetentionPolicyCommand extends $Command<PutRetentionPolicyCommandInput, PutRetentionPolicyCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: PutRetentionPolicyCommandInput;
    constructor(input: PutRetentionPolicyCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PutRetentionPolicyCommandInput, PutRetentionPolicyCommandOutput>;
    private serialize;
    private deserialize;
}
