/**
 * Convert types
 */
export var InterpretTextCategories;
(function (InterpretTextCategories) {
    InterpretTextCategories["ALL"] = "ALL";
    InterpretTextCategories["LANGUAGE"] = "LANGUAGE";
    InterpretTextCategories["ENTITIES"] = "ENTITIES";
    InterpretTextCategories["SENTIMENT"] = "SENTIMENT";
    InterpretTextCategories["SYNTAX"] = "SYNTAX";
    InterpretTextCategories["KEY_PHRASES"] = "KEY_PHRASES";
})(InterpretTextCategories || (InterpretTextCategories = {}));
export function isIdentifyFromCollection(obj) {
    var key = 'collection';
    var keyId = 'collectionId';
    return obj && (obj.hasOwnProperty(key) || obj.hasOwnProperty(keyId));
}
export function isIdentifyCelebrities(obj) {
    var key = 'celebrityDetection';
    return obj && obj.hasOwnProperty(key);
}
export function isTranslateTextInput(obj) {
    var key = 'translateText';
    return obj && obj.hasOwnProperty(key);
}
export function isTextToSpeechInput(obj) {
    var key = 'textToSpeech';
    return obj && obj.hasOwnProperty(key);
}
export function isSpeechToTextInput(obj) {
    var key = 'transcription';
    return obj && obj.hasOwnProperty(key);
}
export function isStorageSource(obj) {
    var key = 'key';
    return obj && obj.hasOwnProperty(key);
}
export function isFileSource(obj) {
    var key = 'file';
    return obj && obj.hasOwnProperty(key);
}
export function isBytesSource(obj) {
    var key = 'bytes';
    return obj && obj.hasOwnProperty(key);
}
export function isIdentifyTextInput(obj) {
    var key = 'text';
    return obj && obj.hasOwnProperty(key);
}
export function isIdentifyLabelsInput(obj) {
    var key = 'labels';
    return obj && obj.hasOwnProperty(key);
}
export function isIdentifyEntitiesInput(obj) {
    var key = 'entities';
    return obj && obj.hasOwnProperty(key);
}
export function isInterpretTextInput(obj) {
    var key = 'text';
    return obj && obj.hasOwnProperty(key);
}
//# sourceMappingURL=Predictions.js.map