import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { DescribeSubscriptionFiltersRequest, DescribeSubscriptionFiltersResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeSubscriptionFiltersCommandInput = DescribeSubscriptionFiltersRequest;
export declare type DescribeSubscriptionFiltersCommandOutput = DescribeSubscriptionFiltersResponse & __MetadataBearer;
/**
 * <p>Lists the subscription filters for the specified log group. You can list all the subscription filters or filter the results by prefix.
 *       The results are ASCII-sorted by filter name.</p>
 */
export declare class DescribeSubscriptionFiltersCommand extends $Command<DescribeSubscriptionFiltersCommandInput, DescribeSubscriptionFiltersCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: DescribeSubscriptionFiltersCommandInput;
    constructor(input: DescribeSubscriptionFiltersCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeSubscriptionFiltersCommandInput, DescribeSubscriptionFiltersCommandOutput>;
    private serialize;
    private deserialize;
}
