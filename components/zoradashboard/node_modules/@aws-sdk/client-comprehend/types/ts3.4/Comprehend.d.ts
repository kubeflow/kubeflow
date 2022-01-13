import { ComprehendClient } from "./ComprehendClient";
import { BatchDetectDominantLanguageCommandInput, BatchDetectDominantLanguageCommandOutput } from "./commands/BatchDetectDominantLanguageCommand";
import { BatchDetectEntitiesCommandInput, BatchDetectEntitiesCommandOutput } from "./commands/BatchDetectEntitiesCommand";
import { BatchDetectKeyPhrasesCommandInput, BatchDetectKeyPhrasesCommandOutput } from "./commands/BatchDetectKeyPhrasesCommand";
import { BatchDetectSentimentCommandInput, BatchDetectSentimentCommandOutput } from "./commands/BatchDetectSentimentCommand";
import { BatchDetectSyntaxCommandInput, BatchDetectSyntaxCommandOutput } from "./commands/BatchDetectSyntaxCommand";
import { ClassifyDocumentCommandInput, ClassifyDocumentCommandOutput } from "./commands/ClassifyDocumentCommand";
import { CreateDocumentClassifierCommandInput, CreateDocumentClassifierCommandOutput } from "./commands/CreateDocumentClassifierCommand";
import { CreateEndpointCommandInput, CreateEndpointCommandOutput } from "./commands/CreateEndpointCommand";
import { CreateEntityRecognizerCommandInput, CreateEntityRecognizerCommandOutput } from "./commands/CreateEntityRecognizerCommand";
import { DeleteDocumentClassifierCommandInput, DeleteDocumentClassifierCommandOutput } from "./commands/DeleteDocumentClassifierCommand";
import { DeleteEndpointCommandInput, DeleteEndpointCommandOutput } from "./commands/DeleteEndpointCommand";
import { DeleteEntityRecognizerCommandInput, DeleteEntityRecognizerCommandOutput } from "./commands/DeleteEntityRecognizerCommand";
import { DescribeDocumentClassificationJobCommandInput, DescribeDocumentClassificationJobCommandOutput } from "./commands/DescribeDocumentClassificationJobCommand";
import { DescribeDocumentClassifierCommandInput, DescribeDocumentClassifierCommandOutput } from "./commands/DescribeDocumentClassifierCommand";
import { DescribeDominantLanguageDetectionJobCommandInput, DescribeDominantLanguageDetectionJobCommandOutput } from "./commands/DescribeDominantLanguageDetectionJobCommand";
import { DescribeEndpointCommandInput, DescribeEndpointCommandOutput } from "./commands/DescribeEndpointCommand";
import { DescribeEntitiesDetectionJobCommandInput, DescribeEntitiesDetectionJobCommandOutput } from "./commands/DescribeEntitiesDetectionJobCommand";
import { DescribeEntityRecognizerCommandInput, DescribeEntityRecognizerCommandOutput } from "./commands/DescribeEntityRecognizerCommand";
import { DescribeEventsDetectionJobCommandInput, DescribeEventsDetectionJobCommandOutput } from "./commands/DescribeEventsDetectionJobCommand";
import { DescribeKeyPhrasesDetectionJobCommandInput, DescribeKeyPhrasesDetectionJobCommandOutput } from "./commands/DescribeKeyPhrasesDetectionJobCommand";
import { DescribePiiEntitiesDetectionJobCommandInput, DescribePiiEntitiesDetectionJobCommandOutput } from "./commands/DescribePiiEntitiesDetectionJobCommand";
import { DescribeSentimentDetectionJobCommandInput, DescribeSentimentDetectionJobCommandOutput } from "./commands/DescribeSentimentDetectionJobCommand";
import { DescribeTopicsDetectionJobCommandInput, DescribeTopicsDetectionJobCommandOutput } from "./commands/DescribeTopicsDetectionJobCommand";
import { DetectDominantLanguageCommandInput, DetectDominantLanguageCommandOutput } from "./commands/DetectDominantLanguageCommand";
import { DetectEntitiesCommandInput, DetectEntitiesCommandOutput } from "./commands/DetectEntitiesCommand";
import { DetectKeyPhrasesCommandInput, DetectKeyPhrasesCommandOutput } from "./commands/DetectKeyPhrasesCommand";
import { DetectPiiEntitiesCommandInput, DetectPiiEntitiesCommandOutput } from "./commands/DetectPiiEntitiesCommand";
import { DetectSentimentCommandInput, DetectSentimentCommandOutput } from "./commands/DetectSentimentCommand";
import { DetectSyntaxCommandInput, DetectSyntaxCommandOutput } from "./commands/DetectSyntaxCommand";
import { ListDocumentClassificationJobsCommandInput, ListDocumentClassificationJobsCommandOutput } from "./commands/ListDocumentClassificationJobsCommand";
import { ListDocumentClassifiersCommandInput, ListDocumentClassifiersCommandOutput } from "./commands/ListDocumentClassifiersCommand";
import { ListDominantLanguageDetectionJobsCommandInput, ListDominantLanguageDetectionJobsCommandOutput } from "./commands/ListDominantLanguageDetectionJobsCommand";
import { ListEndpointsCommandInput, ListEndpointsCommandOutput } from "./commands/ListEndpointsCommand";
import { ListEntitiesDetectionJobsCommandInput, ListEntitiesDetectionJobsCommandOutput } from "./commands/ListEntitiesDetectionJobsCommand";
import { ListEntityRecognizersCommandInput, ListEntityRecognizersCommandOutput } from "./commands/ListEntityRecognizersCommand";
import { ListEventsDetectionJobsCommandInput, ListEventsDetectionJobsCommandOutput } from "./commands/ListEventsDetectionJobsCommand";
import { ListKeyPhrasesDetectionJobsCommandInput, ListKeyPhrasesDetectionJobsCommandOutput } from "./commands/ListKeyPhrasesDetectionJobsCommand";
import { ListPiiEntitiesDetectionJobsCommandInput, ListPiiEntitiesDetectionJobsCommandOutput } from "./commands/ListPiiEntitiesDetectionJobsCommand";
import { ListSentimentDetectionJobsCommandInput, ListSentimentDetectionJobsCommandOutput } from "./commands/ListSentimentDetectionJobsCommand";
import { ListTagsForResourceCommandInput, ListTagsForResourceCommandOutput } from "./commands/ListTagsForResourceCommand";
import { ListTopicsDetectionJobsCommandInput, ListTopicsDetectionJobsCommandOutput } from "./commands/ListTopicsDetectionJobsCommand";
import { StartDocumentClassificationJobCommandInput, StartDocumentClassificationJobCommandOutput } from "./commands/StartDocumentClassificationJobCommand";
import { StartDominantLanguageDetectionJobCommandInput, StartDominantLanguageDetectionJobCommandOutput } from "./commands/StartDominantLanguageDetectionJobCommand";
import { StartEntitiesDetectionJobCommandInput, StartEntitiesDetectionJobCommandOutput } from "./commands/StartEntitiesDetectionJobCommand";
import { StartEventsDetectionJobCommandInput, StartEventsDetectionJobCommandOutput } from "./commands/StartEventsDetectionJobCommand";
import { StartKeyPhrasesDetectionJobCommandInput, StartKeyPhrasesDetectionJobCommandOutput } from "./commands/StartKeyPhrasesDetectionJobCommand";
import { StartPiiEntitiesDetectionJobCommandInput, StartPiiEntitiesDetectionJobCommandOutput } from "./commands/StartPiiEntitiesDetectionJobCommand";
import { StartSentimentDetectionJobCommandInput, StartSentimentDetectionJobCommandOutput } from "./commands/StartSentimentDetectionJobCommand";
import { StartTopicsDetectionJobCommandInput, StartTopicsDetectionJobCommandOutput } from "./commands/StartTopicsDetectionJobCommand";
import { StopDominantLanguageDetectionJobCommandInput, StopDominantLanguageDetectionJobCommandOutput } from "./commands/StopDominantLanguageDetectionJobCommand";
import { StopEntitiesDetectionJobCommandInput, StopEntitiesDetectionJobCommandOutput } from "./commands/StopEntitiesDetectionJobCommand";
import { StopEventsDetectionJobCommandInput, StopEventsDetectionJobCommandOutput } from "./commands/StopEventsDetectionJobCommand";
import { StopKeyPhrasesDetectionJobCommandInput, StopKeyPhrasesDetectionJobCommandOutput } from "./commands/StopKeyPhrasesDetectionJobCommand";
import { StopPiiEntitiesDetectionJobCommandInput, StopPiiEntitiesDetectionJobCommandOutput } from "./commands/StopPiiEntitiesDetectionJobCommand";
import { StopSentimentDetectionJobCommandInput, StopSentimentDetectionJobCommandOutput } from "./commands/StopSentimentDetectionJobCommand";
import { StopTrainingDocumentClassifierCommandInput, StopTrainingDocumentClassifierCommandOutput } from "./commands/StopTrainingDocumentClassifierCommand";
import { StopTrainingEntityRecognizerCommandInput, StopTrainingEntityRecognizerCommandOutput } from "./commands/StopTrainingEntityRecognizerCommand";
import { TagResourceCommandInput, TagResourceCommandOutput } from "./commands/TagResourceCommand";
import { UntagResourceCommandInput, UntagResourceCommandOutput } from "./commands/UntagResourceCommand";
import { UpdateEndpointCommandInput, UpdateEndpointCommandOutput } from "./commands/UpdateEndpointCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";
/**
 * <p>Amazon Comprehend is an AWS service for gaining insight into the content of documents.
 *       Use these actions to determine the topics contained in your documents, the topics they
 *       discuss, the predominant sentiment expressed in them, the predominant language used, and
 *       more.</p>
 */
export declare class Comprehend extends ComprehendClient {
    /**
     * <p>Determines the dominant language of the input text for a batch of documents. For a list
     *       of languages that Amazon Comprehend can detect, see <a href="https://docs.aws.amazon.com/comprehend/latest/dg/how-languages.html">Amazon Comprehend Supported Languages</a>.
     *     </p>
     */
    batchDetectDominantLanguage(args: BatchDetectDominantLanguageCommandInput, options?: __HttpHandlerOptions): Promise<BatchDetectDominantLanguageCommandOutput>;
    batchDetectDominantLanguage(args: BatchDetectDominantLanguageCommandInput, cb: (err: any, data?: BatchDetectDominantLanguageCommandOutput) => void): void;
    batchDetectDominantLanguage(args: BatchDetectDominantLanguageCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: BatchDetectDominantLanguageCommandOutput) => void): void;
    /**
     * <p>Inspects the text of a batch of documents for named entities and returns information
     *       about them. For more information about named entities, see <a>how-entities</a>
     *          </p>
     */
    batchDetectEntities(args: BatchDetectEntitiesCommandInput, options?: __HttpHandlerOptions): Promise<BatchDetectEntitiesCommandOutput>;
    batchDetectEntities(args: BatchDetectEntitiesCommandInput, cb: (err: any, data?: BatchDetectEntitiesCommandOutput) => void): void;
    batchDetectEntities(args: BatchDetectEntitiesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: BatchDetectEntitiesCommandOutput) => void): void;
    /**
     * <p>Detects the key noun phrases found in a batch of documents.</p>
     */
    batchDetectKeyPhrases(args: BatchDetectKeyPhrasesCommandInput, options?: __HttpHandlerOptions): Promise<BatchDetectKeyPhrasesCommandOutput>;
    batchDetectKeyPhrases(args: BatchDetectKeyPhrasesCommandInput, cb: (err: any, data?: BatchDetectKeyPhrasesCommandOutput) => void): void;
    batchDetectKeyPhrases(args: BatchDetectKeyPhrasesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: BatchDetectKeyPhrasesCommandOutput) => void): void;
    /**
     * <p>Inspects a batch of documents and returns an inference of the prevailing sentiment,
     *         <code>POSITIVE</code>, <code>NEUTRAL</code>, <code>MIXED</code>, or <code>NEGATIVE</code>,
     *       in each one.</p>
     */
    batchDetectSentiment(args: BatchDetectSentimentCommandInput, options?: __HttpHandlerOptions): Promise<BatchDetectSentimentCommandOutput>;
    batchDetectSentiment(args: BatchDetectSentimentCommandInput, cb: (err: any, data?: BatchDetectSentimentCommandOutput) => void): void;
    batchDetectSentiment(args: BatchDetectSentimentCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: BatchDetectSentimentCommandOutput) => void): void;
    /**
     * <p>Inspects the text of a batch of documents for the syntax and part of speech of the words
     *       in the document and returns information about them. For more information, see <a>how-syntax</a>.</p>
     */
    batchDetectSyntax(args: BatchDetectSyntaxCommandInput, options?: __HttpHandlerOptions): Promise<BatchDetectSyntaxCommandOutput>;
    batchDetectSyntax(args: BatchDetectSyntaxCommandInput, cb: (err: any, data?: BatchDetectSyntaxCommandOutput) => void): void;
    batchDetectSyntax(args: BatchDetectSyntaxCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: BatchDetectSyntaxCommandOutput) => void): void;
    /**
     * <p>Creates a new document classification request to analyze a single document in real-time,
     *       using a previously created and trained custom model and an endpoint.</p>
     */
    classifyDocument(args: ClassifyDocumentCommandInput, options?: __HttpHandlerOptions): Promise<ClassifyDocumentCommandOutput>;
    classifyDocument(args: ClassifyDocumentCommandInput, cb: (err: any, data?: ClassifyDocumentCommandOutput) => void): void;
    classifyDocument(args: ClassifyDocumentCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ClassifyDocumentCommandOutput) => void): void;
    /**
     * <p>Creates a new document classifier that you can use to categorize documents. To create a
     *       classifier, you provide a set of training documents that labeled with the categories that you
     *       want to use. After the classifier is trained you can use it to categorize a set of labeled
     *       documents into the categories. For more information, see <a>how-document-classification</a>.</p>
     */
    createDocumentClassifier(args: CreateDocumentClassifierCommandInput, options?: __HttpHandlerOptions): Promise<CreateDocumentClassifierCommandOutput>;
    createDocumentClassifier(args: CreateDocumentClassifierCommandInput, cb: (err: any, data?: CreateDocumentClassifierCommandOutput) => void): void;
    createDocumentClassifier(args: CreateDocumentClassifierCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateDocumentClassifierCommandOutput) => void): void;
    /**
     * <p>Creates a model-specific endpoint for synchronous inference for a previously trained
     *       custom model
     *       </p>
     */
    createEndpoint(args: CreateEndpointCommandInput, options?: __HttpHandlerOptions): Promise<CreateEndpointCommandOutput>;
    createEndpoint(args: CreateEndpointCommandInput, cb: (err: any, data?: CreateEndpointCommandOutput) => void): void;
    createEndpoint(args: CreateEndpointCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateEndpointCommandOutput) => void): void;
    /**
     * <p>Creates an entity recognizer using submitted files. After your
     *         <code>CreateEntityRecognizer</code> request is submitted, you can check job status using the
     *          API. </p>
     */
    createEntityRecognizer(args: CreateEntityRecognizerCommandInput, options?: __HttpHandlerOptions): Promise<CreateEntityRecognizerCommandOutput>;
    createEntityRecognizer(args: CreateEntityRecognizerCommandInput, cb: (err: any, data?: CreateEntityRecognizerCommandOutput) => void): void;
    createEntityRecognizer(args: CreateEntityRecognizerCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateEntityRecognizerCommandOutput) => void): void;
    /**
     * <p>Deletes a previously created document classifier</p>
     *          <p>Only those classifiers that are in terminated states (IN_ERROR, TRAINED) will be deleted.
     *       If an active inference job is using the model, a <code>ResourceInUseException</code> will be
     *       returned.</p>
     *          <p>This is an asynchronous action that puts the classifier into a DELETING state, and it is
     *       then removed by a background job. Once removed, the classifier disappears from your account
     *       and is no longer available for use. </p>
     */
    deleteDocumentClassifier(args: DeleteDocumentClassifierCommandInput, options?: __HttpHandlerOptions): Promise<DeleteDocumentClassifierCommandOutput>;
    deleteDocumentClassifier(args: DeleteDocumentClassifierCommandInput, cb: (err: any, data?: DeleteDocumentClassifierCommandOutput) => void): void;
    deleteDocumentClassifier(args: DeleteDocumentClassifierCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteDocumentClassifierCommandOutput) => void): void;
    /**
     * <p>Deletes a model-specific endpoint for a previously-trained custom model. All endpoints
     *       must be deleted in order for the model to be deleted.</p>
     */
    deleteEndpoint(args: DeleteEndpointCommandInput, options?: __HttpHandlerOptions): Promise<DeleteEndpointCommandOutput>;
    deleteEndpoint(args: DeleteEndpointCommandInput, cb: (err: any, data?: DeleteEndpointCommandOutput) => void): void;
    deleteEndpoint(args: DeleteEndpointCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteEndpointCommandOutput) => void): void;
    /**
     * <p>Deletes an entity recognizer.</p>
     *          <p>Only those recognizers that are in terminated states (IN_ERROR, TRAINED) will be deleted.
     *       If an active inference job is using the model, a <code>ResourceInUseException</code> will be
     *       returned.</p>
     *          <p>This is an asynchronous action that puts the recognizer into a DELETING state, and it is
     *       then removed by a background job. Once removed, the recognizer disappears from your account
     *       and is no longer available for use. </p>
     */
    deleteEntityRecognizer(args: DeleteEntityRecognizerCommandInput, options?: __HttpHandlerOptions): Promise<DeleteEntityRecognizerCommandOutput>;
    deleteEntityRecognizer(args: DeleteEntityRecognizerCommandInput, cb: (err: any, data?: DeleteEntityRecognizerCommandOutput) => void): void;
    deleteEntityRecognizer(args: DeleteEntityRecognizerCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteEntityRecognizerCommandOutput) => void): void;
    /**
     * <p>Gets the properties associated with a document classification job. Use this operation to
     *       get the status of a classification job.</p>
     */
    describeDocumentClassificationJob(args: DescribeDocumentClassificationJobCommandInput, options?: __HttpHandlerOptions): Promise<DescribeDocumentClassificationJobCommandOutput>;
    describeDocumentClassificationJob(args: DescribeDocumentClassificationJobCommandInput, cb: (err: any, data?: DescribeDocumentClassificationJobCommandOutput) => void): void;
    describeDocumentClassificationJob(args: DescribeDocumentClassificationJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeDocumentClassificationJobCommandOutput) => void): void;
    /**
     * <p>Gets the properties associated with a document classifier.</p>
     */
    describeDocumentClassifier(args: DescribeDocumentClassifierCommandInput, options?: __HttpHandlerOptions): Promise<DescribeDocumentClassifierCommandOutput>;
    describeDocumentClassifier(args: DescribeDocumentClassifierCommandInput, cb: (err: any, data?: DescribeDocumentClassifierCommandOutput) => void): void;
    describeDocumentClassifier(args: DescribeDocumentClassifierCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeDocumentClassifierCommandOutput) => void): void;
    /**
     * <p>Gets the properties associated with a dominant language detection job. Use this operation
     *       to get the status of a detection job.</p>
     */
    describeDominantLanguageDetectionJob(args: DescribeDominantLanguageDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<DescribeDominantLanguageDetectionJobCommandOutput>;
    describeDominantLanguageDetectionJob(args: DescribeDominantLanguageDetectionJobCommandInput, cb: (err: any, data?: DescribeDominantLanguageDetectionJobCommandOutput) => void): void;
    describeDominantLanguageDetectionJob(args: DescribeDominantLanguageDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeDominantLanguageDetectionJobCommandOutput) => void): void;
    /**
     * <p>Gets the properties associated with a specific endpoint. Use this operation to get the
     *       status of an endpoint.</p>
     */
    describeEndpoint(args: DescribeEndpointCommandInput, options?: __HttpHandlerOptions): Promise<DescribeEndpointCommandOutput>;
    describeEndpoint(args: DescribeEndpointCommandInput, cb: (err: any, data?: DescribeEndpointCommandOutput) => void): void;
    describeEndpoint(args: DescribeEndpointCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeEndpointCommandOutput) => void): void;
    /**
     * <p>Gets the properties associated with an entities detection job. Use this operation to get
     *       the status of a detection job.</p>
     */
    describeEntitiesDetectionJob(args: DescribeEntitiesDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<DescribeEntitiesDetectionJobCommandOutput>;
    describeEntitiesDetectionJob(args: DescribeEntitiesDetectionJobCommandInput, cb: (err: any, data?: DescribeEntitiesDetectionJobCommandOutput) => void): void;
    describeEntitiesDetectionJob(args: DescribeEntitiesDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeEntitiesDetectionJobCommandOutput) => void): void;
    /**
     * <p>Provides details about an entity recognizer including status, S3 buckets containing
     *       training data, recognizer metadata, metrics, and so on.</p>
     */
    describeEntityRecognizer(args: DescribeEntityRecognizerCommandInput, options?: __HttpHandlerOptions): Promise<DescribeEntityRecognizerCommandOutput>;
    describeEntityRecognizer(args: DescribeEntityRecognizerCommandInput, cb: (err: any, data?: DescribeEntityRecognizerCommandOutput) => void): void;
    describeEntityRecognizer(args: DescribeEntityRecognizerCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeEntityRecognizerCommandOutput) => void): void;
    /**
     * <p>Gets the status and details of an events detection job.</p>
     */
    describeEventsDetectionJob(args: DescribeEventsDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<DescribeEventsDetectionJobCommandOutput>;
    describeEventsDetectionJob(args: DescribeEventsDetectionJobCommandInput, cb: (err: any, data?: DescribeEventsDetectionJobCommandOutput) => void): void;
    describeEventsDetectionJob(args: DescribeEventsDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeEventsDetectionJobCommandOutput) => void): void;
    /**
     * <p>Gets the properties associated with a key phrases detection job. Use this operation to get
     *       the status of a detection job.</p>
     */
    describeKeyPhrasesDetectionJob(args: DescribeKeyPhrasesDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<DescribeKeyPhrasesDetectionJobCommandOutput>;
    describeKeyPhrasesDetectionJob(args: DescribeKeyPhrasesDetectionJobCommandInput, cb: (err: any, data?: DescribeKeyPhrasesDetectionJobCommandOutput) => void): void;
    describeKeyPhrasesDetectionJob(args: DescribeKeyPhrasesDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeKeyPhrasesDetectionJobCommandOutput) => void): void;
    /**
     * <p>Gets the properties associated with a PII entities detection job. For example, you can use
     *       this operation to get the job status.</p>
     */
    describePiiEntitiesDetectionJob(args: DescribePiiEntitiesDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<DescribePiiEntitiesDetectionJobCommandOutput>;
    describePiiEntitiesDetectionJob(args: DescribePiiEntitiesDetectionJobCommandInput, cb: (err: any, data?: DescribePiiEntitiesDetectionJobCommandOutput) => void): void;
    describePiiEntitiesDetectionJob(args: DescribePiiEntitiesDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribePiiEntitiesDetectionJobCommandOutput) => void): void;
    /**
     * <p>Gets the properties associated with a sentiment detection job. Use this operation to get
     *       the status of a detection job.</p>
     */
    describeSentimentDetectionJob(args: DescribeSentimentDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<DescribeSentimentDetectionJobCommandOutput>;
    describeSentimentDetectionJob(args: DescribeSentimentDetectionJobCommandInput, cb: (err: any, data?: DescribeSentimentDetectionJobCommandOutput) => void): void;
    describeSentimentDetectionJob(args: DescribeSentimentDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeSentimentDetectionJobCommandOutput) => void): void;
    /**
     * <p>Gets the properties associated with a topic detection job. Use this operation to get
     *       the status of a detection job.</p>
     */
    describeTopicsDetectionJob(args: DescribeTopicsDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<DescribeTopicsDetectionJobCommandOutput>;
    describeTopicsDetectionJob(args: DescribeTopicsDetectionJobCommandInput, cb: (err: any, data?: DescribeTopicsDetectionJobCommandOutput) => void): void;
    describeTopicsDetectionJob(args: DescribeTopicsDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeTopicsDetectionJobCommandOutput) => void): void;
    /**
     * <p>Determines the dominant language of the input text. For a list of languages that Amazon
     *       Comprehend can detect, see <a href="https://docs.aws.amazon.com/comprehend/latest/dg/how-languages.html">Amazon Comprehend Supported Languages</a>. </p>
     */
    detectDominantLanguage(args: DetectDominantLanguageCommandInput, options?: __HttpHandlerOptions): Promise<DetectDominantLanguageCommandOutput>;
    detectDominantLanguage(args: DetectDominantLanguageCommandInput, cb: (err: any, data?: DetectDominantLanguageCommandOutput) => void): void;
    detectDominantLanguage(args: DetectDominantLanguageCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DetectDominantLanguageCommandOutput) => void): void;
    /**
     * <p>Inspects text for named entities, and returns information about them. For more
     *       information, about named entities, see <a>how-entities</a>. </p>
     */
    detectEntities(args: DetectEntitiesCommandInput, options?: __HttpHandlerOptions): Promise<DetectEntitiesCommandOutput>;
    detectEntities(args: DetectEntitiesCommandInput, cb: (err: any, data?: DetectEntitiesCommandOutput) => void): void;
    detectEntities(args: DetectEntitiesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DetectEntitiesCommandOutput) => void): void;
    /**
     * <p>Detects the key noun phrases found in the text. </p>
     */
    detectKeyPhrases(args: DetectKeyPhrasesCommandInput, options?: __HttpHandlerOptions): Promise<DetectKeyPhrasesCommandOutput>;
    detectKeyPhrases(args: DetectKeyPhrasesCommandInput, cb: (err: any, data?: DetectKeyPhrasesCommandOutput) => void): void;
    detectKeyPhrases(args: DetectKeyPhrasesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DetectKeyPhrasesCommandOutput) => void): void;
    /**
     * <p>Inspects the input text for entities that contain personally identifiable information
     *       (PII) and returns information about them.</p>
     */
    detectPiiEntities(args: DetectPiiEntitiesCommandInput, options?: __HttpHandlerOptions): Promise<DetectPiiEntitiesCommandOutput>;
    detectPiiEntities(args: DetectPiiEntitiesCommandInput, cb: (err: any, data?: DetectPiiEntitiesCommandOutput) => void): void;
    detectPiiEntities(args: DetectPiiEntitiesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DetectPiiEntitiesCommandOutput) => void): void;
    /**
     * <p>Inspects text and returns an inference of the prevailing sentiment
     *         (<code>POSITIVE</code>, <code>NEUTRAL</code>, <code>MIXED</code>, or <code>NEGATIVE</code>). </p>
     */
    detectSentiment(args: DetectSentimentCommandInput, options?: __HttpHandlerOptions): Promise<DetectSentimentCommandOutput>;
    detectSentiment(args: DetectSentimentCommandInput, cb: (err: any, data?: DetectSentimentCommandOutput) => void): void;
    detectSentiment(args: DetectSentimentCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DetectSentimentCommandOutput) => void): void;
    /**
     * <p>Inspects text for syntax and the part of speech of words in the document. For more
     *       information, <a>how-syntax</a>.</p>
     */
    detectSyntax(args: DetectSyntaxCommandInput, options?: __HttpHandlerOptions): Promise<DetectSyntaxCommandOutput>;
    detectSyntax(args: DetectSyntaxCommandInput, cb: (err: any, data?: DetectSyntaxCommandOutput) => void): void;
    detectSyntax(args: DetectSyntaxCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DetectSyntaxCommandOutput) => void): void;
    /**
     * <p>Gets a list of the documentation classification jobs that you have submitted.</p>
     */
    listDocumentClassificationJobs(args: ListDocumentClassificationJobsCommandInput, options?: __HttpHandlerOptions): Promise<ListDocumentClassificationJobsCommandOutput>;
    listDocumentClassificationJobs(args: ListDocumentClassificationJobsCommandInput, cb: (err: any, data?: ListDocumentClassificationJobsCommandOutput) => void): void;
    listDocumentClassificationJobs(args: ListDocumentClassificationJobsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListDocumentClassificationJobsCommandOutput) => void): void;
    /**
     * <p>Gets a list of the document classifiers that you have created.</p>
     */
    listDocumentClassifiers(args: ListDocumentClassifiersCommandInput, options?: __HttpHandlerOptions): Promise<ListDocumentClassifiersCommandOutput>;
    listDocumentClassifiers(args: ListDocumentClassifiersCommandInput, cb: (err: any, data?: ListDocumentClassifiersCommandOutput) => void): void;
    listDocumentClassifiers(args: ListDocumentClassifiersCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListDocumentClassifiersCommandOutput) => void): void;
    /**
     * <p>Gets a list of the dominant language detection jobs that you have submitted.</p>
     */
    listDominantLanguageDetectionJobs(args: ListDominantLanguageDetectionJobsCommandInput, options?: __HttpHandlerOptions): Promise<ListDominantLanguageDetectionJobsCommandOutput>;
    listDominantLanguageDetectionJobs(args: ListDominantLanguageDetectionJobsCommandInput, cb: (err: any, data?: ListDominantLanguageDetectionJobsCommandOutput) => void): void;
    listDominantLanguageDetectionJobs(args: ListDominantLanguageDetectionJobsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListDominantLanguageDetectionJobsCommandOutput) => void): void;
    /**
     * <p>Gets a list of all existing endpoints that you've created.</p>
     */
    listEndpoints(args: ListEndpointsCommandInput, options?: __HttpHandlerOptions): Promise<ListEndpointsCommandOutput>;
    listEndpoints(args: ListEndpointsCommandInput, cb: (err: any, data?: ListEndpointsCommandOutput) => void): void;
    listEndpoints(args: ListEndpointsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListEndpointsCommandOutput) => void): void;
    /**
     * <p>Gets a list of the entity detection jobs that you have submitted.</p>
     */
    listEntitiesDetectionJobs(args: ListEntitiesDetectionJobsCommandInput, options?: __HttpHandlerOptions): Promise<ListEntitiesDetectionJobsCommandOutput>;
    listEntitiesDetectionJobs(args: ListEntitiesDetectionJobsCommandInput, cb: (err: any, data?: ListEntitiesDetectionJobsCommandOutput) => void): void;
    listEntitiesDetectionJobs(args: ListEntitiesDetectionJobsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListEntitiesDetectionJobsCommandOutput) => void): void;
    /**
     * <p>Gets a list of the properties of all entity recognizers that you created, including
     *       recognizers currently in training. Allows you to filter the list of recognizers based on
     *       criteria such as status and submission time. This call returns up to 500 entity recognizers in
     *       the list, with a default number of 100 recognizers in the list.</p>
     *          <p>The results of this list are not in any particular order. Please get the list and sort
     *       locally if needed.</p>
     */
    listEntityRecognizers(args: ListEntityRecognizersCommandInput, options?: __HttpHandlerOptions): Promise<ListEntityRecognizersCommandOutput>;
    listEntityRecognizers(args: ListEntityRecognizersCommandInput, cb: (err: any, data?: ListEntityRecognizersCommandOutput) => void): void;
    listEntityRecognizers(args: ListEntityRecognizersCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListEntityRecognizersCommandOutput) => void): void;
    /**
     * <p>Gets a list of the events detection jobs that you have submitted.</p>
     */
    listEventsDetectionJobs(args: ListEventsDetectionJobsCommandInput, options?: __HttpHandlerOptions): Promise<ListEventsDetectionJobsCommandOutput>;
    listEventsDetectionJobs(args: ListEventsDetectionJobsCommandInput, cb: (err: any, data?: ListEventsDetectionJobsCommandOutput) => void): void;
    listEventsDetectionJobs(args: ListEventsDetectionJobsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListEventsDetectionJobsCommandOutput) => void): void;
    /**
     * <p>Get a list of key phrase detection jobs that you have submitted.</p>
     */
    listKeyPhrasesDetectionJobs(args: ListKeyPhrasesDetectionJobsCommandInput, options?: __HttpHandlerOptions): Promise<ListKeyPhrasesDetectionJobsCommandOutput>;
    listKeyPhrasesDetectionJobs(args: ListKeyPhrasesDetectionJobsCommandInput, cb: (err: any, data?: ListKeyPhrasesDetectionJobsCommandOutput) => void): void;
    listKeyPhrasesDetectionJobs(args: ListKeyPhrasesDetectionJobsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListKeyPhrasesDetectionJobsCommandOutput) => void): void;
    /**
     * <p>Gets a list of the PII entity detection jobs that you have submitted.</p>
     */
    listPiiEntitiesDetectionJobs(args: ListPiiEntitiesDetectionJobsCommandInput, options?: __HttpHandlerOptions): Promise<ListPiiEntitiesDetectionJobsCommandOutput>;
    listPiiEntitiesDetectionJobs(args: ListPiiEntitiesDetectionJobsCommandInput, cb: (err: any, data?: ListPiiEntitiesDetectionJobsCommandOutput) => void): void;
    listPiiEntitiesDetectionJobs(args: ListPiiEntitiesDetectionJobsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListPiiEntitiesDetectionJobsCommandOutput) => void): void;
    /**
     * <p>Gets a list of sentiment detection jobs that you have submitted.</p>
     */
    listSentimentDetectionJobs(args: ListSentimentDetectionJobsCommandInput, options?: __HttpHandlerOptions): Promise<ListSentimentDetectionJobsCommandOutput>;
    listSentimentDetectionJobs(args: ListSentimentDetectionJobsCommandInput, cb: (err: any, data?: ListSentimentDetectionJobsCommandOutput) => void): void;
    listSentimentDetectionJobs(args: ListSentimentDetectionJobsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListSentimentDetectionJobsCommandOutput) => void): void;
    /**
     * <p>Lists all tags associated with a given Amazon Comprehend resource. </p>
     */
    listTagsForResource(args: ListTagsForResourceCommandInput, options?: __HttpHandlerOptions): Promise<ListTagsForResourceCommandOutput>;
    listTagsForResource(args: ListTagsForResourceCommandInput, cb: (err: any, data?: ListTagsForResourceCommandOutput) => void): void;
    listTagsForResource(args: ListTagsForResourceCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListTagsForResourceCommandOutput) => void): void;
    /**
     * <p>Gets a list of the topic detection jobs that you have submitted.</p>
     */
    listTopicsDetectionJobs(args: ListTopicsDetectionJobsCommandInput, options?: __HttpHandlerOptions): Promise<ListTopicsDetectionJobsCommandOutput>;
    listTopicsDetectionJobs(args: ListTopicsDetectionJobsCommandInput, cb: (err: any, data?: ListTopicsDetectionJobsCommandOutput) => void): void;
    listTopicsDetectionJobs(args: ListTopicsDetectionJobsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListTopicsDetectionJobsCommandOutput) => void): void;
    /**
     * <p>Starts an asynchronous document classification job. Use the  operation to track the progress of the
     *       job.</p>
     */
    startDocumentClassificationJob(args: StartDocumentClassificationJobCommandInput, options?: __HttpHandlerOptions): Promise<StartDocumentClassificationJobCommandOutput>;
    startDocumentClassificationJob(args: StartDocumentClassificationJobCommandInput, cb: (err: any, data?: StartDocumentClassificationJobCommandOutput) => void): void;
    startDocumentClassificationJob(args: StartDocumentClassificationJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StartDocumentClassificationJobCommandOutput) => void): void;
    /**
     * <p>Starts an asynchronous dominant language detection job for a collection of documents. Use
     *       the  operation to track the status
     *       of a job.</p>
     */
    startDominantLanguageDetectionJob(args: StartDominantLanguageDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<StartDominantLanguageDetectionJobCommandOutput>;
    startDominantLanguageDetectionJob(args: StartDominantLanguageDetectionJobCommandInput, cb: (err: any, data?: StartDominantLanguageDetectionJobCommandOutput) => void): void;
    startDominantLanguageDetectionJob(args: StartDominantLanguageDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StartDominantLanguageDetectionJobCommandOutput) => void): void;
    /**
     * <p>Starts an asynchronous entity detection job for a collection of documents. Use the  operation to track the status of a job.</p>
     *          <p>This API can be used for either standard entity detection or custom entity recognition. In
     *       order to be used for custom entity recognition, the optional <code>EntityRecognizerArn</code>
     *       must be used in order to provide access to the recognizer being used to detect the custom
     *       entity.</p>
     */
    startEntitiesDetectionJob(args: StartEntitiesDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<StartEntitiesDetectionJobCommandOutput>;
    startEntitiesDetectionJob(args: StartEntitiesDetectionJobCommandInput, cb: (err: any, data?: StartEntitiesDetectionJobCommandOutput) => void): void;
    startEntitiesDetectionJob(args: StartEntitiesDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StartEntitiesDetectionJobCommandOutput) => void): void;
    /**
     * <p>Starts an asynchronous event detection job for a collection of documents.</p>
     */
    startEventsDetectionJob(args: StartEventsDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<StartEventsDetectionJobCommandOutput>;
    startEventsDetectionJob(args: StartEventsDetectionJobCommandInput, cb: (err: any, data?: StartEventsDetectionJobCommandOutput) => void): void;
    startEventsDetectionJob(args: StartEventsDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StartEventsDetectionJobCommandOutput) => void): void;
    /**
     * <p>Starts an asynchronous key phrase detection job for a collection of documents. Use the
     *          operation to track the status of a
     *       job.</p>
     */
    startKeyPhrasesDetectionJob(args: StartKeyPhrasesDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<StartKeyPhrasesDetectionJobCommandOutput>;
    startKeyPhrasesDetectionJob(args: StartKeyPhrasesDetectionJobCommandInput, cb: (err: any, data?: StartKeyPhrasesDetectionJobCommandOutput) => void): void;
    startKeyPhrasesDetectionJob(args: StartKeyPhrasesDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StartKeyPhrasesDetectionJobCommandOutput) => void): void;
    /**
     * <p>Starts an asynchronous PII entity detection job for a collection of documents.</p>
     */
    startPiiEntitiesDetectionJob(args: StartPiiEntitiesDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<StartPiiEntitiesDetectionJobCommandOutput>;
    startPiiEntitiesDetectionJob(args: StartPiiEntitiesDetectionJobCommandInput, cb: (err: any, data?: StartPiiEntitiesDetectionJobCommandOutput) => void): void;
    startPiiEntitiesDetectionJob(args: StartPiiEntitiesDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StartPiiEntitiesDetectionJobCommandOutput) => void): void;
    /**
     * <p>Starts an asynchronous sentiment detection job for a collection of documents. use the
     *          operation to track the status of a
     *       job.</p>
     */
    startSentimentDetectionJob(args: StartSentimentDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<StartSentimentDetectionJobCommandOutput>;
    startSentimentDetectionJob(args: StartSentimentDetectionJobCommandInput, cb: (err: any, data?: StartSentimentDetectionJobCommandOutput) => void): void;
    startSentimentDetectionJob(args: StartSentimentDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StartSentimentDetectionJobCommandOutput) => void): void;
    /**
     * <p>Starts an asynchronous topic detection job. Use the
     *         <code>DescribeTopicDetectionJob</code> operation to track the status of a job.</p>
     */
    startTopicsDetectionJob(args: StartTopicsDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<StartTopicsDetectionJobCommandOutput>;
    startTopicsDetectionJob(args: StartTopicsDetectionJobCommandInput, cb: (err: any, data?: StartTopicsDetectionJobCommandOutput) => void): void;
    startTopicsDetectionJob(args: StartTopicsDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StartTopicsDetectionJobCommandOutput) => void): void;
    /**
     * <p>Stops a dominant language detection job in progress.</p>
     *          <p>If the job state is <code>IN_PROGRESS</code> the job is marked for termination and put
     *       into the <code>STOP_REQUESTED</code> state. If the job completes before it can be stopped, it
     *       is put into the <code>COMPLETED</code> state; otherwise the job is stopped and put into the
     *         <code>STOPPED</code> state.</p>
     *          <p>If the job is in the <code>COMPLETED</code> or <code>FAILED</code> state when you call the
     *         <code>StopDominantLanguageDetectionJob</code> operation, the operation returns a 400
     *       Internal Request Exception. </p>
     *          <p>When a job is stopped, any documents already processed are written to the output
     *       location.</p>
     */
    stopDominantLanguageDetectionJob(args: StopDominantLanguageDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<StopDominantLanguageDetectionJobCommandOutput>;
    stopDominantLanguageDetectionJob(args: StopDominantLanguageDetectionJobCommandInput, cb: (err: any, data?: StopDominantLanguageDetectionJobCommandOutput) => void): void;
    stopDominantLanguageDetectionJob(args: StopDominantLanguageDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StopDominantLanguageDetectionJobCommandOutput) => void): void;
    /**
     * <p>Stops an entities detection job in progress.</p>
     *          <p>If the job state is <code>IN_PROGRESS</code> the job is marked for termination and put
     *       into the <code>STOP_REQUESTED</code> state. If the job completes before it can be stopped, it
     *       is put into the <code>COMPLETED</code> state; otherwise the job is stopped and put into the
     *         <code>STOPPED</code> state.</p>
     *          <p>If the job is in the <code>COMPLETED</code> or <code>FAILED</code> state when you call the
     *         <code>StopDominantLanguageDetectionJob</code> operation, the operation returns a 400
     *       Internal Request Exception. </p>
     *          <p>When a job is stopped, any documents already processed are written to the output
     *       location.</p>
     */
    stopEntitiesDetectionJob(args: StopEntitiesDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<StopEntitiesDetectionJobCommandOutput>;
    stopEntitiesDetectionJob(args: StopEntitiesDetectionJobCommandInput, cb: (err: any, data?: StopEntitiesDetectionJobCommandOutput) => void): void;
    stopEntitiesDetectionJob(args: StopEntitiesDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StopEntitiesDetectionJobCommandOutput) => void): void;
    /**
     * <p>Stops an events detection job in progress.</p>
     */
    stopEventsDetectionJob(args: StopEventsDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<StopEventsDetectionJobCommandOutput>;
    stopEventsDetectionJob(args: StopEventsDetectionJobCommandInput, cb: (err: any, data?: StopEventsDetectionJobCommandOutput) => void): void;
    stopEventsDetectionJob(args: StopEventsDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StopEventsDetectionJobCommandOutput) => void): void;
    /**
     * <p>Stops a key phrases detection job in progress.</p>
     *          <p>If the job state is <code>IN_PROGRESS</code> the job is marked for termination and put
     *       into the <code>STOP_REQUESTED</code> state. If the job completes before it can be stopped, it
     *       is put into the <code>COMPLETED</code> state; otherwise the job is stopped and put into the
     *         <code>STOPPED</code> state.</p>
     *          <p>If the job is in the <code>COMPLETED</code> or <code>FAILED</code> state when you call the
     *         <code>StopDominantLanguageDetectionJob</code> operation, the operation returns a 400
     *       Internal Request Exception. </p>
     *          <p>When a job is stopped, any documents already processed are written to the output
     *       location.</p>
     */
    stopKeyPhrasesDetectionJob(args: StopKeyPhrasesDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<StopKeyPhrasesDetectionJobCommandOutput>;
    stopKeyPhrasesDetectionJob(args: StopKeyPhrasesDetectionJobCommandInput, cb: (err: any, data?: StopKeyPhrasesDetectionJobCommandOutput) => void): void;
    stopKeyPhrasesDetectionJob(args: StopKeyPhrasesDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StopKeyPhrasesDetectionJobCommandOutput) => void): void;
    /**
     * <p>Stops a PII entities detection job in progress.</p>
     */
    stopPiiEntitiesDetectionJob(args: StopPiiEntitiesDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<StopPiiEntitiesDetectionJobCommandOutput>;
    stopPiiEntitiesDetectionJob(args: StopPiiEntitiesDetectionJobCommandInput, cb: (err: any, data?: StopPiiEntitiesDetectionJobCommandOutput) => void): void;
    stopPiiEntitiesDetectionJob(args: StopPiiEntitiesDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StopPiiEntitiesDetectionJobCommandOutput) => void): void;
    /**
     * <p>Stops a sentiment detection job in progress.</p>
     *          <p>If the job state is <code>IN_PROGRESS</code> the job is marked for termination and put
     *       into the <code>STOP_REQUESTED</code> state. If the job completes before it can be stopped, it
     *       is put into the <code>COMPLETED</code> state; otherwise the job is be stopped and put into the
     *         <code>STOPPED</code> state.</p>
     *          <p>If the job is in the <code>COMPLETED</code> or <code>FAILED</code> state when you call the
     *         <code>StopDominantLanguageDetectionJob</code> operation, the operation returns a 400
     *       Internal Request Exception. </p>
     *          <p>When a job is stopped, any documents already processed are written to the output
     *       location.</p>
     */
    stopSentimentDetectionJob(args: StopSentimentDetectionJobCommandInput, options?: __HttpHandlerOptions): Promise<StopSentimentDetectionJobCommandOutput>;
    stopSentimentDetectionJob(args: StopSentimentDetectionJobCommandInput, cb: (err: any, data?: StopSentimentDetectionJobCommandOutput) => void): void;
    stopSentimentDetectionJob(args: StopSentimentDetectionJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StopSentimentDetectionJobCommandOutput) => void): void;
    /**
     * <p>Stops a document classifier training job while in progress.</p>
     *          <p>If the training job state is <code>TRAINING</code>, the job is marked for termination and
     *       put into the <code>STOP_REQUESTED</code> state. If the training job completes before it can be
     *       stopped, it is put into the <code>TRAINED</code>; otherwise the training job is stopped and
     *       put into the <code>STOPPED</code> state and the service sends back an HTTP 200 response with
     *       an empty HTTP body. </p>
     */
    stopTrainingDocumentClassifier(args: StopTrainingDocumentClassifierCommandInput, options?: __HttpHandlerOptions): Promise<StopTrainingDocumentClassifierCommandOutput>;
    stopTrainingDocumentClassifier(args: StopTrainingDocumentClassifierCommandInput, cb: (err: any, data?: StopTrainingDocumentClassifierCommandOutput) => void): void;
    stopTrainingDocumentClassifier(args: StopTrainingDocumentClassifierCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StopTrainingDocumentClassifierCommandOutput) => void): void;
    /**
     * <p>Stops an entity recognizer training job while in progress.</p>
     *          <p>If the training job state is <code>TRAINING</code>, the job is marked for termination and
     *       put into the <code>STOP_REQUESTED</code> state. If the training job completes before it can be
     *       stopped, it is put into the <code>TRAINED</code>; otherwise the training job is stopped and
     *       putted into the <code>STOPPED</code> state and the service sends back an HTTP 200 response
     *       with an empty HTTP body.</p>
     */
    stopTrainingEntityRecognizer(args: StopTrainingEntityRecognizerCommandInput, options?: __HttpHandlerOptions): Promise<StopTrainingEntityRecognizerCommandOutput>;
    stopTrainingEntityRecognizer(args: StopTrainingEntityRecognizerCommandInput, cb: (err: any, data?: StopTrainingEntityRecognizerCommandOutput) => void): void;
    stopTrainingEntityRecognizer(args: StopTrainingEntityRecognizerCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StopTrainingEntityRecognizerCommandOutput) => void): void;
    /**
     * <p>Associates a specific tag with an Amazon Comprehend resource. A tag is a key-value pair
     *       that adds as a metadata to a resource used by Amazon Comprehend. For example, a tag with
     *       "Sales" as the key might be added to a resource to indicate its use by the sales department.
     *     </p>
     */
    tagResource(args: TagResourceCommandInput, options?: __HttpHandlerOptions): Promise<TagResourceCommandOutput>;
    tagResource(args: TagResourceCommandInput, cb: (err: any, data?: TagResourceCommandOutput) => void): void;
    tagResource(args: TagResourceCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: TagResourceCommandOutput) => void): void;
    /**
     * <p>Removes a specific tag associated with an Amazon Comprehend resource. </p>
     */
    untagResource(args: UntagResourceCommandInput, options?: __HttpHandlerOptions): Promise<UntagResourceCommandOutput>;
    untagResource(args: UntagResourceCommandInput, cb: (err: any, data?: UntagResourceCommandOutput) => void): void;
    untagResource(args: UntagResourceCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UntagResourceCommandOutput) => void): void;
    /**
     * <p>Updates information about the specified endpoint.</p>
     */
    updateEndpoint(args: UpdateEndpointCommandInput, options?: __HttpHandlerOptions): Promise<UpdateEndpointCommandOutput>;
    updateEndpoint(args: UpdateEndpointCommandInput, cb: (err: any, data?: UpdateEndpointCommandOutput) => void): void;
    updateEndpoint(args: UpdateEndpointCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateEndpointCommandOutput) => void): void;
}
