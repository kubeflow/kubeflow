import { __extends } from "tslib";
import { TextractClient } from "./TextractClient";
import { AnalyzeDocumentCommand, } from "./commands/AnalyzeDocumentCommand";
import { DetectDocumentTextCommand, } from "./commands/DetectDocumentTextCommand";
import { GetDocumentAnalysisCommand, } from "./commands/GetDocumentAnalysisCommand";
import { GetDocumentTextDetectionCommand, } from "./commands/GetDocumentTextDetectionCommand";
import { StartDocumentAnalysisCommand, } from "./commands/StartDocumentAnalysisCommand";
import { StartDocumentTextDetectionCommand, } from "./commands/StartDocumentTextDetectionCommand";
/**
 * <p>Amazon Textract detects and analyzes text in documents and converts it
 *          into machine-readable text. This is the API reference documentation for
 *          Amazon Textract.</p>
 */
var Textract = /** @class */ (function (_super) {
    __extends(Textract, _super);
    function Textract() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Textract.prototype.analyzeDocument = function (args, optionsOrCb, cb) {
        var command = new AnalyzeDocumentCommand(args);
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
    Textract.prototype.detectDocumentText = function (args, optionsOrCb, cb) {
        var command = new DetectDocumentTextCommand(args);
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
    Textract.prototype.getDocumentAnalysis = function (args, optionsOrCb, cb) {
        var command = new GetDocumentAnalysisCommand(args);
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
    Textract.prototype.getDocumentTextDetection = function (args, optionsOrCb, cb) {
        var command = new GetDocumentTextDetectionCommand(args);
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
    Textract.prototype.startDocumentAnalysis = function (args, optionsOrCb, cb) {
        var command = new StartDocumentAnalysisCommand(args);
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
    Textract.prototype.startDocumentTextDetection = function (args, optionsOrCb, cb) {
        var command = new StartDocumentTextDetectionCommand(args);
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
    return Textract;
}(TextractClient));
export { Textract };
//# sourceMappingURL=Textract.js.map