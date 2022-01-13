import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { BatchDetectKeyPhrasesRequest, BatchDetectKeyPhrasesResponse } from "../models/models_0";
import {
  deserializeAws_json1_1BatchDetectKeyPhrasesCommand,
  serializeAws_json1_1BatchDetectKeyPhrasesCommand,
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

export type BatchDetectKeyPhrasesCommandInput = BatchDetectKeyPhrasesRequest;
export type BatchDetectKeyPhrasesCommandOutput = BatchDetectKeyPhrasesResponse & __MetadataBearer;

/**
 * <p>Detects the key noun phrases found in a batch of documents.</p>
 */
export class BatchDetectKeyPhrasesCommand extends $Command<
  BatchDetectKeyPhrasesCommandInput,
  BatchDetectKeyPhrasesCommandOutput,
  ComprehendClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: BatchDetectKeyPhrasesCommandInput) {
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
  ): Handler<BatchDetectKeyPhrasesCommandInput, BatchDetectKeyPhrasesCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "ComprehendClient";
    const commandName = "BatchDetectKeyPhrasesCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: BatchDetectKeyPhrasesRequest.filterSensitiveLog,
      outputFilterSensitiveLog: BatchDetectKeyPhrasesResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: BatchDetectKeyPhrasesCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1BatchDetectKeyPhrasesCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<BatchDetectKeyPhrasesCommandOutput> {
    return deserializeAws_json1_1BatchDetectKeyPhrasesCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
