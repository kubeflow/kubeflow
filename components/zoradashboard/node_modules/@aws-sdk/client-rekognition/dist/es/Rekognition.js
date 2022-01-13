import { __extends } from "tslib";
import { RekognitionClient } from "./RekognitionClient";
import { CompareFacesCommand, } from "./commands/CompareFacesCommand";
import { CreateCollectionCommand, } from "./commands/CreateCollectionCommand";
import { CreateProjectCommand, } from "./commands/CreateProjectCommand";
import { CreateProjectVersionCommand, } from "./commands/CreateProjectVersionCommand";
import { CreateStreamProcessorCommand, } from "./commands/CreateStreamProcessorCommand";
import { DeleteCollectionCommand, } from "./commands/DeleteCollectionCommand";
import { DeleteFacesCommand } from "./commands/DeleteFacesCommand";
import { DeleteProjectCommand, } from "./commands/DeleteProjectCommand";
import { DeleteProjectVersionCommand, } from "./commands/DeleteProjectVersionCommand";
import { DeleteStreamProcessorCommand, } from "./commands/DeleteStreamProcessorCommand";
import { DescribeCollectionCommand, } from "./commands/DescribeCollectionCommand";
import { DescribeProjectVersionsCommand, } from "./commands/DescribeProjectVersionsCommand";
import { DescribeProjectsCommand, } from "./commands/DescribeProjectsCommand";
import { DescribeStreamProcessorCommand, } from "./commands/DescribeStreamProcessorCommand";
import { DetectCustomLabelsCommand, } from "./commands/DetectCustomLabelsCommand";
import { DetectFacesCommand } from "./commands/DetectFacesCommand";
import { DetectLabelsCommand, } from "./commands/DetectLabelsCommand";
import { DetectModerationLabelsCommand, } from "./commands/DetectModerationLabelsCommand";
import { DetectProtectiveEquipmentCommand, } from "./commands/DetectProtectiveEquipmentCommand";
import { DetectTextCommand } from "./commands/DetectTextCommand";
import { GetCelebrityInfoCommand, } from "./commands/GetCelebrityInfoCommand";
import { GetCelebrityRecognitionCommand, } from "./commands/GetCelebrityRecognitionCommand";
import { GetContentModerationCommand, } from "./commands/GetContentModerationCommand";
import { GetFaceDetectionCommand, } from "./commands/GetFaceDetectionCommand";
import { GetFaceSearchCommand, } from "./commands/GetFaceSearchCommand";
import { GetLabelDetectionCommand, } from "./commands/GetLabelDetectionCommand";
import { GetPersonTrackingCommand, } from "./commands/GetPersonTrackingCommand";
import { GetSegmentDetectionCommand, } from "./commands/GetSegmentDetectionCommand";
import { GetTextDetectionCommand, } from "./commands/GetTextDetectionCommand";
import { IndexFacesCommand } from "./commands/IndexFacesCommand";
import { ListCollectionsCommand, } from "./commands/ListCollectionsCommand";
import { ListFacesCommand } from "./commands/ListFacesCommand";
import { ListStreamProcessorsCommand, } from "./commands/ListStreamProcessorsCommand";
import { RecognizeCelebritiesCommand, } from "./commands/RecognizeCelebritiesCommand";
import { SearchFacesByImageCommand, } from "./commands/SearchFacesByImageCommand";
import { SearchFacesCommand } from "./commands/SearchFacesCommand";
import { StartCelebrityRecognitionCommand, } from "./commands/StartCelebrityRecognitionCommand";
import { StartContentModerationCommand, } from "./commands/StartContentModerationCommand";
import { StartFaceDetectionCommand, } from "./commands/StartFaceDetectionCommand";
import { StartFaceSearchCommand, } from "./commands/StartFaceSearchCommand";
import { StartLabelDetectionCommand, } from "./commands/StartLabelDetectionCommand";
import { StartPersonTrackingCommand, } from "./commands/StartPersonTrackingCommand";
import { StartProjectVersionCommand, } from "./commands/StartProjectVersionCommand";
import { StartSegmentDetectionCommand, } from "./commands/StartSegmentDetectionCommand";
import { StartStreamProcessorCommand, } from "./commands/StartStreamProcessorCommand";
import { StartTextDetectionCommand, } from "./commands/StartTextDetectionCommand";
import { StopProjectVersionCommand, } from "./commands/StopProjectVersionCommand";
import { StopStreamProcessorCommand, } from "./commands/StopStreamProcessorCommand";
/**
 * <p>This is the Amazon Rekognition API reference.</p>
 */
var Rekognition = /** @class */ (function (_super) {
    __extends(Rekognition, _super);
    function Rekognition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rekognition.prototype.compareFaces = function (args, optionsOrCb, cb) {
        var command = new CompareFacesCommand(args);
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
    Rekognition.prototype.createCollection = function (args, optionsOrCb, cb) {
        var command = new CreateCollectionCommand(args);
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
    Rekognition.prototype.createProject = function (args, optionsOrCb, cb) {
        var command = new CreateProjectCommand(args);
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
    Rekognition.prototype.createProjectVersion = function (args, optionsOrCb, cb) {
        var command = new CreateProjectVersionCommand(args);
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
    Rekognition.prototype.createStreamProcessor = function (args, optionsOrCb, cb) {
        var command = new CreateStreamProcessorCommand(args);
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
    Rekognition.prototype.deleteCollection = function (args, optionsOrCb, cb) {
        var command = new DeleteCollectionCommand(args);
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
    Rekognition.prototype.deleteFaces = function (args, optionsOrCb, cb) {
        var command = new DeleteFacesCommand(args);
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
    Rekognition.prototype.deleteProject = function (args, optionsOrCb, cb) {
        var command = new DeleteProjectCommand(args);
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
    Rekognition.prototype.deleteProjectVersion = function (args, optionsOrCb, cb) {
        var command = new DeleteProjectVersionCommand(args);
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
    Rekognition.prototype.deleteStreamProcessor = function (args, optionsOrCb, cb) {
        var command = new DeleteStreamProcessorCommand(args);
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
    Rekognition.prototype.describeCollection = function (args, optionsOrCb, cb) {
        var command = new DescribeCollectionCommand(args);
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
    Rekognition.prototype.describeProjects = function (args, optionsOrCb, cb) {
        var command = new DescribeProjectsCommand(args);
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
    Rekognition.prototype.describeProjectVersions = function (args, optionsOrCb, cb) {
        var command = new DescribeProjectVersionsCommand(args);
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
    Rekognition.prototype.describeStreamProcessor = function (args, optionsOrCb, cb) {
        var command = new DescribeStreamProcessorCommand(args);
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
    Rekognition.prototype.detectCustomLabels = function (args, optionsOrCb, cb) {
        var command = new DetectCustomLabelsCommand(args);
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
    Rekognition.prototype.detectFaces = function (args, optionsOrCb, cb) {
        var command = new DetectFacesCommand(args);
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
    Rekognition.prototype.detectLabels = function (args, optionsOrCb, cb) {
        var command = new DetectLabelsCommand(args);
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
    Rekognition.prototype.detectModerationLabels = function (args, optionsOrCb, cb) {
        var command = new DetectModerationLabelsCommand(args);
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
    Rekognition.prototype.detectProtectiveEquipment = function (args, optionsOrCb, cb) {
        var command = new DetectProtectiveEquipmentCommand(args);
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
    Rekognition.prototype.detectText = function (args, optionsOrCb, cb) {
        var command = new DetectTextCommand(args);
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
    Rekognition.prototype.getCelebrityInfo = function (args, optionsOrCb, cb) {
        var command = new GetCelebrityInfoCommand(args);
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
    Rekognition.prototype.getCelebrityRecognition = function (args, optionsOrCb, cb) {
        var command = new GetCelebrityRecognitionCommand(args);
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
    Rekognition.prototype.getContentModeration = function (args, optionsOrCb, cb) {
        var command = new GetContentModerationCommand(args);
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
    Rekognition.prototype.getFaceDetection = function (args, optionsOrCb, cb) {
        var command = new GetFaceDetectionCommand(args);
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
    Rekognition.prototype.getFaceSearch = function (args, optionsOrCb, cb) {
        var command = new GetFaceSearchCommand(args);
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
    Rekognition.prototype.getLabelDetection = function (args, optionsOrCb, cb) {
        var command = new GetLabelDetectionCommand(args);
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
    Rekognition.prototype.getPersonTracking = function (args, optionsOrCb, cb) {
        var command = new GetPersonTrackingCommand(args);
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
    Rekognition.prototype.getSegmentDetection = function (args, optionsOrCb, cb) {
        var command = new GetSegmentDetectionCommand(args);
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
    Rekognition.prototype.getTextDetection = function (args, optionsOrCb, cb) {
        var command = new GetTextDetectionCommand(args);
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
    Rekognition.prototype.indexFaces = function (args, optionsOrCb, cb) {
        var command = new IndexFacesCommand(args);
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
    Rekognition.prototype.listCollections = function (args, optionsOrCb, cb) {
        var command = new ListCollectionsCommand(args);
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
    Rekognition.prototype.listFaces = function (args, optionsOrCb, cb) {
        var command = new ListFacesCommand(args);
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
    Rekognition.prototype.listStreamProcessors = function (args, optionsOrCb, cb) {
        var command = new ListStreamProcessorsCommand(args);
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
    Rekognition.prototype.recognizeCelebrities = function (args, optionsOrCb, cb) {
        var command = new RecognizeCelebritiesCommand(args);
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
    Rekognition.prototype.searchFaces = function (args, optionsOrCb, cb) {
        var command = new SearchFacesCommand(args);
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
    Rekognition.prototype.searchFacesByImage = function (args, optionsOrCb, cb) {
        var command = new SearchFacesByImageCommand(args);
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
    Rekognition.prototype.startCelebrityRecognition = function (args, optionsOrCb, cb) {
        var command = new StartCelebrityRecognitionCommand(args);
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
    Rekognition.prototype.startContentModeration = function (args, optionsOrCb, cb) {
        var command = new StartContentModerationCommand(args);
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
    Rekognition.prototype.startFaceDetection = function (args, optionsOrCb, cb) {
        var command = new StartFaceDetectionCommand(args);
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
    Rekognition.prototype.startFaceSearch = function (args, optionsOrCb, cb) {
        var command = new StartFaceSearchCommand(args);
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
    Rekognition.prototype.startLabelDetection = function (args, optionsOrCb, cb) {
        var command = new StartLabelDetectionCommand(args);
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
    Rekognition.prototype.startPersonTracking = function (args, optionsOrCb, cb) {
        var command = new StartPersonTrackingCommand(args);
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
    Rekognition.prototype.startProjectVersion = function (args, optionsOrCb, cb) {
        var command = new StartProjectVersionCommand(args);
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
    Rekognition.prototype.startSegmentDetection = function (args, optionsOrCb, cb) {
        var command = new StartSegmentDetectionCommand(args);
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
    Rekognition.prototype.startStreamProcessor = function (args, optionsOrCb, cb) {
        var command = new StartStreamProcessorCommand(args);
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
    Rekognition.prototype.startTextDetection = function (args, optionsOrCb, cb) {
        var command = new StartTextDetectionCommand(args);
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
    Rekognition.prototype.stopProjectVersion = function (args, optionsOrCb, cb) {
        var command = new StopProjectVersionCommand(args);
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
    Rekognition.prototype.stopStreamProcessor = function (args, optionsOrCb, cb) {
        var command = new StopStreamProcessorCommand(args);
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
    return Rekognition;
}(RekognitionClient));
export { Rekognition };
//# sourceMappingURL=Rekognition.js.map