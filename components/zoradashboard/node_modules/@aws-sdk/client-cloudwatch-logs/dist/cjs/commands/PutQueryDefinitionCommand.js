"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PutQueryDefinitionCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
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
class PutQueryDefinitionCommand extends smithy_client_1.Command {
    // Start section: command_properties
    // End section: command_properties
    constructor(input) {
        // Start section: command_constructor
        super();
        this.input = input;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use(middleware_serde_1.getSerdePlugin(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "CloudWatchLogsClient";
        const commandName = "PutQueryDefinitionCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.PutQueryDefinitionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.PutQueryDefinitionResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1PutQueryDefinitionCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1PutQueryDefinitionCommand(output, context);
    }
}
exports.PutQueryDefinitionCommand = PutQueryDefinitionCommand;
//# sourceMappingURL=PutQueryDefinitionCommand.js.map