import { PersonalizeEventsClient } from "./PersonalizeEventsClient";
import { PutEventsCommandInput, PutEventsCommandOutput } from "./commands/PutEventsCommand";
import { PutItemsCommandInput, PutItemsCommandOutput } from "./commands/PutItemsCommand";
import { PutUsersCommandInput, PutUsersCommandOutput } from "./commands/PutUsersCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";
/**
 * <p>Amazon Personalize can consume real-time user event data, such as <i>stream</i> or <i>click</i> data, and use
 *       it for model training either alone or combined with historical data. For more information see <a>recording-events</a>.</p>
 */
export declare class PersonalizeEvents extends PersonalizeEventsClient {
    /**
     * <p>Records user interaction event data. For more information see <a>event-record-api</a>.</p>
     */
    putEvents(args: PutEventsCommandInput, options?: __HttpHandlerOptions): Promise<PutEventsCommandOutput>;
    putEvents(args: PutEventsCommandInput, cb: (err: any, data?: PutEventsCommandOutput) => void): void;
    putEvents(args: PutEventsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutEventsCommandOutput) => void): void;
    /**
     * <p>Adds one or more items to an Items dataset. For more information see
     *       <a>importing-items</a>.</p>
     */
    putItems(args: PutItemsCommandInput, options?: __HttpHandlerOptions): Promise<PutItemsCommandOutput>;
    putItems(args: PutItemsCommandInput, cb: (err: any, data?: PutItemsCommandOutput) => void): void;
    putItems(args: PutItemsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutItemsCommandOutput) => void): void;
    /**
     * <p>Adds one or more users to a Users dataset. For more information see
     *       <a>importing-users</a>.</p>
     */
    putUsers(args: PutUsersCommandInput, options?: __HttpHandlerOptions): Promise<PutUsersCommandOutput>;
    putUsers(args: PutUsersCommandInput, cb: (err: any, data?: PutUsersCommandOutput) => void): void;
    putUsers(args: PutUsersCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutUsersCommandOutput) => void): void;
}
