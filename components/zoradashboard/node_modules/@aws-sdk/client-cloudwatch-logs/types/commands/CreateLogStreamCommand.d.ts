import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { CreateLogStreamRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type CreateLogStreamCommandInput = CreateLogStreamRequest;
export declare type CreateLogStreamCommandOutput = __MetadataBearer;
/**
 * <p>Creates a log stream for the specified log group. A log stream is a sequence of log events
 *       that originate from a single source, such as an application instance or a resource that is
 *       being monitored.</p>
 *          <p>There is no limit on the number of log streams that you can create for a log group. There is a limit
 *     of 50 TPS on <code>CreateLogStream</code> operations, after which transactions are throttled.</p>
 *          <p>You must use the following guidelines when naming a log stream:</p>
 *          <ul>
 *             <li>
 *                <p>Log stream names must be unique within the log group.</p>
 *             </li>
 *             <li>
 *                <p>Log stream names can be between 1 and 512 characters long.</p>
 *             </li>
 *             <li>
 *                <p>The ':' (colon) and '*' (asterisk) characters are not allowed.</p>
 *             </li>
 *          </ul>
 */
export declare class CreateLogStreamCommand extends $Command<CreateLogStreamCommandInput, CreateLogStreamCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: CreateLogStreamCommandInput;
    constructor(input: CreateLogStreamCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateLogStreamCommandInput, CreateLogStreamCommandOutput>;
    private serialize;
    private deserialize;
}
