import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { PutLogEventsRequest, PutLogEventsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type PutLogEventsCommandInput = PutLogEventsRequest;
export declare type PutLogEventsCommandOutput = PutLogEventsResponse & __MetadataBearer;
/**
 * <p>Uploads a batch of log events to the specified log stream.</p>
 *          <p>You must include the sequence token obtained from the response of the previous call. An
 *       upload in a newly created log stream does not require a sequence token. You can also get the
 *       sequence token in the <code>expectedSequenceToken</code> field from
 *         <code>InvalidSequenceTokenException</code>. If you call <code>PutLogEvents</code> twice
 *       within a narrow time period using the same value for <code>sequenceToken</code>, both calls
 *       might be successful or one might be rejected.</p>
 *          <p>The batch of events must satisfy the following constraints:</p>
 *          <ul>
 *             <li>
 *                <p>The maximum batch size is 1,048,576 bytes. This size is calculated as the sum of
 *           all event messages in UTF-8, plus 26 bytes for each log event.</p>
 *             </li>
 *             <li>
 *                <p>None of the log events in the batch can be more than 2 hours in the future.</p>
 *             </li>
 *             <li>
 *                <p>None of the log events in the batch can be older than 14 days or older than the retention
 *           period of the log group.</p>
 *             </li>
 *             <li>
 *                <p>The log events in the batch must be in chronological order by their timestamp. The
 *           timestamp is the time the event occurred, expressed as the number of milliseconds after
 *           Jan 1, 1970 00:00:00 UTC. (In AWS Tools for PowerShell and the AWS SDK for .NET, the
 *           timestamp is specified in .NET format: yyyy-mm-ddThh:mm:ss. For example,
 *           2017-09-15T13:45:30.) </p>
 *             </li>
 *             <li>
 *                <p>A batch of log events in a single request cannot span more than 24 hours. Otherwise, the operation fails.</p>
 *             </li>
 *             <li>
 *                <p>The maximum number of log events in a batch is 10,000.</p>
 *             </li>
 *             <li>
 *                <p>There is a quota of 5 requests per second per log stream. Additional requests are throttled. This quota can't be changed.</p>
 *             </li>
 *          </ul>
 *          <p>If a call to <code>PutLogEvents</code> returns "UnrecognizedClientException" the most likely cause is an invalid AWS access key ID or secret key. </p>
 */
export declare class PutLogEventsCommand extends $Command<PutLogEventsCommandInput, PutLogEventsCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: PutLogEventsCommandInput;
    constructor(input: PutLogEventsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PutLogEventsCommandInput, PutLogEventsCommandOutput>;
    private serialize;
    private deserialize;
}
