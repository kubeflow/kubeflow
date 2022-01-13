import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { ListStreamProcessorsRequest, ListStreamProcessorsResponse } from "../models/models_0";
import {
  deserializeAws_json1_1ListStreamProcessorsCommand,
  serializeAws_json1_1ListStreamProcessorsCommand,
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

export type ListStreamProcessorsCommandInput = ListStreamProcessorsRequest;
export type ListStreamProcessorsCommandOutput = ListStreamProcessorsResponse & __MetadataBearer;

/**
 * <p>Gets a list of stream processors that you have created with <a>CreateStreamProcessor</a>. </p>
 */
export class ListStreamProcessorsCommand extends $Command<
  ListStreamProcessorsCommandInput,
  ListStreamProcessorsCommandOutput,
  RekognitionClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ListStreamProcessorsCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: RekognitionClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<ListStreamProcessorsCommandInput, ListStreamProcessorsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RekognitionClient";
    const commandName = "ListStreamProcessorsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: ListStreamProcessorsRequest.filterSensitiveLog,
      outputFilterSensitiveLog: ListStreamProcessorsResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: ListStreamProcessorsCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1ListStreamProcessorsCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<ListStreamProcessorsCommandOutput> {
    return deserializeAws_json1_1ListStreamProcessorsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
