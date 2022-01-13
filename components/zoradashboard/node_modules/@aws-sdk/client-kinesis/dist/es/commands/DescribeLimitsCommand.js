import { __extends } from "tslib";
import { DescribeLimitsInput, DescribeLimitsOutput } from "../models/models_0";
import { deserializeAws_json1_1DescribeLimitsCommand, serializeAws_json1_1DescribeLimitsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Describes the shard limits and usage for the account.</p>
 *         <p>If you update your account limits, the old limits might be returned for a few
 *             minutes.</p>
 *         <p>This operation has a limit of one transaction per second per account.</p>
 */
var DescribeLimitsCommand = /** @class */ (function (_super) {
    __extends(DescribeLimitsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeLimitsCommand(input) {
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
    DescribeLimitsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "DescribeLimitsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeLimitsInput.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeLimitsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeLimitsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeLimitsCommand(input, context);
    };
    DescribeLimitsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeLimitsCommand(output, context);
    };
    return DescribeLimitsCommand;
}($Command));
export { DescribeLimitsCommand };
//# sourceMappingURL=DescribeLimitsCommand.js.map