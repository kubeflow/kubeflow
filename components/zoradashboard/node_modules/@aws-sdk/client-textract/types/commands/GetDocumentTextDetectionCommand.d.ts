import { ServiceInputTypes, ServiceOutputTypes, TextractClientResolvedConfig } from "../TextractClient";
import { GetDocumentTextDetectionRequest, GetDocumentTextDetectionResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type GetDocumentTextDetectionCommandInput = GetDocumentTextDetectionRequest;
export declare type GetDocumentTextDetectionCommandOutput = GetDocumentTextDetectionResponse & __MetadataBearer;
/**
 * <p>Gets the results for an Amazon Textract asynchronous operation that detects text in a document.
 *      Amazon Textract can detect lines of text and the words that make up a line of text.</p>
 *          <p>You start asynchronous text detection by calling <a>StartDocumentTextDetection</a>, which returns a job identifier
 *             (<code>JobId</code>). When the text detection operation finishes, Amazon Textract publishes a
 *          completion status to the Amazon Simple Notification Service (Amazon SNS) topic that's registered in the initial call to
 *             <code>StartDocumentTextDetection</code>. To get the results of the text-detection
 *          operation, first check that the status value published to the Amazon SNS topic is
 *             <code>SUCCEEDED</code>. If so, call <code>GetDocumentTextDetection</code>, and pass the
 *          job identifier (<code>JobId</code>) from the initial call to
 *             <code>StartDocumentTextDetection</code>.</p>
 *          <p>
 *             <code>GetDocumentTextDetection</code> returns an array of <a>Block</a>
 *          objects. </p>
 *          <p>Each document page has as an associated <code>Block</code> of type PAGE. Each PAGE <code>Block</code> object
 *         is the parent of LINE <code>Block</code> objects that represent the lines of detected text on a page. A LINE <code>Block</code> object is
 *         a parent for each word that makes up the line. Words are represented by <code>Block</code> objects of type WORD.</p>
 *
 *          <p>Use the MaxResults parameter to limit the number of blocks that are returned. If there
 *          are more results than specified in <code>MaxResults</code>, the value of
 *             <code>NextToken</code> in the operation response contains a pagination token for getting
 *          the next set of results. To get the next page of results, call
 *             <code>GetDocumentTextDetection</code>, and populate the <code>NextToken</code> request
 *          parameter with the token value that's returned from the previous call to
 *             <code>GetDocumentTextDetection</code>.</p>
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/textract/latest/dg/how-it-works-detecting.html">Document Text Detection</a>.</p>
 */
export declare class GetDocumentTextDetectionCommand extends $Command<GetDocumentTextDetectionCommandInput, GetDocumentTextDetectionCommandOutput, TextractClientResolvedConfig> {
    readonly input: GetDocumentTextDetectionCommandInput;
    constructor(input: GetDocumentTextDetectionCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: TextractClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetDocumentTextDetectionCommandInput, GetDocumentTextDetectionCommandOutput>;
    private serialize;
    private deserialize;
}
