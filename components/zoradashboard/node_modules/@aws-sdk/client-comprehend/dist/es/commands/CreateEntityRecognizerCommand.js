import { __extends } from "tslib";
import { CreateEntityRecognizerRequest, CreateEntityRecognizerResponse } from "../models/models_0";
import { deserializeAws_json1_1CreateEntityRecognizerCommand, serializeAws_json1_1CreateEntityRecognizerCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates an entity recognizer using submitted files. After your
 *         <code>CreateEntityRecognizer</code> request is submitted, you can check job status using the
 *          API. </p>
 */
var CreateEntityRecognizerCommand = /** @class */ (function (_super) {
    __extends(CreateEntityRecognizerCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CreateEntityRecognizerCommand(input) {
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
    CreateEntityRecognizerCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "CreateEntityRecognizerCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateEntityRecognizerRequest.filterSensitiveLog,
            outputFilterSensitiveLog: CreateEntityRecognizerResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateEntityRecognizerCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1CreateEntityRecognizerCommand(input, context);
    };
    CreateEntityRecognizerCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1CreateEntityRecognizerCommand(output, context);
    };
    return CreateEntityRecognizerCommand;
}($Command));
export { CreateEntityRecognizerCommand };
//# sourceMappingURL=CreateEntityRecognizerCommand.js.map