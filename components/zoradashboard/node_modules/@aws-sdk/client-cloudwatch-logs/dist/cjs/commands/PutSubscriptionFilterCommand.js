"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PutSubscriptionFilterCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Creates or updates a subscription filter and associates it with the specified log
 *       group. Subscription filters allow you to subscribe to a real-time stream of log events
 *       ingested through <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutLogEvents.html">PutLogEvents</a> and have them delivered to a specific
 *       destination. When log events are sent to the
 *       receiving service, they are Base64 encoded
 *       and compressed with the gzip format.</p>
 *          <p>The following destinations are supported for subscription filters:</p>
 *          <ul>
 *             <li>
 *                <p>An Amazon Kinesis stream belonging to the same account as the subscription filter,
 *           for same-account delivery.</p>
 *             </li>
 *             <li>
 *                <p>A logical destination that belongs to a different account, for cross-account delivery.</p>
 *             </li>
 *             <li>
 *                <p>An Amazon Kinesis Firehose delivery stream that belongs to the same account as the
 *           subscription filter, for same-account delivery.</p>
 *             </li>
 *             <li>
 *                <p>An AWS Lambda function that belongs to the same account as the subscription filter,
 *           for same-account delivery.</p>
 *             </li>
 *          </ul>
 *          <p>There can only be one subscription filter associated with a log group. If you are
 *       updating an existing filter, you must specify the correct name in <code>filterName</code>.
 *       Otherwise, the call fails because you cannot associate a second filter with a log
 *       group.</p>
 *          <p>To perform a <code>PutSubscriptionFilter</code> operation, you must also have the
 *       <code>iam:PassRole</code> permission.</p>
 */
class PutSubscriptionFilterCommand extends smithy_client_1.Command {
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
        const commandName = "PutSubscriptionFilterCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.PutSubscriptionFilterRequest.filterSensitiveLog,
            outputFilterSensitiveLog: (output) => output,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1PutSubscriptionFilterCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1PutSubscriptionFilterCommand(output, context);
    }
}
exports.PutSubscriptionFilterCommand = PutSubscriptionFilterCommand;
//# sourceMappingURL=PutSubscriptionFilterCommand.js.map