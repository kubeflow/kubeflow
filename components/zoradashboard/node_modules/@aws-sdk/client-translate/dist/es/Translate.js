import { __extends } from "tslib";
import { TranslateClient } from "./TranslateClient";
import { CreateParallelDataCommand, } from "./commands/CreateParallelDataCommand";
import { DeleteParallelDataCommand, } from "./commands/DeleteParallelDataCommand";
import { DeleteTerminologyCommand, } from "./commands/DeleteTerminologyCommand";
import { DescribeTextTranslationJobCommand, } from "./commands/DescribeTextTranslationJobCommand";
import { GetParallelDataCommand, } from "./commands/GetParallelDataCommand";
import { GetTerminologyCommand, } from "./commands/GetTerminologyCommand";
import { ImportTerminologyCommand, } from "./commands/ImportTerminologyCommand";
import { ListParallelDataCommand, } from "./commands/ListParallelDataCommand";
import { ListTerminologiesCommand, } from "./commands/ListTerminologiesCommand";
import { ListTextTranslationJobsCommand, } from "./commands/ListTextTranslationJobsCommand";
import { StartTextTranslationJobCommand, } from "./commands/StartTextTranslationJobCommand";
import { StopTextTranslationJobCommand, } from "./commands/StopTextTranslationJobCommand";
import { TranslateTextCommand, } from "./commands/TranslateTextCommand";
import { UpdateParallelDataCommand, } from "./commands/UpdateParallelDataCommand";
/**
 * <p>Provides translation between one source language and another of the same set of
 *       languages.</p>
 */
var Translate = /** @class */ (function (_super) {
    __extends(Translate, _super);
    function Translate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Translate.prototype.createParallelData = function (args, optionsOrCb, cb) {
        var command = new CreateParallelDataCommand(args);
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
    Translate.prototype.deleteParallelData = function (args, optionsOrCb, cb) {
        var command = new DeleteParallelDataCommand(args);
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
    Translate.prototype.deleteTerminology = function (args, optionsOrCb, cb) {
        var command = new DeleteTerminologyCommand(args);
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
    Translate.prototype.describeTextTranslationJob = function (args, optionsOrCb, cb) {
        var command = new DescribeTextTranslationJobCommand(args);
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
    Translate.prototype.getParallelData = function (args, optionsOrCb, cb) {
        var command = new GetParallelDataCommand(args);
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
    Translate.prototype.getTerminology = function (args, optionsOrCb, cb) {
        var command = new GetTerminologyCommand(args);
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
    Translate.prototype.importTerminology = function (args, optionsOrCb, cb) {
        var command = new ImportTerminologyCommand(args);
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
    Translate.prototype.listParallelData = function (args, optionsOrCb, cb) {
        var command = new ListParallelDataCommand(args);
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
    Translate.prototype.listTerminologies = function (args, optionsOrCb, cb) {
        var command = new ListTerminologiesCommand(args);
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
    Translate.prototype.listTextTranslationJobs = function (args, optionsOrCb, cb) {
        var command = new ListTextTranslationJobsCommand(args);
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
    Translate.prototype.startTextTranslationJob = function (args, optionsOrCb, cb) {
        var command = new StartTextTranslationJobCommand(args);
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
    Translate.prototype.stopTextTranslationJob = function (args, optionsOrCb, cb) {
        var command = new StopTextTranslationJobCommand(args);
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
    Translate.prototype.translateText = function (args, optionsOrCb, cb) {
        var command = new TranslateTextCommand(args);
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
    Translate.prototype.updateParallelData = function (args, optionsOrCb, cb) {
        var command = new UpdateParallelDataCommand(args);
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
    return Translate;
}(TranslateClient));
export { Translate };
//# sourceMappingURL=Translate.js.map