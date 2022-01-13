"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFacesCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Returns metadata for faces in the specified collection.
 *       This metadata includes information such as the bounding box coordinates, the confidence
 *       (that the bounding box contains a face), and face ID. For an example, see Listing Faces in a Collection
 *       in the Amazon Rekognition Developer Guide.</p>
 *
 *
 *          <p>This operation requires permissions to perform the
 *       <code>rekognition:ListFaces</code> action.</p>
 */
class ListFacesCommand extends smithy_client_1.Command {
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
        const commandName = "ListFacesCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListFacesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListFacesResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1ListFacesCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1ListFacesCommand(output, context);
    }
}
exports.ListFacesCommand = ListFacesCommand;
//# sourceMappingURL=ListFacesCommand.js.map