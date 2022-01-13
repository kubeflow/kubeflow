import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { FilterLogEventsRequest, FilterLogEventsResponse } from "../models/models_0";
import {
  deserializeAws_json1_1FilterLogEventsCommand,
  serializeAws_json1_1FilterLogEventsCommand,
} from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  MiddlewareStack,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

export type FilterLogEventsCommandInput = FilterLogEventsRequest;
export type FilterLogEventsCommandOutput = FilterLogEventsResponse & __MetadataBearer;

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
export class FilterLogEventsCommand extends $Command<
  FilterLogEventsCommandInput,
  FilterLogEventsCommandOutput,
  CloudWatchLogsClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: FilterLogEventsCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: CloudWatchLogsClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<FilterLogEventsCommandInput, FilterLogEventsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudWatchLogsClient";
    const commandName = "FilterLogEventsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: FilterLogEventsRequest.filterSensitiveLog,
      outputFilterSensitiveLog: FilterLogEventsResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: FilterLogEventsCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1FilterLogEventsCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<FilterLogEventsCommandOutput> {
    return deserializeAws_json1_1FilterLogEventsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
