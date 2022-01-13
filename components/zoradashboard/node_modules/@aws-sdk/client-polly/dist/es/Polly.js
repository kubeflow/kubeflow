import { __extends } from "tslib";
import { PollyClient } from "./PollyClient";
import { DeleteLexiconCommand, } from "./commands/DeleteLexiconCommand";
import { DescribeVoicesCommand, } from "./commands/DescribeVoicesCommand";
import { GetLexiconCommand } from "./commands/GetLexiconCommand";
import { GetSpeechSynthesisTaskCommand, } from "./commands/GetSpeechSynthesisTaskCommand";
import { ListLexiconsCommand, } from "./commands/ListLexiconsCommand";
import { ListSpeechSynthesisTasksCommand, } from "./commands/ListSpeechSynthesisTasksCommand";
import { PutLexiconCommand } from "./commands/PutLexiconCommand";
import { StartSpeechSynthesisTaskCommand, } from "./commands/StartSpeechSynthesisTaskCommand";
import { SynthesizeSpeechCommand, } from "./commands/SynthesizeSpeechCommand";
/**
 * <p>Amazon Polly is a web service that makes it easy to synthesize speech from
 *       text.</p>
 *          <p>The Amazon Polly service provides API operations for synthesizing high-quality speech
 *       from plain text and Speech Synthesis Markup Language (SSML), along with managing
 *       pronunciations lexicons that enable you to get the best results for your application
 *       domain.</p>
 */
var Polly = /** @class */ (function (_super) {
    __extends(Polly, _super);
    function Polly() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Polly.prototype.deleteLexicon = function (args, optionsOrCb, cb) {
        var command = new DeleteLexiconCommand(args);
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
    Polly.prototype.describeVoices = function (args, optionsOrCb, cb) {
        var command = new DescribeVoicesCommand(args);
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
    Polly.prototype.getLexicon = function (args, optionsOrCb, cb) {
        var command = new GetLexiconCommand(args);
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
    Polly.prototype.getSpeechSynthesisTask = function (args, optionsOrCb, cb) {
        var command = new GetSpeechSynthesisTaskCommand(args);
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
    Polly.prototype.listLexicons = function (args, optionsOrCb, cb) {
        var command = new ListLexiconsCommand(args);
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
    Polly.prototype.listSpeechSynthesisTasks = function (args, optionsOrCb, cb) {
        var command = new ListSpeechSynthesisTasksCommand(args);
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
    Polly.prototype.putLexicon = function (args, optionsOrCb, cb) {
        var command = new PutLexiconCommand(args);
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
    Polly.prototype.startSpeechSynthesisTask = function (args, optionsOrCb, cb) {
        var command = new StartSpeechSynthesisTaskCommand(args);
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
    Polly.prototype.synthesizeSpeech = function (args, optionsOrCb, cb) {
        var command = new SynthesizeSpeechCommand(args);
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
    return Polly;
}(PollyClient));
export { Polly };
//# sourceMappingURL=Polly.js.map