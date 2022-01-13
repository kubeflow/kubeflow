import { ServiceInputTypes, ServiceOutputTypes, TextractClientResolvedConfig } from "../TextractClient";
import { StartDocumentTextDetectionRequest, StartDocumentTextDetectionResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StartDocumentTextDetectionCommandInput = StartDocumentTextDetectionRequest;
export declare type StartDocumentTextDetectionCommandOutput = StartDocumentTextDetectionResponse & __MetadataBearer;
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
export declare class StartDocumentTextDetectionCommand extends $Command<StartDocumentTextDetectionCommandInput, StartDocumentTextDetectionCommandOutput, TextractClientResolvedConfig> {
    readonly input: StartDocumentTextDetectionCommandInput;
    constructor(input: StartDocumentTextDetectionCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: TextractClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StartDocumentTextDetectionCommandInput, StartDocumentTextDetectionCommandOutput>;
    private serialize;
    private deserialize;
}
