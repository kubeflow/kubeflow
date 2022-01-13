"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalFailureException = exports.IncreaseStreamRetentionPeriodInput = exports.GetShardIteratorOutput = exports.GetShardIteratorInput = exports.ShardIteratorType = exports.ProvisionedThroughputExceededException = exports.KMSThrottlingException = exports.KMSOptInRequired = exports.KMSNotFoundException = exports.KMSInvalidStateException = exports.KMSDisabledException = exports.KMSAccessDeniedException = exports.GetRecordsOutput = exports._Record = exports.GetRecordsInput = exports.ExpiredNextTokenException = exports.ExpiredIteratorException = exports.EnableEnhancedMonitoringInput = exports.EnhancedMonitoringOutput = exports.DisableEnhancedMonitoringInput = exports.DescribeStreamSummaryOutput = exports.StreamDescriptionSummary = exports.DescribeStreamSummaryInput = exports.DescribeStreamConsumerOutput = exports.DescribeStreamConsumerInput = exports.DescribeStreamOutput = exports.StreamDescription = exports.StreamStatus = exports.Shard = exports.SequenceNumberRange = exports.EnhancedMetrics = exports.MetricsName = exports.EncryptionType = exports.DescribeStreamInput = exports.DescribeLimitsOutput = exports.DescribeLimitsInput = exports.DeregisterStreamConsumerInput = exports.DeleteStreamInput = exports.DecreaseStreamRetentionPeriodInput = exports.CreateStreamInput = exports.ConsumerDescription = exports.Consumer = exports.ConsumerStatus = exports.ChildShard = exports.HashKeyRange = exports.ResourceNotFoundException = exports.ResourceInUseException = exports.LimitExceededException = exports.InvalidArgumentException = exports.AddTagsToStreamInput = void 0;
exports.UpdateShardCountOutput = exports.UpdateShardCountInput = exports.ScalingType = exports.SubscribeToShardOutput = exports.SubscribeToShardEventStream = exports.SubscribeToShardEvent = exports.SubscribeToShardInput = exports.StartingPosition = exports.StopStreamEncryptionInput = exports.StartStreamEncryptionInput = exports.SplitShardInput = exports.RemoveTagsFromStreamInput = exports.RegisterStreamConsumerOutput = exports.RegisterStreamConsumerInput = exports.PutRecordsOutput = exports.PutRecordsResultEntry = exports.PutRecordsInput = exports.PutRecordsRequestEntry = exports.PutRecordOutput = exports.PutRecordInput = exports.MergeShardsInput = exports.ListTagsForStreamOutput = exports.Tag = exports.ListTagsForStreamInput = exports.ListStreamsOutput = exports.ListStreamsInput = exports.ListStreamConsumersOutput = exports.ListStreamConsumersInput = exports.ListShardsOutput = exports.ListShardsInput = exports.ShardFilter = exports.ShardFilterType = void 0;
var AddTagsToStreamInput;
(function (AddTagsToStreamInput) {
    AddTagsToStreamInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AddTagsToStreamInput = exports.AddTagsToStreamInput || (exports.AddTagsToStreamInput = {}));
var InvalidArgumentException;
(function (InvalidArgumentException) {
    InvalidArgumentException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidArgumentException = exports.InvalidArgumentException || (exports.InvalidArgumentException = {}));
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
var ResourceNotFoundException;
(function (ResourceNotFoundException) {
    ResourceNotFoundException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResourceNotFoundException = exports.ResourceNotFoundException || (exports.ResourceNotFoundException = {}));
var HashKeyRange;
(function (HashKeyRange) {
    HashKeyRange.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(HashKeyRange = exports.HashKeyRange || (exports.HashKeyRange = {}));
var ChildShard;
(function (ChildShard) {
    ChildShard.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ChildShard = exports.ChildShard || (exports.ChildShard = {}));
var ConsumerStatus;
(function (ConsumerStatus) {
    ConsumerStatus["ACTIVE"] = "ACTIVE";
    ConsumerStatus["CREATING"] = "CREATING";
    ConsumerStatus["DELETING"] = "DELETING";
})(ConsumerStatus = exports.ConsumerStatus || (exports.ConsumerStatus = {}));
var Consumer;
(function (Consumer) {
    Consumer.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Consumer = exports.Consumer || (exports.Consumer = {}));
var ConsumerDescription;
(function (ConsumerDescription) {
    ConsumerDescription.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ConsumerDescription = exports.ConsumerDescription || (exports.ConsumerDescription = {}));
var CreateStreamInput;
(function (CreateStreamInput) {
    CreateStreamInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateStreamInput = exports.CreateStreamInput || (exports.CreateStreamInput = {}));
var DecreaseStreamRetentionPeriodInput;
(function (DecreaseStreamRetentionPeriodInput) {
    DecreaseStreamRetentionPeriodInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DecreaseStreamRetentionPeriodInput = exports.DecreaseStreamRetentionPeriodInput || (exports.DecreaseStreamRetentionPeriodInput = {}));
var DeleteStreamInput;
(function (DeleteStreamInput) {
    DeleteStreamInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteStreamInput = exports.DeleteStreamInput || (exports.DeleteStreamInput = {}));
var DeregisterStreamConsumerInput;
(function (DeregisterStreamConsumerInput) {
    DeregisterStreamConsumerInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeregisterStreamConsumerInput = exports.DeregisterStreamConsumerInput || (exports.DeregisterStreamConsumerInput = {}));
var DescribeLimitsInput;
(function (DescribeLimitsInput) {
    DescribeLimitsInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeLimitsInput = exports.DescribeLimitsInput || (exports.DescribeLimitsInput = {}));
var DescribeLimitsOutput;
(function (DescribeLimitsOutput) {
    DescribeLimitsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeLimitsOutput = exports.DescribeLimitsOutput || (exports.DescribeLimitsOutput = {}));
var DescribeStreamInput;
(function (DescribeStreamInput) {
    DescribeStreamInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeStreamInput = exports.DescribeStreamInput || (exports.DescribeStreamInput = {}));
var EncryptionType;
(function (EncryptionType) {
    EncryptionType["KMS"] = "KMS";
    EncryptionType["NONE"] = "NONE";
})(EncryptionType = exports.EncryptionType || (exports.EncryptionType = {}));
var MetricsName;
(function (MetricsName) {
    MetricsName["ALL"] = "ALL";
    MetricsName["INCOMING_BYTES"] = "IncomingBytes";
    MetricsName["INCOMING_RECORDS"] = "IncomingRecords";
    MetricsName["ITERATOR_AGE_MILLISECONDS"] = "IteratorAgeMilliseconds";
    MetricsName["OUTGOING_BYTES"] = "OutgoingBytes";
    MetricsName["OUTGOING_RECORDS"] = "OutgoingRecords";
    MetricsName["READ_PROVISIONED_THROUGHPUT_EXCEEDED"] = "ReadProvisionedThroughputExceeded";
    MetricsName["WRITE_PROVISIONED_THROUGHPUT_EXCEEDED"] = "WriteProvisionedThroughputExceeded";
})(MetricsName = exports.MetricsName || (exports.MetricsName = {}));
var EnhancedMetrics;
(function (EnhancedMetrics) {
    EnhancedMetrics.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EnhancedMetrics = exports.EnhancedMetrics || (exports.EnhancedMetrics = {}));
var SequenceNumberRange;
(function (SequenceNumberRange) {
    SequenceNumberRange.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SequenceNumberRange = exports.SequenceNumberRange || (exports.SequenceNumberRange = {}));
var Shard;
(function (Shard) {
    Shard.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Shard = exports.Shard || (exports.Shard = {}));
var StreamStatus;
(function (StreamStatus) {
    StreamStatus["ACTIVE"] = "ACTIVE";
    StreamStatus["CREATING"] = "CREATING";
    StreamStatus["DELETING"] = "DELETING";
    StreamStatus["UPDATING"] = "UPDATING";
})(StreamStatus = exports.StreamStatus || (exports.StreamStatus = {}));
var StreamDescription;
(function (StreamDescription) {
    StreamDescription.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StreamDescription = exports.StreamDescription || (exports.StreamDescription = {}));
var DescribeStreamOutput;
(function (DescribeStreamOutput) {
    DescribeStreamOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeStreamOutput = exports.DescribeStreamOutput || (exports.DescribeStreamOutput = {}));
var DescribeStreamConsumerInput;
(function (DescribeStreamConsumerInput) {
    DescribeStreamConsumerInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeStreamConsumerInput = exports.DescribeStreamConsumerInput || (exports.DescribeStreamConsumerInput = {}));
var DescribeStreamConsumerOutput;
(function (DescribeStreamConsumerOutput) {
    DescribeStreamConsumerOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeStreamConsumerOutput = exports.DescribeStreamConsumerOutput || (exports.DescribeStreamConsumerOutput = {}));
var DescribeStreamSummaryInput;
(function (DescribeStreamSummaryInput) {
    DescribeStreamSummaryInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeStreamSummaryInput = exports.DescribeStreamSummaryInput || (exports.DescribeStreamSummaryInput = {}));
var StreamDescriptionSummary;
(function (StreamDescriptionSummary) {
    StreamDescriptionSummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StreamDescriptionSummary = exports.StreamDescriptionSummary || (exports.StreamDescriptionSummary = {}));
var DescribeStreamSummaryOutput;
(function (DescribeStreamSummaryOutput) {
    DescribeStreamSummaryOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeStreamSummaryOutput = exports.DescribeStreamSummaryOutput || (exports.DescribeStreamSummaryOutput = {}));
var DisableEnhancedMonitoringInput;
(function (DisableEnhancedMonitoringInput) {
    DisableEnhancedMonitoringInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DisableEnhancedMonitoringInput = exports.DisableEnhancedMonitoringInput || (exports.DisableEnhancedMonitoringInput = {}));
var EnhancedMonitoringOutput;
(function (EnhancedMonitoringOutput) {
    EnhancedMonitoringOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EnhancedMonitoringOutput = exports.EnhancedMonitoringOutput || (exports.EnhancedMonitoringOutput = {}));
var EnableEnhancedMonitoringInput;
(function (EnableEnhancedMonitoringInput) {
    EnableEnhancedMonitoringInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EnableEnhancedMonitoringInput = exports.EnableEnhancedMonitoringInput || (exports.EnableEnhancedMonitoringInput = {}));
var ExpiredIteratorException;
(function (ExpiredIteratorException) {
    ExpiredIteratorException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ExpiredIteratorException = exports.ExpiredIteratorException || (exports.ExpiredIteratorException = {}));
var ExpiredNextTokenException;
(function (ExpiredNextTokenException) {
    ExpiredNextTokenException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ExpiredNextTokenException = exports.ExpiredNextTokenException || (exports.ExpiredNextTokenException = {}));
var GetRecordsInput;
(function (GetRecordsInput) {
    GetRecordsInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetRecordsInput = exports.GetRecordsInput || (exports.GetRecordsInput = {}));
var _Record;
(function (_Record) {
    _Record.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(_Record = exports._Record || (exports._Record = {}));
var GetRecordsOutput;
(function (GetRecordsOutput) {
    GetRecordsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetRecordsOutput = exports.GetRecordsOutput || (exports.GetRecordsOutput = {}));
var KMSAccessDeniedException;
(function (KMSAccessDeniedException) {
    KMSAccessDeniedException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KMSAccessDeniedException = exports.KMSAccessDeniedException || (exports.KMSAccessDeniedException = {}));
var KMSDisabledException;
(function (KMSDisabledException) {
    KMSDisabledException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KMSDisabledException = exports.KMSDisabledException || (exports.KMSDisabledException = {}));
var KMSInvalidStateException;
(function (KMSInvalidStateException) {
    KMSInvalidStateException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KMSInvalidStateException = exports.KMSInvalidStateException || (exports.KMSInvalidStateException = {}));
var KMSNotFoundException;
(function (KMSNotFoundException) {
    KMSNotFoundException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KMSNotFoundException = exports.KMSNotFoundException || (exports.KMSNotFoundException = {}));
var KMSOptInRequired;
(function (KMSOptInRequired) {
    KMSOptInRequired.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KMSOptInRequired = exports.KMSOptInRequired || (exports.KMSOptInRequired = {}));
var KMSThrottlingException;
(function (KMSThrottlingException) {
    KMSThrottlingException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KMSThrottlingException = exports.KMSThrottlingException || (exports.KMSThrottlingException = {}));
var ProvisionedThroughputExceededException;
(function (ProvisionedThroughputExceededException) {
    ProvisionedThroughputExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ProvisionedThroughputExceededException = exports.ProvisionedThroughputExceededException || (exports.ProvisionedThroughputExceededException = {}));
var ShardIteratorType;
(function (ShardIteratorType) {
    ShardIteratorType["AFTER_SEQUENCE_NUMBER"] = "AFTER_SEQUENCE_NUMBER";
    ShardIteratorType["AT_SEQUENCE_NUMBER"] = "AT_SEQUENCE_NUMBER";
    ShardIteratorType["AT_TIMESTAMP"] = "AT_TIMESTAMP";
    ShardIteratorType["LATEST"] = "LATEST";
    ShardIteratorType["TRIM_HORIZON"] = "TRIM_HORIZON";
})(ShardIteratorType = exports.ShardIteratorType || (exports.ShardIteratorType = {}));
var GetShardIteratorInput;
(function (GetShardIteratorInput) {
    GetShardIteratorInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetShardIteratorInput = exports.GetShardIteratorInput || (exports.GetShardIteratorInput = {}));
var GetShardIteratorOutput;
(function (GetShardIteratorOutput) {
    GetShardIteratorOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetShardIteratorOutput = exports.GetShardIteratorOutput || (exports.GetShardIteratorOutput = {}));
var IncreaseStreamRetentionPeriodInput;
(function (IncreaseStreamRetentionPeriodInput) {
    IncreaseStreamRetentionPeriodInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IncreaseStreamRetentionPeriodInput = exports.IncreaseStreamRetentionPeriodInput || (exports.IncreaseStreamRetentionPeriodInput = {}));
var InternalFailureException;
(function (InternalFailureException) {
    InternalFailureException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InternalFailureException = exports.InternalFailureException || (exports.InternalFailureException = {}));
var ShardFilterType;
(function (ShardFilterType) {
    ShardFilterType["AFTER_SHARD_ID"] = "AFTER_SHARD_ID";
    ShardFilterType["AT_LATEST"] = "AT_LATEST";
    ShardFilterType["AT_TIMESTAMP"] = "AT_TIMESTAMP";
    ShardFilterType["AT_TRIM_HORIZON"] = "AT_TRIM_HORIZON";
    ShardFilterType["FROM_TIMESTAMP"] = "FROM_TIMESTAMP";
    ShardFilterType["FROM_TRIM_HORIZON"] = "FROM_TRIM_HORIZON";
})(ShardFilterType = exports.ShardFilterType || (exports.ShardFilterType = {}));
var ShardFilter;
(function (ShardFilter) {
    ShardFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ShardFilter = exports.ShardFilter || (exports.ShardFilter = {}));
var ListShardsInput;
(function (ListShardsInput) {
    ListShardsInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListShardsInput = exports.ListShardsInput || (exports.ListShardsInput = {}));
var ListShardsOutput;
(function (ListShardsOutput) {
    ListShardsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListShardsOutput = exports.ListShardsOutput || (exports.ListShardsOutput = {}));
var ListStreamConsumersInput;
(function (ListStreamConsumersInput) {
    ListStreamConsumersInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListStreamConsumersInput = exports.ListStreamConsumersInput || (exports.ListStreamConsumersInput = {}));
var ListStreamConsumersOutput;
(function (ListStreamConsumersOutput) {
    ListStreamConsumersOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListStreamConsumersOutput = exports.ListStreamConsumersOutput || (exports.ListStreamConsumersOutput = {}));
var ListStreamsInput;
(function (ListStreamsInput) {
    ListStreamsInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListStreamsInput = exports.ListStreamsInput || (exports.ListStreamsInput = {}));
var ListStreamsOutput;
(function (ListStreamsOutput) {
    ListStreamsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListStreamsOutput = exports.ListStreamsOutput || (exports.ListStreamsOutput = {}));
var ListTagsForStreamInput;
(function (ListTagsForStreamInput) {
    ListTagsForStreamInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListTagsForStreamInput = exports.ListTagsForStreamInput || (exports.ListTagsForStreamInput = {}));
var Tag;
(function (Tag) {
    Tag.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Tag = exports.Tag || (exports.Tag = {}));
var ListTagsForStreamOutput;
(function (ListTagsForStreamOutput) {
    ListTagsForStreamOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListTagsForStreamOutput = exports.ListTagsForStreamOutput || (exports.ListTagsForStreamOutput = {}));
var MergeShardsInput;
(function (MergeShardsInput) {
    MergeShardsInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MergeShardsInput = exports.MergeShardsInput || (exports.MergeShardsInput = {}));
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
var PutRecordsRequestEntry;
(function (PutRecordsRequestEntry) {
    PutRecordsRequestEntry.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutRecordsRequestEntry = exports.PutRecordsRequestEntry || (exports.PutRecordsRequestEntry = {}));
var PutRecordsInput;
(function (PutRecordsInput) {
    PutRecordsInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutRecordsInput = exports.PutRecordsInput || (exports.PutRecordsInput = {}));
var PutRecordsResultEntry;
(function (PutRecordsResultEntry) {
    PutRecordsResultEntry.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutRecordsResultEntry = exports.PutRecordsResultEntry || (exports.PutRecordsResultEntry = {}));
var PutRecordsOutput;
(function (PutRecordsOutput) {
    PutRecordsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutRecordsOutput = exports.PutRecordsOutput || (exports.PutRecordsOutput = {}));
var RegisterStreamConsumerInput;
(function (RegisterStreamConsumerInput) {
    RegisterStreamConsumerInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RegisterStreamConsumerInput = exports.RegisterStreamConsumerInput || (exports.RegisterStreamConsumerInput = {}));
var RegisterStreamConsumerOutput;
(function (RegisterStreamConsumerOutput) {
    RegisterStreamConsumerOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RegisterStreamConsumerOutput = exports.RegisterStreamConsumerOutput || (exports.RegisterStreamConsumerOutput = {}));
var RemoveTagsFromStreamInput;
(function (RemoveTagsFromStreamInput) {
    RemoveTagsFromStreamInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RemoveTagsFromStreamInput = exports.RemoveTagsFromStreamInput || (exports.RemoveTagsFromStreamInput = {}));
var SplitShardInput;
(function (SplitShardInput) {
    SplitShardInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SplitShardInput = exports.SplitShardInput || (exports.SplitShardInput = {}));
var StartStreamEncryptionInput;
(function (StartStreamEncryptionInput) {
    StartStreamEncryptionInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartStreamEncryptionInput = exports.StartStreamEncryptionInput || (exports.StartStreamEncryptionInput = {}));
var StopStreamEncryptionInput;
(function (StopStreamEncryptionInput) {
    StopStreamEncryptionInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopStreamEncryptionInput = exports.StopStreamEncryptionInput || (exports.StopStreamEncryptionInput = {}));
var StartingPosition;
(function (StartingPosition) {
    StartingPosition.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartingPosition = exports.StartingPosition || (exports.StartingPosition = {}));
var SubscribeToShardInput;
(function (SubscribeToShardInput) {
    SubscribeToShardInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SubscribeToShardInput = exports.SubscribeToShardInput || (exports.SubscribeToShardInput = {}));
var SubscribeToShardEvent;
(function (SubscribeToShardEvent) {
    SubscribeToShardEvent.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SubscribeToShardEvent = exports.SubscribeToShardEvent || (exports.SubscribeToShardEvent = {}));
var SubscribeToShardEventStream;
(function (SubscribeToShardEventStream) {
    SubscribeToShardEventStream.visit = (value, visitor) => {
        if (value.SubscribeToShardEvent !== undefined)
            return visitor.SubscribeToShardEvent(value.SubscribeToShardEvent);
        if (value.ResourceNotFoundException !== undefined)
            return visitor.ResourceNotFoundException(value.ResourceNotFoundException);
        if (value.ResourceInUseException !== undefined)
            return visitor.ResourceInUseException(value.ResourceInUseException);
        if (value.KMSDisabledException !== undefined)
            return visitor.KMSDisabledException(value.KMSDisabledException);
        if (value.KMSInvalidStateException !== undefined)
            return visitor.KMSInvalidStateException(value.KMSInvalidStateException);
        if (value.KMSAccessDeniedException !== undefined)
            return visitor.KMSAccessDeniedException(value.KMSAccessDeniedException);
        if (value.KMSNotFoundException !== undefined)
            return visitor.KMSNotFoundException(value.KMSNotFoundException);
        if (value.KMSOptInRequired !== undefined)
            return visitor.KMSOptInRequired(value.KMSOptInRequired);
        if (value.KMSThrottlingException !== undefined)
            return visitor.KMSThrottlingException(value.KMSThrottlingException);
        if (value.InternalFailureException !== undefined)
            return visitor.InternalFailureException(value.InternalFailureException);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    SubscribeToShardEventStream.filterSensitiveLog = (obj) => {
        if (obj.SubscribeToShardEvent !== undefined)
            return { SubscribeToShardEvent: SubscribeToShardEvent.filterSensitiveLog(obj.SubscribeToShardEvent) };
        if (obj.ResourceNotFoundException !== undefined)
            return { ResourceNotFoundException: ResourceNotFoundException.filterSensitiveLog(obj.ResourceNotFoundException) };
        if (obj.ResourceInUseException !== undefined)
            return { ResourceInUseException: ResourceInUseException.filterSensitiveLog(obj.ResourceInUseException) };
        if (obj.KMSDisabledException !== undefined)
            return { KMSDisabledException: KMSDisabledException.filterSensitiveLog(obj.KMSDisabledException) };
        if (obj.KMSInvalidStateException !== undefined)
            return { KMSInvalidStateException: KMSInvalidStateException.filterSensitiveLog(obj.KMSInvalidStateException) };
        if (obj.KMSAccessDeniedException !== undefined)
            return { KMSAccessDeniedException: KMSAccessDeniedException.filterSensitiveLog(obj.KMSAccessDeniedException) };
        if (obj.KMSNotFoundException !== undefined)
            return { KMSNotFoundException: KMSNotFoundException.filterSensitiveLog(obj.KMSNotFoundException) };
        if (obj.KMSOptInRequired !== undefined)
            return { KMSOptInRequired: KMSOptInRequired.filterSensitiveLog(obj.KMSOptInRequired) };
        if (obj.KMSThrottlingException !== undefined)
            return { KMSThrottlingException: KMSThrottlingException.filterSensitiveLog(obj.KMSThrottlingException) };
        if (obj.InternalFailureException !== undefined)
            return { InternalFailureException: InternalFailureException.filterSensitiveLog(obj.InternalFailureException) };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: "UNKNOWN" };
    };
})(SubscribeToShardEventStream = exports.SubscribeToShardEventStream || (exports.SubscribeToShardEventStream = {}));
var SubscribeToShardOutput;
(function (SubscribeToShardOutput) {
    SubscribeToShardOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.EventStream && { EventStream: "STREAMING_CONTENT" }),
    });
})(SubscribeToShardOutput = exports.SubscribeToShardOutput || (exports.SubscribeToShardOutput = {}));
var ScalingType;
(function (ScalingType) {
    ScalingType["UNIFORM_SCALING"] = "UNIFORM_SCALING";
})(ScalingType = exports.ScalingType || (exports.ScalingType = {}));
var UpdateShardCountInput;
(function (UpdateShardCountInput) {
    UpdateShardCountInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateShardCountInput = exports.UpdateShardCountInput || (exports.UpdateShardCountInput = {}));
var UpdateShardCountOutput;
(function (UpdateShardCountOutput) {
    UpdateShardCountOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateShardCountOutput = exports.UpdateShardCountOutput || (exports.UpdateShardCountOutput = {}));
//# sourceMappingURL=models_0.js.map