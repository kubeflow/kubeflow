"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescribeLimitsCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Describes the shard limits and usage for the account.</p>
 *         <p>If you update your account limits, the old limits might be returned for a few
 *             minutes.</p>
 *         <p>This operation has a limit of one transaction per second per account.</p>
 */
class DescribeLimitsCommand extends smithy_client_1.Command {
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
        const commandName = "DescribeLimitsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DescribeLimitsInput.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DescribeLimitsOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1DescribeLimitsCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1DescribeLimitsCommand(output, context);
    }
}
exports.DescribeLimitsCommand = DescribeLimitsCommand;
//# sourceMappingURL=DescribeLimitsCommand.js.map