/// <reference types="node" />
import { SmithyException as __SmithyException } from "@aws-sdk/smithy-client";
import { MetadataBearer as $MetadataBearer } from "@aws-sdk/types";
import { Readable } from "stream";
export interface DeleteLexiconInput {
    /**
     * <p>The name of the lexicon to delete. Must be an existing lexicon in the region.</p>
     */
    Name: string | undefined;
}
export declare namespace DeleteLexiconInput {
    const filterSensitiveLog: (obj: DeleteLexiconInput) => any;
}
export interface DeleteLexiconOutput {
}
export declare namespace DeleteLexiconOutput {
    const filterSensitiveLog: (obj: DeleteLexiconOutput) => any;
}
/**
 * <p>Amazon Polly can't find the specified lexicon. This could be caused by a lexicon that
 *       is missing, its name is misspelled or specifying a lexicon that is in a different
 *       region.</p>
 *          <p>Verify that the lexicon exists, is in the region (see <a>ListLexicons</a>)
 *       and that you spelled its name is spelled correctly. Then try again.</p>
 */
export interface LexiconNotFoundException extends __SmithyException, $MetadataBearer {
    name: "LexiconNotFoundException";
    $fault: "client";
    message?: string;
}
export declare namespace LexiconNotFoundException {
    const filterSensitiveLog: (obj: LexiconNotFoundException) => any;
}
/**
 * <p>An unknown condition has caused a service failure.</p>
 */
export interface ServiceFailureException extends __SmithyException, $MetadataBearer {
    name: "ServiceFailureException";
    $fault: "server";
    message?: string;
}
export declare namespace ServiceFailureException {
    const filterSensitiveLog: (obj: ServiceFailureException) => any;
}
export declare enum Engine {
    NEURAL = "neural",
    STANDARD = "standard"
}
export declare type LanguageCode = "arb" | "cmn-CN" | "cy-GB" | "da-DK" | "de-DE" | "en-AU" | "en-GB" | "en-GB-WLS" | "en-IN" | "en-US" | "es-ES" | "es-MX" | "es-US" | "fr-CA" | "fr-FR" | "hi-IN" | "is-IS" | "it-IT" | "ja-JP" | "ko-KR" | "nb-NO" | "nl-NL" | "pl-PL" | "pt-BR" | "pt-PT" | "ro-RO" | "ru-RU" | "sv-SE" | "tr-TR";
export interface DescribeVoicesInput {
    /**
     * <p>Specifies the engine (<code>standard</code> or <code>neural</code>) used by Amazon Polly
     *       when processing input text for speech synthesis. </p>
     */
    Engine?: Engine | string;
    /**
     * <p> The language identification tag (ISO 639 code for the language name-ISO 3166 country
     *       code) for filtering the list of voices returned. If you don't specify this optional parameter,
     *       all available voices are returned. </p>
     */
    LanguageCode?: LanguageCode | string;
    /**
     * <p>Boolean value indicating whether to return any bilingual voices that use the specified
     *       language as an additional language. For instance, if you request all languages that use US
     *       English (es-US), and there is an Italian voice that speaks both Italian (it-IT) and US
     *       English, that voice will be included if you specify <code>yes</code> but not if you specify
     *         <code>no</code>.</p>
     */
    IncludeAdditionalLanguageCodes?: boolean;
    /**
     * <p>An opaque pagination token returned from the previous <code>DescribeVoices</code>
     *       operation. If present, this indicates where to continue the listing.</p>
     */
    NextToken?: string;
}
export declare namespace DescribeVoicesInput {
    const filterSensitiveLog: (obj: DescribeVoicesInput) => any;
}
export declare type Gender = "Female" | "Male";
export declare type VoiceId = "Aditi" | "Amy" | "Astrid" | "Bianca" | "Brian" | "Camila" | "Carla" | "Carmen" | "Celine" | "Chantal" | "Conchita" | "Cristiano" | "Dora" | "Emma" | "Enrique" | "Ewa" | "Filiz" | "Geraint" | "Giorgio" | "Gwyneth" | "Hans" | "Ines" | "Ivy" | "Jacek" | "Jan" | "Joanna" | "Joey" | "Justin" | "Karl" | "Kendra" | "Kevin" | "Kimberly" | "Lea" | "Liv" | "Lotte" | "Lucia" | "Lupe" | "Mads" | "Maja" | "Marlene" | "Mathieu" | "Matthew" | "Maxim" | "Mia" | "Miguel" | "Mizuki" | "Naja" | "Nicole" | "Olivia" | "Penelope" | "Raveena" | "Ricardo" | "Ruben" | "Russell" | "Salli" | "Seoyeon" | "Takumi" | "Tatyana" | "Vicki" | "Vitoria" | "Zeina" | "Zhiyu";
/**
 * <p>Description of the voice.</p>
 */
export interface Voice {
    /**
     * <p>Gender of the voice.</p>
     */
    Gender?: Gender | string;
    /**
     * <p>Amazon Polly assigned voice ID. This is the ID that you specify when calling the
     *         <code>SynthesizeSpeech</code> operation.</p>
     */
    Id?: VoiceId | string;
    /**
     * <p>Language code of the voice.</p>
     */
    LanguageCode?: LanguageCode | string;
    /**
     * <p>Human readable name of the language in English.</p>
     */
    LanguageName?: string;
    /**
     * <p>Name of the voice (for example, Salli, Kendra, etc.). This provides a human readable
     *       voice name that you might display in your application.</p>
     */
    Name?: string;
    /**
     * <p>Additional codes for languages available for the specified voice in addition to its
     *       default language. </p>
     *          <p>For example, the default language for Aditi is Indian English (en-IN) because it was first
     *       used for that language. Since Aditi is bilingual and fluent in both Indian English and Hindi,
     *       this parameter would show the code <code>hi-IN</code>.</p>
     */
    AdditionalLanguageCodes?: (LanguageCode | string)[];
    /**
     * <p>Specifies which engines (<code>standard</code> or <code>neural</code>) that are supported
     *       by a given voice.</p>
     */
    SupportedEngines?: (Engine | string)[];
}
export declare namespace Voice {
    const filterSensitiveLog: (obj: Voice) => any;
}
export interface DescribeVoicesOutput {
    /**
     * <p>A list of voices with their properties.</p>
     */
    Voices?: Voice[];
    /**
     * <p>The pagination token to use in the next request to continue the listing of voices.
     *         <code>NextToken</code> is returned only if the response is truncated.</p>
     */
    NextToken?: string;
}
export declare namespace DescribeVoicesOutput {
    const filterSensitiveLog: (obj: DescribeVoicesOutput) => any;
}
/**
 * <p>The NextToken is invalid. Verify that it's spelled correctly, and then try
 *       again.</p>
 */
export interface InvalidNextTokenException extends __SmithyException, $MetadataBearer {
    name: "InvalidNextTokenException";
    $fault: "client";
    message?: string;
}
export declare namespace InvalidNextTokenException {
    const filterSensitiveLog: (obj: InvalidNextTokenException) => any;
}
/**
 * <p>This engine is not compatible with the voice that you have designated. Choose a new voice
 *       that is compatible with the engine or change the engine and restart the operation.</p>
 */
export interface EngineNotSupportedException extends __SmithyException, $MetadataBearer {
    name: "EngineNotSupportedException";
    $fault: "client";
    message?: string;
}
export declare namespace EngineNotSupportedException {
    const filterSensitiveLog: (obj: EngineNotSupportedException) => any;
}
export interface GetLexiconInput {
    /**
     * <p>Name of the lexicon.</p>
     */
    Name: string | undefined;
}
export declare namespace GetLexiconInput {
    const filterSensitiveLog: (obj: GetLexiconInput) => any;
}
/**
 * <p>Provides lexicon name and lexicon content in string format. For more information, see
 *         <a href="https://www.w3.org/TR/pronunciation-lexicon/">Pronunciation Lexicon
 *         Specification (PLS) Version 1.0</a>.</p>
 */
export interface Lexicon {
    /**
     * <p>Lexicon content in string format. The content of a lexicon must be in PLS
     *       format.</p>
     */
    Content?: string;
    /**
     * <p>Name of the lexicon.</p>
     */
    Name?: string;
}
export declare namespace Lexicon {
    const filterSensitiveLog: (obj: Lexicon) => any;
}
/**
 * <p>Contains metadata describing the lexicon such as the number of lexemes, language code,
 *       and so on. For more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html">Managing
 *         Lexicons</a>.</p>
 */
export interface LexiconAttributes {
    /**
     * <p>Phonetic alphabet used in the lexicon. Valid values are <code>ipa</code> and
     *         <code>x-sampa</code>.</p>
     */
    Alphabet?: string;
    /**
     * <p>Language code that the lexicon applies to. A lexicon with a language code such as "en"
     *       would be applied to all English languages (en-GB, en-US, en-AUS, en-WLS, and so on.</p>
     */
    LanguageCode?: LanguageCode | string;
    /**
     * <p>Date lexicon was last modified (a timestamp value).</p>
     */
    LastModified?: Date;
    /**
     * <p>Amazon Resource Name (ARN) of the lexicon.</p>
     */
    LexiconArn?: string;
    /**
     * <p>Number of lexemes in the lexicon.</p>
     */
    LexemesCount?: number;
    /**
     * <p>Total size of the lexicon, in characters.</p>
     */
    Size?: number;
}
export declare namespace LexiconAttributes {
    const filterSensitiveLog: (obj: LexiconAttributes) => any;
}
export interface GetLexiconOutput {
    /**
     * <p>Lexicon object that provides name and the string content of the lexicon. </p>
     */
    Lexicon?: Lexicon;
    /**
     * <p>Metadata of the lexicon, including phonetic alphabetic used, language code, lexicon
     *       ARN, number of lexemes defined in the lexicon, and size of lexicon in bytes.</p>
     */
    LexiconAttributes?: LexiconAttributes;
}
export declare namespace GetLexiconOutput {
    const filterSensitiveLog: (obj: GetLexiconOutput) => any;
}
export interface GetSpeechSynthesisTaskInput {
    /**
     * <p>The Amazon Polly generated identifier for a speech synthesis task.</p>
     */
    TaskId: string | undefined;
}
export declare namespace GetSpeechSynthesisTaskInput {
    const filterSensitiveLog: (obj: GetSpeechSynthesisTaskInput) => any;
}
export declare enum OutputFormat {
    JSON = "json",
    MP3 = "mp3",
    OGG_VORBIS = "ogg_vorbis",
    PCM = "pcm"
}
export declare enum SpeechMarkType {
    SENTENCE = "sentence",
    SSML = "ssml",
    VISEME = "viseme",
    WORD = "word"
}
export declare enum TaskStatus {
    COMPLETED = "completed",
    FAILED = "failed",
    IN_PROGRESS = "inProgress",
    SCHEDULED = "scheduled"
}
export declare enum TextType {
    SSML = "ssml",
    TEXT = "text"
}
/**
 * <p>SynthesisTask object that provides information about a speech synthesis task.</p>
 */
export interface SynthesisTask {
    /**
     * <p>Specifies the engine (<code>standard</code> or <code>neural</code>) for Amazon Polly to
     *       use when processing input text for speech synthesis. Using a voice that is not supported for
     *       the engine selected will result in an error.</p>
     */
    Engine?: Engine | string;
    /**
     * <p>The Amazon Polly generated identifier for a speech synthesis task.</p>
     */
    TaskId?: string;
    /**
     * <p>Current status of the individual speech synthesis task.</p>
     */
    TaskStatus?: TaskStatus | string;
    /**
     * <p>Reason for the current status of a specific speech synthesis task, including errors if the
     *       task has failed.</p>
     */
    TaskStatusReason?: string;
    /**
     * <p>Pathway for the output speech file.</p>
     */
    OutputUri?: string;
    /**
     * <p>Timestamp for the time the synthesis task was started.</p>
     */
    CreationTime?: Date;
    /**
     * <p>Number of billable characters synthesized.</p>
     */
    RequestCharacters?: number;
    /**
     * <p>ARN for the SNS topic optionally used for providing status notification for a speech
     *       synthesis task.</p>
     */
    SnsTopicArn?: string;
    /**
     * <p>List of one or more pronunciation lexicon names you want the service to apply during
     *       synthesis. Lexicons are applied only if the language of the lexicon is the same as the
     *       language of the voice. </p>
     */
    LexiconNames?: string[];
    /**
     * <p>The format in which the returned output will be encoded. For audio stream, this will be
     *       mp3, ogg_vorbis, or pcm. For speech marks, this will be json. </p>
     */
    OutputFormat?: OutputFormat | string;
    /**
     * <p>The audio frequency specified in Hz.</p>
     *          <p>The valid values for mp3 and ogg_vorbis are "8000", "16000", "22050", and "24000". The
     *       default value for standard voices is "22050". The default value for neural voices is
     *       "24000".</p>
     *          <p>Valid values for pcm are "8000" and "16000" The default value is "16000". </p>
     */
    SampleRate?: string;
    /**
     * <p>The type of speech marks returned for the input text.</p>
     */
    SpeechMarkTypes?: (SpeechMarkType | string)[];
    /**
     * <p>Specifies whether the input text is plain text or SSML. The default value is plain text.
     *     </p>
     */
    TextType?: TextType | string;
    /**
     * <p>Voice ID to use for the synthesis. </p>
     */
    VoiceId?: VoiceId | string;
    /**
     * <p>Optional language code for a synthesis task. This is only necessary if using a bilingual
     *       voice, such as Aditi, which can be used for either Indian English (en-IN) or Hindi (hi-IN). </p>
     *          <p>If a bilingual voice is used and no language code is specified, Amazon Polly will use the
     *       default language of the bilingual voice. The default language for any voice is the one
     *       returned by the <a href="https://docs.aws.amazon.com/polly/latest/dg/API_DescribeVoices.html">DescribeVoices</a> operation for the <code>LanguageCode</code> parameter. For example,
     *       if no language code is specified, Aditi will use Indian English rather than Hindi.</p>
     */
    LanguageCode?: LanguageCode | string;
}
export declare namespace SynthesisTask {
    const filterSensitiveLog: (obj: SynthesisTask) => any;
}
export interface GetSpeechSynthesisTaskOutput {
    /**
     * <p>SynthesisTask object that provides information from the requested task, including output
     *       format, creation time, task status, and so on.</p>
     */
    SynthesisTask?: SynthesisTask;
}
export declare namespace GetSpeechSynthesisTaskOutput {
    const filterSensitiveLog: (obj: GetSpeechSynthesisTaskOutput) => any;
}
/**
 * <p>The provided Task ID is not valid. Please provide a valid Task ID and try again.</p>
 */
export interface InvalidTaskIdException extends __SmithyException, $MetadataBearer {
    name: "InvalidTaskIdException";
    $fault: "client";
    message?: string;
}
export declare namespace InvalidTaskIdException {
    const filterSensitiveLog: (obj: InvalidTaskIdException) => any;
}
/**
 * <p>The Speech Synthesis task with requested Task ID cannot be found.</p>
 */
export interface SynthesisTaskNotFoundException extends __SmithyException, $MetadataBearer {
    name: "SynthesisTaskNotFoundException";
    $fault: "client";
    message?: string;
}
export declare namespace SynthesisTaskNotFoundException {
    const filterSensitiveLog: (obj: SynthesisTaskNotFoundException) => any;
}
/**
 * <p>Amazon Polly can't find the specified lexicon. Verify that the lexicon's name is
 *       spelled correctly, and then try again.</p>
 */
export interface InvalidLexiconException extends __SmithyException, $MetadataBearer {
    name: "InvalidLexiconException";
    $fault: "client";
    message?: string;
}
export declare namespace InvalidLexiconException {
    const filterSensitiveLog: (obj: InvalidLexiconException) => any;
}
/**
 * <p>The provided Amazon S3 bucket name is invalid. Please check your input with S3 bucket
 *       naming requirements and try again.</p>
 */
export interface InvalidS3BucketException extends __SmithyException, $MetadataBearer {
    name: "InvalidS3BucketException";
    $fault: "client";
    message?: string;
}
export declare namespace InvalidS3BucketException {
    const filterSensitiveLog: (obj: InvalidS3BucketException) => any;
}
/**
 * <p>The provided Amazon S3 key prefix is invalid. Please provide a valid S3 object key
 *       name.</p>
 */
export interface InvalidS3KeyException extends __SmithyException, $MetadataBearer {
    name: "InvalidS3KeyException";
    $fault: "client";
    message?: string;
}
export declare namespace InvalidS3KeyException {
    const filterSensitiveLog: (obj: InvalidS3KeyException) => any;
}
/**
 * <p>The specified sample rate is not valid.</p>
 */
export interface InvalidSampleRateException extends __SmithyException, $MetadataBearer {
    name: "InvalidSampleRateException";
    $fault: "client";
    message?: string;
}
export declare namespace InvalidSampleRateException {
    const filterSensitiveLog: (obj: InvalidSampleRateException) => any;
}
/**
 * <p>The provided SNS topic ARN is invalid. Please provide a valid SNS topic ARN and try
 *       again.</p>
 */
export interface InvalidSnsTopicArnException extends __SmithyException, $MetadataBearer {
    name: "InvalidSnsTopicArnException";
    $fault: "client";
    message?: string;
}
export declare namespace InvalidSnsTopicArnException {
    const filterSensitiveLog: (obj: InvalidSnsTopicArnException) => any;
}
/**
 * <p>The SSML you provided is invalid. Verify the SSML syntax, spelling of tags and values,
 *       and then try again.</p>
 */
export interface InvalidSsmlException extends __SmithyException, $MetadataBearer {
    name: "InvalidSsmlException";
    $fault: "client";
    message?: string;
}
export declare namespace InvalidSsmlException {
    const filterSensitiveLog: (obj: InvalidSsmlException) => any;
}
/**
 * <p>The language specified is not currently supported by Amazon Polly in this capacity.</p>
 */
export interface LanguageNotSupportedException extends __SmithyException, $MetadataBearer {
    name: "LanguageNotSupportedException";
    $fault: "client";
    message?: string;
}
export declare namespace LanguageNotSupportedException {
    const filterSensitiveLog: (obj: LanguageNotSupportedException) => any;
}
/**
 * <p>Describes the content of the lexicon.</p>
 */
export interface LexiconDescription {
    /**
     * <p>Name of the lexicon.</p>
     */
    Name?: string;
    /**
     * <p>Provides lexicon metadata.</p>
     */
    Attributes?: LexiconAttributes;
}
export declare namespace LexiconDescription {
    const filterSensitiveLog: (obj: LexiconDescription) => any;
}
/**
 * <p>The maximum size of the specified lexicon would be exceeded by this
 *       operation.</p>
 */
export interface LexiconSizeExceededException extends __SmithyException, $MetadataBearer {
    name: "LexiconSizeExceededException";
    $fault: "client";
    message?: string;
}
export declare namespace LexiconSizeExceededException {
    const filterSensitiveLog: (obj: LexiconSizeExceededException) => any;
}
export interface ListLexiconsInput {
    /**
     * <p>An opaque pagination token returned from previous <code>ListLexicons</code> operation.
     *       If present, indicates where to continue the list of lexicons.</p>
     */
    NextToken?: string;
}
export declare namespace ListLexiconsInput {
    const filterSensitiveLog: (obj: ListLexiconsInput) => any;
}
export interface ListLexiconsOutput {
    /**
     * <p>A list of lexicon names and attributes.</p>
     */
    Lexicons?: LexiconDescription[];
    /**
     * <p>The pagination token to use in the next request to continue the listing of lexicons.
     *         <code>NextToken</code> is returned only if the response is truncated.</p>
     */
    NextToken?: string;
}
export declare namespace ListLexiconsOutput {
    const filterSensitiveLog: (obj: ListLexiconsOutput) => any;
}
export interface ListSpeechSynthesisTasksInput {
    /**
     * <p>Maximum number of speech synthesis tasks returned in a List operation.</p>
     */
    MaxResults?: number;
    /**
     * <p>The pagination token to use in the next request to continue the listing of speech
     *       synthesis tasks. </p>
     */
    NextToken?: string;
    /**
     * <p>Status of the speech synthesis tasks returned in a List operation</p>
     */
    Status?: TaskStatus | string;
}
export declare namespace ListSpeechSynthesisTasksInput {
    const filterSensitiveLog: (obj: ListSpeechSynthesisTasksInput) => any;
}
export interface ListSpeechSynthesisTasksOutput {
    /**
     * <p>An opaque pagination token returned from the previous List operation in this request. If
     *       present, this indicates where to continue the listing.</p>
     */
    NextToken?: string;
    /**
     * <p>List of SynthesisTask objects that provides information from the specified task in the
     *       list request, including output format, creation time, task status, and so on.</p>
     */
    SynthesisTasks?: SynthesisTask[];
}
export declare namespace ListSpeechSynthesisTasksOutput {
    const filterSensitiveLog: (obj: ListSpeechSynthesisTasksOutput) => any;
}
/**
 * <p>Speech marks are not supported for the <code>OutputFormat</code> selected. Speech marks
 *       are only available for content in <code>json</code> format.</p>
 */
export interface MarksNotSupportedForFormatException extends __SmithyException, $MetadataBearer {
    name: "MarksNotSupportedForFormatException";
    $fault: "client";
    message?: string;
}
export declare namespace MarksNotSupportedForFormatException {
    const filterSensitiveLog: (obj: MarksNotSupportedForFormatException) => any;
}
/**
 * <p>The maximum size of the lexeme would be exceeded by this operation.</p>
 */
export interface MaxLexemeLengthExceededException extends __SmithyException, $MetadataBearer {
    name: "MaxLexemeLengthExceededException";
    $fault: "client";
    message?: string;
}
export declare namespace MaxLexemeLengthExceededException {
    const filterSensitiveLog: (obj: MaxLexemeLengthExceededException) => any;
}
/**
 * <p>The maximum number of lexicons would be exceeded by this operation.</p>
 */
export interface MaxLexiconsNumberExceededException extends __SmithyException, $MetadataBearer {
    name: "MaxLexiconsNumberExceededException";
    $fault: "client";
    message?: string;
}
export declare namespace MaxLexiconsNumberExceededException {
    const filterSensitiveLog: (obj: MaxLexiconsNumberExceededException) => any;
}
export interface PutLexiconInput {
    /**
     * <p>Name of the lexicon. The name must follow the regular express format [0-9A-Za-z]{1,20}.
     *       That is, the name is a case-sensitive alphanumeric string up to 20 characters long. </p>
     */
    Name: string | undefined;
    /**
     * <p>Content of the PLS lexicon as string data.</p>
     */
    Content: string | undefined;
}
export declare namespace PutLexiconInput {
    const filterSensitiveLog: (obj: PutLexiconInput) => any;
}
export interface PutLexiconOutput {
}
export declare namespace PutLexiconOutput {
    const filterSensitiveLog: (obj: PutLexiconOutput) => any;
}
/**
 * <p>The alphabet specified by the lexicon is not a supported alphabet. Valid values are
 *         <code>x-sampa</code> and <code>ipa</code>.</p>
 */
export interface UnsupportedPlsAlphabetException extends __SmithyException, $MetadataBearer {
    name: "UnsupportedPlsAlphabetException";
    $fault: "client";
    message?: string;
}
export declare namespace UnsupportedPlsAlphabetException {
    const filterSensitiveLog: (obj: UnsupportedPlsAlphabetException) => any;
}
/**
 * <p>The language specified in the lexicon is unsupported. For a list of supported
 *       languages, see <a href="https://docs.aws.amazon.com/polly/latest/dg/API_LexiconAttributes.html">Lexicon
 *         Attributes</a>.</p>
 */
export interface UnsupportedPlsLanguageException extends __SmithyException, $MetadataBearer {
    name: "UnsupportedPlsLanguageException";
    $fault: "client";
    message?: string;
}
export declare namespace UnsupportedPlsLanguageException {
    const filterSensitiveLog: (obj: UnsupportedPlsLanguageException) => any;
}
/**
 * <p>SSML speech marks are not supported for plain text-type input.</p>
 */
export interface SsmlMarksNotSupportedForTextTypeException extends __SmithyException, $MetadataBearer {
    name: "SsmlMarksNotSupportedForTextTypeException";
    $fault: "client";
    message?: string;
}
export declare namespace SsmlMarksNotSupportedForTextTypeException {
    const filterSensitiveLog: (obj: SsmlMarksNotSupportedForTextTypeException) => any;
}
export interface StartSpeechSynthesisTaskInput {
    /**
     * <p>Specifies the engine (<code>standard</code> or <code>neural</code>) for Amazon Polly to
     *       use when processing input text for speech synthesis. Using a voice that is not supported for
     *       the engine selected will result in an error.</p>
     */
    Engine?: Engine | string;
    /**
     * <p>Optional language code for the Speech Synthesis request. This is only necessary if using a
     *       bilingual voice, such as Aditi, which can be used for either Indian English (en-IN) or Hindi
     *       (hi-IN). </p>
     *          <p>If a bilingual voice is used and no language code is specified, Amazon Polly will use the
     *       default language of the bilingual voice. The default language for any voice is the one
     *       returned by the <a href="https://docs.aws.amazon.com/polly/latest/dg/API_DescribeVoices.html">DescribeVoices</a> operation for the <code>LanguageCode</code> parameter. For example,
     *       if no language code is specified, Aditi will use Indian English rather than Hindi.</p>
     */
    LanguageCode?: LanguageCode | string;
    /**
     * <p>List of one or more pronunciation lexicon names you want the service to apply during
     *       synthesis. Lexicons are applied only if the language of the lexicon is the same as the
     *       language of the voice. </p>
     */
    LexiconNames?: string[];
    /**
     * <p>The format in which the returned output will be encoded. For audio stream, this will be
     *       mp3, ogg_vorbis, or pcm. For speech marks, this will be json. </p>
     */
    OutputFormat: OutputFormat | string | undefined;
    /**
     * <p>Amazon S3 bucket name to which the output file will be saved.</p>
     */
    OutputS3BucketName: string | undefined;
    /**
     * <p>The Amazon S3 key prefix for the output speech file.</p>
     */
    OutputS3KeyPrefix?: string;
    /**
     * <p>The audio frequency specified in Hz.</p>
     *          <p>The valid values for mp3 and ogg_vorbis are "8000", "16000", "22050", and "24000". The
     *       default value for standard voices is "22050". The default value for neural voices is
     *       "24000".</p>
     *          <p>Valid values for pcm are "8000" and "16000" The default value is "16000". </p>
     */
    SampleRate?: string;
    /**
     * <p>ARN for the SNS topic optionally used for providing status notification for a speech
     *       synthesis task.</p>
     */
    SnsTopicArn?: string;
    /**
     * <p>The type of speech marks returned for the input text.</p>
     */
    SpeechMarkTypes?: (SpeechMarkType | string)[];
    /**
     * <p>The input text to synthesize. If you specify ssml as the TextType, follow the SSML format
     *       for the input text. </p>
     */
    Text: string | undefined;
    /**
     * <p>Specifies whether the input text is plain text or SSML. The default value is plain text.
     *     </p>
     */
    TextType?: TextType | string;
    /**
     * <p>Voice ID to use for the synthesis. </p>
     */
    VoiceId: VoiceId | string | undefined;
}
export declare namespace StartSpeechSynthesisTaskInput {
    const filterSensitiveLog: (obj: StartSpeechSynthesisTaskInput) => any;
}
export interface StartSpeechSynthesisTaskOutput {
    /**
     * <p>SynthesisTask object that provides information and attributes about a newly submitted
     *       speech synthesis task.</p>
     */
    SynthesisTask?: SynthesisTask;
}
export declare namespace StartSpeechSynthesisTaskOutput {
    const filterSensitiveLog: (obj: StartSpeechSynthesisTaskOutput) => any;
}
/**
 * <p>The value of the "Text" parameter is longer than the accepted limits. For the
 *         <code>SynthesizeSpeech</code> API, the limit for input text is a maximum of 6000 characters
 *       total, of which no more than 3000 can be billed characters. For the
 *         <code>StartSpeechSynthesisTask</code> API, the maximum is 200,000 characters, of which no
 *       more than 100,000 can be billed characters. SSML tags are not counted as billed
 *       characters.</p>
 */
export interface TextLengthExceededException extends __SmithyException, $MetadataBearer {
    name: "TextLengthExceededException";
    $fault: "client";
    message?: string;
}
export declare namespace TextLengthExceededException {
    const filterSensitiveLog: (obj: TextLengthExceededException) => any;
}
export interface SynthesizeSpeechInput {
    /**
     * <p>Specifies the engine (<code>standard</code> or <code>neural</code>) for Amazon Polly to
     *       use when processing input text for speech synthesis. For information on Amazon Polly voices and which voices are available in standard-only, NTTS-only, and
     *       both standard and NTTS formats, see <a href="https://docs.aws.amazon.com/polly/latest/dg/voicelist.html">Available Voices</a>.</p>
     *          <p>
     *             <b>NTTS-only voices</b>
     *          </p>
     *          <p>When using NTTS-only voices such as Kevin (en-US), this parameter is required and must be
     *       set to <code>neural</code>. If the engine is not specified, or is set to <code>standard</code>,
     *       this will result in an error. </p>
     *          <p>Type: String</p>
     *          <p>Valid Values: <code>standard</code>  |  <code>neural</code>
     *          </p>
     *          <p>Required: Yes</p>
     *
     *          <p>
     *             <b>Standard voices</b>
     *          </p>
     *          <p>For standard voices, this is not required; the engine parameter defaults to
     *       <code>standard</code>. If the engine is not specified, or is set to <code>standard</code> and
     *       an NTTS-only voice is selected, this will result in an error. </p>
     */
    Engine?: Engine | string;
    /**
     * <p>Optional language code for the Synthesize Speech request. This is only necessary if using
     *       a bilingual voice, such as Aditi, which can be used for either Indian English (en-IN) or Hindi
     *       (hi-IN). </p>
     *          <p>If a bilingual voice is used and no language code is specified, Amazon Polly will use the
     *       default language of the bilingual voice. The default language for any voice is the one
     *       returned by the <a href="https://docs.aws.amazon.com/polly/latest/dg/API_DescribeVoices.html">DescribeVoices</a> operation for the <code>LanguageCode</code> parameter. For example,
     *       if no language code is specified, Aditi will use Indian English rather than Hindi.</p>
     */
    LanguageCode?: LanguageCode | string;
    /**
     * <p>List of one or more pronunciation lexicon names you want the service to apply during
     *       synthesis. Lexicons are applied only if the language of the lexicon is the same as the
     *       language of the voice. For information about storing lexicons, see <a href="https://docs.aws.amazon.com/polly/latest/dg/API_PutLexicon.html">PutLexicon</a>.</p>
     */
    LexiconNames?: string[];
    /**
     * <p> The format in which the returned output will be encoded. For audio stream, this will
     *       be mp3, ogg_vorbis, or pcm. For speech marks, this will be json. </p>
     *          <p>When pcm is used, the content returned is audio/pcm in a signed 16-bit, 1 channel
     *       (mono), little-endian format. </p>
     */
    OutputFormat: OutputFormat | string | undefined;
    /**
     * <p>The audio frequency specified in Hz.</p>
     *          <p>The valid values for mp3 and ogg_vorbis are "8000", "16000", "22050", and "24000". The
     *       default value for standard voices is "22050". The default value for neural voices is
     *       "24000".</p>
     *          <p>Valid values for pcm are "8000" and "16000" The default value is "16000". </p>
     */
    SampleRate?: string;
    /**
     * <p>The type of speech marks returned for the input text.</p>
     */
    SpeechMarkTypes?: (SpeechMarkType | string)[];
    /**
     * <p> Input text to synthesize. If you specify <code>ssml</code> as the
     *         <code>TextType</code>, follow the SSML format for the input text. </p>
     */
    Text: string | undefined;
    /**
     * <p> Specifies whether the input text is plain text or SSML. The default value is plain
     *       text. For more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/ssml.html">Using SSML</a>.</p>
     */
    TextType?: TextType | string;
    /**
     * <p> Voice ID to use for the synthesis. You can get a list of available voice IDs by
     *       calling the <a href="https://docs.aws.amazon.com/polly/latest/dg/API_DescribeVoices.html">DescribeVoices</a> operation. </p>
     */
    VoiceId: VoiceId | string | undefined;
}
export declare namespace SynthesizeSpeechInput {
    const filterSensitiveLog: (obj: SynthesizeSpeechInput) => any;
}
export interface SynthesizeSpeechOutput {
    /**
     * <p> Stream containing the synthesized speech. </p>
     */
    AudioStream?: Readable | ReadableStream | Blob;
    /**
     * <p> Specifies the type audio stream. This should reflect the <code>OutputFormat</code>
     *       parameter in your request. </p>
     *          <ul>
     *             <li>
     *                <p> If you request <code>mp3</code> as the <code>OutputFormat</code>, the
     *             <code>ContentType</code> returned is audio/mpeg. </p>
     *             </li>
     *             <li>
     *                <p> If you request <code>ogg_vorbis</code> as the <code>OutputFormat</code>, the
     *             <code>ContentType</code> returned is audio/ogg. </p>
     *             </li>
     *             <li>
     *                <p> If you request <code>pcm</code> as the <code>OutputFormat</code>, the
     *             <code>ContentType</code> returned is audio/pcm in a signed 16-bit, 1 channel (mono),
     *           little-endian format. </p>
     *             </li>
     *             <li>
     *                <p>If you request <code>json</code> as the <code>OutputFormat</code>, the
     *             <code>ContentType</code> returned is audio/json.</p>
     *             </li>
     *          </ul>
     *          <p> </p>
     */
    ContentType?: string;
    /**
     * <p>Number of characters synthesized.</p>
     */
    RequestCharacters?: number;
}
export declare namespace SynthesizeSpeechOutput {
    const filterSensitiveLog: (obj: SynthesizeSpeechOutput) => any;
}
