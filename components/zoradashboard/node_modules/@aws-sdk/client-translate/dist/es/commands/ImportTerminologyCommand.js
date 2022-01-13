import { __extends } from "tslib";
import { ImportTerminologyRequest, ImportTerminologyResponse } from "../models/models_0";
import { deserializeAws_json1_1ImportTerminologyCommand, serializeAws_json1_1ImportTerminologyCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates or updates a custom terminology, depending on whether or not one already exists
 *       for the given terminology name. Importing a terminology with the same name as an existing one
 *       will merge the terminologies based on the chosen merge strategy. Currently, the only supported
 *       merge strategy is OVERWRITE, and so the imported terminology will overwrite an existing
 *       terminology of the same name.</p>
 *          <p>If you import a terminology that overwrites an existing one, the new terminology take up
 *       to 10 minutes to fully propagate and be available for use in a translation due to cache
 *       policies with the DataPlane service that performs the translations.</p>
 */
var ImportTerminologyCommand = /** @class */ (function (_super) {
    __extends(ImportTerminologyCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ImportTerminologyCommand(input) {
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
    ImportTerminologyCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "TranslateClient";
        var commandName = "ImportTerminologyCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ImportTerminologyRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ImportTerminologyResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ImportTerminologyCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ImportTerminologyCommand(input, context);
    };
    ImportTerminologyCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ImportTerminologyCommand(output, context);
    };
    return ImportTerminologyCommand;
}($Command));
export { ImportTerminologyCommand };
//# sourceMappingURL=ImportTerminologyCommand.js.map