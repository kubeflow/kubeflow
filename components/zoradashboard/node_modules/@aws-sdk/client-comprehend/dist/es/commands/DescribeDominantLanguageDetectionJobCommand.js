import { __extends } from "tslib";
import { DescribeDominantLanguageDetectionJobRequest, DescribeDominantLanguageDetectionJobResponse, } from "../models/models_0";
import { deserializeAws_json1_1DescribeDominantLanguageDetectionJobCommand, serializeAws_json1_1DescribeDominantLanguageDetectionJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets the properties associated with a dominant language detection job. Use this operation
 *       to get the status of a detection job.</p>
 */
var DescribeDominantLanguageDetectionJobCommand = /** @class */ (function (_super) {
    __extends(DescribeDominantLanguageDetectionJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeDominantLanguageDetectionJobCommand(input) {
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
    DescribeDominantLanguageDetectionJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "DescribeDominantLanguageDetectionJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeDominantLanguageDetectionJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeDominantLanguageDetectionJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeDominantLanguageDetectionJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeDominantLanguageDetectionJobCommand(input, context);
    };
    DescribeDominantLanguageDetectionJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeDominantLanguageDetectionJobCommand(output, context);
    };
    return DescribeDominantLanguageDetectionJobCommand;
}($Command));
export { DescribeDominantLanguageDetectionJobCommand };
//# sourceMappingURL=DescribeDominantLanguageDetectionJobCommand.js.map