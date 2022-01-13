import { ServiceInputTypes, ServiceOutputTypes, TranslateClientResolvedConfig } from "../TranslateClient";
import { CreateParallelDataRequest, CreateParallelDataResponse } from "../models/models_0";
import {
  deserializeAws_json1_1CreateParallelDataCommand,
  serializeAws_json1_1CreateParallelDataCommand,
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

export type CreateParallelDataCommandInput = CreateParallelDataRequest;
export type CreateParallelDataCommandOutput = CreateParallelDataResponse & __MetadataBearer;

/**
 * <p>Creates a parallel data resource in Amazon Translate by importing an input file from
 *       Amazon S3. Parallel data files contain examples of source phrases and their translations from
 *       your translation memory. By adding parallel data, you can influence the style, tone, and word
 *       choice in your translation output.</p>
 */
export class CreateParallelDataCommand extends $Command<
  CreateParallelDataCommandInput,
  CreateParallelDataCommandOutput,
  TranslateClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CreateParallelDataCommandInput) {
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
  ): Handler<CreateParallelDataCommandInput, CreateParallelDataCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "TranslateClient";
    const commandName = "CreateParallelDataCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: CreateParallelDataRequest.filterSensitiveLog,
      outputFilterSensitiveLog: CreateParallelDataResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: CreateParallelDataCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1CreateParallelDataCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<CreateParallelDataCommandOutput> {
    return deserializeAws_json1_1CreateParallelDataCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
