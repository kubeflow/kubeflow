import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { PutDestinationPolicyRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type PutDestinationPolicyCommandInput = PutDestinationPolicyRequest;
export declare type PutDestinationPolicyCommandOutput = __MetadataBearer;
/**
 * <p>Creates or updates an access policy associated with an existing
 *       destination. An access policy is an <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/policies_overview.html">IAM policy document</a> that is used
 *       to authorize claims to register a subscription filter against a given destination.</p>
 */
export declare class PutDestinationPolicyCommand extends $Command<PutDestinationPolicyCommandInput, PutDestinationPolicyCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: PutDestinationPolicyCommandInput;
    constructor(input: PutDestinationPolicyCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PutDestinationPolicyCommandInput, PutDestinationPolicyCommandOutput>;
    private serialize;
    private deserialize;
}
