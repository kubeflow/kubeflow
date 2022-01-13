"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynthesizeSpeechOutput = exports.SynthesizeSpeechInput = exports.TextLengthExceededException = exports.StartSpeechSynthesisTaskOutput = exports.StartSpeechSynthesisTaskInput = exports.SsmlMarksNotSupportedForTextTypeException = exports.UnsupportedPlsLanguageException = exports.UnsupportedPlsAlphabetException = exports.PutLexiconOutput = exports.PutLexiconInput = exports.MaxLexiconsNumberExceededException = exports.MaxLexemeLengthExceededException = exports.MarksNotSupportedForFormatException = exports.ListSpeechSynthesisTasksOutput = exports.ListSpeechSynthesisTasksInput = exports.ListLexiconsOutput = exports.ListLexiconsInput = exports.LexiconSizeExceededException = exports.LexiconDescription = exports.LanguageNotSupportedException = exports.InvalidSsmlException = exports.InvalidSnsTopicArnException = exports.InvalidSampleRateException = exports.InvalidS3KeyException = exports.InvalidS3BucketException = exports.InvalidLexiconException = exports.SynthesisTaskNotFoundException = exports.InvalidTaskIdException = exports.GetSpeechSynthesisTaskOutput = exports.SynthesisTask = exports.TextType = exports.TaskStatus = exports.SpeechMarkType = exports.OutputFormat = exports.GetSpeechSynthesisTaskInput = exports.GetLexiconOutput = exports.LexiconAttributes = exports.Lexicon = exports.GetLexiconInput = exports.EngineNotSupportedException = exports.InvalidNextTokenException = exports.DescribeVoicesOutput = exports.Voice = exports.DescribeVoicesInput = exports.Engine = exports.ServiceFailureException = exports.LexiconNotFoundException = exports.DeleteLexiconOutput = exports.DeleteLexiconInput = void 0;
const smithy_client_1 = require("@aws-sdk/smithy-client");
var DeleteLexiconInput;
(function (DeleteLexiconInput) {
    DeleteLexiconInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteLexiconInput = exports.DeleteLexiconInput || (exports.DeleteLexiconInput = {}));
var DeleteLexiconOutput;
(function (DeleteLexiconOutput) {
    DeleteLexiconOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteLexiconOutput = exports.DeleteLexiconOutput || (exports.DeleteLexiconOutput = {}));
var LexiconNotFoundException;
(function (LexiconNotFoundException) {
    LexiconNotFoundException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LexiconNotFoundException = exports.LexiconNotFoundException || (exports.LexiconNotFoundException = {}));
var ServiceFailureException;
(function (ServiceFailureException) {
    ServiceFailureException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ServiceFailureException = exports.ServiceFailureException || (exports.ServiceFailureException = {}));
var Engine;
(function (Engine) {
    Engine["NEURAL"] = "neural";
    Engine["STANDARD"] = "standard";
})(Engine = exports.Engine || (exports.Engine = {}));
var DescribeVoicesInput;
(function (DescribeVoicesInput) {
    DescribeVoicesInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeVoicesInput = exports.DescribeVoicesInput || (exports.DescribeVoicesInput = {}));
var Voice;
(function (Voice) {
    Voice.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Voice = exports.Voice || (exports.Voice = {}));
var DescribeVoicesOutput;
(function (DescribeVoicesOutput) {
    DescribeVoicesOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeVoicesOutput = exports.DescribeVoicesOutput || (exports.DescribeVoicesOutput = {}));
var InvalidNextTokenException;
(function (InvalidNextTokenException) {
    InvalidNextTokenException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidNextTokenException = exports.InvalidNextTokenException || (exports.InvalidNextTokenException = {}));
var EngineNotSupportedException;
(function (EngineNotSupportedException) {
    EngineNotSupportedException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EngineNotSupportedException = exports.EngineNotSupportedException || (exports.EngineNotSupportedException = {}));
var GetLexiconInput;
(function (GetLexiconInput) {
    GetLexiconInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetLexiconInput = exports.GetLexiconInput || (exports.GetLexiconInput = {}));
var Lexicon;
(function (Lexicon) {
    Lexicon.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Content && { Content: smithy_client_1.SENSITIVE_STRING }),
    });
})(Lexicon = exports.Lexicon || (exports.Lexicon = {}));
var LexiconAttributes;
(function (LexiconAttributes) {
    LexiconAttributes.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LexiconAttributes = exports.LexiconAttributes || (exports.LexiconAttributes = {}));
var GetLexiconOutput;
(function (GetLexiconOutput) {
    GetLexiconOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Lexicon && { Lexicon: Lexicon.filterSensitiveLog(obj.Lexicon) }),
    });
})(GetLexiconOutput = exports.GetLexiconOutput || (exports.GetLexiconOutput = {}));
var GetSpeechSynthesisTaskInput;
(function (GetSpeechSynthesisTaskInput) {
    GetSpeechSynthesisTaskInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetSpeechSynthesisTaskInput = exports.GetSpeechSynthesisTaskInput || (exports.GetSpeechSynthesisTaskInput = {}));
var OutputFormat;
(function (OutputFormat) {
    OutputFormat["JSON"] = "json";
    OutputFormat["MP3"] = "mp3";
    OutputFormat["OGG_VORBIS"] = "ogg_vorbis";
    OutputFormat["PCM"] = "pcm";
})(OutputFormat = exports.OutputFormat || (exports.OutputFormat = {}));
var SpeechMarkType;
(function (SpeechMarkType) {
    SpeechMarkType["SENTENCE"] = "sentence";
    SpeechMarkType["SSML"] = "ssml";
    SpeechMarkType["VISEME"] = "viseme";
    SpeechMarkType["WORD"] = "word";
})(SpeechMarkType = exports.SpeechMarkType || (exports.SpeechMarkType = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["COMPLETED"] = "completed";
    TaskStatus["FAILED"] = "failed";
    TaskStatus["IN_PROGRESS"] = "inProgress";
    TaskStatus["SCHEDULED"] = "scheduled";
})(TaskStatus = exports.TaskStatus || (exports.TaskStatus = {}));
var TextType;
(function (TextType) {
    TextType["SSML"] = "ssml";
    TextType["TEXT"] = "text";
})(TextType = exports.TextType || (exports.TextType = {}));
var SynthesisTask;
(function (SynthesisTask) {
    SynthesisTask.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SynthesisTask = exports.SynthesisTask || (exports.SynthesisTask = {}));
var GetSpeechSynthesisTaskOutput;
(function (GetSpeechSynthesisTaskOutput) {
    GetSpeechSynthesisTaskOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetSpeechSynthesisTaskOutput = exports.GetSpeechSynthesisTaskOutput || (exports.GetSpeechSynthesisTaskOutput = {}));
var InvalidTaskIdException;
(function (InvalidTaskIdException) {
    InvalidTaskIdException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidTaskIdException = exports.InvalidTaskIdException || (exports.InvalidTaskIdException = {}));
var SynthesisTaskNotFoundException;
(function (SynthesisTaskNotFoundException) {
    SynthesisTaskNotFoundException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SynthesisTaskNotFoundException = exports.SynthesisTaskNotFoundException || (exports.SynthesisTaskNotFoundException = {}));
var InvalidLexiconException;
(function (InvalidLexiconException) {
    InvalidLexiconException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidLexiconException = exports.InvalidLexiconException || (exports.InvalidLexiconException = {}));
var InvalidS3BucketException;
(function (InvalidS3BucketException) {
    InvalidS3BucketException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidS3BucketException = exports.InvalidS3BucketException || (exports.InvalidS3BucketException = {}));
var InvalidS3KeyException;
(function (InvalidS3KeyException) {
    InvalidS3KeyException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidS3KeyException = exports.InvalidS3KeyException || (exports.InvalidS3KeyException = {}));
var InvalidSampleRateException;
(function (InvalidSampleRateException) {
    InvalidSampleRateException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidSampleRateException = exports.InvalidSampleRateException || (exports.InvalidSampleRateException = {}));
var InvalidSnsTopicArnException;
(function (InvalidSnsTopicArnException) {
    InvalidSnsTopicArnException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidSnsTopicArnException = exports.InvalidSnsTopicArnException || (exports.InvalidSnsTopicArnException = {}));
var InvalidSsmlException;
(function (InvalidSsmlException) {
    InvalidSsmlException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidSsmlException = exports.InvalidSsmlException || (exports.InvalidSsmlException = {}));
var LanguageNotSupportedException;
(function (LanguageNotSupportedException) {
    LanguageNotSupportedException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LanguageNotSupportedException = exports.LanguageNotSupportedException || (exports.LanguageNotSupportedException = {}));
var LexiconDescription;
(function (LexiconDescription) {
    LexiconDescription.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LexiconDescription = exports.LexiconDescription || (exports.LexiconDescription = {}));
var LexiconSizeExceededException;
(function (LexiconSizeExceededException) {
    LexiconSizeExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LexiconSizeExceededException = exports.LexiconSizeExceededException || (exports.LexiconSizeExceededException = {}));
var ListLexiconsInput;
(function (ListLexiconsInput) {
    ListLexiconsInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListLexiconsInput = exports.ListLexiconsInput || (exports.ListLexiconsInput = {}));
var ListLexiconsOutput;
(function (ListLexiconsOutput) {
    ListLexiconsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListLexiconsOutput = exports.ListLexiconsOutput || (exports.ListLexiconsOutput = {}));
var ListSpeechSynthesisTasksInput;
(function (ListSpeechSynthesisTasksInput) {
    ListSpeechSynthesisTasksInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListSpeechSynthesisTasksInput = exports.ListSpeechSynthesisTasksInput || (exports.ListSpeechSynthesisTasksInput = {}));
var ListSpeechSynthesisTasksOutput;
(function (ListSpeechSynthesisTasksOutput) {
    ListSpeechSynthesisTasksOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListSpeechSynthesisTasksOutput = exports.ListSpeechSynthesisTasksOutput || (exports.ListSpeechSynthesisTasksOutput = {}));
var MarksNotSupportedForFormatException;
(function (MarksNotSupportedForFormatException) {
    MarksNotSupportedForFormatException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MarksNotSupportedForFormatException = exports.MarksNotSupportedForFormatException || (exports.MarksNotSupportedForFormatException = {}));
var MaxLexemeLengthExceededException;
(function (MaxLexemeLengthExceededException) {
    MaxLexemeLengthExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MaxLexemeLengthExceededException = exports.MaxLexemeLengthExceededException || (exports.MaxLexemeLengthExceededException = {}));
var MaxLexiconsNumberExceededException;
(function (MaxLexiconsNumberExceededException) {
    MaxLexiconsNumberExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MaxLexiconsNumberExceededException = exports.MaxLexiconsNumberExceededException || (exports.MaxLexiconsNumberExceededException = {}));
var PutLexiconInput;
(function (PutLexiconInput) {
    PutLexiconInput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Content && { Content: smithy_client_1.SENSITIVE_STRING }),
    });
})(PutLexiconInput = exports.PutLexiconInput || (exports.PutLexiconInput = {}));
var PutLexiconOutput;
(function (PutLexiconOutput) {
    PutLexiconOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutLexiconOutput = exports.PutLexiconOutput || (exports.PutLexiconOutput = {}));
var UnsupportedPlsAlphabetException;
(function (UnsupportedPlsAlphabetException) {
    UnsupportedPlsAlphabetException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UnsupportedPlsAlphabetException = exports.UnsupportedPlsAlphabetException || (exports.UnsupportedPlsAlphabetException = {}));
var UnsupportedPlsLanguageException;
(function (UnsupportedPlsLanguageException) {
    UnsupportedPlsLanguageException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UnsupportedPlsLanguageException = exports.UnsupportedPlsLanguageException || (exports.UnsupportedPlsLanguageException = {}));
var SsmlMarksNotSupportedForTextTypeException;
(function (SsmlMarksNotSupportedForTextTypeException) {
    SsmlMarksNotSupportedForTextTypeException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SsmlMarksNotSupportedForTextTypeException = exports.SsmlMarksNotSupportedForTextTypeException || (exports.SsmlMarksNotSupportedForTextTypeException = {}));
var StartSpeechSynthesisTaskInput;
(function (StartSpeechSynthesisTaskInput) {
    StartSpeechSynthesisTaskInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartSpeechSynthesisTaskInput = exports.StartSpeechSynthesisTaskInput || (exports.StartSpeechSynthesisTaskInput = {}));
var StartSpeechSynthesisTaskOutput;
(function (StartSpeechSynthesisTaskOutput) {
    StartSpeechSynthesisTaskOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartSpeechSynthesisTaskOutput = exports.StartSpeechSynthesisTaskOutput || (exports.StartSpeechSynthesisTaskOutput = {}));
var TextLengthExceededException;
(function (TextLengthExceededException) {
    TextLengthExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TextLengthExceededException = exports.TextLengthExceededException || (exports.TextLengthExceededException = {}));
var SynthesizeSpeechInput;
(function (SynthesizeSpeechInput) {
    SynthesizeSpeechInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SynthesizeSpeechInput = exports.SynthesizeSpeechInput || (exports.SynthesizeSpeechInput = {}));
var SynthesizeSpeechOutput;
(function (SynthesizeSpeechOutput) {
    SynthesizeSpeechOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SynthesizeSpeechOutput = exports.SynthesizeSpeechOutput || (exports.SynthesizeSpeechOutput = {}));
//# sourceMappingURL=models_0.js.map