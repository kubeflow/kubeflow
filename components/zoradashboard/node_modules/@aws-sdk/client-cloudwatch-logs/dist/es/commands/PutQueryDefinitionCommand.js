import { __extends } from "tslib";
import { PutQueryDefinitionRequest, PutQueryDefinitionResponse } from "../models/models_0";
import { deserializeAws_json1_1PutQueryDefinitionCommand, serializeAws_json1_1PutQueryDefinitionCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates or updates a query definition for CloudWatch Logs Insights. For
 *       more information, see <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html">Analyzing Log Data with CloudWatch Logs Insights</a>.</p>
 *
 *          <p>To update a query definition, specify its
 *         <code>queryDefinitionId</code> in your request. The values of <code>name</code>, <code>queryString</code>,
 *       and <code>logGroupNames</code> are changed to the values that you specify in your update
 *       operation. No current values are retained from the current query definition. For example, if
 *       you update a current query definition that includes log groups, and you don't specify the
 *         <code>logGroupNames</code> parameter in your update operation, the query definition changes
 *       to contain no log groups.</p>
 *          <p>You must have the <code>logs:PutQueryDefinition</code> permission to be able to perform
 *     this operation.</p>
 */
var PutQueryDefinitionCommand = /** @class */ (function (_super) {
    __extends(PutQueryDefinitionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutQueryDefinitionCommand(input) {
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
    PutQueryDefinitionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "PutQueryDefinitionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutQueryDefinitionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: PutQueryDefinitionResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutQueryDefinitionCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1PutQueryDefinitionCommand(input, context);
    };
    PutQueryDefinitionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1PutQueryDefinitionCommand(output, context);
    };
    return PutQueryDefinitionCommand;
}($Command));
export { PutQueryDefinitionCommand };
//# sourceMappingURL=PutQueryDefinitionCommand.js.map