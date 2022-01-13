import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { TestMetricFilterRequest, TestMetricFilterResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type TestMetricFilterCommandInput = TestMetricFilterRequest;
export declare type TestMetricFilterCommandOutput = TestMetricFilterResponse & __MetadataBearer;
/**
 * <p>Tests the filter pattern of a metric filter against a sample of log event messages. You
 *       can use this operation to validate the correctness of a metric filter pattern.</p>
 */
export declare class TestMetricFilterCommand extends $Command<TestMetricFilterCommandInput, TestMetricFilterCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: TestMetricFilterCommandInput;
    constructor(input: TestMetricFilterCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<TestMetricFilterCommandInput, TestMetricFilterCommandOutput>;
    private serialize;
    private deserialize;
}
