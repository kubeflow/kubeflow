import { __extends } from "tslib";
import { GetCelebrityInfoRequest, GetCelebrityInfoResponse } from "../models/models_0";
import { deserializeAws_json1_1GetCelebrityInfoCommand, serializeAws_json1_1GetCelebrityInfoCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets the name and additional information about a celebrity based on his or her
 *       Amazon Rekognition ID. The additional information is returned as an array of URLs. If there is no
 *       additional information about the celebrity, this list is empty.</p>
 *
 *          <p>For more information, see Recognizing Celebrities in an Image in
 *       the Amazon Rekognition Developer Guide.</p>
 *          <p>This operation requires permissions to perform the
 *         <code>rekognition:GetCelebrityInfo</code> action. </p>
 */
var GetCelebrityInfoCommand = /** @class */ (function (_super) {
    __extends(GetCelebrityInfoCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetCelebrityInfoCommand(input) {
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
    GetCelebrityInfoCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "GetCelebrityInfoCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetCelebrityInfoRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetCelebrityInfoResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetCelebrityInfoCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1GetCelebrityInfoCommand(input, context);
    };
    GetCelebrityInfoCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1GetCelebrityInfoCommand(output, context);
    };
    return GetCelebrityInfoCommand;
}($Command));
export { GetCelebrityInfoCommand };
//# sourceMappingURL=GetCelebrityInfoCommand.js.map