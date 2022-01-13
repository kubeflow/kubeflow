import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { AssociateKmsKeyRequest } from "../models/models_0";
import {
  deserializeAws_json1_1AssociateKmsKeyCommand,
  serializeAws_json1_1AssociateKmsKeyCommand,
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

export type AssociateKmsKeyCommandInput = AssociateKmsKeyRequest;
export type AssociateKmsKeyCommandOutput = __MetadataBearer;

/**
 * <p>Associates the specified AWS Key Management Service (AWS KMS) customer master key (CMK) with the specified log group.</p>
 *          <p>Associating an AWS KMS CMK with a log group overrides any existing associations between the log group and a CMK.
 *       After a CMK is associated with a log group, all newly ingested data for the log group is encrypted using the CMK.
 *       This association is stored as long as the data encrypted with the CMK is still within Amazon CloudWatch Logs.
 *       This enables Amazon CloudWatch Logs to decrypt this data whenever it is requested.</p>
 *          <important>
 *             <p>CloudWatch Logs supports only symmetric CMKs. Do not use an associate an asymmetric CMK
 *         with your log group. For more information, see <a href="https://docs.aws.amazon.com/kms/latest/developerguide/symmetric-asymmetric.html">Using Symmetric and Asymmetric
 *           Keys</a>.</p>
 *          </important>
 *          <p>It can take up to 5 minutes for this operation to take effect.</p>
 *          <p>If you attempt to associate a CMK with a log group but the CMK does not exist or the
 *       CMK is disabled, you receive an <code>InvalidParameterException</code> error. </p>
 */
export class AssociateKmsKeyCommand extends $Command<
  AssociateKmsKeyCommandInput,
  AssociateKmsKeyCommandOutput,
  CloudWatchLogsClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: AssociateKmsKeyCommandInput) {
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
  ): Handler<AssociateKmsKeyCommandInput, AssociateKmsKeyCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudWatchLogsClient";
    const commandName = "AssociateKmsKeyCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: AssociateKmsKeyRequest.filterSensitiveLog,
      outputFilterSensitiveLog: (output: any) => output,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: AssociateKmsKeyCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1AssociateKmsKeyCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<AssociateKmsKeyCommandOutput> {
    return deserializeAws_json1_1AssociateKmsKeyCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
