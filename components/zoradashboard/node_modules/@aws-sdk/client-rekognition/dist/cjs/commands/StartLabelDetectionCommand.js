"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartLabelDetectionCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Starts asynchronous detection of labels in a stored video.</p>
 *          <p>Amazon Rekognition Video can detect labels in a video. Labels are instances of real-world entities.
 *        This includes objects like flower, tree, and table; events like
 *        wedding, graduation, and birthday party; concepts like landscape, evening, and nature; and activities
 *        like a person getting out of a car or a person skiing.</p>
 *
 *          <p>The video must be stored in an Amazon S3 bucket. Use <a>Video</a> to specify the bucket name
 *        and the filename of the video.
 *         <code>StartLabelDetection</code> returns a job identifier (<code>JobId</code>) which you use to get the
 *        results of the operation. When label detection is finished, Amazon Rekognition Video publishes a completion status
 *         to the Amazon Simple Notification Service topic that you specify in <code>NotificationChannel</code>.</p>
 *          <p>To get the results of the label detection operation, first check that the status value published to the Amazon SNS
 *         topic is <code>SUCCEEDED</code>. If so, call  <a>GetLabelDetection</a> and pass the job identifier
 *        (<code>JobId</code>) from the initial call to <code>StartLabelDetection</code>.</p>
 *         <p></p>
 */
class StartLabelDetectionCommand extends smithy_client_1.Command {
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
        const commandName = "StartLabelDetectionCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.StartLabelDetectionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.StartLabelDetectionResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1StartLabelDetectionCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1StartLabelDetectionCommand(output, context);
    }
}
exports.StartLabelDetectionCommand = StartLabelDetectionCommand;
//# sourceMappingURL=StartLabelDetectionCommand.js.map