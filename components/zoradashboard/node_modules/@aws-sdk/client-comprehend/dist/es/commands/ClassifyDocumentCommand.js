import { __extends } from "tslib";
import { ClassifyDocumentRequest, ClassifyDocumentResponse } from "../models/models_0";
import { deserializeAws_json1_1ClassifyDocumentCommand, serializeAws_json1_1ClassifyDocumentCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates a new document classification request to analyze a single document in real-time,
 *       using a previously created and trained custom model and an endpoint.</p>
 */
var ClassifyDocumentCommand = /** @class */ (function (_super) {
    __extends(ClassifyDocumentCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ClassifyDocumentCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    ClassifyDocumentCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "ClassifyDocumentCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ClassifyDocumentRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ClassifyDocumentResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ClassifyDocumentCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ClassifyDocumentCommand(input, context);
    };
    ClassifyDocumentCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ClassifyDocumentCommand(output, context);
    };
    return ClassifyDocumentCommand;
}($Command));
export { ClassifyDocumentCommand };
//# sourceMappingURL=ClassifyDocumentCommand.js.map