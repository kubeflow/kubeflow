"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecreaseStreamRetentionPeriodCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Decreases the Kinesis data stream's retention period, which is the length of time
 *             data records are accessible after they are added to the stream. The minimum value of a
 *             stream's retention period is 24 hours.</p>
 *         <p>This operation may result in lost data. For example, if the stream's retention
 *             period is 48 hours and is decreased to 24 hours, any data already in the stream that is
 *             older than 24 hours is inaccessible.</p>
 */
class DecreaseStreamRetentionPeriodCommand extends smithy_client_1.Command {
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
        const commandName = "DecreaseStreamRetentionPeriodCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DecreaseStreamRetentionPeriodInput.filterSensitiveLog,
            outputFilterSensitiveLog: (output) => output,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1DecreaseStreamRetentionPeriodCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1DecreaseStreamRetentionPeriodCommand(output, context);
    }
}
exports.DecreaseStreamRetentionPeriodCommand = DecreaseStreamRetentionPeriodCommand;
//# sourceMappingURL=DecreaseStreamRetentionPeriodCommand.js.map