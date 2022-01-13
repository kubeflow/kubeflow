import { __extends } from "tslib";
import { GetParallelDataRequest, GetParallelDataResponse } from "../models/models_0";
import { deserializeAws_json1_1GetParallelDataCommand, serializeAws_json1_1GetParallelDataCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Provides information about a parallel data resource.</p>
 */
var GetParallelDataCommand = /** @class */ (function (_super) {
    __extends(GetParallelDataCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetParallelDataCommand(input) {
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
    GetParallelDataCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "TranslateClient";
        var commandName = "GetParallelDataCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetParallelDataRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetParallelDataResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetParallelDataCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1GetParallelDataCommand(input, context);
    };
    GetParallelDataCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1GetParallelDataCommand(output, context);
    };
    return GetParallelDataCommand;
}($Command));
export { GetParallelDataCommand };
//# sourceMappingURL=GetParallelDataCommand.js.map