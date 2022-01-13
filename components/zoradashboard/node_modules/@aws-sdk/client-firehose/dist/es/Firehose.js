import { __extends } from "tslib";
import { FirehoseClient } from "./FirehoseClient";
import { CreateDeliveryStreamCommand, } from "./commands/CreateDeliveryStreamCommand";
import { DeleteDeliveryStreamCommand, } from "./commands/DeleteDeliveryStreamCommand";
import { DescribeDeliveryStreamCommand, } from "./commands/DescribeDeliveryStreamCommand";
import { ListDeliveryStreamsCommand, } from "./commands/ListDeliveryStreamsCommand";
import { ListTagsForDeliveryStreamCommand, } from "./commands/ListTagsForDeliveryStreamCommand";
import { PutRecordBatchCommand, } from "./commands/PutRecordBatchCommand";
import { PutRecordCommand } from "./commands/PutRecordCommand";
import { StartDeliveryStreamEncryptionCommand, } from "./commands/StartDeliveryStreamEncryptionCommand";
import { StopDeliveryStreamEncryptionCommand, } from "./commands/StopDeliveryStreamEncryptionCommand";
import { TagDeliveryStreamCommand, } from "./commands/TagDeliveryStreamCommand";
import { UntagDeliveryStreamCommand, } from "./commands/UntagDeliveryStreamCommand";
import { UpdateDestinationCommand, } from "./commands/UpdateDestinationCommand";
/**
 * <fullname>Amazon Kinesis Data Firehose API Reference</fullname>
 *          <p>Amazon Kinesis Data Firehose is a fully managed service that delivers real-time
 *          streaming data to destinations such as Amazon Simple Storage Service (Amazon S3), Amazon
 *          Elasticsearch Service (Amazon ES), Amazon Redshift, and Splunk.</p>
 */
var Firehose = /** @class */ (function (_super) {
    __extends(Firehose, _super);
    function Firehose() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Firehose.prototype.createDeliveryStream = function (args, optionsOrCb, cb) {
        var command = new CreateDeliveryStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Firehose.prototype.deleteDeliveryStream = function (args, optionsOrCb, cb) {
        var command = new DeleteDeliveryStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Firehose.prototype.describeDeliveryStream = function (args, optionsOrCb, cb) {
        var command = new DescribeDeliveryStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Firehose.prototype.listDeliveryStreams = function (args, optionsOrCb, cb) {
        var command = new ListDeliveryStreamsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Firehose.prototype.listTagsForDeliveryStream = function (args, optionsOrCb, cb) {
        var command = new ListTagsForDeliveryStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Firehose.prototype.putRecord = function (args, optionsOrCb, cb) {
        var command = new PutRecordCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Firehose.prototype.putRecordBatch = function (args, optionsOrCb, cb) {
        var command = new PutRecordBatchCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Firehose.prototype.startDeliveryStreamEncryption = function (args, optionsOrCb, cb) {
        var command = new StartDeliveryStreamEncryptionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Firehose.prototype.stopDeliveryStreamEncryption = function (args, optionsOrCb, cb) {
        var command = new StopDeliveryStreamEncryptionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Firehose.prototype.tagDeliveryStream = function (args, optionsOrCb, cb) {
        var command = new TagDeliveryStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Firehose.prototype.untagDeliveryStream = function (args, optionsOrCb, cb) {
        var command = new UntagDeliveryStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    Firehose.prototype.updateDestination = function (args, optionsOrCb, cb) {
        var command = new UpdateDestinationCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    return Firehose;
}(FirehoseClient));
export { Firehose };
//# sourceMappingURL=Firehose.js.map