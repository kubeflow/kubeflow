"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rekognition = void 0;
const RekognitionClient_1 = require("./RekognitionClient");
const CompareFacesCommand_1 = require("./commands/CompareFacesCommand");
const CreateCollectionCommand_1 = require("./commands/CreateCollectionCommand");
const CreateProjectCommand_1 = require("./commands/CreateProjectCommand");
const CreateProjectVersionCommand_1 = require("./commands/CreateProjectVersionCommand");
const CreateStreamProcessorCommand_1 = require("./commands/CreateStreamProcessorCommand");
const DeleteCollectionCommand_1 = require("./commands/DeleteCollectionCommand");
const DeleteFacesCommand_1 = require("./commands/DeleteFacesCommand");
const DeleteProjectCommand_1 = require("./commands/DeleteProjectCommand");
const DeleteProjectVersionCommand_1 = require("./commands/DeleteProjectVersionCommand");
const DeleteStreamProcessorCommand_1 = require("./commands/DeleteStreamProcessorCommand");
const DescribeCollectionCommand_1 = require("./commands/DescribeCollectionCommand");
const DescribeProjectVersionsCommand_1 = require("./commands/DescribeProjectVersionsCommand");
const DescribeProjectsCommand_1 = require("./commands/DescribeProjectsCommand");
const DescribeStreamProcessorCommand_1 = require("./commands/DescribeStreamProcessorCommand");
const DetectCustomLabelsCommand_1 = require("./commands/DetectCustomLabelsCommand");
const DetectFacesCommand_1 = require("./commands/DetectFacesCommand");
const DetectLabelsCommand_1 = require("./commands/DetectLabelsCommand");
const DetectModerationLabelsCommand_1 = require("./commands/DetectModerationLabelsCommand");
const DetectProtectiveEquipmentCommand_1 = require("./commands/DetectProtectiveEquipmentCommand");
const DetectTextCommand_1 = require("./commands/DetectTextCommand");
const GetCelebrityInfoCommand_1 = require("./commands/GetCelebrityInfoCommand");
const GetCelebrityRecognitionCommand_1 = require("./commands/GetCelebrityRecognitionCommand");
const GetContentModerationCommand_1 = require("./commands/GetContentModerationCommand");
const GetFaceDetectionCommand_1 = require("./commands/GetFaceDetectionCommand");
const GetFaceSearchCommand_1 = require("./commands/GetFaceSearchCommand");
const GetLabelDetectionCommand_1 = require("./commands/GetLabelDetectionCommand");
const GetPersonTrackingCommand_1 = require("./commands/GetPersonTrackingCommand");
const GetSegmentDetectionCommand_1 = require("./commands/GetSegmentDetectionCommand");
const GetTextDetectionCommand_1 = require("./commands/GetTextDetectionCommand");
const IndexFacesCommand_1 = require("./commands/IndexFacesCommand");
const ListCollectionsCommand_1 = require("./commands/ListCollectionsCommand");
const ListFacesCommand_1 = require("./commands/ListFacesCommand");
const ListStreamProcessorsCommand_1 = require("./commands/ListStreamProcessorsCommand");
const RecognizeCelebritiesCommand_1 = require("./commands/RecognizeCelebritiesCommand");
const SearchFacesByImageCommand_1 = require("./commands/SearchFacesByImageCommand");
const SearchFacesCommand_1 = require("./commands/SearchFacesCommand");
const StartCelebrityRecognitionCommand_1 = require("./commands/StartCelebrityRecognitionCommand");
const StartContentModerationCommand_1 = require("./commands/StartContentModerationCommand");
const StartFaceDetectionCommand_1 = require("./commands/StartFaceDetectionCommand");
const StartFaceSearchCommand_1 = require("./commands/StartFaceSearchCommand");
const StartLabelDetectionCommand_1 = require("./commands/StartLabelDetectionCommand");
const StartPersonTrackingCommand_1 = require("./commands/StartPersonTrackingCommand");
const StartProjectVersionCommand_1 = require("./commands/StartProjectVersionCommand");
const StartSegmentDetectionCommand_1 = require("./commands/StartSegmentDetectionCommand");
const StartStreamProcessorCommand_1 = require("./commands/StartStreamProcessorCommand");
const StartTextDetectionCommand_1 = require("./commands/StartTextDetectionCommand");
const StopProjectVersionCommand_1 = require("./commands/StopProjectVersionCommand");
const StopStreamProcessorCommand_1 = require("./commands/StopStreamProcessorCommand");
/**
 * <p>This is the Amazon Rekognition API reference.</p>
 */
class Rekognition extends RekognitionClient_1.RekognitionClient {
    compareFaces(args, optionsOrCb, cb) {
        const command = new CompareFacesCommand_1.CompareFacesCommand(args);
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
    createCollection(args, optionsOrCb, cb) {
        const command = new CreateCollectionCommand_1.CreateCollectionCommand(args);
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
    createProject(args, optionsOrCb, cb) {
        const command = new CreateProjectCommand_1.CreateProjectCommand(args);
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
    createProjectVersion(args, optionsOrCb, cb) {
        const command = new CreateProjectVersionCommand_1.CreateProjectVersionCommand(args);
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
    createStreamProcessor(args, optionsOrCb, cb) {
        const command = new CreateStreamProcessorCommand_1.CreateStreamProcessorCommand(args);
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
    deleteCollection(args, optionsOrCb, cb) {
        const command = new DeleteCollectionCommand_1.DeleteCollectionCommand(args);
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
    deleteFaces(args, optionsOrCb, cb) {
        const command = new DeleteFacesCommand_1.DeleteFacesCommand(args);
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
    deleteProject(args, optionsOrCb, cb) {
        const command = new DeleteProjectCommand_1.DeleteProjectCommand(args);
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
    deleteProjectVersion(args, optionsOrCb, cb) {
        const command = new DeleteProjectVersionCommand_1.DeleteProjectVersionCommand(args);
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
    deleteStreamProcessor(args, optionsOrCb, cb) {
        const command = new DeleteStreamProcessorCommand_1.DeleteStreamProcessorCommand(args);
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
    describeCollection(args, optionsOrCb, cb) {
        const command = new DescribeCollectionCommand_1.DescribeCollectionCommand(args);
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
    describeProjects(args, optionsOrCb, cb) {
        const command = new DescribeProjectsCommand_1.DescribeProjectsCommand(args);
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
    describeProjectVersions(args, optionsOrCb, cb) {
        const command = new DescribeProjectVersionsCommand_1.DescribeProjectVersionsCommand(args);
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
    describeStreamProcessor(args, optionsOrCb, cb) {
        const command = new DescribeStreamProcessorCommand_1.DescribeStreamProcessorCommand(args);
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
    detectCustomLabels(args, optionsOrCb, cb) {
        const command = new DetectCustomLabelsCommand_1.DetectCustomLabelsCommand(args);
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
    detectFaces(args, optionsOrCb, cb) {
        const command = new DetectFacesCommand_1.DetectFacesCommand(args);
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
    detectLabels(args, optionsOrCb, cb) {
        const command = new DetectLabelsCommand_1.DetectLabelsCommand(args);
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
    detectModerationLabels(args, optionsOrCb, cb) {
        const command = new DetectModerationLabelsCommand_1.DetectModerationLabelsCommand(args);
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
    detectProtectiveEquipment(args, optionsOrCb, cb) {
        const command = new DetectProtectiveEquipmentCommand_1.DetectProtectiveEquipmentCommand(args);
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
    detectText(args, optionsOrCb, cb) {
        const command = new DetectTextCommand_1.DetectTextCommand(args);
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
    getCelebrityInfo(args, optionsOrCb, cb) {
        const command = new GetCelebrityInfoCommand_1.GetCelebrityInfoCommand(args);
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
    getCelebrityRecognition(args, optionsOrCb, cb) {
        const command = new GetCelebrityRecognitionCommand_1.GetCelebrityRecognitionCommand(args);
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
    getContentModeration(args, optionsOrCb, cb) {
        const command = new GetContentModerationCommand_1.GetContentModerationCommand(args);
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
    getFaceDetection(args, optionsOrCb, cb) {
        const command = new GetFaceDetectionCommand_1.GetFaceDetectionCommand(args);
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
    getFaceSearch(args, optionsOrCb, cb) {
        const command = new GetFaceSearchCommand_1.GetFaceSearchCommand(args);
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
    getLabelDetection(args, optionsOrCb, cb) {
        const command = new GetLabelDetectionCommand_1.GetLabelDetectionCommand(args);
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
    getPersonTracking(args, optionsOrCb, cb) {
        const command = new GetPersonTrackingCommand_1.GetPersonTrackingCommand(args);
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
    getSegmentDetection(args, optionsOrCb, cb) {
        const command = new GetSegmentDetectionCommand_1.GetSegmentDetectionCommand(args);
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
    getTextDetection(args, optionsOrCb, cb) {
        const command = new GetTextDetectionCommand_1.GetTextDetectionCommand(args);
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
    indexFaces(args, optionsOrCb, cb) {
        const command = new IndexFacesCommand_1.IndexFacesCommand(args);
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
    listCollections(args, optionsOrCb, cb) {
        const command = new ListCollectionsCommand_1.ListCollectionsCommand(args);
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
    listFaces(args, optionsOrCb, cb) {
        const command = new ListFacesCommand_1.ListFacesCommand(args);
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
    listStreamProcessors(args, optionsOrCb, cb) {
        const command = new ListStreamProcessorsCommand_1.ListStreamProcessorsCommand(args);
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
    recognizeCelebrities(args, optionsOrCb, cb) {
        const command = new RecognizeCelebritiesCommand_1.RecognizeCelebritiesCommand(args);
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
    searchFaces(args, optionsOrCb, cb) {
        const command = new SearchFacesCommand_1.SearchFacesCommand(args);
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
    searchFacesByImage(args, optionsOrCb, cb) {
        const command = new SearchFacesByImageCommand_1.SearchFacesByImageCommand(args);
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
    startCelebrityRecognition(args, optionsOrCb, cb) {
        const command = new StartCelebrityRecognitionCommand_1.StartCelebrityRecognitionCommand(args);
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
    startContentModeration(args, optionsOrCb, cb) {
        const command = new StartContentModerationCommand_1.StartContentModerationCommand(args);
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
    startFaceDetection(args, optionsOrCb, cb) {
        const command = new StartFaceDetectionCommand_1.StartFaceDetectionCommand(args);
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
    startFaceSearch(args, optionsOrCb, cb) {
        const command = new StartFaceSearchCommand_1.StartFaceSearchCommand(args);
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
    startLabelDetection(args, optionsOrCb, cb) {
        const command = new StartLabelDetectionCommand_1.StartLabelDetectionCommand(args);
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
    startPersonTracking(args, optionsOrCb, cb) {
        const command = new StartPersonTrackingCommand_1.StartPersonTrackingCommand(args);
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
    startProjectVersion(args, optionsOrCb, cb) {
        const command = new StartProjectVersionCommand_1.StartProjectVersionCommand(args);
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
    startSegmentDetection(args, optionsOrCb, cb) {
        const command = new StartSegmentDetectionCommand_1.StartSegmentDetectionCommand(args);
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
    startStreamProcessor(args, optionsOrCb, cb) {
        const command = new StartStreamProcessorCommand_1.StartStreamProcessorCommand(args);
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
    startTextDetection(args, optionsOrCb, cb) {
        const command = new StartTextDetectionCommand_1.StartTextDetectionCommand(args);
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
    stopProjectVersion(args, optionsOrCb, cb) {
        const command = new StopProjectVersionCommand_1.StopProjectVersionCommand(args);
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
    stopStreamProcessor(args, optionsOrCb, cb) {
        const command = new StopStreamProcessorCommand_1.StopStreamProcessorCommand(args);
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
exports.Rekognition = Rekognition;
//# sourceMappingURL=Rekognition.js.map