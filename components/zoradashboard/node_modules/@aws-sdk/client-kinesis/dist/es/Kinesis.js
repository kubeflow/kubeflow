import { __extends } from "tslib";
import { KinesisClient } from "./KinesisClient";
import { AddTagsToStreamCommand, } from "./commands/AddTagsToStreamCommand";
import { CreateStreamCommand, } from "./commands/CreateStreamCommand";
import { DecreaseStreamRetentionPeriodCommand, } from "./commands/DecreaseStreamRetentionPeriodCommand";
import { DeleteStreamCommand, } from "./commands/DeleteStreamCommand";
import { DeregisterStreamConsumerCommand, } from "./commands/DeregisterStreamConsumerCommand";
import { DescribeLimitsCommand, } from "./commands/DescribeLimitsCommand";
import { DescribeStreamCommand, } from "./commands/DescribeStreamCommand";
import { DescribeStreamConsumerCommand, } from "./commands/DescribeStreamConsumerCommand";
import { DescribeStreamSummaryCommand, } from "./commands/DescribeStreamSummaryCommand";
import { DisableEnhancedMonitoringCommand, } from "./commands/DisableEnhancedMonitoringCommand";
import { EnableEnhancedMonitoringCommand, } from "./commands/EnableEnhancedMonitoringCommand";
import { GetRecordsCommand } from "./commands/GetRecordsCommand";
import { GetShardIteratorCommand, } from "./commands/GetShardIteratorCommand";
import { IncreaseStreamRetentionPeriodCommand, } from "./commands/IncreaseStreamRetentionPeriodCommand";
import { ListShardsCommand } from "./commands/ListShardsCommand";
import { ListStreamConsumersCommand, } from "./commands/ListStreamConsumersCommand";
import { ListStreamsCommand } from "./commands/ListStreamsCommand";
import { ListTagsForStreamCommand, } from "./commands/ListTagsForStreamCommand";
import { MergeShardsCommand } from "./commands/MergeShardsCommand";
import { PutRecordCommand } from "./commands/PutRecordCommand";
import { PutRecordsCommand } from "./commands/PutRecordsCommand";
import { RegisterStreamConsumerCommand, } from "./commands/RegisterStreamConsumerCommand";
import { RemoveTagsFromStreamCommand, } from "./commands/RemoveTagsFromStreamCommand";
import { SplitShardCommand } from "./commands/SplitShardCommand";
import { StartStreamEncryptionCommand, } from "./commands/StartStreamEncryptionCommand";
import { StopStreamEncryptionCommand, } from "./commands/StopStreamEncryptionCommand";
import { SubscribeToShardCommand, } from "./commands/SubscribeToShardCommand";
import { UpdateShardCountCommand, } from "./commands/UpdateShardCountCommand";
/**
 * <fullname>Amazon Kinesis Data Streams Service API Reference</fullname>
 *         <p>Amazon Kinesis Data Streams is a managed service that scales elastically for
 *             real-time processing of streaming big data.</p>
 */
var Kinesis = /** @class */ (function (_super) {
    __extends(Kinesis, _super);
    function Kinesis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Kinesis.prototype.addTagsToStream = function (args, optionsOrCb, cb) {
        var command = new AddTagsToStreamCommand(args);
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
    Kinesis.prototype.createStream = function (args, optionsOrCb, cb) {
        var command = new CreateStreamCommand(args);
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
    Kinesis.prototype.decreaseStreamRetentionPeriod = function (args, optionsOrCb, cb) {
        var command = new DecreaseStreamRetentionPeriodCommand(args);
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
    Kinesis.prototype.deleteStream = function (args, optionsOrCb, cb) {
        var command = new DeleteStreamCommand(args);
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
    Kinesis.prototype.deregisterStreamConsumer = function (args, optionsOrCb, cb) {
        var command = new DeregisterStreamConsumerCommand(args);
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
    Kinesis.prototype.describeLimits = function (args, optionsOrCb, cb) {
        var command = new DescribeLimitsCommand(args);
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
    Kinesis.prototype.describeStream = function (args, optionsOrCb, cb) {
        var command = new DescribeStreamCommand(args);
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
    Kinesis.prototype.describeStreamConsumer = function (args, optionsOrCb, cb) {
        var command = new DescribeStreamConsumerCommand(args);
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
    Kinesis.prototype.describeStreamSummary = function (args, optionsOrCb, cb) {
        var command = new DescribeStreamSummaryCommand(args);
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
    Kinesis.prototype.disableEnhancedMonitoring = function (args, optionsOrCb, cb) {
        var command = new DisableEnhancedMonitoringCommand(args);
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
    Kinesis.prototype.enableEnhancedMonitoring = function (args, optionsOrCb, cb) {
        var command = new EnableEnhancedMonitoringCommand(args);
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
    Kinesis.prototype.getRecords = function (args, optionsOrCb, cb) {
        var command = new GetRecordsCommand(args);
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
    Kinesis.prototype.getShardIterator = function (args, optionsOrCb, cb) {
        var command = new GetShardIteratorCommand(args);
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
    Kinesis.prototype.increaseStreamRetentionPeriod = function (args, optionsOrCb, cb) {
        var command = new IncreaseStreamRetentionPeriodCommand(args);
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
    Kinesis.prototype.listShards = function (args, optionsOrCb, cb) {
        var command = new ListShardsCommand(args);
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
    Kinesis.prototype.listStreamConsumers = function (args, optionsOrCb, cb) {
        var command = new ListStreamConsumersCommand(args);
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
    Kinesis.prototype.listStreams = function (args, optionsOrCb, cb) {
        var command = new ListStreamsCommand(args);
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
    Kinesis.prototype.listTagsForStream = function (args, optionsOrCb, cb) {
        var command = new ListTagsForStreamCommand(args);
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
    Kinesis.prototype.mergeShards = function (args, optionsOrCb, cb) {
        var command = new MergeShardsCommand(args);
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
    Kinesis.prototype.putRecord = function (args, optionsOrCb, cb) {
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
    Kinesis.prototype.putRecords = function (args, optionsOrCb, cb) {
        var command = new PutRecordsCommand(args);
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
    Kinesis.prototype.registerStreamConsumer = function (args, optionsOrCb, cb) {
        var command = new RegisterStreamConsumerCommand(args);
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
    Kinesis.prototype.removeTagsFromStream = function (args, optionsOrCb, cb) {
        var command = new RemoveTagsFromStreamCommand(args);
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
    Kinesis.prototype.splitShard = function (args, optionsOrCb, cb) {
        var command = new SplitShardCommand(args);
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
    Kinesis.prototype.startStreamEncryption = function (args, optionsOrCb, cb) {
        var command = new StartStreamEncryptionCommand(args);
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
    Kinesis.prototype.stopStreamEncryption = function (args, optionsOrCb, cb) {
        var command = new StopStreamEncryptionCommand(args);
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
    Kinesis.prototype.subscribeToShard = function (args, optionsOrCb, cb) {
        var command = new SubscribeToShardCommand(args);
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
    Kinesis.prototype.updateShardCount = function (args, optionsOrCb, cb) {
        var command = new UpdateShardCountCommand(args);
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
    return Kinesis;
}(KinesisClient));
export { Kinesis };
//# sourceMappingURL=Kinesis.js.map