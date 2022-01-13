import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { PutQueryDefinitionRequest, PutQueryDefinitionResponse } from "../models/models_0";
import {
  deserializeAws_json1_1PutQueryDefinitionCommand,
  serializeAws_json1_1PutQueryDefinitionCommand,
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

export type PutQueryDefinitionCommandInput = PutQueryDefinitionRequest;
export type PutQueryDefinitionCommandOutput = PutQueryDefinitionResponse & __MetadataBearer;

/**
 * <p>Creates or updates a query definition for CloudWatch Logs Insights. For
 *       more information, see <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html">Analyzing Log Data with CloudWatch Logs Insights</a>.</p>
 *
 *          <p>To update a query definition, specify its
 *         <code>queryDefinitionId</code> in your request. The values of <code>name</code>, <code>queryString</code>,
 *       and <code>logGroupNames</code> are changed to the values that you specify in your update
 *       operation. No current values are retained from the current query definition. For example, if
 *       you update a current query definition that includes log groups, and you don't specify the
 *         <code>logGroupNames</code> parameter in your update operation, the query definition changes
 *       to contain no log groups.</p>
 *          <p>You must have the <code>logs:PutQueryDefinition</code> permission to be able to perform
 *     this operation.</p>
 */
export class PutQueryDefinitionCommand extends $Command<
  PutQueryDefinitionCommandInput,
  PutQueryDefinitionCommandOutput,
  CloudWatchLogsClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: PutQueryDefinitionCommandInput) {
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
  ): Handler<PutQueryDefinitionCommandInput, PutQueryDefinitionCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudWatchLogsClient";
    const commandName = "PutQueryDefinitionCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: PutQueryDefinitionRequest.filterSensitiveLog,
      outputFilterSensitiveLog: PutQueryDefinitionResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: PutQueryDefinitionCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1PutQueryDefinitionCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<PutQueryDefinitionCommandOutput> {
    return deserializeAws_json1_1PutQueryDefinitionCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
