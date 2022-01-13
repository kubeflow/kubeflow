import { PollyClient } from "./PollyClient";
import { DeleteLexiconCommandInput, DeleteLexiconCommandOutput } from "./commands/DeleteLexiconCommand";
import { DescribeVoicesCommandInput, DescribeVoicesCommandOutput } from "./commands/DescribeVoicesCommand";
import { GetLexiconCommandInput, GetLexiconCommandOutput } from "./commands/GetLexiconCommand";
import { GetSpeechSynthesisTaskCommandInput, GetSpeechSynthesisTaskCommandOutput } from "./commands/GetSpeechSynthesisTaskCommand";
import { ListLexiconsCommandInput, ListLexiconsCommandOutput } from "./commands/ListLexiconsCommand";
import { ListSpeechSynthesisTasksCommandInput, ListSpeechSynthesisTasksCommandOutput } from "./commands/ListSpeechSynthesisTasksCommand";
import { PutLexiconCommandInput, PutLexiconCommandOutput } from "./commands/PutLexiconCommand";
import { StartSpeechSynthesisTaskCommandInput, StartSpeechSynthesisTaskCommandOutput } from "./commands/StartSpeechSynthesisTaskCommand";
import { SynthesizeSpeechCommandInput, SynthesizeSpeechCommandOutput } from "./commands/SynthesizeSpeechCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";
/**
 * <p>Amazon Polly is a web service that makes it easy to synthesize speech from
 *       text.</p>
 *          <p>The Amazon Polly service provides API operations for synthesizing high-quality speech
 *       from plain text and Speech Synthesis Markup Language (SSML), along with managing
 *       pronunciations lexicons that enable you to get the best results for your application
 *       domain.</p>
 */
export declare class Polly extends PollyClient {
    /**
     * <p>Deletes the specified pronunciation lexicon stored in an AWS Region. A lexicon which
     *       has been deleted is not available for speech synthesis, nor is it possible to retrieve it
     *       using either the <code>GetLexicon</code> or <code>ListLexicon</code> APIs.</p>
     *          <p>For more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html">Managing
     *         Lexicons</a>.</p>
     */
    deleteLexicon(args: DeleteLexiconCommandInput, options?: __HttpHandlerOptions): Promise<DeleteLexiconCommandOutput>;
    deleteLexicon(args: DeleteLexiconCommandInput, cb: (err: any, data?: DeleteLexiconCommandOutput) => void): void;
    deleteLexicon(args: DeleteLexiconCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteLexiconCommandOutput) => void): void;
    /**
     * <p>Returns the list of voices that are available for use when requesting speech synthesis.
     *       Each voice speaks a specified language, is either male or female, and is identified by an ID,
     *       which is the ASCII version of the voice name. </p>
     *
     *          <p>When synthesizing speech ( <code>SynthesizeSpeech</code> ), you provide the voice ID
     *       for the voice you want from the list of voices returned by
     *       <code>DescribeVoices</code>.</p>
     *
     *          <p>For example, you want your news reader application to read news in a specific language,
     *       but giving a user the option to choose the voice. Using the <code>DescribeVoices</code>
     *       operation you can provide the user with a list of available voices to select from.</p>
     *
     *          <p> You can optionally specify a language code to filter the available voices. For
     *       example, if you specify <code>en-US</code>, the operation returns a list of all available US
     *       English voices. </p>
     *          <p>This operation requires permissions to perform the <code>polly:DescribeVoices</code>
     *       action.</p>
     */
    describeVoices(args: DescribeVoicesCommandInput, options?: __HttpHandlerOptions): Promise<DescribeVoicesCommandOutput>;
    describeVoices(args: DescribeVoicesCommandInput, cb: (err: any, data?: DescribeVoicesCommandOutput) => void): void;
    describeVoices(args: DescribeVoicesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeVoicesCommandOutput) => void): void;
    /**
     * <p>Returns the content of the specified pronunciation lexicon stored in an AWS Region. For
     *       more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html">Managing
     *         Lexicons</a>.</p>
     */
    getLexicon(args: GetLexiconCommandInput, options?: __HttpHandlerOptions): Promise<GetLexiconCommandOutput>;
    getLexicon(args: GetLexiconCommandInput, cb: (err: any, data?: GetLexiconCommandOutput) => void): void;
    getLexicon(args: GetLexiconCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetLexiconCommandOutput) => void): void;
    /**
     * <p>Retrieves a specific SpeechSynthesisTask object based on its TaskID. This object contains
     *       information about the given speech synthesis task, including the status of the task, and a
     *       link to the S3 bucket containing the output of the task.</p>
     */
    getSpeechSynthesisTask(args: GetSpeechSynthesisTaskCommandInput, options?: __HttpHandlerOptions): Promise<GetSpeechSynthesisTaskCommandOutput>;
    getSpeechSynthesisTask(args: GetSpeechSynthesisTaskCommandInput, cb: (err: any, data?: GetSpeechSynthesisTaskCommandOutput) => void): void;
    getSpeechSynthesisTask(args: GetSpeechSynthesisTaskCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetSpeechSynthesisTaskCommandOutput) => void): void;
    /**
     * <p>Returns a list of pronunciation lexicons stored in an AWS Region. For more information,
     *       see <a href="https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html">Managing
     *         Lexicons</a>.</p>
     */
    listLexicons(args: ListLexiconsCommandInput, options?: __HttpHandlerOptions): Promise<ListLexiconsCommandOutput>;
    listLexicons(args: ListLexiconsCommandInput, cb: (err: any, data?: ListLexiconsCommandOutput) => void): void;
    listLexicons(args: ListLexiconsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListLexiconsCommandOutput) => void): void;
    /**
     * <p>Returns a list of SpeechSynthesisTask objects ordered by their creation date. This
     *       operation can filter the tasks by their status, for example, allowing users to list only tasks
     *       that are completed.</p>
     */
    listSpeechSynthesisTasks(args: ListSpeechSynthesisTasksCommandInput, options?: __HttpHandlerOptions): Promise<ListSpeechSynthesisTasksCommandOutput>;
    listSpeechSynthesisTasks(args: ListSpeechSynthesisTasksCommandInput, cb: (err: any, data?: ListSpeechSynthesisTasksCommandOutput) => void): void;
    listSpeechSynthesisTasks(args: ListSpeechSynthesisTasksCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListSpeechSynthesisTasksCommandOutput) => void): void;
    /**
     * <p>Stores a pronunciation lexicon in an AWS Region. If a lexicon with the same name
     *       already exists in the region, it is overwritten by the new lexicon. Lexicon operations have
     *       eventual consistency, therefore, it might take some time before the lexicon is available to
     *       the SynthesizeSpeech operation.</p>
     *          <p>For more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html">Managing
     *         Lexicons</a>.</p>
     */
    putLexicon(args: PutLexiconCommandInput, options?: __HttpHandlerOptions): Promise<PutLexiconCommandOutput>;
    putLexicon(args: PutLexiconCommandInput, cb: (err: any, data?: PutLexiconCommandOutput) => void): void;
    putLexicon(args: PutLexiconCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutLexiconCommandOutput) => void): void;
    /**
     * <p>Allows the creation of an asynchronous synthesis task, by starting a new
     *         <code>SpeechSynthesisTask</code>. This operation requires all the standard information
     *       needed for speech synthesis, plus the name of an Amazon S3 bucket for the service to store the
     *       output of the synthesis task and two optional parameters (OutputS3KeyPrefix and SnsTopicArn).
     *       Once the synthesis task is created, this operation will return a SpeechSynthesisTask object,
     *       which will include an identifier of this task as well as the current status.</p>
     */
    startSpeechSynthesisTask(args: StartSpeechSynthesisTaskCommandInput, options?: __HttpHandlerOptions): Promise<StartSpeechSynthesisTaskCommandOutput>;
    startSpeechSynthesisTask(args: StartSpeechSynthesisTaskCommandInput, cb: (err: any, data?: StartSpeechSynthesisTaskCommandOutput) => void): void;
    startSpeechSynthesisTask(args: StartSpeechSynthesisTaskCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StartSpeechSynthesisTaskCommandOutput) => void): void;
    /**
     * <p>Synthesizes UTF-8 input, plain text or SSML, to a stream of bytes. SSML input must be
     *       valid, well-formed SSML. Some alphabets might not be available with all the voices (for
     *       example, Cyrillic might not be read at all by English voices) unless phoneme mapping is used.
     *       For more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/how-text-to-speech-works.html">How it
     *         Works</a>.</p>
     */
    synthesizeSpeech(args: SynthesizeSpeechCommandInput, options?: __HttpHandlerOptions): Promise<SynthesizeSpeechCommandOutput>;
    synthesizeSpeech(args: SynthesizeSpeechCommandInput, cb: (err: any, data?: SynthesizeSpeechCommandOutput) => void): void;
    synthesizeSpeech(args: SynthesizeSpeechCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: SynthesizeSpeechCommandOutput) => void): void;
}
