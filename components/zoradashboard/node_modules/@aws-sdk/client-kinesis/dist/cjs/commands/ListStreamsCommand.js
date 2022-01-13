"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListStreamsCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Lists your Kinesis data streams.</p>
 *         <p>The number of streams may be too large to return from a single call to
 *                 <code>ListStreams</code>. You can limit the number of returned streams using the
 *                 <code>Limit</code> parameter. If you do not specify a value for the
 *                 <code>Limit</code> parameter, Kinesis Data Streams uses the default limit, which is
 *             currently 10.</p>
 *         <p>You can detect if there are more streams available to list by using the
 *                 <code>HasMoreStreams</code> flag from the returned output. If there are more streams
 *             available, you can request more streams by using the name of the last stream returned by
 *             the <code>ListStreams</code> request in the <code>ExclusiveStartStreamName</code>
 *             parameter in a subsequent request to <code>ListStreams</code>. The group of stream names
 *             returned by the subsequent request is then added to the list. You can continue this
 *             process until all the stream names have been collected in the list. </p>
 *         <p>
 *             <a>ListStreams</a> has a limit of five transactions per second per
 *             account.</p>
 */
class ListStreamsCommand extends smithy_client_1.Command {
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
        const clientName = "KinesisClient";
        const commandName = "ListStreamsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListStreamsInput.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListStreamsOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1ListStreamsCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1ListStreamsCommand(output, context);
    }
}
exports.ListStreamsCommand = ListStreamsCommand;
//# sourceMappingURL=ListStreamsCommand.js.map