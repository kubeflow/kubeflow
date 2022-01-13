import { __extends } from "tslib";
import { ListBucketsOutput } from "../models/models_0";
import { deserializeAws_restXmlListBucketsCommand, serializeAws_restXmlListBucketsCommand, } from "../protocols/Aws_restXml";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns a list of all buckets owned by the authenticated sender of the request.</p>
 */
var ListBucketsCommand = /** @class */ (function (_super) {
    __extends(ListBucketsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListBucketsCommand(input) {
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
    ListBucketsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "ListBucketsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: function (input) { return input; },
            outputFilterSensitiveLog: ListBucketsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListBucketsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlListBucketsCommand(input, context);
    };
    ListBucketsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlListBucketsCommand(output, context);
    };
    return ListBucketsCommand;
}($Command));
export { ListBucketsCommand };
//# sourceMappingURL=ListBucketsCommand.js.map