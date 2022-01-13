import { PinpointClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PinpointClient";
import { PhoneNumberValidateRequest, PhoneNumberValidateResponse } from "../models/models_1";
import {
  deserializeAws_restJson1PhoneNumberValidateCommand,
  serializeAws_restJson1PhoneNumberValidateCommand,
} from "../protocols/Aws_restJson1";
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

export type PhoneNumberValidateCommandInput = PhoneNumberValidateRequest;
export type PhoneNumberValidateCommandOutput = PhoneNumberValidateResponse & __MetadataBearer;

/**
 * <p>Retrieves information about a phone number.</p>
 */
export class PhoneNumberValidateCommand extends $Command<
  PhoneNumberValidateCommandInput,
  PhoneNumberValidateCommandOutput,
  PinpointClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: PhoneNumberValidateCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: PinpointClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<PhoneNumberValidateCommandInput, PhoneNumberValidateCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "PinpointClient";
    const commandName = "PhoneNumberValidateCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: PhoneNumberValidateRequest.filterSensitiveLog,
      outputFilterSensitiveLog: PhoneNumberValidateResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: PhoneNumberValidateCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_restJson1PhoneNumberValidateCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<PhoneNumberValidateCommandOutput> {
    return deserializeAws_restJson1PhoneNumberValidateCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
