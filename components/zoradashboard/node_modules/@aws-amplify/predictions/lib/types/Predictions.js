"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Convert types
 */
var InterpretTextCategories;
(function (InterpretTextCategories) {
    InterpretTextCategories["ALL"] = "ALL";
    InterpretTextCategories["LANGUAGE"] = "LANGUAGE";
    InterpretTextCategories["ENTITIES"] = "ENTITIES";
    InterpretTextCategories["SENTIMENT"] = "SENTIMENT";
    InterpretTextCategories["SYNTAX"] = "SYNTAX";
    InterpretTextCategories["KEY_PHRASES"] = "KEY_PHRASES";
})(InterpretTextCategories = exports.InterpretTextCategories || (exports.InterpretTextCategories = {}));
function isIdentifyFromCollection(obj) {
    var key = 'collection';
    var keyId = 'collectionId';
    return obj && (obj.hasOwnProperty(key) || obj.hasOwnProperty(keyId));
}
exports.isIdentifyFromCollection = isIdentifyFromCollection;
function isIdentifyCelebrities(obj) {
    var key = 'celebrityDetection';
    return obj && obj.hasOwnProperty(key);
}
exports.isIdentifyCelebrities = isIdentifyCelebrities;
function isTranslateTextInput(obj) {
    var key = 'translateText';
    return obj && obj.hasOwnProperty(key);
}
exports.isTranslateTextInput = isTranslateTextInput;
function isTextToSpeechInput(obj) {
    var key = 'textToSpeech';
    return obj && obj.hasOwnProperty(key);
}
exports.isTextToSpeechInput = isTextToSpeechInput;
function isSpeechToTextInput(obj) {
    var key = 'transcription';
    return obj && obj.hasOwnProperty(key);
}
exports.isSpeechToTextInput = isSpeechToTextInput;
function isStorageSource(obj) {
    var key = 'key';
    return obj && obj.hasOwnProperty(key);
}
exports.isStorageSource = isStorageSource;
function isFileSource(obj) {
    var key = 'file';
    return obj && obj.hasOwnProperty(key);
}
exports.isFileSource = isFileSource;
function isBytesSource(obj) {
    var key = 'bytes';
    return obj && obj.hasOwnProperty(key);
}
exports.isBytesSource = isBytesSource;
function isIdentifyTextInput(obj) {
    var key = 'text';
    return obj && obj.hasOwnProperty(key);
}
exports.isIdentifyTextInput = isIdentifyTextInput;
function isIdentifyLabelsInput(obj) {
    var key = 'labels';
    return obj && obj.hasOwnProperty(key);
}
exports.isIdentifyLabelsInput = isIdentifyLabelsInput;
function isIdentifyEntitiesInput(obj) {
    var key = 'entities';
    return obj && obj.hasOwnProperty(key);
}
exports.isIdentifyEntitiesInput = isIdentifyEntitiesInput;
function isInterpretTextInput(obj) {
    var key = 'text';
    return obj && obj.hasOwnProperty(key);
}
exports.isInterpretTextInput = isInterpretTextInput;
//# sourceMappingURL=Predictions.js.map