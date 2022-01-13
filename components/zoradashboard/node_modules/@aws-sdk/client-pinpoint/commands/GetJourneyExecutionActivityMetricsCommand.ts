import { PinpointClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PinpointClient";
import {
  GetJourneyExecutionActivityMetricsRequest,
  GetJourneyExecutionActivityMetricsResponse,
} from "../models/models_1";
import {
  deserializeAws_restJson1GetJourneyExecutionActivityMetricsCommand,
  serializeAws_restJson1GetJourneyExecutionActivityMetricsCommand,
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

export type GetJourneyExecutionActivityMetricsCommandInput = GetJourneyExecutionActivityMetricsRequest;
export type GetJourneyExecutionActivityMetricsCommandOutput = GetJourneyExecutionActivityMetricsResponse &
  __MetadataBearer;

/**
 * <p>Retrieves (queries) pre-aggregated data for a standard execution metric that applies to a journey activity.</p>
 */
export class GetJourneyExecutionActivityMetricsCommand extends $Command<
  GetJourneyExecutionActivityMetricsCommandInput,
  GetJourneyExecutionActivityMetricsCommandOutput,
  PinpointClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetJourneyExecutionActivityMetricsCommandInput) {
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
  ): Handler<GetJourneyExecutionActivityMetricsCommandInput, GetJourneyExecutionActivityMetricsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "PinpointClient";
    const commandName = "GetJourneyExecutionActivityMetricsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: GetJourneyExecutionActivityMetricsRequest.filterSensitiveLog,
      outputFilterSensitiveLog: GetJourneyExecutionActivityMetricsResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GetJourneyExecutionActivityMetricsCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GetJourneyExecutionActivityMetricsCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetJourneyExecutionActivityMetricsCommandOutput> {
    return deserializeAws_restJson1GetJourneyExecutionActivityMetricsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
