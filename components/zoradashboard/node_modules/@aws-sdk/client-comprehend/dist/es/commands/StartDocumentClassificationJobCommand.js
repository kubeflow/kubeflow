import { __extends } from "tslib";
import { StartDocumentClassificationJobRequest, StartDocumentClassificationJobResponse } from "../models/models_0";
import { deserializeAws_json1_1StartDocumentClassificationJobCommand, serializeAws_json1_1StartDocumentClassificationJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Starts an asynchronous document classification job. Use the  operation to track the progress of the
 *       job.</p>
 */
var StartDocumentClassificationJobCommand = /** @class */ (function (_super) {
    __extends(StartDocumentClassificationJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartDocumentClassificationJobCommand(input) {
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
    StartDocumentClassificationJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "StartDocumentClassificationJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartDocumentClassificationJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartDocumentClassificationJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartDocumentClassificationJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartDocumentClassificationJobCommand(input, context);
    };
    StartDocumentClassificationJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartDocumentClassificationJobCommand(output, context);
    };
    return StartDocumentClassificationJobCommand;
}($Command));
export { StartDocumentClassificationJobCommand };
//# sourceMappingURL=StartDocumentClassificationJobCommand.js.map