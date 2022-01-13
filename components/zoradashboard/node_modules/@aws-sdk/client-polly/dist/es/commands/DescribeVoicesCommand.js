import { __extends } from "tslib";
import { DescribeVoicesInput, DescribeVoicesOutput } from "../models/models_0";
import { deserializeAws_restJson1DescribeVoicesCommand, serializeAws_restJson1DescribeVoicesCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the list of voices that are available for use when requesting speech synthesis.
 *       Each voice speaks a specified language, is either male or female, and is identified by an ID,
 *       which is the ASCII version of the voice name. </p>
 *
 *          <p>When synthesizing speech ( <code>SynthesizeSpeech</code> ), you provide the voice ID
 *       for the voice you want from the list of voices returned by
 *       <code>DescribeVoices</code>.</p>
 *
 *          <p>For example, you want your news reader application to read news in a specific language,
 *       but giving a user the option to choose the voice. Using the <code>DescribeVoices</code>
 *       operation you can provide the user with a list of available voices to select from.</p>
 *
 *          <p> You can optionally specify a language code to filter the available voices. For
 *       example, if you specify <code>en-US</code>, the operation returns a list of all available US
 *       English voices. </p>
 *          <p>This operation requires permissions to perform the <code>polly:DescribeVoices</code>
 *       action.</p>
 */
var DescribeVoicesCommand = /** @class */ (function (_super) {
    __extends(DescribeVoicesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeVoicesCommand(input) {
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
    DescribeVoicesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PollyClient";
        var commandName = "DescribeVoicesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeVoicesInput.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeVoicesOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeVoicesCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1DescribeVoicesCommand(input, context);
    };
    DescribeVoicesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1DescribeVoicesCommand(output, context);
    };
    return DescribeVoicesCommand;
}($Command));
export { DescribeVoicesCommand };
//# sourceMappingURL=DescribeVoicesCommand.js.map