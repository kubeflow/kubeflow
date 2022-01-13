"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PutLogEventsCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Uploads a batch of log events to the specified log stream.</p>
 *          <p>You must include the sequence token obtained from the response of the previous call. An
 *       upload in a newly created log stream does not require a sequence token. You can also get the
 *       sequence token in the <code>expectedSequenceToken</code> field from
 *         <code>InvalidSequenceTokenException</code>. If you call <code>PutLogEvents</code> twice
 *       within a narrow time period using the same value for <code>sequenceToken</code>, both calls
 *       might be successful or one might be rejected.</p>
 *          <p>The batch of events must satisfy the following constraints:</p>
 *          <ul>
 *             <li>
 *                <p>The maximum batch size is 1,048,576 bytes. This size is calculated as the sum of
 *           all event messages in UTF-8, plus 26 bytes for each log event.</p>
 *             </li>
 *             <li>
 *                <p>None of the log events in the batch can be more than 2 hours in the future.</p>
 *             </li>
 *             <li>
 *                <p>None of the log events in the batch can be older than 14 days or older than the retention
 *           period of the log group.</p>
 *             </li>
 *             <li>
 *                <p>The log events in the batch must be in chronological order by their timestamp. The
 *           timestamp is the time the event occurred, expressed as the number of milliseconds after
 *           Jan 1, 1970 00:00:00 UTC. (In AWS Tools for PowerShell and the AWS SDK for .NET, the
 *           timestamp is specified in .NET format: yyyy-mm-ddThh:mm:ss. For example,
 *           2017-09-15T13:45:30.) </p>
 *             </li>
 *             <li>
 *                <p>A batch of log events in a single request cannot span more than 24 hours. Otherwise, the operation fails.</p>
 *             </li>
 *             <li>
 *                <p>The maximum number of log events in a batch is 10,000.</p>
 *             </li>
 *             <li>
 *                <p>There is a quota of 5 requests per second per log stream. Additional requests are throttled. This quota can't be changed.</p>
 *             </li>
 *          </ul>
 *          <p>If a call to <code>PutLogEvents</code> returns "UnrecognizedClientException" the most likely cause is an invalid AWS access key ID or secret key. </p>
 */
class PutLogEventsCommand extends smithy_client_1.Command {
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
        const commandName = "PutLogEventsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.PutLogEventsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.PutLogEventsResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1PutLogEventsCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1PutLogEventsCommand(output, context);
    }
}
exports.PutLogEventsCommand = PutLogEventsCommand;
//# sourceMappingURL=PutLogEventsCommand.js.map