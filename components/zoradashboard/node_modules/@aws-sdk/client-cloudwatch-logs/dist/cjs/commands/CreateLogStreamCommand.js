"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLogStreamCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Creates a log stream for the specified log group. A log stream is a sequence of log events
 *       that originate from a single source, such as an application instance or a resource that is
 *       being monitored.</p>
 *          <p>There is no limit on the number of log streams that you can create for a log group. There is a limit
 *     of 50 TPS on <code>CreateLogStream</code> operations, after which transactions are throttled.</p>
 *          <p>You must use the following guidelines when naming a log stream:</p>
 *          <ul>
 *             <li>
 *                <p>Log stream names must be unique within the log group.</p>
 *             </li>
 *             <li>
 *                <p>Log stream names can be between 1 and 512 characters long.</p>
 *             </li>
 *             <li>
 *                <p>The ':' (colon) and '*' (asterisk) characters are not allowed.</p>
 *             </li>
 *          </ul>
 */
class CreateLogStreamCommand extends smithy_client_1.Command {
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
        const commandName = "CreateLogStreamCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.CreateLogStreamRequest.filterSensitiveLog,
            outputFilterSensitiveLog: (output) => output,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1CreateLogStreamCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1CreateLogStreamCommand(output, context);
    }
}
exports.CreateLogStreamCommand = CreateLogStreamCommand;
//# sourceMappingURL=CreateLogStreamCommand.js.map