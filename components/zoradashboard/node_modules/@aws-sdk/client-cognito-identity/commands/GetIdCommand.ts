import { CognitoIdentityClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CognitoIdentityClient";
import { GetIdInput, GetIdResponse } from "../models/models_0";
import { deserializeAws_json1_1GetIdCommand, serializeAws_json1_1GetIdCommand } from "../protocols/Aws_json1_1";
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

export type GetIdCommandInput = GetIdInput;
export type GetIdCommandOutput = GetIdResponse & __MetadataBearer;

/**
 * <p>Generates (or retrieves) a Cognito ID. Supplying multiple logins will create an
 *          implicit linked account.</p>
 *          <p>This is a public API. You do not need any credentials to call this API.</p>
 */
export class GetIdCommand extends $Command<GetIdCommandInput, GetIdCommandOutput, CognitoIdentityClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetIdCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: CognitoIdentityClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<GetIdCommandInput, GetIdCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CognitoIdentityClient";
    const commandName = "GetIdCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: GetIdInput.filterSensitiveLog,
      outputFilterSensitiveLog: GetIdResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: GetIdCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1GetIdCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<GetIdCommandOutput> {
    return deserializeAws_json1_1GetIdCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
