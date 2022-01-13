"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidKMSResourceException = exports.InvalidArgumentException = exports.CreateDeliveryStreamOutput = exports.CreateDeliveryStreamInput = exports.Tag = exports.SplunkDestinationConfiguration = exports.SplunkRetryOptions = exports.RedshiftDestinationConfiguration = exports.RedshiftRetryOptions = exports.KinesisStreamSourceConfiguration = exports.HttpEndpointDestinationConfiguration = exports.HttpEndpointRetryOptions = exports.HttpEndpointRequestConfiguration = exports.HttpEndpointCommonAttribute = exports.HttpEndpointConfiguration = exports.HttpEndpointBufferingHints = exports.ExtendedS3DestinationConfiguration = exports.DataFormatConversionConfiguration = exports.SchemaConfiguration = exports.OutputFormatConfiguration = exports.Serializer = exports.ParquetSerDe = exports.ParquetWriterVersion = exports.ParquetCompression = exports.OrcSerDe = exports.OrcFormatVersion = exports.OrcCompression = exports.InputFormatConfiguration = exports.Deserializer = exports.OpenXJsonSerDe = exports.HiveJsonSerDe = exports.ElasticsearchDestinationConfiguration = exports.VpcConfiguration = exports.S3DestinationConfiguration = exports.EncryptionConfiguration = exports.KMSEncryptionConfig = exports.ElasticsearchRetryOptions = exports.ProcessingConfiguration = exports.Processor = exports.ProcessorParameter = exports.ProcessorParameterName = exports.ElasticsearchBufferingHints = exports.DeliveryStreamEncryptionConfigurationInput = exports.KeyType = exports.CopyCommand = exports.ContentEncoding = exports.ConcurrentModificationException = exports.CompressionFormat = exports.CloudWatchLoggingOptions = exports.BufferingHints = void 0;
exports.UpdateDestinationInput = exports.SplunkDestinationUpdate = exports.RedshiftDestinationUpdate = exports.HttpEndpointDestinationUpdate = exports.UntagDeliveryStreamOutput = exports.UntagDeliveryStreamInput = exports.TagDeliveryStreamOutput = exports.TagDeliveryStreamInput = exports.StopDeliveryStreamEncryptionOutput = exports.StopDeliveryStreamEncryptionInput = exports.StartDeliveryStreamEncryptionOutput = exports.StartDeliveryStreamEncryptionInput = exports.PutRecordBatchOutput = exports.PutRecordBatchResponseEntry = exports.PutRecordBatchInput = exports.ServiceUnavailableException = exports.PutRecordOutput = exports.PutRecordInput = exports._Record = exports.ListTagsForDeliveryStreamOutput = exports.ListTagsForDeliveryStreamInput = exports.ListDeliveryStreamsOutput = exports.ListDeliveryStreamsInput = exports.ExtendedS3DestinationUpdate = exports.ElasticsearchDestinationUpdate = exports.S3DestinationUpdate = exports.DescribeDeliveryStreamOutput = exports.DescribeDeliveryStreamInput = exports.DeliveryStreamDescription = exports.SourceDescription = exports.KinesisStreamSourceDescription = exports.DestinationDescription = exports.SplunkDestinationDescription = exports.RedshiftDestinationDescription = exports.HttpEndpointDestinationDescription = exports.HttpEndpointDescription = exports.ExtendedS3DestinationDescription = exports.ElasticsearchDestinationDescription = exports.VpcConfigurationDescription = exports.S3DestinationDescription = exports.DeliveryStreamStatus = exports.DeliveryStreamEncryptionConfiguration = exports.DeliveryStreamEncryptionStatus = exports.FailureDescription = exports.DeliveryStreamFailureType = exports.ResourceNotFoundException = exports.DeleteDeliveryStreamOutput = exports.DeleteDeliveryStreamInput = exports.ResourceInUseException = exports.LimitExceededException = void 0;
exports.UpdateDestinationOutput = void 0;
const smithy_client_1 = require("@aws-sdk/smithy-client");
var BufferingHints;
(function (BufferingHints) {
    BufferingHints.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BufferingHints = exports.BufferingHints || (exports.BufferingHints = {}));
var CloudWatchLoggingOptions;
(function (CloudWatchLoggingOptions) {
    CloudWatchLoggingOptions.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CloudWatchLoggingOptions = exports.CloudWatchLoggingOptions || (exports.CloudWatchLoggingOptions = {}));
var CompressionFormat;
(function (CompressionFormat) {
    CompressionFormat["GZIP"] = "GZIP";
    CompressionFormat["HADOOP_SNAPPY"] = "HADOOP_SNAPPY";
    CompressionFormat["SNAPPY"] = "Snappy";
    CompressionFormat["UNCOMPRESSED"] = "UNCOMPRESSED";
    CompressionFormat["ZIP"] = "ZIP";
})(CompressionFormat = exports.CompressionFormat || (exports.CompressionFormat = {}));
var ConcurrentModificationException;
(function (ConcurrentModificationException) {
    ConcurrentModificationException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ConcurrentModificationException = exports.ConcurrentModificationException || (exports.ConcurrentModificationException = {}));
var ContentEncoding;
(function (ContentEncoding) {
    ContentEncoding["GZIP"] = "GZIP";
    ContentEncoding["NONE"] = "NONE";
})(ContentEncoding = exports.ContentEncoding || (exports.ContentEncoding = {}));
var CopyCommand;
(function (CopyCommand) {
    CopyCommand.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CopyCommand = exports.CopyCommand || (exports.CopyCommand = {}));
var KeyType;
(function (KeyType) {
    KeyType["AWS_OWNED_CMK"] = "AWS_OWNED_CMK";
    KeyType["CUSTOMER_MANAGED_CMK"] = "CUSTOMER_MANAGED_CMK";
})(KeyType = exports.KeyType || (exports.KeyType = {}));
var DeliveryStreamEncryptionConfigurationInput;
(function (DeliveryStreamEncryptionConfigurationInput) {
    DeliveryStreamEncryptionConfigurationInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeliveryStreamEncryptionConfigurationInput = exports.DeliveryStreamEncryptionConfigurationInput || (exports.DeliveryStreamEncryptionConfigurationInput = {}));
var ElasticsearchBufferingHints;
(function (ElasticsearchBufferingHints) {
    ElasticsearchBufferingHints.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ElasticsearchBufferingHints = exports.ElasticsearchBufferingHints || (exports.ElasticsearchBufferingHints = {}));
var ProcessorParameterName;
(function (ProcessorParameterName) {
    ProcessorParameterName["BUFFER_INTERVAL_IN_SECONDS"] = "BufferIntervalInSeconds";
    ProcessorParameterName["BUFFER_SIZE_IN_MB"] = "BufferSizeInMBs";
    ProcessorParameterName["LAMBDA_ARN"] = "LambdaArn";
    ProcessorParameterName["LAMBDA_NUMBER_OF_RETRIES"] = "NumberOfRetries";
    ProcessorParameterName["ROLE_ARN"] = "RoleArn";
})(ProcessorParameterName = exports.ProcessorParameterName || (exports.ProcessorParameterName = {}));
var ProcessorParameter;
(function (ProcessorParameter) {
    ProcessorParameter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ProcessorParameter = exports.ProcessorParameter || (exports.ProcessorParameter = {}));
var Processor;
(function (Processor) {
    Processor.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Processor = exports.Processor || (exports.Processor = {}));
var ProcessingConfiguration;
(function (ProcessingConfiguration) {
    ProcessingConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ProcessingConfiguration = exports.ProcessingConfiguration || (exports.ProcessingConfiguration = {}));
var ElasticsearchRetryOptions;
(function (ElasticsearchRetryOptions) {
    ElasticsearchRetryOptions.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ElasticsearchRetryOptions = exports.ElasticsearchRetryOptions || (exports.ElasticsearchRetryOptions = {}));
var KMSEncryptionConfig;
(function (KMSEncryptionConfig) {
    KMSEncryptionConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KMSEncryptionConfig = exports.KMSEncryptionConfig || (exports.KMSEncryptionConfig = {}));
var EncryptionConfiguration;
(function (EncryptionConfiguration) {
    EncryptionConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EncryptionConfiguration = exports.EncryptionConfiguration || (exports.EncryptionConfiguration = {}));
var S3DestinationConfiguration;
(function (S3DestinationConfiguration) {
    S3DestinationConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(S3DestinationConfiguration = exports.S3DestinationConfiguration || (exports.S3DestinationConfiguration = {}));
var VpcConfiguration;
(function (VpcConfiguration) {
    VpcConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(VpcConfiguration = exports.VpcConfiguration || (exports.VpcConfiguration = {}));
var ElasticsearchDestinationConfiguration;
(function (ElasticsearchDestinationConfiguration) {
    ElasticsearchDestinationConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ElasticsearchDestinationConfiguration = exports.ElasticsearchDestinationConfiguration || (exports.ElasticsearchDestinationConfiguration = {}));
var HiveJsonSerDe;
(function (HiveJsonSerDe) {
    HiveJsonSerDe.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(HiveJsonSerDe = exports.HiveJsonSerDe || (exports.HiveJsonSerDe = {}));
var OpenXJsonSerDe;
(function (OpenXJsonSerDe) {
    OpenXJsonSerDe.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(OpenXJsonSerDe = exports.OpenXJsonSerDe || (exports.OpenXJsonSerDe = {}));
var Deserializer;
(function (Deserializer) {
    Deserializer.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Deserializer = exports.Deserializer || (exports.Deserializer = {}));
var InputFormatConfiguration;
(function (InputFormatConfiguration) {
    InputFormatConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InputFormatConfiguration = exports.InputFormatConfiguration || (exports.InputFormatConfiguration = {}));
var OrcCompression;
(function (OrcCompression) {
    OrcCompression["NONE"] = "NONE";
    OrcCompression["SNAPPY"] = "SNAPPY";
    OrcCompression["ZLIB"] = "ZLIB";
})(OrcCompression = exports.OrcCompression || (exports.OrcCompression = {}));
var OrcFormatVersion;
(function (OrcFormatVersion) {
    OrcFormatVersion["V0_11"] = "V0_11";
    OrcFormatVersion["V0_12"] = "V0_12";
})(OrcFormatVersion = exports.OrcFormatVersion || (exports.OrcFormatVersion = {}));
var OrcSerDe;
(function (OrcSerDe) {
    OrcSerDe.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(OrcSerDe = exports.OrcSerDe || (exports.OrcSerDe = {}));
var ParquetCompression;
(function (ParquetCompression) {
    ParquetCompression["GZIP"] = "GZIP";
    ParquetCompression["SNAPPY"] = "SNAPPY";
    ParquetCompression["UNCOMPRESSED"] = "UNCOMPRESSED";
})(ParquetCompression = exports.ParquetCompression || (exports.ParquetCompression = {}));
var ParquetWriterVersion;
(function (ParquetWriterVersion) {
    ParquetWriterVersion["V1"] = "V1";
    ParquetWriterVersion["V2"] = "V2";
})(ParquetWriterVersion = exports.ParquetWriterVersion || (exports.ParquetWriterVersion = {}));
var ParquetSerDe;
(function (ParquetSerDe) {
    ParquetSerDe.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ParquetSerDe = exports.ParquetSerDe || (exports.ParquetSerDe = {}));
var Serializer;
(function (Serializer) {
    Serializer.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Serializer = exports.Serializer || (exports.Serializer = {}));
var OutputFormatConfiguration;
(function (OutputFormatConfiguration) {
    OutputFormatConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(OutputFormatConfiguration = exports.OutputFormatConfiguration || (exports.OutputFormatConfiguration = {}));
var SchemaConfiguration;
(function (SchemaConfiguration) {
    SchemaConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SchemaConfiguration = exports.SchemaConfiguration || (exports.SchemaConfiguration = {}));
var DataFormatConversionConfiguration;
(function (DataFormatConversionConfiguration) {
    DataFormatConversionConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DataFormatConversionConfiguration = exports.DataFormatConversionConfiguration || (exports.DataFormatConversionConfiguration = {}));
var ExtendedS3DestinationConfiguration;
(function (ExtendedS3DestinationConfiguration) {
    ExtendedS3DestinationConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ExtendedS3DestinationConfiguration = exports.ExtendedS3DestinationConfiguration || (exports.ExtendedS3DestinationConfiguration = {}));
var HttpEndpointBufferingHints;
(function (HttpEndpointBufferingHints) {
    HttpEndpointBufferingHints.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(HttpEndpointBufferingHints = exports.HttpEndpointBufferingHints || (exports.HttpEndpointBufferingHints = {}));
var HttpEndpointConfiguration;
(function (HttpEndpointConfiguration) {
    HttpEndpointConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Url && { Url: smithy_client_1.SENSITIVE_STRING }),
        ...(obj.AccessKey && { AccessKey: smithy_client_1.SENSITIVE_STRING }),
    });
})(HttpEndpointConfiguration = exports.HttpEndpointConfiguration || (exports.HttpEndpointConfiguration = {}));
var HttpEndpointCommonAttribute;
(function (HttpEndpointCommonAttribute) {
    HttpEndpointCommonAttribute.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.AttributeName && { AttributeName: smithy_client_1.SENSITIVE_STRING }),
        ...(obj.AttributeValue && { AttributeValue: smithy_client_1.SENSITIVE_STRING }),
    });
})(HttpEndpointCommonAttribute = exports.HttpEndpointCommonAttribute || (exports.HttpEndpointCommonAttribute = {}));
var HttpEndpointRequestConfiguration;
(function (HttpEndpointRequestConfiguration) {
    HttpEndpointRequestConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.CommonAttributes && {
            CommonAttributes: obj.CommonAttributes.map((item) => HttpEndpointCommonAttribute.filterSensitiveLog(item)),
        }),
    });
})(HttpEndpointRequestConfiguration = exports.HttpEndpointRequestConfiguration || (exports.HttpEndpointRequestConfiguration = {}));
var HttpEndpointRetryOptions;
(function (HttpEndpointRetryOptions) {
    HttpEndpointRetryOptions.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(HttpEndpointRetryOptions = exports.HttpEndpointRetryOptions || (exports.HttpEndpointRetryOptions = {}));
var HttpEndpointDestinationConfiguration;
(function (HttpEndpointDestinationConfiguration) {
    HttpEndpointDestinationConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.EndpointConfiguration && {
            EndpointConfiguration: HttpEndpointConfiguration.filterSensitiveLog(obj.EndpointConfiguration),
        }),
        ...(obj.RequestConfiguration && {
            RequestConfiguration: HttpEndpointRequestConfiguration.filterSensitiveLog(obj.RequestConfiguration),
        }),
    });
})(HttpEndpointDestinationConfiguration = exports.HttpEndpointDestinationConfiguration || (exports.HttpEndpointDestinationConfiguration = {}));
var KinesisStreamSourceConfiguration;
(function (KinesisStreamSourceConfiguration) {
    KinesisStreamSourceConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KinesisStreamSourceConfiguration = exports.KinesisStreamSourceConfiguration || (exports.KinesisStreamSourceConfiguration = {}));
var RedshiftRetryOptions;
(function (RedshiftRetryOptions) {
    RedshiftRetryOptions.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RedshiftRetryOptions = exports.RedshiftRetryOptions || (exports.RedshiftRetryOptions = {}));
var RedshiftDestinationConfiguration;
(function (RedshiftDestinationConfiguration) {
    RedshiftDestinationConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Username && { Username: smithy_client_1.SENSITIVE_STRING }),
        ...(obj.Password && { Password: smithy_client_1.SENSITIVE_STRING }),
    });
})(RedshiftDestinationConfiguration = exports.RedshiftDestinationConfiguration || (exports.RedshiftDestinationConfiguration = {}));
var SplunkRetryOptions;
(function (SplunkRetryOptions) {
    SplunkRetryOptions.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SplunkRetryOptions = exports.SplunkRetryOptions || (exports.SplunkRetryOptions = {}));
var SplunkDestinationConfiguration;
(function (SplunkDestinationConfiguration) {
    SplunkDestinationConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SplunkDestinationConfiguration = exports.SplunkDestinationConfiguration || (exports.SplunkDestinationConfiguration = {}));
var Tag;
(function (Tag) {
    Tag.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Tag = exports.Tag || (exports.Tag = {}));
var CreateDeliveryStreamInput;
(function (CreateDeliveryStreamInput) {
    CreateDeliveryStreamInput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.RedshiftDestinationConfiguration && {
            RedshiftDestinationConfiguration: RedshiftDestinationConfiguration.filterSensitiveLog(obj.RedshiftDestinationConfiguration),
        }),
        ...(obj.HttpEndpointDestinationConfiguration && {
            HttpEndpointDestinationConfiguration: HttpEndpointDestinationConfiguration.filterSensitiveLog(obj.HttpEndpointDestinationConfiguration),
        }),
    });
})(CreateDeliveryStreamInput = exports.CreateDeliveryStreamInput || (exports.CreateDeliveryStreamInput = {}));
var CreateDeliveryStreamOutput;
(function (CreateDeliveryStreamOutput) {
    CreateDeliveryStreamOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateDeliveryStreamOutput = exports.CreateDeliveryStreamOutput || (exports.CreateDeliveryStreamOutput = {}));
var InvalidArgumentException;
(function (InvalidArgumentException) {
    InvalidArgumentException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidArgumentException = exports.InvalidArgumentException || (exports.InvalidArgumentException = {}));
var InvalidKMSResourceException;
(function (InvalidKMSResourceException) {
    InvalidKMSResourceException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidKMSResourceException = exports.InvalidKMSResourceException || (exports.InvalidKMSResourceException = {}));
var LimitExceededException;
(function (LimitExceededException) {
    LimitExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LimitExceededException = exports.LimitExceededException || (exports.LimitExceededException = {}));
var ResourceInUseException;
(function (ResourceInUseException) {
    ResourceInUseException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResourceInUseException = exports.ResourceInUseException || (exports.ResourceInUseException = {}));
var DeleteDeliveryStreamInput;
(function (DeleteDeliveryStreamInput) {
    DeleteDeliveryStreamInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteDeliveryStreamInput = exports.DeleteDeliveryStreamInput || (exports.DeleteDeliveryStreamInput = {}));
var DeleteDeliveryStreamOutput;
(function (DeleteDeliveryStreamOutput) {
    DeleteDeliveryStreamOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteDeliveryStreamOutput = exports.DeleteDeliveryStreamOutput || (exports.DeleteDeliveryStreamOutput = {}));
var ResourceNotFoundException;
(function (ResourceNotFoundException) {
    ResourceNotFoundException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResourceNotFoundException = exports.ResourceNotFoundException || (exports.ResourceNotFoundException = {}));
var DeliveryStreamFailureType;
(function (DeliveryStreamFailureType) {
    DeliveryStreamFailureType["CREATE_ENI_FAILED"] = "CREATE_ENI_FAILED";
    DeliveryStreamFailureType["CREATE_KMS_GRANT_FAILED"] = "CREATE_KMS_GRANT_FAILED";
    DeliveryStreamFailureType["DELETE_ENI_FAILED"] = "DELETE_ENI_FAILED";
    DeliveryStreamFailureType["DISABLED_KMS_KEY"] = "DISABLED_KMS_KEY";
    DeliveryStreamFailureType["ENI_ACCESS_DENIED"] = "ENI_ACCESS_DENIED";
    DeliveryStreamFailureType["INVALID_KMS_KEY"] = "INVALID_KMS_KEY";
    DeliveryStreamFailureType["KMS_ACCESS_DENIED"] = "KMS_ACCESS_DENIED";
    DeliveryStreamFailureType["KMS_KEY_NOT_FOUND"] = "KMS_KEY_NOT_FOUND";
    DeliveryStreamFailureType["KMS_OPT_IN_REQUIRED"] = "KMS_OPT_IN_REQUIRED";
    DeliveryStreamFailureType["RETIRE_KMS_GRANT_FAILED"] = "RETIRE_KMS_GRANT_FAILED";
    DeliveryStreamFailureType["SECURITY_GROUP_ACCESS_DENIED"] = "SECURITY_GROUP_ACCESS_DENIED";
    DeliveryStreamFailureType["SECURITY_GROUP_NOT_FOUND"] = "SECURITY_GROUP_NOT_FOUND";
    DeliveryStreamFailureType["SUBNET_ACCESS_DENIED"] = "SUBNET_ACCESS_DENIED";
    DeliveryStreamFailureType["SUBNET_NOT_FOUND"] = "SUBNET_NOT_FOUND";
    DeliveryStreamFailureType["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
})(DeliveryStreamFailureType = exports.DeliveryStreamFailureType || (exports.DeliveryStreamFailureType = {}));
var FailureDescription;
(function (FailureDescription) {
    FailureDescription.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(FailureDescription = exports.FailureDescription || (exports.FailureDescription = {}));
var DeliveryStreamEncryptionStatus;
(function (DeliveryStreamEncryptionStatus) {
    DeliveryStreamEncryptionStatus["DISABLED"] = "DISABLED";
    DeliveryStreamEncryptionStatus["DISABLING"] = "DISABLING";
    DeliveryStreamEncryptionStatus["DISABLING_FAILED"] = "DISABLING_FAILED";
    DeliveryStreamEncryptionStatus["ENABLED"] = "ENABLED";
    DeliveryStreamEncryptionStatus["ENABLING"] = "ENABLING";
    DeliveryStreamEncryptionStatus["ENABLING_FAILED"] = "ENABLING_FAILED";
})(DeliveryStreamEncryptionStatus = exports.DeliveryStreamEncryptionStatus || (exports.DeliveryStreamEncryptionStatus = {}));
var DeliveryStreamEncryptionConfiguration;
(function (DeliveryStreamEncryptionConfiguration) {
    DeliveryStreamEncryptionConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeliveryStreamEncryptionConfiguration = exports.DeliveryStreamEncryptionConfiguration || (exports.DeliveryStreamEncryptionConfiguration = {}));
var DeliveryStreamStatus;
(function (DeliveryStreamStatus) {
    DeliveryStreamStatus["ACTIVE"] = "ACTIVE";
    DeliveryStreamStatus["CREATING"] = "CREATING";
    DeliveryStreamStatus["CREATING_FAILED"] = "CREATING_FAILED";
    DeliveryStreamStatus["DELETING"] = "DELETING";
    DeliveryStreamStatus["DELETING_FAILED"] = "DELETING_FAILED";
})(DeliveryStreamStatus = exports.DeliveryStreamStatus || (exports.DeliveryStreamStatus = {}));
var S3DestinationDescription;
(function (S3DestinationDescription) {
    S3DestinationDescription.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(S3DestinationDescription = exports.S3DestinationDescription || (exports.S3DestinationDescription = {}));
var VpcConfigurationDescription;
(function (VpcConfigurationDescription) {
    VpcConfigurationDescription.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(VpcConfigurationDescription = exports.VpcConfigurationDescription || (exports.VpcConfigurationDescription = {}));
var ElasticsearchDestinationDescription;
(function (ElasticsearchDestinationDescription) {
    ElasticsearchDestinationDescription.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ElasticsearchDestinationDescription = exports.ElasticsearchDestinationDescription || (exports.ElasticsearchDestinationDescription = {}));
var ExtendedS3DestinationDescription;
(function (ExtendedS3DestinationDescription) {
    ExtendedS3DestinationDescription.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ExtendedS3DestinationDescription = exports.ExtendedS3DestinationDescription || (exports.ExtendedS3DestinationDescription = {}));
var HttpEndpointDescription;
(function (HttpEndpointDescription) {
    HttpEndpointDescription.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Url && { Url: smithy_client_1.SENSITIVE_STRING }),
    });
})(HttpEndpointDescription = exports.HttpEndpointDescription || (exports.HttpEndpointDescription = {}));
var HttpEndpointDestinationDescription;
(function (HttpEndpointDestinationDescription) {
    HttpEndpointDestinationDescription.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.EndpointConfiguration && {
            EndpointConfiguration: HttpEndpointDescription.filterSensitiveLog(obj.EndpointConfiguration),
        }),
        ...(obj.RequestConfiguration && {
            RequestConfiguration: HttpEndpointRequestConfiguration.filterSensitiveLog(obj.RequestConfiguration),
        }),
    });
})(HttpEndpointDestinationDescription = exports.HttpEndpointDestinationDescription || (exports.HttpEndpointDestinationDescription = {}));
var RedshiftDestinationDescription;
(function (RedshiftDestinationDescription) {
    RedshiftDestinationDescription.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Username && { Username: smithy_client_1.SENSITIVE_STRING }),
    });
})(RedshiftDestinationDescription = exports.RedshiftDestinationDescription || (exports.RedshiftDestinationDescription = {}));
var SplunkDestinationDescription;
(function (SplunkDestinationDescription) {
    SplunkDestinationDescription.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SplunkDestinationDescription = exports.SplunkDestinationDescription || (exports.SplunkDestinationDescription = {}));
var DestinationDescription;
(function (DestinationDescription) {
    DestinationDescription.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.RedshiftDestinationDescription && {
            RedshiftDestinationDescription: RedshiftDestinationDescription.filterSensitiveLog(obj.RedshiftDestinationDescription),
        }),
        ...(obj.HttpEndpointDestinationDescription && {
            HttpEndpointDestinationDescription: HttpEndpointDestinationDescription.filterSensitiveLog(obj.HttpEndpointDestinationDescription),
        }),
    });
})(DestinationDescription = exports.DestinationDescription || (exports.DestinationDescription = {}));
var KinesisStreamSourceDescription;
(function (KinesisStreamSourceDescription) {
    KinesisStreamSourceDescription.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KinesisStreamSourceDescription = exports.KinesisStreamSourceDescription || (exports.KinesisStreamSourceDescription = {}));
var SourceDescription;
(function (SourceDescription) {
    SourceDescription.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SourceDescription = exports.SourceDescription || (exports.SourceDescription = {}));
var DeliveryStreamDescription;
(function (DeliveryStreamDescription) {
    DeliveryStreamDescription.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Destinations && {
            Destinations: obj.Destinations.map((item) => DestinationDescription.filterSensitiveLog(item)),
        }),
    });
})(DeliveryStreamDescription = exports.DeliveryStreamDescription || (exports.DeliveryStreamDescription = {}));
var DescribeDeliveryStreamInput;
(function (DescribeDeliveryStreamInput) {
    DescribeDeliveryStreamInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeDeliveryStreamInput = exports.DescribeDeliveryStreamInput || (exports.DescribeDeliveryStreamInput = {}));
var DescribeDeliveryStreamOutput;
(function (DescribeDeliveryStreamOutput) {
    DescribeDeliveryStreamOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.DeliveryStreamDescription && {
            DeliveryStreamDescription: DeliveryStreamDescription.filterSensitiveLog(obj.DeliveryStreamDescription),
        }),
    });
})(DescribeDeliveryStreamOutput = exports.DescribeDeliveryStreamOutput || (exports.DescribeDeliveryStreamOutput = {}));
var S3DestinationUpdate;
(function (S3DestinationUpdate) {
    S3DestinationUpdate.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(S3DestinationUpdate = exports.S3DestinationUpdate || (exports.S3DestinationUpdate = {}));
var ElasticsearchDestinationUpdate;
(function (ElasticsearchDestinationUpdate) {
    ElasticsearchDestinationUpdate.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ElasticsearchDestinationUpdate = exports.ElasticsearchDestinationUpdate || (exports.ElasticsearchDestinationUpdate = {}));
var ExtendedS3DestinationUpdate;
(function (ExtendedS3DestinationUpdate) {
    ExtendedS3DestinationUpdate.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ExtendedS3DestinationUpdate = exports.ExtendedS3DestinationUpdate || (exports.ExtendedS3DestinationUpdate = {}));
var ListDeliveryStreamsInput;
(function (ListDeliveryStreamsInput) {
    ListDeliveryStreamsInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListDeliveryStreamsInput = exports.ListDeliveryStreamsInput || (exports.ListDeliveryStreamsInput = {}));
var ListDeliveryStreamsOutput;
(function (ListDeliveryStreamsOutput) {
    ListDeliveryStreamsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListDeliveryStreamsOutput = exports.ListDeliveryStreamsOutput || (exports.ListDeliveryStreamsOutput = {}));
var ListTagsForDeliveryStreamInput;
(function (ListTagsForDeliveryStreamInput) {
    ListTagsForDeliveryStreamInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListTagsForDeliveryStreamInput = exports.ListTagsForDeliveryStreamInput || (exports.ListTagsForDeliveryStreamInput = {}));
var ListTagsForDeliveryStreamOutput;
(function (ListTagsForDeliveryStreamOutput) {
    ListTagsForDeliveryStreamOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListTagsForDeliveryStreamOutput = exports.ListTagsForDeliveryStreamOutput || (exports.ListTagsForDeliveryStreamOutput = {}));
var _Record;
(function (_Record) {
    _Record.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(_Record = exports._Record || (exports._Record = {}));
var PutRecordInput;
(function (PutRecordInput) {
    PutRecordInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutRecordInput = exports.PutRecordInput || (exports.PutRecordInput = {}));
var PutRecordOutput;
(function (PutRecordOutput) {
    PutRecordOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutRecordOutput = exports.PutRecordOutput || (exports.PutRecordOutput = {}));
var ServiceUnavailableException;
(function (ServiceUnavailableException) {
    ServiceUnavailableException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ServiceUnavailableException = exports.ServiceUnavailableException || (exports.ServiceUnavailableException = {}));
var PutRecordBatchInput;
(function (PutRecordBatchInput) {
    PutRecordBatchInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutRecordBatchInput = exports.PutRecordBatchInput || (exports.PutRecordBatchInput = {}));
var PutRecordBatchResponseEntry;
(function (PutRecordBatchResponseEntry) {
    PutRecordBatchResponseEntry.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutRecordBatchResponseEntry = exports.PutRecordBatchResponseEntry || (exports.PutRecordBatchResponseEntry = {}));
var PutRecordBatchOutput;
(function (PutRecordBatchOutput) {
    PutRecordBatchOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutRecordBatchOutput = exports.PutRecordBatchOutput || (exports.PutRecordBatchOutput = {}));
var StartDeliveryStreamEncryptionInput;
(function (StartDeliveryStreamEncryptionInput) {
    StartDeliveryStreamEncryptionInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartDeliveryStreamEncryptionInput = exports.StartDeliveryStreamEncryptionInput || (exports.StartDeliveryStreamEncryptionInput = {}));
var StartDeliveryStreamEncryptionOutput;
(function (StartDeliveryStreamEncryptionOutput) {
    StartDeliveryStreamEncryptionOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartDeliveryStreamEncryptionOutput = exports.StartDeliveryStreamEncryptionOutput || (exports.StartDeliveryStreamEncryptionOutput = {}));
var StopDeliveryStreamEncryptionInput;
(function (StopDeliveryStreamEncryptionInput) {
    StopDeliveryStreamEncryptionInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopDeliveryStreamEncryptionInput = exports.StopDeliveryStreamEncryptionInput || (exports.StopDeliveryStreamEncryptionInput = {}));
var StopDeliveryStreamEncryptionOutput;
(function (StopDeliveryStreamEncryptionOutput) {
    StopDeliveryStreamEncryptionOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopDeliveryStreamEncryptionOutput = exports.StopDeliveryStreamEncryptionOutput || (exports.StopDeliveryStreamEncryptionOutput = {}));
var TagDeliveryStreamInput;
(function (TagDeliveryStreamInput) {
    TagDeliveryStreamInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TagDeliveryStreamInput = exports.TagDeliveryStreamInput || (exports.TagDeliveryStreamInput = {}));
var TagDeliveryStreamOutput;
(function (TagDeliveryStreamOutput) {
    TagDeliveryStreamOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TagDeliveryStreamOutput = exports.TagDeliveryStreamOutput || (exports.TagDeliveryStreamOutput = {}));
var UntagDeliveryStreamInput;
(function (UntagDeliveryStreamInput) {
    UntagDeliveryStreamInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UntagDeliveryStreamInput = exports.UntagDeliveryStreamInput || (exports.UntagDeliveryStreamInput = {}));
var UntagDeliveryStreamOutput;
(function (UntagDeliveryStreamOutput) {
    UntagDeliveryStreamOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UntagDeliveryStreamOutput = exports.UntagDeliveryStreamOutput || (exports.UntagDeliveryStreamOutput = {}));
var HttpEndpointDestinationUpdate;
(function (HttpEndpointDestinationUpdate) {
    HttpEndpointDestinationUpdate.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.EndpointConfiguration && {
            EndpointConfiguration: HttpEndpointConfiguration.filterSensitiveLog(obj.EndpointConfiguration),
        }),
        ...(obj.RequestConfiguration && {
            RequestConfiguration: HttpEndpointRequestConfiguration.filterSensitiveLog(obj.RequestConfiguration),
        }),
    });
})(HttpEndpointDestinationUpdate = exports.HttpEndpointDestinationUpdate || (exports.HttpEndpointDestinationUpdate = {}));
var RedshiftDestinationUpdate;
(function (RedshiftDestinationUpdate) {
    RedshiftDestinationUpdate.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Username && { Username: smithy_client_1.SENSITIVE_STRING }),
        ...(obj.Password && { Password: smithy_client_1.SENSITIVE_STRING }),
    });
})(RedshiftDestinationUpdate = exports.RedshiftDestinationUpdate || (exports.RedshiftDestinationUpdate = {}));
var SplunkDestinationUpdate;
(function (SplunkDestinationUpdate) {
    SplunkDestinationUpdate.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SplunkDestinationUpdate = exports.SplunkDestinationUpdate || (exports.SplunkDestinationUpdate = {}));
var UpdateDestinationInput;
(function (UpdateDestinationInput) {
    UpdateDestinationInput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.RedshiftDestinationUpdate && {
            RedshiftDestinationUpdate: RedshiftDestinationUpdate.filterSensitiveLog(obj.RedshiftDestinationUpdate),
        }),
        ...(obj.HttpEndpointDestinationUpdate && {
            HttpEndpointDestinationUpdate: HttpEndpointDestinationUpdate.filterSensitiveLog(obj.HttpEndpointDestinationUpdate),
        }),
    });
})(UpdateDestinationInput = exports.UpdateDestinationInput || (exports.UpdateDestinationInput = {}));
var UpdateDestinationOutput;
(function (UpdateDestinationOutput) {
    UpdateDestinationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateDestinationOutput = exports.UpdateDestinationOutput || (exports.UpdateDestinationOutput = {}));
//# sourceMappingURL=models_0.js.map