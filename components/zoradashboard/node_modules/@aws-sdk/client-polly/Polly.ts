import { PollyClient } from "./PollyClient";
import {
  DeleteLexiconCommand,
  DeleteLexiconCommandInput,
  DeleteLexiconCommandOutput,
} from "./commands/DeleteLexiconCommand";
import {
  DescribeVoicesCommand,
  DescribeVoicesCommandInput,
  DescribeVoicesCommandOutput,
} from "./commands/DescribeVoicesCommand";
import { GetLexiconCommand, GetLexiconCommandInput, GetLexiconCommandOutput } from "./commands/GetLexiconCommand";
import {
  GetSpeechSynthesisTaskCommand,
  GetSpeechSynthesisTaskCommandInput,
  GetSpeechSynthesisTaskCommandOutput,
} from "./commands/GetSpeechSynthesisTaskCommand";
import {
  ListLexiconsCommand,
  ListLexiconsCommandInput,
  ListLexiconsCommandOutput,
} from "./commands/ListLexiconsCommand";
import {
  ListSpeechSynthesisTasksCommand,
  ListSpeechSynthesisTasksCommandInput,
  ListSpeechSynthesisTasksCommandOutput,
} from "./commands/ListSpeechSynthesisTasksCommand";
import { PutLexiconCommand, PutLexiconCommandInput, PutLexiconCommandOutput } from "./commands/PutLexiconCommand";
import {
  StartSpeechSynthesisTaskCommand,
  StartSpeechSynthesisTaskCommandInput,
  StartSpeechSynthesisTaskCommandOutput,
} from "./commands/StartSpeechSynthesisTaskCommand";
import {
  SynthesizeSpeechCommand,
  SynthesizeSpeechCommandInput,
  SynthesizeSpeechCommandOutput,
} from "./commands/SynthesizeSpeechCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";

/**
 * <p>Amazon Polly is a web service that makes it easy to synthesize speech from
 *       text.</p>
 *          <p>The Amazon Polly service provides API operations for synthesizing high-quality speech
 *       from plain text and Speech Synthesis Markup Language (SSML), along with managing
 *       pronunciations lexicons that enable you to get the best results for your application
 *       domain.</p>
 */
export class Polly extends PollyClient {
  /**
   * <p>Deletes the specified pronunciation lexicon stored in an AWS Region. A lexicon which
   *       has been deleted is not available for speech synthesis, nor is it possible to retrieve it
   *       using either the <code>GetLexicon</code> or <code>ListLexicon</code> APIs.</p>
   *          <p>For more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html">Managing
   *         Lexicons</a>.</p>
   */
  public deleteLexicon(
    args: DeleteLexiconCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteLexiconCommandOutput>;
  public deleteLexicon(
    args: DeleteLexiconCommandInput,
    cb: (err: any, data?: DeleteLexiconCommandOutput) => void
  ): void;
  public deleteLexicon(
    args: DeleteLexiconCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteLexiconCommandOutput) => void
  ): void;
  public deleteLexicon(
    args: DeleteLexiconCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteLexiconCommandOutput) => void),
    cb?: (err: any, data?: DeleteLexiconCommandOutput) => void
  ): Promise<DeleteLexiconCommandOutput> | void {
    const command = new DeleteLexiconCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public describeVoices(
    args: DescribeVoicesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeVoicesCommandOutput>;
  public describeVoices(
    args: DescribeVoicesCommandInput,
    cb: (err: any, data?: DescribeVoicesCommandOutput) => void
  ): void;
  public describeVoices(
    args: DescribeVoicesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeVoicesCommandOutput) => void
  ): void;
  public describeVoices(
    args: DescribeVoicesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeVoicesCommandOutput) => void),
    cb?: (err: any, data?: DescribeVoicesCommandOutput) => void
  ): Promise<DescribeVoicesCommandOutput> | void {
    const command = new DescribeVoicesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns the content of the specified pronunciation lexicon stored in an AWS Region. For
   *       more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html">Managing
   *         Lexicons</a>.</p>
   */
  public getLexicon(args: GetLexiconCommandInput, options?: __HttpHandlerOptions): Promise<GetLexiconCommandOutput>;
  public getLexicon(args: GetLexiconCommandInput, cb: (err: any, data?: GetLexiconCommandOutput) => void): void;
  public getLexicon(
    args: GetLexiconCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetLexiconCommandOutput) => void
  ): void;
  public getLexicon(
    args: GetLexiconCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetLexiconCommandOutput) => void),
    cb?: (err: any, data?: GetLexiconCommandOutput) => void
  ): Promise<GetLexiconCommandOutput> | void {
    const command = new GetLexiconCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves a specific SpeechSynthesisTask object based on its TaskID. This object contains
   *       information about the given speech synthesis task, including the status of the task, and a
   *       link to the S3 bucket containing the output of the task.</p>
   */
  public getSpeechSynthesisTask(
    args: GetSpeechSynthesisTaskCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetSpeechSynthesisTaskCommandOutput>;
  public getSpeechSynthesisTask(
    args: GetSpeechSynthesisTaskCommandInput,
    cb: (err: any, data?: GetSpeechSynthesisTaskCommandOutput) => void
  ): void;
  public getSpeechSynthesisTask(
    args: GetSpeechSynthesisTaskCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetSpeechSynthesisTaskCommandOutput) => void
  ): void;
  public getSpeechSynthesisTask(
    args: GetSpeechSynthesisTaskCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetSpeechSynthesisTaskCommandOutput) => void),
    cb?: (err: any, data?: GetSpeechSynthesisTaskCommandOutput) => void
  ): Promise<GetSpeechSynthesisTaskCommandOutput> | void {
    const command = new GetSpeechSynthesisTaskCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns a list of pronunciation lexicons stored in an AWS Region. For more information,
   *       see <a href="https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html">Managing
   *         Lexicons</a>.</p>
   */
  public listLexicons(
    args: ListLexiconsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListLexiconsCommandOutput>;
  public listLexicons(args: ListLexiconsCommandInput, cb: (err: any, data?: ListLexiconsCommandOutput) => void): void;
  public listLexicons(
    args: ListLexiconsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListLexiconsCommandOutput) => void
  ): void;
  public listLexicons(
    args: ListLexiconsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListLexiconsCommandOutput) => void),
    cb?: (err: any, data?: ListLexiconsCommandOutput) => void
  ): Promise<ListLexiconsCommandOutput> | void {
    const command = new ListLexiconsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns a list of SpeechSynthesisTask objects ordered by their creation date. This
   *       operation can filter the tasks by their status, for example, allowing users to list only tasks
   *       that are completed.</p>
   */
  public listSpeechSynthesisTasks(
    args: ListSpeechSynthesisTasksCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListSpeechSynthesisTasksCommandOutput>;
  public listSpeechSynthesisTasks(
    args: ListSpeechSynthesisTasksCommandInput,
    cb: (err: any, data?: ListSpeechSynthesisTasksCommandOutput) => void
  ): void;
  public listSpeechSynthesisTasks(
    args: ListSpeechSynthesisTasksCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListSpeechSynthesisTasksCommandOutput) => void
  ): void;
  public listSpeechSynthesisTasks(
    args: ListSpeechSynthesisTasksCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListSpeechSynthesisTasksCommandOutput) => void),
    cb?: (err: any, data?: ListSpeechSynthesisTasksCommandOutput) => void
  ): Promise<ListSpeechSynthesisTasksCommandOutput> | void {
    const command = new ListSpeechSynthesisTasksCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Stores a pronunciation lexicon in an AWS Region. If a lexicon with the same name
   *       already exists in the region, it is overwritten by the new lexicon. Lexicon operations have
   *       eventual consistency, therefore, it might take some time before the lexicon is available to
   *       the SynthesizeSpeech operation.</p>
   *          <p>For more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html">Managing
   *         Lexicons</a>.</p>
   */
  public putLexicon(args: PutLexiconCommandInput, options?: __HttpHandlerOptions): Promise<PutLexiconCommandOutput>;
  public putLexicon(args: PutLexiconCommandInput, cb: (err: any, data?: PutLexiconCommandOutput) => void): void;
  public putLexicon(
    args: PutLexiconCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutLexiconCommandOutput) => void
  ): void;
  public putLexicon(
    args: PutLexiconCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutLexiconCommandOutput) => void),
    cb?: (err: any, data?: PutLexiconCommandOutput) => void
  ): Promise<PutLexiconCommandOutput> | void {
    const command = new PutLexiconCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Allows the creation of an asynchronous synthesis task, by starting a new
   *         <code>SpeechSynthesisTask</code>. This operation requires all the standard information
   *       needed for speech synthesis, plus the name of an Amazon S3 bucket for the service to store the
   *       output of the synthesis task and two optional parameters (OutputS3KeyPrefix and SnsTopicArn).
   *       Once the synthesis task is created, this operation will return a SpeechSynthesisTask object,
   *       which will include an identifier of this task as well as the current status.</p>
   */
  public startSpeechSynthesisTask(
    args: StartSpeechSynthesisTaskCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StartSpeechSynthesisTaskCommandOutput>;
  public startSpeechSynthesisTask(
    args: StartSpeechSynthesisTaskCommandInput,
    cb: (err: any, data?: StartSpeechSynthesisTaskCommandOutput) => void
  ): void;
  public startSpeechSynthesisTask(
    args: StartSpeechSynthesisTaskCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StartSpeechSynthesisTaskCommandOutput) => void
  ): void;
  public startSpeechSynthesisTask(
    args: StartSpeechSynthesisTaskCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StartSpeechSynthesisTaskCommandOutput) => void),
    cb?: (err: any, data?: StartSpeechSynthesisTaskCommandOutput) => void
  ): Promise<StartSpeechSynthesisTaskCommandOutput> | void {
    const command = new StartSpeechSynthesisTaskCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Synthesizes UTF-8 input, plain text or SSML, to a stream of bytes. SSML input must be
   *       valid, well-formed SSML. Some alphabets might not be available with all the voices (for
   *       example, Cyrillic might not be read at all by English voices) unless phoneme mapping is used.
   *       For more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/how-text-to-speech-works.html">How it
   *         Works</a>.</p>
   */
  public synthesizeSpeech(
    args: SynthesizeSpeechCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<SynthesizeSpeechCommandOutput>;
  public synthesizeSpeech(
    args: SynthesizeSpeechCommandInput,
    cb: (err: any, data?: SynthesizeSpeechCommandOutput) => void
  ): void;
  public synthesizeSpeech(
    args: SynthesizeSpeechCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: SynthesizeSpeechCommandOutput) => void
  ): void;
  public synthesizeSpeech(
    args: SynthesizeSpeechCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: SynthesizeSpeechCommandOutput) => void),
    cb?: (err: any, data?: SynthesizeSpeechCommandOutput) => void
  ): Promise<SynthesizeSpeechCommandOutput> | void {
    const command = new SynthesizeSpeechCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }
}
