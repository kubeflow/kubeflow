import { ServiceInputTypes, ServiceOutputTypes, TextractClientResolvedConfig } from "../TextractClient";
import { StartDocumentTextDetectionRequest, StartDocumentTextDetectionResponse } from "../models/models_0";
import {
  deserializeAws_json1_1StartDocumentTextDetectionCommand,
  serializeAws_json1_1StartDocumentTextDetectionCommand,
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

export type StartDocumentTextDetectionCommandInput = StartDocumentTextDetectionRequest;
export type StartDocumentTextDetectionCommandOutput = StartDocumentTextDetectionResponse & __MetadataBearer;

/**
 * <p>Starts the asynchronous detection of text in a document. Amazon Textract can detect lines of
 *          text and the words that make up a line of text.</p>
 *          <p>
 *             <code>StartDocumentTextDetection</code> can analyze text in documents that are in JPEG, PNG, and PDF format. The
 *         documents are stored in an Amazon S3 bucket. Use <a>DocumentLocation</a> to specify the bucket name and file name
 *         of the document.
 *      </p>
 *          <p>
 *             <code>StartTextDetection</code> returns a job identifier
 *             (<code>JobId</code>) that you use to get the results of the operation. When text
 *          detection is finished, Amazon Textract publishes a completion status to the Amazon Simple Notification Service (Amazon SNS)
 *          topic that you specify in <code>NotificationChannel</code>. To get the results of the text
 *          detection operation, first check that the status value published to the Amazon SNS topic is
 *             <code>SUCCEEDED</code>. If so, call <a>GetDocumentTextDetection</a>, and
 *          pass the job identifier (<code>JobId</code>) from the initial call to
 *             <code>StartDocumentTextDetection</code>.</p>
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/textract/latest/dg/how-it-works-detecting.html">Document Text Detection</a>.</p>
 */
export class StartDocumentTextDetectionCommand extends $Command<
  StartDocumentTextDetectionCommandInput,
  StartDocumentTextDetectionCommandOutput,
  TextractClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: StartDocumentTextDetectionCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: TextractClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<StartDocumentTextDetectionCommandInput, StartDocumentTextDetectionCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "TextractClient";
    const commandName = "StartDocumentTextDetectionCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: StartDocumentTextDetectionRequest.filterSensitiveLog,
      outputFilterSensitiveLog: StartDocumentTextDetectionResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: StartDocumentTextDetectionCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1StartDocumentTextDetectionCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<StartDocumentTextDetectionCommandOutput> {
    return deserializeAws_json1_1StartDocumentTextDetectionCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
