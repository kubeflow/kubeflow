import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { PutSubscriptionFilterRequest } from "../models/models_0";
import {
  deserializeAws_json1_1PutSubscriptionFilterCommand,
  serializeAws_json1_1PutSubscriptionFilterCommand,
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

export type PutSubscriptionFilterCommandInput = PutSubscriptionFilterRequest;
export type PutSubscriptionFilterCommandOutput = __MetadataBearer;

/**
 * <p>Creates or updates a subscription filter and associates it with the specified log
 *       group. Subscription filters allow you to subscribe to a real-time stream of log events
 *       ingested through <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutLogEvents.html">PutLogEvents</a> and have them delivered to a specific
 *       destination. When log events are sent to the
 *       receiving service, they are Base64 encoded
 *       and compressed with the gzip format.</p>
 *          <p>The following destinations are supported for subscription filters:</p>
 *          <ul>
 *             <li>
 *                <p>An Amazon Kinesis stream belonging to the same account as the subscription filter,
 *           for same-account delivery.</p>
 *             </li>
 *             <li>
 *                <p>A logical destination that belongs to a different account, for cross-account delivery.</p>
 *             </li>
 *             <li>
 *                <p>An Amazon Kinesis Firehose delivery stream that belongs to the same account as the
 *           subscription filter, for same-account delivery.</p>
 *             </li>
 *             <li>
 *                <p>An AWS Lambda function that belongs to the same account as the subscription filter,
 *           for same-account delivery.</p>
 *             </li>
 *          </ul>
 *          <p>There can only be one subscription filter associated with a log group. If you are
 *       updating an existing filter, you must specify the correct name in <code>filterName</code>.
 *       Otherwise, the call fails because you cannot associate a second filter with a log
 *       group.</p>
 *          <p>To perform a <code>PutSubscriptionFilter</code> operation, you must also have the
 *       <code>iam:PassRole</code> permission.</p>
 */
export class PutSubscriptionFilterCommand extends $Command<
  PutSubscriptionFilterCommandInput,
  PutSubscriptionFilterCommandOutput,
  CloudWatchLogsClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: PutSubscriptionFilterCommandInput) {
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
  ): Handler<PutSubscriptionFilterCommandInput, PutSubscriptionFilterCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudWatchLogsClient";
    const commandName = "PutSubscriptionFilterCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: PutSubscriptionFilterRequest.filterSensitiveLog,
      outputFilterSensitiveLog: (output: any) => output,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: PutSubscriptionFilterCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1PutSubscriptionFilterCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<PutSubscriptionFilterCommandOutput> {
    return deserializeAws_json1_1PutSubscriptionFilterCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
