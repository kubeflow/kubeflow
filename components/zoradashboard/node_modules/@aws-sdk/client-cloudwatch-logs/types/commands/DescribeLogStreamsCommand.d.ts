import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { DescribeLogStreamsRequest, DescribeLogStreamsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeLogStreamsCommandInput = DescribeLogStreamsRequest;
export declare type DescribeLogStreamsCommandOutput = DescribeLogStreamsResponse & __MetadataBearer;
/**
 * <p>Lists the log streams for the specified log group.
 *       You can list all the log streams or filter the results by prefix.
 *       You can also control how the results are ordered.</p>
 *          <p>This operation has a limit of five transactions per second, after which transactions are throttled.</p>
 */
export declare class DescribeLogStreamsCommand extends $Command<DescribeLogStreamsCommandInput, DescribeLogStreamsCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: DescribeLogStreamsCommandInput;
    constructor(input: DescribeLogStreamsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeLogStreamsCommandInput, DescribeLogStreamsCommandOutput>;
    private serialize;
    private deserialize;
}
