"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@aws-amplify/core");
var storage_1 = __importDefault(require("@aws-amplify/storage"));
var Providers_1 = require("../types/Providers");
var client_rekognition_1 = require("@aws-sdk/client-rekognition");
var types_1 = require("../types");
var client_textract_1 = require("@aws-sdk/client-textract");
var Utils_1 = require("./Utils");
var IdentifyTextUtils_1 = require("./IdentifyTextUtils");
var AmazonAIIdentifyPredictionsProvider = /** @class */ (function (_super) {
    __extends(AmazonAIIdentifyPredictionsProvider, _super);
    function AmazonAIIdentifyPredictionsProvider() {
        return _super.call(this) || this;
    }
    AmazonAIIdentifyPredictionsProvider.prototype.getProviderName = function () {
        return 'AmazonAIIdentifyPredictionsProvider';
    };
    /**
     * Verify user input source and converts it into source object readable by Rekognition and Textract.
     * Note that Rekognition and Textract use the same source interface, so we need not worry about types.
     * @param {IdentifySource} source - User input source that directs to the object user wants
     * to identify (storage, file, or bytes).
     * @return {Promise<Image>} - Promise resolving to the converted source object.
     */
    AmazonAIIdentifyPredictionsProvider.prototype.configureSource = function (source) {
        return new Promise(function (res, rej) {
            if (types_1.isStorageSource(source)) {
                var storageConfig = {
                    level: source.level,
                    identityId: source.identityId,
                };
                storage_1.default.get(source.key, storageConfig)
                    .then(function (url) {
                    var parser = /https:\/\/([a-zA-Z0-9%-_.]+)\.s3\.[A-Za-z0-9%-._~]+\/([a-zA-Z0-9%-._~/]+)\?/;
                    var parsedURL = url.match(parser);
                    if (parsedURL.length < 3)
                        rej('Invalid S3 key was given.');
                    res({
                        S3Object: {
                            Bucket: parsedURL[1],
                            Name: decodeURIComponent(parsedURL[2]),
                        },
                    });
                })
                    .catch(function (err) { return rej(err); });
            }
            else if (types_1.isFileSource(source)) {
                Utils_1.blobToArrayBuffer(source.file)
                    .then(function (buffer) {
                    res({ Bytes: new Uint8Array(buffer) });
                })
                    .catch(function (err) { return rej(err); });
            }
            else if (types_1.isBytesSource(source)) {
                var bytes = source.bytes;
                if (bytes instanceof Blob) {
                    Utils_1.blobToArrayBuffer(bytes)
                        .then(function (buffer) {
                        res({ Bytes: new Uint8Array(buffer) });
                    })
                        .catch(function (err) { return rej(err); });
                }
                if (bytes instanceof ArrayBuffer || bytes instanceof Buffer) {
                    res({ Bytes: new Uint8Array(bytes) });
                }
                // everything else can be directly passed to Rekognition / Textract.
                res({ Bytes: bytes });
            }
            else {
                rej('Input source is not configured correctly.');
            }
        });
    };
    /**
     * Recognize text from real-world images and documents (plain text, forms and tables). Detects text in the input
     * image and converts it into machine-readable text.
     * @param {IdentifySource} source - Object containing the source image and feature types to analyze.
     * @return {Promise<IdentifyTextOutput>} - Promise resolving to object containing identified texts.
     */
    AmazonAIIdentifyPredictionsProvider.prototype.identifyText = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, _a, _b, _c, region, _d, _e, configFormat, inputDocument, err_1, format, featureTypes, textractParam, rekognitionParam, detectTextCommand, rekognitionData, rekognitionResponse, detectDocumentTextCommand, Blocks, err_2, param, analyzeDocumentCommand, Blocks, err_3;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, core_1.Credentials.get()];
                    case 1:
                        credentials = _f.sent();
                        if (!credentials)
                            return [2 /*return*/, Promise.reject('No credentials')];
                        _a = this._config.identifyText, _b = _a === void 0 ? {} : _a, _c = _b.region, region = _c === void 0 ? '' : _c, _d = _b.defaults, _e = (_d === void 0 ? {} : _d).format, configFormat = _e === void 0 ? 'PLAIN' : _e;
                        this.rekognitionClient = new client_rekognition_1.RekognitionClient({
                            region: region,
                            credentials: credentials,
                            customUserAgent: core_1.getAmplifyUserAgent(),
                        });
                        this.textractClient = new client_textract_1.TextractClient({
                            region: region,
                            credentials: credentials,
                            customUserAgent: core_1.getAmplifyUserAgent(),
                        });
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.configureSource(input.text.source)];
                    case 3:
                        inputDocument = _f.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _f.sent();
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 5:
                        format = input.text.format || configFormat;
                        featureTypes = [];
                        if (format === 'FORM' || format === 'ALL')
                            featureTypes.push('FORMS');
                        if (format === 'TABLE' || format === 'ALL')
                            featureTypes.push('TABLES');
                        if (!(featureTypes.length === 0)) return [3 /*break*/, 11];
                        textractParam = {
                            Document: inputDocument,
                        };
                        rekognitionParam = {
                            Image: inputDocument,
                        };
                        _f.label = 6;
                    case 6:
                        _f.trys.push([6, 9, , 10]);
                        detectTextCommand = new client_rekognition_1.DetectTextCommand(rekognitionParam);
                        return [4 /*yield*/, this.rekognitionClient.send(detectTextCommand)];
                    case 7:
                        rekognitionData = _f.sent();
                        rekognitionResponse = IdentifyTextUtils_1.categorizeRekognitionBlocks(rekognitionData.TextDetections);
                        if (rekognitionResponse.text.words.length < 50) {
                            // did not hit the word limit, return the data
                            return [2 /*return*/, rekognitionResponse];
                        }
                        detectDocumentTextCommand = new client_textract_1.DetectDocumentTextCommand(textractParam);
                        return [4 /*yield*/, this.textractClient.send(detectDocumentTextCommand)];
                    case 8:
                        Blocks = (_f.sent()).Blocks;
                        if (rekognitionData.TextDetections.length > Blocks.length) {
                            return [2 /*return*/, rekognitionResponse];
                        }
                        return [2 /*return*/, IdentifyTextUtils_1.categorizeTextractBlocks(Blocks)];
                    case 9:
                        err_2 = _f.sent();
                        Promise.reject(err_2);
                        return [3 /*break*/, 10];
                    case 10: return [3 /*break*/, 15];
                    case 11:
                        param = {
                            Document: inputDocument,
                            FeatureTypes: featureTypes,
                        };
                        _f.label = 12;
                    case 12:
                        _f.trys.push([12, 14, , 15]);
                        analyzeDocumentCommand = new client_textract_1.AnalyzeDocumentCommand(param);
                        return [4 /*yield*/, this.textractClient.send(analyzeDocumentCommand)];
                    case 13:
                        Blocks = (_f.sent()).Blocks;
                        return [2 /*return*/, IdentifyTextUtils_1.categorizeTextractBlocks(Blocks)];
                    case 14:
                        err_3 = _f.sent();
                        return [2 /*return*/, Promise.reject(err_3)];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Identify instances of real world entities from an image and if it contains unsafe content.
     * @param {IdentifyLabelsInput} input - Object containing the source image and entity type to identify.
     * @return {Promise<IdentifyLabelsOutput>} - Promise resolving to an array of identified entities.
     */
    AmazonAIIdentifyPredictionsProvider.prototype.identifyLabels = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, _a, _b, _c, region, _d, _e, type, inputImage_1, param, servicePromises, entityType, err_4;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, core_1.Credentials.get()];
                    case 1:
                        credentials = _f.sent();
                        if (!credentials)
                            return [2 /*return*/, Promise.reject('No credentials')];
                        _a = this._config.identifyLabels, _b = _a === void 0 ? {} : _a, _c = _b.region, region = _c === void 0 ? '' : _c, _d = _b.defaults, _e = (_d === void 0 ? {} : _d).type, type = _e === void 0 ? 'LABELS' : _e;
                        this.rekognitionClient = new client_rekognition_1.RekognitionClient({
                            region: region,
                            credentials: credentials,
                            customUserAgent: core_1.getAmplifyUserAgent(),
                        });
                        return [4 /*yield*/, this.configureSource(input.labels.source)
                                .then(function (data) {
                                inputImage_1 = data;
                            })
                                .catch(function (err) {
                                return Promise.reject(err);
                            })];
                    case 2:
                        _f.sent();
                        param = { Image: inputImage_1 };
                        servicePromises = [];
                        entityType = input.labels.type || type;
                        if (entityType === 'LABELS' || entityType === 'ALL') {
                            servicePromises.push(this.detectLabels(param));
                        }
                        if (entityType === 'UNSAFE' || entityType === 'ALL') {
                            servicePromises.push(this.detectModerationLabels(param));
                        }
                        return [2 /*return*/, Promise.all(servicePromises)
                                .then(function (data) {
                                var identifyResult = {};
                                // concatenate resolved promises to a single object
                                data.forEach(function (val) {
                                    identifyResult = __assign(__assign({}, identifyResult), val);
                                });
                                return identifyResult;
                            })
                                .catch(function (err) { return Promise.reject(err); })];
                    case 3:
                        err_4 = _f.sent();
                        return [2 /*return*/, Promise.reject(err_4)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Calls Rekognition.detectLabels and organizes the returned data.
     * @param {DetectLabelsInput} param - parameter to be passed onto Rekognition
     * @return {Promise<IdentifyLabelsOutput>} - Promise resolving to organized detectLabels response.
     */
    AmazonAIIdentifyPredictionsProvider.prototype.detectLabels = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var detectLabelsCommand, data, detectLabelData, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        detectLabelsCommand = new client_rekognition_1.DetectLabelsCommand(param);
                        return [4 /*yield*/, this.rekognitionClient.send(detectLabelsCommand)];
                    case 1:
                        data = _a.sent();
                        if (!data.Labels)
                            return [2 /*return*/, { labels: null }]; // no image was detected
                        detectLabelData = data.Labels.map(function (val) {
                            var boxes = val.Instances
                                ? val.Instances.map(function (val) { return Utils_1.makeCamelCase(val.BoundingBox); })
                                : undefined;
                            return {
                                name: val.Name,
                                boundingBoxes: boxes,
                                metadata: {
                                    confidence: val.Confidence,
                                    parents: Utils_1.makeCamelCaseArray(val.Parents),
                                },
                            };
                        });
                        return [2 /*return*/, { labels: detectLabelData }];
                    case 2:
                        err_5 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_5)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Calls Rekognition.detectModerationLabels and organizes the returned data.
     * @param {Rekognition.DetectLabelsRequest} param - Parameter to be passed onto Rekognition
     * @return {Promise<IdentifyLabelsOutput>} - Promise resolving to organized detectModerationLabels response.
     */
    AmazonAIIdentifyPredictionsProvider.prototype.detectModerationLabels = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var detectModerationLabelsCommand, data, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        detectModerationLabelsCommand = new client_rekognition_1.DetectModerationLabelsCommand(param);
                        return [4 /*yield*/, this.rekognitionClient.send(detectModerationLabelsCommand)];
                    case 1:
                        data = _a.sent();
                        if (data.ModerationLabels.length !== 0) {
                            return [2 /*return*/, { unsafe: 'YES' }];
                        }
                        else {
                            return [2 /*return*/, { unsafe: 'NO' }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_6)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Identify faces within an image that is provided as input, and match faces from a collection
     * or identify celebrities.
     * @param {IdentifyEntityInput} input - object containing the source image and face match options.
     * @return {Promise<IdentifyEntityOutput>} Promise resolving to identify results.
     */
    AmazonAIIdentifyPredictionsProvider.prototype.identifyEntities = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, _a, _b, _c, region, _d, celebrityDetectionEnabled, _e, _f, _g, collectionIdConfig, _h, maxFacesConfig, inputImage, param, recognizeCelebritiesCommand, data, faces, err_7, _j, _k, collectionId, _l, maxFaces, updatedParam, searchFacesByImageCommand, data, faces, err_8, detectFacesCommand, data, faces, err_9;
            var _this = this;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0: return [4 /*yield*/, core_1.Credentials.get()];
                    case 1:
                        credentials = _m.sent();
                        if (!credentials)
                            return [2 /*return*/, Promise.reject('No credentials')];
                        _a = this._config.identifyEntities, _b = _a === void 0 ? {} : _a, _c = _b.region, region = _c === void 0 ? '' : _c, _d = _b.celebrityDetectionEnabled, celebrityDetectionEnabled = _d === void 0 ? false : _d, _e = _b.defaults, _f = _e === void 0 ? {} : _e, _g = _f.collectionId, collectionIdConfig = _g === void 0 ? '' : _g, _h = _f.maxEntities, maxFacesConfig = _h === void 0 ? 50 : _h;
                        // default arguments
                        this.rekognitionClient = new client_rekognition_1.RekognitionClient({
                            region: region,
                            credentials: credentials,
                            customUserAgent: core_1.getAmplifyUserAgent(),
                        });
                        return [4 /*yield*/, this.configureSource(input.entities.source)
                                .then(function (data) { return (inputImage = data); })
                                .catch(function (err) {
                                return Promise.reject(err);
                            })];
                    case 2:
                        _m.sent();
                        param = { Attributes: ['ALL'], Image: inputImage };
                        if (!(types_1.isIdentifyCelebrities(input.entities) &&
                            input.entities.celebrityDetection)) return [3 /*break*/, 7];
                        if (!celebrityDetectionEnabled) {
                            return [2 /*return*/, Promise.reject('Error: You have to enable celebrity detection first')];
                        }
                        _m.label = 3;
                    case 3:
                        _m.trys.push([3, 5, , 6]);
                        recognizeCelebritiesCommand = new client_rekognition_1.RecognizeCelebritiesCommand(param);
                        return [4 /*yield*/, this.rekognitionClient.send(recognizeCelebritiesCommand)];
                    case 4:
                        data = _m.sent();
                        faces = data.CelebrityFaces.map(function (celebrity) {
                            return {
                                boundingBox: Utils_1.makeCamelCase(celebrity.Face.BoundingBox),
                                landmarks: Utils_1.makeCamelCaseArray(celebrity.Face.Landmarks),
                                metadata: __assign(__assign({}, Utils_1.makeCamelCase(celebrity, ['Id', 'Name', 'Urls'])), { pose: Utils_1.makeCamelCase(celebrity.Face.Pose) }),
                            };
                        });
                        return [2 /*return*/, { entities: faces }];
                    case 5:
                        err_7 = _m.sent();
                        return [2 /*return*/, Promise.reject(err_7)];
                    case 6: return [3 /*break*/, 15];
                    case 7:
                        if (!(types_1.isIdentifyFromCollection(input.entities) &&
                            input.entities.collection)) return [3 /*break*/, 12];
                        _j = input.entities, _k = _j.collectionId, collectionId = _k === void 0 ? collectionIdConfig : _k, _l = _j.maxEntities, maxFaces = _l === void 0 ? maxFacesConfig : _l;
                        updatedParam = __assign(__assign({}, param), { CollectionId: collectionId, MaxFaces: maxFaces });
                        _m.label = 8;
                    case 8:
                        _m.trys.push([8, 10, , 11]);
                        searchFacesByImageCommand = new client_rekognition_1.SearchFacesByImageCommand(updatedParam);
                        return [4 /*yield*/, this.rekognitionClient.send(searchFacesByImageCommand)];
                    case 9:
                        data = _m.sent();
                        faces = data.FaceMatches.map(function (val) {
                            return {
                                boundingBox: Utils_1.makeCamelCase(val.Face.BoundingBox),
                                metadata: {
                                    externalImageId: _this.decodeExternalImageId(val.Face.ExternalImageId),
                                    similarity: val.Similarity,
                                },
                            };
                        });
                        return [2 /*return*/, { entities: faces }];
                    case 10:
                        err_8 = _m.sent();
                        return [2 /*return*/, Promise.reject(err_8)];
                    case 11: return [3 /*break*/, 15];
                    case 12:
                        _m.trys.push([12, 14, , 15]);
                        detectFacesCommand = new client_rekognition_1.DetectFacesCommand(param);
                        return [4 /*yield*/, this.rekognitionClient.send(detectFacesCommand)];
                    case 13:
                        data = _m.sent();
                        faces = data.FaceDetails.map(function (detail) {
                            // face attributes keys we want to extract from Rekognition's response
                            var attributeKeys = [
                                'Smile',
                                'Eyeglasses',
                                'Sunglasses',
                                'Gender',
                                'Beard',
                                'Mustache',
                                'EyesOpen',
                                'MouthOpen'
                            ];
                            var faceAttributes = Utils_1.makeCamelCase(detail, attributeKeys);
                            if (detail.Emotions) {
                                faceAttributes['emotions'] = detail.Emotions.map(function (emotion) { return emotion.Type; });
                            }
                            return {
                                boundingBox: Utils_1.makeCamelCase(detail.BoundingBox),
                                landmarks: Utils_1.makeCamelCaseArray(detail.Landmarks),
                                ageRange: Utils_1.makeCamelCase(detail.AgeRange),
                                attributes: faceAttributes,
                                metadata: {
                                    confidence: detail.Confidence,
                                    pose: Utils_1.makeCamelCase(detail.Pose),
                                },
                            };
                        });
                        return [2 /*return*/, { entities: faces }];
                    case 14:
                        err_9 = _m.sent();
                        return [2 /*return*/, Promise.reject(err_9)];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    AmazonAIIdentifyPredictionsProvider.prototype.decodeExternalImageId = function (externalImageId) {
        return ('' + externalImageId).replace(/::/g, '/');
    };
    return AmazonAIIdentifyPredictionsProvider;
}(Providers_1.AbstractIdentifyPredictionsProvider));
exports.AmazonAIIdentifyPredictionsProvider = AmazonAIIdentifyPredictionsProvider;
/**
 * @deprecated use named import
 */
exports.default = AmazonAIIdentifyPredictionsProvider;
//# sourceMappingURL=AmazonAIIdentifyPredictionsProvider.js.map