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
import { AbstractConvertPredictionsProvider } from '../types/Providers/AbstractConvertPredictionsProvider';
import { TranslateClient, TranslateTextCommand, } from '@aws-sdk/client-translate';
import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';
import { isBytesSource, } from '../types';
import { Credentials, ConsoleLogger as Logger, Signer, getAmplifyUserAgent, } from '@aws-amplify/core';
import { EventStreamMarshaller, } from '@aws-sdk/eventstream-marshaller';
import { fromUtf8, toUtf8 } from '@aws-sdk/util-utf8-node';
var logger = new Logger('AmazonAIConvertPredictionsProvider');
var eventBuilder = new EventStreamMarshaller(toUtf8, fromUtf8);
var LANGUAGES_CODE_IN_8KHZ = ['fr-FR', 'en-AU', 'en-GB', 'fr-CA'];
var AmazonAIConvertPredictionsProvider = /** @class */ (function (_super) {
    __extends(AmazonAIConvertPredictionsProvider, _super);
    function AmazonAIConvertPredictionsProvider() {
        var _this = _super.call(this) || this;
        _this.inputSampleRate = 44100;
        return _this;
    }
    AmazonAIConvertPredictionsProvider.prototype.getProviderName = function () {
        return 'AmazonAIConvertPredictionsProvider';
    };
    AmazonAIConvertPredictionsProvider.prototype.translateText = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, sourceLanguage, _f, targetLanguage, _g, region, credentials, sourceLanguageCode, targetLanguageCode, translateTextCommand, data, err_1;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        logger.debug('Starting translation');
                        _a = this._config.translateText, _b = _a === void 0 ? {} : _a, _c = _b.defaults, _d = _c === void 0 ? {} : _c, _e = _d.sourceLanguage, sourceLanguage = _e === void 0 ? '' : _e, _f = _d.targetLanguage, targetLanguage = _f === void 0 ? '' : _f, _g = _b.region, region = _g === void 0 ? '' : _g;
                        if (!region) {
                            return [2 /*return*/, Promise.reject('region not configured for transcription')];
                        }
                        return [4 /*yield*/, Credentials.get()];
                    case 1:
                        credentials = _h.sent();
                        if (!credentials) {
                            return [2 /*return*/, Promise.reject('No credentials')];
                        }
                        sourceLanguageCode = input.translateText.source.language || sourceLanguage;
                        targetLanguageCode = input.translateText.targetLanguage || targetLanguage;
                        if (!sourceLanguageCode || !targetLanguageCode) {
                            return [2 /*return*/, Promise.reject('Please provide both source and target language')];
                        }
                        this.translateClient = new TranslateClient({
                            region: region,
                            credentials: credentials,
                            customUserAgent: getAmplifyUserAgent(),
                        });
                        translateTextCommand = new TranslateTextCommand({
                            SourceLanguageCode: sourceLanguageCode,
                            TargetLanguageCode: targetLanguageCode,
                            Text: input.translateText.source.text,
                        });
                        _h.label = 2;
                    case 2:
                        _h.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.translateClient.send(translateTextCommand)];
                    case 3:
                        data = _h.sent();
                        return [2 /*return*/, {
                                text: data.TranslatedText,
                                language: data.TargetLanguageCode,
                            }];
                    case 4:
                        err_1 = _h.sent();
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AmazonAIConvertPredictionsProvider.prototype.convertTextToSpeech = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, _a, _b, _c, _d, VoiceId, _e, region, voiceId, synthesizeSpeechCommand, data, response, arrayBuffer, blob, url, err_2;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, Credentials.get()];
                    case 1:
                        credentials = _f.sent();
                        if (!credentials) {
                            return [2 /*return*/, Promise.reject('No credentials')];
                        }
                        _a = this._config.speechGenerator, _b = _a === void 0 ? {} : _a, _c = _b.defaults, _d = (_c === void 0 ? {} : _c).VoiceId, VoiceId = _d === void 0 ? '' : _d, _e = _b.region, region = _e === void 0 ? '' : _e;
                        if (!input.textToSpeech.source) {
                            return [2 /*return*/, Promise.reject('Source needs to be provided in the input')];
                        }
                        voiceId = input.textToSpeech.voiceId || VoiceId;
                        if (!region) {
                            return [2 /*return*/, Promise.reject('Region was undefined. Did you enable speech generator using amplify CLI?')];
                        }
                        if (!voiceId) {
                            return [2 /*return*/, Promise.reject('VoiceId was undefined.')];
                        }
                        this.pollyClient = new PollyClient({
                            region: region,
                            credentials: credentials,
                            customUserAgent: getAmplifyUserAgent(),
                        });
                        synthesizeSpeechCommand = new SynthesizeSpeechCommand({
                            OutputFormat: 'mp3',
                            Text: input.textToSpeech.source.text,
                            VoiceId: voiceId,
                            TextType: 'text',
                            SampleRate: '24000',
                        });
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.pollyClient.send(synthesizeSpeechCommand)];
                    case 3:
                        data = _f.sent();
                        response = new Response(data.AudioStream);
                        return [4 /*yield*/, response.arrayBuffer()];
                    case 4:
                        arrayBuffer = _f.sent();
                        blob = new Blob([arrayBuffer], {
                            type: data.ContentType,
                        });
                        url = URL.createObjectURL(blob);
                        return [2 /*return*/, {
                                speech: { url: url },
                                audioStream: arrayBuffer,
                                text: input.textToSpeech.source.text,
                            }];
                    case 5:
                        err_2 = _f.sent();
                        return [2 /*return*/, Promise.reject(err_2)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AmazonAIConvertPredictionsProvider.prototype.convertSpeechToText = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, _a, _b, _c, _d, languageCode, _e, region, _f, source, _g, language, connection, fullText, err_3, err_4;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 7, , 8]);
                        logger.debug('starting transcription..');
                        return [4 /*yield*/, Credentials.get()];
                    case 1:
                        credentials = _h.sent();
                        if (!credentials) {
                            return [2 /*return*/, Promise.reject('No credentials')];
                        }
                        _a = this._config.transcription, _b = _a === void 0 ? {} : _a, _c = _b.defaults, _d = (_c === void 0 ? {} : _c).language, languageCode = _d === void 0 ? '' : _d, _e = _b.region, region = _e === void 0 ? '' : _e;
                        if (!region) {
                            return [2 /*return*/, Promise.reject('region not configured for transcription')];
                        }
                        if (!languageCode) {
                            return [2 /*return*/, Promise.reject('languageCode not configured or provided for transcription')];
                        }
                        _f = input.transcription, source = _f.source, _g = _f.language, language = _g === void 0 ? languageCode : _g;
                        if (!isBytesSource(source)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.openConnectionWithTranscribe({
                                credentials: credentials,
                                region: region,
                                languageCode: language,
                            })];
                    case 2:
                        connection = _h.sent();
                        _h.label = 3;
                    case 3:
                        _h.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.sendDataToTranscribe({
                                connection: connection,
                                raw: source.bytes,
                                languageCode: language,
                            })];
                    case 4:
                        fullText = _h.sent();
                        return [2 /*return*/, {
                                transcription: {
                                    fullText: fullText,
                                },
                            }];
                    case 5:
                        err_3 = _h.sent();
                        return [2 /*return*/, Promise.reject(err_3)];
                    case 6: return [2 /*return*/, Promise.reject('Source types other than byte source are not supported.')];
                    case 7:
                        err_4 = _h.sent();
                        return [2 /*return*/, Promise.reject(err_4.name + ': ' + err_4.message)];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AmazonAIConvertPredictionsProvider.serializeDataFromTranscribe = function (message) {
        var decodedMessage = '';
        var transcribeMessage = eventBuilder.unmarshall(Buffer.from(message.data));
        var transcribeMessageJson = JSON.parse(toUtf8(transcribeMessage.body));
        if (transcribeMessage.headers[':message-type'].value === 'exception') {
            logger.debug('exception', JSON.stringify(transcribeMessageJson.Message, null, 2));
            throw new Error(transcribeMessageJson.Message);
        }
        else if (transcribeMessage.headers[':message-type'].value === 'event') {
            if (transcribeMessageJson.Transcript.Results.length > 0) {
                if (transcribeMessageJson.Transcript.Results[0].Alternatives.length > 0) {
                    if (transcribeMessageJson.Transcript.Results[0].Alternatives[0]
                        .Transcript.length > 0) {
                        if (transcribeMessageJson.Transcript.Results[0].IsPartial === false) {
                            decodedMessage =
                                transcribeMessageJson.Transcript.Results[0].Alternatives[0]
                                    .Transcript + '\n';
                            logger.debug({ decodedMessage: decodedMessage });
                        }
                        else {
                            logger.debug({
                                transcript: transcribeMessageJson.Transcript.Results[0].Alternatives[0],
                            });
                        }
                    }
                }
            }
        }
        return decodedMessage;
    };
    AmazonAIConvertPredictionsProvider.prototype.sendDataToTranscribe = function (_a) {
        var _this = this;
        var connection = _a.connection, raw = _a.raw, languageCode = _a.languageCode;
        return new Promise(function (res, rej) {
            var fullText = '';
            connection.onmessage = function (message) {
                try {
                    var decodedMessage = AmazonAIConvertPredictionsProvider.serializeDataFromTranscribe(message);
                    if (decodedMessage) {
                        fullText += decodedMessage + ' ';
                    }
                }
                catch (err) {
                    logger.debug(err);
                    rej(err.message);
                }
            };
            connection.onerror = function (errorEvent) {
                logger.debug({ errorEvent: errorEvent });
                rej('failed to transcribe, network error');
            };
            connection.onclose = function (closeEvent) {
                logger.debug({ closeEvent: closeEvent });
                return res(fullText.trim());
            };
            logger.debug({ raw: raw });
            if (Array.isArray(raw)) {
                for (var i = 0; i < raw.length - 1023; i += 1024) {
                    var data = raw.slice(i, i + 1024);
                    _this.sendEncodedDataToTranscribe(connection, data, languageCode);
                }
            }
            else {
                // If Buffer
                _this.sendEncodedDataToTranscribe(connection, raw, languageCode);
            }
            // sending end frame
            var endFrameEventMessage = _this.getAudioEventMessage(Buffer.from([]));
            var endFrameBinary = eventBuilder.marshall(endFrameEventMessage);
            connection.send(endFrameBinary);
        });
    };
    AmazonAIConvertPredictionsProvider.prototype.sendEncodedDataToTranscribe = function (connection, data, languageCode) {
        var downsampledBuffer = this.downsampleBuffer({
            buffer: data,
            outputSampleRate: LANGUAGES_CODE_IN_8KHZ.includes(languageCode)
                ? 8000
                : 16000,
        });
        var pcmEncodedBuffer = this.pcmEncode(downsampledBuffer);
        var audioEventMessage = this.getAudioEventMessage(Buffer.from(pcmEncodedBuffer));
        var binary = eventBuilder.marshall(audioEventMessage);
        connection.send(binary);
    };
    AmazonAIConvertPredictionsProvider.prototype.getAudioEventMessage = function (buffer) {
        var audioEventMessage = {
            body: buffer,
            headers: {
                ':message-type': {
                    type: 'string',
                    value: 'event',
                },
                ':event-type': {
                    type: 'string',
                    value: 'AudioEvent',
                },
            },
        };
        return audioEventMessage;
    };
    AmazonAIConvertPredictionsProvider.prototype.pcmEncode = function (input) {
        var offset = 0;
        var buffer = new ArrayBuffer(input.length * 2);
        var view = new DataView(buffer);
        for (var i = 0; i < input.length; i++, offset += 2) {
            var s = Math.max(-1, Math.min(1, input[i]));
            view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
        }
        return buffer;
    };
    AmazonAIConvertPredictionsProvider.prototype.downsampleBuffer = function (_a) {
        var buffer = _a.buffer, _b = _a.outputSampleRate, outputSampleRate = _b === void 0 ? 16000 : _b;
        if (outputSampleRate === this.inputSampleRate) {
            return buffer;
        }
        var sampleRateRatio = this.inputSampleRate / outputSampleRate;
        var newLength = Math.round(buffer.length / sampleRateRatio);
        var result = new Float32Array(newLength);
        var offsetResult = 0;
        var offsetBuffer = 0;
        while (offsetResult < result.length) {
            var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
            var accum = 0, count = 0;
            for (var i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
                accum += buffer[i];
                count++;
            }
            result[offsetResult] = accum / count;
            offsetResult++;
            offsetBuffer = nextOffsetBuffer;
        }
        return result;
    };
    AmazonAIConvertPredictionsProvider.prototype.openConnectionWithTranscribe = function (_a) {
        var _this = this;
        var userCredentials = _a.credentials, region = _a.region, languageCode = _a.languageCode;
        return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            var access_key, secret_key, session_token, credentials, signedUrl, connection;
            return __generator(this, function (_a) {
                access_key = userCredentials.accessKeyId, secret_key = userCredentials.secretAccessKey, session_token = userCredentials.sessionToken;
                credentials = {
                    access_key: access_key,
                    secret_key: secret_key,
                    session_token: session_token,
                };
                signedUrl = this.generateTranscribeUrl({
                    credentials: credentials,
                    region: region,
                    languageCode: languageCode,
                });
                logger.debug('connecting...');
                connection = new WebSocket(signedUrl);
                connection.binaryType = 'arraybuffer';
                connection.onopen = function () {
                    logger.debug('connected');
                    res(connection);
                };
                return [2 /*return*/];
            });
        }); });
    };
    AmazonAIConvertPredictionsProvider.prototype.generateTranscribeUrl = function (_a) {
        var credentials = _a.credentials, region = _a.region, languageCode = _a.languageCode;
        var url = [
            "wss://transcribestreaming." + region + ".amazonaws.com:8443",
            '/stream-transcription-websocket?',
            "media-encoding=pcm&",
            "sample-rate=" + (LANGUAGES_CODE_IN_8KHZ.includes(languageCode) ? '8000' : '16000') + "&",
            "language-code=" + languageCode,
        ].join('');
        var signedUrl = Signer.signUrl(url, credentials, { region: region, service: 'transcribe' }, 300);
        return signedUrl;
    };
    return AmazonAIConvertPredictionsProvider;
}(AbstractConvertPredictionsProvider));
export { AmazonAIConvertPredictionsProvider };
/**
 * @deprecated use named import
 */
export default AmazonAIConvertPredictionsProvider;
//# sourceMappingURL=AmazonAIConvertPredictionsProvider.js.map