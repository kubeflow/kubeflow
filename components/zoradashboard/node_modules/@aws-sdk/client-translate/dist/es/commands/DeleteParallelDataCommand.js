import { __extends } from "tslib";
import { DeleteParallelDataRequest, DeleteParallelDataResponse } from "../models/models_0";
import { deserializeAws_json1_1DeleteParallelDataCommand, serializeAws_json1_1DeleteParallelDataCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes a parallel data resource in Amazon Translate.</p>
 */
var DeleteParallelDataCommand = /** @class */ (function (_super) {
    __extends(DeleteParallelDataCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteParallelDataCommand(input) {
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
    DeleteParallelDataCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "TranslateClient";
        var commandName = "DeleteParallelDataCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteParallelDataRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteParallelDataResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteParallelDataCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DeleteParallelDataCommand(input, context);
    };
    DeleteParallelDataCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DeleteParallelDataCommand(output, context);
    };
    return DeleteParallelDataCommand;
}($Command));
export { DeleteParallelDataCommand };
//# sourceMappingURL=DeleteParallelDataCommand.js.map