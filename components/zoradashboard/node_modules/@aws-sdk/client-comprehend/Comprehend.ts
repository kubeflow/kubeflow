import { ComprehendClient } from "./ComprehendClient";
import {
  BatchDetectDominantLanguageCommand,
  BatchDetectDominantLanguageCommandInput,
  BatchDetectDominantLanguageCommandOutput,
} from "./commands/BatchDetectDominantLanguageCommand";
import {
  BatchDetectEntitiesCommand,
  BatchDetectEntitiesCommandInput,
  BatchDetectEntitiesCommandOutput,
} from "./commands/BatchDetectEntitiesCommand";
import {
  BatchDetectKeyPhrasesCommand,
  BatchDetectKeyPhrasesCommandInput,
  BatchDetectKeyPhrasesCommandOutput,
} from "./commands/BatchDetectKeyPhrasesCommand";
import {
  BatchDetectSentimentCommand,
  BatchDetectSentimentCommandInput,
  BatchDetectSentimentCommandOutput,
} from "./commands/BatchDetectSentimentCommand";
import {
  BatchDetectSyntaxCommand,
  BatchDetectSyntaxCommandInput,
  BatchDetectSyntaxCommandOutput,
} from "./commands/BatchDetectSyntaxCommand";
import {
  ClassifyDocumentCommand,
  ClassifyDocumentCommandInput,
  ClassifyDocumentCommandOutput,
} from "./commands/ClassifyDocumentCommand";
import {
  CreateDocumentClassifierCommand,
  CreateDocumentClassifierCommandInput,
  CreateDocumentClassifierCommandOutput,
} from "./commands/CreateDocumentClassifierCommand";
import {
  CreateEndpointCommand,
  CreateEndpointCommandInput,
  CreateEndpointCommandOutput,
} from "./commands/CreateEndpointCommand";
import {
  CreateEntityRecognizerCommand,
  CreateEntityRecognizerCommandInput,
  CreateEntityRecognizerCommandOutput,
} from "./commands/CreateEntityRecognizerCommand";
import {
  DeleteDocumentClassifierCommand,
  DeleteDocumentClassifierCommandInput,
  DeleteDocumentClassifierCommandOutput,
} from "./commands/DeleteDocumentClassifierCommand";
import {
  DeleteEndpointCommand,
  DeleteEndpointCommandInput,
  DeleteEndpointCommandOutput,
} from "./commands/DeleteEndpointCommand";
import {
  DeleteEntityRecognizerCommand,
  DeleteEntityRecognizerCommandInput,
  DeleteEntityRecognizerCommandOutput,
} from "./commands/DeleteEntityRecognizerCommand";
import {
  DescribeDocumentClassificationJobCommand,
  DescribeDocumentClassificationJobCommandInput,
  DescribeDocumentClassificationJobCommandOutput,
} from "./commands/DescribeDocumentClassificationJobCommand";
import {
  DescribeDocumentClassifierCommand,
  DescribeDocumentClassifierCommandInput,
  DescribeDocumentClassifierCommandOutput,
} from "./commands/DescribeDocumentClassifierCommand";
import {
  DescribeDominantLanguageDetectionJobCommand,
  DescribeDominantLanguageDetectionJobCommandInput,
  DescribeDominantLanguageDetectionJobCommandOutput,
} from "./commands/DescribeDominantLanguageDetectionJobCommand";
import {
  DescribeEndpointCommand,
  DescribeEndpointCommandInput,
  DescribeEndpointCommandOutput,
} from "./commands/DescribeEndpointCommand";
import {
  DescribeEntitiesDetectionJobCommand,
  DescribeEntitiesDetectionJobCommandInput,
  DescribeEntitiesDetectionJobCommandOutput,
} from "./commands/DescribeEntitiesDetectionJobCommand";
import {
  DescribeEntityRecognizerCommand,
  DescribeEntityRecognizerCommandInput,
  DescribeEntityRecognizerCommandOutput,
} from "./commands/DescribeEntityRecognizerCommand";
import {
  DescribeEventsDetectionJobCommand,
  DescribeEventsDetectionJobCommandInput,
  DescribeEventsDetectionJobCommandOutput,
} from "./commands/DescribeEventsDetectionJobCommand";
import {
  DescribeKeyPhrasesDetectionJobCommand,
  DescribeKeyPhrasesDetectionJobCommandInput,
  DescribeKeyPhrasesDetectionJobCommandOutput,
} from "./commands/DescribeKeyPhrasesDetectionJobCommand";
import {
  DescribePiiEntitiesDetectionJobCommand,
  DescribePiiEntitiesDetectionJobCommandInput,
  DescribePiiEntitiesDetectionJobCommandOutput,
} from "./commands/DescribePiiEntitiesDetectionJobCommand";
import {
  DescribeSentimentDetectionJobCommand,
  DescribeSentimentDetectionJobCommandInput,
  DescribeSentimentDetectionJobCommandOutput,
} from "./commands/DescribeSentimentDetectionJobCommand";
import {
  DescribeTopicsDetectionJobCommand,
  DescribeTopicsDetectionJobCommandInput,
  DescribeTopicsDetectionJobCommandOutput,
} from "./commands/DescribeTopicsDetectionJobCommand";
import {
  DetectDominantLanguageCommand,
  DetectDominantLanguageCommandInput,
  DetectDominantLanguageCommandOutput,
} from "./commands/DetectDominantLanguageCommand";
import {
  DetectEntitiesCommand,
  DetectEntitiesCommandInput,
  DetectEntitiesCommandOutput,
} from "./commands/DetectEntitiesCommand";
import {
  DetectKeyPhrasesCommand,
  DetectKeyPhrasesCommandInput,
  DetectKeyPhrasesCommandOutput,
} from "./commands/DetectKeyPhrasesCommand";
import {
  DetectPiiEntitiesCommand,
  DetectPiiEntitiesCommandInput,
  DetectPiiEntitiesCommandOutput,
} from "./commands/DetectPiiEntitiesCommand";
import {
  DetectSentimentCommand,
  DetectSentimentCommandInput,
  DetectSentimentCommandOutput,
} from "./commands/DetectSentimentCommand";
import {
  DetectSyntaxCommand,
  DetectSyntaxCommandInput,
  DetectSyntaxCommandOutput,
} from "./commands/DetectSyntaxCommand";
import {
  ListDocumentClassificationJobsCommand,
  ListDocumentClassificationJobsCommandInput,
  ListDocumentClassificationJobsCommandOutput,
} from "./commands/ListDocumentClassificationJobsCommand";
import {
  ListDocumentClassifiersCommand,
  ListDocumentClassifiersCommandInput,
  ListDocumentClassifiersCommandOutput,
} from "./commands/ListDocumentClassifiersCommand";
import {
  ListDominantLanguageDetectionJobsCommand,
  ListDominantLanguageDetectionJobsCommandInput,
  ListDominantLanguageDetectionJobsCommandOutput,
} from "./commands/ListDominantLanguageDetectionJobsCommand";
import {
  ListEndpointsCommand,
  ListEndpointsCommandInput,
  ListEndpointsCommandOutput,
} from "./commands/ListEndpointsCommand";
import {
  ListEntitiesDetectionJobsCommand,
  ListEntitiesDetectionJobsCommandInput,
  ListEntitiesDetectionJobsCommandOutput,
} from "./commands/ListEntitiesDetectionJobsCommand";
import {
  ListEntityRecognizersCommand,
  ListEntityRecognizersCommandInput,
  ListEntityRecognizersCommandOutput,
} from "./commands/ListEntityRecognizersCommand";
import {
  ListEventsDetectionJobsCommand,
  ListEventsDetectionJobsCommandInput,
  ListEventsDetectionJobsCommandOutput,
} from "./commands/ListEventsDetectionJobsCommand";
import {
  ListKeyPhrasesDetectionJobsCommand,
  ListKeyPhrasesDetectionJobsCommandInput,
  ListKeyPhrasesDetectionJobsCommandOutput,
} from "./commands/ListKeyPhrasesDetectionJobsCommand";
import {
  ListPiiEntitiesDetectionJobsCommand,
  ListPiiEntitiesDetectionJobsCommandInput,
  ListPiiEntitiesDetectionJobsCommandOutput,
} from "./commands/ListPiiEntitiesDetectionJobsCommand";
import {
  ListSentimentDetectionJobsCommand,
  ListSentimentDetectionJobsCommandInput,
  ListSentimentDetectionJobsCommandOutput,
} from "./commands/ListSentimentDetectionJobsCommand";
import {
  ListTagsForResourceCommand,
  ListTagsForResourceCommandInput,
  ListTagsForResourceCommandOutput,
} from "./commands/ListTagsForResourceCommand";
import {
  ListTopicsDetectionJobsCommand,
  ListTopicsDetectionJobsCommandInput,
  ListTopicsDetectionJobsCommandOutput,
} from "./commands/ListTopicsDetectionJobsCommand";
import {
  StartDocumentClassificationJobCommand,
  StartDocumentClassificationJobCommandInput,
  StartDocumentClassificationJobCommandOutput,
} from "./commands/StartDocumentClassificationJobCommand";
import {
  StartDominantLanguageDetectionJobCommand,
  StartDominantLanguageDetectionJobCommandInput,
  StartDominantLanguageDetectionJobCommandOutput,
} from "./commands/StartDominantLanguageDetectionJobCommand";
import {
  StartEntitiesDetectionJobCommand,
  StartEntitiesDetectionJobCommandInput,
  StartEntitiesDetectionJobCommandOutput,
} from "./commands/StartEntitiesDetectionJobCommand";
import {
  StartEventsDetectionJobCommand,
  StartEventsDetectionJobCommandInput,
  StartEventsDetectionJobCommandOutput,
} from "./commands/StartEventsDetectionJobCommand";
import {
  StartKeyPhrasesDetectionJobCommand,
  StartKeyPhrasesDetectionJobCommandInput,
  StartKeyPhrasesDetectionJobCommandOutput,
} from "./commands/StartKeyPhrasesDetectionJobCommand";
import {
  StartPiiEntitiesDetectionJobCommand,
  StartPiiEntitiesDetectionJobCommandInput,
  StartPiiEntitiesDetectionJobCommandOutput,
} from "./commands/StartPiiEntitiesDetectionJobCommand";
import {
  StartSentimentDetectionJobCommand,
  StartSentimentDetectionJobCommandInput,
  StartSentimentDetectionJobCommandOutput,
} from "./commands/StartSentimentDetectionJobCommand";
import {
  StartTopicsDetectionJobCommand,
  StartTopicsDetectionJobCommandInput,
  StartTopicsDetectionJobCommandOutput,
} from "./commands/StartTopicsDetectionJobCommand";
import {
  StopDominantLanguageDetectionJobCommand,
  StopDominantLanguageDetectionJobCommandInput,
  StopDominantLanguageDetectionJobCommandOutput,
} from "./commands/StopDominantLanguageDetectionJobCommand";
import {
  StopEntitiesDetectionJobCommand,
  StopEntitiesDetectionJobCommandInput,
  StopEntitiesDetectionJobCommandOutput,
} from "./commands/StopEntitiesDetectionJobCommand";
import {
  StopEventsDetectionJobCommand,
  StopEventsDetectionJobCommandInput,
  StopEventsDetectionJobCommandOutput,
} from "./commands/StopEventsDetectionJobCommand";
import {
  StopKeyPhrasesDetectionJobCommand,
  StopKeyPhrasesDetectionJobCommandInput,
  StopKeyPhrasesDetectionJobCommandOutput,
} from "./commands/StopKeyPhrasesDetectionJobCommand";
import {
  StopPiiEntitiesDetectionJobCommand,
  StopPiiEntitiesDetectionJobCommandInput,
  StopPiiEntitiesDetectionJobCommandOutput,
} from "./commands/StopPiiEntitiesDetectionJobCommand";
import {
  StopSentimentDetectionJobCommand,
  StopSentimentDetectionJobCommandInput,
  StopSentimentDetectionJobCommandOutput,
} from "./commands/StopSentimentDetectionJobCommand";
import {
  StopTrainingDocumentClassifierCommand,
  StopTrainingDocumentClassifierCommandInput,
  StopTrainingDocumentClassifierCommandOutput,
} from "./commands/StopTrainingDocumentClassifierCommand";
import {
  StopTrainingEntityRecognizerCommand,
  StopTrainingEntityRecognizerCommandInput,
  StopTrainingEntityRecognizerCommandOutput,
} from "./commands/StopTrainingEntityRecognizerCommand";
import { TagResourceCommand, TagResourceCommandInput, TagResourceCommandOutput } from "./commands/TagResourceCommand";
import {
  UntagResourceCommand,
  UntagResourceCommandInput,
  UntagResourceCommandOutput,
} from "./commands/UntagResourceCommand";
import {
  UpdateEndpointCommand,
  UpdateEndpointCommandInput,
  UpdateEndpointCommandOutput,
} from "./commands/UpdateEndpointCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";

/**
 * <p>Amazon Comprehend is an AWS service for gaining insight into the content of documents.
 *       Use these actions to determine the topics contained in your documents, the topics they
 *       discuss, the predominant sentiment expressed in them, the predominant language used, and
 *       more.</p>
 */
export class Comprehend extends ComprehendClient {
  /**
   * <p>Determines the dominant language of the input text for a batch of documents. For a list
   *       of languages that Amazon Comprehend can detect, see <a href="https://docs.aws.amazon.com/comprehend/latest/dg/how-languages.html">Amazon Comprehend Supported Languages</a>.
   *     </p>
   */
  public batchDetectDominantLanguage(
    args: BatchDetectDominantLanguageCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<BatchDetectDominantLanguageCommandOutput>;
  public batchDetectDominantLanguage(
    args: BatchDetectDominantLanguageCommandInput,
    cb: (err: any, data?: BatchDetectDominantLanguageCommandOutput) => void
  ): void;
  public batchDetectDominantLanguage(
    args: BatchDetectDominantLanguageCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: BatchDetectDominantLanguageCommandOutput) => void
  ): void;
  public batchDetectDominantLanguage(
    args: BatchDetectDominantLanguageCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: BatchDetectDominantLanguageCommandOutput) => void),
    cb?: (err: any, data?: BatchDetectDominantLanguageCommandOutput) => void
  ): Promise<BatchDetectDominantLanguageCommandOutput> | void {
    const command = new BatchDetectDominantLanguageCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Inspects the text of a batch of documents for named entities and returns information
   *       about them. For more information about named entities, see <a>how-entities</a>
   *          </p>
   */
  public batchDetectEntities(
    args: BatchDetectEntitiesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<BatchDetectEntitiesCommandOutput>;
  public batchDetectEntities(
    args: BatchDetectEntitiesCommandInput,
    cb: (err: any, data?: BatchDetectEntitiesCommandOutput) => void
  ): void;
  public batchDetectEntities(
    args: BatchDetectEntitiesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: BatchDetectEntitiesCommandOutput) => void
  ): void;
  public batchDetectEntities(
    args: BatchDetectEntitiesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: BatchDetectEntitiesCommandOutput) => void),
    cb?: (err: any, data?: BatchDetectEntitiesCommandOutput) => void
  ): Promise<BatchDetectEntitiesCommandOutput> | void {
    const command = new BatchDetectEntitiesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Detects the key noun phrases found in a batch of documents.</p>
   */
  public batchDetectKeyPhrases(
    args: BatchDetectKeyPhrasesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<BatchDetectKeyPhrasesCommandOutput>;
  public batchDetectKeyPhrases(
    args: BatchDetectKeyPhrasesCommandInput,
    cb: (err: any, data?: BatchDetectKeyPhrasesCommandOutput) => void
  ): void;
  public batchDetectKeyPhrases(
    args: BatchDetectKeyPhrasesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: BatchDetectKeyPhrasesCommandOutput) => void
  ): void;
  public batchDetectKeyPhrases(
    args: BatchDetectKeyPhrasesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: BatchDetectKeyPhrasesCommandOutput) => void),
    cb?: (err: any, data?: BatchDetectKeyPhrasesCommandOutput) => void
  ): Promise<BatchDetectKeyPhrasesCommandOutput> | void {
    const command = new BatchDetectKeyPhrasesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Inspects a batch of documents and returns an inference of the prevailing sentiment,
   *         <code>POSITIVE</code>, <code>NEUTRAL</code>, <code>MIXED</code>, or <code>NEGATIVE</code>,
   *       in each one.</p>
   */
  public batchDetectSentiment(
    args: BatchDetectSentimentCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<BatchDetectSentimentCommandOutput>;
  public batchDetectSentiment(
    args: BatchDetectSentimentCommandInput,
    cb: (err: any, data?: BatchDetectSentimentCommandOutput) => void
  ): void;
  public batchDetectSentiment(
    args: BatchDetectSentimentCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: BatchDetectSentimentCommandOutput) => void
  ): void;
  public batchDetectSentiment(
    args: BatchDetectSentimentCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: BatchDetectSentimentCommandOutput) => void),
    cb?: (err: any, data?: BatchDetectSentimentCommandOutput) => void
  ): Promise<BatchDetectSentimentCommandOutput> | void {
    const command = new BatchDetectSentimentCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Inspects the text of a batch of documents for the syntax and part of speech of the words
   *       in the document and returns information about them. For more information, see <a>how-syntax</a>.</p>
   */
  public batchDetectSyntax(
    args: BatchDetectSyntaxCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<BatchDetectSyntaxCommandOutput>;
  public batchDetectSyntax(
    args: BatchDetectSyntaxCommandInput,
    cb: (err: any, data?: BatchDetectSyntaxCommandOutput) => void
  ): void;
  public batchDetectSyntax(
    args: BatchDetectSyntaxCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: BatchDetectSyntaxCommandOutput) => void
  ): void;
  public batchDetectSyntax(
    args: BatchDetectSyntaxCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: BatchDetectSyntaxCommandOutput) => void),
    cb?: (err: any, data?: BatchDetectSyntaxCommandOutput) => void
  ): Promise<BatchDetectSyntaxCommandOutput> | void {
    const command = new BatchDetectSyntaxCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates a new document classification request to analyze a single document in real-time,
   *       using a previously created and trained custom model and an endpoint.</p>
   */
  public classifyDocument(
    args: ClassifyDocumentCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ClassifyDocumentCommandOutput>;
  public classifyDocument(
    args: ClassifyDocumentCommandInput,
    cb: (err: any, data?: ClassifyDocumentCommandOutput) => void
  ): void;
  public classifyDocument(
    args: ClassifyDocumentCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ClassifyDocumentCommandOutput) => void
  ): void;
  public classifyDocument(
    args: ClassifyDocumentCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ClassifyDocumentCommandOutput) => void),
    cb?: (err: any, data?: ClassifyDocumentCommandOutput) => void
  ): Promise<ClassifyDocumentCommandOutput> | void {
    const command = new ClassifyDocumentCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates a new document classifier that you can use to categorize documents. To create a
   *       classifier, you provide a set of training documents that labeled with the categories that you
   *       want to use. After the classifier is trained you can use it to categorize a set of labeled
   *       documents into the categories. For more information, see <a>how-document-classification</a>.</p>
   */
  public createDocumentClassifier(
    args: CreateDocumentClassifierCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateDocumentClassifierCommandOutput>;
  public createDocumentClassifier(
    args: CreateDocumentClassifierCommandInput,
    cb: (err: any, data?: CreateDocumentClassifierCommandOutput) => void
  ): void;
  public createDocumentClassifier(
    args: CreateDocumentClassifierCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateDocumentClassifierCommandOutput) => void
  ): void;
  public createDocumentClassifier(
    args: CreateDocumentClassifierCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateDocumentClassifierCommandOutput) => void),
    cb?: (err: any, data?: CreateDocumentClassifierCommandOutput) => void
  ): Promise<CreateDocumentClassifierCommandOutput> | void {
    const command = new CreateDocumentClassifierCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates a model-specific endpoint for synchronous inference for a previously trained
   *       custom model
   *       </p>
   */
  public createEndpoint(
    args: CreateEndpointCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateEndpointCommandOutput>;
  public createEndpoint(
    args: CreateEndpointCommandInput,
    cb: (err: any, data?: CreateEndpointCommandOutput) => void
  ): void;
  public createEndpoint(
    args: CreateEndpointCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateEndpointCommandOutput) => void
  ): void;
  public createEndpoint(
    args: CreateEndpointCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateEndpointCommandOutput) => void),
    cb?: (err: any, data?: CreateEndpointCommandOutput) => void
  ): Promise<CreateEndpointCommandOutput> | void {
    const command = new CreateEndpointCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates an entity recognizer using submitted files. After your
   *         <code>CreateEntityRecognizer</code> request is submitted, you can check job status using the
   *          API. </p>
   */
  public createEntityRecognizer(
    args: CreateEntityRecognizerCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateEntityRecognizerCommandOutput>;
  public createEntityRecognizer(
    args: CreateEntityRecognizerCommandInput,
    cb: (err: any, data?: CreateEntityRecognizerCommandOutput) => void
  ): void;
  public createEntityRecognizer(
    args: CreateEntityRecognizerCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateEntityRecognizerCommandOutput) => void
  ): void;
  public createEntityRecognizer(
    args: CreateEntityRecognizerCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateEntityRecognizerCommandOutput) => void),
    cb?: (err: any, data?: CreateEntityRecognizerCommandOutput) => void
  ): Promise<CreateEntityRecognizerCommandOutput> | void {
    const command = new CreateEntityRecognizerCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes a previously created document classifier</p>
   *          <p>Only those classifiers that are in terminated states (IN_ERROR, TRAINED) will be deleted.
   *       If an active inference job is using the model, a <code>ResourceInUseException</code> will be
   *       returned.</p>
   *          <p>This is an asynchronous action that puts the classifier into a DELETING state, and it is
   *       then removed by a background job. Once removed, the classifier disappears from your account
   *       and is no longer available for use. </p>
   */
  public deleteDocumentClassifier(
    args: DeleteDocumentClassifierCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteDocumentClassifierCommandOutput>;
  public deleteDocumentClassifier(
    args: DeleteDocumentClassifierCommandInput,
    cb: (err: any, data?: DeleteDocumentClassifierCommandOutput) => void
  ): void;
  public deleteDocumentClassifier(
    args: DeleteDocumentClassifierCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteDocumentClassifierCommandOutput) => void
  ): void;
  public deleteDocumentClassifier(
    args: DeleteDocumentClassifierCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteDocumentClassifierCommandOutput) => void),
    cb?: (err: any, data?: DeleteDocumentClassifierCommandOutput) => void
  ): Promise<DeleteDocumentClassifierCommandOutput> | void {
    const command = new DeleteDocumentClassifierCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes a model-specific endpoint for a previously-trained custom model. All endpoints
   *       must be deleted in order for the model to be deleted.</p>
   */
  public deleteEndpoint(
    args: DeleteEndpointCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteEndpointCommandOutput>;
  public deleteEndpoint(
    args: DeleteEndpointCommandInput,
    cb: (err: any, data?: DeleteEndpointCommandOutput) => void
  ): void;
  public deleteEndpoint(
    args: DeleteEndpointCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteEndpointCommandOutput) => void
  ): void;
  public deleteEndpoint(
    args: DeleteEndpointCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteEndpointCommandOutput) => void),
    cb?: (err: any, data?: DeleteEndpointCommandOutput) => void
  ): Promise<DeleteEndpointCommandOutput> | void {
    const command = new DeleteEndpointCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes an entity recognizer.</p>
   *          <p>Only those recognizers that are in terminated states (IN_ERROR, TRAINED) will be deleted.
   *       If an active inference job is using the model, a <code>ResourceInUseException</code> will be
   *       returned.</p>
   *          <p>This is an asynchronous action that puts the recognizer into a DELETING state, and it is
   *       then removed by a background job. Once removed, the recognizer disappears from your account
   *       and is no longer available for use. </p>
   */
  public deleteEntityRecognizer(
    args: DeleteEntityRecognizerCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteEntityRecognizerCommandOutput>;
  public deleteEntityRecognizer(
    args: DeleteEntityRecognizerCommandInput,
    cb: (err: any, data?: DeleteEntityRecognizerCommandOutput) => void
  ): void;
  public deleteEntityRecognizer(
    args: DeleteEntityRecognizerCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteEntityRecognizerCommandOutput) => void
  ): void;
  public deleteEntityRecognizer(
    args: DeleteEntityRecognizerCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteEntityRecognizerCommandOutput) => void),
    cb?: (err: any, data?: DeleteEntityRecognizerCommandOutput) => void
  ): Promise<DeleteEntityRecognizerCommandOutput> | void {
    const command = new DeleteEntityRecognizerCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets the properties associated with a document classification job. Use this operation to
   *       get the status of a classification job.</p>
   */
  public describeDocumentClassificationJob(
    args: DescribeDocumentClassificationJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeDocumentClassificationJobCommandOutput>;
  public describeDocumentClassificationJob(
    args: DescribeDocumentClassificationJobCommandInput,
    cb: (err: any, data?: DescribeDocumentClassificationJobCommandOutput) => void
  ): void;
  public describeDocumentClassificationJob(
    args: DescribeDocumentClassificationJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeDocumentClassificationJobCommandOutput) => void
  ): void;
  public describeDocumentClassificationJob(
    args: DescribeDocumentClassificationJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeDocumentClassificationJobCommandOutput) => void),
    cb?: (err: any, data?: DescribeDocumentClassificationJobCommandOutput) => void
  ): Promise<DescribeDocumentClassificationJobCommandOutput> | void {
    const command = new DescribeDocumentClassificationJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets the properties associated with a document classifier.</p>
   */
  public describeDocumentClassifier(
    args: DescribeDocumentClassifierCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeDocumentClassifierCommandOutput>;
  public describeDocumentClassifier(
    args: DescribeDocumentClassifierCommandInput,
    cb: (err: any, data?: DescribeDocumentClassifierCommandOutput) => void
  ): void;
  public describeDocumentClassifier(
    args: DescribeDocumentClassifierCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeDocumentClassifierCommandOutput) => void
  ): void;
  public describeDocumentClassifier(
    args: DescribeDocumentClassifierCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeDocumentClassifierCommandOutput) => void),
    cb?: (err: any, data?: DescribeDocumentClassifierCommandOutput) => void
  ): Promise<DescribeDocumentClassifierCommandOutput> | void {
    const command = new DescribeDocumentClassifierCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets the properties associated with a dominant language detection job. Use this operation
   *       to get the status of a detection job.</p>
   */
  public describeDominantLanguageDetectionJob(
    args: DescribeDominantLanguageDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeDominantLanguageDetectionJobCommandOutput>;
  public describeDominantLanguageDetectionJob(
    args: DescribeDominantLanguageDetectionJobCommandInput,
    cb: (err: any, data?: DescribeDominantLanguageDetectionJobCommandOutput) => void
  ): void;
  public describeDominantLanguageDetectionJob(
    args: DescribeDominantLanguageDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeDominantLanguageDetectionJobCommandOutput) => void
  ): void;
  public describeDominantLanguageDetectionJob(
    args: DescribeDominantLanguageDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeDominantLanguageDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: DescribeDominantLanguageDetectionJobCommandOutput) => void
  ): Promise<DescribeDominantLanguageDetectionJobCommandOutput> | void {
    const command = new DescribeDominantLanguageDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets the properties associated with a specific endpoint. Use this operation to get the
   *       status of an endpoint.</p>
   */
  public describeEndpoint(
    args: DescribeEndpointCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeEndpointCommandOutput>;
  public describeEndpoint(
    args: DescribeEndpointCommandInput,
    cb: (err: any, data?: DescribeEndpointCommandOutput) => void
  ): void;
  public describeEndpoint(
    args: DescribeEndpointCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeEndpointCommandOutput) => void
  ): void;
  public describeEndpoint(
    args: DescribeEndpointCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeEndpointCommandOutput) => void),
    cb?: (err: any, data?: DescribeEndpointCommandOutput) => void
  ): Promise<DescribeEndpointCommandOutput> | void {
    const command = new DescribeEndpointCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets the properties associated with an entities detection job. Use this operation to get
   *       the status of a detection job.</p>
   */
  public describeEntitiesDetectionJob(
    args: DescribeEntitiesDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeEntitiesDetectionJobCommandOutput>;
  public describeEntitiesDetectionJob(
    args: DescribeEntitiesDetectionJobCommandInput,
    cb: (err: any, data?: DescribeEntitiesDetectionJobCommandOutput) => void
  ): void;
  public describeEntitiesDetectionJob(
    args: DescribeEntitiesDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeEntitiesDetectionJobCommandOutput) => void
  ): void;
  public describeEntitiesDetectionJob(
    args: DescribeEntitiesDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeEntitiesDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: DescribeEntitiesDetectionJobCommandOutput) => void
  ): Promise<DescribeEntitiesDetectionJobCommandOutput> | void {
    const command = new DescribeEntitiesDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Provides details about an entity recognizer including status, S3 buckets containing
   *       training data, recognizer metadata, metrics, and so on.</p>
   */
  public describeEntityRecognizer(
    args: DescribeEntityRecognizerCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeEntityRecognizerCommandOutput>;
  public describeEntityRecognizer(
    args: DescribeEntityRecognizerCommandInput,
    cb: (err: any, data?: DescribeEntityRecognizerCommandOutput) => void
  ): void;
  public describeEntityRecognizer(
    args: DescribeEntityRecognizerCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeEntityRecognizerCommandOutput) => void
  ): void;
  public describeEntityRecognizer(
    args: DescribeEntityRecognizerCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeEntityRecognizerCommandOutput) => void),
    cb?: (err: any, data?: DescribeEntityRecognizerCommandOutput) => void
  ): Promise<DescribeEntityRecognizerCommandOutput> | void {
    const command = new DescribeEntityRecognizerCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets the status and details of an events detection job.</p>
   */
  public describeEventsDetectionJob(
    args: DescribeEventsDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeEventsDetectionJobCommandOutput>;
  public describeEventsDetectionJob(
    args: DescribeEventsDetectionJobCommandInput,
    cb: (err: any, data?: DescribeEventsDetectionJobCommandOutput) => void
  ): void;
  public describeEventsDetectionJob(
    args: DescribeEventsDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeEventsDetectionJobCommandOutput) => void
  ): void;
  public describeEventsDetectionJob(
    args: DescribeEventsDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeEventsDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: DescribeEventsDetectionJobCommandOutput) => void
  ): Promise<DescribeEventsDetectionJobCommandOutput> | void {
    const command = new DescribeEventsDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets the properties associated with a key phrases detection job. Use this operation to get
   *       the status of a detection job.</p>
   */
  public describeKeyPhrasesDetectionJob(
    args: DescribeKeyPhrasesDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeKeyPhrasesDetectionJobCommandOutput>;
  public describeKeyPhrasesDetectionJob(
    args: DescribeKeyPhrasesDetectionJobCommandInput,
    cb: (err: any, data?: DescribeKeyPhrasesDetectionJobCommandOutput) => void
  ): void;
  public describeKeyPhrasesDetectionJob(
    args: DescribeKeyPhrasesDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeKeyPhrasesDetectionJobCommandOutput) => void
  ): void;
  public describeKeyPhrasesDetectionJob(
    args: DescribeKeyPhrasesDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeKeyPhrasesDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: DescribeKeyPhrasesDetectionJobCommandOutput) => void
  ): Promise<DescribeKeyPhrasesDetectionJobCommandOutput> | void {
    const command = new DescribeKeyPhrasesDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets the properties associated with a PII entities detection job. For example, you can use
   *       this operation to get the job status.</p>
   */
  public describePiiEntitiesDetectionJob(
    args: DescribePiiEntitiesDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribePiiEntitiesDetectionJobCommandOutput>;
  public describePiiEntitiesDetectionJob(
    args: DescribePiiEntitiesDetectionJobCommandInput,
    cb: (err: any, data?: DescribePiiEntitiesDetectionJobCommandOutput) => void
  ): void;
  public describePiiEntitiesDetectionJob(
    args: DescribePiiEntitiesDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribePiiEntitiesDetectionJobCommandOutput) => void
  ): void;
  public describePiiEntitiesDetectionJob(
    args: DescribePiiEntitiesDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribePiiEntitiesDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: DescribePiiEntitiesDetectionJobCommandOutput) => void
  ): Promise<DescribePiiEntitiesDetectionJobCommandOutput> | void {
    const command = new DescribePiiEntitiesDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets the properties associated with a sentiment detection job. Use this operation to get
   *       the status of a detection job.</p>
   */
  public describeSentimentDetectionJob(
    args: DescribeSentimentDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeSentimentDetectionJobCommandOutput>;
  public describeSentimentDetectionJob(
    args: DescribeSentimentDetectionJobCommandInput,
    cb: (err: any, data?: DescribeSentimentDetectionJobCommandOutput) => void
  ): void;
  public describeSentimentDetectionJob(
    args: DescribeSentimentDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeSentimentDetectionJobCommandOutput) => void
  ): void;
  public describeSentimentDetectionJob(
    args: DescribeSentimentDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeSentimentDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: DescribeSentimentDetectionJobCommandOutput) => void
  ): Promise<DescribeSentimentDetectionJobCommandOutput> | void {
    const command = new DescribeSentimentDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets the properties associated with a topic detection job. Use this operation to get
   *       the status of a detection job.</p>
   */
  public describeTopicsDetectionJob(
    args: DescribeTopicsDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeTopicsDetectionJobCommandOutput>;
  public describeTopicsDetectionJob(
    args: DescribeTopicsDetectionJobCommandInput,
    cb: (err: any, data?: DescribeTopicsDetectionJobCommandOutput) => void
  ): void;
  public describeTopicsDetectionJob(
    args: DescribeTopicsDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeTopicsDetectionJobCommandOutput) => void
  ): void;
  public describeTopicsDetectionJob(
    args: DescribeTopicsDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeTopicsDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: DescribeTopicsDetectionJobCommandOutput) => void
  ): Promise<DescribeTopicsDetectionJobCommandOutput> | void {
    const command = new DescribeTopicsDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Determines the dominant language of the input text. For a list of languages that Amazon
   *       Comprehend can detect, see <a href="https://docs.aws.amazon.com/comprehend/latest/dg/how-languages.html">Amazon Comprehend Supported Languages</a>. </p>
   */
  public detectDominantLanguage(
    args: DetectDominantLanguageCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DetectDominantLanguageCommandOutput>;
  public detectDominantLanguage(
    args: DetectDominantLanguageCommandInput,
    cb: (err: any, data?: DetectDominantLanguageCommandOutput) => void
  ): void;
  public detectDominantLanguage(
    args: DetectDominantLanguageCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DetectDominantLanguageCommandOutput) => void
  ): void;
  public detectDominantLanguage(
    args: DetectDominantLanguageCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DetectDominantLanguageCommandOutput) => void),
    cb?: (err: any, data?: DetectDominantLanguageCommandOutput) => void
  ): Promise<DetectDominantLanguageCommandOutput> | void {
    const command = new DetectDominantLanguageCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Inspects text for named entities, and returns information about them. For more
   *       information, about named entities, see <a>how-entities</a>. </p>
   */
  public detectEntities(
    args: DetectEntitiesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DetectEntitiesCommandOutput>;
  public detectEntities(
    args: DetectEntitiesCommandInput,
    cb: (err: any, data?: DetectEntitiesCommandOutput) => void
  ): void;
  public detectEntities(
    args: DetectEntitiesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DetectEntitiesCommandOutput) => void
  ): void;
  public detectEntities(
    args: DetectEntitiesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DetectEntitiesCommandOutput) => void),
    cb?: (err: any, data?: DetectEntitiesCommandOutput) => void
  ): Promise<DetectEntitiesCommandOutput> | void {
    const command = new DetectEntitiesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Detects the key noun phrases found in the text. </p>
   */
  public detectKeyPhrases(
    args: DetectKeyPhrasesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DetectKeyPhrasesCommandOutput>;
  public detectKeyPhrases(
    args: DetectKeyPhrasesCommandInput,
    cb: (err: any, data?: DetectKeyPhrasesCommandOutput) => void
  ): void;
  public detectKeyPhrases(
    args: DetectKeyPhrasesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DetectKeyPhrasesCommandOutput) => void
  ): void;
  public detectKeyPhrases(
    args: DetectKeyPhrasesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DetectKeyPhrasesCommandOutput) => void),
    cb?: (err: any, data?: DetectKeyPhrasesCommandOutput) => void
  ): Promise<DetectKeyPhrasesCommandOutput> | void {
    const command = new DetectKeyPhrasesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Inspects the input text for entities that contain personally identifiable information
   *       (PII) and returns information about them.</p>
   */
  public detectPiiEntities(
    args: DetectPiiEntitiesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DetectPiiEntitiesCommandOutput>;
  public detectPiiEntities(
    args: DetectPiiEntitiesCommandInput,
    cb: (err: any, data?: DetectPiiEntitiesCommandOutput) => void
  ): void;
  public detectPiiEntities(
    args: DetectPiiEntitiesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DetectPiiEntitiesCommandOutput) => void
  ): void;
  public detectPiiEntities(
    args: DetectPiiEntitiesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DetectPiiEntitiesCommandOutput) => void),
    cb?: (err: any, data?: DetectPiiEntitiesCommandOutput) => void
  ): Promise<DetectPiiEntitiesCommandOutput> | void {
    const command = new DetectPiiEntitiesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Inspects text and returns an inference of the prevailing sentiment
   *         (<code>POSITIVE</code>, <code>NEUTRAL</code>, <code>MIXED</code>, or <code>NEGATIVE</code>). </p>
   */
  public detectSentiment(
    args: DetectSentimentCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DetectSentimentCommandOutput>;
  public detectSentiment(
    args: DetectSentimentCommandInput,
    cb: (err: any, data?: DetectSentimentCommandOutput) => void
  ): void;
  public detectSentiment(
    args: DetectSentimentCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DetectSentimentCommandOutput) => void
  ): void;
  public detectSentiment(
    args: DetectSentimentCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DetectSentimentCommandOutput) => void),
    cb?: (err: any, data?: DetectSentimentCommandOutput) => void
  ): Promise<DetectSentimentCommandOutput> | void {
    const command = new DetectSentimentCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Inspects text for syntax and the part of speech of words in the document. For more
   *       information, <a>how-syntax</a>.</p>
   */
  public detectSyntax(
    args: DetectSyntaxCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DetectSyntaxCommandOutput>;
  public detectSyntax(args: DetectSyntaxCommandInput, cb: (err: any, data?: DetectSyntaxCommandOutput) => void): void;
  public detectSyntax(
    args: DetectSyntaxCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DetectSyntaxCommandOutput) => void
  ): void;
  public detectSyntax(
    args: DetectSyntaxCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DetectSyntaxCommandOutput) => void),
    cb?: (err: any, data?: DetectSyntaxCommandOutput) => void
  ): Promise<DetectSyntaxCommandOutput> | void {
    const command = new DetectSyntaxCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets a list of the documentation classification jobs that you have submitted.</p>
   */
  public listDocumentClassificationJobs(
    args: ListDocumentClassificationJobsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListDocumentClassificationJobsCommandOutput>;
  public listDocumentClassificationJobs(
    args: ListDocumentClassificationJobsCommandInput,
    cb: (err: any, data?: ListDocumentClassificationJobsCommandOutput) => void
  ): void;
  public listDocumentClassificationJobs(
    args: ListDocumentClassificationJobsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListDocumentClassificationJobsCommandOutput) => void
  ): void;
  public listDocumentClassificationJobs(
    args: ListDocumentClassificationJobsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListDocumentClassificationJobsCommandOutput) => void),
    cb?: (err: any, data?: ListDocumentClassificationJobsCommandOutput) => void
  ): Promise<ListDocumentClassificationJobsCommandOutput> | void {
    const command = new ListDocumentClassificationJobsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets a list of the document classifiers that you have created.</p>
   */
  public listDocumentClassifiers(
    args: ListDocumentClassifiersCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListDocumentClassifiersCommandOutput>;
  public listDocumentClassifiers(
    args: ListDocumentClassifiersCommandInput,
    cb: (err: any, data?: ListDocumentClassifiersCommandOutput) => void
  ): void;
  public listDocumentClassifiers(
    args: ListDocumentClassifiersCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListDocumentClassifiersCommandOutput) => void
  ): void;
  public listDocumentClassifiers(
    args: ListDocumentClassifiersCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListDocumentClassifiersCommandOutput) => void),
    cb?: (err: any, data?: ListDocumentClassifiersCommandOutput) => void
  ): Promise<ListDocumentClassifiersCommandOutput> | void {
    const command = new ListDocumentClassifiersCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets a list of the dominant language detection jobs that you have submitted.</p>
   */
  public listDominantLanguageDetectionJobs(
    args: ListDominantLanguageDetectionJobsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListDominantLanguageDetectionJobsCommandOutput>;
  public listDominantLanguageDetectionJobs(
    args: ListDominantLanguageDetectionJobsCommandInput,
    cb: (err: any, data?: ListDominantLanguageDetectionJobsCommandOutput) => void
  ): void;
  public listDominantLanguageDetectionJobs(
    args: ListDominantLanguageDetectionJobsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListDominantLanguageDetectionJobsCommandOutput) => void
  ): void;
  public listDominantLanguageDetectionJobs(
    args: ListDominantLanguageDetectionJobsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListDominantLanguageDetectionJobsCommandOutput) => void),
    cb?: (err: any, data?: ListDominantLanguageDetectionJobsCommandOutput) => void
  ): Promise<ListDominantLanguageDetectionJobsCommandOutput> | void {
    const command = new ListDominantLanguageDetectionJobsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets a list of all existing endpoints that you've created.</p>
   */
  public listEndpoints(
    args: ListEndpointsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListEndpointsCommandOutput>;
  public listEndpoints(
    args: ListEndpointsCommandInput,
    cb: (err: any, data?: ListEndpointsCommandOutput) => void
  ): void;
  public listEndpoints(
    args: ListEndpointsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListEndpointsCommandOutput) => void
  ): void;
  public listEndpoints(
    args: ListEndpointsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListEndpointsCommandOutput) => void),
    cb?: (err: any, data?: ListEndpointsCommandOutput) => void
  ): Promise<ListEndpointsCommandOutput> | void {
    const command = new ListEndpointsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets a list of the entity detection jobs that you have submitted.</p>
   */
  public listEntitiesDetectionJobs(
    args: ListEntitiesDetectionJobsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListEntitiesDetectionJobsCommandOutput>;
  public listEntitiesDetectionJobs(
    args: ListEntitiesDetectionJobsCommandInput,
    cb: (err: any, data?: ListEntitiesDetectionJobsCommandOutput) => void
  ): void;
  public listEntitiesDetectionJobs(
    args: ListEntitiesDetectionJobsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListEntitiesDetectionJobsCommandOutput) => void
  ): void;
  public listEntitiesDetectionJobs(
    args: ListEntitiesDetectionJobsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListEntitiesDetectionJobsCommandOutput) => void),
    cb?: (err: any, data?: ListEntitiesDetectionJobsCommandOutput) => void
  ): Promise<ListEntitiesDetectionJobsCommandOutput> | void {
    const command = new ListEntitiesDetectionJobsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets a list of the properties of all entity recognizers that you created, including
   *       recognizers currently in training. Allows you to filter the list of recognizers based on
   *       criteria such as status and submission time. This call returns up to 500 entity recognizers in
   *       the list, with a default number of 100 recognizers in the list.</p>
   *          <p>The results of this list are not in any particular order. Please get the list and sort
   *       locally if needed.</p>
   */
  public listEntityRecognizers(
    args: ListEntityRecognizersCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListEntityRecognizersCommandOutput>;
  public listEntityRecognizers(
    args: ListEntityRecognizersCommandInput,
    cb: (err: any, data?: ListEntityRecognizersCommandOutput) => void
  ): void;
  public listEntityRecognizers(
    args: ListEntityRecognizersCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListEntityRecognizersCommandOutput) => void
  ): void;
  public listEntityRecognizers(
    args: ListEntityRecognizersCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListEntityRecognizersCommandOutput) => void),
    cb?: (err: any, data?: ListEntityRecognizersCommandOutput) => void
  ): Promise<ListEntityRecognizersCommandOutput> | void {
    const command = new ListEntityRecognizersCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets a list of the events detection jobs that you have submitted.</p>
   */
  public listEventsDetectionJobs(
    args: ListEventsDetectionJobsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListEventsDetectionJobsCommandOutput>;
  public listEventsDetectionJobs(
    args: ListEventsDetectionJobsCommandInput,
    cb: (err: any, data?: ListEventsDetectionJobsCommandOutput) => void
  ): void;
  public listEventsDetectionJobs(
    args: ListEventsDetectionJobsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListEventsDetectionJobsCommandOutput) => void
  ): void;
  public listEventsDetectionJobs(
    args: ListEventsDetectionJobsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListEventsDetectionJobsCommandOutput) => void),
    cb?: (err: any, data?: ListEventsDetectionJobsCommandOutput) => void
  ): Promise<ListEventsDetectionJobsCommandOutput> | void {
    const command = new ListEventsDetectionJobsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Get a list of key phrase detection jobs that you have submitted.</p>
   */
  public listKeyPhrasesDetectionJobs(
    args: ListKeyPhrasesDetectionJobsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListKeyPhrasesDetectionJobsCommandOutput>;
  public listKeyPhrasesDetectionJobs(
    args: ListKeyPhrasesDetectionJobsCommandInput,
    cb: (err: any, data?: ListKeyPhrasesDetectionJobsCommandOutput) => void
  ): void;
  public listKeyPhrasesDetectionJobs(
    args: ListKeyPhrasesDetectionJobsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListKeyPhrasesDetectionJobsCommandOutput) => void
  ): void;
  public listKeyPhrasesDetectionJobs(
    args: ListKeyPhrasesDetectionJobsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListKeyPhrasesDetectionJobsCommandOutput) => void),
    cb?: (err: any, data?: ListKeyPhrasesDetectionJobsCommandOutput) => void
  ): Promise<ListKeyPhrasesDetectionJobsCommandOutput> | void {
    const command = new ListKeyPhrasesDetectionJobsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets a list of the PII entity detection jobs that you have submitted.</p>
   */
  public listPiiEntitiesDetectionJobs(
    args: ListPiiEntitiesDetectionJobsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListPiiEntitiesDetectionJobsCommandOutput>;
  public listPiiEntitiesDetectionJobs(
    args: ListPiiEntitiesDetectionJobsCommandInput,
    cb: (err: any, data?: ListPiiEntitiesDetectionJobsCommandOutput) => void
  ): void;
  public listPiiEntitiesDetectionJobs(
    args: ListPiiEntitiesDetectionJobsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListPiiEntitiesDetectionJobsCommandOutput) => void
  ): void;
  public listPiiEntitiesDetectionJobs(
    args: ListPiiEntitiesDetectionJobsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListPiiEntitiesDetectionJobsCommandOutput) => void),
    cb?: (err: any, data?: ListPiiEntitiesDetectionJobsCommandOutput) => void
  ): Promise<ListPiiEntitiesDetectionJobsCommandOutput> | void {
    const command = new ListPiiEntitiesDetectionJobsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets a list of sentiment detection jobs that you have submitted.</p>
   */
  public listSentimentDetectionJobs(
    args: ListSentimentDetectionJobsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListSentimentDetectionJobsCommandOutput>;
  public listSentimentDetectionJobs(
    args: ListSentimentDetectionJobsCommandInput,
    cb: (err: any, data?: ListSentimentDetectionJobsCommandOutput) => void
  ): void;
  public listSentimentDetectionJobs(
    args: ListSentimentDetectionJobsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListSentimentDetectionJobsCommandOutput) => void
  ): void;
  public listSentimentDetectionJobs(
    args: ListSentimentDetectionJobsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListSentimentDetectionJobsCommandOutput) => void),
    cb?: (err: any, data?: ListSentimentDetectionJobsCommandOutput) => void
  ): Promise<ListSentimentDetectionJobsCommandOutput> | void {
    const command = new ListSentimentDetectionJobsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Lists all tags associated with a given Amazon Comprehend resource. </p>
   */
  public listTagsForResource(
    args: ListTagsForResourceCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListTagsForResourceCommandOutput>;
  public listTagsForResource(
    args: ListTagsForResourceCommandInput,
    cb: (err: any, data?: ListTagsForResourceCommandOutput) => void
  ): void;
  public listTagsForResource(
    args: ListTagsForResourceCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListTagsForResourceCommandOutput) => void
  ): void;
  public listTagsForResource(
    args: ListTagsForResourceCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListTagsForResourceCommandOutput) => void),
    cb?: (err: any, data?: ListTagsForResourceCommandOutput) => void
  ): Promise<ListTagsForResourceCommandOutput> | void {
    const command = new ListTagsForResourceCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets a list of the topic detection jobs that you have submitted.</p>
   */
  public listTopicsDetectionJobs(
    args: ListTopicsDetectionJobsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListTopicsDetectionJobsCommandOutput>;
  public listTopicsDetectionJobs(
    args: ListTopicsDetectionJobsCommandInput,
    cb: (err: any, data?: ListTopicsDetectionJobsCommandOutput) => void
  ): void;
  public listTopicsDetectionJobs(
    args: ListTopicsDetectionJobsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListTopicsDetectionJobsCommandOutput) => void
  ): void;
  public listTopicsDetectionJobs(
    args: ListTopicsDetectionJobsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListTopicsDetectionJobsCommandOutput) => void),
    cb?: (err: any, data?: ListTopicsDetectionJobsCommandOutput) => void
  ): Promise<ListTopicsDetectionJobsCommandOutput> | void {
    const command = new ListTopicsDetectionJobsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Starts an asynchronous document classification job. Use the  operation to track the progress of the
   *       job.</p>
   */
  public startDocumentClassificationJob(
    args: StartDocumentClassificationJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StartDocumentClassificationJobCommandOutput>;
  public startDocumentClassificationJob(
    args: StartDocumentClassificationJobCommandInput,
    cb: (err: any, data?: StartDocumentClassificationJobCommandOutput) => void
  ): void;
  public startDocumentClassificationJob(
    args: StartDocumentClassificationJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StartDocumentClassificationJobCommandOutput) => void
  ): void;
  public startDocumentClassificationJob(
    args: StartDocumentClassificationJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StartDocumentClassificationJobCommandOutput) => void),
    cb?: (err: any, data?: StartDocumentClassificationJobCommandOutput) => void
  ): Promise<StartDocumentClassificationJobCommandOutput> | void {
    const command = new StartDocumentClassificationJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Starts an asynchronous dominant language detection job for a collection of documents. Use
   *       the  operation to track the status
   *       of a job.</p>
   */
  public startDominantLanguageDetectionJob(
    args: StartDominantLanguageDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StartDominantLanguageDetectionJobCommandOutput>;
  public startDominantLanguageDetectionJob(
    args: StartDominantLanguageDetectionJobCommandInput,
    cb: (err: any, data?: StartDominantLanguageDetectionJobCommandOutput) => void
  ): void;
  public startDominantLanguageDetectionJob(
    args: StartDominantLanguageDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StartDominantLanguageDetectionJobCommandOutput) => void
  ): void;
  public startDominantLanguageDetectionJob(
    args: StartDominantLanguageDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StartDominantLanguageDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: StartDominantLanguageDetectionJobCommandOutput) => void
  ): Promise<StartDominantLanguageDetectionJobCommandOutput> | void {
    const command = new StartDominantLanguageDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Starts an asynchronous entity detection job for a collection of documents. Use the  operation to track the status of a job.</p>
   *          <p>This API can be used for either standard entity detection or custom entity recognition. In
   *       order to be used for custom entity recognition, the optional <code>EntityRecognizerArn</code>
   *       must be used in order to provide access to the recognizer being used to detect the custom
   *       entity.</p>
   */
  public startEntitiesDetectionJob(
    args: StartEntitiesDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StartEntitiesDetectionJobCommandOutput>;
  public startEntitiesDetectionJob(
    args: StartEntitiesDetectionJobCommandInput,
    cb: (err: any, data?: StartEntitiesDetectionJobCommandOutput) => void
  ): void;
  public startEntitiesDetectionJob(
    args: StartEntitiesDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StartEntitiesDetectionJobCommandOutput) => void
  ): void;
  public startEntitiesDetectionJob(
    args: StartEntitiesDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StartEntitiesDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: StartEntitiesDetectionJobCommandOutput) => void
  ): Promise<StartEntitiesDetectionJobCommandOutput> | void {
    const command = new StartEntitiesDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Starts an asynchronous event detection job for a collection of documents.</p>
   */
  public startEventsDetectionJob(
    args: StartEventsDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StartEventsDetectionJobCommandOutput>;
  public startEventsDetectionJob(
    args: StartEventsDetectionJobCommandInput,
    cb: (err: any, data?: StartEventsDetectionJobCommandOutput) => void
  ): void;
  public startEventsDetectionJob(
    args: StartEventsDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StartEventsDetectionJobCommandOutput) => void
  ): void;
  public startEventsDetectionJob(
    args: StartEventsDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StartEventsDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: StartEventsDetectionJobCommandOutput) => void
  ): Promise<StartEventsDetectionJobCommandOutput> | void {
    const command = new StartEventsDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Starts an asynchronous key phrase detection job for a collection of documents. Use the
   *          operation to track the status of a
   *       job.</p>
   */
  public startKeyPhrasesDetectionJob(
    args: StartKeyPhrasesDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StartKeyPhrasesDetectionJobCommandOutput>;
  public startKeyPhrasesDetectionJob(
    args: StartKeyPhrasesDetectionJobCommandInput,
    cb: (err: any, data?: StartKeyPhrasesDetectionJobCommandOutput) => void
  ): void;
  public startKeyPhrasesDetectionJob(
    args: StartKeyPhrasesDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StartKeyPhrasesDetectionJobCommandOutput) => void
  ): void;
  public startKeyPhrasesDetectionJob(
    args: StartKeyPhrasesDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StartKeyPhrasesDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: StartKeyPhrasesDetectionJobCommandOutput) => void
  ): Promise<StartKeyPhrasesDetectionJobCommandOutput> | void {
    const command = new StartKeyPhrasesDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Starts an asynchronous PII entity detection job for a collection of documents.</p>
   */
  public startPiiEntitiesDetectionJob(
    args: StartPiiEntitiesDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StartPiiEntitiesDetectionJobCommandOutput>;
  public startPiiEntitiesDetectionJob(
    args: StartPiiEntitiesDetectionJobCommandInput,
    cb: (err: any, data?: StartPiiEntitiesDetectionJobCommandOutput) => void
  ): void;
  public startPiiEntitiesDetectionJob(
    args: StartPiiEntitiesDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StartPiiEntitiesDetectionJobCommandOutput) => void
  ): void;
  public startPiiEntitiesDetectionJob(
    args: StartPiiEntitiesDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StartPiiEntitiesDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: StartPiiEntitiesDetectionJobCommandOutput) => void
  ): Promise<StartPiiEntitiesDetectionJobCommandOutput> | void {
    const command = new StartPiiEntitiesDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Starts an asynchronous sentiment detection job for a collection of documents. use the
   *          operation to track the status of a
   *       job.</p>
   */
  public startSentimentDetectionJob(
    args: StartSentimentDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StartSentimentDetectionJobCommandOutput>;
  public startSentimentDetectionJob(
    args: StartSentimentDetectionJobCommandInput,
    cb: (err: any, data?: StartSentimentDetectionJobCommandOutput) => void
  ): void;
  public startSentimentDetectionJob(
    args: StartSentimentDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StartSentimentDetectionJobCommandOutput) => void
  ): void;
  public startSentimentDetectionJob(
    args: StartSentimentDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StartSentimentDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: StartSentimentDetectionJobCommandOutput) => void
  ): Promise<StartSentimentDetectionJobCommandOutput> | void {
    const command = new StartSentimentDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Starts an asynchronous topic detection job. Use the
   *         <code>DescribeTopicDetectionJob</code> operation to track the status of a job.</p>
   */
  public startTopicsDetectionJob(
    args: StartTopicsDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StartTopicsDetectionJobCommandOutput>;
  public startTopicsDetectionJob(
    args: StartTopicsDetectionJobCommandInput,
    cb: (err: any, data?: StartTopicsDetectionJobCommandOutput) => void
  ): void;
  public startTopicsDetectionJob(
    args: StartTopicsDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StartTopicsDetectionJobCommandOutput) => void
  ): void;
  public startTopicsDetectionJob(
    args: StartTopicsDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StartTopicsDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: StartTopicsDetectionJobCommandOutput) => void
  ): Promise<StartTopicsDetectionJobCommandOutput> | void {
    const command = new StartTopicsDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public stopDominantLanguageDetectionJob(
    args: StopDominantLanguageDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StopDominantLanguageDetectionJobCommandOutput>;
  public stopDominantLanguageDetectionJob(
    args: StopDominantLanguageDetectionJobCommandInput,
    cb: (err: any, data?: StopDominantLanguageDetectionJobCommandOutput) => void
  ): void;
  public stopDominantLanguageDetectionJob(
    args: StopDominantLanguageDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StopDominantLanguageDetectionJobCommandOutput) => void
  ): void;
  public stopDominantLanguageDetectionJob(
    args: StopDominantLanguageDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StopDominantLanguageDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: StopDominantLanguageDetectionJobCommandOutput) => void
  ): Promise<StopDominantLanguageDetectionJobCommandOutput> | void {
    const command = new StopDominantLanguageDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public stopEntitiesDetectionJob(
    args: StopEntitiesDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StopEntitiesDetectionJobCommandOutput>;
  public stopEntitiesDetectionJob(
    args: StopEntitiesDetectionJobCommandInput,
    cb: (err: any, data?: StopEntitiesDetectionJobCommandOutput) => void
  ): void;
  public stopEntitiesDetectionJob(
    args: StopEntitiesDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StopEntitiesDetectionJobCommandOutput) => void
  ): void;
  public stopEntitiesDetectionJob(
    args: StopEntitiesDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StopEntitiesDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: StopEntitiesDetectionJobCommandOutput) => void
  ): Promise<StopEntitiesDetectionJobCommandOutput> | void {
    const command = new StopEntitiesDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Stops an events detection job in progress.</p>
   */
  public stopEventsDetectionJob(
    args: StopEventsDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StopEventsDetectionJobCommandOutput>;
  public stopEventsDetectionJob(
    args: StopEventsDetectionJobCommandInput,
    cb: (err: any, data?: StopEventsDetectionJobCommandOutput) => void
  ): void;
  public stopEventsDetectionJob(
    args: StopEventsDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StopEventsDetectionJobCommandOutput) => void
  ): void;
  public stopEventsDetectionJob(
    args: StopEventsDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StopEventsDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: StopEventsDetectionJobCommandOutput) => void
  ): Promise<StopEventsDetectionJobCommandOutput> | void {
    const command = new StopEventsDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public stopKeyPhrasesDetectionJob(
    args: StopKeyPhrasesDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StopKeyPhrasesDetectionJobCommandOutput>;
  public stopKeyPhrasesDetectionJob(
    args: StopKeyPhrasesDetectionJobCommandInput,
    cb: (err: any, data?: StopKeyPhrasesDetectionJobCommandOutput) => void
  ): void;
  public stopKeyPhrasesDetectionJob(
    args: StopKeyPhrasesDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StopKeyPhrasesDetectionJobCommandOutput) => void
  ): void;
  public stopKeyPhrasesDetectionJob(
    args: StopKeyPhrasesDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StopKeyPhrasesDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: StopKeyPhrasesDetectionJobCommandOutput) => void
  ): Promise<StopKeyPhrasesDetectionJobCommandOutput> | void {
    const command = new StopKeyPhrasesDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Stops a PII entities detection job in progress.</p>
   */
  public stopPiiEntitiesDetectionJob(
    args: StopPiiEntitiesDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StopPiiEntitiesDetectionJobCommandOutput>;
  public stopPiiEntitiesDetectionJob(
    args: StopPiiEntitiesDetectionJobCommandInput,
    cb: (err: any, data?: StopPiiEntitiesDetectionJobCommandOutput) => void
  ): void;
  public stopPiiEntitiesDetectionJob(
    args: StopPiiEntitiesDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StopPiiEntitiesDetectionJobCommandOutput) => void
  ): void;
  public stopPiiEntitiesDetectionJob(
    args: StopPiiEntitiesDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StopPiiEntitiesDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: StopPiiEntitiesDetectionJobCommandOutput) => void
  ): Promise<StopPiiEntitiesDetectionJobCommandOutput> | void {
    const command = new StopPiiEntitiesDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public stopSentimentDetectionJob(
    args: StopSentimentDetectionJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StopSentimentDetectionJobCommandOutput>;
  public stopSentimentDetectionJob(
    args: StopSentimentDetectionJobCommandInput,
    cb: (err: any, data?: StopSentimentDetectionJobCommandOutput) => void
  ): void;
  public stopSentimentDetectionJob(
    args: StopSentimentDetectionJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StopSentimentDetectionJobCommandOutput) => void
  ): void;
  public stopSentimentDetectionJob(
    args: StopSentimentDetectionJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StopSentimentDetectionJobCommandOutput) => void),
    cb?: (err: any, data?: StopSentimentDetectionJobCommandOutput) => void
  ): Promise<StopSentimentDetectionJobCommandOutput> | void {
    const command = new StopSentimentDetectionJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Stops a document classifier training job while in progress.</p>
   *          <p>If the training job state is <code>TRAINING</code>, the job is marked for termination and
   *       put into the <code>STOP_REQUESTED</code> state. If the training job completes before it can be
   *       stopped, it is put into the <code>TRAINED</code>; otherwise the training job is stopped and
   *       put into the <code>STOPPED</code> state and the service sends back an HTTP 200 response with
   *       an empty HTTP body. </p>
   */
  public stopTrainingDocumentClassifier(
    args: StopTrainingDocumentClassifierCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StopTrainingDocumentClassifierCommandOutput>;
  public stopTrainingDocumentClassifier(
    args: StopTrainingDocumentClassifierCommandInput,
    cb: (err: any, data?: StopTrainingDocumentClassifierCommandOutput) => void
  ): void;
  public stopTrainingDocumentClassifier(
    args: StopTrainingDocumentClassifierCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StopTrainingDocumentClassifierCommandOutput) => void
  ): void;
  public stopTrainingDocumentClassifier(
    args: StopTrainingDocumentClassifierCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StopTrainingDocumentClassifierCommandOutput) => void),
    cb?: (err: any, data?: StopTrainingDocumentClassifierCommandOutput) => void
  ): Promise<StopTrainingDocumentClassifierCommandOutput> | void {
    const command = new StopTrainingDocumentClassifierCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Stops an entity recognizer training job while in progress.</p>
   *          <p>If the training job state is <code>TRAINING</code>, the job is marked for termination and
   *       put into the <code>STOP_REQUESTED</code> state. If the training job completes before it can be
   *       stopped, it is put into the <code>TRAINED</code>; otherwise the training job is stopped and
   *       putted into the <code>STOPPED</code> state and the service sends back an HTTP 200 response
   *       with an empty HTTP body.</p>
   */
  public stopTrainingEntityRecognizer(
    args: StopTrainingEntityRecognizerCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StopTrainingEntityRecognizerCommandOutput>;
  public stopTrainingEntityRecognizer(
    args: StopTrainingEntityRecognizerCommandInput,
    cb: (err: any, data?: StopTrainingEntityRecognizerCommandOutput) => void
  ): void;
  public stopTrainingEntityRecognizer(
    args: StopTrainingEntityRecognizerCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StopTrainingEntityRecognizerCommandOutput) => void
  ): void;
  public stopTrainingEntityRecognizer(
    args: StopTrainingEntityRecognizerCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StopTrainingEntityRecognizerCommandOutput) => void),
    cb?: (err: any, data?: StopTrainingEntityRecognizerCommandOutput) => void
  ): Promise<StopTrainingEntityRecognizerCommandOutput> | void {
    const command = new StopTrainingEntityRecognizerCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Associates a specific tag with an Amazon Comprehend resource. A tag is a key-value pair
   *       that adds as a metadata to a resource used by Amazon Comprehend. For example, a tag with
   *       "Sales" as the key might be added to a resource to indicate its use by the sales department.
   *     </p>
   */
  public tagResource(args: TagResourceCommandInput, options?: __HttpHandlerOptions): Promise<TagResourceCommandOutput>;
  public tagResource(args: TagResourceCommandInput, cb: (err: any, data?: TagResourceCommandOutput) => void): void;
  public tagResource(
    args: TagResourceCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: TagResourceCommandOutput) => void
  ): void;
  public tagResource(
    args: TagResourceCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: TagResourceCommandOutput) => void),
    cb?: (err: any, data?: TagResourceCommandOutput) => void
  ): Promise<TagResourceCommandOutput> | void {
    const command = new TagResourceCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Removes a specific tag associated with an Amazon Comprehend resource. </p>
   */
  public untagResource(
    args: UntagResourceCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UntagResourceCommandOutput>;
  public untagResource(
    args: UntagResourceCommandInput,
    cb: (err: any, data?: UntagResourceCommandOutput) => void
  ): void;
  public untagResource(
    args: UntagResourceCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UntagResourceCommandOutput) => void
  ): void;
  public untagResource(
    args: UntagResourceCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UntagResourceCommandOutput) => void),
    cb?: (err: any, data?: UntagResourceCommandOutput) => void
  ): Promise<UntagResourceCommandOutput> | void {
    const command = new UntagResourceCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Updates information about the specified endpoint.</p>
   */
  public updateEndpoint(
    args: UpdateEndpointCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateEndpointCommandOutput>;
  public updateEndpoint(
    args: UpdateEndpointCommandInput,
    cb: (err: any, data?: UpdateEndpointCommandOutput) => void
  ): void;
  public updateEndpoint(
    args: UpdateEndpointCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateEndpointCommandOutput) => void
  ): void;
  public updateEndpoint(
    args: UpdateEndpointCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateEndpointCommandOutput) => void),
    cb?: (err: any, data?: UpdateEndpointCommandOutput) => void
  ): Promise<UpdateEndpointCommandOutput> | void {
    const command = new UpdateEndpointCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }
}
