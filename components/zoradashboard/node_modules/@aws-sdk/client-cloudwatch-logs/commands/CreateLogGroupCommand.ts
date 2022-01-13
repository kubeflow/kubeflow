import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { CreateLogGroupRequest } from "../models/models_0";
import {
  deserializeAws_json1_1CreateLogGroupCommand,
  serializeAws_json1_1CreateLogGroupCommand,
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

export type CreateLogGroupCommandInput = CreateLogGroupRequest;
export type CreateLogGroupCommandOutput = __MetadataBearer;

/**
 * <p>Creates a log group with the specified name. You can create up to 20,000 log groups per account.</p>
 *          <p>You must use the following guidelines when naming a log group:</p>
 *          <ul>
 *             <li>
 *                <p>Log group names must be unique within a region for an AWS account.</p>
 *             </li>
 *             <li>
 *                <p>Log group names can be between 1 and 512 characters long.</p>
 *             </li>
 *             <li>
 *                <p>Log group names consist of the following characters: a-z, A-Z, 0-9, '_' (underscore), '-' (hyphen),
 *           '/' (forward slash), '.' (period), and '#' (number sign)</p>
 *             </li>
 *          </ul>
 *          <p>When you create a log group, by default the log events in the log group never expire. To set
 *     a retention policy so that events expire and are deleted after a specified time, use
 *       <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutRetentionPolicy.html">PutRetentionPolicy</a>.</p>
 *          <p>If you associate a AWS Key Management Service (AWS KMS) customer master key (CMK) with the log group, ingested data is encrypted using the CMK.
 *       This association is stored as long as the data encrypted with the CMK is still within Amazon CloudWatch Logs.
 *       This enables Amazon CloudWatch Logs to decrypt this data whenever it is requested.</p>
 *          <p>If you attempt to associate a CMK with the log group but the CMK does not exist or the
 *       CMK is disabled, you receive an <code>InvalidParameterException</code> error. </p>
 *          <important>
 *             <p> CloudWatch Logs supports only symmetric CMKs. Do not associate an asymmetric CMK with
 *         your log group. For more information, see <a href="https://docs.aws.amazon.com/kms/latest/developerguide/symmetric-asymmetric.html">Using Symmetric and Asymmetric
 *           Keys</a>.</p>
 *          </important>
 */
export class CreateLogGroupCommand extends $Command<
  CreateLogGroupCommandInput,
  CreateLogGroupCommandOutput,
  CloudWatchLogsClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CreateLogGroupCommandInput) {
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
  ): Handler<CreateLogGroupCommandInput, CreateLogGroupCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudWatchLogsClient";
    const commandName = "CreateLogGroupCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: CreateLogGroupRequest.filterSensitiveLog,
      outputFilterSensitiveLog: (output: any) => output,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: CreateLogGroupCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1CreateLogGroupCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<CreateLogGroupCommandOutput> {
    return deserializeAws_json1_1CreateLogGroupCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
