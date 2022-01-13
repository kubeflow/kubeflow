import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { DeleteQueryDefinitionRequest, DeleteQueryDefinitionResponse } from "../models/models_0";
import {
  deserializeAws_json1_1DeleteQueryDefinitionCommand,
  serializeAws_json1_1DeleteQueryDefinitionCommand,
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

export type DeleteQueryDefinitionCommandInput = DeleteQueryDefinitionRequest;
export type DeleteQueryDefinitionCommandOutput = DeleteQueryDefinitionResponse & __MetadataBearer;

/**
 * <p>Deletes a saved CloudWatch Logs Insights query definition.
 *       A query definition contains details about a saved CloudWatch Logs Insights query.</p>
 *          <p>Each <code>DeleteQueryDefinition</code> operation can delete one query definition.</p>
 *          <p>You must have the <code>logs:DeleteQueryDefinition</code> permission to be able to perform
 *       this operation.</p>
 */
export class DeleteQueryDefinitionCommand extends $Command<
  DeleteQueryDefinitionCommandInput,
  DeleteQueryDefinitionCommandOutput,
  CloudWatchLogsClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DeleteQueryDefinitionCommandInput) {
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
  ): Handler<DeleteQueryDefinitionCommandInput, DeleteQueryDefinitionCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudWatchLogsClient";
    const commandName = "DeleteQueryDefinitionCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: DeleteQueryDefinitionRequest.filterSensitiveLog,
      outputFilterSensitiveLog: DeleteQueryDefinitionResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: DeleteQueryDefinitionCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1DeleteQueryDefinitionCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<DeleteQueryDefinitionCommandOutput> {
    return deserializeAws_json1_1DeleteQueryDefinitionCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
