import { __extends } from "tslib";
import { StartFaceSearchRequest, StartFaceSearchResponse } from "../models/models_0";
import { deserializeAws_json1_1StartFaceSearchCommand, serializeAws_json1_1StartFaceSearchCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Starts the asynchronous search for faces in a collection that match the faces of persons detected in a stored video.</p>
 *          <p>The video must be stored in an Amazon S3 bucket. Use <a>Video</a> to specify the bucket name
 *       and the filename of the video. <code>StartFaceSearch</code>
 *       returns a job identifier (<code>JobId</code>) which you use to get the search results once the search has completed.
 *       When searching is finished, Amazon Rekognition Video publishes a completion status
 *       to the Amazon Simple Notification Service topic that you specify in <code>NotificationChannel</code>.
 *       To get the search results, first check that the status value published to the Amazon SNS
 *       topic is <code>SUCCEEDED</code>. If so, call <a>GetFaceSearch</a> and pass the job identifier
 *       (<code>JobId</code>) from the initial call to <code>StartFaceSearch</code>. For more information, see
 *       <a>procedure-person-search-videos</a>.</p>
 */
var StartFaceSearchCommand = /** @class */ (function (_super) {
    __extends(StartFaceSearchCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartFaceSearchCommand(input) {
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
    StartFaceSearchCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "StartFaceSearchCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartFaceSearchRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartFaceSearchResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartFaceSearchCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartFaceSearchCommand(input, context);
    };
    StartFaceSearchCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartFaceSearchCommand(output, context);
    };
    return StartFaceSearchCommand;
}($Command));
export { StartFaceSearchCommand };
//# sourceMappingURL=StartFaceSearchCommand.js.map