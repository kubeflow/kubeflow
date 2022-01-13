import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { FilterLogEventsRequest, FilterLogEventsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type FilterLogEventsCommandInput = FilterLogEventsRequest;
export declare type FilterLogEventsCommandOutput = FilterLogEventsResponse & __MetadataBearer;
/**
 * <p>Lists log events from the specified log group. You can list all the log events or filter the results
 *       using a filter pattern, a time range, and the name of the log stream.</p>
 *          <p>By default, this operation returns as many log events as can fit in 1 MB (up to 10,000
 *       log events) or all the events found within the time range that you specify. If the results
 *       include a token, then there are more log events available, and you can get additional results
 *       by specifying the token in a subsequent call. This operation can return empty results
 *     while there are more log events available through the token.</p>
 *          <p>The returned log events are sorted by event timestamp, the timestamp when the event was ingested
 *     by CloudWatch Logs, and the ID of the <code>PutLogEvents</code> request.</p>
 */
export declare class FilterLogEventsCommand extends $Command<FilterLogEventsCommandInput, FilterLogEventsCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: FilterLogEventsCommandInput;
    constructor(input: FilterLogEventsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<FilterLogEventsCommandInput, FilterLogEventsCommandOutput>;
    private serialize;
    private deserialize;
}
