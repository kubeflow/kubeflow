import { LexRuntimeServiceClient } from "./LexRuntimeServiceClient";
import {
  DeleteSessionCommand,
  DeleteSessionCommandInput,
  DeleteSessionCommandOutput,
} from "./commands/DeleteSessionCommand";
import { GetSessionCommand, GetSessionCommandInput, GetSessionCommandOutput } from "./commands/GetSessionCommand";
import { PostContentCommand, PostContentCommandInput, PostContentCommandOutput } from "./commands/PostContentCommand";
import { PostTextCommand, PostTextCommandInput, PostTextCommandOutput } from "./commands/PostTextCommand";
import { PutSessionCommand, PutSessionCommandInput, PutSessionCommandOutput } from "./commands/PutSessionCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";

/**
 * <p>Amazon Lex provides both build and runtime endpoints. Each endpoint provides a set of
 *       operations (API). Your conversational bot uses the runtime API to understand user utterances
 *       (user input text or voice). For example, suppose a user says "I want pizza", your bot sends
 *       this input to Amazon Lex using the runtime API. Amazon Lex recognizes that the user request is
 *       for the OrderPizza intent (one of the intents defined in the bot). Then Amazon Lex engages in
 *       user conversation on behalf of the bot to elicit required information (slot values, such as
 *       pizza size and crust type), and then performs fulfillment activity (that you configured when
 *       you created the bot). You use the build-time API to create and manage your Amazon Lex bot. For
 *       a list of build-time operations, see the build-time API, . </p>
 */
export class LexRuntimeService extends LexRuntimeServiceClient {
  /**
   * <p>Removes session information for a specified bot, alias, and user ID. </p>
   */
  public deleteSession(
    args: DeleteSessionCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteSessionCommandOutput>;
  public deleteSession(
    args: DeleteSessionCommandInput,
    cb: (err: any, data?: DeleteSessionCommandOutput) => void
  ): void;
  public deleteSession(
    args: DeleteSessionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteSessionCommandOutput) => void
  ): void;
  public deleteSession(
    args: DeleteSessionCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteSessionCommandOutput) => void),
    cb?: (err: any, data?: DeleteSessionCommandOutput) => void
  ): Promise<DeleteSessionCommandOutput> | void {
    const command = new DeleteSessionCommand(args);
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
   * <p>Returns session information for a specified bot, alias, and user ID.</p>
   */
  public getSession(args: GetSessionCommandInput, options?: __HttpHandlerOptions): Promise<GetSessionCommandOutput>;
  public getSession(args: GetSessionCommandInput, cb: (err: any, data?: GetSessionCommandOutput) => void): void;
  public getSession(
    args: GetSessionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetSessionCommandOutput) => void
  ): void;
  public getSession(
    args: GetSessionCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetSessionCommandOutput) => void),
    cb?: (err: any, data?: GetSessionCommandOutput) => void
  ): Promise<GetSessionCommandOutput> | void {
    const command = new GetSessionCommand(args);
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
   * <p> Sends user input (text or speech) to Amazon Lex. Clients use this API to send text and audio
   *       requests to Amazon Lex at runtime. Amazon Lex interprets the user input using the machine learning model
   *       that it built for the bot. </p>
   *          <p>The <code>PostContent</code> operation supports audio input at 8kHz and 16kHz. You can use
   *       8kHz audio to achieve higher speech recognition accuracy in telephone audio applications. </p>
   *          <p> In response, Amazon Lex returns the next message to convey to the user. Consider the following
   *       example messages: </p>
   *          <ul>
   *             <li>
   *                <p> For a user input "I would like a pizza," Amazon Lex might return a response with a message
   *           eliciting slot data (for example, <code>PizzaSize</code>): "What size pizza would you
   *           like?". </p>
   *             </li>
   *             <li>
   *                <p> After the user provides all of the pizza order information, Amazon Lex might return a
   *           response with a message to get user confirmation: "Order the pizza?". </p>
   *             </li>
   *             <li>
   *                <p> After the user replies "Yes" to the confirmation prompt, Amazon Lex might return a
   *           conclusion statement: "Thank you, your cheese pizza has been ordered.". </p>
   *             </li>
   *          </ul>
   *          <p> Not all Amazon Lex messages require a response from the user. For example, conclusion
   *       statements do not require a response. Some messages require only a yes or no response. In
   *       addition to the <code>message</code>, Amazon Lex provides additional context about the message in
   *       the response that you can use to enhance client behavior, such as displaying the appropriate
   *       client user interface. Consider the following examples: </p>
   *          <ul>
   *             <li>
   *                <p> If the message is to elicit slot data, Amazon Lex returns the following context
   *           information: </p>
   *                <ul>
   *                   <li>
   *                      <p>
   *                         <code>x-amz-lex-dialog-state</code> header set to <code>ElicitSlot</code>
   *                      </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <code>x-amz-lex-intent-name</code> header set to the intent name in the current
   *               context </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <code>x-amz-lex-slot-to-elicit</code> header set to the slot name for which the
   *                 <code>message</code> is eliciting information </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <code>x-amz-lex-slots</code> header set to a map of slots configured for the intent
   *               with their current values </p>
   *                   </li>
   *                </ul>
   *             </li>
   *             <li>
   *                <p> If the message is a confirmation prompt, the <code>x-amz-lex-dialog-state</code>
   *           header is set to <code>Confirmation</code> and the <code>x-amz-lex-slot-to-elicit</code>
   *           header is omitted. </p>
   *             </li>
   *             <li>
   *                <p> If the message is a clarification prompt configured for the intent, indicating that
   *           the user intent is not understood, the <code>x-amz-dialog-state</code> header is set to
   *             <code>ElicitIntent</code> and the <code>x-amz-slot-to-elicit</code> header is omitted.
   *         </p>
   *             </li>
   *          </ul>
   *          <p> In addition, Amazon Lex also returns your application-specific <code>sessionAttributes</code>.
   *       For more information, see <a href="https://docs.aws.amazon.com/lex/latest/dg/context-mgmt.html">Managing Conversation Context</a>. </p>
   */
  public postContent(args: PostContentCommandInput, options?: __HttpHandlerOptions): Promise<PostContentCommandOutput>;
  public postContent(args: PostContentCommandInput, cb: (err: any, data?: PostContentCommandOutput) => void): void;
  public postContent(
    args: PostContentCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PostContentCommandOutput) => void
  ): void;
  public postContent(
    args: PostContentCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PostContentCommandOutput) => void),
    cb?: (err: any, data?: PostContentCommandOutput) => void
  ): Promise<PostContentCommandOutput> | void {
    const command = new PostContentCommand(args);
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
   * <p>Sends user input to Amazon Lex. Client applications can use this API to send requests to
   *       Amazon Lex at runtime. Amazon Lex then interprets the user input using the machine learning model it
   *       built for the bot. </p>
   *          <p> In response, Amazon Lex returns the next <code>message</code> to convey to the user an
   *       optional <code>responseCard</code> to display. Consider the following example messages: </p>
   *          <ul>
   *             <li>
   *                <p> For a user input "I would like a pizza", Amazon Lex might return a response with a
   *           message eliciting slot data (for example, PizzaSize): "What size pizza would you like?"
   *         </p>
   *             </li>
   *             <li>
   *                <p> After the user provides all of the pizza order information, Amazon Lex might return a
   *           response with a message to obtain user confirmation "Proceed with the pizza order?".
   *         </p>
   *             </li>
   *             <li>
   *                <p> After the user replies to a confirmation prompt with a "yes", Amazon Lex might return
   *           a conclusion statement: "Thank you, your cheese pizza has been ordered.". </p>
   *             </li>
   *          </ul>
   *
   *          <p> Not all Amazon Lex messages require a user response. For example, a conclusion statement
   *       does not require a response. Some messages require only a "yes" or "no" user response. In
   *       addition to the <code>message</code>, Amazon Lex provides additional context about the message
   *       in the response that you might use to enhance client behavior, for example, to display the
   *       appropriate client user interface. These are the <code>slotToElicit</code>,
   *         <code>dialogState</code>, <code>intentName</code>, and <code>slots</code> fields in the
   *       response. Consider the following examples: </p>
   *
   *          <ul>
   *             <li>
   *                <p>If the message is to elicit slot data, Amazon Lex returns the following context
   *           information:</p>
   *                <ul>
   *                   <li>
   *                      <p>
   *                         <code>dialogState</code> set to ElicitSlot </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <code>intentName</code> set to the intent name in the current context </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <code>slotToElicit</code> set to the slot name for which the <code>message</code> is
   *               eliciting information </p>
   *                   </li>
   *                   <li>
   *                      <p>
   *                         <code>slots</code> set to a map of slots, configured for the intent, with currently
   *               known values </p>
   *                   </li>
   *                </ul>
   *             </li>
   *             <li>
   *                <p> If the message is a confirmation prompt, the <code>dialogState</code> is set to
   *           ConfirmIntent and <code>SlotToElicit</code> is set to null. </p>
   *             </li>
   *             <li>
   *                <p>If the message is a clarification prompt (configured for the intent) that indicates
   *           that user intent is not understood, the <code>dialogState</code> is set to ElicitIntent
   *           and <code>slotToElicit</code> is set to null. </p>
   *             </li>
   *          </ul>
   *
   *          <p> In addition, Amazon Lex also returns your application-specific
   *         <code>sessionAttributes</code>. For more information, see <a href="https://docs.aws.amazon.com/lex/latest/dg/context-mgmt.html">Managing Conversation Context</a>. </p>
   */
  public postText(args: PostTextCommandInput, options?: __HttpHandlerOptions): Promise<PostTextCommandOutput>;
  public postText(args: PostTextCommandInput, cb: (err: any, data?: PostTextCommandOutput) => void): void;
  public postText(
    args: PostTextCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PostTextCommandOutput) => void
  ): void;
  public postText(
    args: PostTextCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PostTextCommandOutput) => void),
    cb?: (err: any, data?: PostTextCommandOutput) => void
  ): Promise<PostTextCommandOutput> | void {
    const command = new PostTextCommand(args);
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
   * <p>Creates a new session or modifies an existing session with an Amazon Lex bot. Use this
   *       operation to enable your application to set the state of the bot.</p>
   *          <p>For more information, see <a href="https://docs.aws.amazon.com/lex/latest/dg/how-session-api.html">Managing Sessions</a>.</p>
   */
  public putSession(args: PutSessionCommandInput, options?: __HttpHandlerOptions): Promise<PutSessionCommandOutput>;
  public putSession(args: PutSessionCommandInput, cb: (err: any, data?: PutSessionCommandOutput) => void): void;
  public putSession(
    args: PutSessionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutSessionCommandOutput) => void
  ): void;
  public putSession(
    args: PutSessionCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutSessionCommandOutput) => void),
    cb?: (err: any, data?: PutSessionCommandOutput) => void
  ): Promise<PutSessionCommandOutput> | void {
    const command = new PutSessionCommand(args);
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
