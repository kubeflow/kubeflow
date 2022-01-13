import { __extends } from "tslib";
import { StopStreamEncryptionInput } from "../models/models_0";
import { deserializeAws_json1_1StopStreamEncryptionCommand, serializeAws_json1_1StopStreamEncryptionCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Disables server-side encryption for a specified stream. </p>
 *         <p>Stopping encryption is an asynchronous operation. Upon receiving the request,
 *             Kinesis Data Streams returns immediately and sets the status of the stream to
 *                 <code>UPDATING</code>. After the update is complete, Kinesis Data Streams sets the
 *             status of the stream back to <code>ACTIVE</code>. Stopping encryption normally takes a
 *             few seconds to complete, but it can take minutes. You can continue to read and write
 *             data to your stream while its status is <code>UPDATING</code>. Once the status of the
 *             stream is <code>ACTIVE</code>, records written to the stream are no longer encrypted by
 *             Kinesis Data Streams. </p>
 *         <p>API Limits: You can successfully disable server-side encryption 25 times in a
 *             rolling 24-hour period. </p>
 *         <p>Note: It can take up to 5 seconds after the stream is in an <code>ACTIVE</code>
 *             status before all records written to the stream are no longer subject to encryption.
 *             After you disabled encryption, you can verify that encryption is not applied by
 *             inspecting the API response from <code>PutRecord</code> or
 *             <code>PutRecords</code>.</p>
 */
var StopStreamEncryptionCommand = /** @class */ (function (_super) {
    __extends(StopStreamEncryptionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StopStreamEncryptionCommand(input) {
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
    StopStreamEncryptionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "StopStreamEncryptionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StopStreamEncryptionInput.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StopStreamEncryptionCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StopStreamEncryptionCommand(input, context);
    };
    StopStreamEncryptionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StopStreamEncryptionCommand(output, context);
    };
    return StopStreamEncryptionCommand;
}($Command));
export { StopStreamEncryptionCommand };
//# sourceMappingURL=StopStreamEncryptionCommand.js.map