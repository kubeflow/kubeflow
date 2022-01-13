"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartContentModerationCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p> Starts asynchronous detection of unsafe content in a stored video.</p>
 *          <p>Amazon Rekognition Video can moderate content in a video stored in an Amazon S3 bucket. Use <a>Video</a> to specify the bucket name
 *       and the filename of the video. <code>StartContentModeration</code>
 *         returns a job identifier (<code>JobId</code>) which you use to get the results of the analysis.
 *         When unsafe content analysis is finished, Amazon Rekognition Video publishes a completion status
 *         to the Amazon Simple Notification Service topic that you specify in <code>NotificationChannel</code>.</p>
 *         <p>To get the results of the unsafe content analysis, first check that the status value published to the Amazon SNS
 *         topic is <code>SUCCEEDED</code>. If so, call <a>GetContentModeration</a> and pass the job identifier
 *         (<code>JobId</code>) from the initial call to <code>StartContentModeration</code>. </p>
 *
 *          <p>For more information, see Detecting Unsafe Content in the Amazon Rekognition Developer Guide.</p>
 */
class StartContentModerationCommand extends smithy_client_1.Command {
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
        const commandName = "StartContentModerationCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.StartContentModerationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.StartContentModerationResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1StartContentModerationCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1StartContentModerationCommand(output, context);
    }
}
exports.StartContentModerationCommand = StartContentModerationCommand;
//# sourceMappingURL=StartContentModerationCommand.js.map