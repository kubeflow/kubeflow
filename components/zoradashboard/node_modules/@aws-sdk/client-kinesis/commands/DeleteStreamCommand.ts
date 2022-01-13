import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { DeleteStreamInput } from "../models/models_0";
import {
  deserializeAws_json1_1DeleteStreamCommand,
  serializeAws_json1_1DeleteStreamCommand,
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

export type DeleteStreamCommandInput = DeleteStreamInput;
export type DeleteStreamCommandOutput = __MetadataBearer;

/**
 * <p>Deletes a Kinesis data stream and all its shards and data. You must shut down any
 *             applications that are operating on the stream before you delete the stream. If an
 *             application attempts to operate on a deleted stream, it receives the exception
 *                 <code>ResourceNotFoundException</code>.</p>
 *         <p>If the stream is in the <code>ACTIVE</code> state, you can delete it. After a
 *                 <code>DeleteStream</code> request, the specified stream is in the
 *                 <code>DELETING</code> state until Kinesis Data Streams completes the
 *             deletion.</p>
 *         <p>
 *             <b>Note:</b> Kinesis Data Streams might continue to accept
 *             data read and write operations, such as <a>PutRecord</a>, <a>PutRecords</a>, and <a>GetRecords</a>, on a stream in the
 *                 <code>DELETING</code> state until the stream deletion is complete.</p>
 *         <p>When you delete a stream, any shards in that stream are also deleted, and any tags
 *             are dissociated from the stream.</p>
 *         <p>You can use the <a>DescribeStream</a> operation to check the state of
 *             the stream, which is returned in <code>StreamStatus</code>.</p>
 *         <p>
 *             <a>DeleteStream</a> has a limit of five transactions per second per
 *             account.</p>
 */
export class DeleteStreamCommand extends $Command<
  DeleteStreamCommandInput,
  DeleteStreamCommandOutput,
  KinesisClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DeleteStreamCommandInput) {
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
  ): Handler<DeleteStreamCommandInput, DeleteStreamCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "KinesisClient";
    const commandName = "DeleteStreamCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: DeleteStreamInput.filterSensitiveLog,
      outputFilterSensitiveLog: (output: any) => output,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: DeleteStreamCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1DeleteStreamCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<DeleteStreamCommandOutput> {
    return deserializeAws_json1_1DeleteStreamCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
