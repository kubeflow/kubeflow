import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { CreateStreamInput } from "../models/models_0";
import {
  deserializeAws_json1_1CreateStreamCommand,
  serializeAws_json1_1CreateStreamCommand,
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

export type CreateStreamCommandInput = CreateStreamInput;
export type CreateStreamCommandOutput = __MetadataBearer;

/**
 * <p>Creates a Kinesis data stream. A stream captures and transports data records that
 *             are continuously emitted from different data sources or <i>producers</i>.
 *             Scale-out within a stream is explicitly supported by means of shards, which are uniquely
 *             identified groups of data records in a stream.</p>
 *         <p>You specify and control the number of shards that a stream is composed of. Each
 *             shard can support reads up to five transactions per second, up to a maximum data read
 *             total of 2 MiB per second. Each shard can support writes up to 1,000 records per second,
 *             up to a maximum data write total of 1 MiB per second. If the amount of data input
 *             increases or decreases, you can add or remove shards.</p>
 *         <p>The stream name identifies the stream. The name is scoped to the AWS account used
 *             by the application. It is also scoped by AWS Region. That is, two streams in two
 *             different accounts can have the same name, and two streams in the same account, but in
 *             two different Regions, can have the same name.</p>
 *         <p>
 *             <code>CreateStream</code> is an asynchronous operation. Upon receiving a
 *                 <code>CreateStream</code> request, Kinesis Data Streams immediately returns and sets
 *             the stream status to <code>CREATING</code>. After the stream is created, Kinesis Data
 *             Streams sets the stream status to <code>ACTIVE</code>. You should perform read and write
 *             operations only on an <code>ACTIVE</code> stream. </p>
 *         <p>You receive a <code>LimitExceededException</code> when making a
 *                 <code>CreateStream</code> request when you try to do one of the following:</p>
 *         <ul>
 *             <li>
 *
 *                 <p>Have more than five streams in the <code>CREATING</code> state at any point
 *                     in time.</p>
 *             </li>
 *             <li>
 *
 *                 <p>Create more shards than are authorized for your account.</p>
 *             </li>
 *          </ul>
 *         <p>For the default shard limit for an AWS account, see <a href="https://docs.aws.amazon.com/kinesis/latest/dev/service-sizes-and-limits.html">Amazon Kinesis Data Streams
 *                 Limits</a> in the <i>Amazon Kinesis Data Streams Developer
 *                 Guide</i>. To increase this limit, <a href="https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html">contact AWS
 *             Support</a>.</p>
 *         <p>You can use <code>DescribeStream</code> to check the stream status, which is
 *             returned in <code>StreamStatus</code>.</p>
 *         <p>
 *             <a>CreateStream</a> has a limit of five transactions per second per
 *             account.</p>
 */
export class CreateStreamCommand extends $Command<
  CreateStreamCommandInput,
  CreateStreamCommandOutput,
  KinesisClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CreateStreamCommandInput) {
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
  ): Handler<CreateStreamCommandInput, CreateStreamCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "KinesisClient";
    const commandName = "CreateStreamCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: CreateStreamInput.filterSensitiveLog,
      outputFilterSensitiveLog: (output: any) => output,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: CreateStreamCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1CreateStreamCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<CreateStreamCommandOutput> {
    return deserializeAws_json1_1CreateStreamCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
