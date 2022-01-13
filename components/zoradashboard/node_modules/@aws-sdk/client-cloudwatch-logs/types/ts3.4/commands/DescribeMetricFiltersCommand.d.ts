import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { DescribeMetricFiltersRequest, DescribeMetricFiltersResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeMetricFiltersCommandInput = DescribeMetricFiltersRequest;
export declare type DescribeMetricFiltersCommandOutput = DescribeMetricFiltersResponse & __MetadataBearer;
/**
 * <p>Lists the specified metric filters. You can list all of the metric filters or filter
 *       the results by log name, prefix, metric name, or metric namespace. The results are
 *       ASCII-sorted by filter name.</p>
 */
export declare class DescribeMetricFiltersCommand extends $Command<DescribeMetricFiltersCommandInput, DescribeMetricFiltersCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: DescribeMetricFiltersCommandInput;
    constructor(input: DescribeMetricFiltersCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeMetricFiltersCommandInput, DescribeMetricFiltersCommandOutput>;
    private serialize;
    private deserialize;
}
