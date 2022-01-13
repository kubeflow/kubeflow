import { __extends } from "tslib";
import { S3Client } from "./S3Client";
import { AbortMultipartUploadCommand, } from "./commands/AbortMultipartUploadCommand";
import { CompleteMultipartUploadCommand, } from "./commands/CompleteMultipartUploadCommand";
import { CopyObjectCommand } from "./commands/CopyObjectCommand";
import { CreateBucketCommand, } from "./commands/CreateBucketCommand";
import { CreateMultipartUploadCommand, } from "./commands/CreateMultipartUploadCommand";
import { DeleteBucketAnalyticsConfigurationCommand, } from "./commands/DeleteBucketAnalyticsConfigurationCommand";
import { DeleteBucketCommand, } from "./commands/DeleteBucketCommand";
import { DeleteBucketCorsCommand, } from "./commands/DeleteBucketCorsCommand";
import { DeleteBucketEncryptionCommand, } from "./commands/DeleteBucketEncryptionCommand";
import { DeleteBucketIntelligentTieringConfigurationCommand, } from "./commands/DeleteBucketIntelligentTieringConfigurationCommand";
import { DeleteBucketInventoryConfigurationCommand, } from "./commands/DeleteBucketInventoryConfigurationCommand";
import { DeleteBucketLifecycleCommand, } from "./commands/DeleteBucketLifecycleCommand";
import { DeleteBucketMetricsConfigurationCommand, } from "./commands/DeleteBucketMetricsConfigurationCommand";
import { DeleteBucketOwnershipControlsCommand, } from "./commands/DeleteBucketOwnershipControlsCommand";
import { DeleteBucketPolicyCommand, } from "./commands/DeleteBucketPolicyCommand";
import { DeleteBucketReplicationCommand, } from "./commands/DeleteBucketReplicationCommand";
import { DeleteBucketTaggingCommand, } from "./commands/DeleteBucketTaggingCommand";
import { DeleteBucketWebsiteCommand, } from "./commands/DeleteBucketWebsiteCommand";
import { DeleteObjectCommand, } from "./commands/DeleteObjectCommand";
import { DeleteObjectTaggingCommand, } from "./commands/DeleteObjectTaggingCommand";
import { DeleteObjectsCommand, } from "./commands/DeleteObjectsCommand";
import { DeletePublicAccessBlockCommand, } from "./commands/DeletePublicAccessBlockCommand";
import { GetBucketAccelerateConfigurationCommand, } from "./commands/GetBucketAccelerateConfigurationCommand";
import { GetBucketAclCommand, } from "./commands/GetBucketAclCommand";
import { GetBucketAnalyticsConfigurationCommand, } from "./commands/GetBucketAnalyticsConfigurationCommand";
import { GetBucketCorsCommand, } from "./commands/GetBucketCorsCommand";
import { GetBucketEncryptionCommand, } from "./commands/GetBucketEncryptionCommand";
import { GetBucketIntelligentTieringConfigurationCommand, } from "./commands/GetBucketIntelligentTieringConfigurationCommand";
import { GetBucketInventoryConfigurationCommand, } from "./commands/GetBucketInventoryConfigurationCommand";
import { GetBucketLifecycleConfigurationCommand, } from "./commands/GetBucketLifecycleConfigurationCommand";
import { GetBucketLocationCommand, } from "./commands/GetBucketLocationCommand";
import { GetBucketLoggingCommand, } from "./commands/GetBucketLoggingCommand";
import { GetBucketMetricsConfigurationCommand, } from "./commands/GetBucketMetricsConfigurationCommand";
import { GetBucketNotificationConfigurationCommand, } from "./commands/GetBucketNotificationConfigurationCommand";
import { GetBucketOwnershipControlsCommand, } from "./commands/GetBucketOwnershipControlsCommand";
import { GetBucketPolicyCommand, } from "./commands/GetBucketPolicyCommand";
import { GetBucketPolicyStatusCommand, } from "./commands/GetBucketPolicyStatusCommand";
import { GetBucketReplicationCommand, } from "./commands/GetBucketReplicationCommand";
import { GetBucketRequestPaymentCommand, } from "./commands/GetBucketRequestPaymentCommand";
import { GetBucketTaggingCommand, } from "./commands/GetBucketTaggingCommand";
import { GetBucketVersioningCommand, } from "./commands/GetBucketVersioningCommand";
import { GetBucketWebsiteCommand, } from "./commands/GetBucketWebsiteCommand";
import { GetObjectAclCommand, } from "./commands/GetObjectAclCommand";
import { GetObjectCommand } from "./commands/GetObjectCommand";
import { GetObjectLegalHoldCommand, } from "./commands/GetObjectLegalHoldCommand";
import { GetObjectLockConfigurationCommand, } from "./commands/GetObjectLockConfigurationCommand";
import { GetObjectRetentionCommand, } from "./commands/GetObjectRetentionCommand";
import { GetObjectTaggingCommand, } from "./commands/GetObjectTaggingCommand";
import { GetObjectTorrentCommand, } from "./commands/GetObjectTorrentCommand";
import { GetPublicAccessBlockCommand, } from "./commands/GetPublicAccessBlockCommand";
import { HeadBucketCommand } from "./commands/HeadBucketCommand";
import { HeadObjectCommand } from "./commands/HeadObjectCommand";
import { ListBucketAnalyticsConfigurationsCommand, } from "./commands/ListBucketAnalyticsConfigurationsCommand";
import { ListBucketIntelligentTieringConfigurationsCommand, } from "./commands/ListBucketIntelligentTieringConfigurationsCommand";
import { ListBucketInventoryConfigurationsCommand, } from "./commands/ListBucketInventoryConfigurationsCommand";
import { ListBucketMetricsConfigurationsCommand, } from "./commands/ListBucketMetricsConfigurationsCommand";
import { ListBucketsCommand } from "./commands/ListBucketsCommand";
import { ListMultipartUploadsCommand, } from "./commands/ListMultipartUploadsCommand";
import { ListObjectVersionsCommand, } from "./commands/ListObjectVersionsCommand";
import { ListObjectsCommand } from "./commands/ListObjectsCommand";
import { ListObjectsV2Command, } from "./commands/ListObjectsV2Command";
import { ListPartsCommand } from "./commands/ListPartsCommand";
import { PutBucketAccelerateConfigurationCommand, } from "./commands/PutBucketAccelerateConfigurationCommand";
import { PutBucketAclCommand, } from "./commands/PutBucketAclCommand";
import { PutBucketAnalyticsConfigurationCommand, } from "./commands/PutBucketAnalyticsConfigurationCommand";
import { PutBucketCorsCommand, } from "./commands/PutBucketCorsCommand";
import { PutBucketEncryptionCommand, } from "./commands/PutBucketEncryptionCommand";
import { PutBucketIntelligentTieringConfigurationCommand, } from "./commands/PutBucketIntelligentTieringConfigurationCommand";
import { PutBucketInventoryConfigurationCommand, } from "./commands/PutBucketInventoryConfigurationCommand";
import { PutBucketLifecycleConfigurationCommand, } from "./commands/PutBucketLifecycleConfigurationCommand";
import { PutBucketLoggingCommand, } from "./commands/PutBucketLoggingCommand";
import { PutBucketMetricsConfigurationCommand, } from "./commands/PutBucketMetricsConfigurationCommand";
import { PutBucketNotificationConfigurationCommand, } from "./commands/PutBucketNotificationConfigurationCommand";
import { PutBucketOwnershipControlsCommand, } from "./commands/PutBucketOwnershipControlsCommand";
import { PutBucketPolicyCommand, } from "./commands/PutBucketPolicyCommand";
import { PutBucketReplicationCommand, } from "./commands/PutBucketReplicationCommand";
import { PutBucketRequestPaymentCommand, } from "./commands/PutBucketRequestPaymentCommand";
import { PutBucketTaggingCommand, } from "./commands/PutBucketTaggingCommand";
import { PutBucketVersioningCommand, } from "./commands/PutBucketVersioningCommand";
import { PutBucketWebsiteCommand, } from "./commands/PutBucketWebsiteCommand";
import { PutObjectAclCommand, } from "./commands/PutObjectAclCommand";
import { PutObjectCommand } from "./commands/PutObjectCommand";
import { PutObjectLegalHoldCommand, } from "./commands/PutObjectLegalHoldCommand";
import { PutObjectLockConfigurationCommand, } from "./commands/PutObjectLockConfigurationCommand";
import { PutObjectRetentionCommand, } from "./commands/PutObjectRetentionCommand";
import { PutObjectTaggingCommand, } from "./commands/PutObjectTaggingCommand";
import { PutPublicAccessBlockCommand, } from "./commands/PutPublicAccessBlockCommand";
import { RestoreObjectCommand, } from "./commands/RestoreObjectCommand";
import { SelectObjectContentCommand, } from "./commands/SelectObjectContentCommand";
import { UploadPartCommand } from "./commands/UploadPartCommand";
import { UploadPartCopyCommand, } from "./commands/UploadPartCopyCommand";
/**
 * <p></p>
 */
var S3 = /** @class */ (function (_super) {
    __extends(S3, _super);
    function S3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    S3.prototype.abortMultipartUpload = function (args, optionsOrCb, cb) {
        var command = new AbortMultipartUploadCommand(args);
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
    S3.prototype.completeMultipartUpload = function (args, optionsOrCb, cb) {
        var command = new CompleteMultipartUploadCommand(args);
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
    S3.prototype.copyObject = function (args, optionsOrCb, cb) {
        var command = new CopyObjectCommand(args);
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
    S3.prototype.createBucket = function (args, optionsOrCb, cb) {
        var command = new CreateBucketCommand(args);
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
    S3.prototype.createMultipartUpload = function (args, optionsOrCb, cb) {
        var command = new CreateMultipartUploadCommand(args);
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
    S3.prototype.deleteBucket = function (args, optionsOrCb, cb) {
        var command = new DeleteBucketCommand(args);
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
    S3.prototype.deleteBucketAnalyticsConfiguration = function (args, optionsOrCb, cb) {
        var command = new DeleteBucketAnalyticsConfigurationCommand(args);
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
    S3.prototype.deleteBucketCors = function (args, optionsOrCb, cb) {
        var command = new DeleteBucketCorsCommand(args);
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
    S3.prototype.deleteBucketEncryption = function (args, optionsOrCb, cb) {
        var command = new DeleteBucketEncryptionCommand(args);
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
    S3.prototype.deleteBucketIntelligentTieringConfiguration = function (args, optionsOrCb, cb) {
        var command = new DeleteBucketIntelligentTieringConfigurationCommand(args);
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
    S3.prototype.deleteBucketInventoryConfiguration = function (args, optionsOrCb, cb) {
        var command = new DeleteBucketInventoryConfigurationCommand(args);
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
    S3.prototype.deleteBucketLifecycle = function (args, optionsOrCb, cb) {
        var command = new DeleteBucketLifecycleCommand(args);
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
    S3.prototype.deleteBucketMetricsConfiguration = function (args, optionsOrCb, cb) {
        var command = new DeleteBucketMetricsConfigurationCommand(args);
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
    S3.prototype.deleteBucketOwnershipControls = function (args, optionsOrCb, cb) {
        var command = new DeleteBucketOwnershipControlsCommand(args);
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
    S3.prototype.deleteBucketPolicy = function (args, optionsOrCb, cb) {
        var command = new DeleteBucketPolicyCommand(args);
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
    S3.prototype.deleteBucketReplication = function (args, optionsOrCb, cb) {
        var command = new DeleteBucketReplicationCommand(args);
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
    S3.prototype.deleteBucketTagging = function (args, optionsOrCb, cb) {
        var command = new DeleteBucketTaggingCommand(args);
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
    S3.prototype.deleteBucketWebsite = function (args, optionsOrCb, cb) {
        var command = new DeleteBucketWebsiteCommand(args);
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
    S3.prototype.deleteObject = function (args, optionsOrCb, cb) {
        var command = new DeleteObjectCommand(args);
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
    S3.prototype.deleteObjects = function (args, optionsOrCb, cb) {
        var command = new DeleteObjectsCommand(args);
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
    S3.prototype.deleteObjectTagging = function (args, optionsOrCb, cb) {
        var command = new DeleteObjectTaggingCommand(args);
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
    S3.prototype.deletePublicAccessBlock = function (args, optionsOrCb, cb) {
        var command = new DeletePublicAccessBlockCommand(args);
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
    S3.prototype.getBucketAccelerateConfiguration = function (args, optionsOrCb, cb) {
        var command = new GetBucketAccelerateConfigurationCommand(args);
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
    S3.prototype.getBucketAcl = function (args, optionsOrCb, cb) {
        var command = new GetBucketAclCommand(args);
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
    S3.prototype.getBucketAnalyticsConfiguration = function (args, optionsOrCb, cb) {
        var command = new GetBucketAnalyticsConfigurationCommand(args);
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
    S3.prototype.getBucketCors = function (args, optionsOrCb, cb) {
        var command = new GetBucketCorsCommand(args);
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
    S3.prototype.getBucketEncryption = function (args, optionsOrCb, cb) {
        var command = new GetBucketEncryptionCommand(args);
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
    S3.prototype.getBucketIntelligentTieringConfiguration = function (args, optionsOrCb, cb) {
        var command = new GetBucketIntelligentTieringConfigurationCommand(args);
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
    S3.prototype.getBucketInventoryConfiguration = function (args, optionsOrCb, cb) {
        var command = new GetBucketInventoryConfigurationCommand(args);
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
    S3.prototype.getBucketLifecycleConfiguration = function (args, optionsOrCb, cb) {
        var command = new GetBucketLifecycleConfigurationCommand(args);
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
    S3.prototype.getBucketLocation = function (args, optionsOrCb, cb) {
        var command = new GetBucketLocationCommand(args);
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
    S3.prototype.getBucketLogging = function (args, optionsOrCb, cb) {
        var command = new GetBucketLoggingCommand(args);
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
    S3.prototype.getBucketMetricsConfiguration = function (args, optionsOrCb, cb) {
        var command = new GetBucketMetricsConfigurationCommand(args);
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
    S3.prototype.getBucketNotificationConfiguration = function (args, optionsOrCb, cb) {
        var command = new GetBucketNotificationConfigurationCommand(args);
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
    S3.prototype.getBucketOwnershipControls = function (args, optionsOrCb, cb) {
        var command = new GetBucketOwnershipControlsCommand(args);
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
    S3.prototype.getBucketPolicy = function (args, optionsOrCb, cb) {
        var command = new GetBucketPolicyCommand(args);
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
    S3.prototype.getBucketPolicyStatus = function (args, optionsOrCb, cb) {
        var command = new GetBucketPolicyStatusCommand(args);
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
    S3.prototype.getBucketReplication = function (args, optionsOrCb, cb) {
        var command = new GetBucketReplicationCommand(args);
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
    S3.prototype.getBucketRequestPayment = function (args, optionsOrCb, cb) {
        var command = new GetBucketRequestPaymentCommand(args);
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
    S3.prototype.getBucketTagging = function (args, optionsOrCb, cb) {
        var command = new GetBucketTaggingCommand(args);
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
    S3.prototype.getBucketVersioning = function (args, optionsOrCb, cb) {
        var command = new GetBucketVersioningCommand(args);
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
    S3.prototype.getBucketWebsite = function (args, optionsOrCb, cb) {
        var command = new GetBucketWebsiteCommand(args);
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
    S3.prototype.getObject = function (args, optionsOrCb, cb) {
        var command = new GetObjectCommand(args);
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
    S3.prototype.getObjectAcl = function (args, optionsOrCb, cb) {
        var command = new GetObjectAclCommand(args);
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
    S3.prototype.getObjectLegalHold = function (args, optionsOrCb, cb) {
        var command = new GetObjectLegalHoldCommand(args);
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
    S3.prototype.getObjectLockConfiguration = function (args, optionsOrCb, cb) {
        var command = new GetObjectLockConfigurationCommand(args);
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
    S3.prototype.getObjectRetention = function (args, optionsOrCb, cb) {
        var command = new GetObjectRetentionCommand(args);
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
    S3.prototype.getObjectTagging = function (args, optionsOrCb, cb) {
        var command = new GetObjectTaggingCommand(args);
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
    S3.prototype.getObjectTorrent = function (args, optionsOrCb, cb) {
        var command = new GetObjectTorrentCommand(args);
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
    S3.prototype.getPublicAccessBlock = function (args, optionsOrCb, cb) {
        var command = new GetPublicAccessBlockCommand(args);
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
    S3.prototype.headBucket = function (args, optionsOrCb, cb) {
        var command = new HeadBucketCommand(args);
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
    S3.prototype.headObject = function (args, optionsOrCb, cb) {
        var command = new HeadObjectCommand(args);
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
    S3.prototype.listBucketAnalyticsConfigurations = function (args, optionsOrCb, cb) {
        var command = new ListBucketAnalyticsConfigurationsCommand(args);
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
    S3.prototype.listBucketIntelligentTieringConfigurations = function (args, optionsOrCb, cb) {
        var command = new ListBucketIntelligentTieringConfigurationsCommand(args);
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
    S3.prototype.listBucketInventoryConfigurations = function (args, optionsOrCb, cb) {
        var command = new ListBucketInventoryConfigurationsCommand(args);
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
    S3.prototype.listBucketMetricsConfigurations = function (args, optionsOrCb, cb) {
        var command = new ListBucketMetricsConfigurationsCommand(args);
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
    S3.prototype.listBuckets = function (args, optionsOrCb, cb) {
        var command = new ListBucketsCommand(args);
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
    S3.prototype.listMultipartUploads = function (args, optionsOrCb, cb) {
        var command = new ListMultipartUploadsCommand(args);
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
    S3.prototype.listObjects = function (args, optionsOrCb, cb) {
        var command = new ListObjectsCommand(args);
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
    S3.prototype.listObjectsV2 = function (args, optionsOrCb, cb) {
        var command = new ListObjectsV2Command(args);
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
    S3.prototype.listObjectVersions = function (args, optionsOrCb, cb) {
        var command = new ListObjectVersionsCommand(args);
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
    S3.prototype.listParts = function (args, optionsOrCb, cb) {
        var command = new ListPartsCommand(args);
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
    S3.prototype.putBucketAccelerateConfiguration = function (args, optionsOrCb, cb) {
        var command = new PutBucketAccelerateConfigurationCommand(args);
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
    S3.prototype.putBucketAcl = function (args, optionsOrCb, cb) {
        var command = new PutBucketAclCommand(args);
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
    S3.prototype.putBucketAnalyticsConfiguration = function (args, optionsOrCb, cb) {
        var command = new PutBucketAnalyticsConfigurationCommand(args);
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
    S3.prototype.putBucketCors = function (args, optionsOrCb, cb) {
        var command = new PutBucketCorsCommand(args);
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
    S3.prototype.putBucketEncryption = function (args, optionsOrCb, cb) {
        var command = new PutBucketEncryptionCommand(args);
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
    S3.prototype.putBucketIntelligentTieringConfiguration = function (args, optionsOrCb, cb) {
        var command = new PutBucketIntelligentTieringConfigurationCommand(args);
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
    S3.prototype.putBucketInventoryConfiguration = function (args, optionsOrCb, cb) {
        var command = new PutBucketInventoryConfigurationCommand(args);
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
    S3.prototype.putBucketLifecycleConfiguration = function (args, optionsOrCb, cb) {
        var command = new PutBucketLifecycleConfigurationCommand(args);
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
    S3.prototype.putBucketLogging = function (args, optionsOrCb, cb) {
        var command = new PutBucketLoggingCommand(args);
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
    S3.prototype.putBucketMetricsConfiguration = function (args, optionsOrCb, cb) {
        var command = new PutBucketMetricsConfigurationCommand(args);
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
    S3.prototype.putBucketNotificationConfiguration = function (args, optionsOrCb, cb) {
        var command = new PutBucketNotificationConfigurationCommand(args);
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
    S3.prototype.putBucketOwnershipControls = function (args, optionsOrCb, cb) {
        var command = new PutBucketOwnershipControlsCommand(args);
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
    S3.prototype.putBucketPolicy = function (args, optionsOrCb, cb) {
        var command = new PutBucketPolicyCommand(args);
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
    S3.prototype.putBucketReplication = function (args, optionsOrCb, cb) {
        var command = new PutBucketReplicationCommand(args);
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
    S3.prototype.putBucketRequestPayment = function (args, optionsOrCb, cb) {
        var command = new PutBucketRequestPaymentCommand(args);
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
    S3.prototype.putBucketTagging = function (args, optionsOrCb, cb) {
        var command = new PutBucketTaggingCommand(args);
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
    S3.prototype.putBucketVersioning = function (args, optionsOrCb, cb) {
        var command = new PutBucketVersioningCommand(args);
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
    S3.prototype.putBucketWebsite = function (args, optionsOrCb, cb) {
        var command = new PutBucketWebsiteCommand(args);
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
    S3.prototype.putObject = function (args, optionsOrCb, cb) {
        var command = new PutObjectCommand(args);
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
    S3.prototype.putObjectAcl = function (args, optionsOrCb, cb) {
        var command = new PutObjectAclCommand(args);
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
    S3.prototype.putObjectLegalHold = function (args, optionsOrCb, cb) {
        var command = new PutObjectLegalHoldCommand(args);
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
    S3.prototype.putObjectLockConfiguration = function (args, optionsOrCb, cb) {
        var command = new PutObjectLockConfigurationCommand(args);
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
    S3.prototype.putObjectRetention = function (args, optionsOrCb, cb) {
        var command = new PutObjectRetentionCommand(args);
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
    S3.prototype.putObjectTagging = function (args, optionsOrCb, cb) {
        var command = new PutObjectTaggingCommand(args);
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
    S3.prototype.putPublicAccessBlock = function (args, optionsOrCb, cb) {
        var command = new PutPublicAccessBlockCommand(args);
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
    S3.prototype.restoreObject = function (args, optionsOrCb, cb) {
        var command = new RestoreObjectCommand(args);
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
    S3.prototype.selectObjectContent = function (args, optionsOrCb, cb) {
        var command = new SelectObjectContentCommand(args);
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
    S3.prototype.uploadPart = function (args, optionsOrCb, cb) {
        var command = new UploadPartCommand(args);
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
    S3.prototype.uploadPartCopy = function (args, optionsOrCb, cb) {
        var command = new UploadPartCopyCommand(args);
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
    return S3;
}(S3Client));
export { S3 };
//# sourceMappingURL=S3.js.map