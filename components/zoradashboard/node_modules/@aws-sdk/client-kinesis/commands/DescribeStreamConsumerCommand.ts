import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { DescribeStreamConsumerInput, DescribeStreamConsumerOutput } from "../models/models_0";
import {
  deserializeAws_json1_1DescribeStreamConsumerCommand,
  serializeAws_json1_1DescribeStreamConsumerCommand,
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

export type DescribeStreamConsumerCommandInput = DescribeStreamConsumerInput;
export type DescribeStreamConsumerCommandOutput = DescribeStreamConsumerOutput & __MetadataBearer;

/**
 * <p>To get the description of a registered consumer, provide the ARN of the consumer.
 *             Alternatively, you can provide the ARN of the data stream and the name you gave the
 *             consumer when you registered it. You may also provide all three parameters, as long as
 *             they don't conflict with each other. If you don't know the name or ARN of the consumer
 *             that you want to describe, you can use the <a>ListStreamConsumers</a>
 *             operation to get a list of the descriptions of all the consumers that are currently
 *             registered with a given data stream.</p>
 *         <p>This operation has a limit of 20 transactions per second per stream.</p>
 */
export class DescribeStreamConsumerCommand extends $Command<
  DescribeStreamConsumerCommandInput,
  DescribeStreamConsumerCommandOutput,
  KinesisClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DescribeStreamConsumerCommandInput) {
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
  ): Handler<DescribeStreamConsumerCommandInput, DescribeStreamConsumerCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "KinesisClient";
    const commandName = "DescribeStreamConsumerCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: DescribeStreamConsumerInput.filterSensitiveLog,
      outputFilterSensitiveLog: DescribeStreamConsumerOutput.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: DescribeStreamConsumerCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1DescribeStreamConsumerCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<DescribeStreamConsumerCommandOutput> {
    return deserializeAws_json1_1DescribeStreamConsumerCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
