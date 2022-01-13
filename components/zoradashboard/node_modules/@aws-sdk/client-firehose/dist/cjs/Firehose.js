"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firehose = void 0;
const FirehoseClient_1 = require("./FirehoseClient");
const CreateDeliveryStreamCommand_1 = require("./commands/CreateDeliveryStreamCommand");
const DeleteDeliveryStreamCommand_1 = require("./commands/DeleteDeliveryStreamCommand");
const DescribeDeliveryStreamCommand_1 = require("./commands/DescribeDeliveryStreamCommand");
const ListDeliveryStreamsCommand_1 = require("./commands/ListDeliveryStreamsCommand");
const ListTagsForDeliveryStreamCommand_1 = require("./commands/ListTagsForDeliveryStreamCommand");
const PutRecordBatchCommand_1 = require("./commands/PutRecordBatchCommand");
const PutRecordCommand_1 = require("./commands/PutRecordCommand");
const StartDeliveryStreamEncryptionCommand_1 = require("./commands/StartDeliveryStreamEncryptionCommand");
const StopDeliveryStreamEncryptionCommand_1 = require("./commands/StopDeliveryStreamEncryptionCommand");
const TagDeliveryStreamCommand_1 = require("./commands/TagDeliveryStreamCommand");
const UntagDeliveryStreamCommand_1 = require("./commands/UntagDeliveryStreamCommand");
const UpdateDestinationCommand_1 = require("./commands/UpdateDestinationCommand");
/**
 * <fullname>Amazon Kinesis Data Firehose API Reference</fullname>
 *          <p>Amazon Kinesis Data Firehose is a fully managed service that delivers real-time
 *          streaming data to destinations such as Amazon Simple Storage Service (Amazon S3), Amazon
 *          Elasticsearch Service (Amazon ES), Amazon Redshift, and Splunk.</p>
 */
class Firehose extends FirehoseClient_1.FirehoseClient {
    createDeliveryStream(args, optionsOrCb, cb) {
        const command = new CreateDeliveryStreamCommand_1.CreateDeliveryStreamCommand(args);
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
    deleteDeliveryStream(args, optionsOrCb, cb) {
        const command = new DeleteDeliveryStreamCommand_1.DeleteDeliveryStreamCommand(args);
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
    describeDeliveryStream(args, optionsOrCb, cb) {
        const command = new DescribeDeliveryStreamCommand_1.DescribeDeliveryStreamCommand(args);
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
    listDeliveryStreams(args, optionsOrCb, cb) {
        const command = new ListDeliveryStreamsCommand_1.ListDeliveryStreamsCommand(args);
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
    listTagsForDeliveryStream(args, optionsOrCb, cb) {
        const command = new ListTagsForDeliveryStreamCommand_1.ListTagsForDeliveryStreamCommand(args);
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
    putRecordBatch(args, optionsOrCb, cb) {
        const command = new PutRecordBatchCommand_1.PutRecordBatchCommand(args);
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
    startDeliveryStreamEncryption(args, optionsOrCb, cb) {
        const command = new StartDeliveryStreamEncryptionCommand_1.StartDeliveryStreamEncryptionCommand(args);
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
    stopDeliveryStreamEncryption(args, optionsOrCb, cb) {
        const command = new StopDeliveryStreamEncryptionCommand_1.StopDeliveryStreamEncryptionCommand(args);
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
    tagDeliveryStream(args, optionsOrCb, cb) {
        const command = new TagDeliveryStreamCommand_1.TagDeliveryStreamCommand(args);
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
    untagDeliveryStream(args, optionsOrCb, cb) {
        const command = new UntagDeliveryStreamCommand_1.UntagDeliveryStreamCommand(args);
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
    updateDestination(args, optionsOrCb, cb) {
        const command = new UpdateDestinationCommand_1.UpdateDestinationCommand(args);
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
exports.Firehose = Firehose;
//# sourceMappingURL=Firehose.js.map