import { ServiceInputTypes, ServiceOutputTypes, TranslateClientResolvedConfig } from "../TranslateClient";
import { ImportTerminologyRequest, ImportTerminologyResponse } from "../models/models_0";
import {
  deserializeAws_json1_1ImportTerminologyCommand,
  serializeAws_json1_1ImportTerminologyCommand,
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

export type ImportTerminologyCommandInput = ImportTerminologyRequest;
export type ImportTerminologyCommandOutput = ImportTerminologyResponse & __MetadataBearer;

/**
 * <p>Creates or updates a custom terminology, depending on whether or not one already exists
 *       for the given terminology name. Importing a terminology with the same name as an existing one
 *       will merge the terminologies based on the chosen merge strategy. Currently, the only supported
 *       merge strategy is OVERWRITE, and so the imported terminology will overwrite an existing
 *       terminology of the same name.</p>
 *          <p>If you import a terminology that overwrites an existing one, the new terminology take up
 *       to 10 minutes to fully propagate and be available for use in a translation due to cache
 *       policies with the DataPlane service that performs the translations.</p>
 */
export class ImportTerminologyCommand extends $Command<
  ImportTerminologyCommandInput,
  ImportTerminologyCommandOutput,
  TranslateClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ImportTerminologyCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: TranslateClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<ImportTerminologyCommandInput, ImportTerminologyCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "TranslateClient";
    const commandName = "ImportTerminologyCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: ImportTerminologyRequest.filterSensitiveLog,
      outputFilterSensitiveLog: ImportTerminologyResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: ImportTerminologyCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1ImportTerminologyCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<ImportTerminologyCommandOutput> {
    return deserializeAws_json1_1ImportTerminologyCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
