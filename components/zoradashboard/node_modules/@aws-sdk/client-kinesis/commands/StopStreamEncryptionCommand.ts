import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { StopStreamEncryptionInput } from "../models/models_0";
import {
  deserializeAws_json1_1StopStreamEncryptionCommand,
  serializeAws_json1_1StopStreamEncryptionCommand,
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

export type StopStreamEncryptionCommandInput = StopStreamEncryptionInput;
export type StopStreamEncryptionCommandOutput = __MetadataBearer;

/**
 * <p>Disables server-side encryption for a specified stream. </p>
 *         <p>Stopping encryption is an asynchronous operation. Upon receiving the request,
 *             Kinesis Data Streams returns immediately and sets the status of the stream to
 *                 <code>UPDATING</code>. After the update is complete, Kinesis Data Streams sets the
 *             status of the stream back to <code>ACTIVE</code>. Stopping encryption normally takes a
 *             few seconds to complete, but it can take minutes. You can continue to read and write
 *             data to your stream while its status is <code>UPDATING</code>. Once the status of the
 *             stream is <code>ACTIVE</code>, records written to the stream are no longer encrypted by
 *             Kinesis Data Streams. </p>
 *         <p>API Limits: You can successfully disable server-side encryption 25 times in a
 *             rolling 24-hour period. </p>
 *         <p>Note: It can take up to 5 seconds after the stream is in an <code>ACTIVE</code>
 *             status before all records written to the stream are no longer subject to encryption.
 *             After you disabled encryption, you can verify that encryption is not applied by
 *             inspecting the API response from <code>PutRecord</code> or
 *             <code>PutRecords</code>.</p>
 */
export class StopStreamEncryptionCommand extends $Command<
  StopStreamEncryptionCommandInput,
  StopStreamEncryptionCommandOutput,
  KinesisClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: StopStreamEncryptionCommandInput) {
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
  ): Handler<StopStreamEncryptionCommandInput, StopStreamEncryptionCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "KinesisClient";
    const commandName = "StopStreamEncryptionCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: StopStreamEncryptionInput.filterSensitiveLog,
      outputFilterSensitiveLog: (output: any) => output,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: StopStreamEncryptionCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1StopStreamEncryptionCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<StopStreamEncryptionCommandOutput> {
    return deserializeAws_json1_1StopStreamEncryptionCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
