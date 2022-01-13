import { PersonalizeEventsClient } from "./PersonalizeEventsClient";
import { PutEventsCommand, PutEventsCommandInput, PutEventsCommandOutput } from "./commands/PutEventsCommand";
import { PutItemsCommand, PutItemsCommandInput, PutItemsCommandOutput } from "./commands/PutItemsCommand";
import { PutUsersCommand, PutUsersCommandInput, PutUsersCommandOutput } from "./commands/PutUsersCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";

/**
 * <p>Amazon Personalize can consume real-time user event data, such as <i>stream</i> or <i>click</i> data, and use
 *       it for model training either alone or combined with historical data. For more information see <a>recording-events</a>.</p>
 */
export class PersonalizeEvents extends PersonalizeEventsClient {
  /**
   * <p>Records user interaction event data. For more information see <a>event-record-api</a>.</p>
   */
  public putEvents(args: PutEventsCommandInput, options?: __HttpHandlerOptions): Promise<PutEventsCommandOutput>;
  public putEvents(args: PutEventsCommandInput, cb: (err: any, data?: PutEventsCommandOutput) => void): void;
  public putEvents(
    args: PutEventsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutEventsCommandOutput) => void
  ): void;
  public putEvents(
    args: PutEventsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutEventsCommandOutput) => void),
    cb?: (err: any, data?: PutEventsCommandOutput) => void
  ): Promise<PutEventsCommandOutput> | void {
    const command = new PutEventsCommand(args);
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
   * <p>Adds one or more items to an Items dataset. For more information see
   *       <a>importing-items</a>.</p>
   */
  public putItems(args: PutItemsCommandInput, options?: __HttpHandlerOptions): Promise<PutItemsCommandOutput>;
  public putItems(args: PutItemsCommandInput, cb: (err: any, data?: PutItemsCommandOutput) => void): void;
  public putItems(
    args: PutItemsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutItemsCommandOutput) => void
  ): void;
  public putItems(
    args: PutItemsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutItemsCommandOutput) => void),
    cb?: (err: any, data?: PutItemsCommandOutput) => void
  ): Promise<PutItemsCommandOutput> | void {
    const command = new PutItemsCommand(args);
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
   * <p>Adds one or more users to a Users dataset. For more information see
   *       <a>importing-users</a>.</p>
   */
  public putUsers(args: PutUsersCommandInput, options?: __HttpHandlerOptions): Promise<PutUsersCommandOutput>;
  public putUsers(args: PutUsersCommandInput, cb: (err: any, data?: PutUsersCommandOutput) => void): void;
  public putUsers(
    args: PutUsersCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutUsersCommandOutput) => void
  ): void;
  public putUsers(
    args: PutUsersCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutUsersCommandOutput) => void),
    cb?: (err: any, data?: PutUsersCommandOutput) => void
  ): Promise<PutUsersCommandOutput> | void {
    const command = new PutUsersCommand(args);
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
