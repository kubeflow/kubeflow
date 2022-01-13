import { __extends } from "tslib";
import { StopDeliveryStreamEncryptionInput, StopDeliveryStreamEncryptionOutput } from "../models/models_0";
import { deserializeAws_json1_1StopDeliveryStreamEncryptionCommand, serializeAws_json1_1StopDeliveryStreamEncryptionCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Disables server-side encryption (SSE) for the delivery stream. </p>
 *          <p>This operation is asynchronous. It returns immediately. When you invoke it, Kinesis Data
 *          Firehose first sets the encryption status of the stream to <code>DISABLING</code>, and then
 *          to <code>DISABLED</code>. You can continue to read and write data to your stream while its
 *          status is <code>DISABLING</code>. It can take up to 5 seconds after the encryption status
 *          changes to <code>DISABLED</code> before all records written to the delivery stream are no
 *          longer subject to encryption. To find out whether a record or a batch of records was
 *          encrypted, check the response elements <a>PutRecordOutput$Encrypted</a> and
 *             <a>PutRecordBatchOutput$Encrypted</a>, respectively.</p>
 *          <p>To check the encryption state of a delivery stream, use <a>DescribeDeliveryStream</a>. </p>
 *          <p>If SSE is enabled using a customer managed CMK and then you invoke
 *             <code>StopDeliveryStreamEncryption</code>, Kinesis Data Firehose schedules the related
 *          KMS grant for retirement and then retires it after it ensures that it is finished
 *          delivering records to the destination.</p>
 *          <p>The <code>StartDeliveryStreamEncryption</code> and
 *             <code>StopDeliveryStreamEncryption</code> operations have a combined limit of 25 calls
 *          per delivery stream per 24 hours. For example, you reach the limit if you call
 *             <code>StartDeliveryStreamEncryption</code> 13 times and
 *             <code>StopDeliveryStreamEncryption</code> 12 times for the same delivery stream in a
 *          24-hour period.</p>
 */
var StopDeliveryStreamEncryptionCommand = /** @class */ (function (_super) {
    __extends(StopDeliveryStreamEncryptionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StopDeliveryStreamEncryptionCommand(input) {
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
    StopDeliveryStreamEncryptionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "FirehoseClient";
        var commandName = "StopDeliveryStreamEncryptionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StopDeliveryStreamEncryptionInput.filterSensitiveLog,
            outputFilterSensitiveLog: StopDeliveryStreamEncryptionOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StopDeliveryStreamEncryptionCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StopDeliveryStreamEncryptionCommand(input, context);
    };
    StopDeliveryStreamEncryptionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StopDeliveryStreamEncryptionCommand(output, context);
    };
    return StopDeliveryStreamEncryptionCommand;
}($Command));
export { StopDeliveryStreamEncryptionCommand };
//# sourceMappingURL=StopDeliveryStreamEncryptionCommand.js.map