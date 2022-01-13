"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescribeCollectionCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Describes the specified collection. You can use <code>DescribeCollection</code> to get
 *          information, such as the number of faces indexed into a collection and the version of the
 *          model used by the collection for face detection.</p>
 *
 *          <p>For more information, see Describing a Collection in the
 *      Amazon Rekognition Developer Guide.</p>
 */
class DescribeCollectionCommand extends smithy_client_1.Command {
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
        const commandName = "DescribeCollectionCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DescribeCollectionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DescribeCollectionResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1DescribeCollectionCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1DescribeCollectionCommand(output, context);
    }
}
exports.DescribeCollectionCommand = DescribeCollectionCommand;
//# sourceMappingURL=DescribeCollectionCommand.js.map