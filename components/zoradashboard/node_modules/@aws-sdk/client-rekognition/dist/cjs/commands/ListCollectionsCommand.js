"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCollectionsCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Returns list of collection IDs in your account.
 *     If the result is truncated, the response also provides a <code>NextToken</code>
 *     that you can use in the subsequent request to fetch the next set of collection IDs.</p>
 *
 *          <p>For an example, see Listing Collections in the Amazon Rekognition Developer Guide.</p>
 *          <p>This operation requires permissions to perform the <code>rekognition:ListCollections</code> action.</p>
 */
class ListCollectionsCommand extends smithy_client_1.Command {
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
        const commandName = "ListCollectionsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListCollectionsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListCollectionsResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1ListCollectionsCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1ListCollectionsCommand(output, context);
    }
}
exports.ListCollectionsCommand = ListCollectionsCommand;
//# sourceMappingURL=ListCollectionsCommand.js.map