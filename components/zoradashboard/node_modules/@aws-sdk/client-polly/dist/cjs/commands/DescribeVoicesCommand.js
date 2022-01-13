"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescribeVoicesCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restJson1_1 = require("../protocols/Aws_restJson1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Returns the list of voices that are available for use when requesting speech synthesis.
 *       Each voice speaks a specified language, is either male or female, and is identified by an ID,
 *       which is the ASCII version of the voice name. </p>
 *
 *          <p>When synthesizing speech ( <code>SynthesizeSpeech</code> ), you provide the voice ID
 *       for the voice you want from the list of voices returned by
 *       <code>DescribeVoices</code>.</p>
 *
 *          <p>For example, you want your news reader application to read news in a specific language,
 *       but giving a user the option to choose the voice. Using the <code>DescribeVoices</code>
 *       operation you can provide the user with a list of available voices to select from.</p>
 *
 *          <p> You can optionally specify a language code to filter the available voices. For
 *       example, if you specify <code>en-US</code>, the operation returns a list of all available US
 *       English voices. </p>
 *          <p>This operation requires permissions to perform the <code>polly:DescribeVoices</code>
 *       action.</p>
 */
class DescribeVoicesCommand extends smithy_client_1.Command {
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
        const clientName = "PollyClient";
        const commandName = "DescribeVoicesCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DescribeVoicesInput.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DescribeVoicesOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restJson1_1.serializeAws_restJson1DescribeVoicesCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restJson1_1.deserializeAws_restJson1DescribeVoicesCommand(output, context);
    }
}
exports.DescribeVoicesCommand = DescribeVoicesCommand;
//# sourceMappingURL=DescribeVoicesCommand.js.map