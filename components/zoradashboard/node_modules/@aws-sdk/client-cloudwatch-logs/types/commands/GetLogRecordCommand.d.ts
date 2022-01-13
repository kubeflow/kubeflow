import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { GetLogRecordRequest, GetLogRecordResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type GetLogRecordCommandInput = GetLogRecordRequest;
export declare type GetLogRecordCommandOutput = GetLogRecordResponse & __MetadataBearer;
/**
 * <p>Retrieves all of the fields and values of a single log event. All fields are retrieved,
 *       even if the original query that produced the <code>logRecordPointer</code> retrieved only a
 *       subset of fields. Fields are returned as field name/field value pairs.</p>
 *          <p>The full unparsed log event is returned within <code>@message</code>.</p>
 */
export declare class GetLogRecordCommand extends $Command<GetLogRecordCommandInput, GetLogRecordCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: GetLogRecordCommandInput;
    constructor(input: GetLogRecordCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetLogRecordCommandInput, GetLogRecordCommandOutput>;
    private serialize;
    private deserialize;
}
