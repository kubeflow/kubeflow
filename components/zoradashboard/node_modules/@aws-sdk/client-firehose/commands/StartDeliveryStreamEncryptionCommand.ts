import { FirehoseClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../FirehoseClient";
import { StartDeliveryStreamEncryptionInput, StartDeliveryStreamEncryptionOutput } from "../models/models_0";
import {
  deserializeAws_json1_1StartDeliveryStreamEncryptionCommand,
  serializeAws_json1_1StartDeliveryStreamEncryptionCommand,
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

export type StartDeliveryStreamEncryptionCommandInput = StartDeliveryStreamEncryptionInput;
export type StartDeliveryStreamEncryptionCommandOutput = StartDeliveryStreamEncryptionOutput & __MetadataBearer;

/**
 * <p>Enables server-side encryption (SSE) for the delivery stream. </p>
 *          <p>This operation is asynchronous. It returns immediately. When you invoke it, Kinesis Data
 *          Firehose first sets the encryption status of the stream to <code>ENABLING</code>, and then
 *          to <code>ENABLED</code>. The encryption status of a delivery stream is the
 *             <code>Status</code> property in <a>DeliveryStreamEncryptionConfiguration</a>.
 *          If the operation fails, the encryption status changes to <code>ENABLING_FAILED</code>. You
 *          can continue to read and write data to your delivery stream while the encryption status is
 *             <code>ENABLING</code>, but the data is not encrypted. It can take up to 5 seconds after
 *          the encryption status changes to <code>ENABLED</code> before all records written to the
 *          delivery stream are encrypted. To find out whether a record or a batch of records was
 *          encrypted, check the response elements <a>PutRecordOutput$Encrypted</a> and
 *             <a>PutRecordBatchOutput$Encrypted</a>, respectively.</p>
 *          <p>To check the encryption status of a delivery stream, use <a>DescribeDeliveryStream</a>.</p>
 *          <p>Even if encryption is currently enabled for a delivery stream, you can still invoke this
 *          operation on it to change the ARN of the CMK or both its type and ARN. If you invoke this
 *          method to change the CMK, and the old CMK is of type <code>CUSTOMER_MANAGED_CMK</code>,
 *          Kinesis Data Firehose schedules the grant it had on the old CMK for retirement. If the new
 *          CMK is of type <code>CUSTOMER_MANAGED_CMK</code>, Kinesis Data Firehose creates a grant
 *          that enables it to use the new CMK to encrypt and decrypt data and to manage the
 *          grant.</p>
 *          <p>If a delivery stream already has encryption enabled and then you invoke this operation
 *          to change the ARN of the CMK or both its type and ARN and you get
 *             <code>ENABLING_FAILED</code>, this only means that the attempt to change the CMK failed.
 *          In this case, encryption remains enabled with the old CMK.</p>
 *          <p>If the encryption status of your delivery stream is <code>ENABLING_FAILED</code>, you
 *          can invoke this operation again with a valid CMK. The CMK must be enabled and the key
 *          policy mustn't explicitly deny the permission for Kinesis Data Firehose to invoke KMS
 *          encrypt and decrypt operations.</p>
 *          <p>You can enable SSE for a delivery stream only if it's a delivery stream that uses
 *             <code>DirectPut</code> as its source. </p>
 *          <p>The <code>StartDeliveryStreamEncryption</code> and
 *             <code>StopDeliveryStreamEncryption</code> operations have a combined limit of 25 calls
 *          per delivery stream per 24 hours. For example, you reach the limit if you call
 *             <code>StartDeliveryStreamEncryption</code> 13 times and
 *             <code>StopDeliveryStreamEncryption</code> 12 times for the same delivery stream in a
 *          24-hour period.</p>
 */
export class StartDeliveryStreamEncryptionCommand extends $Command<
  StartDeliveryStreamEncryptionCommandInput,
  StartDeliveryStreamEncryptionCommandOutput,
  FirehoseClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: StartDeliveryStreamEncryptionCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: FirehoseClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<StartDeliveryStreamEncryptionCommandInput, StartDeliveryStreamEncryptionCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "FirehoseClient";
    const commandName = "StartDeliveryStreamEncryptionCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: StartDeliveryStreamEncryptionInput.filterSensitiveLog,
      outputFilterSensitiveLog: StartDeliveryStreamEncryptionOutput.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: StartDeliveryStreamEncryptionCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1StartDeliveryStreamEncryptionCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<StartDeliveryStreamEncryptionCommandOutput> {
    return deserializeAws_json1_1StartDeliveryStreamEncryptionCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
