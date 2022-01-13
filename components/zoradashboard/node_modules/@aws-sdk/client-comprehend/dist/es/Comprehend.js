import { __extends } from "tslib";
import { ComprehendClient } from "./ComprehendClient";
import { BatchDetectDominantLanguageCommand, } from "./commands/BatchDetectDominantLanguageCommand";
import { BatchDetectEntitiesCommand, } from "./commands/BatchDetectEntitiesCommand";
import { BatchDetectKeyPhrasesCommand, } from "./commands/BatchDetectKeyPhrasesCommand";
import { BatchDetectSentimentCommand, } from "./commands/BatchDetectSentimentCommand";
import { BatchDetectSyntaxCommand, } from "./commands/BatchDetectSyntaxCommand";
import { ClassifyDocumentCommand, } from "./commands/ClassifyDocumentCommand";
import { CreateDocumentClassifierCommand, } from "./commands/CreateDocumentClassifierCommand";
import { CreateEndpointCommand, } from "./commands/CreateEndpointCommand";
import { CreateEntityRecognizerCommand, } from "./commands/CreateEntityRecognizerCommand";
import { DeleteDocumentClassifierCommand, } from "./commands/DeleteDocumentClassifierCommand";
import { DeleteEndpointCommand, } from "./commands/DeleteEndpointCommand";
import { DeleteEntityRecognizerCommand, } from "./commands/DeleteEntityRecognizerCommand";
import { DescribeDocumentClassificationJobCommand, } from "./commands/DescribeDocumentClassificationJobCommand";
import { DescribeDocumentClassifierCommand, } from "./commands/DescribeDocumentClassifierCommand";
import { DescribeDominantLanguageDetectionJobCommand, } from "./commands/DescribeDominantLanguageDetectionJobCommand";
import { DescribeEndpointCommand, } from "./commands/DescribeEndpointCommand";
import { DescribeEntitiesDetectionJobCommand, } from "./commands/DescribeEntitiesDetectionJobCommand";
import { DescribeEntityRecognizerCommand, } from "./commands/DescribeEntityRecognizerCommand";
import { DescribeEventsDetectionJobCommand, } from "./commands/DescribeEventsDetectionJobCommand";
import { DescribeKeyPhrasesDetectionJobCommand, } from "./commands/DescribeKeyPhrasesDetectionJobCommand";
import { DescribePiiEntitiesDetectionJobCommand, } from "./commands/DescribePiiEntitiesDetectionJobCommand";
import { DescribeSentimentDetectionJobCommand, } from "./commands/DescribeSentimentDetectionJobCommand";
import { DescribeTopicsDetectionJobCommand, } from "./commands/DescribeTopicsDetectionJobCommand";
import { DetectDominantLanguageCommand, } from "./commands/DetectDominantLanguageCommand";
import { DetectEntitiesCommand, } from "./commands/DetectEntitiesCommand";
import { DetectKeyPhrasesCommand, } from "./commands/DetectKeyPhrasesCommand";
import { DetectPiiEntitiesCommand, } from "./commands/DetectPiiEntitiesCommand";
import { DetectSentimentCommand, } from "./commands/DetectSentimentCommand";
import { DetectSyntaxCommand, } from "./commands/DetectSyntaxCommand";
import { ListDocumentClassificationJobsCommand, } from "./commands/ListDocumentClassificationJobsCommand";
import { ListDocumentClassifiersCommand, } from "./commands/ListDocumentClassifiersCommand";
import { ListDominantLanguageDetectionJobsCommand, } from "./commands/ListDominantLanguageDetectionJobsCommand";
import { ListEndpointsCommand, } from "./commands/ListEndpointsCommand";
import { ListEntitiesDetectionJobsCommand, } from "./commands/ListEntitiesDetectionJobsCommand";
import { ListEntityRecognizersCommand, } from "./commands/ListEntityRecognizersCommand";
import { ListEventsDetectionJobsCommand, } from "./commands/ListEventsDetectionJobsCommand";
import { ListKeyPhrasesDetectionJobsCommand, } from "./commands/ListKeyPhrasesDetectionJobsCommand";
import { ListPiiEntitiesDetectionJobsCommand, } from "./commands/ListPiiEntitiesDetectionJobsCommand";
import { ListSentimentDetectionJobsCommand, } from "./commands/ListSentimentDetectionJobsCommand";
import { ListTagsForResourceCommand, } from "./commands/ListTagsForResourceCommand";
import { ListTopicsDetectionJobsCommand, } from "./commands/ListTopicsDetectionJobsCommand";
import { StartDocumentClassificationJobCommand, } from "./commands/StartDocumentClassificationJobCommand";
import { StartDominantLanguageDetectionJobCommand, } from "./commands/StartDominantLanguageDetectionJobCommand";
import { StartEntitiesDetectionJobCommand, } from "./commands/StartEntitiesDetectionJobCommand";
import { StartEventsDetectionJobCommand, } from "./commands/StartEventsDetectionJobCommand";
import { StartKeyPhrasesDetectionJobCommand, } from "./commands/StartKeyPhrasesDetectionJobCommand";
import { StartPiiEntitiesDetectionJobCommand, } from "./commands/StartPiiEntitiesDetectionJobCommand";
import { StartSentimentDetectionJobCommand, } from "./commands/StartSentimentDetectionJobCommand";
import { StartTopicsDetectionJobCommand, } from "./commands/StartTopicsDetectionJobCommand";
import { StopDominantLanguageDetectionJobCommand, } from "./commands/StopDominantLanguageDetectionJobCommand";
import { StopEntitiesDetectionJobCommand, } from "./commands/StopEntitiesDetectionJobCommand";
import { StopEventsDetectionJobCommand, } from "./commands/StopEventsDetectionJobCommand";
import { StopKeyPhrasesDetectionJobCommand, } from "./commands/StopKeyPhrasesDetectionJobCommand";
import { StopPiiEntitiesDetectionJobCommand, } from "./commands/StopPiiEntitiesDetectionJobCommand";
import { StopSentimentDetectionJobCommand, } from "./commands/StopSentimentDetectionJobCommand";
import { StopTrainingDocumentClassifierCommand, } from "./commands/StopTrainingDocumentClassifierCommand";
import { StopTrainingEntityRecognizerCommand, } from "./commands/StopTrainingEntityRecognizerCommand";
import { TagResourceCommand } from "./commands/TagResourceCommand";
import { UntagResourceCommand, } from "./commands/UntagResourceCommand";
import { UpdateEndpointCommand, } from "./commands/UpdateEndpointCommand";
/**
 * <p>Amazon Comprehend is an AWS service for gaining insight into the content of documents.
 *       Use these actions to determine the topics contained in your documents, the topics they
 *       discuss, the predominant sentiment expressed in them, the predominant language used, and
 *       more.</p>
 */
var Comprehend = /** @class */ (function (_super) {
    __extends(Comprehend, _super);
    function Comprehend() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Comprehend.prototype.batchDetectDominantLanguage = function (args, optionsOrCb, cb) {
        var command = new BatchDetectDominantLanguageCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.batchDetectEntities = function (args, optionsOrCb, cb) {
        var command = new BatchDetectEntitiesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.batchDetectKeyPhrases = function (args, optionsOrCb, cb) {
        var command = new BatchDetectKeyPhrasesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.batchDetectSentiment = function (args, optionsOrCb, cb) {
        var command = new BatchDetectSentimentCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.batchDetectSyntax = function (args, optionsOrCb, cb) {
        var command = new BatchDetectSyntaxCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.classifyDocument = function (args, optionsOrCb, cb) {
        var command = new ClassifyDocumentCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.createDocumentClassifier = function (args, optionsOrCb, cb) {
        var command = new CreateDocumentClassifierCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.createEndpoint = function (args, optionsOrCb, cb) {
        var command = new CreateEndpointCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.createEntityRecognizer = function (args, optionsOrCb, cb) {
        var command = new CreateEntityRecognizerCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.deleteDocumentClassifier = function (args, optionsOrCb, cb) {
        var command = new DeleteDocumentClassifierCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.deleteEndpoint = function (args, optionsOrCb, cb) {
        var command = new DeleteEndpointCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.deleteEntityRecognizer = function (args, optionsOrCb, cb) {
        var command = new DeleteEntityRecognizerCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.describeDocumentClassificationJob = function (args, optionsOrCb, cb) {
        var command = new DescribeDocumentClassificationJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.describeDocumentClassifier = function (args, optionsOrCb, cb) {
        var command = new DescribeDocumentClassifierCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.describeDominantLanguageDetectionJob = function (args, optionsOrCb, cb) {
        var command = new DescribeDominantLanguageDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.describeEndpoint = function (args, optionsOrCb, cb) {
        var command = new DescribeEndpointCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.describeEntitiesDetectionJob = function (args, optionsOrCb, cb) {
        var command = new DescribeEntitiesDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.describeEntityRecognizer = function (args, optionsOrCb, cb) {
        var command = new DescribeEntityRecognizerCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.describeEventsDetectionJob = function (args, optionsOrCb, cb) {
        var command = new DescribeEventsDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.describeKeyPhrasesDetectionJob = function (args, optionsOrCb, cb) {
        var command = new DescribeKeyPhrasesDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.describePiiEntitiesDetectionJob = function (args, optionsOrCb, cb) {
        var command = new DescribePiiEntitiesDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.describeSentimentDetectionJob = function (args, optionsOrCb, cb) {
        var command = new DescribeSentimentDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.describeTopicsDetectionJob = function (args, optionsOrCb, cb) {
        var command = new DescribeTopicsDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.detectDominantLanguage = function (args, optionsOrCb, cb) {
        var command = new DetectDominantLanguageCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.detectEntities = function (args, optionsOrCb, cb) {
        var command = new DetectEntitiesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.detectKeyPhrases = function (args, optionsOrCb, cb) {
        var command = new DetectKeyPhrasesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.detectPiiEntities = function (args, optionsOrCb, cb) {
        var command = new DetectPiiEntitiesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.detectSentiment = function (args, optionsOrCb, cb) {
        var command = new DetectSentimentCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.detectSyntax = function (args, optionsOrCb, cb) {
        var command = new DetectSyntaxCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.listDocumentClassificationJobs = function (args, optionsOrCb, cb) {
        var command = new ListDocumentClassificationJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.listDocumentClassifiers = function (args, optionsOrCb, cb) {
        var command = new ListDocumentClassifiersCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.listDominantLanguageDetectionJobs = function (args, optionsOrCb, cb) {
        var command = new ListDominantLanguageDetectionJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.listEndpoints = function (args, optionsOrCb, cb) {
        var command = new ListEndpointsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.listEntitiesDetectionJobs = function (args, optionsOrCb, cb) {
        var command = new ListEntitiesDetectionJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.listEntityRecognizers = function (args, optionsOrCb, cb) {
        var command = new ListEntityRecognizersCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.listEventsDetectionJobs = function (args, optionsOrCb, cb) {
        var command = new ListEventsDetectionJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.listKeyPhrasesDetectionJobs = function (args, optionsOrCb, cb) {
        var command = new ListKeyPhrasesDetectionJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.listPiiEntitiesDetectionJobs = function (args, optionsOrCb, cb) {
        var command = new ListPiiEntitiesDetectionJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.listSentimentDetectionJobs = function (args, optionsOrCb, cb) {
        var command = new ListSentimentDetectionJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.listTagsForResource = function (args, optionsOrCb, cb) {
        var command = new ListTagsForResourceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.listTopicsDetectionJobs = function (args, optionsOrCb, cb) {
        var command = new ListTopicsDetectionJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.startDocumentClassificationJob = function (args, optionsOrCb, cb) {
        var command = new StartDocumentClassificationJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.startDominantLanguageDetectionJob = function (args, optionsOrCb, cb) {
        var command = new StartDominantLanguageDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.startEntitiesDetectionJob = function (args, optionsOrCb, cb) {
        var command = new StartEntitiesDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.startEventsDetectionJob = function (args, optionsOrCb, cb) {
        var command = new StartEventsDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.startKeyPhrasesDetectionJob = function (args, optionsOrCb, cb) {
        var command = new StartKeyPhrasesDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.startPiiEntitiesDetectionJob = function (args, optionsOrCb, cb) {
        var command = new StartPiiEntitiesDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.startSentimentDetectionJob = function (args, optionsOrCb, cb) {
        var command = new StartSentimentDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.startTopicsDetectionJob = function (args, optionsOrCb, cb) {
        var command = new StartTopicsDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.stopDominantLanguageDetectionJob = function (args, optionsOrCb, cb) {
        var command = new StopDominantLanguageDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.stopEntitiesDetectionJob = function (args, optionsOrCb, cb) {
        var command = new StopEntitiesDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.stopEventsDetectionJob = function (args, optionsOrCb, cb) {
        var command = new StopEventsDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.stopKeyPhrasesDetectionJob = function (args, optionsOrCb, cb) {
        var command = new StopKeyPhrasesDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.stopPiiEntitiesDetectionJob = function (args, optionsOrCb, cb) {
        var command = new StopPiiEntitiesDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.stopSentimentDetectionJob = function (args, optionsOrCb, cb) {
        var command = new StopSentimentDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.stopTrainingDocumentClassifier = function (args, optionsOrCb, cb) {
        var command = new StopTrainingDocumentClassifierCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.stopTrainingEntityRecognizer = function (args, optionsOrCb, cb) {
        var command = new StopTrainingEntityRecognizerCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.tagResource = function (args, optionsOrCb, cb) {
        var command = new TagResourceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.untagResource = function (args, optionsOrCb, cb) {
        var command = new UntagResourceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Comprehend.prototype.updateEndpoint = function (args, optionsOrCb, cb) {
        var command = new UpdateEndpointCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    return Comprehend;
}(ComprehendClient));
export { Comprehend };
//# sourceMappingURL=Comprehend.js.map