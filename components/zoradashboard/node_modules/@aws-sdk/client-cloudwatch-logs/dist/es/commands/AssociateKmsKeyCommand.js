import { __extends } from "tslib";
import { AssociateKmsKeyRequest } from "../models/models_0";
import { deserializeAws_json1_1AssociateKmsKeyCommand, serializeAws_json1_1AssociateKmsKeyCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Associates the specified AWS Key Management Service (AWS KMS) customer master key (CMK) with the specified log group.</p>
 *          <p>Associating an AWS KMS CMK with a log group overrides any existing associations between the log group and a CMK.
 *       After a CMK is associated with a log group, all newly ingested data for the log group is encrypted using the CMK.
 *       This association is stored as long as the data encrypted with the CMK is still within Amazon CloudWatch Logs.
 *       This enables Amazon CloudWatch Logs to decrypt this data whenever it is requested.</p>
 *          <important>
 *             <p>CloudWatch Logs supports only symmetric CMKs. Do not use an associate an asymmetric CMK
 *         with your log group. For more information, see <a href="https://docs.aws.amazon.com/kms/latest/developerguide/symmetric-asymmetric.html">Using Symmetric and Asymmetric
 *           Keys</a>.</p>
 *          </important>
 *          <p>It can take up to 5 minutes for this operation to take effect.</p>
 *          <p>If you attempt to associate a CMK with a log group but the CMK does not exist or the
 *       CMK is disabled, you receive an <code>InvalidParameterException</code> error. </p>
 */
var AssociateKmsKeyCommand = /** @class */ (function (_super) {
    __extends(AssociateKmsKeyCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function AssociateKmsKeyCommand(input) {
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
    AssociateKmsKeyCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "AssociateKmsKeyCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: AssociateKmsKeyRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    AssociateKmsKeyCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1AssociateKmsKeyCommand(input, context);
    };
    AssociateKmsKeyCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1AssociateKmsKeyCommand(output, context);
    };
    return AssociateKmsKeyCommand;
}($Command));
export { AssociateKmsKeyCommand };
//# sourceMappingURL=AssociateKmsKeyCommand.js.map