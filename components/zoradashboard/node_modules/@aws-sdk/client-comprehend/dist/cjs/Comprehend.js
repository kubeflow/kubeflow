"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comprehend = void 0;
const ComprehendClient_1 = require("./ComprehendClient");
const BatchDetectDominantLanguageCommand_1 = require("./commands/BatchDetectDominantLanguageCommand");
const BatchDetectEntitiesCommand_1 = require("./commands/BatchDetectEntitiesCommand");
const BatchDetectKeyPhrasesCommand_1 = require("./commands/BatchDetectKeyPhrasesCommand");
const BatchDetectSentimentCommand_1 = require("./commands/BatchDetectSentimentCommand");
const BatchDetectSyntaxCommand_1 = require("./commands/BatchDetectSyntaxCommand");
const ClassifyDocumentCommand_1 = require("./commands/ClassifyDocumentCommand");
const CreateDocumentClassifierCommand_1 = require("./commands/CreateDocumentClassifierCommand");
const CreateEndpointCommand_1 = require("./commands/CreateEndpointCommand");
const CreateEntityRecognizerCommand_1 = require("./commands/CreateEntityRecognizerCommand");
const DeleteDocumentClassifierCommand_1 = require("./commands/DeleteDocumentClassifierCommand");
const DeleteEndpointCommand_1 = require("./commands/DeleteEndpointCommand");
const DeleteEntityRecognizerCommand_1 = require("./commands/DeleteEntityRecognizerCommand");
const DescribeDocumentClassificationJobCommand_1 = require("./commands/DescribeDocumentClassificationJobCommand");
const DescribeDocumentClassifierCommand_1 = require("./commands/DescribeDocumentClassifierCommand");
const DescribeDominantLanguageDetectionJobCommand_1 = require("./commands/DescribeDominantLanguageDetectionJobCommand");
const DescribeEndpointCommand_1 = require("./commands/DescribeEndpointCommand");
const DescribeEntitiesDetectionJobCommand_1 = require("./commands/DescribeEntitiesDetectionJobCommand");
const DescribeEntityRecognizerCommand_1 = require("./commands/DescribeEntityRecognizerCommand");
const DescribeEventsDetectionJobCommand_1 = require("./commands/DescribeEventsDetectionJobCommand");
const DescribeKeyPhrasesDetectionJobCommand_1 = require("./commands/DescribeKeyPhrasesDetectionJobCommand");
const DescribePiiEntitiesDetectionJobCommand_1 = require("./commands/DescribePiiEntitiesDetectionJobCommand");
const DescribeSentimentDetectionJobCommand_1 = require("./commands/DescribeSentimentDetectionJobCommand");
const DescribeTopicsDetectionJobCommand_1 = require("./commands/DescribeTopicsDetectionJobCommand");
const DetectDominantLanguageCommand_1 = require("./commands/DetectDominantLanguageCommand");
const DetectEntitiesCommand_1 = require("./commands/DetectEntitiesCommand");
const DetectKeyPhrasesCommand_1 = require("./commands/DetectKeyPhrasesCommand");
const DetectPiiEntitiesCommand_1 = require("./commands/DetectPiiEntitiesCommand");
const DetectSentimentCommand_1 = require("./commands/DetectSentimentCommand");
const DetectSyntaxCommand_1 = require("./commands/DetectSyntaxCommand");
const ListDocumentClassificationJobsCommand_1 = require("./commands/ListDocumentClassificationJobsCommand");
const ListDocumentClassifiersCommand_1 = require("./commands/ListDocumentClassifiersCommand");
const ListDominantLanguageDetectionJobsCommand_1 = require("./commands/ListDominantLanguageDetectionJobsCommand");
const ListEndpointsCommand_1 = require("./commands/ListEndpointsCommand");
const ListEntitiesDetectionJobsCommand_1 = require("./commands/ListEntitiesDetectionJobsCommand");
const ListEntityRecognizersCommand_1 = require("./commands/ListEntityRecognizersCommand");
const ListEventsDetectionJobsCommand_1 = require("./commands/ListEventsDetectionJobsCommand");
const ListKeyPhrasesDetectionJobsCommand_1 = require("./commands/ListKeyPhrasesDetectionJobsCommand");
const ListPiiEntitiesDetectionJobsCommand_1 = require("./commands/ListPiiEntitiesDetectionJobsCommand");
const ListSentimentDetectionJobsCommand_1 = require("./commands/ListSentimentDetectionJobsCommand");
const ListTagsForResourceCommand_1 = require("./commands/ListTagsForResourceCommand");
const ListTopicsDetectionJobsCommand_1 = require("./commands/ListTopicsDetectionJobsCommand");
const StartDocumentClassificationJobCommand_1 = require("./commands/StartDocumentClassificationJobCommand");
const StartDominantLanguageDetectionJobCommand_1 = require("./commands/StartDominantLanguageDetectionJobCommand");
const StartEntitiesDetectionJobCommand_1 = require("./commands/StartEntitiesDetectionJobCommand");
const StartEventsDetectionJobCommand_1 = require("./commands/StartEventsDetectionJobCommand");
const StartKeyPhrasesDetectionJobCommand_1 = require("./commands/StartKeyPhrasesDetectionJobCommand");
const StartPiiEntitiesDetectionJobCommand_1 = require("./commands/StartPiiEntitiesDetectionJobCommand");
const StartSentimentDetectionJobCommand_1 = require("./commands/StartSentimentDetectionJobCommand");
const StartTopicsDetectionJobCommand_1 = require("./commands/StartTopicsDetectionJobCommand");
const StopDominantLanguageDetectionJobCommand_1 = require("./commands/StopDominantLanguageDetectionJobCommand");
const StopEntitiesDetectionJobCommand_1 = require("./commands/StopEntitiesDetectionJobCommand");
const StopEventsDetectionJobCommand_1 = require("./commands/StopEventsDetectionJobCommand");
const StopKeyPhrasesDetectionJobCommand_1 = require("./commands/StopKeyPhrasesDetectionJobCommand");
const StopPiiEntitiesDetectionJobCommand_1 = require("./commands/StopPiiEntitiesDetectionJobCommand");
const StopSentimentDetectionJobCommand_1 = require("./commands/StopSentimentDetectionJobCommand");
const StopTrainingDocumentClassifierCommand_1 = require("./commands/StopTrainingDocumentClassifierCommand");
const StopTrainingEntityRecognizerCommand_1 = require("./commands/StopTrainingEntityRecognizerCommand");
const TagResourceCommand_1 = require("./commands/TagResourceCommand");
const UntagResourceCommand_1 = require("./commands/UntagResourceCommand");
const UpdateEndpointCommand_1 = require("./commands/UpdateEndpointCommand");
/**
 * <p>Amazon Comprehend is an AWS service for gaining insight into the content of documents.
 *       Use these actions to determine the topics contained in your documents, the topics they
 *       discuss, the predominant sentiment expressed in them, the predominant language used, and
 *       more.</p>
 */
class Comprehend extends ComprehendClient_1.ComprehendClient {
    batchDetectDominantLanguage(args, optionsOrCb, cb) {
        const command = new BatchDetectDominantLanguageCommand_1.BatchDetectDominantLanguageCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    batchDetectEntities(args, optionsOrCb, cb) {
        const command = new BatchDetectEntitiesCommand_1.BatchDetectEntitiesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    batchDetectKeyPhrases(args, optionsOrCb, cb) {
        const command = new BatchDetectKeyPhrasesCommand_1.BatchDetectKeyPhrasesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    batchDetectSentiment(args, optionsOrCb, cb) {
        const command = new BatchDetectSentimentCommand_1.BatchDetectSentimentCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    batchDetectSyntax(args, optionsOrCb, cb) {
        const command = new BatchDetectSyntaxCommand_1.BatchDetectSyntaxCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    classifyDocument(args, optionsOrCb, cb) {
        const command = new ClassifyDocumentCommand_1.ClassifyDocumentCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createDocumentClassifier(args, optionsOrCb, cb) {
        const command = new CreateDocumentClassifierCommand_1.CreateDocumentClassifierCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createEndpoint(args, optionsOrCb, cb) {
        const command = new CreateEndpointCommand_1.CreateEndpointCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createEntityRecognizer(args, optionsOrCb, cb) {
        const command = new CreateEntityRecognizerCommand_1.CreateEntityRecognizerCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteDocumentClassifier(args, optionsOrCb, cb) {
        const command = new DeleteDocumentClassifierCommand_1.DeleteDocumentClassifierCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteEndpoint(args, optionsOrCb, cb) {
        const command = new DeleteEndpointCommand_1.DeleteEndpointCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteEntityRecognizer(args, optionsOrCb, cb) {
        const command = new DeleteEntityRecognizerCommand_1.DeleteEntityRecognizerCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeDocumentClassificationJob(args, optionsOrCb, cb) {
        const command = new DescribeDocumentClassificationJobCommand_1.DescribeDocumentClassificationJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeDocumentClassifier(args, optionsOrCb, cb) {
        const command = new DescribeDocumentClassifierCommand_1.DescribeDocumentClassifierCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeDominantLanguageDetectionJob(args, optionsOrCb, cb) {
        const command = new DescribeDominantLanguageDetectionJobCommand_1.DescribeDominantLanguageDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeEndpoint(args, optionsOrCb, cb) {
        const command = new DescribeEndpointCommand_1.DescribeEndpointCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeEntitiesDetectionJob(args, optionsOrCb, cb) {
        const command = new DescribeEntitiesDetectionJobCommand_1.DescribeEntitiesDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeEntityRecognizer(args, optionsOrCb, cb) {
        const command = new DescribeEntityRecognizerCommand_1.DescribeEntityRecognizerCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeEventsDetectionJob(args, optionsOrCb, cb) {
        const command = new DescribeEventsDetectionJobCommand_1.DescribeEventsDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeKeyPhrasesDetectionJob(args, optionsOrCb, cb) {
        const command = new DescribeKeyPhrasesDetectionJobCommand_1.DescribeKeyPhrasesDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describePiiEntitiesDetectionJob(args, optionsOrCb, cb) {
        const command = new DescribePiiEntitiesDetectionJobCommand_1.DescribePiiEntitiesDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeSentimentDetectionJob(args, optionsOrCb, cb) {
        const command = new DescribeSentimentDetectionJobCommand_1.DescribeSentimentDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeTopicsDetectionJob(args, optionsOrCb, cb) {
        const command = new DescribeTopicsDetectionJobCommand_1.DescribeTopicsDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    detectDominantLanguage(args, optionsOrCb, cb) {
        const command = new DetectDominantLanguageCommand_1.DetectDominantLanguageCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    detectEntities(args, optionsOrCb, cb) {
        const command = new DetectEntitiesCommand_1.DetectEntitiesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    detectKeyPhrases(args, optionsOrCb, cb) {
        const command = new DetectKeyPhrasesCommand_1.DetectKeyPhrasesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    detectPiiEntities(args, optionsOrCb, cb) {
        const command = new DetectPiiEntitiesCommand_1.DetectPiiEntitiesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    detectSentiment(args, optionsOrCb, cb) {
        const command = new DetectSentimentCommand_1.DetectSentimentCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    detectSyntax(args, optionsOrCb, cb) {
        const command = new DetectSyntaxCommand_1.DetectSyntaxCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listDocumentClassificationJobs(args, optionsOrCb, cb) {
        const command = new ListDocumentClassificationJobsCommand_1.ListDocumentClassificationJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listDocumentClassifiers(args, optionsOrCb, cb) {
        const command = new ListDocumentClassifiersCommand_1.ListDocumentClassifiersCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listDominantLanguageDetectionJobs(args, optionsOrCb, cb) {
        const command = new ListDominantLanguageDetectionJobsCommand_1.ListDominantLanguageDetectionJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listEndpoints(args, optionsOrCb, cb) {
        const command = new ListEndpointsCommand_1.ListEndpointsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listEntitiesDetectionJobs(args, optionsOrCb, cb) {
        const command = new ListEntitiesDetectionJobsCommand_1.ListEntitiesDetectionJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listEntityRecognizers(args, optionsOrCb, cb) {
        const command = new ListEntityRecognizersCommand_1.ListEntityRecognizersCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listEventsDetectionJobs(args, optionsOrCb, cb) {
        const command = new ListEventsDetectionJobsCommand_1.ListEventsDetectionJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listKeyPhrasesDetectionJobs(args, optionsOrCb, cb) {
        const command = new ListKeyPhrasesDetectionJobsCommand_1.ListKeyPhrasesDetectionJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listPiiEntitiesDetectionJobs(args, optionsOrCb, cb) {
        const command = new ListPiiEntitiesDetectionJobsCommand_1.ListPiiEntitiesDetectionJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listSentimentDetectionJobs(args, optionsOrCb, cb) {
        const command = new ListSentimentDetectionJobsCommand_1.ListSentimentDetectionJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listTagsForResource(args, optionsOrCb, cb) {
        const command = new ListTagsForResourceCommand_1.ListTagsForResourceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listTopicsDetectionJobs(args, optionsOrCb, cb) {
        const command = new ListTopicsDetectionJobsCommand_1.ListTopicsDetectionJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    startDocumentClassificationJob(args, optionsOrCb, cb) {
        const command = new StartDocumentClassificationJobCommand_1.StartDocumentClassificationJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    startDominantLanguageDetectionJob(args, optionsOrCb, cb) {
        const command = new StartDominantLanguageDetectionJobCommand_1.StartDominantLanguageDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    startEntitiesDetectionJob(args, optionsOrCb, cb) {
        const command = new StartEntitiesDetectionJobCommand_1.StartEntitiesDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    startEventsDetectionJob(args, optionsOrCb, cb) {
        const command = new StartEventsDetectionJobCommand_1.StartEventsDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    startKeyPhrasesDetectionJob(args, optionsOrCb, cb) {
        const command = new StartKeyPhrasesDetectionJobCommand_1.StartKeyPhrasesDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    startPiiEntitiesDetectionJob(args, optionsOrCb, cb) {
        const command = new StartPiiEntitiesDetectionJobCommand_1.StartPiiEntitiesDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    startSentimentDetectionJob(args, optionsOrCb, cb) {
        const command = new StartSentimentDetectionJobCommand_1.StartSentimentDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    startTopicsDetectionJob(args, optionsOrCb, cb) {
        const command = new StartTopicsDetectionJobCommand_1.StartTopicsDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    stopDominantLanguageDetectionJob(args, optionsOrCb, cb) {
        const command = new StopDominantLanguageDetectionJobCommand_1.StopDominantLanguageDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    stopEntitiesDetectionJob(args, optionsOrCb, cb) {
        const command = new StopEntitiesDetectionJobCommand_1.StopEntitiesDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    stopEventsDetectionJob(args, optionsOrCb, cb) {
        const command = new StopEventsDetectionJobCommand_1.StopEventsDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    stopKeyPhrasesDetectionJob(args, optionsOrCb, cb) {
        const command = new StopKeyPhrasesDetectionJobCommand_1.StopKeyPhrasesDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    stopPiiEntitiesDetectionJob(args, optionsOrCb, cb) {
        const command = new StopPiiEntitiesDetectionJobCommand_1.StopPiiEntitiesDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    stopSentimentDetectionJob(args, optionsOrCb, cb) {
        const command = new StopSentimentDetectionJobCommand_1.StopSentimentDetectionJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    stopTrainingDocumentClassifier(args, optionsOrCb, cb) {
        const command = new StopTrainingDocumentClassifierCommand_1.StopTrainingDocumentClassifierCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    stopTrainingEntityRecognizer(args, optionsOrCb, cb) {
        const command = new StopTrainingEntityRecognizerCommand_1.StopTrainingEntityRecognizerCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    tagResource(args, optionsOrCb, cb) {
        const command = new TagResourceCommand_1.TagResourceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    untagResource(args, optionsOrCb, cb) {
        const command = new UntagResourceCommand_1.UntagResourceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateEndpoint(args, optionsOrCb, cb) {
        const command = new UpdateEndpointCommand_1.UpdateEndpointCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
}
exports.Comprehend = Comprehend;
//# sourceMappingURL=Comprehend.js.map