import { __extends } from "tslib";
import { StopTextTranslationJobRequest, StopTextTranslationJobResponse } from "../models/models_0";
import { deserializeAws_json1_1StopTextTranslationJobCommand, serializeAws_json1_1StopTextTranslationJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Stops an asynchronous batch translation job that is in progress.</p>
 *          <p>If the job's state is <code>IN_PROGRESS</code>, the job will be marked for termination and
 *       put into the <code>STOP_REQUESTED</code> state. If the job completes before it can be stopped,
 *       it is put into the <code>COMPLETED</code> state. Otherwise, the job is put into the
 *         <code>STOPPED</code> state.</p>
 *          <p>Asynchronous batch translation jobs are started with the <a>StartTextTranslationJob</a> operation. You can use the <a>DescribeTextTranslationJob</a> or <a>ListTextTranslationJobs</a>
 *       operations to get a batch translation job's <code>JobId</code>.</p>
 */
var StopTextTranslationJobCommand = /** @class */ (function (_super) {
    __extends(StopTextTranslationJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StopTextTranslationJobCommand(input) {
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
    StopTextTranslationJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "TranslateClient";
        var commandName = "StopTextTranslationJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StopTextTranslationJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StopTextTranslationJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StopTextTranslationJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StopTextTranslationJobCommand(input, context);
    };
    StopTextTranslationJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StopTextTranslationJobCommand(output, context);
    };
    return StopTextTranslationJobCommand;
}($Command));
export { StopTextTranslationJobCommand };
//# sourceMappingURL=StopTextTranslationJobCommand.js.map