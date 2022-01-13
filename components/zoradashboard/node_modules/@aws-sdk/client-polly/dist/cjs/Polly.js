"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polly = void 0;
const PollyClient_1 = require("./PollyClient");
const DeleteLexiconCommand_1 = require("./commands/DeleteLexiconCommand");
const DescribeVoicesCommand_1 = require("./commands/DescribeVoicesCommand");
const GetLexiconCommand_1 = require("./commands/GetLexiconCommand");
const GetSpeechSynthesisTaskCommand_1 = require("./commands/GetSpeechSynthesisTaskCommand");
const ListLexiconsCommand_1 = require("./commands/ListLexiconsCommand");
const ListSpeechSynthesisTasksCommand_1 = require("./commands/ListSpeechSynthesisTasksCommand");
const PutLexiconCommand_1 = require("./commands/PutLexiconCommand");
const StartSpeechSynthesisTaskCommand_1 = require("./commands/StartSpeechSynthesisTaskCommand");
const SynthesizeSpeechCommand_1 = require("./commands/SynthesizeSpeechCommand");
/**
 * <p>Amazon Polly is a web service that makes it easy to synthesize speech from
 *       text.</p>
 *          <p>The Amazon Polly service provides API operations for synthesizing high-quality speech
 *       from plain text and Speech Synthesis Markup Language (SSML), along with managing
 *       pronunciations lexicons that enable you to get the best results for your application
 *       domain.</p>
 */
class Polly extends PollyClient_1.PollyClient {
    deleteLexicon(args, optionsOrCb, cb) {
        const command = new DeleteLexiconCommand_1.DeleteLexiconCommand(args);
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
    describeVoices(args, optionsOrCb, cb) {
        const command = new DescribeVoicesCommand_1.DescribeVoicesCommand(args);
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
    getLexicon(args, optionsOrCb, cb) {
        const command = new GetLexiconCommand_1.GetLexiconCommand(args);
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
    getSpeechSynthesisTask(args, optionsOrCb, cb) {
        const command = new GetSpeechSynthesisTaskCommand_1.GetSpeechSynthesisTaskCommand(args);
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
    listLexicons(args, optionsOrCb, cb) {
        const command = new ListLexiconsCommand_1.ListLexiconsCommand(args);
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
    listSpeechSynthesisTasks(args, optionsOrCb, cb) {
        const command = new ListSpeechSynthesisTasksCommand_1.ListSpeechSynthesisTasksCommand(args);
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
    putLexicon(args, optionsOrCb, cb) {
        const command = new PutLexiconCommand_1.PutLexiconCommand(args);
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
    startSpeechSynthesisTask(args, optionsOrCb, cb) {
        const command = new StartSpeechSynthesisTaskCommand_1.StartSpeechSynthesisTaskCommand(args);
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
    synthesizeSpeech(args, optionsOrCb, cb) {
        const command = new SynthesizeSpeechCommand_1.SynthesizeSpeechCommand(args);
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
exports.Polly = Polly;
//# sourceMappingURL=Polly.js.map