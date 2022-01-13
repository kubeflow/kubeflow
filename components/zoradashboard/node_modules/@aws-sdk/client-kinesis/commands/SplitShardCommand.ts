import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { SplitShardInput } from "../models/models_0";
import {
  deserializeAws_json1_1SplitShardCommand,
  serializeAws_json1_1SplitShardCommand,
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

export type SplitShardCommandInput = SplitShardInput;
export type SplitShardCommandOutput = __MetadataBearer;

/**
 * <p>Splits a shard into two new shards in the Kinesis data stream, to increase the
 *             stream's capacity to ingest and transport data. <code>SplitShard</code> is called when
 *             there is a need to increase the overall capacity of a stream because of an expected
 *             increase in the volume of data records being ingested. </p>
 *         <p>You can also use <code>SplitShard</code> when a shard appears to be approaching its
 *             maximum utilization; for example, the producers sending data into the specific shard are
 *             suddenly sending more than previously anticipated. You can also call
 *                 <code>SplitShard</code> to increase stream capacity, so that more Kinesis Data
 *             Streams applications can simultaneously read data from the stream for real-time
 *             processing. </p>
 *         <p>You must specify the shard to be split and the new hash key, which is the position
 *             in the shard where the shard gets split in two. In many cases, the new hash key might be
 *             the average of the beginning and ending hash key, but it can be any hash key value in
 *             the range being mapped into the shard. For more information, see <a href="https://docs.aws.amazon.com/kinesis/latest/dev/kinesis-using-sdk-java-resharding-split.html">Split a
 *                 Shard</a> in the <i>Amazon Kinesis Data Streams Developer
 *                 Guide</i>.</p>
 *         <p>You can use <a>DescribeStream</a> to determine the shard ID and hash key
 *             values for the <code>ShardToSplit</code> and <code>NewStartingHashKey</code> parameters
 *             that are specified in the <code>SplitShard</code> request.</p>
 *         <p>
 *             <code>SplitShard</code> is an asynchronous operation. Upon receiving a
 *                 <code>SplitShard</code> request, Kinesis Data Streams immediately returns a response
 *             and sets the stream status to <code>UPDATING</code>. After the operation is completed,
 *             Kinesis Data Streams sets the stream status to <code>ACTIVE</code>. Read and write
 *             operations continue to work while the stream is in the <code>UPDATING</code> state. </p>
 *         <p>You can use <code>DescribeStream</code> to check the status of the stream, which is
 *             returned in <code>StreamStatus</code>. If the stream is in the <code>ACTIVE</code>
 *             state, you can call <code>SplitShard</code>. If a stream is in <code>CREATING</code> or
 *                 <code>UPDATING</code> or <code>DELETING</code> states, <code>DescribeStream</code>
 *             returns a <code>ResourceInUseException</code>.</p>
 *         <p>If the specified stream does not exist, <code>DescribeStream</code> returns a
 *                 <code>ResourceNotFoundException</code>. If you try to create more shards than are
 *             authorized for your account, you receive a <code>LimitExceededException</code>. </p>
 *         <p>For the default shard limit for an AWS account, see <a href="https://docs.aws.amazon.com/kinesis/latest/dev/service-sizes-and-limits.html">Kinesis Data Streams
 *                 Limits</a> in the <i>Amazon Kinesis Data Streams Developer
 *                 Guide</i>. To increase this limit, <a href="https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html">contact AWS
 *             Support</a>.</p>
 *         <p>If you try to operate on too many streams simultaneously using <a>CreateStream</a>, <a>DeleteStream</a>, <a>MergeShards</a>, and/or <a>SplitShard</a>, you receive a
 *                 <code>LimitExceededException</code>. </p>
 *         <p>
 *             <code>SplitShard</code> has a limit of five transactions per second per
 *             account.</p>
 */
export class SplitShardCommand extends $Command<
  SplitShardCommandInput,
  SplitShardCommandOutput,
  KinesisClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: SplitShardCommandInput) {
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
  ): Handler<SplitShardCommandInput, SplitShardCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "KinesisClient";
    const commandName = "SplitShardCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: SplitShardInput.filterSensitiveLog,
      outputFilterSensitiveLog: (output: any) => output,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: SplitShardCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1SplitShardCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<SplitShardCommandOutput> {
    return deserializeAws_json1_1SplitShardCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
