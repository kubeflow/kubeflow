import { __extends } from "tslib";
import { StartPersonTrackingRequest, StartPersonTrackingResponse } from "../models/models_0";
import { deserializeAws_json1_1StartPersonTrackingCommand, serializeAws_json1_1StartPersonTrackingCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Starts the asynchronous tracking of a person's path in a stored video.</p>
 *          <p>Amazon Rekognition Video can track the path of people in a video stored in an Amazon S3 bucket. Use <a>Video</a> to specify the bucket name
 *        and the filename of the video. <code>StartPersonTracking</code>
 *        returns a job identifier (<code>JobId</code>) which you use to get the results of the operation.
 *        When label detection is finished, Amazon Rekognition publishes a completion status
 *        to the Amazon Simple Notification Service topic that you specify in <code>NotificationChannel</code>. </p>
 *          <p>To get the results of the person detection operation, first check that the status value published to the Amazon SNS
 *        topic is <code>SUCCEEDED</code>. If so, call  <a>GetPersonTracking</a> and pass the job identifier
 *       (<code>JobId</code>) from the initial call to <code>StartPersonTracking</code>.</p>
 */
var StartPersonTrackingCommand = /** @class */ (function (_super) {
    __extends(StartPersonTrackingCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartPersonTrackingCommand(input) {
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
    StartPersonTrackingCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "StartPersonTrackingCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartPersonTrackingRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartPersonTrackingResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartPersonTrackingCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartPersonTrackingCommand(input, context);
    };
    StartPersonTrackingCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartPersonTrackingCommand(output, context);
    };
    return StartPersonTrackingCommand;
}($Command));
export { StartPersonTrackingCommand };
//# sourceMappingURL=StartPersonTrackingCommand.js.map