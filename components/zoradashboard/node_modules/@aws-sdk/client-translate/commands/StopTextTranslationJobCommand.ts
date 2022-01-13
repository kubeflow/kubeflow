import { ServiceInputTypes, ServiceOutputTypes, TranslateClientResolvedConfig } from "../TranslateClient";
import { StopTextTranslationJobRequest, StopTextTranslationJobResponse } from "../models/models_0";
import {
  deserializeAws_json1_1StopTextTranslationJobCommand,
  serializeAws_json1_1StopTextTranslationJobCommand,
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

export type StopTextTranslationJobCommandInput = StopTextTranslationJobRequest;
export type StopTextTranslationJobCommandOutput = StopTextTranslationJobResponse & __MetadataBearer;

/**
 * <p>Stops an asynchronous batch translation job that is in progress.</p>
 *          <p>If the job's state is <code>IN_PROGRESS</code>, the job will be marked for termination and
 *       put into the <code>STOP_REQUESTED</code> state. If the job completes before it can be stopped,
 *       it is put into the <code>COMPLETED</code> state. Otherwise, the job is put into the
 *         <code>STOPPED</code> state.</p>
 *          <p>Asynchronous batch translation jobs are started with the <a>StartTextTranslationJob</a> operation. You can use the <a>DescribeTextTranslationJob</a> or <a>ListTextTranslationJobs</a>
 *       operations to get a batch translation job's <code>JobId</code>.</p>
 */
export class StopTextTranslationJobCommand extends $Command<
  StopTextTranslationJobCommandInput,
  StopTextTranslationJobCommandOutput,
  TranslateClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: StopTextTranslationJobCommandInput) {
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
  ): Handler<StopTextTranslationJobCommandInput, StopTextTranslationJobCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "TranslateClient";
    const commandName = "StopTextTranslationJobCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: StopTextTranslationJobRequest.filterSensitiveLog,
      outputFilterSensitiveLog: StopTextTranslationJobResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: StopTextTranslationJobCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1StopTextTranslationJobCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<StopTextTranslationJobCommandOutput> {
    return deserializeAws_json1_1StopTextTranslationJobCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
