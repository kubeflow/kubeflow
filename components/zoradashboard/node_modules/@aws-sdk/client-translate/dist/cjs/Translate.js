"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translate = void 0;
const TranslateClient_1 = require("./TranslateClient");
const CreateParallelDataCommand_1 = require("./commands/CreateParallelDataCommand");
const DeleteParallelDataCommand_1 = require("./commands/DeleteParallelDataCommand");
const DeleteTerminologyCommand_1 = require("./commands/DeleteTerminologyCommand");
const DescribeTextTranslationJobCommand_1 = require("./commands/DescribeTextTranslationJobCommand");
const GetParallelDataCommand_1 = require("./commands/GetParallelDataCommand");
const GetTerminologyCommand_1 = require("./commands/GetTerminologyCommand");
const ImportTerminologyCommand_1 = require("./commands/ImportTerminologyCommand");
const ListParallelDataCommand_1 = require("./commands/ListParallelDataCommand");
const ListTerminologiesCommand_1 = require("./commands/ListTerminologiesCommand");
const ListTextTranslationJobsCommand_1 = require("./commands/ListTextTranslationJobsCommand");
const StartTextTranslationJobCommand_1 = require("./commands/StartTextTranslationJobCommand");
const StopTextTranslationJobCommand_1 = require("./commands/StopTextTranslationJobCommand");
const TranslateTextCommand_1 = require("./commands/TranslateTextCommand");
const UpdateParallelDataCommand_1 = require("./commands/UpdateParallelDataCommand");
/**
 * <p>Provides translation between one source language and another of the same set of
 *       languages.</p>
 */
class Translate extends TranslateClient_1.TranslateClient {
    createParallelData(args, optionsOrCb, cb) {
        const command = new CreateParallelDataCommand_1.CreateParallelDataCommand(args);
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
    deleteParallelData(args, optionsOrCb, cb) {
        const command = new DeleteParallelDataCommand_1.DeleteParallelDataCommand(args);
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
    deleteTerminology(args, optionsOrCb, cb) {
        const command = new DeleteTerminologyCommand_1.DeleteTerminologyCommand(args);
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
    describeTextTranslationJob(args, optionsOrCb, cb) {
        const command = new DescribeTextTranslationJobCommand_1.DescribeTextTranslationJobCommand(args);
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
    getParallelData(args, optionsOrCb, cb) {
        const command = new GetParallelDataCommand_1.GetParallelDataCommand(args);
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
    getTerminology(args, optionsOrCb, cb) {
        const command = new GetTerminologyCommand_1.GetTerminologyCommand(args);
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
    importTerminology(args, optionsOrCb, cb) {
        const command = new ImportTerminologyCommand_1.ImportTerminologyCommand(args);
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
    listParallelData(args, optionsOrCb, cb) {
        const command = new ListParallelDataCommand_1.ListParallelDataCommand(args);
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
    listTerminologies(args, optionsOrCb, cb) {
        const command = new ListTerminologiesCommand_1.ListTerminologiesCommand(args);
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
    listTextTranslationJobs(args, optionsOrCb, cb) {
        const command = new ListTextTranslationJobsCommand_1.ListTextTranslationJobsCommand(args);
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
    startTextTranslationJob(args, optionsOrCb, cb) {
        const command = new StartTextTranslationJobCommand_1.StartTextTranslationJobCommand(args);
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
    stopTextTranslationJob(args, optionsOrCb, cb) {
        const command = new StopTextTranslationJobCommand_1.StopTextTranslationJobCommand(args);
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
    translateText(args, optionsOrCb, cb) {
        const command = new TranslateTextCommand_1.TranslateTextCommand(args);
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
    updateParallelData(args, optionsOrCb, cb) {
        const command = new UpdateParallelDataCommand_1.UpdateParallelDataCommand(args);
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
exports.Translate = Translate;
//# sourceMappingURL=Translate.js.map