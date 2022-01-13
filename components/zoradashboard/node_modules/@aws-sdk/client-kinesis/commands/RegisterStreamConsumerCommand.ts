import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { RegisterStreamConsumerInput, RegisterStreamConsumerOutput } from "../models/models_0";
import {
  deserializeAws_json1_1RegisterStreamConsumerCommand,
  serializeAws_json1_1RegisterStreamConsumerCommand,
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

export type RegisterStreamConsumerCommandInput = RegisterStreamConsumerInput;
export type RegisterStreamConsumerCommandOutput = RegisterStreamConsumerOutput & __MetadataBearer;

/**
 * <p>Registers a consumer with a Kinesis data stream. When you use this operation, the
 *             consumer you register can then call <a>SubscribeToShard</a> to receive data
 *             from the stream using enhanced fan-out, at a rate of up to 2 MiB per second for every
 *             shard you subscribe to. This rate is unaffected by the total number of consumers that
 *             read from the same stream.</p>
 *         <p>You can register up to 20 consumers per stream. A given consumer can only be
 *             registered with one stream at a time.</p>
 *         <p>For an example of how to use this operations, see <a href="/streams/latest/dev/building-enhanced-consumers-api.html">Enhanced Fan-Out
 *                 Using the Kinesis Data Streams API</a>.</p>
 *         <p>The use of this operation has a limit of five transactions per second per account.
 *             Also, only 5 consumers can be created simultaneously. In other words, you cannot have
 *             more than 5 consumers in a <code>CREATING</code> status at the same time. Registering a
 *             6th consumer while there are 5 in a <code>CREATING</code> status results in a
 *                 <code>LimitExceededException</code>.</p>
 */
export class RegisterStreamConsumerCommand extends $Command<
  RegisterStreamConsumerCommandInput,
  RegisterStreamConsumerCommandOutput,
  KinesisClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: RegisterStreamConsumerCommandInput) {
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
  ): Handler<RegisterStreamConsumerCommandInput, RegisterStreamConsumerCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "KinesisClient";
    const commandName = "RegisterStreamConsumerCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: RegisterStreamConsumerInput.filterSensitiveLog,
      outputFilterSensitiveLog: RegisterStreamConsumerOutput.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: RegisterStreamConsumerCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1RegisterStreamConsumerCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<RegisterStreamConsumerCommandOutput> {
    return deserializeAws_json1_1RegisterStreamConsumerCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
