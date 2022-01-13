"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStreamProcessorCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Creates an Amazon Rekognition stream processor that you can use to detect and recognize faces in a streaming video.</p>
 *         <p>Amazon Rekognition Video is a consumer of live video from Amazon Kinesis Video Streams. Amazon Rekognition Video sends analysis results to Amazon Kinesis Data Streams.</p>
 *         <p>You provide as input a Kinesis video stream (<code>Input</code>) and a Kinesis data stream (<code>Output</code>) stream. You also specify the
 *             face recognition criteria in <code>Settings</code>. For example, the collection containing faces that you want to recognize.
 *             Use <code>Name</code> to assign an identifier for the stream processor. You use <code>Name</code>
 *             to manage the stream processor. For example, you can start processing the source video by calling <a>StartStreamProcessor</a> with
 *             the <code>Name</code> field. </p>
 *         <p>After you have finished analyzing a streaming video, use <a>StopStreamProcessor</a> to
 *         stop processing. You can delete the stream processor by calling <a>DeleteStreamProcessor</a>.</p>
 */
class CreateStreamProcessorCommand extends smithy_client_1.Command {
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
        const commandName = "CreateStreamProcessorCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.CreateStreamProcessorRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.CreateStreamProcessorResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1CreateStreamProcessorCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1CreateStreamProcessorCommand(output, context);
    }
}
exports.CreateStreamProcessorCommand = CreateStreamProcessorCommand;
//# sourceMappingURL=CreateStreamProcessorCommand.js.map