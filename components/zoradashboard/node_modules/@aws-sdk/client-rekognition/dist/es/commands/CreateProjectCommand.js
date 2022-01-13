import { __extends } from "tslib";
import { CreateProjectRequest, CreateProjectResponse } from "../models/models_0";
import { deserializeAws_json1_1CreateProjectCommand, serializeAws_json1_1CreateProjectCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates a new Amazon Rekognition Custom Labels project. A project is a logical grouping of resources (images, Labels, models)
 *          and operations (training, evaluation and detection).  </p>
 *          <p>This operation requires permissions to perform the <code>rekognition:CreateProject</code> action.</p>
 */
var CreateProjectCommand = /** @class */ (function (_super) {
    __extends(CreateProjectCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CreateProjectCommand(input) {
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
    CreateProjectCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "CreateProjectCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateProjectRequest.filterSensitiveLog,
            outputFilterSensitiveLog: CreateProjectResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateProjectCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1CreateProjectCommand(input, context);
    };
    CreateProjectCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1CreateProjectCommand(output, context);
    };
    return CreateProjectCommand;
}($Command));
export { CreateProjectCommand };
//# sourceMappingURL=CreateProjectCommand.js.map