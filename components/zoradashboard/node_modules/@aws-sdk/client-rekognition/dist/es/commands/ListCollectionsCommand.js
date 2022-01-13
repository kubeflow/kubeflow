import { __extends } from "tslib";
import { ListCollectionsRequest, ListCollectionsResponse } from "../models/models_0";
import { deserializeAws_json1_1ListCollectionsCommand, serializeAws_json1_1ListCollectionsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns list of collection IDs in your account.
 *     If the result is truncated, the response also provides a <code>NextToken</code>
 *     that you can use in the subsequent request to fetch the next set of collection IDs.</p>
 *
 *          <p>For an example, see Listing Collections in the Amazon Rekognition Developer Guide.</p>
 *          <p>This operation requires permissions to perform the <code>rekognition:ListCollections</code> action.</p>
 */
var ListCollectionsCommand = /** @class */ (function (_super) {
    __extends(ListCollectionsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListCollectionsCommand(input) {
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
    ListCollectionsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "ListCollectionsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListCollectionsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListCollectionsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListCollectionsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListCollectionsCommand(input, context);
    };
    ListCollectionsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListCollectionsCommand(output, context);
    };
    return ListCollectionsCommand;
}($Command));
export { ListCollectionsCommand };
//# sourceMappingURL=ListCollectionsCommand.js.map