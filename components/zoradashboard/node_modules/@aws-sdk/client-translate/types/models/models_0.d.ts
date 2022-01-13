import { SmithyException as __SmithyException } from "@aws-sdk/smithy-client";
import { MetadataBearer as $MetadataBearer } from "@aws-sdk/types";
/**
 * <p>The term being translated by the custom terminology.</p>
 */
export interface Term {
    /**
     * <p>The source text of the term being translated by the custom terminology.</p>
     */
    SourceText?: string;
    /**
     * <p>The target text of the term being translated by the custom terminology.</p>
     */
    TargetText?: string;
}
export declare namespace Term {
    const filterSensitiveLog: (obj: Term) => any;
}
/**
 * <p>The custom terminology applied to the input text by Amazon Translate for the translated text
 *       response. This is optional in the response and will only be present if you specified
 *       terminology input in the request. Currently, only one terminology can be applied per
 *       TranslateText request.</p>
 */
export interface AppliedTerminology {
    /**
     * <p>The name of the custom terminology applied to the input text by Amazon Translate for the translated
     *       text response.</p>
     */
    Name?: string;
    /**
     * <p>The specific terms of the custom terminology applied to the input text by Amazon Translate for the
     *       translated text response. A maximum of 250 terms will be returned, and the specific terms
     *       applied will be the first 250 terms in the source text. </p>
     */
    Terms?: Term[];
}
export declare namespace AppliedTerminology {
    const filterSensitiveLog: (obj: AppliedTerminology) => any;
}
/**
 * <p>There was a conflict processing the request. Try your request again.</p>
 */
export interface ConflictException extends __SmithyException, $MetadataBearer {
    name: "ConflictException";
    $fault: "client";
    Message?: string;
}
export declare namespace ConflictException {
    const filterSensitiveLog: (obj: ConflictException) => any;
}
export declare enum EncryptionKeyType {
    KMS = "KMS"
}
/**
 * <p>The encryption key used to encrypt this object.</p>
 */
export interface EncryptionKey {
    /**
     * <p>The type of encryption key used by Amazon Translate to encrypt custom terminologies.</p>
     */
    Type: EncryptionKeyType | string | undefined;
    /**
     * <p>The Amazon Resource Name (ARN) of the encryption key being used to encrypt the custom
     *       terminology.</p>
     */
    Id: string | undefined;
}
export declare namespace EncryptionKey {
    const filterSensitiveLog: (obj: EncryptionKey) => any;
}
export declare enum ParallelDataFormat {
    CSV = "CSV",
    TMX = "TMX",
    TSV = "TSV"
}
/**
 * <p>Specifies the format and S3 location of the parallel data input file.</p>
 */
export interface ParallelDataConfig {
    /**
     * <p>The URI of the Amazon S3 folder that contains the parallel data input file. The folder
     *       must be in the same Region as the API endpoint you are calling.</p>
     */
    S3Uri: string | undefined;
    /**
     * <p>The format of the parallel data input file.</p>
     */
    Format: ParallelDataFormat | string | undefined;
}
export declare namespace ParallelDataConfig {
    const filterSensitiveLog: (obj: ParallelDataConfig) => any;
}
export interface CreateParallelDataRequest {
    /**
     * <p>A custom name for the parallel data resource in Amazon Translate. You must assign a name
     *       that is unique in the account and region.</p>
     */
    Name: string | undefined;
    /**
     * <p>A custom description for the parallel data resource in Amazon Translate.</p>
     */
    Description?: string;
    /**
     * <p>Specifies the format and S3 location of the parallel data input file.</p>
     */
    ParallelDataConfig: ParallelDataConfig | undefined;
    /**
     * <p>The encryption key used to encrypt this object.</p>
     */
    EncryptionKey?: EncryptionKey;
    /**
     * <p>A unique identifier for the request. This token is automatically generated when you use
     *       Amazon Translate through an AWS SDK.</p>
     */
    ClientToken?: string;
}
export declare namespace CreateParallelDataRequest {
    const filterSensitiveLog: (obj: CreateParallelDataRequest) => any;
}
export declare enum ParallelDataStatus {
    ACTIVE = "ACTIVE",
    CREATING = "CREATING",
    DELETING = "DELETING",
    FAILED = "FAILED",
    UPDATING = "UPDATING"
}
export interface CreateParallelDataResponse {
    /**
     * <p>The custom name that you assigned to the parallel data resource.</p>
     */
    Name?: string;
    /**
     * <p>The status of the parallel data resource. When the resource is ready for you to use, the
     *       status is <code>ACTIVE</code>.</p>
     */
    Status?: ParallelDataStatus | string;
}
export declare namespace CreateParallelDataResponse {
    const filterSensitiveLog: (obj: CreateParallelDataResponse) => any;
}
/**
 * <p>An internal server error occurred. Retry your request.</p>
 */
export interface InternalServerException extends __SmithyException, $MetadataBearer {
    name: "InternalServerException";
    $fault: "server";
    Message?: string;
}
export declare namespace InternalServerException {
    const filterSensitiveLog: (obj: InternalServerException) => any;
}
/**
 * <p>The value of the parameter is invalid. Review the value of the parameter you are using to
 *       correct it, and then retry your operation.</p>
 */
export interface InvalidParameterValueException extends __SmithyException, $MetadataBearer {
    name: "InvalidParameterValueException";
    $fault: "client";
    Message?: string;
}
export declare namespace InvalidParameterValueException {
    const filterSensitiveLog: (obj: InvalidParameterValueException) => any;
}
/**
 * <p> The request that you made is invalid. Check your request to determine why it's invalid
 *       and then retry the request. </p>
 */
export interface InvalidRequestException extends __SmithyException, $MetadataBearer {
    name: "InvalidRequestException";
    $fault: "client";
    Message?: string;
}
export declare namespace InvalidRequestException {
    const filterSensitiveLog: (obj: InvalidRequestException) => any;
}
/**
 * <p>The specified limit has been exceeded. Review your request and retry it with a quantity
 *       below the stated limit.</p>
 */
export interface LimitExceededException extends __SmithyException, $MetadataBearer {
    name: "LimitExceededException";
    $fault: "client";
    Message?: string;
}
export declare namespace LimitExceededException {
    const filterSensitiveLog: (obj: LimitExceededException) => any;
}
/**
 * <p> You have made too many requests within a short period of time. Wait for a short time and
 *       then try your request again.</p>
 */
export interface TooManyRequestsException extends __SmithyException, $MetadataBearer {
    name: "TooManyRequestsException";
    $fault: "client";
    Message?: string;
}
export declare namespace TooManyRequestsException {
    const filterSensitiveLog: (obj: TooManyRequestsException) => any;
}
/**
 * <p>Another modification is being made. That modification must complete before you can make
 *       your change.</p>
 */
export interface ConcurrentModificationException extends __SmithyException, $MetadataBearer {
    name: "ConcurrentModificationException";
    $fault: "client";
    Message?: string;
}
export declare namespace ConcurrentModificationException {
    const filterSensitiveLog: (obj: ConcurrentModificationException) => any;
}
export interface DeleteParallelDataRequest {
    /**
     * <p>The name of the parallel data resource that is being deleted.</p>
     */
    Name: string | undefined;
}
export declare namespace DeleteParallelDataRequest {
    const filterSensitiveLog: (obj: DeleteParallelDataRequest) => any;
}
export interface DeleteParallelDataResponse {
    /**
     * <p>The name of the parallel data resource that is being deleted.</p>
     */
    Name?: string;
    /**
     * <p>The status of the parallel data deletion.</p>
     */
    Status?: ParallelDataStatus | string;
}
export declare namespace DeleteParallelDataResponse {
    const filterSensitiveLog: (obj: DeleteParallelDataResponse) => any;
}
/**
 * <p>The resource you are looking for has not been found. Review the resource you're looking
 *       for and see if a different resource will accomplish your needs before retrying the revised
 *       request.</p>
 */
export interface ResourceNotFoundException extends __SmithyException, $MetadataBearer {
    name: "ResourceNotFoundException";
    $fault: "client";
    Message?: string;
}
export declare namespace ResourceNotFoundException {
    const filterSensitiveLog: (obj: ResourceNotFoundException) => any;
}
export interface DeleteTerminologyRequest {
    /**
     * <p>The name of the custom terminology being deleted. </p>
     */
    Name: string | undefined;
}
export declare namespace DeleteTerminologyRequest {
    const filterSensitiveLog: (obj: DeleteTerminologyRequest) => any;
}
export interface DescribeTextTranslationJobRequest {
    /**
     * <p>The identifier that Amazon Translate generated for the job. The <a>StartTextTranslationJob</a> operation returns this identifier in its
     *       response.</p>
     */
    JobId: string | undefined;
}
export declare namespace DescribeTextTranslationJobRequest {
    const filterSensitiveLog: (obj: DescribeTextTranslationJobRequest) => any;
}
/**
 * <p>The input configuration properties for requesting a batch translation job.</p>
 */
export interface InputDataConfig {
    /**
     * <p>The URI of the AWS S3 folder that contains the input file. The folder must be in the
     *       same Region as the API endpoint you are calling.</p>
     */
    S3Uri: string | undefined;
    /**
     * <p>Describes the format of the data that you submit to Amazon Translate as input. You can
     *       specify one of the following multipurpose internet mail extension (MIME) types:</p>
     *          <ul>
     *             <li>
     *                <p>
     *                   <code>text/html</code>: The input data consists of one or more HTML files. Amazon
     *           Translate translates only the text that resides in the <code>html</code> element in each
     *           file.</p>
     *             </li>
     *             <li>
     *                <p>
     *                   <code>text/plain</code>: The input data consists of one or more unformatted text
     *           files. Amazon Translate translates every character in this type of input.</p>
     *             </li>
     *             <li>
     *                <p>
     *                   <code>application/vnd.openxmlformats-officedocument.wordprocessingml.document</code>:
     *           The input data consists of one or more Word documents (.docx).</p>
     *             </li>
     *             <li>
     *                <p>
     *                   <code>application/vnd.openxmlformats-officedocument.presentationml.presentation</code>:
     *           The input data consists of one or more PowerPoint Presentation files (.pptx).</p>
     *             </li>
     *             <li>
     *                <p>
     *                   <code>application/vnd.openxmlformats-officedocument.spreadsheetml.sheet</code>: The
     *           input data consists of one or more Excel Workbook files (.xlsx).</p>
     *             </li>
     *          </ul>
     *          <important>
     *             <p>If you structure your input data as HTML, ensure that you set this parameter to
     *           <code>text/html</code>. By doing so, you cut costs by limiting the translation to the
     *         contents of the <code>html</code> element in each file. Otherwise, if you set this parameter
     *         to <code>text/plain</code>, your costs will cover the translation of every character.</p>
     *          </important>
     */
    ContentType: string | undefined;
}
export declare namespace InputDataConfig {
    const filterSensitiveLog: (obj: InputDataConfig) => any;
}
/**
 * <p>The number of documents successfully and unsuccessfully processed during a translation
 *       job.</p>
 */
export interface JobDetails {
    /**
     * <p>The number of documents successfully processed during a translation job.</p>
     */
    TranslatedDocumentsCount?: number;
    /**
     * <p>The number of documents that could not be processed during a translation job.</p>
     */
    DocumentsWithErrorsCount?: number;
    /**
     * <p>The number of documents used as input in a translation job.</p>
     */
    InputDocumentsCount?: number;
}
export declare namespace JobDetails {
    const filterSensitiveLog: (obj: JobDetails) => any;
}
export declare enum JobStatus {
    COMPLETED = "COMPLETED",
    COMPLETED_WITH_ERROR = "COMPLETED_WITH_ERROR",
    FAILED = "FAILED",
    IN_PROGRESS = "IN_PROGRESS",
    STOPPED = "STOPPED",
    STOP_REQUESTED = "STOP_REQUESTED",
    SUBMITTED = "SUBMITTED"
}
/**
 * <p>The output configuration properties for a batch translation job.</p>
 */
export interface OutputDataConfig {
    /**
     * <p>The URI of the S3 folder that contains a translation job's output file. The folder must
     *       be in the same Region as the API endpoint that you are calling.</p>
     */
    S3Uri: string | undefined;
}
export declare namespace OutputDataConfig {
    const filterSensitiveLog: (obj: OutputDataConfig) => any;
}
/**
 * <p>Provides information about a translation job.</p>
 */
export interface TextTranslationJobProperties {
    /**
     * <p>The ID of the translation job.</p>
     */
    JobId?: string;
    /**
     * <p>The user-defined name of the translation job.</p>
     */
    JobName?: string;
    /**
     * <p>The status of the translation job.</p>
     */
    JobStatus?: JobStatus | string;
    /**
     * <p>The number of documents successfully and unsuccessfully processed during the translation
     *       job.</p>
     */
    JobDetails?: JobDetails;
    /**
     * <p>The language code of the language of the source text. The language must be a language
     *       supported by Amazon Translate.</p>
     */
    SourceLanguageCode?: string;
    /**
     * <p>The language code of the language of the target text. The language must be a language
     *       supported by Amazon Translate.</p>
     */
    TargetLanguageCodes?: string[];
    /**
     * <p>A list containing the names of the terminologies applied to a translation job. Only one
     *       terminology can be applied per <a>StartTextTranslationJob</a> request at this
     *       time.</p>
     */
    TerminologyNames?: string[];
    /**
     * <p>A list containing the names of the parallel data resources applied to the translation
     *       job.</p>
     */
    ParallelDataNames?: string[];
    /**
     * <p>An explanation of any errors that may have occured during the translation job.</p>
     */
    Message?: string;
    /**
     * <p>The time at which the translation job was submitted.</p>
     */
    SubmittedTime?: Date;
    /**
     * <p>The time at which the translation job ended.</p>
     */
    EndTime?: Date;
    /**
     * <p>The input configuration properties that were specified when the job was requested.</p>
     */
    InputDataConfig?: InputDataConfig;
    /**
     * <p>The output configuration properties that were specified when the job was requested.</p>
     */
    OutputDataConfig?: OutputDataConfig;
    /**
     * <p>The Amazon Resource Name (ARN) of an AWS Identity Access and Management (IAM) role
     *       that granted Amazon Translate read access to the job's input data.</p>
     */
    DataAccessRoleArn?: string;
}
export declare namespace TextTranslationJobProperties {
    const filterSensitiveLog: (obj: TextTranslationJobProperties) => any;
}
export interface DescribeTextTranslationJobResponse {
    /**
     * <p>An object that contains the properties associated with an asynchronous batch translation
     *       job.</p>
     */
    TextTranslationJobProperties?: TextTranslationJobProperties;
}
export declare namespace DescribeTextTranslationJobResponse {
    const filterSensitiveLog: (obj: DescribeTextTranslationJobResponse) => any;
}
export interface GetParallelDataRequest {
    /**
     * <p>The name of the parallel data resource that is being retrieved.</p>
     */
    Name: string | undefined;
}
export declare namespace GetParallelDataRequest {
    const filterSensitiveLog: (obj: GetParallelDataRequest) => any;
}
/**
 * <p>The location of the most recent parallel data input file that was successfully imported
 *       into Amazon Translate.</p>
 */
export interface ParallelDataDataLocation {
    /**
     * <p>Describes the repository that contains the parallel data input file.</p>
     */
    RepositoryType: string | undefined;
    /**
     * <p>The Amazon S3 location of the parallel data input file. The location is returned as a
     *       presigned URL to that has a 30 minute expiration.</p>
     */
    Location: string | undefined;
}
export declare namespace ParallelDataDataLocation {
    const filterSensitiveLog: (obj: ParallelDataDataLocation) => any;
}
/**
 * <p>The properties of a parallel data resource.</p>
 */
export interface ParallelDataProperties {
    /**
     * <p>The custom name assigned to the parallel data resource.</p>
     */
    Name?: string;
    /**
     * <p>The Amazon Resource Name (ARN) of the parallel data resource.</p>
     */
    Arn?: string;
    /**
     * <p>The description assigned to the parallel data resource.</p>
     */
    Description?: string;
    /**
     * <p>The status of the parallel data resource. When the parallel data is ready for you to use,
     *       the status is <code>ACTIVE</code>.</p>
     */
    Status?: ParallelDataStatus | string;
    /**
     * <p>The source language of the translations in the parallel data file.</p>
     */
    SourceLanguageCode?: string;
    /**
     * <p>The language codes for the target languages available in the parallel data file. All
     *       possible target languages are returned as an array.</p>
     */
    TargetLanguageCodes?: string[];
    /**
     * <p>Specifies the format and S3 location of the parallel data input file.</p>
     */
    ParallelDataConfig?: ParallelDataConfig;
    /**
     * <p>Additional information from Amazon Translate about the parallel data resource. </p>
     */
    Message?: string;
    /**
     * <p>The number of UTF-8 characters that Amazon Translate imported from the parallel data input
     *       file. This number includes only the characters in your translation examples. It does not
     *       include characters that are used to format your file. For example, if you provided a
     *       Translation Memory Exchange (.tmx) file, this number does not include the tags.</p>
     */
    ImportedDataSize?: number;
    /**
     * <p>The number of records successfully imported from the parallel data input file.</p>
     */
    ImportedRecordCount?: number;
    /**
     * <p>The number of records unsuccessfully imported from the parallel data input file.</p>
     */
    FailedRecordCount?: number;
    /**
     * <p>The number of items in the input file that Amazon Translate skipped when you created or
     *       updated the parallel data resource. For example, Amazon Translate skips empty records, empty
     *       target texts, and empty lines.</p>
     */
    SkippedRecordCount?: number;
    /**
     * <p>The encryption key used to encrypt this object.</p>
     */
    EncryptionKey?: EncryptionKey;
    /**
     * <p>The time at which the parallel data resource was created.</p>
     */
    CreatedAt?: Date;
    /**
     * <p>The time at which the parallel data resource was last updated.</p>
     */
    LastUpdatedAt?: Date;
    /**
     * <p>The status of the most recent update attempt for the parallel data resource.</p>
     */
    LatestUpdateAttemptStatus?: ParallelDataStatus | string;
    /**
     * <p>The time that the most recent update was attempted.</p>
     */
    LatestUpdateAttemptAt?: Date;
}
export declare namespace ParallelDataProperties {
    const filterSensitiveLog: (obj: ParallelDataProperties) => any;
}
export interface GetParallelDataResponse {
    /**
     * <p>The properties of the parallel data resource that is being retrieved.</p>
     */
    ParallelDataProperties?: ParallelDataProperties;
    /**
     * <p>The location of the most recent parallel data input file that was successfully imported
     *       into Amazon Translate. The location is returned as a presigned URL that has a 30 minute
     *       expiration.</p>
     */
    DataLocation?: ParallelDataDataLocation;
    /**
     * <p>The Amazon S3 location of a file that provides any errors or warnings that were produced
     *       by your input file. This file was created when Amazon Translate attempted to create a parallel
     *       data resource. The location is returned as a presigned URL to that has a 30 minute
     *       expiration.</p>
     */
    AuxiliaryDataLocation?: ParallelDataDataLocation;
    /**
     * <p>The Amazon S3 location of a file that provides any errors or warnings that were produced
     *       by your input file. This file was created when Amazon Translate attempted to update a parallel
     *       data resource. The location is returned as a presigned URL to that has a 30 minute
     *       expiration.</p>
     */
    LatestUpdateAttemptAuxiliaryDataLocation?: ParallelDataDataLocation;
}
export declare namespace GetParallelDataResponse {
    const filterSensitiveLog: (obj: GetParallelDataResponse) => any;
}
export declare enum TerminologyDataFormat {
    CSV = "CSV",
    TMX = "TMX"
}
export interface GetTerminologyRequest {
    /**
     * <p>The name of the custom terminology being retrieved.</p>
     */
    Name: string | undefined;
    /**
     * <p>The data format of the custom terminology being retrieved, either CSV or TMX.</p>
     */
    TerminologyDataFormat: TerminologyDataFormat | string | undefined;
}
export declare namespace GetTerminologyRequest {
    const filterSensitiveLog: (obj: GetTerminologyRequest) => any;
}
/**
 * <p>The location of the custom terminology data.</p>
 */
export interface TerminologyDataLocation {
    /**
     * <p>The repository type for the custom terminology data.</p>
     */
    RepositoryType: string | undefined;
    /**
     * <p>The location of the custom terminology data.</p>
     */
    Location: string | undefined;
}
export declare namespace TerminologyDataLocation {
    const filterSensitiveLog: (obj: TerminologyDataLocation) => any;
}
/**
 * <p>The properties of the custom terminology.</p>
 */
export interface TerminologyProperties {
    /**
     * <p>The name of the custom terminology.</p>
     */
    Name?: string;
    /**
     * <p>The description of the custom terminology properties.</p>
     */
    Description?: string;
    /**
     * <p> The Amazon Resource Name (ARN) of the custom terminology. </p>
     */
    Arn?: string;
    /**
     * <p>The language code for the source text of the translation request for which the custom
     *       terminology is being used.</p>
     */
    SourceLanguageCode?: string;
    /**
     * <p>The language codes for the target languages available with the custom terminology file.
     *       All possible target languages are returned in array.</p>
     */
    TargetLanguageCodes?: string[];
    /**
     * <p>The encryption key for the custom terminology.</p>
     */
    EncryptionKey?: EncryptionKey;
    /**
     * <p>The size of the file used when importing a custom terminology.</p>
     */
    SizeBytes?: number;
    /**
     * <p>The number of terms included in the custom terminology.</p>
     */
    TermCount?: number;
    /**
     * <p>The time at which the custom terminology was created, based on the timestamp.</p>
     */
    CreatedAt?: Date;
    /**
     * <p>The time at which the custom terminology was last update, based on the timestamp.</p>
     */
    LastUpdatedAt?: Date;
}
export declare namespace TerminologyProperties {
    const filterSensitiveLog: (obj: TerminologyProperties) => any;
}
export interface GetTerminologyResponse {
    /**
     * <p>The properties of the custom terminology being retrieved.</p>
     */
    TerminologyProperties?: TerminologyProperties;
    /**
     * <p>The data location of the custom terminology being retrieved. The custom terminology file
     *       is returned in a presigned url that has a 30 minute expiration.</p>
     */
    TerminologyDataLocation?: TerminologyDataLocation;
}
export declare namespace GetTerminologyResponse {
    const filterSensitiveLog: (obj: GetTerminologyResponse) => any;
}
export declare enum MergeStrategy {
    OVERWRITE = "OVERWRITE"
}
/**
 * <p>The data associated with the custom terminology.</p>
 */
export interface TerminologyData {
    /**
     * <p>The file containing the custom terminology data. Your version of the AWS SDK performs a
     *       Base64-encoding on this field before sending a request to the AWS service. Users of the SDK
     *       should not perform Base64-encoding themselves.</p>
     */
    File: Uint8Array | undefined;
    /**
     * <p>The data format of the custom terminology. Either CSV or TMX.</p>
     */
    Format: TerminologyDataFormat | string | undefined;
}
export declare namespace TerminologyData {
    const filterSensitiveLog: (obj: TerminologyData) => any;
}
export interface ImportTerminologyRequest {
    /**
     * <p>The name of the custom terminology being imported.</p>
     */
    Name: string | undefined;
    /**
     * <p>The merge strategy of the custom terminology being imported. Currently, only the OVERWRITE
     *       merge strategy is supported. In this case, the imported terminology will overwrite an existing
     *       terminology of the same name.</p>
     */
    MergeStrategy: MergeStrategy | string | undefined;
    /**
     * <p>The description of the custom terminology being imported.</p>
     */
    Description?: string;
    /**
     * <p>The terminology data for the custom terminology being imported.</p>
     */
    TerminologyData: TerminologyData | undefined;
    /**
     * <p>The encryption key for the custom terminology being imported.</p>
     */
    EncryptionKey?: EncryptionKey;
}
export declare namespace ImportTerminologyRequest {
    const filterSensitiveLog: (obj: ImportTerminologyRequest) => any;
}
export interface ImportTerminologyResponse {
    /**
     * <p>The properties of the custom terminology being imported.</p>
     */
    TerminologyProperties?: TerminologyProperties;
}
export declare namespace ImportTerminologyResponse {
    const filterSensitiveLog: (obj: ImportTerminologyResponse) => any;
}
export interface ListParallelDataRequest {
    /**
     * <p>A string that specifies the next page of results to return in a paginated response.</p>
     */
    NextToken?: string;
    /**
     * <p>The maximum number of parallel data resources returned for each request.</p>
     */
    MaxResults?: number;
}
export declare namespace ListParallelDataRequest {
    const filterSensitiveLog: (obj: ListParallelDataRequest) => any;
}
export interface ListParallelDataResponse {
    /**
     * <p>The properties of the parallel data resources returned by this request.</p>
     */
    ParallelDataPropertiesList?: ParallelDataProperties[];
    /**
     * <p>The string to use in a subsequent request to get the next page of results in a paginated
     *       response. This value is null if there are no additional pages.</p>
     */
    NextToken?: string;
}
export declare namespace ListParallelDataResponse {
    const filterSensitiveLog: (obj: ListParallelDataResponse) => any;
}
export interface ListTerminologiesRequest {
    /**
     * <p>If the result of the request to ListTerminologies was truncated, include the NextToken to
     *       fetch the next group of custom terminologies. </p>
     */
    NextToken?: string;
    /**
     * <p>The maximum number of custom terminologies returned per list request.</p>
     */
    MaxResults?: number;
}
export declare namespace ListTerminologiesRequest {
    const filterSensitiveLog: (obj: ListTerminologiesRequest) => any;
}
export interface ListTerminologiesResponse {
    /**
     * <p>The properties list of the custom terminologies returned on the list request.</p>
     */
    TerminologyPropertiesList?: TerminologyProperties[];
    /**
     * <p> If the response to the ListTerminologies was truncated, the NextToken fetches the next
     *       group of custom terminologies.</p>
     */
    NextToken?: string;
}
export declare namespace ListTerminologiesResponse {
    const filterSensitiveLog: (obj: ListTerminologiesResponse) => any;
}
/**
 * <p>The filter specified for the operation is invalid. Specify a different filter.</p>
 */
export interface InvalidFilterException extends __SmithyException, $MetadataBearer {
    name: "InvalidFilterException";
    $fault: "client";
    Message?: string;
}
export declare namespace InvalidFilterException {
    const filterSensitiveLog: (obj: InvalidFilterException) => any;
}
/**
 * <p>Provides information for filtering a list of translation jobs. For more information, see
 *         <a>ListTextTranslationJobs</a>.</p>
 */
export interface TextTranslationJobFilter {
    /**
     * <p>Filters the list of jobs by name.</p>
     */
    JobName?: string;
    /**
     * <p>Filters the list of jobs based by job status.</p>
     */
    JobStatus?: JobStatus | string;
    /**
     * <p>Filters the list of jobs based on the time that the job was submitted for processing and
     *       returns only the jobs submitted before the specified time. Jobs are returned in ascending
     *       order, oldest to newest.</p>
     */
    SubmittedBeforeTime?: Date;
    /**
     * <p>Filters the list of jobs based on the time that the job was submitted for processing and
     *       returns only the jobs submitted after the specified time. Jobs are returned in descending
     *       order, newest to oldest.</p>
     */
    SubmittedAfterTime?: Date;
}
export declare namespace TextTranslationJobFilter {
    const filterSensitiveLog: (obj: TextTranslationJobFilter) => any;
}
export interface ListTextTranslationJobsRequest {
    /**
     * <p>The parameters that specify which batch translation jobs to retrieve. Filters include job
     *       name, job status, and submission time. You can only set one filter at a time.</p>
     */
    Filter?: TextTranslationJobFilter;
    /**
     * <p>The token to request the next page of results.</p>
     */
    NextToken?: string;
    /**
     * <p>The maximum number of results to return in each page. The default value is 100.</p>
     */
    MaxResults?: number;
}
export declare namespace ListTextTranslationJobsRequest {
    const filterSensitiveLog: (obj: ListTextTranslationJobsRequest) => any;
}
export interface ListTextTranslationJobsResponse {
    /**
     * <p>A list containing the properties of each job that is returned.</p>
     */
    TextTranslationJobPropertiesList?: TextTranslationJobProperties[];
    /**
     * <p>The token to use to retreive the next page of results. This value is <code>null</code>
     *       when there are no more results to return.</p>
     */
    NextToken?: string;
}
export declare namespace ListTextTranslationJobsResponse {
    const filterSensitiveLog: (obj: ListTextTranslationJobsResponse) => any;
}
export interface StartTextTranslationJobRequest {
    /**
     * <p>The name of the batch translation job to be performed.</p>
     */
    JobName?: string;
    /**
     * <p>Specifies the format and S3 location of the input documents for the translation
     *       job.</p>
     */
    InputDataConfig: InputDataConfig | undefined;
    /**
     * <p>Specifies the S3 folder to which your job output will be saved.
     *       </p>
     */
    OutputDataConfig: OutputDataConfig | undefined;
    /**
     * <p>The Amazon Resource Name (ARN) of an AWS Identity Access and Management (IAM) role
     *       that grants Amazon Translate read access to your input data. For more nformation, see <a>identity-and-access-management</a>.</p>
     */
    DataAccessRoleArn: string | undefined;
    /**
     * <p>The language code of the input language. For a list of language codes, see <a>what-is-languages</a>.</p>
     *          <p>Amazon Translate does not automatically detect a source language during batch translation
     *       jobs.</p>
     */
    SourceLanguageCode: string | undefined;
    /**
     * <p>The language code of the output language.</p>
     */
    TargetLanguageCodes: string[] | undefined;
    /**
     * <p>The name of the terminology to use in the batch translation job. For a list of available
     *       terminologies, use the <a>ListTerminologies</a> operation.</p>
     */
    TerminologyNames?: string[];
    /**
     * <p>The names of the parallel data resources to use in the batch translation job. For a list
     *       of available parallel data resources, use the <a>ListParallelData</a>
     *       operation.</p>
     */
    ParallelDataNames?: string[];
    /**
     * <p>A unique identifier for the request. This token is auto-generated when using the Amazon Translate
     *       SDK.</p>
     */
    ClientToken?: string;
}
export declare namespace StartTextTranslationJobRequest {
    const filterSensitiveLog: (obj: StartTextTranslationJobRequest) => any;
}
export interface StartTextTranslationJobResponse {
    /**
     * <p>The identifier generated for the job. To get the status of a job, use this ID with the
     *         <a>DescribeTextTranslationJob</a> operation.</p>
     */
    JobId?: string;
    /**
     * <p>The status of the job. Possible values include:</p>
     *          <ul>
     *             <li>
     *                <p>
     *                   <code>SUBMITTED</code> - The job has been received and is queued for
     *           processing.</p>
     *             </li>
     *             <li>
     *                <p>
     *                   <code>IN_PROGRESS</code> - Amazon Translate is processing the job.</p>
     *             </li>
     *             <li>
     *                <p>
     *                   <code>COMPLETED</code> - The job was successfully completed and the output is
     *           available.</p>
     *             </li>
     *             <li>
     *                <p>
     *                   <code>COMPLETED_WITH_ERROR</code> - The job was completed with errors. The errors can
     *           be analyzed in the job's output.</p>
     *             </li>
     *             <li>
     *                <p>
     *                   <code>FAILED</code> - The job did not complete. To get details, use the <a>DescribeTextTranslationJob</a> operation.</p>
     *             </li>
     *             <li>
     *                <p>
     *                   <code>STOP_REQUESTED</code> - The user who started the job has requested that it be
     *           stopped.</p>
     *             </li>
     *             <li>
     *                <p>
     *                   <code>STOPPED</code> - The job has been stopped.</p>
     *             </li>
     *          </ul>
     */
    JobStatus?: JobStatus | string;
}
export declare namespace StartTextTranslationJobResponse {
    const filterSensitiveLog: (obj: StartTextTranslationJobResponse) => any;
}
/**
 * <p>Amazon Translate does not support translation from the language of the source text into the requested
 *       target language. For more information, see <a>how-to-error-msg</a>. </p>
 */
export interface UnsupportedLanguagePairException extends __SmithyException, $MetadataBearer {
    name: "UnsupportedLanguagePairException";
    $fault: "client";
    Message?: string;
    /**
     * <p>The language code for the language of the input text. </p>
     */
    SourceLanguageCode?: string;
    /**
     * <p>The language code for the language of the translated text. </p>
     */
    TargetLanguageCode?: string;
}
export declare namespace UnsupportedLanguagePairException {
    const filterSensitiveLog: (obj: UnsupportedLanguagePairException) => any;
}
export interface StopTextTranslationJobRequest {
    /**
     * <p>The job ID of the job to be stopped.</p>
     */
    JobId: string | undefined;
}
export declare namespace StopTextTranslationJobRequest {
    const filterSensitiveLog: (obj: StopTextTranslationJobRequest) => any;
}
export interface StopTextTranslationJobResponse {
    /**
     * <p>The job ID of the stopped batch translation job.</p>
     */
    JobId?: string;
    /**
     * <p>The status of the designated job. Upon successful completion, the job's status will be
     *         <code>STOPPED</code>.</p>
     */
    JobStatus?: JobStatus | string;
}
export declare namespace StopTextTranslationJobResponse {
    const filterSensitiveLog: (obj: StopTextTranslationJobResponse) => any;
}
/**
 * <p>The confidence that Amazon Comprehend accurately detected the source language is low. If a
 *       low confidence level is acceptable for your application, you can use the language in the
 *       exception to call Amazon Translate again. For more information, see the <a href="https://docs.aws.amazon.com/comprehend/latest/dg/API_DetectDominantLanguage.html">DetectDominantLanguage</a> operation in the <i>Amazon Comprehend Developer
 *         Guide</i>. </p>
 */
export interface DetectedLanguageLowConfidenceException extends __SmithyException, $MetadataBearer {
    name: "DetectedLanguageLowConfidenceException";
    $fault: "client";
    Message?: string;
    /**
     * <p>The language code of the auto-detected language from Amazon Comprehend.</p>
     */
    DetectedLanguageCode?: string;
}
export declare namespace DetectedLanguageLowConfidenceException {
    const filterSensitiveLog: (obj: DetectedLanguageLowConfidenceException) => any;
}
/**
 * <p>The Amazon Translate service is temporarily unavailable. Please wait a bit and then retry your
 *       request.</p>
 */
export interface ServiceUnavailableException extends __SmithyException, $MetadataBearer {
    name: "ServiceUnavailableException";
    $fault: "server";
    Message?: string;
}
export declare namespace ServiceUnavailableException {
    const filterSensitiveLog: (obj: ServiceUnavailableException) => any;
}
/**
 * <p> The size of the text you submitted exceeds the size limit. Reduce the size of the text or
 *       use a smaller document and then retry your request. </p>
 */
export interface TextSizeLimitExceededException extends __SmithyException, $MetadataBearer {
    name: "TextSizeLimitExceededException";
    $fault: "client";
    Message?: string;
}
export declare namespace TextSizeLimitExceededException {
    const filterSensitiveLog: (obj: TextSizeLimitExceededException) => any;
}
export interface TranslateTextRequest {
    /**
     * <p>The text to translate. The text string can be a maximum of 5,000 bytes long. Depending on
     *       your character set, this may be fewer than 5,000 characters.</p>
     */
    Text: string | undefined;
    /**
     * <p>The name of the terminology list file to be used in the TranslateText request. You can use
     *       1 terminology list at most in a <code>TranslateText</code> request. Terminology lists can
     *       contain a maximum of 256 terms.</p>
     */
    TerminologyNames?: string[];
    /**
     * <p>The language code for the language of the source text. The language must be a language
     *       supported by Amazon Translate. For a list of language codes, see <a>what-is-languages</a>.</p>
     *          <p>To have Amazon Translate determine the source language of your text, you can specify
     *         <code>auto</code> in the <code>SourceLanguageCode</code> field. If you specify
     *         <code>auto</code>, Amazon Translate will call <a href="https://docs.aws.amazon.com/comprehend/latest/dg/comprehend-general.html">Amazon
     *         Comprehend</a> to determine the source language.</p>
     */
    SourceLanguageCode: string | undefined;
    /**
     * <p>The language code requested for the language of the target text. The language must be a
     *       language supported by Amazon Translate.</p>
     */
    TargetLanguageCode: string | undefined;
}
export declare namespace TranslateTextRequest {
    const filterSensitiveLog: (obj: TranslateTextRequest) => any;
}
export interface TranslateTextResponse {
    /**
     * <p>The translated text.</p>
     */
    TranslatedText: string | undefined;
    /**
     * <p>The language code for the language of the source text.</p>
     */
    SourceLanguageCode: string | undefined;
    /**
     * <p>The language code for the language of the target text. </p>
     */
    TargetLanguageCode: string | undefined;
    /**
     * <p>The names of the custom terminologies applied to the input text by Amazon Translate for the
     *       translated text response.</p>
     */
    AppliedTerminologies?: AppliedTerminology[];
}
export declare namespace TranslateTextResponse {
    const filterSensitiveLog: (obj: TranslateTextResponse) => any;
}
export interface UpdateParallelDataRequest {
    /**
     * <p>The name of the parallel data resource being updated.</p>
     */
    Name: string | undefined;
    /**
     * <p>A custom description for the parallel data resource in Amazon Translate.</p>
     */
    Description?: string;
    /**
     * <p>Specifies the format and S3 location of the parallel data input file.</p>
     */
    ParallelDataConfig: ParallelDataConfig | undefined;
    /**
     * <p>A unique identifier for the request. This token is automatically generated when you use
     *       Amazon Translate through an AWS SDK.</p>
     */
    ClientToken?: string;
}
export declare namespace UpdateParallelDataRequest {
    const filterSensitiveLog: (obj: UpdateParallelDataRequest) => any;
}
export interface UpdateParallelDataResponse {
    /**
     * <p>The name of the parallel data resource being updated.</p>
     */
    Name?: string;
    /**
     * <p>The status of the parallel data resource that you are attempting to update. Your update
     *       request is accepted only if this status is either <code>ACTIVE</code> or
     *       <code>FAILED</code>.</p>
     */
    Status?: ParallelDataStatus | string;
    /**
     * <p>The status of the parallel data update attempt. When the updated parallel data resource is
     *       ready for you to use, the status is <code>ACTIVE</code>.</p>
     */
    LatestUpdateAttemptStatus?: ParallelDataStatus | string;
    /**
     * <p>The time that the most recent update was attempted.</p>
     */
    LatestUpdateAttemptAt?: Date;
}
export declare namespace UpdateParallelDataResponse {
    const filterSensitiveLog: (obj: UpdateParallelDataResponse) => any;
}
