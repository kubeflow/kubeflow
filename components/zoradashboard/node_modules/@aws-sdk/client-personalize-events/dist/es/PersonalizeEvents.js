import { __extends } from "tslib";
import { PersonalizeEventsClient } from "./PersonalizeEventsClient";
import { PutEventsCommand } from "./commands/PutEventsCommand";
import { PutItemsCommand } from "./commands/PutItemsCommand";
import { PutUsersCommand } from "./commands/PutUsersCommand";
/**
 * <p>Amazon Personalize can consume real-time user event data, such as <i>stream</i> or <i>click</i> data, and use
 *       it for model training either alone or combined with historical data. For more information see <a>recording-events</a>.</p>
 */
var PersonalizeEvents = /** @class */ (function (_super) {
    __extends(PersonalizeEvents, _super);
    function PersonalizeEvents() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PersonalizeEvents.prototype.putEvents = function (args, optionsOrCb, cb) {
        var command = new PutEventsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    PersonalizeEvents.prototype.putItems = function (args, optionsOrCb, cb) {
        var command = new PutItemsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    PersonalizeEvents.prototype.putUsers = function (args, optionsOrCb, cb) {
        var command = new PutUsersCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    return PersonalizeEvents;
}(PersonalizeEventsClient));
export { PersonalizeEvents };
//# sourceMappingURL=PersonalizeEvents.js.map