import { __extends } from "tslib";
import { CreateLogGroupRequest } from "../models/models_0";
import { deserializeAws_json1_1CreateLogGroupCommand, serializeAws_json1_1CreateLogGroupCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates a log group with the specified name. You can create up to 20,000 log groups per account.</p>
 *          <p>You must use the following guidelines when naming a log group:</p>
 *          <ul>
 *             <li>
 *                <p>Log group names must be unique within a region for an AWS account.</p>
 *             </li>
 *             <li>
 *                <p>Log group names can be between 1 and 512 characters long.</p>
 *             </li>
 *             <li>
 *                <p>Log group names consist of the following characters: a-z, A-Z, 0-9, '_' (underscore), '-' (hyphen),
 *           '/' (forward slash), '.' (period), and '#' (number sign)</p>
 *             </li>
 *          </ul>
 *          <p>When you create a log group, by default the log events in the log group never expire. To set
 *     a retention policy so that events expire and are deleted after a specified time, use
 *       <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutRetentionPolicy.html">PutRetentionPolicy</a>.</p>
 *          <p>If you associate a AWS Key Management Service (AWS KMS) customer master key (CMK) with the log group, ingested data is encrypted using the CMK.
 *       This association is stored as long as the data encrypted with the CMK is still within Amazon CloudWatch Logs.
 *       This enables Amazon CloudWatch Logs to decrypt this data whenever it is requested.</p>
 *          <p>If you attempt to associate a CMK with the log group but the CMK does not exist or the
 *       CMK is disabled, you receive an <code>InvalidParameterException</code> error. </p>
 *          <important>
 *             <p> CloudWatch Logs supports only symmetric CMKs. Do not associate an asymmetric CMK with
 *         your log group. For more information, see <a href="https://docs.aws.amazon.com/kms/latest/developerguide/symmetric-asymmetric.html">Using Symmetric and Asymmetric
 *           Keys</a>.</p>
 *          </important>
 */
var CreateLogGroupCommand = /** @class */ (function (_super) {
    __extends(CreateLogGroupCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CreateLogGroupCommand(input) {
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
    CreateLogGroupCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "CreateLogGroupCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateLogGroupRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateLogGroupCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1CreateLogGroupCommand(input, context);
    };
    CreateLogGroupCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1CreateLogGroupCommand(output, context);
    };
    return CreateLogGroupCommand;
}($Command));
export { CreateLogGroupCommand };
//# sourceMappingURL=CreateLogGroupCommand.js.map