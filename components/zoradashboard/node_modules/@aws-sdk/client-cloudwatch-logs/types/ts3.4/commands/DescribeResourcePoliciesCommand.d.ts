import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { DescribeResourcePoliciesRequest, DescribeResourcePoliciesResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeResourcePoliciesCommandInput = DescribeResourcePoliciesRequest;
export declare type DescribeResourcePoliciesCommandOutput = DescribeResourcePoliciesResponse & __MetadataBearer;
/**
 * <p>Lists the resource policies in this account.</p>
 */
export declare class DescribeResourcePoliciesCommand extends $Command<DescribeResourcePoliciesCommandInput, DescribeResourcePoliciesCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: DescribeResourcePoliciesCommandInput;
    constructor(input: DescribeResourcePoliciesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeResourcePoliciesCommandInput, DescribeResourcePoliciesCommandOutput>;
    private serialize;
    private deserialize;
}
