import { __assign } from "tslib";
import { SENSITIVE_STRING } from "@aws-sdk/smithy-client";
export var AbortIncompleteMultipartUpload;
(function (AbortIncompleteMultipartUpload) {
    AbortIncompleteMultipartUpload.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AbortIncompleteMultipartUpload || (AbortIncompleteMultipartUpload = {}));
export var AbortMultipartUploadOutput;
(function (AbortMultipartUploadOutput) {
    AbortMultipartUploadOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AbortMultipartUploadOutput || (AbortMultipartUploadOutput = {}));
export var AbortMultipartUploadRequest;
(function (AbortMultipartUploadRequest) {
    AbortMultipartUploadRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AbortMultipartUploadRequest || (AbortMultipartUploadRequest = {}));
export var NoSuchUpload;
(function (NoSuchUpload) {
    NoSuchUpload.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(NoSuchUpload || (NoSuchUpload = {}));
export var AccelerateConfiguration;
(function (AccelerateConfiguration) {
    AccelerateConfiguration.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AccelerateConfiguration || (AccelerateConfiguration = {}));
export var Grantee;
(function (Grantee) {
    Grantee.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Grantee || (Grantee = {}));
export var Grant;
(function (Grant) {
    Grant.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Grant || (Grant = {}));
export var Owner;
(function (Owner) {
    Owner.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Owner || (Owner = {}));
export var AccessControlPolicy;
(function (AccessControlPolicy) {
    AccessControlPolicy.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AccessControlPolicy || (AccessControlPolicy = {}));
export var AccessControlTranslation;
(function (AccessControlTranslation) {
    AccessControlTranslation.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AccessControlTranslation || (AccessControlTranslation = {}));
export var CompleteMultipartUploadOutput;
(function (CompleteMultipartUploadOutput) {
    CompleteMultipartUploadOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING }))); };
})(CompleteMultipartUploadOutput || (CompleteMultipartUploadOutput = {}));
export var CompletedPart;
(function (CompletedPart) {
    CompletedPart.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CompletedPart || (CompletedPart = {}));
export var CompletedMultipartUpload;
(function (CompletedMultipartUpload) {
    CompletedMultipartUpload.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CompletedMultipartUpload || (CompletedMultipartUpload = {}));
export var CompleteMultipartUploadRequest;
(function (CompleteMultipartUploadRequest) {
    CompleteMultipartUploadRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CompleteMultipartUploadRequest || (CompleteMultipartUploadRequest = {}));
export var CopyObjectResult;
(function (CopyObjectResult) {
    CopyObjectResult.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CopyObjectResult || (CopyObjectResult = {}));
export var CopyObjectOutput;
(function (CopyObjectOutput) {
    CopyObjectOutput.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign({}, obj), (obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING })), (obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: SENSITIVE_STRING }))); };
})(CopyObjectOutput || (CopyObjectOutput = {}));
export var CopyObjectRequest;
(function (CopyObjectRequest) {
    CopyObjectRequest.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign(__assign(__assign({}, obj), (obj.SSECustomerKey && { SSECustomerKey: SENSITIVE_STRING })), (obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING })), (obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: SENSITIVE_STRING })), (obj.CopySourceSSECustomerKey && { CopySourceSSECustomerKey: SENSITIVE_STRING }))); };
})(CopyObjectRequest || (CopyObjectRequest = {}));
export var ObjectNotInActiveTierError;
(function (ObjectNotInActiveTierError) {
    ObjectNotInActiveTierError.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ObjectNotInActiveTierError || (ObjectNotInActiveTierError = {}));
export var BucketAlreadyExists;
(function (BucketAlreadyExists) {
    BucketAlreadyExists.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BucketAlreadyExists || (BucketAlreadyExists = {}));
export var BucketAlreadyOwnedByYou;
(function (BucketAlreadyOwnedByYou) {
    BucketAlreadyOwnedByYou.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BucketAlreadyOwnedByYou || (BucketAlreadyOwnedByYou = {}));
export var CreateBucketOutput;
(function (CreateBucketOutput) {
    CreateBucketOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateBucketOutput || (CreateBucketOutput = {}));
export var CreateBucketConfiguration;
(function (CreateBucketConfiguration) {
    CreateBucketConfiguration.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateBucketConfiguration || (CreateBucketConfiguration = {}));
export var CreateBucketRequest;
(function (CreateBucketRequest) {
    CreateBucketRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateBucketRequest || (CreateBucketRequest = {}));
export var CreateMultipartUploadOutput;
(function (CreateMultipartUploadOutput) {
    CreateMultipartUploadOutput.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign({}, obj), (obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING })), (obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: SENSITIVE_STRING }))); };
})(CreateMultipartUploadOutput || (CreateMultipartUploadOutput = {}));
export var CreateMultipartUploadRequest;
(function (CreateMultipartUploadRequest) {
    CreateMultipartUploadRequest.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign(__assign({}, obj), (obj.SSECustomerKey && { SSECustomerKey: SENSITIVE_STRING })), (obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING })), (obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: SENSITIVE_STRING }))); };
})(CreateMultipartUploadRequest || (CreateMultipartUploadRequest = {}));
export var DeleteBucketRequest;
(function (DeleteBucketRequest) {
    DeleteBucketRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteBucketRequest || (DeleteBucketRequest = {}));
export var DeleteBucketAnalyticsConfigurationRequest;
(function (DeleteBucketAnalyticsConfigurationRequest) {
    DeleteBucketAnalyticsConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteBucketAnalyticsConfigurationRequest || (DeleteBucketAnalyticsConfigurationRequest = {}));
export var DeleteBucketCorsRequest;
(function (DeleteBucketCorsRequest) {
    DeleteBucketCorsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteBucketCorsRequest || (DeleteBucketCorsRequest = {}));
export var DeleteBucketEncryptionRequest;
(function (DeleteBucketEncryptionRequest) {
    DeleteBucketEncryptionRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteBucketEncryptionRequest || (DeleteBucketEncryptionRequest = {}));
export var DeleteBucketIntelligentTieringConfigurationRequest;
(function (DeleteBucketIntelligentTieringConfigurationRequest) {
    DeleteBucketIntelligentTieringConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteBucketIntelligentTieringConfigurationRequest || (DeleteBucketIntelligentTieringConfigurationRequest = {}));
export var DeleteBucketInventoryConfigurationRequest;
(function (DeleteBucketInventoryConfigurationRequest) {
    DeleteBucketInventoryConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteBucketInventoryConfigurationRequest || (DeleteBucketInventoryConfigurationRequest = {}));
export var DeleteBucketLifecycleRequest;
(function (DeleteBucketLifecycleRequest) {
    DeleteBucketLifecycleRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteBucketLifecycleRequest || (DeleteBucketLifecycleRequest = {}));
export var DeleteBucketMetricsConfigurationRequest;
(function (DeleteBucketMetricsConfigurationRequest) {
    DeleteBucketMetricsConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteBucketMetricsConfigurationRequest || (DeleteBucketMetricsConfigurationRequest = {}));
export var DeleteBucketOwnershipControlsRequest;
(function (DeleteBucketOwnershipControlsRequest) {
    DeleteBucketOwnershipControlsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteBucketOwnershipControlsRequest || (DeleteBucketOwnershipControlsRequest = {}));
export var DeleteBucketPolicyRequest;
(function (DeleteBucketPolicyRequest) {
    DeleteBucketPolicyRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteBucketPolicyRequest || (DeleteBucketPolicyRequest = {}));
export var DeleteBucketReplicationRequest;
(function (DeleteBucketReplicationRequest) {
    DeleteBucketReplicationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteBucketReplicationRequest || (DeleteBucketReplicationRequest = {}));
export var DeleteBucketTaggingRequest;
(function (DeleteBucketTaggingRequest) {
    DeleteBucketTaggingRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteBucketTaggingRequest || (DeleteBucketTaggingRequest = {}));
export var DeleteBucketWebsiteRequest;
(function (DeleteBucketWebsiteRequest) {
    DeleteBucketWebsiteRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteBucketWebsiteRequest || (DeleteBucketWebsiteRequest = {}));
export var DeleteObjectOutput;
(function (DeleteObjectOutput) {
    DeleteObjectOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteObjectOutput || (DeleteObjectOutput = {}));
export var DeleteObjectRequest;
(function (DeleteObjectRequest) {
    DeleteObjectRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteObjectRequest || (DeleteObjectRequest = {}));
export var DeletedObject;
(function (DeletedObject) {
    DeletedObject.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeletedObject || (DeletedObject = {}));
export var _Error;
(function (_Error) {
    _Error.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(_Error || (_Error = {}));
export var DeleteObjectsOutput;
(function (DeleteObjectsOutput) {
    DeleteObjectsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteObjectsOutput || (DeleteObjectsOutput = {}));
export var ObjectIdentifier;
(function (ObjectIdentifier) {
    ObjectIdentifier.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ObjectIdentifier || (ObjectIdentifier = {}));
export var Delete;
(function (Delete) {
    Delete.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Delete || (Delete = {}));
export var DeleteObjectsRequest;
(function (DeleteObjectsRequest) {
    DeleteObjectsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteObjectsRequest || (DeleteObjectsRequest = {}));
export var DeleteObjectTaggingOutput;
(function (DeleteObjectTaggingOutput) {
    DeleteObjectTaggingOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteObjectTaggingOutput || (DeleteObjectTaggingOutput = {}));
export var DeleteObjectTaggingRequest;
(function (DeleteObjectTaggingRequest) {
    DeleteObjectTaggingRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteObjectTaggingRequest || (DeleteObjectTaggingRequest = {}));
export var DeletePublicAccessBlockRequest;
(function (DeletePublicAccessBlockRequest) {
    DeletePublicAccessBlockRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeletePublicAccessBlockRequest || (DeletePublicAccessBlockRequest = {}));
export var GetBucketAccelerateConfigurationOutput;
(function (GetBucketAccelerateConfigurationOutput) {
    GetBucketAccelerateConfigurationOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketAccelerateConfigurationOutput || (GetBucketAccelerateConfigurationOutput = {}));
export var GetBucketAccelerateConfigurationRequest;
(function (GetBucketAccelerateConfigurationRequest) {
    GetBucketAccelerateConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketAccelerateConfigurationRequest || (GetBucketAccelerateConfigurationRequest = {}));
export var GetBucketAclOutput;
(function (GetBucketAclOutput) {
    GetBucketAclOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketAclOutput || (GetBucketAclOutput = {}));
export var GetBucketAclRequest;
(function (GetBucketAclRequest) {
    GetBucketAclRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketAclRequest || (GetBucketAclRequest = {}));
export var Tag;
(function (Tag) {
    Tag.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Tag || (Tag = {}));
export var AnalyticsAndOperator;
(function (AnalyticsAndOperator) {
    AnalyticsAndOperator.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AnalyticsAndOperator || (AnalyticsAndOperator = {}));
export var AnalyticsFilter;
(function (AnalyticsFilter) {
    AnalyticsFilter.visit = function (value, visitor) {
        if (value.Prefix !== undefined)
            return visitor.Prefix(value.Prefix);
        if (value.Tag !== undefined)
            return visitor.Tag(value.Tag);
        if (value.And !== undefined)
            return visitor.And(value.And);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    AnalyticsFilter.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.Prefix !== undefined)
            return { Prefix: obj.Prefix };
        if (obj.Tag !== undefined)
            return { Tag: Tag.filterSensitiveLog(obj.Tag) };
        if (obj.And !== undefined)
            return { And: AnalyticsAndOperator.filterSensitiveLog(obj.And) };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = "UNKNOWN", _a;
    };
})(AnalyticsFilter || (AnalyticsFilter = {}));
export var AnalyticsS3BucketDestination;
(function (AnalyticsS3BucketDestination) {
    AnalyticsS3BucketDestination.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AnalyticsS3BucketDestination || (AnalyticsS3BucketDestination = {}));
export var AnalyticsExportDestination;
(function (AnalyticsExportDestination) {
    AnalyticsExportDestination.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AnalyticsExportDestination || (AnalyticsExportDestination = {}));
export var StorageClassAnalysisDataExport;
(function (StorageClassAnalysisDataExport) {
    StorageClassAnalysisDataExport.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StorageClassAnalysisDataExport || (StorageClassAnalysisDataExport = {}));
export var StorageClassAnalysis;
(function (StorageClassAnalysis) {
    StorageClassAnalysis.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StorageClassAnalysis || (StorageClassAnalysis = {}));
export var AnalyticsConfiguration;
(function (AnalyticsConfiguration) {
    AnalyticsConfiguration.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Filter && { Filter: AnalyticsFilter.filterSensitiveLog(obj.Filter) }))); };
})(AnalyticsConfiguration || (AnalyticsConfiguration = {}));
export var GetBucketAnalyticsConfigurationOutput;
(function (GetBucketAnalyticsConfigurationOutput) {
    GetBucketAnalyticsConfigurationOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.AnalyticsConfiguration && {
        AnalyticsConfiguration: AnalyticsConfiguration.filterSensitiveLog(obj.AnalyticsConfiguration),
    }))); };
})(GetBucketAnalyticsConfigurationOutput || (GetBucketAnalyticsConfigurationOutput = {}));
export var GetBucketAnalyticsConfigurationRequest;
(function (GetBucketAnalyticsConfigurationRequest) {
    GetBucketAnalyticsConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketAnalyticsConfigurationRequest || (GetBucketAnalyticsConfigurationRequest = {}));
export var CORSRule;
(function (CORSRule) {
    CORSRule.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CORSRule || (CORSRule = {}));
export var GetBucketCorsOutput;
(function (GetBucketCorsOutput) {
    GetBucketCorsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketCorsOutput || (GetBucketCorsOutput = {}));
export var GetBucketCorsRequest;
(function (GetBucketCorsRequest) {
    GetBucketCorsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketCorsRequest || (GetBucketCorsRequest = {}));
export var ServerSideEncryptionByDefault;
(function (ServerSideEncryptionByDefault) {
    ServerSideEncryptionByDefault.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.KMSMasterKeyID && { KMSMasterKeyID: SENSITIVE_STRING }))); };
})(ServerSideEncryptionByDefault || (ServerSideEncryptionByDefault = {}));
export var ServerSideEncryptionRule;
(function (ServerSideEncryptionRule) {
    ServerSideEncryptionRule.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.ApplyServerSideEncryptionByDefault && {
        ApplyServerSideEncryptionByDefault: ServerSideEncryptionByDefault.filterSensitiveLog(obj.ApplyServerSideEncryptionByDefault),
    }))); };
})(ServerSideEncryptionRule || (ServerSideEncryptionRule = {}));
export var ServerSideEncryptionConfiguration;
(function (ServerSideEncryptionConfiguration) {
    ServerSideEncryptionConfiguration.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Rules && { Rules: obj.Rules.map(function (item) { return ServerSideEncryptionRule.filterSensitiveLog(item); }) }))); };
})(ServerSideEncryptionConfiguration || (ServerSideEncryptionConfiguration = {}));
export var GetBucketEncryptionOutput;
(function (GetBucketEncryptionOutput) {
    GetBucketEncryptionOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.ServerSideEncryptionConfiguration && {
        ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration.filterSensitiveLog(obj.ServerSideEncryptionConfiguration),
    }))); };
})(GetBucketEncryptionOutput || (GetBucketEncryptionOutput = {}));
export var GetBucketEncryptionRequest;
(function (GetBucketEncryptionRequest) {
    GetBucketEncryptionRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketEncryptionRequest || (GetBucketEncryptionRequest = {}));
export var IntelligentTieringAndOperator;
(function (IntelligentTieringAndOperator) {
    IntelligentTieringAndOperator.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IntelligentTieringAndOperator || (IntelligentTieringAndOperator = {}));
export var IntelligentTieringFilter;
(function (IntelligentTieringFilter) {
    IntelligentTieringFilter.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IntelligentTieringFilter || (IntelligentTieringFilter = {}));
export var Tiering;
(function (Tiering) {
    Tiering.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Tiering || (Tiering = {}));
export var IntelligentTieringConfiguration;
(function (IntelligentTieringConfiguration) {
    IntelligentTieringConfiguration.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IntelligentTieringConfiguration || (IntelligentTieringConfiguration = {}));
export var GetBucketIntelligentTieringConfigurationOutput;
(function (GetBucketIntelligentTieringConfigurationOutput) {
    GetBucketIntelligentTieringConfigurationOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketIntelligentTieringConfigurationOutput || (GetBucketIntelligentTieringConfigurationOutput = {}));
export var GetBucketIntelligentTieringConfigurationRequest;
(function (GetBucketIntelligentTieringConfigurationRequest) {
    GetBucketIntelligentTieringConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketIntelligentTieringConfigurationRequest || (GetBucketIntelligentTieringConfigurationRequest = {}));
export var SSEKMS;
(function (SSEKMS) {
    SSEKMS.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.KeyId && { KeyId: SENSITIVE_STRING }))); };
})(SSEKMS || (SSEKMS = {}));
export var SSES3;
(function (SSES3) {
    SSES3.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SSES3 || (SSES3 = {}));
export var InventoryEncryption;
(function (InventoryEncryption) {
    InventoryEncryption.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.SSEKMS && { SSEKMS: SSEKMS.filterSensitiveLog(obj.SSEKMS) }))); };
})(InventoryEncryption || (InventoryEncryption = {}));
export var InventoryS3BucketDestination;
(function (InventoryS3BucketDestination) {
    InventoryS3BucketDestination.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Encryption && { Encryption: InventoryEncryption.filterSensitiveLog(obj.Encryption) }))); };
})(InventoryS3BucketDestination || (InventoryS3BucketDestination = {}));
export var InventoryDestination;
(function (InventoryDestination) {
    InventoryDestination.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.S3BucketDestination && {
        S3BucketDestination: InventoryS3BucketDestination.filterSensitiveLog(obj.S3BucketDestination),
    }))); };
})(InventoryDestination || (InventoryDestination = {}));
export var InventoryFilter;
(function (InventoryFilter) {
    InventoryFilter.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InventoryFilter || (InventoryFilter = {}));
export var InventorySchedule;
(function (InventorySchedule) {
    InventorySchedule.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InventorySchedule || (InventorySchedule = {}));
export var InventoryConfiguration;
(function (InventoryConfiguration) {
    InventoryConfiguration.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Destination && { Destination: InventoryDestination.filterSensitiveLog(obj.Destination) }))); };
})(InventoryConfiguration || (InventoryConfiguration = {}));
export var GetBucketInventoryConfigurationOutput;
(function (GetBucketInventoryConfigurationOutput) {
    GetBucketInventoryConfigurationOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.InventoryConfiguration && {
        InventoryConfiguration: InventoryConfiguration.filterSensitiveLog(obj.InventoryConfiguration),
    }))); };
})(GetBucketInventoryConfigurationOutput || (GetBucketInventoryConfigurationOutput = {}));
export var GetBucketInventoryConfigurationRequest;
(function (GetBucketInventoryConfigurationRequest) {
    GetBucketInventoryConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketInventoryConfigurationRequest || (GetBucketInventoryConfigurationRequest = {}));
export var LifecycleExpiration;
(function (LifecycleExpiration) {
    LifecycleExpiration.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LifecycleExpiration || (LifecycleExpiration = {}));
export var LifecycleRuleAndOperator;
(function (LifecycleRuleAndOperator) {
    LifecycleRuleAndOperator.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LifecycleRuleAndOperator || (LifecycleRuleAndOperator = {}));
export var LifecycleRuleFilter;
(function (LifecycleRuleFilter) {
    LifecycleRuleFilter.visit = function (value, visitor) {
        if (value.Prefix !== undefined)
            return visitor.Prefix(value.Prefix);
        if (value.Tag !== undefined)
            return visitor.Tag(value.Tag);
        if (value.And !== undefined)
            return visitor.And(value.And);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    LifecycleRuleFilter.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.Prefix !== undefined)
            return { Prefix: obj.Prefix };
        if (obj.Tag !== undefined)
            return { Tag: Tag.filterSensitiveLog(obj.Tag) };
        if (obj.And !== undefined)
            return { And: LifecycleRuleAndOperator.filterSensitiveLog(obj.And) };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = "UNKNOWN", _a;
    };
})(LifecycleRuleFilter || (LifecycleRuleFilter = {}));
export var NoncurrentVersionExpiration;
(function (NoncurrentVersionExpiration) {
    NoncurrentVersionExpiration.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(NoncurrentVersionExpiration || (NoncurrentVersionExpiration = {}));
export var NoncurrentVersionTransition;
(function (NoncurrentVersionTransition) {
    NoncurrentVersionTransition.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(NoncurrentVersionTransition || (NoncurrentVersionTransition = {}));
export var Transition;
(function (Transition) {
    Transition.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Transition || (Transition = {}));
export var LifecycleRule;
(function (LifecycleRule) {
    LifecycleRule.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Filter && { Filter: LifecycleRuleFilter.filterSensitiveLog(obj.Filter) }))); };
})(LifecycleRule || (LifecycleRule = {}));
export var GetBucketLifecycleConfigurationOutput;
(function (GetBucketLifecycleConfigurationOutput) {
    GetBucketLifecycleConfigurationOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Rules && { Rules: obj.Rules.map(function (item) { return LifecycleRule.filterSensitiveLog(item); }) }))); };
})(GetBucketLifecycleConfigurationOutput || (GetBucketLifecycleConfigurationOutput = {}));
export var GetBucketLifecycleConfigurationRequest;
(function (GetBucketLifecycleConfigurationRequest) {
    GetBucketLifecycleConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketLifecycleConfigurationRequest || (GetBucketLifecycleConfigurationRequest = {}));
export var GetBucketLocationOutput;
(function (GetBucketLocationOutput) {
    GetBucketLocationOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketLocationOutput || (GetBucketLocationOutput = {}));
export var GetBucketLocationRequest;
(function (GetBucketLocationRequest) {
    GetBucketLocationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketLocationRequest || (GetBucketLocationRequest = {}));
export var TargetGrant;
(function (TargetGrant) {
    TargetGrant.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TargetGrant || (TargetGrant = {}));
export var LoggingEnabled;
(function (LoggingEnabled) {
    LoggingEnabled.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LoggingEnabled || (LoggingEnabled = {}));
export var GetBucketLoggingOutput;
(function (GetBucketLoggingOutput) {
    GetBucketLoggingOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketLoggingOutput || (GetBucketLoggingOutput = {}));
export var GetBucketLoggingRequest;
(function (GetBucketLoggingRequest) {
    GetBucketLoggingRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketLoggingRequest || (GetBucketLoggingRequest = {}));
export var MetricsAndOperator;
(function (MetricsAndOperator) {
    MetricsAndOperator.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(MetricsAndOperator || (MetricsAndOperator = {}));
export var MetricsFilter;
(function (MetricsFilter) {
    MetricsFilter.visit = function (value, visitor) {
        if (value.Prefix !== undefined)
            return visitor.Prefix(value.Prefix);
        if (value.Tag !== undefined)
            return visitor.Tag(value.Tag);
        if (value.And !== undefined)
            return visitor.And(value.And);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    MetricsFilter.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.Prefix !== undefined)
            return { Prefix: obj.Prefix };
        if (obj.Tag !== undefined)
            return { Tag: Tag.filterSensitiveLog(obj.Tag) };
        if (obj.And !== undefined)
            return { And: MetricsAndOperator.filterSensitiveLog(obj.And) };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = "UNKNOWN", _a;
    };
})(MetricsFilter || (MetricsFilter = {}));
export var MetricsConfiguration;
(function (MetricsConfiguration) {
    MetricsConfiguration.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Filter && { Filter: MetricsFilter.filterSensitiveLog(obj.Filter) }))); };
})(MetricsConfiguration || (MetricsConfiguration = {}));
export var GetBucketMetricsConfigurationOutput;
(function (GetBucketMetricsConfigurationOutput) {
    GetBucketMetricsConfigurationOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.MetricsConfiguration && {
        MetricsConfiguration: MetricsConfiguration.filterSensitiveLog(obj.MetricsConfiguration),
    }))); };
})(GetBucketMetricsConfigurationOutput || (GetBucketMetricsConfigurationOutput = {}));
export var GetBucketMetricsConfigurationRequest;
(function (GetBucketMetricsConfigurationRequest) {
    GetBucketMetricsConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketMetricsConfigurationRequest || (GetBucketMetricsConfigurationRequest = {}));
export var GetBucketNotificationConfigurationRequest;
(function (GetBucketNotificationConfigurationRequest) {
    GetBucketNotificationConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketNotificationConfigurationRequest || (GetBucketNotificationConfigurationRequest = {}));
export var FilterRule;
(function (FilterRule) {
    FilterRule.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(FilterRule || (FilterRule = {}));
export var S3KeyFilter;
(function (S3KeyFilter) {
    S3KeyFilter.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(S3KeyFilter || (S3KeyFilter = {}));
export var NotificationConfigurationFilter;
(function (NotificationConfigurationFilter) {
    NotificationConfigurationFilter.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(NotificationConfigurationFilter || (NotificationConfigurationFilter = {}));
export var LambdaFunctionConfiguration;
(function (LambdaFunctionConfiguration) {
    LambdaFunctionConfiguration.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LambdaFunctionConfiguration || (LambdaFunctionConfiguration = {}));
export var QueueConfiguration;
(function (QueueConfiguration) {
    QueueConfiguration.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(QueueConfiguration || (QueueConfiguration = {}));
export var TopicConfiguration;
(function (TopicConfiguration) {
    TopicConfiguration.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TopicConfiguration || (TopicConfiguration = {}));
export var NotificationConfiguration;
(function (NotificationConfiguration) {
    NotificationConfiguration.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(NotificationConfiguration || (NotificationConfiguration = {}));
export var OwnershipControlsRule;
(function (OwnershipControlsRule) {
    OwnershipControlsRule.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(OwnershipControlsRule || (OwnershipControlsRule = {}));
export var OwnershipControls;
(function (OwnershipControls) {
    OwnershipControls.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(OwnershipControls || (OwnershipControls = {}));
export var GetBucketOwnershipControlsOutput;
(function (GetBucketOwnershipControlsOutput) {
    GetBucketOwnershipControlsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketOwnershipControlsOutput || (GetBucketOwnershipControlsOutput = {}));
export var GetBucketOwnershipControlsRequest;
(function (GetBucketOwnershipControlsRequest) {
    GetBucketOwnershipControlsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketOwnershipControlsRequest || (GetBucketOwnershipControlsRequest = {}));
export var GetBucketPolicyOutput;
(function (GetBucketPolicyOutput) {
    GetBucketPolicyOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketPolicyOutput || (GetBucketPolicyOutput = {}));
export var GetBucketPolicyRequest;
(function (GetBucketPolicyRequest) {
    GetBucketPolicyRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketPolicyRequest || (GetBucketPolicyRequest = {}));
export var PolicyStatus;
(function (PolicyStatus) {
    PolicyStatus.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PolicyStatus || (PolicyStatus = {}));
export var GetBucketPolicyStatusOutput;
(function (GetBucketPolicyStatusOutput) {
    GetBucketPolicyStatusOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketPolicyStatusOutput || (GetBucketPolicyStatusOutput = {}));
export var GetBucketPolicyStatusRequest;
(function (GetBucketPolicyStatusRequest) {
    GetBucketPolicyStatusRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketPolicyStatusRequest || (GetBucketPolicyStatusRequest = {}));
export var DeleteMarkerReplication;
(function (DeleteMarkerReplication) {
    DeleteMarkerReplication.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteMarkerReplication || (DeleteMarkerReplication = {}));
export var EncryptionConfiguration;
(function (EncryptionConfiguration) {
    EncryptionConfiguration.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EncryptionConfiguration || (EncryptionConfiguration = {}));
export var ReplicationTimeValue;
(function (ReplicationTimeValue) {
    ReplicationTimeValue.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ReplicationTimeValue || (ReplicationTimeValue = {}));
export var Metrics;
(function (Metrics) {
    Metrics.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Metrics || (Metrics = {}));
export var ReplicationTime;
(function (ReplicationTime) {
    ReplicationTime.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ReplicationTime || (ReplicationTime = {}));
export var Destination;
(function (Destination) {
    Destination.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Destination || (Destination = {}));
export var ExistingObjectReplication;
(function (ExistingObjectReplication) {
    ExistingObjectReplication.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ExistingObjectReplication || (ExistingObjectReplication = {}));
export var ReplicationRuleAndOperator;
(function (ReplicationRuleAndOperator) {
    ReplicationRuleAndOperator.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ReplicationRuleAndOperator || (ReplicationRuleAndOperator = {}));
export var ReplicationRuleFilter;
(function (ReplicationRuleFilter) {
    ReplicationRuleFilter.visit = function (value, visitor) {
        if (value.Prefix !== undefined)
            return visitor.Prefix(value.Prefix);
        if (value.Tag !== undefined)
            return visitor.Tag(value.Tag);
        if (value.And !== undefined)
            return visitor.And(value.And);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    ReplicationRuleFilter.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.Prefix !== undefined)
            return { Prefix: obj.Prefix };
        if (obj.Tag !== undefined)
            return { Tag: Tag.filterSensitiveLog(obj.Tag) };
        if (obj.And !== undefined)
            return { And: ReplicationRuleAndOperator.filterSensitiveLog(obj.And) };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = "UNKNOWN", _a;
    };
})(ReplicationRuleFilter || (ReplicationRuleFilter = {}));
export var ReplicaModifications;
(function (ReplicaModifications) {
    ReplicaModifications.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ReplicaModifications || (ReplicaModifications = {}));
export var SseKmsEncryptedObjects;
(function (SseKmsEncryptedObjects) {
    SseKmsEncryptedObjects.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SseKmsEncryptedObjects || (SseKmsEncryptedObjects = {}));
export var SourceSelectionCriteria;
(function (SourceSelectionCriteria) {
    SourceSelectionCriteria.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SourceSelectionCriteria || (SourceSelectionCriteria = {}));
export var ReplicationRule;
(function (ReplicationRule) {
    ReplicationRule.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Filter && { Filter: ReplicationRuleFilter.filterSensitiveLog(obj.Filter) }))); };
})(ReplicationRule || (ReplicationRule = {}));
export var ReplicationConfiguration;
(function (ReplicationConfiguration) {
    ReplicationConfiguration.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Rules && { Rules: obj.Rules.map(function (item) { return ReplicationRule.filterSensitiveLog(item); }) }))); };
})(ReplicationConfiguration || (ReplicationConfiguration = {}));
export var GetBucketReplicationOutput;
(function (GetBucketReplicationOutput) {
    GetBucketReplicationOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.ReplicationConfiguration && {
        ReplicationConfiguration: ReplicationConfiguration.filterSensitiveLog(obj.ReplicationConfiguration),
    }))); };
})(GetBucketReplicationOutput || (GetBucketReplicationOutput = {}));
export var GetBucketReplicationRequest;
(function (GetBucketReplicationRequest) {
    GetBucketReplicationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketReplicationRequest || (GetBucketReplicationRequest = {}));
export var GetBucketRequestPaymentOutput;
(function (GetBucketRequestPaymentOutput) {
    GetBucketRequestPaymentOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketRequestPaymentOutput || (GetBucketRequestPaymentOutput = {}));
export var GetBucketRequestPaymentRequest;
(function (GetBucketRequestPaymentRequest) {
    GetBucketRequestPaymentRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketRequestPaymentRequest || (GetBucketRequestPaymentRequest = {}));
export var GetBucketTaggingOutput;
(function (GetBucketTaggingOutput) {
    GetBucketTaggingOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketTaggingOutput || (GetBucketTaggingOutput = {}));
export var GetBucketTaggingRequest;
(function (GetBucketTaggingRequest) {
    GetBucketTaggingRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketTaggingRequest || (GetBucketTaggingRequest = {}));
export var GetBucketVersioningOutput;
(function (GetBucketVersioningOutput) {
    GetBucketVersioningOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketVersioningOutput || (GetBucketVersioningOutput = {}));
export var GetBucketVersioningRequest;
(function (GetBucketVersioningRequest) {
    GetBucketVersioningRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketVersioningRequest || (GetBucketVersioningRequest = {}));
export var ErrorDocument;
(function (ErrorDocument) {
    ErrorDocument.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ErrorDocument || (ErrorDocument = {}));
export var IndexDocument;
(function (IndexDocument) {
    IndexDocument.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IndexDocument || (IndexDocument = {}));
export var RedirectAllRequestsTo;
(function (RedirectAllRequestsTo) {
    RedirectAllRequestsTo.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RedirectAllRequestsTo || (RedirectAllRequestsTo = {}));
export var Condition;
(function (Condition) {
    Condition.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Condition || (Condition = {}));
export var Redirect;
(function (Redirect) {
    Redirect.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Redirect || (Redirect = {}));
export var RoutingRule;
(function (RoutingRule) {
    RoutingRule.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RoutingRule || (RoutingRule = {}));
export var GetBucketWebsiteOutput;
(function (GetBucketWebsiteOutput) {
    GetBucketWebsiteOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketWebsiteOutput || (GetBucketWebsiteOutput = {}));
export var GetBucketWebsiteRequest;
(function (GetBucketWebsiteRequest) {
    GetBucketWebsiteRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBucketWebsiteRequest || (GetBucketWebsiteRequest = {}));
export var GetObjectOutput;
(function (GetObjectOutput) {
    GetObjectOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING }))); };
})(GetObjectOutput || (GetObjectOutput = {}));
export var GetObjectRequest;
(function (GetObjectRequest) {
    GetObjectRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.SSECustomerKey && { SSECustomerKey: SENSITIVE_STRING }))); };
})(GetObjectRequest || (GetObjectRequest = {}));
export var InvalidObjectState;
(function (InvalidObjectState) {
    InvalidObjectState.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidObjectState || (InvalidObjectState = {}));
export var NoSuchKey;
(function (NoSuchKey) {
    NoSuchKey.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(NoSuchKey || (NoSuchKey = {}));
export var GetObjectAclOutput;
(function (GetObjectAclOutput) {
    GetObjectAclOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetObjectAclOutput || (GetObjectAclOutput = {}));
export var GetObjectAclRequest;
(function (GetObjectAclRequest) {
    GetObjectAclRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetObjectAclRequest || (GetObjectAclRequest = {}));
export var ObjectLockLegalHold;
(function (ObjectLockLegalHold) {
    ObjectLockLegalHold.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ObjectLockLegalHold || (ObjectLockLegalHold = {}));
export var GetObjectLegalHoldOutput;
(function (GetObjectLegalHoldOutput) {
    GetObjectLegalHoldOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetObjectLegalHoldOutput || (GetObjectLegalHoldOutput = {}));
export var GetObjectLegalHoldRequest;
(function (GetObjectLegalHoldRequest) {
    GetObjectLegalHoldRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetObjectLegalHoldRequest || (GetObjectLegalHoldRequest = {}));
export var DefaultRetention;
(function (DefaultRetention) {
    DefaultRetention.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DefaultRetention || (DefaultRetention = {}));
export var ObjectLockRule;
(function (ObjectLockRule) {
    ObjectLockRule.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ObjectLockRule || (ObjectLockRule = {}));
export var ObjectLockConfiguration;
(function (ObjectLockConfiguration) {
    ObjectLockConfiguration.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ObjectLockConfiguration || (ObjectLockConfiguration = {}));
export var GetObjectLockConfigurationOutput;
(function (GetObjectLockConfigurationOutput) {
    GetObjectLockConfigurationOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetObjectLockConfigurationOutput || (GetObjectLockConfigurationOutput = {}));
export var GetObjectLockConfigurationRequest;
(function (GetObjectLockConfigurationRequest) {
    GetObjectLockConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetObjectLockConfigurationRequest || (GetObjectLockConfigurationRequest = {}));
export var ObjectLockRetention;
(function (ObjectLockRetention) {
    ObjectLockRetention.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ObjectLockRetention || (ObjectLockRetention = {}));
export var GetObjectRetentionOutput;
(function (GetObjectRetentionOutput) {
    GetObjectRetentionOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetObjectRetentionOutput || (GetObjectRetentionOutput = {}));
export var GetObjectRetentionRequest;
(function (GetObjectRetentionRequest) {
    GetObjectRetentionRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetObjectRetentionRequest || (GetObjectRetentionRequest = {}));
export var GetObjectTaggingOutput;
(function (GetObjectTaggingOutput) {
    GetObjectTaggingOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetObjectTaggingOutput || (GetObjectTaggingOutput = {}));
export var GetObjectTaggingRequest;
(function (GetObjectTaggingRequest) {
    GetObjectTaggingRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetObjectTaggingRequest || (GetObjectTaggingRequest = {}));
export var GetObjectTorrentOutput;
(function (GetObjectTorrentOutput) {
    GetObjectTorrentOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetObjectTorrentOutput || (GetObjectTorrentOutput = {}));
export var GetObjectTorrentRequest;
(function (GetObjectTorrentRequest) {
    GetObjectTorrentRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetObjectTorrentRequest || (GetObjectTorrentRequest = {}));
export var PublicAccessBlockConfiguration;
(function (PublicAccessBlockConfiguration) {
    PublicAccessBlockConfiguration.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PublicAccessBlockConfiguration || (PublicAccessBlockConfiguration = {}));
export var GetPublicAccessBlockOutput;
(function (GetPublicAccessBlockOutput) {
    GetPublicAccessBlockOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetPublicAccessBlockOutput || (GetPublicAccessBlockOutput = {}));
export var GetPublicAccessBlockRequest;
(function (GetPublicAccessBlockRequest) {
    GetPublicAccessBlockRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetPublicAccessBlockRequest || (GetPublicAccessBlockRequest = {}));
export var HeadBucketRequest;
(function (HeadBucketRequest) {
    HeadBucketRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(HeadBucketRequest || (HeadBucketRequest = {}));
export var NoSuchBucket;
(function (NoSuchBucket) {
    NoSuchBucket.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(NoSuchBucket || (NoSuchBucket = {}));
export var HeadObjectOutput;
(function (HeadObjectOutput) {
    HeadObjectOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING }))); };
})(HeadObjectOutput || (HeadObjectOutput = {}));
export var HeadObjectRequest;
(function (HeadObjectRequest) {
    HeadObjectRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.SSECustomerKey && { SSECustomerKey: SENSITIVE_STRING }))); };
})(HeadObjectRequest || (HeadObjectRequest = {}));
export var ListBucketAnalyticsConfigurationsOutput;
(function (ListBucketAnalyticsConfigurationsOutput) {
    ListBucketAnalyticsConfigurationsOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.AnalyticsConfigurationList && {
        AnalyticsConfigurationList: obj.AnalyticsConfigurationList.map(function (item) {
            return AnalyticsConfiguration.filterSensitiveLog(item);
        }),
    }))); };
})(ListBucketAnalyticsConfigurationsOutput || (ListBucketAnalyticsConfigurationsOutput = {}));
export var ListBucketAnalyticsConfigurationsRequest;
(function (ListBucketAnalyticsConfigurationsRequest) {
    ListBucketAnalyticsConfigurationsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListBucketAnalyticsConfigurationsRequest || (ListBucketAnalyticsConfigurationsRequest = {}));
export var ListBucketIntelligentTieringConfigurationsOutput;
(function (ListBucketIntelligentTieringConfigurationsOutput) {
    ListBucketIntelligentTieringConfigurationsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListBucketIntelligentTieringConfigurationsOutput || (ListBucketIntelligentTieringConfigurationsOutput = {}));
export var ListBucketIntelligentTieringConfigurationsRequest;
(function (ListBucketIntelligentTieringConfigurationsRequest) {
    ListBucketIntelligentTieringConfigurationsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListBucketIntelligentTieringConfigurationsRequest || (ListBucketIntelligentTieringConfigurationsRequest = {}));
export var ListBucketInventoryConfigurationsOutput;
(function (ListBucketInventoryConfigurationsOutput) {
    ListBucketInventoryConfigurationsOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.InventoryConfigurationList && {
        InventoryConfigurationList: obj.InventoryConfigurationList.map(function (item) {
            return InventoryConfiguration.filterSensitiveLog(item);
        }),
    }))); };
})(ListBucketInventoryConfigurationsOutput || (ListBucketInventoryConfigurationsOutput = {}));
export var ListBucketInventoryConfigurationsRequest;
(function (ListBucketInventoryConfigurationsRequest) {
    ListBucketInventoryConfigurationsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListBucketInventoryConfigurationsRequest || (ListBucketInventoryConfigurationsRequest = {}));
export var ListBucketMetricsConfigurationsOutput;
(function (ListBucketMetricsConfigurationsOutput) {
    ListBucketMetricsConfigurationsOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.MetricsConfigurationList && {
        MetricsConfigurationList: obj.MetricsConfigurationList.map(function (item) {
            return MetricsConfiguration.filterSensitiveLog(item);
        }),
    }))); };
})(ListBucketMetricsConfigurationsOutput || (ListBucketMetricsConfigurationsOutput = {}));
export var ListBucketMetricsConfigurationsRequest;
(function (ListBucketMetricsConfigurationsRequest) {
    ListBucketMetricsConfigurationsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListBucketMetricsConfigurationsRequest || (ListBucketMetricsConfigurationsRequest = {}));
export var Bucket;
(function (Bucket) {
    Bucket.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Bucket || (Bucket = {}));
export var ListBucketsOutput;
(function (ListBucketsOutput) {
    ListBucketsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListBucketsOutput || (ListBucketsOutput = {}));
export var CommonPrefix;
(function (CommonPrefix) {
    CommonPrefix.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CommonPrefix || (CommonPrefix = {}));
export var Initiator;
(function (Initiator) {
    Initiator.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Initiator || (Initiator = {}));
export var MultipartUpload;
(function (MultipartUpload) {
    MultipartUpload.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(MultipartUpload || (MultipartUpload = {}));
export var ListMultipartUploadsOutput;
(function (ListMultipartUploadsOutput) {
    ListMultipartUploadsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListMultipartUploadsOutput || (ListMultipartUploadsOutput = {}));
export var ListMultipartUploadsRequest;
(function (ListMultipartUploadsRequest) {
    ListMultipartUploadsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListMultipartUploadsRequest || (ListMultipartUploadsRequest = {}));
export var _Object;
(function (_Object) {
    _Object.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(_Object || (_Object = {}));
export var ListObjectsOutput;
(function (ListObjectsOutput) {
    ListObjectsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListObjectsOutput || (ListObjectsOutput = {}));
export var ListObjectsRequest;
(function (ListObjectsRequest) {
    ListObjectsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListObjectsRequest || (ListObjectsRequest = {}));
export var ListObjectsV2Output;
(function (ListObjectsV2Output) {
    ListObjectsV2Output.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListObjectsV2Output || (ListObjectsV2Output = {}));
export var ListObjectsV2Request;
(function (ListObjectsV2Request) {
    ListObjectsV2Request.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListObjectsV2Request || (ListObjectsV2Request = {}));
export var DeleteMarkerEntry;
(function (DeleteMarkerEntry) {
    DeleteMarkerEntry.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteMarkerEntry || (DeleteMarkerEntry = {}));
export var ObjectVersion;
(function (ObjectVersion) {
    ObjectVersion.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ObjectVersion || (ObjectVersion = {}));
export var ListObjectVersionsOutput;
(function (ListObjectVersionsOutput) {
    ListObjectVersionsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListObjectVersionsOutput || (ListObjectVersionsOutput = {}));
export var ListObjectVersionsRequest;
(function (ListObjectVersionsRequest) {
    ListObjectVersionsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListObjectVersionsRequest || (ListObjectVersionsRequest = {}));
export var Part;
(function (Part) {
    Part.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Part || (Part = {}));
export var ListPartsOutput;
(function (ListPartsOutput) {
    ListPartsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListPartsOutput || (ListPartsOutput = {}));
export var ListPartsRequest;
(function (ListPartsRequest) {
    ListPartsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListPartsRequest || (ListPartsRequest = {}));
export var PutBucketAccelerateConfigurationRequest;
(function (PutBucketAccelerateConfigurationRequest) {
    PutBucketAccelerateConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutBucketAccelerateConfigurationRequest || (PutBucketAccelerateConfigurationRequest = {}));
export var PutBucketAclRequest;
(function (PutBucketAclRequest) {
    PutBucketAclRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutBucketAclRequest || (PutBucketAclRequest = {}));
export var PutBucketAnalyticsConfigurationRequest;
(function (PutBucketAnalyticsConfigurationRequest) {
    PutBucketAnalyticsConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.AnalyticsConfiguration && {
        AnalyticsConfiguration: AnalyticsConfiguration.filterSensitiveLog(obj.AnalyticsConfiguration),
    }))); };
})(PutBucketAnalyticsConfigurationRequest || (PutBucketAnalyticsConfigurationRequest = {}));
export var CORSConfiguration;
(function (CORSConfiguration) {
    CORSConfiguration.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CORSConfiguration || (CORSConfiguration = {}));
export var PutBucketCorsRequest;
(function (PutBucketCorsRequest) {
    PutBucketCorsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutBucketCorsRequest || (PutBucketCorsRequest = {}));
export var PutBucketEncryptionRequest;
(function (PutBucketEncryptionRequest) {
    PutBucketEncryptionRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.ServerSideEncryptionConfiguration && {
        ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration.filterSensitiveLog(obj.ServerSideEncryptionConfiguration),
    }))); };
})(PutBucketEncryptionRequest || (PutBucketEncryptionRequest = {}));
export var PutBucketIntelligentTieringConfigurationRequest;
(function (PutBucketIntelligentTieringConfigurationRequest) {
    PutBucketIntelligentTieringConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutBucketIntelligentTieringConfigurationRequest || (PutBucketIntelligentTieringConfigurationRequest = {}));
export var PutBucketInventoryConfigurationRequest;
(function (PutBucketInventoryConfigurationRequest) {
    PutBucketInventoryConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.InventoryConfiguration && {
        InventoryConfiguration: InventoryConfiguration.filterSensitiveLog(obj.InventoryConfiguration),
    }))); };
})(PutBucketInventoryConfigurationRequest || (PutBucketInventoryConfigurationRequest = {}));
export var BucketLifecycleConfiguration;
(function (BucketLifecycleConfiguration) {
    BucketLifecycleConfiguration.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Rules && { Rules: obj.Rules.map(function (item) { return LifecycleRule.filterSensitiveLog(item); }) }))); };
})(BucketLifecycleConfiguration || (BucketLifecycleConfiguration = {}));
export var PutBucketLifecycleConfigurationRequest;
(function (PutBucketLifecycleConfigurationRequest) {
    PutBucketLifecycleConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.LifecycleConfiguration && {
        LifecycleConfiguration: BucketLifecycleConfiguration.filterSensitiveLog(obj.LifecycleConfiguration),
    }))); };
})(PutBucketLifecycleConfigurationRequest || (PutBucketLifecycleConfigurationRequest = {}));
export var BucketLoggingStatus;
(function (BucketLoggingStatus) {
    BucketLoggingStatus.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BucketLoggingStatus || (BucketLoggingStatus = {}));
export var PutBucketLoggingRequest;
(function (PutBucketLoggingRequest) {
    PutBucketLoggingRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutBucketLoggingRequest || (PutBucketLoggingRequest = {}));
export var PutBucketMetricsConfigurationRequest;
(function (PutBucketMetricsConfigurationRequest) {
    PutBucketMetricsConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.MetricsConfiguration && {
        MetricsConfiguration: MetricsConfiguration.filterSensitiveLog(obj.MetricsConfiguration),
    }))); };
})(PutBucketMetricsConfigurationRequest || (PutBucketMetricsConfigurationRequest = {}));
export var PutBucketNotificationConfigurationRequest;
(function (PutBucketNotificationConfigurationRequest) {
    PutBucketNotificationConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutBucketNotificationConfigurationRequest || (PutBucketNotificationConfigurationRequest = {}));
export var PutBucketOwnershipControlsRequest;
(function (PutBucketOwnershipControlsRequest) {
    PutBucketOwnershipControlsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutBucketOwnershipControlsRequest || (PutBucketOwnershipControlsRequest = {}));
export var PutBucketPolicyRequest;
(function (PutBucketPolicyRequest) {
    PutBucketPolicyRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutBucketPolicyRequest || (PutBucketPolicyRequest = {}));
export var PutBucketReplicationRequest;
(function (PutBucketReplicationRequest) {
    PutBucketReplicationRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.ReplicationConfiguration && {
        ReplicationConfiguration: ReplicationConfiguration.filterSensitiveLog(obj.ReplicationConfiguration),
    }))); };
})(PutBucketReplicationRequest || (PutBucketReplicationRequest = {}));
export var RequestPaymentConfiguration;
(function (RequestPaymentConfiguration) {
    RequestPaymentConfiguration.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RequestPaymentConfiguration || (RequestPaymentConfiguration = {}));
export var PutBucketRequestPaymentRequest;
(function (PutBucketRequestPaymentRequest) {
    PutBucketRequestPaymentRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutBucketRequestPaymentRequest || (PutBucketRequestPaymentRequest = {}));
export var Tagging;
(function (Tagging) {
    Tagging.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Tagging || (Tagging = {}));
export var PutBucketTaggingRequest;
(function (PutBucketTaggingRequest) {
    PutBucketTaggingRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutBucketTaggingRequest || (PutBucketTaggingRequest = {}));
export var VersioningConfiguration;
(function (VersioningConfiguration) {
    VersioningConfiguration.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(VersioningConfiguration || (VersioningConfiguration = {}));
export var PutBucketVersioningRequest;
(function (PutBucketVersioningRequest) {
    PutBucketVersioningRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutBucketVersioningRequest || (PutBucketVersioningRequest = {}));
export var WebsiteConfiguration;
(function (WebsiteConfiguration) {
    WebsiteConfiguration.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(WebsiteConfiguration || (WebsiteConfiguration = {}));
export var PutBucketWebsiteRequest;
(function (PutBucketWebsiteRequest) {
    PutBucketWebsiteRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutBucketWebsiteRequest || (PutBucketWebsiteRequest = {}));
export var PutObjectOutput;
(function (PutObjectOutput) {
    PutObjectOutput.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign({}, obj), (obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING })), (obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: SENSITIVE_STRING }))); };
})(PutObjectOutput || (PutObjectOutput = {}));
export var PutObjectRequest;
(function (PutObjectRequest) {
    PutObjectRequest.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign(__assign({}, obj), (obj.SSECustomerKey && { SSECustomerKey: SENSITIVE_STRING })), (obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING })), (obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: SENSITIVE_STRING }))); };
})(PutObjectRequest || (PutObjectRequest = {}));
export var PutObjectAclOutput;
(function (PutObjectAclOutput) {
    PutObjectAclOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutObjectAclOutput || (PutObjectAclOutput = {}));
export var PutObjectAclRequest;
(function (PutObjectAclRequest) {
    PutObjectAclRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutObjectAclRequest || (PutObjectAclRequest = {}));
export var PutObjectLegalHoldOutput;
(function (PutObjectLegalHoldOutput) {
    PutObjectLegalHoldOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutObjectLegalHoldOutput || (PutObjectLegalHoldOutput = {}));
export var PutObjectLegalHoldRequest;
(function (PutObjectLegalHoldRequest) {
    PutObjectLegalHoldRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutObjectLegalHoldRequest || (PutObjectLegalHoldRequest = {}));
export var PutObjectLockConfigurationOutput;
(function (PutObjectLockConfigurationOutput) {
    PutObjectLockConfigurationOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutObjectLockConfigurationOutput || (PutObjectLockConfigurationOutput = {}));
export var PutObjectLockConfigurationRequest;
(function (PutObjectLockConfigurationRequest) {
    PutObjectLockConfigurationRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutObjectLockConfigurationRequest || (PutObjectLockConfigurationRequest = {}));
export var PutObjectRetentionOutput;
(function (PutObjectRetentionOutput) {
    PutObjectRetentionOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutObjectRetentionOutput || (PutObjectRetentionOutput = {}));
export var PutObjectRetentionRequest;
(function (PutObjectRetentionRequest) {
    PutObjectRetentionRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutObjectRetentionRequest || (PutObjectRetentionRequest = {}));
export var PutObjectTaggingOutput;
(function (PutObjectTaggingOutput) {
    PutObjectTaggingOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutObjectTaggingOutput || (PutObjectTaggingOutput = {}));
export var PutObjectTaggingRequest;
(function (PutObjectTaggingRequest) {
    PutObjectTaggingRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutObjectTaggingRequest || (PutObjectTaggingRequest = {}));
export var PutPublicAccessBlockRequest;
(function (PutPublicAccessBlockRequest) {
    PutPublicAccessBlockRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutPublicAccessBlockRequest || (PutPublicAccessBlockRequest = {}));
export var ObjectAlreadyInActiveTierError;
(function (ObjectAlreadyInActiveTierError) {
    ObjectAlreadyInActiveTierError.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ObjectAlreadyInActiveTierError || (ObjectAlreadyInActiveTierError = {}));
export var RestoreObjectOutput;
(function (RestoreObjectOutput) {
    RestoreObjectOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RestoreObjectOutput || (RestoreObjectOutput = {}));
export var GlacierJobParameters;
(function (GlacierJobParameters) {
    GlacierJobParameters.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GlacierJobParameters || (GlacierJobParameters = {}));
export var Encryption;
(function (Encryption) {
    Encryption.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.KMSKeyId && { KMSKeyId: SENSITIVE_STRING }))); };
})(Encryption || (Encryption = {}));
//# sourceMappingURL=models_0.js.map