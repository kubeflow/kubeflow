"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBucketAccelerateConfigurationOutput = exports.DeletePublicAccessBlockRequest = exports.DeleteObjectTaggingRequest = exports.DeleteObjectTaggingOutput = exports.DeleteObjectsRequest = exports.Delete = exports.ObjectIdentifier = exports.DeleteObjectsOutput = exports._Error = exports.DeletedObject = exports.DeleteObjectRequest = exports.DeleteObjectOutput = exports.DeleteBucketWebsiteRequest = exports.DeleteBucketTaggingRequest = exports.DeleteBucketReplicationRequest = exports.DeleteBucketPolicyRequest = exports.DeleteBucketOwnershipControlsRequest = exports.DeleteBucketMetricsConfigurationRequest = exports.DeleteBucketLifecycleRequest = exports.DeleteBucketInventoryConfigurationRequest = exports.DeleteBucketIntelligentTieringConfigurationRequest = exports.DeleteBucketEncryptionRequest = exports.DeleteBucketCorsRequest = exports.DeleteBucketAnalyticsConfigurationRequest = exports.DeleteBucketRequest = exports.CreateMultipartUploadRequest = exports.CreateMultipartUploadOutput = exports.CreateBucketRequest = exports.CreateBucketConfiguration = exports.CreateBucketOutput = exports.BucketAlreadyOwnedByYou = exports.BucketAlreadyExists = exports.ObjectNotInActiveTierError = exports.CopyObjectRequest = exports.CopyObjectOutput = exports.CopyObjectResult = exports.CompleteMultipartUploadRequest = exports.CompletedMultipartUpload = exports.CompletedPart = exports.CompleteMultipartUploadOutput = exports.AccessControlTranslation = exports.AccessControlPolicy = exports.Owner = exports.Grant = exports.Grantee = exports.AccelerateConfiguration = exports.NoSuchUpload = exports.AbortMultipartUploadRequest = exports.AbortMultipartUploadOutput = exports.AbortIncompleteMultipartUpload = void 0;
exports.LoggingEnabled = exports.TargetGrant = exports.GetBucketLocationRequest = exports.GetBucketLocationOutput = exports.GetBucketLifecycleConfigurationRequest = exports.GetBucketLifecycleConfigurationOutput = exports.LifecycleRule = exports.Transition = exports.NoncurrentVersionTransition = exports.NoncurrentVersionExpiration = exports.LifecycleRuleFilter = exports.LifecycleRuleAndOperator = exports.LifecycleExpiration = exports.GetBucketInventoryConfigurationRequest = exports.GetBucketInventoryConfigurationOutput = exports.InventoryConfiguration = exports.InventorySchedule = exports.InventoryFilter = exports.InventoryDestination = exports.InventoryS3BucketDestination = exports.InventoryEncryption = exports.SSES3 = exports.SSEKMS = exports.GetBucketIntelligentTieringConfigurationRequest = exports.GetBucketIntelligentTieringConfigurationOutput = exports.IntelligentTieringConfiguration = exports.Tiering = exports.IntelligentTieringFilter = exports.IntelligentTieringAndOperator = exports.GetBucketEncryptionRequest = exports.GetBucketEncryptionOutput = exports.ServerSideEncryptionConfiguration = exports.ServerSideEncryptionRule = exports.ServerSideEncryptionByDefault = exports.GetBucketCorsRequest = exports.GetBucketCorsOutput = exports.CORSRule = exports.GetBucketAnalyticsConfigurationRequest = exports.GetBucketAnalyticsConfigurationOutput = exports.AnalyticsConfiguration = exports.StorageClassAnalysis = exports.StorageClassAnalysisDataExport = exports.AnalyticsExportDestination = exports.AnalyticsS3BucketDestination = exports.AnalyticsFilter = exports.AnalyticsAndOperator = exports.Tag = exports.GetBucketAclRequest = exports.GetBucketAclOutput = exports.GetBucketAccelerateConfigurationRequest = void 0;
exports.Condition = exports.RedirectAllRequestsTo = exports.IndexDocument = exports.ErrorDocument = exports.GetBucketVersioningRequest = exports.GetBucketVersioningOutput = exports.GetBucketTaggingRequest = exports.GetBucketTaggingOutput = exports.GetBucketRequestPaymentRequest = exports.GetBucketRequestPaymentOutput = exports.GetBucketReplicationRequest = exports.GetBucketReplicationOutput = exports.ReplicationConfiguration = exports.ReplicationRule = exports.SourceSelectionCriteria = exports.SseKmsEncryptedObjects = exports.ReplicaModifications = exports.ReplicationRuleFilter = exports.ReplicationRuleAndOperator = exports.ExistingObjectReplication = exports.Destination = exports.ReplicationTime = exports.Metrics = exports.ReplicationTimeValue = exports.EncryptionConfiguration = exports.DeleteMarkerReplication = exports.GetBucketPolicyStatusRequest = exports.GetBucketPolicyStatusOutput = exports.PolicyStatus = exports.GetBucketPolicyRequest = exports.GetBucketPolicyOutput = exports.GetBucketOwnershipControlsRequest = exports.GetBucketOwnershipControlsOutput = exports.OwnershipControls = exports.OwnershipControlsRule = exports.NotificationConfiguration = exports.TopicConfiguration = exports.QueueConfiguration = exports.LambdaFunctionConfiguration = exports.NotificationConfigurationFilter = exports.S3KeyFilter = exports.FilterRule = exports.GetBucketNotificationConfigurationRequest = exports.GetBucketMetricsConfigurationRequest = exports.GetBucketMetricsConfigurationOutput = exports.MetricsConfiguration = exports.MetricsFilter = exports.MetricsAndOperator = exports.GetBucketLoggingRequest = exports.GetBucketLoggingOutput = void 0;
exports.ListObjectsRequest = exports.ListObjectsOutput = exports._Object = exports.ListMultipartUploadsRequest = exports.ListMultipartUploadsOutput = exports.MultipartUpload = exports.Initiator = exports.CommonPrefix = exports.ListBucketsOutput = exports.Bucket = exports.ListBucketMetricsConfigurationsRequest = exports.ListBucketMetricsConfigurationsOutput = exports.ListBucketInventoryConfigurationsRequest = exports.ListBucketInventoryConfigurationsOutput = exports.ListBucketIntelligentTieringConfigurationsRequest = exports.ListBucketIntelligentTieringConfigurationsOutput = exports.ListBucketAnalyticsConfigurationsRequest = exports.ListBucketAnalyticsConfigurationsOutput = exports.HeadObjectRequest = exports.HeadObjectOutput = exports.NoSuchBucket = exports.HeadBucketRequest = exports.GetPublicAccessBlockRequest = exports.GetPublicAccessBlockOutput = exports.PublicAccessBlockConfiguration = exports.GetObjectTorrentRequest = exports.GetObjectTorrentOutput = exports.GetObjectTaggingRequest = exports.GetObjectTaggingOutput = exports.GetObjectRetentionRequest = exports.GetObjectRetentionOutput = exports.ObjectLockRetention = exports.GetObjectLockConfigurationRequest = exports.GetObjectLockConfigurationOutput = exports.ObjectLockConfiguration = exports.ObjectLockRule = exports.DefaultRetention = exports.GetObjectLegalHoldRequest = exports.GetObjectLegalHoldOutput = exports.ObjectLockLegalHold = exports.GetObjectAclRequest = exports.GetObjectAclOutput = exports.NoSuchKey = exports.InvalidObjectState = exports.GetObjectRequest = exports.GetObjectOutput = exports.GetBucketWebsiteRequest = exports.GetBucketWebsiteOutput = exports.RoutingRule = exports.Redirect = void 0;
exports.GlacierJobParameters = exports.RestoreObjectOutput = exports.ObjectAlreadyInActiveTierError = exports.PutPublicAccessBlockRequest = exports.PutObjectTaggingRequest = exports.PutObjectTaggingOutput = exports.PutObjectRetentionRequest = exports.PutObjectRetentionOutput = exports.PutObjectLockConfigurationRequest = exports.PutObjectLockConfigurationOutput = exports.PutObjectLegalHoldRequest = exports.PutObjectLegalHoldOutput = exports.PutObjectAclRequest = exports.PutObjectAclOutput = exports.PutObjectRequest = exports.PutObjectOutput = exports.PutBucketWebsiteRequest = exports.WebsiteConfiguration = exports.PutBucketVersioningRequest = exports.VersioningConfiguration = exports.PutBucketTaggingRequest = exports.Tagging = exports.PutBucketRequestPaymentRequest = exports.RequestPaymentConfiguration = exports.PutBucketReplicationRequest = exports.PutBucketPolicyRequest = exports.PutBucketOwnershipControlsRequest = exports.PutBucketNotificationConfigurationRequest = exports.PutBucketMetricsConfigurationRequest = exports.PutBucketLoggingRequest = exports.BucketLoggingStatus = exports.PutBucketLifecycleConfigurationRequest = exports.BucketLifecycleConfiguration = exports.PutBucketInventoryConfigurationRequest = exports.PutBucketIntelligentTieringConfigurationRequest = exports.PutBucketEncryptionRequest = exports.PutBucketCorsRequest = exports.CORSConfiguration = exports.PutBucketAnalyticsConfigurationRequest = exports.PutBucketAclRequest = exports.PutBucketAccelerateConfigurationRequest = exports.ListPartsRequest = exports.ListPartsOutput = exports.Part = exports.ListObjectVersionsRequest = exports.ListObjectVersionsOutput = exports.ObjectVersion = exports.DeleteMarkerEntry = exports.ListObjectsV2Request = exports.ListObjectsV2Output = void 0;
exports.Encryption = void 0;
const smithy_client_1 = require("@aws-sdk/smithy-client");
var AbortIncompleteMultipartUpload;
(function (AbortIncompleteMultipartUpload) {
    AbortIncompleteMultipartUpload.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AbortIncompleteMultipartUpload = exports.AbortIncompleteMultipartUpload || (exports.AbortIncompleteMultipartUpload = {}));
var AbortMultipartUploadOutput;
(function (AbortMultipartUploadOutput) {
    AbortMultipartUploadOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AbortMultipartUploadOutput = exports.AbortMultipartUploadOutput || (exports.AbortMultipartUploadOutput = {}));
var AbortMultipartUploadRequest;
(function (AbortMultipartUploadRequest) {
    AbortMultipartUploadRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AbortMultipartUploadRequest = exports.AbortMultipartUploadRequest || (exports.AbortMultipartUploadRequest = {}));
var NoSuchUpload;
(function (NoSuchUpload) {
    NoSuchUpload.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NoSuchUpload = exports.NoSuchUpload || (exports.NoSuchUpload = {}));
var AccelerateConfiguration;
(function (AccelerateConfiguration) {
    AccelerateConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AccelerateConfiguration = exports.AccelerateConfiguration || (exports.AccelerateConfiguration = {}));
var Grantee;
(function (Grantee) {
    Grantee.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Grantee = exports.Grantee || (exports.Grantee = {}));
var Grant;
(function (Grant) {
    Grant.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Grant = exports.Grant || (exports.Grant = {}));
var Owner;
(function (Owner) {
    Owner.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Owner = exports.Owner || (exports.Owner = {}));
var AccessControlPolicy;
(function (AccessControlPolicy) {
    AccessControlPolicy.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AccessControlPolicy = exports.AccessControlPolicy || (exports.AccessControlPolicy = {}));
var AccessControlTranslation;
(function (AccessControlTranslation) {
    AccessControlTranslation.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AccessControlTranslation = exports.AccessControlTranslation || (exports.AccessControlTranslation = {}));
var CompleteMultipartUploadOutput;
(function (CompleteMultipartUploadOutput) {
    CompleteMultipartUploadOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSEKMSKeyId && { SSEKMSKeyId: smithy_client_1.SENSITIVE_STRING }),
    });
})(CompleteMultipartUploadOutput = exports.CompleteMultipartUploadOutput || (exports.CompleteMultipartUploadOutput = {}));
var CompletedPart;
(function (CompletedPart) {
    CompletedPart.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CompletedPart = exports.CompletedPart || (exports.CompletedPart = {}));
var CompletedMultipartUpload;
(function (CompletedMultipartUpload) {
    CompletedMultipartUpload.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CompletedMultipartUpload = exports.CompletedMultipartUpload || (exports.CompletedMultipartUpload = {}));
var CompleteMultipartUploadRequest;
(function (CompleteMultipartUploadRequest) {
    CompleteMultipartUploadRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CompleteMultipartUploadRequest = exports.CompleteMultipartUploadRequest || (exports.CompleteMultipartUploadRequest = {}));
var CopyObjectResult;
(function (CopyObjectResult) {
    CopyObjectResult.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CopyObjectResult = exports.CopyObjectResult || (exports.CopyObjectResult = {}));
var CopyObjectOutput;
(function (CopyObjectOutput) {
    CopyObjectOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSEKMSKeyId && { SSEKMSKeyId: smithy_client_1.SENSITIVE_STRING }),
        ...(obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: smithy_client_1.SENSITIVE_STRING }),
    });
})(CopyObjectOutput = exports.CopyObjectOutput || (exports.CopyObjectOutput = {}));
var CopyObjectRequest;
(function (CopyObjectRequest) {
    CopyObjectRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSECustomerKey && { SSECustomerKey: smithy_client_1.SENSITIVE_STRING }),
        ...(obj.SSEKMSKeyId && { SSEKMSKeyId: smithy_client_1.SENSITIVE_STRING }),
        ...(obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: smithy_client_1.SENSITIVE_STRING }),
        ...(obj.CopySourceSSECustomerKey && { CopySourceSSECustomerKey: smithy_client_1.SENSITIVE_STRING }),
    });
})(CopyObjectRequest = exports.CopyObjectRequest || (exports.CopyObjectRequest = {}));
var ObjectNotInActiveTierError;
(function (ObjectNotInActiveTierError) {
    ObjectNotInActiveTierError.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ObjectNotInActiveTierError = exports.ObjectNotInActiveTierError || (exports.ObjectNotInActiveTierError = {}));
var BucketAlreadyExists;
(function (BucketAlreadyExists) {
    BucketAlreadyExists.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BucketAlreadyExists = exports.BucketAlreadyExists || (exports.BucketAlreadyExists = {}));
var BucketAlreadyOwnedByYou;
(function (BucketAlreadyOwnedByYou) {
    BucketAlreadyOwnedByYou.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BucketAlreadyOwnedByYou = exports.BucketAlreadyOwnedByYou || (exports.BucketAlreadyOwnedByYou = {}));
var CreateBucketOutput;
(function (CreateBucketOutput) {
    CreateBucketOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateBucketOutput = exports.CreateBucketOutput || (exports.CreateBucketOutput = {}));
var CreateBucketConfiguration;
(function (CreateBucketConfiguration) {
    CreateBucketConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateBucketConfiguration = exports.CreateBucketConfiguration || (exports.CreateBucketConfiguration = {}));
var CreateBucketRequest;
(function (CreateBucketRequest) {
    CreateBucketRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateBucketRequest = exports.CreateBucketRequest || (exports.CreateBucketRequest = {}));
var CreateMultipartUploadOutput;
(function (CreateMultipartUploadOutput) {
    CreateMultipartUploadOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSEKMSKeyId && { SSEKMSKeyId: smithy_client_1.SENSITIVE_STRING }),
        ...(obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: smithy_client_1.SENSITIVE_STRING }),
    });
})(CreateMultipartUploadOutput = exports.CreateMultipartUploadOutput || (exports.CreateMultipartUploadOutput = {}));
var CreateMultipartUploadRequest;
(function (CreateMultipartUploadRequest) {
    CreateMultipartUploadRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSECustomerKey && { SSECustomerKey: smithy_client_1.SENSITIVE_STRING }),
        ...(obj.SSEKMSKeyId && { SSEKMSKeyId: smithy_client_1.SENSITIVE_STRING }),
        ...(obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: smithy_client_1.SENSITIVE_STRING }),
    });
})(CreateMultipartUploadRequest = exports.CreateMultipartUploadRequest || (exports.CreateMultipartUploadRequest = {}));
var DeleteBucketRequest;
(function (DeleteBucketRequest) {
    DeleteBucketRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketRequest = exports.DeleteBucketRequest || (exports.DeleteBucketRequest = {}));
var DeleteBucketAnalyticsConfigurationRequest;
(function (DeleteBucketAnalyticsConfigurationRequest) {
    DeleteBucketAnalyticsConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketAnalyticsConfigurationRequest = exports.DeleteBucketAnalyticsConfigurationRequest || (exports.DeleteBucketAnalyticsConfigurationRequest = {}));
var DeleteBucketCorsRequest;
(function (DeleteBucketCorsRequest) {
    DeleteBucketCorsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketCorsRequest = exports.DeleteBucketCorsRequest || (exports.DeleteBucketCorsRequest = {}));
var DeleteBucketEncryptionRequest;
(function (DeleteBucketEncryptionRequest) {
    DeleteBucketEncryptionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketEncryptionRequest = exports.DeleteBucketEncryptionRequest || (exports.DeleteBucketEncryptionRequest = {}));
var DeleteBucketIntelligentTieringConfigurationRequest;
(function (DeleteBucketIntelligentTieringConfigurationRequest) {
    DeleteBucketIntelligentTieringConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketIntelligentTieringConfigurationRequest = exports.DeleteBucketIntelligentTieringConfigurationRequest || (exports.DeleteBucketIntelligentTieringConfigurationRequest = {}));
var DeleteBucketInventoryConfigurationRequest;
(function (DeleteBucketInventoryConfigurationRequest) {
    DeleteBucketInventoryConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketInventoryConfigurationRequest = exports.DeleteBucketInventoryConfigurationRequest || (exports.DeleteBucketInventoryConfigurationRequest = {}));
var DeleteBucketLifecycleRequest;
(function (DeleteBucketLifecycleRequest) {
    DeleteBucketLifecycleRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketLifecycleRequest = exports.DeleteBucketLifecycleRequest || (exports.DeleteBucketLifecycleRequest = {}));
var DeleteBucketMetricsConfigurationRequest;
(function (DeleteBucketMetricsConfigurationRequest) {
    DeleteBucketMetricsConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketMetricsConfigurationRequest = exports.DeleteBucketMetricsConfigurationRequest || (exports.DeleteBucketMetricsConfigurationRequest = {}));
var DeleteBucketOwnershipControlsRequest;
(function (DeleteBucketOwnershipControlsRequest) {
    DeleteBucketOwnershipControlsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketOwnershipControlsRequest = exports.DeleteBucketOwnershipControlsRequest || (exports.DeleteBucketOwnershipControlsRequest = {}));
var DeleteBucketPolicyRequest;
(function (DeleteBucketPolicyRequest) {
    DeleteBucketPolicyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketPolicyRequest = exports.DeleteBucketPolicyRequest || (exports.DeleteBucketPolicyRequest = {}));
var DeleteBucketReplicationRequest;
(function (DeleteBucketReplicationRequest) {
    DeleteBucketReplicationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketReplicationRequest = exports.DeleteBucketReplicationRequest || (exports.DeleteBucketReplicationRequest = {}));
var DeleteBucketTaggingRequest;
(function (DeleteBucketTaggingRequest) {
    DeleteBucketTaggingRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketTaggingRequest = exports.DeleteBucketTaggingRequest || (exports.DeleteBucketTaggingRequest = {}));
var DeleteBucketWebsiteRequest;
(function (DeleteBucketWebsiteRequest) {
    DeleteBucketWebsiteRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketWebsiteRequest = exports.DeleteBucketWebsiteRequest || (exports.DeleteBucketWebsiteRequest = {}));
var DeleteObjectOutput;
(function (DeleteObjectOutput) {
    DeleteObjectOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteObjectOutput = exports.DeleteObjectOutput || (exports.DeleteObjectOutput = {}));
var DeleteObjectRequest;
(function (DeleteObjectRequest) {
    DeleteObjectRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteObjectRequest = exports.DeleteObjectRequest || (exports.DeleteObjectRequest = {}));
var DeletedObject;
(function (DeletedObject) {
    DeletedObject.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeletedObject = exports.DeletedObject || (exports.DeletedObject = {}));
var _Error;
(function (_Error) {
    _Error.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(_Error = exports._Error || (exports._Error = {}));
var DeleteObjectsOutput;
(function (DeleteObjectsOutput) {
    DeleteObjectsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteObjectsOutput = exports.DeleteObjectsOutput || (exports.DeleteObjectsOutput = {}));
var ObjectIdentifier;
(function (ObjectIdentifier) {
    ObjectIdentifier.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ObjectIdentifier = exports.ObjectIdentifier || (exports.ObjectIdentifier = {}));
var Delete;
(function (Delete) {
    Delete.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Delete = exports.Delete || (exports.Delete = {}));
var DeleteObjectsRequest;
(function (DeleteObjectsRequest) {
    DeleteObjectsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteObjectsRequest = exports.DeleteObjectsRequest || (exports.DeleteObjectsRequest = {}));
var DeleteObjectTaggingOutput;
(function (DeleteObjectTaggingOutput) {
    DeleteObjectTaggingOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteObjectTaggingOutput = exports.DeleteObjectTaggingOutput || (exports.DeleteObjectTaggingOutput = {}));
var DeleteObjectTaggingRequest;
(function (DeleteObjectTaggingRequest) {
    DeleteObjectTaggingRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteObjectTaggingRequest = exports.DeleteObjectTaggingRequest || (exports.DeleteObjectTaggingRequest = {}));
var DeletePublicAccessBlockRequest;
(function (DeletePublicAccessBlockRequest) {
    DeletePublicAccessBlockRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeletePublicAccessBlockRequest = exports.DeletePublicAccessBlockRequest || (exports.DeletePublicAccessBlockRequest = {}));
var GetBucketAccelerateConfigurationOutput;
(function (GetBucketAccelerateConfigurationOutput) {
    GetBucketAccelerateConfigurationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketAccelerateConfigurationOutput = exports.GetBucketAccelerateConfigurationOutput || (exports.GetBucketAccelerateConfigurationOutput = {}));
var GetBucketAccelerateConfigurationRequest;
(function (GetBucketAccelerateConfigurationRequest) {
    GetBucketAccelerateConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketAccelerateConfigurationRequest = exports.GetBucketAccelerateConfigurationRequest || (exports.GetBucketAccelerateConfigurationRequest = {}));
var GetBucketAclOutput;
(function (GetBucketAclOutput) {
    GetBucketAclOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketAclOutput = exports.GetBucketAclOutput || (exports.GetBucketAclOutput = {}));
var GetBucketAclRequest;
(function (GetBucketAclRequest) {
    GetBucketAclRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketAclRequest = exports.GetBucketAclRequest || (exports.GetBucketAclRequest = {}));
var Tag;
(function (Tag) {
    Tag.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Tag = exports.Tag || (exports.Tag = {}));
var AnalyticsAndOperator;
(function (AnalyticsAndOperator) {
    AnalyticsAndOperator.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AnalyticsAndOperator = exports.AnalyticsAndOperator || (exports.AnalyticsAndOperator = {}));
var AnalyticsFilter;
(function (AnalyticsFilter) {
    AnalyticsFilter.visit = (value, visitor) => {
        if (value.Prefix !== undefined)
            return visitor.Prefix(value.Prefix);
        if (value.Tag !== undefined)
            return visitor.Tag(value.Tag);
        if (value.And !== undefined)
            return visitor.And(value.And);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    AnalyticsFilter.filterSensitiveLog = (obj) => {
        if (obj.Prefix !== undefined)
            return { Prefix: obj.Prefix };
        if (obj.Tag !== undefined)
            return { Tag: Tag.filterSensitiveLog(obj.Tag) };
        if (obj.And !== undefined)
            return { And: AnalyticsAndOperator.filterSensitiveLog(obj.And) };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: "UNKNOWN" };
    };
})(AnalyticsFilter = exports.AnalyticsFilter || (exports.AnalyticsFilter = {}));
var AnalyticsS3BucketDestination;
(function (AnalyticsS3BucketDestination) {
    AnalyticsS3BucketDestination.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AnalyticsS3BucketDestination = exports.AnalyticsS3BucketDestination || (exports.AnalyticsS3BucketDestination = {}));
var AnalyticsExportDestination;
(function (AnalyticsExportDestination) {
    AnalyticsExportDestination.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AnalyticsExportDestination = exports.AnalyticsExportDestination || (exports.AnalyticsExportDestination = {}));
var StorageClassAnalysisDataExport;
(function (StorageClassAnalysisDataExport) {
    StorageClassAnalysisDataExport.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StorageClassAnalysisDataExport = exports.StorageClassAnalysisDataExport || (exports.StorageClassAnalysisDataExport = {}));
var StorageClassAnalysis;
(function (StorageClassAnalysis) {
    StorageClassAnalysis.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StorageClassAnalysis = exports.StorageClassAnalysis || (exports.StorageClassAnalysis = {}));
var AnalyticsConfiguration;
(function (AnalyticsConfiguration) {
    AnalyticsConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Filter && { Filter: AnalyticsFilter.filterSensitiveLog(obj.Filter) }),
    });
})(AnalyticsConfiguration = exports.AnalyticsConfiguration || (exports.AnalyticsConfiguration = {}));
var GetBucketAnalyticsConfigurationOutput;
(function (GetBucketAnalyticsConfigurationOutput) {
    GetBucketAnalyticsConfigurationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.AnalyticsConfiguration && {
            AnalyticsConfiguration: AnalyticsConfiguration.filterSensitiveLog(obj.AnalyticsConfiguration),
        }),
    });
})(GetBucketAnalyticsConfigurationOutput = exports.GetBucketAnalyticsConfigurationOutput || (exports.GetBucketAnalyticsConfigurationOutput = {}));
var GetBucketAnalyticsConfigurationRequest;
(function (GetBucketAnalyticsConfigurationRequest) {
    GetBucketAnalyticsConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketAnalyticsConfigurationRequest = exports.GetBucketAnalyticsConfigurationRequest || (exports.GetBucketAnalyticsConfigurationRequest = {}));
var CORSRule;
(function (CORSRule) {
    CORSRule.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CORSRule = exports.CORSRule || (exports.CORSRule = {}));
var GetBucketCorsOutput;
(function (GetBucketCorsOutput) {
    GetBucketCorsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketCorsOutput = exports.GetBucketCorsOutput || (exports.GetBucketCorsOutput = {}));
var GetBucketCorsRequest;
(function (GetBucketCorsRequest) {
    GetBucketCorsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketCorsRequest = exports.GetBucketCorsRequest || (exports.GetBucketCorsRequest = {}));
var ServerSideEncryptionByDefault;
(function (ServerSideEncryptionByDefault) {
    ServerSideEncryptionByDefault.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.KMSMasterKeyID && { KMSMasterKeyID: smithy_client_1.SENSITIVE_STRING }),
    });
})(ServerSideEncryptionByDefault = exports.ServerSideEncryptionByDefault || (exports.ServerSideEncryptionByDefault = {}));
var ServerSideEncryptionRule;
(function (ServerSideEncryptionRule) {
    ServerSideEncryptionRule.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.ApplyServerSideEncryptionByDefault && {
            ApplyServerSideEncryptionByDefault: ServerSideEncryptionByDefault.filterSensitiveLog(obj.ApplyServerSideEncryptionByDefault),
        }),
    });
})(ServerSideEncryptionRule = exports.ServerSideEncryptionRule || (exports.ServerSideEncryptionRule = {}));
var ServerSideEncryptionConfiguration;
(function (ServerSideEncryptionConfiguration) {
    ServerSideEncryptionConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Rules && { Rules: obj.Rules.map((item) => ServerSideEncryptionRule.filterSensitiveLog(item)) }),
    });
})(ServerSideEncryptionConfiguration = exports.ServerSideEncryptionConfiguration || (exports.ServerSideEncryptionConfiguration = {}));
var GetBucketEncryptionOutput;
(function (GetBucketEncryptionOutput) {
    GetBucketEncryptionOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.ServerSideEncryptionConfiguration && {
            ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration.filterSensitiveLog(obj.ServerSideEncryptionConfiguration),
        }),
    });
})(GetBucketEncryptionOutput = exports.GetBucketEncryptionOutput || (exports.GetBucketEncryptionOutput = {}));
var GetBucketEncryptionRequest;
(function (GetBucketEncryptionRequest) {
    GetBucketEncryptionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketEncryptionRequest = exports.GetBucketEncryptionRequest || (exports.GetBucketEncryptionRequest = {}));
var IntelligentTieringAndOperator;
(function (IntelligentTieringAndOperator) {
    IntelligentTieringAndOperator.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IntelligentTieringAndOperator = exports.IntelligentTieringAndOperator || (exports.IntelligentTieringAndOperator = {}));
var IntelligentTieringFilter;
(function (IntelligentTieringFilter) {
    IntelligentTieringFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IntelligentTieringFilter = exports.IntelligentTieringFilter || (exports.IntelligentTieringFilter = {}));
var Tiering;
(function (Tiering) {
    Tiering.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Tiering = exports.Tiering || (exports.Tiering = {}));
var IntelligentTieringConfiguration;
(function (IntelligentTieringConfiguration) {
    IntelligentTieringConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IntelligentTieringConfiguration = exports.IntelligentTieringConfiguration || (exports.IntelligentTieringConfiguration = {}));
var GetBucketIntelligentTieringConfigurationOutput;
(function (GetBucketIntelligentTieringConfigurationOutput) {
    GetBucketIntelligentTieringConfigurationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketIntelligentTieringConfigurationOutput = exports.GetBucketIntelligentTieringConfigurationOutput || (exports.GetBucketIntelligentTieringConfigurationOutput = {}));
var GetBucketIntelligentTieringConfigurationRequest;
(function (GetBucketIntelligentTieringConfigurationRequest) {
    GetBucketIntelligentTieringConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketIntelligentTieringConfigurationRequest = exports.GetBucketIntelligentTieringConfigurationRequest || (exports.GetBucketIntelligentTieringConfigurationRequest = {}));
var SSEKMS;
(function (SSEKMS) {
    SSEKMS.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.KeyId && { KeyId: smithy_client_1.SENSITIVE_STRING }),
    });
})(SSEKMS = exports.SSEKMS || (exports.SSEKMS = {}));
var SSES3;
(function (SSES3) {
    SSES3.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SSES3 = exports.SSES3 || (exports.SSES3 = {}));
var InventoryEncryption;
(function (InventoryEncryption) {
    InventoryEncryption.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSEKMS && { SSEKMS: SSEKMS.filterSensitiveLog(obj.SSEKMS) }),
    });
})(InventoryEncryption = exports.InventoryEncryption || (exports.InventoryEncryption = {}));
var InventoryS3BucketDestination;
(function (InventoryS3BucketDestination) {
    InventoryS3BucketDestination.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Encryption && { Encryption: InventoryEncryption.filterSensitiveLog(obj.Encryption) }),
    });
})(InventoryS3BucketDestination = exports.InventoryS3BucketDestination || (exports.InventoryS3BucketDestination = {}));
var InventoryDestination;
(function (InventoryDestination) {
    InventoryDestination.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.S3BucketDestination && {
            S3BucketDestination: InventoryS3BucketDestination.filterSensitiveLog(obj.S3BucketDestination),
        }),
    });
})(InventoryDestination = exports.InventoryDestination || (exports.InventoryDestination = {}));
var InventoryFilter;
(function (InventoryFilter) {
    InventoryFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InventoryFilter = exports.InventoryFilter || (exports.InventoryFilter = {}));
var InventorySchedule;
(function (InventorySchedule) {
    InventorySchedule.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InventorySchedule = exports.InventorySchedule || (exports.InventorySchedule = {}));
var InventoryConfiguration;
(function (InventoryConfiguration) {
    InventoryConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Destination && { Destination: InventoryDestination.filterSensitiveLog(obj.Destination) }),
    });
})(InventoryConfiguration = exports.InventoryConfiguration || (exports.InventoryConfiguration = {}));
var GetBucketInventoryConfigurationOutput;
(function (GetBucketInventoryConfigurationOutput) {
    GetBucketInventoryConfigurationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.InventoryConfiguration && {
            InventoryConfiguration: InventoryConfiguration.filterSensitiveLog(obj.InventoryConfiguration),
        }),
    });
})(GetBucketInventoryConfigurationOutput = exports.GetBucketInventoryConfigurationOutput || (exports.GetBucketInventoryConfigurationOutput = {}));
var GetBucketInventoryConfigurationRequest;
(function (GetBucketInventoryConfigurationRequest) {
    GetBucketInventoryConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketInventoryConfigurationRequest = exports.GetBucketInventoryConfigurationRequest || (exports.GetBucketInventoryConfigurationRequest = {}));
var LifecycleExpiration;
(function (LifecycleExpiration) {
    LifecycleExpiration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LifecycleExpiration = exports.LifecycleExpiration || (exports.LifecycleExpiration = {}));
var LifecycleRuleAndOperator;
(function (LifecycleRuleAndOperator) {
    LifecycleRuleAndOperator.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LifecycleRuleAndOperator = exports.LifecycleRuleAndOperator || (exports.LifecycleRuleAndOperator = {}));
var LifecycleRuleFilter;
(function (LifecycleRuleFilter) {
    LifecycleRuleFilter.visit = (value, visitor) => {
        if (value.Prefix !== undefined)
            return visitor.Prefix(value.Prefix);
        if (value.Tag !== undefined)
            return visitor.Tag(value.Tag);
        if (value.And !== undefined)
            return visitor.And(value.And);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    LifecycleRuleFilter.filterSensitiveLog = (obj) => {
        if (obj.Prefix !== undefined)
            return { Prefix: obj.Prefix };
        if (obj.Tag !== undefined)
            return { Tag: Tag.filterSensitiveLog(obj.Tag) };
        if (obj.And !== undefined)
            return { And: LifecycleRuleAndOperator.filterSensitiveLog(obj.And) };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: "UNKNOWN" };
    };
})(LifecycleRuleFilter = exports.LifecycleRuleFilter || (exports.LifecycleRuleFilter = {}));
var NoncurrentVersionExpiration;
(function (NoncurrentVersionExpiration) {
    NoncurrentVersionExpiration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NoncurrentVersionExpiration = exports.NoncurrentVersionExpiration || (exports.NoncurrentVersionExpiration = {}));
var NoncurrentVersionTransition;
(function (NoncurrentVersionTransition) {
    NoncurrentVersionTransition.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NoncurrentVersionTransition = exports.NoncurrentVersionTransition || (exports.NoncurrentVersionTransition = {}));
var Transition;
(function (Transition) {
    Transition.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Transition = exports.Transition || (exports.Transition = {}));
var LifecycleRule;
(function (LifecycleRule) {
    LifecycleRule.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Filter && { Filter: LifecycleRuleFilter.filterSensitiveLog(obj.Filter) }),
    });
})(LifecycleRule = exports.LifecycleRule || (exports.LifecycleRule = {}));
var GetBucketLifecycleConfigurationOutput;
(function (GetBucketLifecycleConfigurationOutput) {
    GetBucketLifecycleConfigurationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Rules && { Rules: obj.Rules.map((item) => LifecycleRule.filterSensitiveLog(item)) }),
    });
})(GetBucketLifecycleConfigurationOutput = exports.GetBucketLifecycleConfigurationOutput || (exports.GetBucketLifecycleConfigurationOutput = {}));
var GetBucketLifecycleConfigurationRequest;
(function (GetBucketLifecycleConfigurationRequest) {
    GetBucketLifecycleConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketLifecycleConfigurationRequest = exports.GetBucketLifecycleConfigurationRequest || (exports.GetBucketLifecycleConfigurationRequest = {}));
var GetBucketLocationOutput;
(function (GetBucketLocationOutput) {
    GetBucketLocationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketLocationOutput = exports.GetBucketLocationOutput || (exports.GetBucketLocationOutput = {}));
var GetBucketLocationRequest;
(function (GetBucketLocationRequest) {
    GetBucketLocationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketLocationRequest = exports.GetBucketLocationRequest || (exports.GetBucketLocationRequest = {}));
var TargetGrant;
(function (TargetGrant) {
    TargetGrant.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TargetGrant = exports.TargetGrant || (exports.TargetGrant = {}));
var LoggingEnabled;
(function (LoggingEnabled) {
    LoggingEnabled.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LoggingEnabled = exports.LoggingEnabled || (exports.LoggingEnabled = {}));
var GetBucketLoggingOutput;
(function (GetBucketLoggingOutput) {
    GetBucketLoggingOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketLoggingOutput = exports.GetBucketLoggingOutput || (exports.GetBucketLoggingOutput = {}));
var GetBucketLoggingRequest;
(function (GetBucketLoggingRequest) {
    GetBucketLoggingRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketLoggingRequest = exports.GetBucketLoggingRequest || (exports.GetBucketLoggingRequest = {}));
var MetricsAndOperator;
(function (MetricsAndOperator) {
    MetricsAndOperator.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MetricsAndOperator = exports.MetricsAndOperator || (exports.MetricsAndOperator = {}));
var MetricsFilter;
(function (MetricsFilter) {
    MetricsFilter.visit = (value, visitor) => {
        if (value.Prefix !== undefined)
            return visitor.Prefix(value.Prefix);
        if (value.Tag !== undefined)
            return visitor.Tag(value.Tag);
        if (value.And !== undefined)
            return visitor.And(value.And);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    MetricsFilter.filterSensitiveLog = (obj) => {
        if (obj.Prefix !== undefined)
            return { Prefix: obj.Prefix };
        if (obj.Tag !== undefined)
            return { Tag: Tag.filterSensitiveLog(obj.Tag) };
        if (obj.And !== undefined)
            return { And: MetricsAndOperator.filterSensitiveLog(obj.And) };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: "UNKNOWN" };
    };
})(MetricsFilter = exports.MetricsFilter || (exports.MetricsFilter = {}));
var MetricsConfiguration;
(function (MetricsConfiguration) {
    MetricsConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Filter && { Filter: MetricsFilter.filterSensitiveLog(obj.Filter) }),
    });
})(MetricsConfiguration = exports.MetricsConfiguration || (exports.MetricsConfiguration = {}));
var GetBucketMetricsConfigurationOutput;
(function (GetBucketMetricsConfigurationOutput) {
    GetBucketMetricsConfigurationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.MetricsConfiguration && {
            MetricsConfiguration: MetricsConfiguration.filterSensitiveLog(obj.MetricsConfiguration),
        }),
    });
})(GetBucketMetricsConfigurationOutput = exports.GetBucketMetricsConfigurationOutput || (exports.GetBucketMetricsConfigurationOutput = {}));
var GetBucketMetricsConfigurationRequest;
(function (GetBucketMetricsConfigurationRequest) {
    GetBucketMetricsConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketMetricsConfigurationRequest = exports.GetBucketMetricsConfigurationRequest || (exports.GetBucketMetricsConfigurationRequest = {}));
var GetBucketNotificationConfigurationRequest;
(function (GetBucketNotificationConfigurationRequest) {
    GetBucketNotificationConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketNotificationConfigurationRequest = exports.GetBucketNotificationConfigurationRequest || (exports.GetBucketNotificationConfigurationRequest = {}));
var FilterRule;
(function (FilterRule) {
    FilterRule.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(FilterRule = exports.FilterRule || (exports.FilterRule = {}));
var S3KeyFilter;
(function (S3KeyFilter) {
    S3KeyFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(S3KeyFilter = exports.S3KeyFilter || (exports.S3KeyFilter = {}));
var NotificationConfigurationFilter;
(function (NotificationConfigurationFilter) {
    NotificationConfigurationFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NotificationConfigurationFilter = exports.NotificationConfigurationFilter || (exports.NotificationConfigurationFilter = {}));
var LambdaFunctionConfiguration;
(function (LambdaFunctionConfiguration) {
    LambdaFunctionConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LambdaFunctionConfiguration = exports.LambdaFunctionConfiguration || (exports.LambdaFunctionConfiguration = {}));
var QueueConfiguration;
(function (QueueConfiguration) {
    QueueConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(QueueConfiguration = exports.QueueConfiguration || (exports.QueueConfiguration = {}));
var TopicConfiguration;
(function (TopicConfiguration) {
    TopicConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TopicConfiguration = exports.TopicConfiguration || (exports.TopicConfiguration = {}));
var NotificationConfiguration;
(function (NotificationConfiguration) {
    NotificationConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NotificationConfiguration = exports.NotificationConfiguration || (exports.NotificationConfiguration = {}));
var OwnershipControlsRule;
(function (OwnershipControlsRule) {
    OwnershipControlsRule.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(OwnershipControlsRule = exports.OwnershipControlsRule || (exports.OwnershipControlsRule = {}));
var OwnershipControls;
(function (OwnershipControls) {
    OwnershipControls.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(OwnershipControls = exports.OwnershipControls || (exports.OwnershipControls = {}));
var GetBucketOwnershipControlsOutput;
(function (GetBucketOwnershipControlsOutput) {
    GetBucketOwnershipControlsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketOwnershipControlsOutput = exports.GetBucketOwnershipControlsOutput || (exports.GetBucketOwnershipControlsOutput = {}));
var GetBucketOwnershipControlsRequest;
(function (GetBucketOwnershipControlsRequest) {
    GetBucketOwnershipControlsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketOwnershipControlsRequest = exports.GetBucketOwnershipControlsRequest || (exports.GetBucketOwnershipControlsRequest = {}));
var GetBucketPolicyOutput;
(function (GetBucketPolicyOutput) {
    GetBucketPolicyOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketPolicyOutput = exports.GetBucketPolicyOutput || (exports.GetBucketPolicyOutput = {}));
var GetBucketPolicyRequest;
(function (GetBucketPolicyRequest) {
    GetBucketPolicyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketPolicyRequest = exports.GetBucketPolicyRequest || (exports.GetBucketPolicyRequest = {}));
var PolicyStatus;
(function (PolicyStatus) {
    PolicyStatus.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PolicyStatus = exports.PolicyStatus || (exports.PolicyStatus = {}));
var GetBucketPolicyStatusOutput;
(function (GetBucketPolicyStatusOutput) {
    GetBucketPolicyStatusOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketPolicyStatusOutput = exports.GetBucketPolicyStatusOutput || (exports.GetBucketPolicyStatusOutput = {}));
var GetBucketPolicyStatusRequest;
(function (GetBucketPolicyStatusRequest) {
    GetBucketPolicyStatusRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketPolicyStatusRequest = exports.GetBucketPolicyStatusRequest || (exports.GetBucketPolicyStatusRequest = {}));
var DeleteMarkerReplication;
(function (DeleteMarkerReplication) {
    DeleteMarkerReplication.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteMarkerReplication = exports.DeleteMarkerReplication || (exports.DeleteMarkerReplication = {}));
var EncryptionConfiguration;
(function (EncryptionConfiguration) {
    EncryptionConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EncryptionConfiguration = exports.EncryptionConfiguration || (exports.EncryptionConfiguration = {}));
var ReplicationTimeValue;
(function (ReplicationTimeValue) {
    ReplicationTimeValue.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ReplicationTimeValue = exports.ReplicationTimeValue || (exports.ReplicationTimeValue = {}));
var Metrics;
(function (Metrics) {
    Metrics.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Metrics = exports.Metrics || (exports.Metrics = {}));
var ReplicationTime;
(function (ReplicationTime) {
    ReplicationTime.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ReplicationTime = exports.ReplicationTime || (exports.ReplicationTime = {}));
var Destination;
(function (Destination) {
    Destination.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Destination = exports.Destination || (exports.Destination = {}));
var ExistingObjectReplication;
(function (ExistingObjectReplication) {
    ExistingObjectReplication.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ExistingObjectReplication = exports.ExistingObjectReplication || (exports.ExistingObjectReplication = {}));
var ReplicationRuleAndOperator;
(function (ReplicationRuleAndOperator) {
    ReplicationRuleAndOperator.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ReplicationRuleAndOperator = exports.ReplicationRuleAndOperator || (exports.ReplicationRuleAndOperator = {}));
var ReplicationRuleFilter;
(function (ReplicationRuleFilter) {
    ReplicationRuleFilter.visit = (value, visitor) => {
        if (value.Prefix !== undefined)
            return visitor.Prefix(value.Prefix);
        if (value.Tag !== undefined)
            return visitor.Tag(value.Tag);
        if (value.And !== undefined)
            return visitor.And(value.And);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    ReplicationRuleFilter.filterSensitiveLog = (obj) => {
        if (obj.Prefix !== undefined)
            return { Prefix: obj.Prefix };
        if (obj.Tag !== undefined)
            return { Tag: Tag.filterSensitiveLog(obj.Tag) };
        if (obj.And !== undefined)
            return { And: ReplicationRuleAndOperator.filterSensitiveLog(obj.And) };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: "UNKNOWN" };
    };
})(ReplicationRuleFilter = exports.ReplicationRuleFilter || (exports.ReplicationRuleFilter = {}));
var ReplicaModifications;
(function (ReplicaModifications) {
    ReplicaModifications.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ReplicaModifications = exports.ReplicaModifications || (exports.ReplicaModifications = {}));
var SseKmsEncryptedObjects;
(function (SseKmsEncryptedObjects) {
    SseKmsEncryptedObjects.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SseKmsEncryptedObjects = exports.SseKmsEncryptedObjects || (exports.SseKmsEncryptedObjects = {}));
var SourceSelectionCriteria;
(function (SourceSelectionCriteria) {
    SourceSelectionCriteria.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SourceSelectionCriteria = exports.SourceSelectionCriteria || (exports.SourceSelectionCriteria = {}));
var ReplicationRule;
(function (ReplicationRule) {
    ReplicationRule.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Filter && { Filter: ReplicationRuleFilter.filterSensitiveLog(obj.Filter) }),
    });
})(ReplicationRule = exports.ReplicationRule || (exports.ReplicationRule = {}));
var ReplicationConfiguration;
(function (ReplicationConfiguration) {
    ReplicationConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Rules && { Rules: obj.Rules.map((item) => ReplicationRule.filterSensitiveLog(item)) }),
    });
})(ReplicationConfiguration = exports.ReplicationConfiguration || (exports.ReplicationConfiguration = {}));
var GetBucketReplicationOutput;
(function (GetBucketReplicationOutput) {
    GetBucketReplicationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.ReplicationConfiguration && {
            ReplicationConfiguration: ReplicationConfiguration.filterSensitiveLog(obj.ReplicationConfiguration),
        }),
    });
})(GetBucketReplicationOutput = exports.GetBucketReplicationOutput || (exports.GetBucketReplicationOutput = {}));
var GetBucketReplicationRequest;
(function (GetBucketReplicationRequest) {
    GetBucketReplicationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketReplicationRequest = exports.GetBucketReplicationRequest || (exports.GetBucketReplicationRequest = {}));
var GetBucketRequestPaymentOutput;
(function (GetBucketRequestPaymentOutput) {
    GetBucketRequestPaymentOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketRequestPaymentOutput = exports.GetBucketRequestPaymentOutput || (exports.GetBucketRequestPaymentOutput = {}));
var GetBucketRequestPaymentRequest;
(function (GetBucketRequestPaymentRequest) {
    GetBucketRequestPaymentRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketRequestPaymentRequest = exports.GetBucketRequestPaymentRequest || (exports.GetBucketRequestPaymentRequest = {}));
var GetBucketTaggingOutput;
(function (GetBucketTaggingOutput) {
    GetBucketTaggingOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketTaggingOutput = exports.GetBucketTaggingOutput || (exports.GetBucketTaggingOutput = {}));
var GetBucketTaggingRequest;
(function (GetBucketTaggingRequest) {
    GetBucketTaggingRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketTaggingRequest = exports.GetBucketTaggingRequest || (exports.GetBucketTaggingRequest = {}));
var GetBucketVersioningOutput;
(function (GetBucketVersioningOutput) {
    GetBucketVersioningOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketVersioningOutput = exports.GetBucketVersioningOutput || (exports.GetBucketVersioningOutput = {}));
var GetBucketVersioningRequest;
(function (GetBucketVersioningRequest) {
    GetBucketVersioningRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketVersioningRequest = exports.GetBucketVersioningRequest || (exports.GetBucketVersioningRequest = {}));
var ErrorDocument;
(function (ErrorDocument) {
    ErrorDocument.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ErrorDocument = exports.ErrorDocument || (exports.ErrorDocument = {}));
var IndexDocument;
(function (IndexDocument) {
    IndexDocument.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IndexDocument = exports.IndexDocument || (exports.IndexDocument = {}));
var RedirectAllRequestsTo;
(function (RedirectAllRequestsTo) {
    RedirectAllRequestsTo.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RedirectAllRequestsTo = exports.RedirectAllRequestsTo || (exports.RedirectAllRequestsTo = {}));
var Condition;
(function (Condition) {
    Condition.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Condition = exports.Condition || (exports.Condition = {}));
var Redirect;
(function (Redirect) {
    Redirect.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Redirect = exports.Redirect || (exports.Redirect = {}));
var RoutingRule;
(function (RoutingRule) {
    RoutingRule.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RoutingRule = exports.RoutingRule || (exports.RoutingRule = {}));
var GetBucketWebsiteOutput;
(function (GetBucketWebsiteOutput) {
    GetBucketWebsiteOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketWebsiteOutput = exports.GetBucketWebsiteOutput || (exports.GetBucketWebsiteOutput = {}));
var GetBucketWebsiteRequest;
(function (GetBucketWebsiteRequest) {
    GetBucketWebsiteRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketWebsiteRequest = exports.GetBucketWebsiteRequest || (exports.GetBucketWebsiteRequest = {}));
var GetObjectOutput;
(function (GetObjectOutput) {
    GetObjectOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSEKMSKeyId && { SSEKMSKeyId: smithy_client_1.SENSITIVE_STRING }),
    });
})(GetObjectOutput = exports.GetObjectOutput || (exports.GetObjectOutput = {}));
var GetObjectRequest;
(function (GetObjectRequest) {
    GetObjectRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSECustomerKey && { SSECustomerKey: smithy_client_1.SENSITIVE_STRING }),
    });
})(GetObjectRequest = exports.GetObjectRequest || (exports.GetObjectRequest = {}));
var InvalidObjectState;
(function (InvalidObjectState) {
    InvalidObjectState.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidObjectState = exports.InvalidObjectState || (exports.InvalidObjectState = {}));
var NoSuchKey;
(function (NoSuchKey) {
    NoSuchKey.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NoSuchKey = exports.NoSuchKey || (exports.NoSuchKey = {}));
var GetObjectAclOutput;
(function (GetObjectAclOutput) {
    GetObjectAclOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectAclOutput = exports.GetObjectAclOutput || (exports.GetObjectAclOutput = {}));
var GetObjectAclRequest;
(function (GetObjectAclRequest) {
    GetObjectAclRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectAclRequest = exports.GetObjectAclRequest || (exports.GetObjectAclRequest = {}));
var ObjectLockLegalHold;
(function (ObjectLockLegalHold) {
    ObjectLockLegalHold.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ObjectLockLegalHold = exports.ObjectLockLegalHold || (exports.ObjectLockLegalHold = {}));
var GetObjectLegalHoldOutput;
(function (GetObjectLegalHoldOutput) {
    GetObjectLegalHoldOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectLegalHoldOutput = exports.GetObjectLegalHoldOutput || (exports.GetObjectLegalHoldOutput = {}));
var GetObjectLegalHoldRequest;
(function (GetObjectLegalHoldRequest) {
    GetObjectLegalHoldRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectLegalHoldRequest = exports.GetObjectLegalHoldRequest || (exports.GetObjectLegalHoldRequest = {}));
var DefaultRetention;
(function (DefaultRetention) {
    DefaultRetention.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DefaultRetention = exports.DefaultRetention || (exports.DefaultRetention = {}));
var ObjectLockRule;
(function (ObjectLockRule) {
    ObjectLockRule.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ObjectLockRule = exports.ObjectLockRule || (exports.ObjectLockRule = {}));
var ObjectLockConfiguration;
(function (ObjectLockConfiguration) {
    ObjectLockConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ObjectLockConfiguration = exports.ObjectLockConfiguration || (exports.ObjectLockConfiguration = {}));
var GetObjectLockConfigurationOutput;
(function (GetObjectLockConfigurationOutput) {
    GetObjectLockConfigurationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectLockConfigurationOutput = exports.GetObjectLockConfigurationOutput || (exports.GetObjectLockConfigurationOutput = {}));
var GetObjectLockConfigurationRequest;
(function (GetObjectLockConfigurationRequest) {
    GetObjectLockConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectLockConfigurationRequest = exports.GetObjectLockConfigurationRequest || (exports.GetObjectLockConfigurationRequest = {}));
var ObjectLockRetention;
(function (ObjectLockRetention) {
    ObjectLockRetention.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ObjectLockRetention = exports.ObjectLockRetention || (exports.ObjectLockRetention = {}));
var GetObjectRetentionOutput;
(function (GetObjectRetentionOutput) {
    GetObjectRetentionOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectRetentionOutput = exports.GetObjectRetentionOutput || (exports.GetObjectRetentionOutput = {}));
var GetObjectRetentionRequest;
(function (GetObjectRetentionRequest) {
    GetObjectRetentionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectRetentionRequest = exports.GetObjectRetentionRequest || (exports.GetObjectRetentionRequest = {}));
var GetObjectTaggingOutput;
(function (GetObjectTaggingOutput) {
    GetObjectTaggingOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectTaggingOutput = exports.GetObjectTaggingOutput || (exports.GetObjectTaggingOutput = {}));
var GetObjectTaggingRequest;
(function (GetObjectTaggingRequest) {
    GetObjectTaggingRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectTaggingRequest = exports.GetObjectTaggingRequest || (exports.GetObjectTaggingRequest = {}));
var GetObjectTorrentOutput;
(function (GetObjectTorrentOutput) {
    GetObjectTorrentOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectTorrentOutput = exports.GetObjectTorrentOutput || (exports.GetObjectTorrentOutput = {}));
var GetObjectTorrentRequest;
(function (GetObjectTorrentRequest) {
    GetObjectTorrentRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectTorrentRequest = exports.GetObjectTorrentRequest || (exports.GetObjectTorrentRequest = {}));
var PublicAccessBlockConfiguration;
(function (PublicAccessBlockConfiguration) {
    PublicAccessBlockConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PublicAccessBlockConfiguration = exports.PublicAccessBlockConfiguration || (exports.PublicAccessBlockConfiguration = {}));
var GetPublicAccessBlockOutput;
(function (GetPublicAccessBlockOutput) {
    GetPublicAccessBlockOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetPublicAccessBlockOutput = exports.GetPublicAccessBlockOutput || (exports.GetPublicAccessBlockOutput = {}));
var GetPublicAccessBlockRequest;
(function (GetPublicAccessBlockRequest) {
    GetPublicAccessBlockRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetPublicAccessBlockRequest = exports.GetPublicAccessBlockRequest || (exports.GetPublicAccessBlockRequest = {}));
var HeadBucketRequest;
(function (HeadBucketRequest) {
    HeadBucketRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(HeadBucketRequest = exports.HeadBucketRequest || (exports.HeadBucketRequest = {}));
var NoSuchBucket;
(function (NoSuchBucket) {
    NoSuchBucket.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NoSuchBucket = exports.NoSuchBucket || (exports.NoSuchBucket = {}));
var HeadObjectOutput;
(function (HeadObjectOutput) {
    HeadObjectOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSEKMSKeyId && { SSEKMSKeyId: smithy_client_1.SENSITIVE_STRING }),
    });
})(HeadObjectOutput = exports.HeadObjectOutput || (exports.HeadObjectOutput = {}));
var HeadObjectRequest;
(function (HeadObjectRequest) {
    HeadObjectRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSECustomerKey && { SSECustomerKey: smithy_client_1.SENSITIVE_STRING }),
    });
})(HeadObjectRequest = exports.HeadObjectRequest || (exports.HeadObjectRequest = {}));
var ListBucketAnalyticsConfigurationsOutput;
(function (ListBucketAnalyticsConfigurationsOutput) {
    ListBucketAnalyticsConfigurationsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.AnalyticsConfigurationList && {
            AnalyticsConfigurationList: obj.AnalyticsConfigurationList.map((item) => AnalyticsConfiguration.filterSensitiveLog(item)),
        }),
    });
})(ListBucketAnalyticsConfigurationsOutput = exports.ListBucketAnalyticsConfigurationsOutput || (exports.ListBucketAnalyticsConfigurationsOutput = {}));
var ListBucketAnalyticsConfigurationsRequest;
(function (ListBucketAnalyticsConfigurationsRequest) {
    ListBucketAnalyticsConfigurationsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListBucketAnalyticsConfigurationsRequest = exports.ListBucketAnalyticsConfigurationsRequest || (exports.ListBucketAnalyticsConfigurationsRequest = {}));
var ListBucketIntelligentTieringConfigurationsOutput;
(function (ListBucketIntelligentTieringConfigurationsOutput) {
    ListBucketIntelligentTieringConfigurationsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListBucketIntelligentTieringConfigurationsOutput = exports.ListBucketIntelligentTieringConfigurationsOutput || (exports.ListBucketIntelligentTieringConfigurationsOutput = {}));
var ListBucketIntelligentTieringConfigurationsRequest;
(function (ListBucketIntelligentTieringConfigurationsRequest) {
    ListBucketIntelligentTieringConfigurationsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListBucketIntelligentTieringConfigurationsRequest = exports.ListBucketIntelligentTieringConfigurationsRequest || (exports.ListBucketIntelligentTieringConfigurationsRequest = {}));
var ListBucketInventoryConfigurationsOutput;
(function (ListBucketInventoryConfigurationsOutput) {
    ListBucketInventoryConfigurationsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.InventoryConfigurationList && {
            InventoryConfigurationList: obj.InventoryConfigurationList.map((item) => InventoryConfiguration.filterSensitiveLog(item)),
        }),
    });
})(ListBucketInventoryConfigurationsOutput = exports.ListBucketInventoryConfigurationsOutput || (exports.ListBucketInventoryConfigurationsOutput = {}));
var ListBucketInventoryConfigurationsRequest;
(function (ListBucketInventoryConfigurationsRequest) {
    ListBucketInventoryConfigurationsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListBucketInventoryConfigurationsRequest = exports.ListBucketInventoryConfigurationsRequest || (exports.ListBucketInventoryConfigurationsRequest = {}));
var ListBucketMetricsConfigurationsOutput;
(function (ListBucketMetricsConfigurationsOutput) {
    ListBucketMetricsConfigurationsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.MetricsConfigurationList && {
            MetricsConfigurationList: obj.MetricsConfigurationList.map((item) => MetricsConfiguration.filterSensitiveLog(item)),
        }),
    });
})(ListBucketMetricsConfigurationsOutput = exports.ListBucketMetricsConfigurationsOutput || (exports.ListBucketMetricsConfigurationsOutput = {}));
var ListBucketMetricsConfigurationsRequest;
(function (ListBucketMetricsConfigurationsRequest) {
    ListBucketMetricsConfigurationsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListBucketMetricsConfigurationsRequest = exports.ListBucketMetricsConfigurationsRequest || (exports.ListBucketMetricsConfigurationsRequest = {}));
var Bucket;
(function (Bucket) {
    Bucket.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Bucket = exports.Bucket || (exports.Bucket = {}));
var ListBucketsOutput;
(function (ListBucketsOutput) {
    ListBucketsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListBucketsOutput = exports.ListBucketsOutput || (exports.ListBucketsOutput = {}));
var CommonPrefix;
(function (CommonPrefix) {
    CommonPrefix.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CommonPrefix = exports.CommonPrefix || (exports.CommonPrefix = {}));
var Initiator;
(function (Initiator) {
    Initiator.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Initiator = exports.Initiator || (exports.Initiator = {}));
var MultipartUpload;
(function (MultipartUpload) {
    MultipartUpload.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MultipartUpload = exports.MultipartUpload || (exports.MultipartUpload = {}));
var ListMultipartUploadsOutput;
(function (ListMultipartUploadsOutput) {
    ListMultipartUploadsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListMultipartUploadsOutput = exports.ListMultipartUploadsOutput || (exports.ListMultipartUploadsOutput = {}));
var ListMultipartUploadsRequest;
(function (ListMultipartUploadsRequest) {
    ListMultipartUploadsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListMultipartUploadsRequest = exports.ListMultipartUploadsRequest || (exports.ListMultipartUploadsRequest = {}));
var _Object;
(function (_Object) {
    _Object.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(_Object = exports._Object || (exports._Object = {}));
var ListObjectsOutput;
(function (ListObjectsOutput) {
    ListObjectsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListObjectsOutput = exports.ListObjectsOutput || (exports.ListObjectsOutput = {}));
var ListObjectsRequest;
(function (ListObjectsRequest) {
    ListObjectsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListObjectsRequest = exports.ListObjectsRequest || (exports.ListObjectsRequest = {}));
var ListObjectsV2Output;
(function (ListObjectsV2Output) {
    ListObjectsV2Output.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListObjectsV2Output = exports.ListObjectsV2Output || (exports.ListObjectsV2Output = {}));
var ListObjectsV2Request;
(function (ListObjectsV2Request) {
    ListObjectsV2Request.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListObjectsV2Request = exports.ListObjectsV2Request || (exports.ListObjectsV2Request = {}));
var DeleteMarkerEntry;
(function (DeleteMarkerEntry) {
    DeleteMarkerEntry.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteMarkerEntry = exports.DeleteMarkerEntry || (exports.DeleteMarkerEntry = {}));
var ObjectVersion;
(function (ObjectVersion) {
    ObjectVersion.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ObjectVersion = exports.ObjectVersion || (exports.ObjectVersion = {}));
var ListObjectVersionsOutput;
(function (ListObjectVersionsOutput) {
    ListObjectVersionsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListObjectVersionsOutput = exports.ListObjectVersionsOutput || (exports.ListObjectVersionsOutput = {}));
var ListObjectVersionsRequest;
(function (ListObjectVersionsRequest) {
    ListObjectVersionsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListObjectVersionsRequest = exports.ListObjectVersionsRequest || (exports.ListObjectVersionsRequest = {}));
var Part;
(function (Part) {
    Part.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Part = exports.Part || (exports.Part = {}));
var ListPartsOutput;
(function (ListPartsOutput) {
    ListPartsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListPartsOutput = exports.ListPartsOutput || (exports.ListPartsOutput = {}));
var ListPartsRequest;
(function (ListPartsRequest) {
    ListPartsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListPartsRequest = exports.ListPartsRequest || (exports.ListPartsRequest = {}));
var PutBucketAccelerateConfigurationRequest;
(function (PutBucketAccelerateConfigurationRequest) {
    PutBucketAccelerateConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketAccelerateConfigurationRequest = exports.PutBucketAccelerateConfigurationRequest || (exports.PutBucketAccelerateConfigurationRequest = {}));
var PutBucketAclRequest;
(function (PutBucketAclRequest) {
    PutBucketAclRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketAclRequest = exports.PutBucketAclRequest || (exports.PutBucketAclRequest = {}));
var PutBucketAnalyticsConfigurationRequest;
(function (PutBucketAnalyticsConfigurationRequest) {
    PutBucketAnalyticsConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.AnalyticsConfiguration && {
            AnalyticsConfiguration: AnalyticsConfiguration.filterSensitiveLog(obj.AnalyticsConfiguration),
        }),
    });
})(PutBucketAnalyticsConfigurationRequest = exports.PutBucketAnalyticsConfigurationRequest || (exports.PutBucketAnalyticsConfigurationRequest = {}));
var CORSConfiguration;
(function (CORSConfiguration) {
    CORSConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CORSConfiguration = exports.CORSConfiguration || (exports.CORSConfiguration = {}));
var PutBucketCorsRequest;
(function (PutBucketCorsRequest) {
    PutBucketCorsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketCorsRequest = exports.PutBucketCorsRequest || (exports.PutBucketCorsRequest = {}));
var PutBucketEncryptionRequest;
(function (PutBucketEncryptionRequest) {
    PutBucketEncryptionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.ServerSideEncryptionConfiguration && {
            ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration.filterSensitiveLog(obj.ServerSideEncryptionConfiguration),
        }),
    });
})(PutBucketEncryptionRequest = exports.PutBucketEncryptionRequest || (exports.PutBucketEncryptionRequest = {}));
var PutBucketIntelligentTieringConfigurationRequest;
(function (PutBucketIntelligentTieringConfigurationRequest) {
    PutBucketIntelligentTieringConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketIntelligentTieringConfigurationRequest = exports.PutBucketIntelligentTieringConfigurationRequest || (exports.PutBucketIntelligentTieringConfigurationRequest = {}));
var PutBucketInventoryConfigurationRequest;
(function (PutBucketInventoryConfigurationRequest) {
    PutBucketInventoryConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.InventoryConfiguration && {
            InventoryConfiguration: InventoryConfiguration.filterSensitiveLog(obj.InventoryConfiguration),
        }),
    });
})(PutBucketInventoryConfigurationRequest = exports.PutBucketInventoryConfigurationRequest || (exports.PutBucketInventoryConfigurationRequest = {}));
var BucketLifecycleConfiguration;
(function (BucketLifecycleConfiguration) {
    BucketLifecycleConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Rules && { Rules: obj.Rules.map((item) => LifecycleRule.filterSensitiveLog(item)) }),
    });
})(BucketLifecycleConfiguration = exports.BucketLifecycleConfiguration || (exports.BucketLifecycleConfiguration = {}));
var PutBucketLifecycleConfigurationRequest;
(function (PutBucketLifecycleConfigurationRequest) {
    PutBucketLifecycleConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.LifecycleConfiguration && {
            LifecycleConfiguration: BucketLifecycleConfiguration.filterSensitiveLog(obj.LifecycleConfiguration),
        }),
    });
})(PutBucketLifecycleConfigurationRequest = exports.PutBucketLifecycleConfigurationRequest || (exports.PutBucketLifecycleConfigurationRequest = {}));
var BucketLoggingStatus;
(function (BucketLoggingStatus) {
    BucketLoggingStatus.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BucketLoggingStatus = exports.BucketLoggingStatus || (exports.BucketLoggingStatus = {}));
var PutBucketLoggingRequest;
(function (PutBucketLoggingRequest) {
    PutBucketLoggingRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketLoggingRequest = exports.PutBucketLoggingRequest || (exports.PutBucketLoggingRequest = {}));
var PutBucketMetricsConfigurationRequest;
(function (PutBucketMetricsConfigurationRequest) {
    PutBucketMetricsConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.MetricsConfiguration && {
            MetricsConfiguration: MetricsConfiguration.filterSensitiveLog(obj.MetricsConfiguration),
        }),
    });
})(PutBucketMetricsConfigurationRequest = exports.PutBucketMetricsConfigurationRequest || (exports.PutBucketMetricsConfigurationRequest = {}));
var PutBucketNotificationConfigurationRequest;
(function (PutBucketNotificationConfigurationRequest) {
    PutBucketNotificationConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketNotificationConfigurationRequest = exports.PutBucketNotificationConfigurationRequest || (exports.PutBucketNotificationConfigurationRequest = {}));
var PutBucketOwnershipControlsRequest;
(function (PutBucketOwnershipControlsRequest) {
    PutBucketOwnershipControlsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketOwnershipControlsRequest = exports.PutBucketOwnershipControlsRequest || (exports.PutBucketOwnershipControlsRequest = {}));
var PutBucketPolicyRequest;
(function (PutBucketPolicyRequest) {
    PutBucketPolicyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketPolicyRequest = exports.PutBucketPolicyRequest || (exports.PutBucketPolicyRequest = {}));
var PutBucketReplicationRequest;
(function (PutBucketReplicationRequest) {
    PutBucketReplicationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.ReplicationConfiguration && {
            ReplicationConfiguration: ReplicationConfiguration.filterSensitiveLog(obj.ReplicationConfiguration),
        }),
    });
})(PutBucketReplicationRequest = exports.PutBucketReplicationRequest || (exports.PutBucketReplicationRequest = {}));
var RequestPaymentConfiguration;
(function (RequestPaymentConfiguration) {
    RequestPaymentConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RequestPaymentConfiguration = exports.RequestPaymentConfiguration || (exports.RequestPaymentConfiguration = {}));
var PutBucketRequestPaymentRequest;
(function (PutBucketRequestPaymentRequest) {
    PutBucketRequestPaymentRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketRequestPaymentRequest = exports.PutBucketRequestPaymentRequest || (exports.PutBucketRequestPaymentRequest = {}));
var Tagging;
(function (Tagging) {
    Tagging.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Tagging = exports.Tagging || (exports.Tagging = {}));
var PutBucketTaggingRequest;
(function (PutBucketTaggingRequest) {
    PutBucketTaggingRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketTaggingRequest = exports.PutBucketTaggingRequest || (exports.PutBucketTaggingRequest = {}));
var VersioningConfiguration;
(function (VersioningConfiguration) {
    VersioningConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(VersioningConfiguration = exports.VersioningConfiguration || (exports.VersioningConfiguration = {}));
var PutBucketVersioningRequest;
(function (PutBucketVersioningRequest) {
    PutBucketVersioningRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketVersioningRequest = exports.PutBucketVersioningRequest || (exports.PutBucketVersioningRequest = {}));
var WebsiteConfiguration;
(function (WebsiteConfiguration) {
    WebsiteConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(WebsiteConfiguration = exports.WebsiteConfiguration || (exports.WebsiteConfiguration = {}));
var PutBucketWebsiteRequest;
(function (PutBucketWebsiteRequest) {
    PutBucketWebsiteRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketWebsiteRequest = exports.PutBucketWebsiteRequest || (exports.PutBucketWebsiteRequest = {}));
var PutObjectOutput;
(function (PutObjectOutput) {
    PutObjectOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSEKMSKeyId && { SSEKMSKeyId: smithy_client_1.SENSITIVE_STRING }),
        ...(obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: smithy_client_1.SENSITIVE_STRING }),
    });
})(PutObjectOutput = exports.PutObjectOutput || (exports.PutObjectOutput = {}));
var PutObjectRequest;
(function (PutObjectRequest) {
    PutObjectRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSECustomerKey && { SSECustomerKey: smithy_client_1.SENSITIVE_STRING }),
        ...(obj.SSEKMSKeyId && { SSEKMSKeyId: smithy_client_1.SENSITIVE_STRING }),
        ...(obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: smithy_client_1.SENSITIVE_STRING }),
    });
})(PutObjectRequest = exports.PutObjectRequest || (exports.PutObjectRequest = {}));
var PutObjectAclOutput;
(function (PutObjectAclOutput) {
    PutObjectAclOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectAclOutput = exports.PutObjectAclOutput || (exports.PutObjectAclOutput = {}));
var PutObjectAclRequest;
(function (PutObjectAclRequest) {
    PutObjectAclRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectAclRequest = exports.PutObjectAclRequest || (exports.PutObjectAclRequest = {}));
var PutObjectLegalHoldOutput;
(function (PutObjectLegalHoldOutput) {
    PutObjectLegalHoldOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectLegalHoldOutput = exports.PutObjectLegalHoldOutput || (exports.PutObjectLegalHoldOutput = {}));
var PutObjectLegalHoldRequest;
(function (PutObjectLegalHoldRequest) {
    PutObjectLegalHoldRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectLegalHoldRequest = exports.PutObjectLegalHoldRequest || (exports.PutObjectLegalHoldRequest = {}));
var PutObjectLockConfigurationOutput;
(function (PutObjectLockConfigurationOutput) {
    PutObjectLockConfigurationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectLockConfigurationOutput = exports.PutObjectLockConfigurationOutput || (exports.PutObjectLockConfigurationOutput = {}));
var PutObjectLockConfigurationRequest;
(function (PutObjectLockConfigurationRequest) {
    PutObjectLockConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectLockConfigurationRequest = exports.PutObjectLockConfigurationRequest || (exports.PutObjectLockConfigurationRequest = {}));
var PutObjectRetentionOutput;
(function (PutObjectRetentionOutput) {
    PutObjectRetentionOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectRetentionOutput = exports.PutObjectRetentionOutput || (exports.PutObjectRetentionOutput = {}));
var PutObjectRetentionRequest;
(function (PutObjectRetentionRequest) {
    PutObjectRetentionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectRetentionRequest = exports.PutObjectRetentionRequest || (exports.PutObjectRetentionRequest = {}));
var PutObjectTaggingOutput;
(function (PutObjectTaggingOutput) {
    PutObjectTaggingOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectTaggingOutput = exports.PutObjectTaggingOutput || (exports.PutObjectTaggingOutput = {}));
var PutObjectTaggingRequest;
(function (PutObjectTaggingRequest) {
    PutObjectTaggingRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectTaggingRequest = exports.PutObjectTaggingRequest || (exports.PutObjectTaggingRequest = {}));
var PutPublicAccessBlockRequest;
(function (PutPublicAccessBlockRequest) {
    PutPublicAccessBlockRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutPublicAccessBlockRequest = exports.PutPublicAccessBlockRequest || (exports.PutPublicAccessBlockRequest = {}));
var ObjectAlreadyInActiveTierError;
(function (ObjectAlreadyInActiveTierError) {
    ObjectAlreadyInActiveTierError.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ObjectAlreadyInActiveTierError = exports.ObjectAlreadyInActiveTierError || (exports.ObjectAlreadyInActiveTierError = {}));
var RestoreObjectOutput;
(function (RestoreObjectOutput) {
    RestoreObjectOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RestoreObjectOutput = exports.RestoreObjectOutput || (exports.RestoreObjectOutput = {}));
var GlacierJobParameters;
(function (GlacierJobParameters) {
    GlacierJobParameters.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GlacierJobParameters = exports.GlacierJobParameters || (exports.GlacierJobParameters = {}));
var Encryption;
(function (Encryption) {
    Encryption.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.KMSKeyId && { KMSKeyId: smithy_client_1.SENSITIVE_STRING }),
    });
})(Encryption = exports.Encryption || (exports.Encryption = {}));
//# sourceMappingURL=models_0.js.map