import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { PutMetricFilterRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type PutMetricFilterCommandInput = PutMetricFilterRequest;
export declare type PutMetricFilterCommandOutput = __MetadataBearer;
/**
 * <p>Creates or updates a metric filter and associates it with the specified log group.
 *       Metric filters allow you to configure rules to extract metric data from log events ingested
 *       through <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutLogEvents.html">PutLogEvents</a>.</p>
 *          <p>The maximum number of metric filters that can be associated with a log group is
 *       100.</p>
 */
export declare class PutMetricFilterCommand extends $Command<PutMetricFilterCommandInput, PutMetricFilterCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: PutMetricFilterCommandInput;
    constructor(input: PutMetricFilterCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PutMetricFilterCommandInput, PutMetricFilterCommandOutput>;
    private serialize;
    private deserialize;
}
