import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { ListEntityRecognizersRequest, ListEntityRecognizersResponse } from "../models/models_0";
import {
  deserializeAws_json1_1ListEntityRecognizersCommand,
  serializeAws_json1_1ListEntityRecognizersCommand,
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

export type ListEntityRecognizersCommandInput = ListEntityRecognizersRequest;
export type ListEntityRecognizersCommandOutput = ListEntityRecognizersResponse & __MetadataBearer;

/**
 * <p>Gets a list of the properties of all entity recognizers that you created, including
 *       recognizers currently in training. Allows you to filter the list of recognizers based on
 *       criteria such as status and submission time. This call returns up to 500 entity recognizers in
 *       the list, with a default number of 100 recognizers in the list.</p>
 *          <p>The results of this list are not in any particular order. Please get the list and sort
 *       locally if needed.</p>
 */
export class ListEntityRecognizersCommand extends $Command<
  ListEntityRecognizersCommandInput,
  ListEntityRecognizersCommandOutput,
  ComprehendClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ListEntityRecognizersCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: ComprehendClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<ListEntityRecognizersCommandInput, ListEntityRecognizersCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "ComprehendClient";
    const commandName = "ListEntityRecognizersCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: ListEntityRecognizersRequest.filterSensitiveLog,
      outputFilterSensitiveLog: ListEntityRecognizersResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: ListEntityRecognizersCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1ListEntityRecognizersCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<ListEntityRecognizersCommandOutput> {
    return deserializeAws_json1_1ListEntityRecognizersCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
