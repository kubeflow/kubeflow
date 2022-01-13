import { __assign } from "tslib";
import { SENSITIVE_STRING } from "@aws-sdk/smithy-client";
export var DeleteLexiconInput;
(function (DeleteLexiconInput) {
    DeleteLexiconInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteLexiconInput || (DeleteLexiconInput = {}));
export var DeleteLexiconOutput;
(function (DeleteLexiconOutput) {
    DeleteLexiconOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteLexiconOutput || (DeleteLexiconOutput = {}));
export var LexiconNotFoundException;
(function (LexiconNotFoundException) {
    LexiconNotFoundException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LexiconNotFoundException || (LexiconNotFoundException = {}));
export var ServiceFailureException;
(function (ServiceFailureException) {
    ServiceFailureException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ServiceFailureException || (ServiceFailureException = {}));
export var Engine;
(function (Engine) {
    Engine["NEURAL"] = "neural";
    Engine["STANDARD"] = "standard";
})(Engine || (Engine = {}));
export var DescribeVoicesInput;
(function (DescribeVoicesInput) {
    DescribeVoicesInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeVoicesInput || (DescribeVoicesInput = {}));
export var Voice;
(function (Voice) {
    Voice.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Voice || (Voice = {}));
export var DescribeVoicesOutput;
(function (DescribeVoicesOutput) {
    DescribeVoicesOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeVoicesOutput || (DescribeVoicesOutput = {}));
export var InvalidNextTokenException;
(function (InvalidNextTokenException) {
    InvalidNextTokenException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidNextTokenException || (InvalidNextTokenException = {}));
export var EngineNotSupportedException;
(function (EngineNotSupportedException) {
    EngineNotSupportedException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EngineNotSupportedException || (EngineNotSupportedException = {}));
export var GetLexiconInput;
(function (GetLexiconInput) {
    GetLexiconInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetLexiconInput || (GetLexiconInput = {}));
export var Lexicon;
(function (Lexicon) {
    Lexicon.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Content && { Content: SENSITIVE_STRING }))); };
})(Lexicon || (Lexicon = {}));
export var LexiconAttributes;
(function (LexiconAttributes) {
    LexiconAttributes.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LexiconAttributes || (LexiconAttributes = {}));
export var GetLexiconOutput;
(function (GetLexiconOutput) {
    GetLexiconOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Lexicon && { Lexicon: Lexicon.filterSensitiveLog(obj.Lexicon) }))); };
})(GetLexiconOutput || (GetLexiconOutput = {}));
export var GetSpeechSynthesisTaskInput;
(function (GetSpeechSynthesisTaskInput) {
    GetSpeechSynthesisTaskInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetSpeechSynthesisTaskInput || (GetSpeechSynthesisTaskInput = {}));
export var OutputFormat;
(function (OutputFormat) {
    OutputFormat["JSON"] = "json";
    OutputFormat["MP3"] = "mp3";
    OutputFormat["OGG_VORBIS"] = "ogg_vorbis";
    OutputFormat["PCM"] = "pcm";
})(OutputFormat || (OutputFormat = {}));
export var SpeechMarkType;
(function (SpeechMarkType) {
    SpeechMarkType["SENTENCE"] = "sentence";
    SpeechMarkType["SSML"] = "ssml";
    SpeechMarkType["VISEME"] = "viseme";
    SpeechMarkType["WORD"] = "word";
})(SpeechMarkType || (SpeechMarkType = {}));
export var TaskStatus;
(function (TaskStatus) {
    TaskStatus["COMPLETED"] = "completed";
    TaskStatus["FAILED"] = "failed";
    TaskStatus["IN_PROGRESS"] = "inProgress";
    TaskStatus["SCHEDULED"] = "scheduled";
})(TaskStatus || (TaskStatus = {}));
export var TextType;
(function (TextType) {
    TextType["SSML"] = "ssml";
    TextType["TEXT"] = "text";
})(TextType || (TextType = {}));
export var SynthesisTask;
(function (SynthesisTask) {
    SynthesisTask.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SynthesisTask || (SynthesisTask = {}));
export var GetSpeechSynthesisTaskOutput;
(function (GetSpeechSynthesisTaskOutput) {
    GetSpeechSynthesisTaskOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetSpeechSynthesisTaskOutput || (GetSpeechSynthesisTaskOutput = {}));
export var InvalidTaskIdException;
(function (InvalidTaskIdException) {
    InvalidTaskIdException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidTaskIdException || (InvalidTaskIdException = {}));
export var SynthesisTaskNotFoundException;
(function (SynthesisTaskNotFoundException) {
    SynthesisTaskNotFoundException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SynthesisTaskNotFoundException || (SynthesisTaskNotFoundException = {}));
export var InvalidLexiconException;
(function (InvalidLexiconException) {
    InvalidLexiconException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidLexiconException || (InvalidLexiconException = {}));
export var InvalidS3BucketException;
(function (InvalidS3BucketException) {
    InvalidS3BucketException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidS3BucketException || (InvalidS3BucketException = {}));
export var InvalidS3KeyException;
(function (InvalidS3KeyException) {
    InvalidS3KeyException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidS3KeyException || (InvalidS3KeyException = {}));
export var InvalidSampleRateException;
(function (InvalidSampleRateException) {
    InvalidSampleRateException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidSampleRateException || (InvalidSampleRateException = {}));
export var InvalidSnsTopicArnException;
(function (InvalidSnsTopicArnException) {
    InvalidSnsTopicArnException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidSnsTopicArnException || (InvalidSnsTopicArnException = {}));
export var InvalidSsmlException;
(function (InvalidSsmlException) {
    InvalidSsmlException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidSsmlException || (InvalidSsmlException = {}));
export var LanguageNotSupportedException;
(function (LanguageNotSupportedException) {
    LanguageNotSupportedException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LanguageNotSupportedException || (LanguageNotSupportedException = {}));
export var LexiconDescription;
(function (LexiconDescription) {
    LexiconDescription.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LexiconDescription || (LexiconDescription = {}));
export var LexiconSizeExceededException;
(function (LexiconSizeExceededException) {
    LexiconSizeExceededException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LexiconSizeExceededException || (LexiconSizeExceededException = {}));
export var ListLexiconsInput;
(function (ListLexiconsInput) {
    ListLexiconsInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListLexiconsInput || (ListLexiconsInput = {}));
export var ListLexiconsOutput;
(function (ListLexiconsOutput) {
    ListLexiconsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListLexiconsOutput || (ListLexiconsOutput = {}));
export var ListSpeechSynthesisTasksInput;
(function (ListSpeechSynthesisTasksInput) {
    ListSpeechSynthesisTasksInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListSpeechSynthesisTasksInput || (ListSpeechSynthesisTasksInput = {}));
export var ListSpeechSynthesisTasksOutput;
(function (ListSpeechSynthesisTasksOutput) {
    ListSpeechSynthesisTasksOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListSpeechSynthesisTasksOutput || (ListSpeechSynthesisTasksOutput = {}));
export var MarksNotSupportedForFormatException;
(function (MarksNotSupportedForFormatException) {
    MarksNotSupportedForFormatException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(MarksNotSupportedForFormatException || (MarksNotSupportedForFormatException = {}));
export var MaxLexemeLengthExceededException;
(function (MaxLexemeLengthExceededException) {
    MaxLexemeLengthExceededException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(MaxLexemeLengthExceededException || (MaxLexemeLengthExceededException = {}));
export var MaxLexiconsNumberExceededException;
(function (MaxLexiconsNumberExceededException) {
    MaxLexiconsNumberExceededException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(MaxLexiconsNumberExceededException || (MaxLexiconsNumberExceededException = {}));
export var PutLexiconInput;
(function (PutLexiconInput) {
    PutLexiconInput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Content && { Content: SENSITIVE_STRING }))); };
})(PutLexiconInput || (PutLexiconInput = {}));
export var PutLexiconOutput;
(function (PutLexiconOutput) {
    PutLexiconOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutLexiconOutput || (PutLexiconOutput = {}));
export var UnsupportedPlsAlphabetException;
(function (UnsupportedPlsAlphabetException) {
    UnsupportedPlsAlphabetException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UnsupportedPlsAlphabetException || (UnsupportedPlsAlphabetException = {}));
export var UnsupportedPlsLanguageException;
(function (UnsupportedPlsLanguageException) {
    UnsupportedPlsLanguageException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UnsupportedPlsLanguageException || (UnsupportedPlsLanguageException = {}));
export var SsmlMarksNotSupportedForTextTypeException;
(function (SsmlMarksNotSupportedForTextTypeException) {
    SsmlMarksNotSupportedForTextTypeException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SsmlMarksNotSupportedForTextTypeException || (SsmlMarksNotSupportedForTextTypeException = {}));
export var StartSpeechSynthesisTaskInput;
(function (StartSpeechSynthesisTaskInput) {
    StartSpeechSynthesisTaskInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartSpeechSynthesisTaskInput || (StartSpeechSynthesisTaskInput = {}));
export var StartSpeechSynthesisTaskOutput;
(function (StartSpeechSynthesisTaskOutput) {
    StartSpeechSynthesisTaskOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartSpeechSynthesisTaskOutput || (StartSpeechSynthesisTaskOutput = {}));
export var TextLengthExceededException;
(function (TextLengthExceededException) {
    TextLengthExceededException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TextLengthExceededException || (TextLengthExceededException = {}));
export var SynthesizeSpeechInput;
(function (SynthesizeSpeechInput) {
    SynthesizeSpeechInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SynthesizeSpeechInput || (SynthesizeSpeechInput = {}));
export var SynthesizeSpeechOutput;
(function (SynthesizeSpeechOutput) {
    SynthesizeSpeechOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SynthesizeSpeechOutput || (SynthesizeSpeechOutput = {}));
//# sourceMappingURL=models_0.js.map