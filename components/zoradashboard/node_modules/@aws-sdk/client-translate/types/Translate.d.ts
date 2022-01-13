import { TranslateClient } from "./TranslateClient";
import { CreateParallelDataCommandInput, CreateParallelDataCommandOutput } from "./commands/CreateParallelDataCommand";
import { DeleteParallelDataCommandInput, DeleteParallelDataCommandOutput } from "./commands/DeleteParallelDataCommand";
import { DeleteTerminologyCommandInput, DeleteTerminologyCommandOutput } from "./commands/DeleteTerminologyCommand";
import { DescribeTextTranslationJobCommandInput, DescribeTextTranslationJobCommandOutput } from "./commands/DescribeTextTranslationJobCommand";
import { GetParallelDataCommandInput, GetParallelDataCommandOutput } from "./commands/GetParallelDataCommand";
import { GetTerminologyCommandInput, GetTerminologyCommandOutput } from "./commands/GetTerminologyCommand";
import { ImportTerminologyCommandInput, ImportTerminologyCommandOutput } from "./commands/ImportTerminologyCommand";
import { ListParallelDataCommandInput, ListParallelDataCommandOutput } from "./commands/ListParallelDataCommand";
import { ListTerminologiesCommandInput, ListTerminologiesCommandOutput } from "./commands/ListTerminologiesCommand";
import { ListTextTranslationJobsCommandInput, ListTextTranslationJobsCommandOutput } from "./commands/ListTextTranslationJobsCommand";
import { StartTextTranslationJobCommandInput, StartTextTranslationJobCommandOutput } from "./commands/StartTextTranslationJobCommand";
import { StopTextTranslationJobCommandInput, StopTextTranslationJobCommandOutput } from "./commands/StopTextTranslationJobCommand";
import { TranslateTextCommandInput, TranslateTextCommandOutput } from "./commands/TranslateTextCommand";
import { UpdateParallelDataCommandInput, UpdateParallelDataCommandOutput } from "./commands/UpdateParallelDataCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";
/**
 * <p>Provides translation between one source language and another of the same set of
 *       languages.</p>
 */
export declare class Translate extends TranslateClient {
    /**
     * <p>Creates a parallel data resource in Amazon Translate by importing an input file from
     *       Amazon S3. Parallel data files contain examples of source phrases and their translations from
     *       your translation memory. By adding parallel data, you can influence the style, tone, and word
     *       choice in your translation output.</p>
     */
    createParallelData(args: CreateParallelDataCommandInput, options?: __HttpHandlerOptions): Promise<CreateParallelDataCommandOutput>;
    createParallelData(args: CreateParallelDataCommandInput, cb: (err: any, data?: CreateParallelDataCommandOutput) => void): void;
    createParallelData(args: CreateParallelDataCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateParallelDataCommandOutput) => void): void;
    /**
     * <p>Deletes a parallel data resource in Amazon Translate.</p>
     */
    deleteParallelData(args: DeleteParallelDataCommandInput, options?: __HttpHandlerOptions): Promise<DeleteParallelDataCommandOutput>;
    deleteParallelData(args: DeleteParallelDataCommandInput, cb: (err: any, data?: DeleteParallelDataCommandOutput) => void): void;
    deleteParallelData(args: DeleteParallelDataCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteParallelDataCommandOutput) => void): void;
    /**
     * <p>A synchronous action that deletes a custom terminology.</p>
     */
    deleteTerminology(args: DeleteTerminologyCommandInput, options?: __HttpHandlerOptions): Promise<DeleteTerminologyCommandOutput>;
    deleteTerminology(args: DeleteTerminologyCommandInput, cb: (err: any, data?: DeleteTerminologyCommandOutput) => void): void;
    deleteTerminology(args: DeleteTerminologyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteTerminologyCommandOutput) => void): void;
    /**
     * <p>Gets the properties associated with an asycnhronous batch translation job including name,
     *       ID, status, source and target languages, input/output S3 buckets, and so on.</p>
     */
    describeTextTranslationJob(args: DescribeTextTranslationJobCommandInput, options?: __HttpHandlerOptions): Promise<DescribeTextTranslationJobCommandOutput>;
    describeTextTranslationJob(args: DescribeTextTranslationJobCommandInput, cb: (err: any, data?: DescribeTextTranslationJobCommandOutput) => void): void;
    describeTextTranslationJob(args: DescribeTextTranslationJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeTextTranslationJobCommandOutput) => void): void;
    /**
     * <p>Provides information about a parallel data resource.</p>
     */
    getParallelData(args: GetParallelDataCommandInput, options?: __HttpHandlerOptions): Promise<GetParallelDataCommandOutput>;
    getParallelData(args: GetParallelDataCommandInput, cb: (err: any, data?: GetParallelDataCommandOutput) => void): void;
    getParallelData(args: GetParallelDataCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetParallelDataCommandOutput) => void): void;
    /**
     * <p>Retrieves a custom terminology.</p>
     */
    getTerminology(args: GetTerminologyCommandInput, options?: __HttpHandlerOptions): Promise<GetTerminologyCommandOutput>;
    getTerminology(args: GetTerminologyCommandInput, cb: (err: any, data?: GetTerminologyCommandOutput) => void): void;
    getTerminology(args: GetTerminologyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetTerminologyCommandOutput) => void): void;
    /**
     * <p>Creates or updates a custom terminology, depending on whether or not one already exists
     *       for the given terminology name. Importing a terminology with the same name as an existing one
     *       will merge the terminologies based on the chosen merge strategy. Currently, the only supported
     *       merge strategy is OVERWRITE, and so the imported terminology will overwrite an existing
     *       terminology of the same name.</p>
     *          <p>If you import a terminology that overwrites an existing one, the new terminology take up
     *       to 10 minutes to fully propagate and be available for use in a translation due to cache
     *       policies with the DataPlane service that performs the translations.</p>
     */
    importTerminology(args: ImportTerminologyCommandInput, options?: __HttpHandlerOptions): Promise<ImportTerminologyCommandOutput>;
    importTerminology(args: ImportTerminologyCommandInput, cb: (err: any, data?: ImportTerminologyCommandOutput) => void): void;
    importTerminology(args: ImportTerminologyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ImportTerminologyCommandOutput) => void): void;
    /**
     * <p>Provides a list of your parallel data resources in Amazon Translate.</p>
     */
    listParallelData(args: ListParallelDataCommandInput, options?: __HttpHandlerOptions): Promise<ListParallelDataCommandOutput>;
    listParallelData(args: ListParallelDataCommandInput, cb: (err: any, data?: ListParallelDataCommandOutput) => void): void;
    listParallelData(args: ListParallelDataCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListParallelDataCommandOutput) => void): void;
    /**
     * <p>Provides a list of custom terminologies associated with your account.</p>
     */
    listTerminologies(args: ListTerminologiesCommandInput, options?: __HttpHandlerOptions): Promise<ListTerminologiesCommandOutput>;
    listTerminologies(args: ListTerminologiesCommandInput, cb: (err: any, data?: ListTerminologiesCommandOutput) => void): void;
    listTerminologies(args: ListTerminologiesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListTerminologiesCommandOutput) => void): void;
    /**
     * <p>Gets a list of the batch translation jobs that you have submitted.</p>
     */
    listTextTranslationJobs(args: ListTextTranslationJobsCommandInput, options?: __HttpHandlerOptions): Promise<ListTextTranslationJobsCommandOutput>;
    listTextTranslationJobs(args: ListTextTranslationJobsCommandInput, cb: (err: any, data?: ListTextTranslationJobsCommandOutput) => void): void;
    listTextTranslationJobs(args: ListTextTranslationJobsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListTextTranslationJobsCommandOutput) => void): void;
    /**
     * <p>Starts an asynchronous batch translation job. Batch translation jobs can be used to
     *       translate large volumes of text across multiple documents at once. For more information, see
     *         <a>async</a>.</p>
     *
     *          <p>Batch translation jobs can be described with the <a>DescribeTextTranslationJob</a> operation, listed with the <a>ListTextTranslationJobs</a> operation, and stopped with the <a>StopTextTranslationJob</a> operation.</p>
     *          <note>
     *             <p>Amazon Translate does not support batch translation of multiple source languages at once.</p>
     *          </note>
     */
    startTextTranslationJob(args: StartTextTranslationJobCommandInput, options?: __HttpHandlerOptions): Promise<StartTextTranslationJobCommandOutput>;
    startTextTranslationJob(args: StartTextTranslationJobCommandInput, cb: (err: any, data?: StartTextTranslationJobCommandOutput) => void): void;
    startTextTranslationJob(args: StartTextTranslationJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StartTextTranslationJobCommandOutput) => void): void;
    /**
     * <p>Stops an asynchronous batch translation job that is in progress.</p>
     *          <p>If the job's state is <code>IN_PROGRESS</code>, the job will be marked for termination and
     *       put into the <code>STOP_REQUESTED</code> state. If the job completes before it can be stopped,
     *       it is put into the <code>COMPLETED</code> state. Otherwise, the job is put into the
     *         <code>STOPPED</code> state.</p>
     *          <p>Asynchronous batch translation jobs are started with the <a>StartTextTranslationJob</a> operation. You can use the <a>DescribeTextTranslationJob</a> or <a>ListTextTranslationJobs</a>
     *       operations to get a batch translation job's <code>JobId</code>.</p>
     */
    stopTextTranslationJob(args: StopTextTranslationJobCommandInput, options?: __HttpHandlerOptions): Promise<StopTextTranslationJobCommandOutput>;
    stopTextTranslationJob(args: StopTextTranslationJobCommandInput, cb: (err: any, data?: StopTextTranslationJobCommandOutput) => void): void;
    stopTextTranslationJob(args: StopTextTranslationJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StopTextTranslationJobCommandOutput) => void): void;
    /**
     * <p>Translates input text from the source language to the target language. For a list of
     *       available languages and language codes, see <a>what-is-languages</a>.</p>
     */
    translateText(args: TranslateTextCommandInput, options?: __HttpHandlerOptions): Promise<TranslateTextCommandOutput>;
    translateText(args: TranslateTextCommandInput, cb: (err: any, data?: TranslateTextCommandOutput) => void): void;
    translateText(args: TranslateTextCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: TranslateTextCommandOutput) => void): void;
    /**
     * <p>Updates a previously created parallel data resource by importing a new input file from
     *       Amazon S3.</p>
     */
    updateParallelData(args: UpdateParallelDataCommandInput, options?: __HttpHandlerOptions): Promise<UpdateParallelDataCommandOutput>;
    updateParallelData(args: UpdateParallelDataCommandInput, cb: (err: any, data?: UpdateParallelDataCommandOutput) => void): void;
    updateParallelData(args: UpdateParallelDataCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateParallelDataCommandOutput) => void): void;
}
