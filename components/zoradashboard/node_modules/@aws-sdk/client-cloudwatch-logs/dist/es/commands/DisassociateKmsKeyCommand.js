import { __extends } from "tslib";
import { DisassociateKmsKeyRequest } from "../models/models_0";
import { deserializeAws_json1_1DisassociateKmsKeyCommand, serializeAws_json1_1DisassociateKmsKeyCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Disassociates the associated AWS Key Management Service (AWS KMS) customer master key (CMK) from the specified log group.</p>
 *          <p>After the AWS KMS CMK is disassociated from the log group, AWS CloudWatch Logs stops encrypting newly ingested data for the log group.
 *       All previously ingested data remains encrypted, and AWS CloudWatch Logs requires permissions for the CMK whenever the encrypted data is requested.</p>
 *          <p>Note that it can take up to 5 minutes for this operation to take effect.</p>
 */
var DisassociateKmsKeyCommand = /** @class */ (function (_super) {
    __extends(DisassociateKmsKeyCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DisassociateKmsKeyCommand(input) {
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
    DisassociateKmsKeyCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "DisassociateKmsKeyCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DisassociateKmsKeyRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DisassociateKmsKeyCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DisassociateKmsKeyCommand(input, context);
    };
    DisassociateKmsKeyCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DisassociateKmsKeyCommand(output, context);
    };
    return DisassociateKmsKeyCommand;
}($Command));
export { DisassociateKmsKeyCommand };
//# sourceMappingURL=DisassociateKmsKeyCommand.js.map