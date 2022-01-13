import { TextractClient } from "./TextractClient";
import { AnalyzeDocumentCommandInput, AnalyzeDocumentCommandOutput } from "./commands/AnalyzeDocumentCommand";
import { DetectDocumentTextCommandInput, DetectDocumentTextCommandOutput } from "./commands/DetectDocumentTextCommand";
import { GetDocumentAnalysisCommandInput, GetDocumentAnalysisCommandOutput } from "./commands/GetDocumentAnalysisCommand";
import { GetDocumentTextDetectionCommandInput, GetDocumentTextDetectionCommandOutput } from "./commands/GetDocumentTextDetectionCommand";
import { StartDocumentAnalysisCommandInput, StartDocumentAnalysisCommandOutput } from "./commands/StartDocumentAnalysisCommand";
import { StartDocumentTextDetectionCommandInput, StartDocumentTextDetectionCommandOutput } from "./commands/StartDocumentTextDetectionCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";
/**
 * <p>Amazon Textract detects and analyzes text in documents and converts it
 *          into machine-readable text. This is the API reference documentation for
 *          Amazon Textract.</p>
 */
export declare class Textract extends TextractClient {
    /**
     * <p>Analyzes an input document for relationships between detected items.  </p>
     *          <p>The types of information returned are as follows: </p>
     *          <ul>
     *             <li>
     *                <p>Form data (key-value pairs). The related information is returned in two <a>Block</a> objects, each of type <code>KEY_VALUE_SET</code>: a KEY
     *                   <code>Block</code> object and a VALUE <code>Block</code> object. For example,
     *                   <i>Name: Ana Silva Carolina</i> contains a key and value.
     *                   <i>Name:</i> is the key. <i>Ana Silva Carolina</i> is
     *                the value.</p>
     *             </li>
     *             <li>
     *                <p>Table and table cell data. A TABLE <code>Block</code> object contains information about a detected table. A CELL
     *                <code>Block</code> object is returned for each cell in a table.</p>
     *             </li>
     *             <li>
     *                <p>Lines and words of text. A LINE <code>Block</code> object contains one or more WORD <code>Block</code> objects.
     *         All lines and words that are detected in the document are returned (including text that doesn't have a
     *                relationship with the value of <code>FeatureTypes</code>). </p>
     *             </li>
     *          </ul>
     *
     *          <p>Selection elements such as check boxes and option buttons (radio buttons) can be detected in form data and in tables.
     *          A SELECTION_ELEMENT <code>Block</code> object contains information about a selection element,
     *          including the selection status.</p>
     *          <p>You can choose which type of analysis to perform by specifying the <code>FeatureTypes</code> list.
     *       </p>
     *          <p>The output is returned in a list of <code>Block</code> objects.</p>
     *          <p>
     *             <code>AnalyzeDocument</code> is a synchronous operation. To analyze documents
     *       asynchronously, use <a>StartDocumentAnalysis</a>.</p>
     *          <p>For more information, see <a href="https://docs.aws.amazon.com/textract/latest/dg/how-it-works-analyzing.html">Document Text Analysis</a>.</p>
     */
    analyzeDocument(args: AnalyzeDocumentCommandInput, options?: __HttpHandlerOptions): Promise<AnalyzeDocumentCommandOutput>;
    analyzeDocument(args: AnalyzeDocumentCommandInput, cb: (err: any, data?: AnalyzeDocumentCommandOutput) => void): void;
    analyzeDocument(args: AnalyzeDocumentCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: AnalyzeDocumentCommandOutput) => void): void;
    /**
     * <p>Detects text in the input document. Amazon Textract can detect lines of text and the
     *          words that make up a line of text. The input document must be an image in JPEG or PNG
     *          format. <code>DetectDocumentText</code> returns the detected text in an array of <a>Block</a> objects. </p>
     *          <p>Each document page has as an associated <code>Block</code> of type PAGE. Each PAGE <code>Block</code> object
     *          is the parent of LINE <code>Block</code> objects that represent the lines of detected text on a page. A LINE <code>Block</code> object is
     *          a parent for each word that makes up the line. Words are represented by <code>Block</code> objects of type WORD.</p>
     *
     *          <p>
     *             <code>DetectDocumentText</code> is a synchronous operation. To analyze documents
     *          asynchronously, use <a>StartDocumentTextDetection</a>.</p>
     *          <p>For more information, see <a href="https://docs.aws.amazon.com/textract/latest/dg/how-it-works-detecting.html">Document Text Detection</a>.</p>
     */
    detectDocumentText(args: DetectDocumentTextCommandInput, options?: __HttpHandlerOptions): Promise<DetectDocumentTextCommandOutput>;
    detectDocumentText(args: DetectDocumentTextCommandInput, cb: (err: any, data?: DetectDocumentTextCommandOutput) => void): void;
    detectDocumentText(args: DetectDocumentTextCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DetectDocumentTextCommandOutput) => void): void;
    /**
     * <p>Gets the results for an Amazon Textract asynchronous operation that analyzes text in a document.</p>
     *          <p>You start asynchronous text analysis by calling <a>StartDocumentAnalysis</a>, which returns a job identifier
     *             (<code>JobId</code>). When the text analysis operation finishes, Amazon Textract publishes a
     *          completion status to the Amazon Simple Notification Service (Amazon SNS) topic that's registered in the initial call to
     *             <code>StartDocumentAnalysis</code>. To get the results of the text-detection operation,
     *          first check that the status value published to the Amazon SNS topic is <code>SUCCEEDED</code>.
     *          If so, call <code>GetDocumentAnalysis</code>, and pass the job identifier
     *             (<code>JobId</code>) from the initial call to <code>StartDocumentAnalysis</code>.</p>
     *          <p>
     *             <code>GetDocumentAnalysis</code> returns an array of <a>Block</a> objects. The following
     *          types of information are returned: </p>
     *          <ul>
     *             <li>
     *                <p>Form data (key-value pairs). The related information is returned in two <a>Block</a> objects, each of type <code>KEY_VALUE_SET</code>: a KEY
     *             <code>Block</code> object and a VALUE <code>Block</code> object. For example,
     *             <i>Name: Ana Silva Carolina</i> contains a key and value.
     *             <i>Name:</i> is the key. <i>Ana Silva Carolina</i> is
     *             the value.</p>
     *             </li>
     *             <li>
     *                <p>Table and table cell data. A TABLE <code>Block</code> object contains information about a detected table. A CELL
     *             <code>Block</code> object is returned for each cell in a table.</p>
     *             </li>
     *             <li>
     *                <p>Lines and words of text. A LINE <code>Block</code> object contains one or more WORD <code>Block</code> objects.
     *             All lines and words that are detected in the document are returned (including text that doesn't have a
     *             relationship with the value of the <code>StartDocumentAnalysis</code>
     *                   <code>FeatureTypes</code> input parameter). </p>
     *             </li>
     *          </ul>
     *
     *          <p>Selection elements such as check boxes and option buttons (radio buttons) can be detected in form data and in tables.
     *          A SELECTION_ELEMENT <code>Block</code> object contains information about a selection element,
     *          including the selection status.</p>
     *
     *
     *
     *          <p>Use the <code>MaxResults</code> parameter to limit the number of blocks that are
     *          returned. If there are more results than specified in <code>MaxResults</code>, the value of
     *             <code>NextToken</code> in the operation response contains a pagination token for getting
     *          the next set of results. To get the next page of results, call
     *             <code>GetDocumentAnalysis</code>, and populate the <code>NextToken</code> request
     *          parameter with the token value that's returned from the previous call to
     *             <code>GetDocumentAnalysis</code>.</p>
     *          <p>For more information, see <a href="https://docs.aws.amazon.com/textract/latest/dg/how-it-works-analyzing.html">Document Text Analysis</a>.</p>
     */
    getDocumentAnalysis(args: GetDocumentAnalysisCommandInput, options?: __HttpHandlerOptions): Promise<GetDocumentAnalysisCommandOutput>;
    getDocumentAnalysis(args: GetDocumentAnalysisCommandInput, cb: (err: any, data?: GetDocumentAnalysisCommandOutput) => void): void;
    getDocumentAnalysis(args: GetDocumentAnalysisCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetDocumentAnalysisCommandOutput) => void): void;
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
    getDocumentTextDetection(args: GetDocumentTextDetectionCommandInput, options?: __HttpHandlerOptions): Promise<GetDocumentTextDetectionCommandOutput>;
    getDocumentTextDetection(args: GetDocumentTextDetectionCommandInput, cb: (err: any, data?: GetDocumentTextDetectionCommandOutput) => void): void;
    getDocumentTextDetection(args: GetDocumentTextDetectionCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetDocumentTextDetectionCommandOutput) => void): void;
    /**
     * <p>Starts the asynchronous analysis of an input document for relationships between detected
     *          items such as key-value pairs, tables, and selection elements.</p>
     *
     *          <p>
     *             <code>StartDocumentAnalysis</code> can analyze text in documents that are in JPEG, PNG, and PDF format. The
     *          documents are stored in an Amazon S3 bucket. Use <a>DocumentLocation</a> to specify the bucket name and file name
     *          of the document.
     *          </p>
     *          <p>
     *             <code>StartDocumentAnalysis</code> returns a job identifier
     *             (<code>JobId</code>) that you use to get the results of the operation. When text
     *          analysis is finished, Amazon Textract publishes a completion status to the Amazon Simple Notification Service (Amazon SNS)
     *          topic that you specify in <code>NotificationChannel</code>. To get the results of the text
     *          analysis operation, first check that the status value published to the Amazon SNS topic is
     *             <code>SUCCEEDED</code>. If so, call <a>GetDocumentAnalysis</a>, and pass
     *          the job identifier (<code>JobId</code>) from the initial call to
     *             <code>StartDocumentAnalysis</code>.</p>
     *          <p>For more information, see <a href="https://docs.aws.amazon.com/textract/latest/dg/how-it-works-analyzing.html">Document Text Analysis</a>.</p>
     */
    startDocumentAnalysis(args: StartDocumentAnalysisCommandInput, options?: __HttpHandlerOptions): Promise<StartDocumentAnalysisCommandOutput>;
    startDocumentAnalysis(args: StartDocumentAnalysisCommandInput, cb: (err: any, data?: StartDocumentAnalysisCommandOutput) => void): void;
    startDocumentAnalysis(args: StartDocumentAnalysisCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StartDocumentAnalysisCommandOutput) => void): void;
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
    startDocumentTextDetection(args: StartDocumentTextDetectionCommandInput, options?: __HttpHandlerOptions): Promise<StartDocumentTextDetectionCommandOutput>;
    startDocumentTextDetection(args: StartDocumentTextDetectionCommandInput, cb: (err: any, data?: StartDocumentTextDetectionCommandOutput) => void): void;
    startDocumentTextDetection(args: StartDocumentTextDetectionCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StartDocumentTextDetectionCommandOutput) => void): void;
}
