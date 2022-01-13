"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kinesis = void 0;
const KinesisClient_1 = require("./KinesisClient");
const AddTagsToStreamCommand_1 = require("./commands/AddTagsToStreamCommand");
const CreateStreamCommand_1 = require("./commands/CreateStreamCommand");
const DecreaseStreamRetentionPeriodCommand_1 = require("./commands/DecreaseStreamRetentionPeriodCommand");
const DeleteStreamCommand_1 = require("./commands/DeleteStreamCommand");
const DeregisterStreamConsumerCommand_1 = require("./commands/DeregisterStreamConsumerCommand");
const DescribeLimitsCommand_1 = require("./commands/DescribeLimitsCommand");
const DescribeStreamCommand_1 = require("./commands/DescribeStreamCommand");
const DescribeStreamConsumerCommand_1 = require("./commands/DescribeStreamConsumerCommand");
const DescribeStreamSummaryCommand_1 = require("./commands/DescribeStreamSummaryCommand");
const DisableEnhancedMonitoringCommand_1 = require("./commands/DisableEnhancedMonitoringCommand");
const EnableEnhancedMonitoringCommand_1 = require("./commands/EnableEnhancedMonitoringCommand");
const GetRecordsCommand_1 = require("./commands/GetRecordsCommand");
const GetShardIteratorCommand_1 = require("./commands/GetShardIteratorCommand");
const IncreaseStreamRetentionPeriodCommand_1 = require("./commands/IncreaseStreamRetentionPeriodCommand");
const ListShardsCommand_1 = require("./commands/ListShardsCommand");
const ListStreamConsumersCommand_1 = require("./commands/ListStreamConsumersCommand");
const ListStreamsCommand_1 = require("./commands/ListStreamsCommand");
const ListTagsForStreamCommand_1 = require("./commands/ListTagsForStreamCommand");
const MergeShardsCommand_1 = require("./commands/MergeShardsCommand");
const PutRecordCommand_1 = require("./commands/PutRecordCommand");
const PutRecordsCommand_1 = require("./commands/PutRecordsCommand");
const RegisterStreamConsumerCommand_1 = require("./commands/RegisterStreamConsumerCommand");
const RemoveTagsFromStreamCommand_1 = require("./commands/RemoveTagsFromStreamCommand");
const SplitShardCommand_1 = require("./commands/SplitShardCommand");
const StartStreamEncryptionCommand_1 = require("./commands/StartStreamEncryptionCommand");
const StopStreamEncryptionCommand_1 = require("./commands/StopStreamEncryptionCommand");
const SubscribeToShardCommand_1 = require("./commands/SubscribeToShardCommand");
const UpdateShardCountCommand_1 = require("./commands/UpdateShardCountCommand");
/**
 * <fullname>Amazon Kinesis Data Streams Service API Reference</fullname>
 *         <p>Amazon Kinesis Data Streams is a managed service that scales elastically for
 *             real-time processing of streaming big data.</p>
 */
class Kinesis extends KinesisClient_1.KinesisClient {
    addTagsToStream(args, optionsOrCb, cb) {
        const command = new AddTagsToStreamCommand_1.AddTagsToStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createStream(args, optionsOrCb, cb) {
        const command = new CreateStreamCommand_1.CreateStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    decreaseStreamRetentionPeriod(args, optionsOrCb, cb) {
        const command = new DecreaseStreamRetentionPeriodCommand_1.DecreaseStreamRetentionPeriodCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteStream(args, optionsOrCb, cb) {
        const command = new DeleteStreamCommand_1.DeleteStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deregisterStreamConsumer(args, optionsOrCb, cb) {
        const command = new DeregisterStreamConsumerCommand_1.DeregisterStreamConsumerCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeLimits(args, optionsOrCb, cb) {
        const command = new DescribeLimitsCommand_1.DescribeLimitsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeStream(args, optionsOrCb, cb) {
        const command = new DescribeStreamCommand_1.DescribeStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeStreamConsumer(args, optionsOrCb, cb) {
        const command = new DescribeStreamConsumerCommand_1.DescribeStreamConsumerCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    describeStreamSummary(args, optionsOrCb, cb) {
        const command = new DescribeStreamSummaryCommand_1.DescribeStreamSummaryCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    disableEnhancedMonitoring(args, optionsOrCb, cb) {
        const command = new DisableEnhancedMonitoringCommand_1.DisableEnhancedMonitoringCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    enableEnhancedMonitoring(args, optionsOrCb, cb) {
        const command = new EnableEnhancedMonitoringCommand_1.EnableEnhancedMonitoringCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getRecords(args, optionsOrCb, cb) {
        const command = new GetRecordsCommand_1.GetRecordsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getShardIterator(args, optionsOrCb, cb) {
        const command = new GetShardIteratorCommand_1.GetShardIteratorCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    increaseStreamRetentionPeriod(args, optionsOrCb, cb) {
        const command = new IncreaseStreamRetentionPeriodCommand_1.IncreaseStreamRetentionPeriodCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listShards(args, optionsOrCb, cb) {
        const command = new ListShardsCommand_1.ListShardsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listStreamConsumers(args, optionsOrCb, cb) {
        const command = new ListStreamConsumersCommand_1.ListStreamConsumersCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listStreams(args, optionsOrCb, cb) {
        const command = new ListStreamsCommand_1.ListStreamsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listTagsForStream(args, optionsOrCb, cb) {
        const command = new ListTagsForStreamCommand_1.ListTagsForStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    mergeShards(args, optionsOrCb, cb) {
        const command = new MergeShardsCommand_1.MergeShardsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    putRecord(args, optionsOrCb, cb) {
        const command = new PutRecordCommand_1.PutRecordCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    putRecords(args, optionsOrCb, cb) {
        const command = new PutRecordsCommand_1.PutRecordsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    registerStreamConsumer(args, optionsOrCb, cb) {
        const command = new RegisterStreamConsumerCommand_1.RegisterStreamConsumerCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    removeTagsFromStream(args, optionsOrCb, cb) {
        const command = new RemoveTagsFromStreamCommand_1.RemoveTagsFromStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    splitShard(args, optionsOrCb, cb) {
        const command = new SplitShardCommand_1.SplitShardCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    startStreamEncryption(args, optionsOrCb, cb) {
        const command = new StartStreamEncryptionCommand_1.StartStreamEncryptionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    stopStreamEncryption(args, optionsOrCb, cb) {
        const command = new StopStreamEncryptionCommand_1.StopStreamEncryptionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    subscribeToShard(args, optionsOrCb, cb) {
        const command = new SubscribeToShardCommand_1.SubscribeToShardCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateShardCount(args, optionsOrCb, cb) {
        const command = new UpdateShardCountCommand_1.UpdateShardCountCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
}
exports.Kinesis = Kinesis;
//# sourceMappingURL=Kinesis.js.map