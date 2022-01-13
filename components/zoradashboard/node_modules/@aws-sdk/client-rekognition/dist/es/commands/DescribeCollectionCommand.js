import { __extends } from "tslib";
import { DescribeCollectionRequest, DescribeCollectionResponse } from "../models/models_0";
import { deserializeAws_json1_1DescribeCollectionCommand, serializeAws_json1_1DescribeCollectionCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Describes the specified collection. You can use <code>DescribeCollection</code> to get
 *          information, such as the number of faces indexed into a collection and the version of the
 *          model used by the collection for face detection.</p>
 *
 *          <p>For more information, see Describing a Collection in the
 *      Amazon Rekognition Developer Guide.</p>
 */
var DescribeCollectionCommand = /** @class */ (function (_super) {
    __extends(DescribeCollectionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeCollectionCommand(input) {
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
    DescribeCollectionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "DescribeCollectionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeCollectionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeCollectionResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeCollectionCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeCollectionCommand(input, context);
    };
    DescribeCollectionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeCollectionCommand(output, context);
    };
    return DescribeCollectionCommand;
}($Command));
export { DescribeCollectionCommand };
//# sourceMappingURL=DescribeCollectionCommand.js.map