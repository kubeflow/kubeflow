import { __extends } from "tslib";
import { TagDeliveryStreamInput, TagDeliveryStreamOutput } from "../models/models_0";
import { deserializeAws_json1_1TagDeliveryStreamCommand, serializeAws_json1_1TagDeliveryStreamCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Adds or updates tags for the specified delivery stream. A tag is a key-value pair
 *          that you can define and assign to AWS resources. If you specify a tag that already exists,
 *          the tag value is replaced with the value that you specify in the request. Tags are
 *          metadata. For example, you can add friendly names and descriptions or other types of
 *          information that can help you distinguish the delivery stream. For more information about
 *          tags, see <a href="https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html">Using Cost Allocation Tags</a> in the <i>AWS Billing and Cost Management
 *             User Guide</i>. </p>
 *          <p>Each delivery stream can have up to 50 tags. </p>
 *          <p>This operation has a limit of five transactions per second per account. </p>
 */
var TagDeliveryStreamCommand = /** @class */ (function (_super) {
    __extends(TagDeliveryStreamCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function TagDeliveryStreamCommand(input) {
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
    TagDeliveryStreamCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "FirehoseClient";
        var commandName = "TagDeliveryStreamCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: TagDeliveryStreamInput.filterSensitiveLog,
            outputFilterSensitiveLog: TagDeliveryStreamOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    TagDeliveryStreamCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1TagDeliveryStreamCommand(input, context);
    };
    TagDeliveryStreamCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1TagDeliveryStreamCommand(output, context);
    };
    return TagDeliveryStreamCommand;
}($Command));
export { TagDeliveryStreamCommand };
//# sourceMappingURL=TagDeliveryStreamCommand.js.map