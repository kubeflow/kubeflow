import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { ListStreamsInput, ListStreamsOutput } from "../models/models_0";
import {
  deserializeAws_json1_1ListStreamsCommand,
  serializeAws_json1_1ListStreamsCommand,
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

export type ListStreamsCommandInput = ListStreamsInput;
export type ListStreamsCommandOutput = ListStreamsOutput & __MetadataBearer;

/**
 * <p>Lists your Kinesis data streams.</p>
 *         <p>The number of streams may be too large to return from a single call to
 *                 <code>ListStreams</code>. You can limit the number of returned streams using the
 *                 <code>Limit</code> parameter. If you do not specify a value for the
 *                 <code>Limit</code> parameter, Kinesis Data Streams uses the default limit, which is
 *             currently 10.</p>
 *         <p>You can detect if there are more streams available to list by using the
 *                 <code>HasMoreStreams</code> flag from the returned output. If there are more streams
 *             available, you can request more streams by using the name of the last stream returned by
 *             the <code>ListStreams</code> request in the <code>ExclusiveStartStreamName</code>
 *             parameter in a subsequent request to <code>ListStreams</code>. The group of stream names
 *             returned by the subsequent request is then added to the list. You can continue this
 *             process until all the stream names have been collected in the list. </p>
 *         <p>
 *             <a>ListStreams</a> has a limit of five transactions per second per
 *             account.</p>
 */
export class ListStreamsCommand extends $Command<
  ListStreamsCommandInput,
  ListStreamsCommandOutput,
  KinesisClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ListStreamsCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: KinesisClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<ListStreamsCommandInput, ListStreamsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "KinesisClient";
    const commandName = "ListStreamsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: ListStreamsInput.filterSensitiveLog,
      outputFilterSensitiveLog: ListStreamsOutput.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: ListStreamsCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1ListStreamsCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<ListStreamsCommandOutput> {
    return deserializeAws_json1_1ListStreamsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
