import { __extends } from "tslib";
import { CreateStreamProcessorRequest, CreateStreamProcessorResponse } from "../models/models_0";
import { deserializeAws_json1_1CreateStreamProcessorCommand, serializeAws_json1_1CreateStreamProcessorCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
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
var CreateStreamProcessorCommand = /** @class */ (function (_super) {
    __extends(CreateStreamProcessorCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CreateStreamProcessorCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    CreateStreamProcessorCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "CreateStreamProcessorCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateStreamProcessorRequest.filterSensitiveLog,
            outputFilterSensitiveLog: CreateStreamProcessorResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateStreamProcessorCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1CreateStreamProcessorCommand(input, context);
    };
    CreateStreamProcessorCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1CreateStreamProcessorCommand(output, context);
    };
    return CreateStreamProcessorCommand;
}($Command));
export { CreateStreamProcessorCommand };
//# sourceMappingURL=CreateStreamProcessorCommand.js.map