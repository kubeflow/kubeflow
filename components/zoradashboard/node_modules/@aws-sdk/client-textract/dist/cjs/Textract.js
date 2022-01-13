"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Textract = void 0;
const TextractClient_1 = require("./TextractClient");
const AnalyzeDocumentCommand_1 = require("./commands/AnalyzeDocumentCommand");
const DetectDocumentTextCommand_1 = require("./commands/DetectDocumentTextCommand");
const GetDocumentAnalysisCommand_1 = require("./commands/GetDocumentAnalysisCommand");
const GetDocumentTextDetectionCommand_1 = require("./commands/GetDocumentTextDetectionCommand");
const StartDocumentAnalysisCommand_1 = require("./commands/StartDocumentAnalysisCommand");
const StartDocumentTextDetectionCommand_1 = require("./commands/StartDocumentTextDetectionCommand");
/**
 * <p>Amazon Textract detects and analyzes text in documents and converts it
 *          into machine-readable text. This is the API reference documentation for
 *          Amazon Textract.</p>
 */
class Textract extends TextractClient_1.TextractClient {
    analyzeDocument(args, optionsOrCb, cb) {
        const command = new AnalyzeDocumentCommand_1.AnalyzeDocumentCommand(args);
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
    detectDocumentText(args, optionsOrCb, cb) {
        const command = new DetectDocumentTextCommand_1.DetectDocumentTextCommand(args);
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
    getDocumentAnalysis(args, optionsOrCb, cb) {
        const command = new GetDocumentAnalysisCommand_1.GetDocumentAnalysisCommand(args);
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
    getDocumentTextDetection(args, optionsOrCb, cb) {
        const command = new GetDocumentTextDetectionCommand_1.GetDocumentTextDetectionCommand(args);
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
    startDocumentAnalysis(args, optionsOrCb, cb) {
        const command = new StartDocumentAnalysisCommand_1.StartDocumentAnalysisCommand(args);
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
    startDocumentTextDetection(args, optionsOrCb, cb) {
        const command = new StartDocumentTextDetectionCommand_1.StartDocumentTextDetectionCommand(args);
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
exports.Textract = Textract;
//# sourceMappingURL=Textract.js.map