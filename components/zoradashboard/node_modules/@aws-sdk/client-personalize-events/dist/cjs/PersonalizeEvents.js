"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalizeEvents = void 0;
const PersonalizeEventsClient_1 = require("./PersonalizeEventsClient");
const PutEventsCommand_1 = require("./commands/PutEventsCommand");
const PutItemsCommand_1 = require("./commands/PutItemsCommand");
const PutUsersCommand_1 = require("./commands/PutUsersCommand");
/**
 * <p>Amazon Personalize can consume real-time user event data, such as <i>stream</i> or <i>click</i> data, and use
 *       it for model training either alone or combined with historical data. For more information see <a>recording-events</a>.</p>
 */
class PersonalizeEvents extends PersonalizeEventsClient_1.PersonalizeEventsClient {
    putEvents(args, optionsOrCb, cb) {
        const command = new PutEventsCommand_1.PutEventsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    putItems(args, optionsOrCb, cb) {
        const command = new PutItemsCommand_1.PutItemsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    putUsers(args, optionsOrCb, cb) {
        const command = new PutUsersCommand_1.PutUsersCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
}
exports.PersonalizeEvents = PersonalizeEvents;
//# sourceMappingURL=PersonalizeEvents.js.map