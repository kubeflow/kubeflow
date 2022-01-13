"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCelebrityInfoCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Gets the name and additional information about a celebrity based on his or her
 *       Amazon Rekognition ID. The additional information is returned as an array of URLs. If there is no
 *       additional information about the celebrity, this list is empty.</p>
 *
 *          <p>For more information, see Recognizing Celebrities in an Image in
 *       the Amazon Rekognition Developer Guide.</p>
 *          <p>This operation requires permissions to perform the
 *         <code>rekognition:GetCelebrityInfo</code> action. </p>
 */
class GetCelebrityInfoCommand extends smithy_client_1.Command {
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
        const clientName = "RekognitionClient";
        const commandName = "GetCelebrityInfoCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetCelebrityInfoRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetCelebrityInfoResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1GetCelebrityInfoCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1GetCelebrityInfoCommand(output, context);
    }
}
exports.GetCelebrityInfoCommand = GetCelebrityInfoCommand;
//# sourceMappingURL=GetCelebrityInfoCommand.js.map