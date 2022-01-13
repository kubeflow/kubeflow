"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopStreamEncryptionCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
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
class StopStreamEncryptionCommand extends smithy_client_1.Command {
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
        const commandName = "StopStreamEncryptionCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.StopStreamEncryptionInput.filterSensitiveLog,
            outputFilterSensitiveLog: (output) => output,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1StopStreamEncryptionCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1StopStreamEncryptionCommand(output, context);
    }
}
exports.StopStreamEncryptionCommand = StopStreamEncryptionCommand;
//# sourceMappingURL=StopStreamEncryptionCommand.js.map