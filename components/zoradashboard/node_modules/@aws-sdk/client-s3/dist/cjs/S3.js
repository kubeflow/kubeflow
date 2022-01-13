"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3 = void 0;
const S3Client_1 = require("./S3Client");
const AbortMultipartUploadCommand_1 = require("./commands/AbortMultipartUploadCommand");
const CompleteMultipartUploadCommand_1 = require("./commands/CompleteMultipartUploadCommand");
const CopyObjectCommand_1 = require("./commands/CopyObjectCommand");
const CreateBucketCommand_1 = require("./commands/CreateBucketCommand");
const CreateMultipartUploadCommand_1 = require("./commands/CreateMultipartUploadCommand");
const DeleteBucketAnalyticsConfigurationCommand_1 = require("./commands/DeleteBucketAnalyticsConfigurationCommand");
const DeleteBucketCommand_1 = require("./commands/DeleteBucketCommand");
const DeleteBucketCorsCommand_1 = require("./commands/DeleteBucketCorsCommand");
const DeleteBucketEncryptionCommand_1 = require("./commands/DeleteBucketEncryptionCommand");
const DeleteBucketIntelligentTieringConfigurationCommand_1 = require("./commands/DeleteBucketIntelligentTieringConfigurationCommand");
const DeleteBucketInventoryConfigurationCommand_1 = require("./commands/DeleteBucketInventoryConfigurationCommand");
const DeleteBucketLifecycleCommand_1 = require("./commands/DeleteBucketLifecycleCommand");
const DeleteBucketMetricsConfigurationCommand_1 = require("./commands/DeleteBucketMetricsConfigurationCommand");
const DeleteBucketOwnershipControlsCommand_1 = require("./commands/DeleteBucketOwnershipControlsCommand");
const DeleteBucketPolicyCommand_1 = require("./commands/DeleteBucketPolicyCommand");
const DeleteBucketReplicationCommand_1 = require("./commands/DeleteBucketReplicationCommand");
const DeleteBucketTaggingCommand_1 = require("./commands/DeleteBucketTaggingCommand");
const DeleteBucketWebsiteCommand_1 = require("./commands/DeleteBucketWebsiteCommand");
const DeleteObjectCommand_1 = require("./commands/DeleteObjectCommand");
const DeleteObjectTaggingCommand_1 = require("./commands/DeleteObjectTaggingCommand");
const DeleteObjectsCommand_1 = require("./commands/DeleteObjectsCommand");
const DeletePublicAccessBlockCommand_1 = require("./commands/DeletePublicAccessBlockCommand");
const GetBucketAccelerateConfigurationCommand_1 = require("./commands/GetBucketAccelerateConfigurationCommand");
const GetBucketAclCommand_1 = require("./commands/GetBucketAclCommand");
const GetBucketAnalyticsConfigurationCommand_1 = require("./commands/GetBucketAnalyticsConfigurationCommand");
const GetBucketCorsCommand_1 = require("./commands/GetBucketCorsCommand");
const GetBucketEncryptionCommand_1 = require("./commands/GetBucketEncryptionCommand");
const GetBucketIntelligentTieringConfigurationCommand_1 = require("./commands/GetBucketIntelligentTieringConfigurationCommand");
const GetBucketInventoryConfigurationCommand_1 = require("./commands/GetBucketInventoryConfigurationCommand");
const GetBucketLifecycleConfigurationCommand_1 = require("./commands/GetBucketLifecycleConfigurationCommand");
const GetBucketLocationCommand_1 = require("./commands/GetBucketLocationCommand");
const GetBucketLoggingCommand_1 = require("./commands/GetBucketLoggingCommand");
const GetBucketMetricsConfigurationCommand_1 = require("./commands/GetBucketMetricsConfigurationCommand");
const GetBucketNotificationConfigurationCommand_1 = require("./commands/GetBucketNotificationConfigurationCommand");
const GetBucketOwnershipControlsCommand_1 = require("./commands/GetBucketOwnershipControlsCommand");
const GetBucketPolicyCommand_1 = require("./commands/GetBucketPolicyCommand");
const GetBucketPolicyStatusCommand_1 = require("./commands/GetBucketPolicyStatusCommand");
const GetBucketReplicationCommand_1 = require("./commands/GetBucketReplicationCommand");
const GetBucketRequestPaymentCommand_1 = require("./commands/GetBucketRequestPaymentCommand");
const GetBucketTaggingCommand_1 = require("./commands/GetBucketTaggingCommand");
const GetBucketVersioningCommand_1 = require("./commands/GetBucketVersioningCommand");
const GetBucketWebsiteCommand_1 = require("./commands/GetBucketWebsiteCommand");
const GetObjectAclCommand_1 = require("./commands/GetObjectAclCommand");
const GetObjectCommand_1 = require("./commands/GetObjectCommand");
const GetObjectLegalHoldCommand_1 = require("./commands/GetObjectLegalHoldCommand");
const GetObjectLockConfigurationCommand_1 = require("./commands/GetObjectLockConfigurationCommand");
const GetObjectRetentionCommand_1 = require("./commands/GetObjectRetentionCommand");
const GetObjectTaggingCommand_1 = require("./commands/GetObjectTaggingCommand");
const GetObjectTorrentCommand_1 = require("./commands/GetObjectTorrentCommand");
const GetPublicAccessBlockCommand_1 = require("./commands/GetPublicAccessBlockCommand");
const HeadBucketCommand_1 = require("./commands/HeadBucketCommand");
const HeadObjectCommand_1 = require("./commands/HeadObjectCommand");
const ListBucketAnalyticsConfigurationsCommand_1 = require("./commands/ListBucketAnalyticsConfigurationsCommand");
const ListBucketIntelligentTieringConfigurationsCommand_1 = require("./commands/ListBucketIntelligentTieringConfigurationsCommand");
const ListBucketInventoryConfigurationsCommand_1 = require("./commands/ListBucketInventoryConfigurationsCommand");
const ListBucketMetricsConfigurationsCommand_1 = require("./commands/ListBucketMetricsConfigurationsCommand");
const ListBucketsCommand_1 = require("./commands/ListBucketsCommand");
const ListMultipartUploadsCommand_1 = require("./commands/ListMultipartUploadsCommand");
const ListObjectVersionsCommand_1 = require("./commands/ListObjectVersionsCommand");
const ListObjectsCommand_1 = require("./commands/ListObjectsCommand");
const ListObjectsV2Command_1 = require("./commands/ListObjectsV2Command");
const ListPartsCommand_1 = require("./commands/ListPartsCommand");
const PutBucketAccelerateConfigurationCommand_1 = require("./commands/PutBucketAccelerateConfigurationCommand");
const PutBucketAclCommand_1 = require("./commands/PutBucketAclCommand");
const PutBucketAnalyticsConfigurationCommand_1 = require("./commands/PutBucketAnalyticsConfigurationCommand");
const PutBucketCorsCommand_1 = require("./commands/PutBucketCorsCommand");
const PutBucketEncryptionCommand_1 = require("./commands/PutBucketEncryptionCommand");
const PutBucketIntelligentTieringConfigurationCommand_1 = require("./commands/PutBucketIntelligentTieringConfigurationCommand");
const PutBucketInventoryConfigurationCommand_1 = require("./commands/PutBucketInventoryConfigurationCommand");
const PutBucketLifecycleConfigurationCommand_1 = require("./commands/PutBucketLifecycleConfigurationCommand");
const PutBucketLoggingCommand_1 = require("./commands/PutBucketLoggingCommand");
const PutBucketMetricsConfigurationCommand_1 = require("./commands/PutBucketMetricsConfigurationCommand");
const PutBucketNotificationConfigurationCommand_1 = require("./commands/PutBucketNotificationConfigurationCommand");
const PutBucketOwnershipControlsCommand_1 = require("./commands/PutBucketOwnershipControlsCommand");
const PutBucketPolicyCommand_1 = require("./commands/PutBucketPolicyCommand");
const PutBucketReplicationCommand_1 = require("./commands/PutBucketReplicationCommand");
const PutBucketRequestPaymentCommand_1 = require("./commands/PutBucketRequestPaymentCommand");
const PutBucketTaggingCommand_1 = require("./commands/PutBucketTaggingCommand");
const PutBucketVersioningCommand_1 = require("./commands/PutBucketVersioningCommand");
const PutBucketWebsiteCommand_1 = require("./commands/PutBucketWebsiteCommand");
const PutObjectAclCommand_1 = require("./commands/PutObjectAclCommand");
const PutObjectCommand_1 = require("./commands/PutObjectCommand");
const PutObjectLegalHoldCommand_1 = require("./commands/PutObjectLegalHoldCommand");
const PutObjectLockConfigurationCommand_1 = require("./commands/PutObjectLockConfigurationCommand");
const PutObjectRetentionCommand_1 = require("./commands/PutObjectRetentionCommand");
const PutObjectTaggingCommand_1 = require("./commands/PutObjectTaggingCommand");
const PutPublicAccessBlockCommand_1 = require("./commands/PutPublicAccessBlockCommand");
const RestoreObjectCommand_1 = require("./commands/RestoreObjectCommand");
const SelectObjectContentCommand_1 = require("./commands/SelectObjectContentCommand");
const UploadPartCommand_1 = require("./commands/UploadPartCommand");
const UploadPartCopyCommand_1 = require("./commands/UploadPartCopyCommand");
/**
 * <p></p>
 */
class S3 extends S3Client_1.S3Client {
    abortMultipartUpload(args, optionsOrCb, cb) {
        const command = new AbortMultipartUploadCommand_1.AbortMultipartUploadCommand(args);
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
    completeMultipartUpload(args, optionsOrCb, cb) {
        const command = new CompleteMultipartUploadCommand_1.CompleteMultipartUploadCommand(args);
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
    copyObject(args, optionsOrCb, cb) {
        const command = new CopyObjectCommand_1.CopyObjectCommand(args);
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
    createBucket(args, optionsOrCb, cb) {
        const command = new CreateBucketCommand_1.CreateBucketCommand(args);
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
    createMultipartUpload(args, optionsOrCb, cb) {
        const command = new CreateMultipartUploadCommand_1.CreateMultipartUploadCommand(args);
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
    deleteBucket(args, optionsOrCb, cb) {
        const command = new DeleteBucketCommand_1.DeleteBucketCommand(args);
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
    deleteBucketAnalyticsConfiguration(args, optionsOrCb, cb) {
        const command = new DeleteBucketAnalyticsConfigurationCommand_1.DeleteBucketAnalyticsConfigurationCommand(args);
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
    deleteBucketCors(args, optionsOrCb, cb) {
        const command = new DeleteBucketCorsCommand_1.DeleteBucketCorsCommand(args);
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
    deleteBucketEncryption(args, optionsOrCb, cb) {
        const command = new DeleteBucketEncryptionCommand_1.DeleteBucketEncryptionCommand(args);
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
    deleteBucketIntelligentTieringConfiguration(args, optionsOrCb, cb) {
        const command = new DeleteBucketIntelligentTieringConfigurationCommand_1.DeleteBucketIntelligentTieringConfigurationCommand(args);
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
    deleteBucketInventoryConfiguration(args, optionsOrCb, cb) {
        const command = new DeleteBucketInventoryConfigurationCommand_1.DeleteBucketInventoryConfigurationCommand(args);
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
    deleteBucketLifecycle(args, optionsOrCb, cb) {
        const command = new DeleteBucketLifecycleCommand_1.DeleteBucketLifecycleCommand(args);
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
    deleteBucketMetricsConfiguration(args, optionsOrCb, cb) {
        const command = new DeleteBucketMetricsConfigurationCommand_1.DeleteBucketMetricsConfigurationCommand(args);
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
    deleteBucketOwnershipControls(args, optionsOrCb, cb) {
        const command = new DeleteBucketOwnershipControlsCommand_1.DeleteBucketOwnershipControlsCommand(args);
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
    deleteBucketPolicy(args, optionsOrCb, cb) {
        const command = new DeleteBucketPolicyCommand_1.DeleteBucketPolicyCommand(args);
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
    deleteBucketReplication(args, optionsOrCb, cb) {
        const command = new DeleteBucketReplicationCommand_1.DeleteBucketReplicationCommand(args);
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
    deleteBucketTagging(args, optionsOrCb, cb) {
        const command = new DeleteBucketTaggingCommand_1.DeleteBucketTaggingCommand(args);
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
    deleteBucketWebsite(args, optionsOrCb, cb) {
        const command = new DeleteBucketWebsiteCommand_1.DeleteBucketWebsiteCommand(args);
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
    deleteObject(args, optionsOrCb, cb) {
        const command = new DeleteObjectCommand_1.DeleteObjectCommand(args);
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
    deleteObjects(args, optionsOrCb, cb) {
        const command = new DeleteObjectsCommand_1.DeleteObjectsCommand(args);
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
    deleteObjectTagging(args, optionsOrCb, cb) {
        const command = new DeleteObjectTaggingCommand_1.DeleteObjectTaggingCommand(args);
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
    deletePublicAccessBlock(args, optionsOrCb, cb) {
        const command = new DeletePublicAccessBlockCommand_1.DeletePublicAccessBlockCommand(args);
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
    getBucketAccelerateConfiguration(args, optionsOrCb, cb) {
        const command = new GetBucketAccelerateConfigurationCommand_1.GetBucketAccelerateConfigurationCommand(args);
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
    getBucketAcl(args, optionsOrCb, cb) {
        const command = new GetBucketAclCommand_1.GetBucketAclCommand(args);
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
    getBucketAnalyticsConfiguration(args, optionsOrCb, cb) {
        const command = new GetBucketAnalyticsConfigurationCommand_1.GetBucketAnalyticsConfigurationCommand(args);
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
    getBucketCors(args, optionsOrCb, cb) {
        const command = new GetBucketCorsCommand_1.GetBucketCorsCommand(args);
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
    getBucketEncryption(args, optionsOrCb, cb) {
        const command = new GetBucketEncryptionCommand_1.GetBucketEncryptionCommand(args);
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
    getBucketIntelligentTieringConfiguration(args, optionsOrCb, cb) {
        const command = new GetBucketIntelligentTieringConfigurationCommand_1.GetBucketIntelligentTieringConfigurationCommand(args);
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
    getBucketInventoryConfiguration(args, optionsOrCb, cb) {
        const command = new GetBucketInventoryConfigurationCommand_1.GetBucketInventoryConfigurationCommand(args);
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
    getBucketLifecycleConfiguration(args, optionsOrCb, cb) {
        const command = new GetBucketLifecycleConfigurationCommand_1.GetBucketLifecycleConfigurationCommand(args);
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
    getBucketLocation(args, optionsOrCb, cb) {
        const command = new GetBucketLocationCommand_1.GetBucketLocationCommand(args);
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
    getBucketLogging(args, optionsOrCb, cb) {
        const command = new GetBucketLoggingCommand_1.GetBucketLoggingCommand(args);
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
    getBucketMetricsConfiguration(args, optionsOrCb, cb) {
        const command = new GetBucketMetricsConfigurationCommand_1.GetBucketMetricsConfigurationCommand(args);
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
    getBucketNotificationConfiguration(args, optionsOrCb, cb) {
        const command = new GetBucketNotificationConfigurationCommand_1.GetBucketNotificationConfigurationCommand(args);
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
    getBucketOwnershipControls(args, optionsOrCb, cb) {
        const command = new GetBucketOwnershipControlsCommand_1.GetBucketOwnershipControlsCommand(args);
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
    getBucketPolicy(args, optionsOrCb, cb) {
        const command = new GetBucketPolicyCommand_1.GetBucketPolicyCommand(args);
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
    getBucketPolicyStatus(args, optionsOrCb, cb) {
        const command = new GetBucketPolicyStatusCommand_1.GetBucketPolicyStatusCommand(args);
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
    getBucketReplication(args, optionsOrCb, cb) {
        const command = new GetBucketReplicationCommand_1.GetBucketReplicationCommand(args);
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
    getBucketRequestPayment(args, optionsOrCb, cb) {
        const command = new GetBucketRequestPaymentCommand_1.GetBucketRequestPaymentCommand(args);
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
    getBucketTagging(args, optionsOrCb, cb) {
        const command = new GetBucketTaggingCommand_1.GetBucketTaggingCommand(args);
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
    getBucketVersioning(args, optionsOrCb, cb) {
        const command = new GetBucketVersioningCommand_1.GetBucketVersioningCommand(args);
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
    getBucketWebsite(args, optionsOrCb, cb) {
        const command = new GetBucketWebsiteCommand_1.GetBucketWebsiteCommand(args);
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
    getObject(args, optionsOrCb, cb) {
        const command = new GetObjectCommand_1.GetObjectCommand(args);
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
    getObjectAcl(args, optionsOrCb, cb) {
        const command = new GetObjectAclCommand_1.GetObjectAclCommand(args);
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
    getObjectLegalHold(args, optionsOrCb, cb) {
        const command = new GetObjectLegalHoldCommand_1.GetObjectLegalHoldCommand(args);
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
    getObjectLockConfiguration(args, optionsOrCb, cb) {
        const command = new GetObjectLockConfigurationCommand_1.GetObjectLockConfigurationCommand(args);
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
    getObjectRetention(args, optionsOrCb, cb) {
        const command = new GetObjectRetentionCommand_1.GetObjectRetentionCommand(args);
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
    getObjectTagging(args, optionsOrCb, cb) {
        const command = new GetObjectTaggingCommand_1.GetObjectTaggingCommand(args);
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
    getObjectTorrent(args, optionsOrCb, cb) {
        const command = new GetObjectTorrentCommand_1.GetObjectTorrentCommand(args);
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
    getPublicAccessBlock(args, optionsOrCb, cb) {
        const command = new GetPublicAccessBlockCommand_1.GetPublicAccessBlockCommand(args);
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
    headBucket(args, optionsOrCb, cb) {
        const command = new HeadBucketCommand_1.HeadBucketCommand(args);
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
    headObject(args, optionsOrCb, cb) {
        const command = new HeadObjectCommand_1.HeadObjectCommand(args);
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
    listBucketAnalyticsConfigurations(args, optionsOrCb, cb) {
        const command = new ListBucketAnalyticsConfigurationsCommand_1.ListBucketAnalyticsConfigurationsCommand(args);
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
    listBucketIntelligentTieringConfigurations(args, optionsOrCb, cb) {
        const command = new ListBucketIntelligentTieringConfigurationsCommand_1.ListBucketIntelligentTieringConfigurationsCommand(args);
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
    listBucketInventoryConfigurations(args, optionsOrCb, cb) {
        const command = new ListBucketInventoryConfigurationsCommand_1.ListBucketInventoryConfigurationsCommand(args);
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
    listBucketMetricsConfigurations(args, optionsOrCb, cb) {
        const command = new ListBucketMetricsConfigurationsCommand_1.ListBucketMetricsConfigurationsCommand(args);
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
    listBuckets(args, optionsOrCb, cb) {
        const command = new ListBucketsCommand_1.ListBucketsCommand(args);
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
    listMultipartUploads(args, optionsOrCb, cb) {
        const command = new ListMultipartUploadsCommand_1.ListMultipartUploadsCommand(args);
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
    listObjects(args, optionsOrCb, cb) {
        const command = new ListObjectsCommand_1.ListObjectsCommand(args);
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
    listObjectsV2(args, optionsOrCb, cb) {
        const command = new ListObjectsV2Command_1.ListObjectsV2Command(args);
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
    listObjectVersions(args, optionsOrCb, cb) {
        const command = new ListObjectVersionsCommand_1.ListObjectVersionsCommand(args);
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
    listParts(args, optionsOrCb, cb) {
        const command = new ListPartsCommand_1.ListPartsCommand(args);
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
    putBucketAccelerateConfiguration(args, optionsOrCb, cb) {
        const command = new PutBucketAccelerateConfigurationCommand_1.PutBucketAccelerateConfigurationCommand(args);
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
    putBucketAcl(args, optionsOrCb, cb) {
        const command = new PutBucketAclCommand_1.PutBucketAclCommand(args);
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
    putBucketAnalyticsConfiguration(args, optionsOrCb, cb) {
        const command = new PutBucketAnalyticsConfigurationCommand_1.PutBucketAnalyticsConfigurationCommand(args);
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
    putBucketCors(args, optionsOrCb, cb) {
        const command = new PutBucketCorsCommand_1.PutBucketCorsCommand(args);
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
    putBucketEncryption(args, optionsOrCb, cb) {
        const command = new PutBucketEncryptionCommand_1.PutBucketEncryptionCommand(args);
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
    putBucketIntelligentTieringConfiguration(args, optionsOrCb, cb) {
        const command = new PutBucketIntelligentTieringConfigurationCommand_1.PutBucketIntelligentTieringConfigurationCommand(args);
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
    putBucketInventoryConfiguration(args, optionsOrCb, cb) {
        const command = new PutBucketInventoryConfigurationCommand_1.PutBucketInventoryConfigurationCommand(args);
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
    putBucketLifecycleConfiguration(args, optionsOrCb, cb) {
        const command = new PutBucketLifecycleConfigurationCommand_1.PutBucketLifecycleConfigurationCommand(args);
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
    putBucketLogging(args, optionsOrCb, cb) {
        const command = new PutBucketLoggingCommand_1.PutBucketLoggingCommand(args);
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
    putBucketMetricsConfiguration(args, optionsOrCb, cb) {
        const command = new PutBucketMetricsConfigurationCommand_1.PutBucketMetricsConfigurationCommand(args);
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
    putBucketNotificationConfiguration(args, optionsOrCb, cb) {
        const command = new PutBucketNotificationConfigurationCommand_1.PutBucketNotificationConfigurationCommand(args);
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
    putBucketOwnershipControls(args, optionsOrCb, cb) {
        const command = new PutBucketOwnershipControlsCommand_1.PutBucketOwnershipControlsCommand(args);
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
    putBucketPolicy(args, optionsOrCb, cb) {
        const command = new PutBucketPolicyCommand_1.PutBucketPolicyCommand(args);
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
    putBucketReplication(args, optionsOrCb, cb) {
        const command = new PutBucketReplicationCommand_1.PutBucketReplicationCommand(args);
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
    putBucketRequestPayment(args, optionsOrCb, cb) {
        const command = new PutBucketRequestPaymentCommand_1.PutBucketRequestPaymentCommand(args);
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
    putBucketTagging(args, optionsOrCb, cb) {
        const command = new PutBucketTaggingCommand_1.PutBucketTaggingCommand(args);
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
    putBucketVersioning(args, optionsOrCb, cb) {
        const command = new PutBucketVersioningCommand_1.PutBucketVersioningCommand(args);
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
    putBucketWebsite(args, optionsOrCb, cb) {
        const command = new PutBucketWebsiteCommand_1.PutBucketWebsiteCommand(args);
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
    putObject(args, optionsOrCb, cb) {
        const command = new PutObjectCommand_1.PutObjectCommand(args);
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
    putObjectAcl(args, optionsOrCb, cb) {
        const command = new PutObjectAclCommand_1.PutObjectAclCommand(args);
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
    putObjectLegalHold(args, optionsOrCb, cb) {
        const command = new PutObjectLegalHoldCommand_1.PutObjectLegalHoldCommand(args);
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
    putObjectLockConfiguration(args, optionsOrCb, cb) {
        const command = new PutObjectLockConfigurationCommand_1.PutObjectLockConfigurationCommand(args);
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
    putObjectRetention(args, optionsOrCb, cb) {
        const command = new PutObjectRetentionCommand_1.PutObjectRetentionCommand(args);
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
    putObjectTagging(args, optionsOrCb, cb) {
        const command = new PutObjectTaggingCommand_1.PutObjectTaggingCommand(args);
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
    putPublicAccessBlock(args, optionsOrCb, cb) {
        const command = new PutPublicAccessBlockCommand_1.PutPublicAccessBlockCommand(args);
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
    restoreObject(args, optionsOrCb, cb) {
        const command = new RestoreObjectCommand_1.RestoreObjectCommand(args);
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
    selectObjectContent(args, optionsOrCb, cb) {
        const command = new SelectObjectContentCommand_1.SelectObjectContentCommand(args);
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
    uploadPart(args, optionsOrCb, cb) {
        const command = new UploadPartCommand_1.UploadPartCommand(args);
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
    uploadPartCopy(args, optionsOrCb, cb) {
        const command = new UploadPartCopyCommand_1.UploadPartCopyCommand(args);
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
exports.S3 = S3;
//# sourceMappingURL=S3.js.map