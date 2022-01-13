import { __extends } from "tslib";
import { UntagResourceRequest, UntagResourceResponse } from "../models/models_0";
import { deserializeAws_json1_1UntagResourceCommand, serializeAws_json1_1UntagResourceCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Removes a specific tag associated with an Amazon Comprehend resource. </p>
 */
var UntagResourceCommand = /** @class */ (function (_super) {
    __extends(UntagResourceCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function UntagResourceCommand(input) {
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
    UntagResourceCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "UntagResourceCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UntagResourceRequest.filterSensitiveLog,
            outputFilterSensitiveLog: UntagResourceResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UntagResourceCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1UntagResourceCommand(input, context);
    };
    UntagResourceCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1UntagResourceCommand(output, context);
    };
    return UntagResourceCommand;
}($Command));
export { UntagResourceCommand };
//# sourceMappingURL=UntagResourceCommand.js.map