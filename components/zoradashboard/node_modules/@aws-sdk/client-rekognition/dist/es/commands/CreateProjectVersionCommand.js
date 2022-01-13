import { __extends } from "tslib";
import { CreateProjectVersionRequest, CreateProjectVersionResponse } from "../models/models_0";
import { deserializeAws_json1_1CreateProjectVersionCommand, serializeAws_json1_1CreateProjectVersionCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates a new version of a model and begins training.
 *          Models are managed as part of an Amazon Rekognition Custom Labels project.  You can specify
 *          one training dataset and one testing dataset. The response from <code>CreateProjectVersion</code>
 *          is an Amazon Resource Name (ARN) for the version of the model. </p>
 *          <p>Training takes a while to complete. You can get the current status by calling
 *          <a>DescribeProjectVersions</a>.</p>
 *          <p>Once training has successfully completed, call <a>DescribeProjectVersions</a> to
 *          get the training results and evaluate the model.
 *       </p>
 *          <p>After evaluating the model, you start the model
 *        by calling <a>StartProjectVersion</a>.</p>
 *          <p>This operation requires permissions to perform the <code>rekognition:CreateProjectVersion</code> action.</p>
 */
var CreateProjectVersionCommand = /** @class */ (function (_super) {
    __extends(CreateProjectVersionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CreateProjectVersionCommand(input) {
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
    CreateProjectVersionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "CreateProjectVersionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateProjectVersionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: CreateProjectVersionResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateProjectVersionCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1CreateProjectVersionCommand(input, context);
    };
    CreateProjectVersionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1CreateProjectVersionCommand(output, context);
    };
    return CreateProjectVersionCommand;
}($Command));
export { CreateProjectVersionCommand };
//# sourceMappingURL=CreateProjectVersionCommand.js.map