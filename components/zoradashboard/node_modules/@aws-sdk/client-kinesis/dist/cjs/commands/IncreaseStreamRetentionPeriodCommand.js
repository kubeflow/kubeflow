"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncreaseStreamRetentionPeriodCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Increases the Kinesis data stream's retention period, which is the length of time
 *             data records are accessible after they are added to the stream. The maximum value of a
 *             stream's retention period is 168 hours (7 days).</p>
 *         <p>If you choose a longer stream retention period, this operation increases the time
 *             period during which records that have not yet expired are accessible. However, it does
 *             not make previous, expired data (older than the stream's previous retention period)
 *             accessible after the operation has been called. For example, if a stream's retention
 *             period is set to 24 hours and is increased to 168 hours, any data that is older than 24
 *             hours remains inaccessible to consumer applications.</p>
 */
class IncreaseStreamRetentionPeriodCommand extends smithy_client_1.Command {
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
        const commandName = "IncreaseStreamRetentionPeriodCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.IncreaseStreamRetentionPeriodInput.filterSensitiveLog,
            outputFilterSensitiveLog: (output) => output,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1IncreaseStreamRetentionPeriodCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1IncreaseStreamRetentionPeriodCommand(output, context);
    }
}
exports.IncreaseStreamRetentionPeriodCommand = IncreaseStreamRetentionPeriodCommand;
//# sourceMappingURL=IncreaseStreamRetentionPeriodCommand.js.map