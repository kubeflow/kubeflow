import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { CreateLogStreamRequest } from "../models/models_0";
import {
  deserializeAws_json1_1CreateLogStreamCommand,
  serializeAws_json1_1CreateLogStreamCommand,
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

export type CreateLogStreamCommandInput = CreateLogStreamRequest;
export type CreateLogStreamCommandOutput = __MetadataBearer;

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
export class CreateLogStreamCommand extends $Command<
  CreateLogStreamCommandInput,
  CreateLogStreamCommandOutput,
  CloudWatchLogsClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CreateLogStreamCommandInput) {
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
  ): Handler<CreateLogStreamCommandInput, CreateLogStreamCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudWatchLogsClient";
    const commandName = "CreateLogStreamCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: CreateLogStreamRequest.filterSensitiveLog,
      outputFilterSensitiveLog: (output: any) => output,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: CreateLogStreamCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1CreateLogStreamCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<CreateLogStreamCommandOutput> {
    return deserializeAws_json1_1CreateLogStreamCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
