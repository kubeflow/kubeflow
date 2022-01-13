import { SmithyException as __SmithyException } from "@aws-sdk/smithy-client";
import { MetadataBearer as $MetadataBearer } from "@aws-sdk/types";

/**
 * <p>Represents the input for <code>AddTagsToStream</code>.</p>
 */
export interface AddTagsToStreamInput {
  /**
   * <p>The name of the stream.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>A set of up to 10 key-value pairs to use to create the tags.</p>
   */
  Tags: { [key: string]: string } | undefined;
}

export namespace AddTagsToStreamInput {
  export const filterSensitiveLog = (obj: AddTagsToStreamInput): any => ({
    ...obj,
  });
}

/**
 * <p>A specified parameter exceeds its restrictions, is not supported, or can't be used.
 *             For more information, see the returned message.</p>
 */
export interface InvalidArgumentException extends __SmithyException, $MetadataBearer {
  name: "InvalidArgumentException";
  $fault: "client";
  /**
   * <p>A message that provides information about the error.</p>
   */
  message?: string;
}

export namespace InvalidArgumentException {
  export const filterSensitiveLog = (obj: InvalidArgumentException): any => ({
    ...obj,
  });
}

/**
 * <p>The requested resource exceeds the maximum number allowed, or the number of
 *             concurrent stream requests exceeds the maximum number allowed. </p>
 */
export interface LimitExceededException extends __SmithyException, $MetadataBearer {
  name: "LimitExceededException";
  $fault: "client";
  /**
   * <p>A message that provides information about the error.</p>
   */
  message?: string;
}

export namespace LimitExceededException {
  export const filterSensitiveLog = (obj: LimitExceededException): any => ({
    ...obj,
  });
}

/**
 * <p>The resource is not available for this operation. For successful operation, the
 *             resource must be in the <code>ACTIVE</code> state.</p>
 */
export interface ResourceInUseException extends __SmithyException, $MetadataBearer {
  name: "ResourceInUseException";
  $fault: "client";
  /**
   * <p>A message that provides information about the error.</p>
   */
  message?: string;
}

export namespace ResourceInUseException {
  export const filterSensitiveLog = (obj: ResourceInUseException): any => ({
    ...obj,
  });
}

/**
 * <p>The requested resource could not be found. The stream might not be specified
 *             correctly.</p>
 */
export interface ResourceNotFoundException extends __SmithyException, $MetadataBearer {
  name: "ResourceNotFoundException";
  $fault: "client";
  /**
   * <p>A message that provides information about the error.</p>
   */
  message?: string;
}

export namespace ResourceNotFoundException {
  export const filterSensitiveLog = (obj: ResourceNotFoundException): any => ({
    ...obj,
  });
}

/**
 * <p>The range of possible hash key values for the shard, which is a set of ordered
 *             contiguous positive integers.</p>
 */
export interface HashKeyRange {
  /**
   * <p>The starting hash key of the hash key range.</p>
   */
  StartingHashKey: string | undefined;

  /**
   * <p>The ending hash key of the hash key range.</p>
   */
  EndingHashKey: string | undefined;
}

export namespace HashKeyRange {
  export const filterSensitiveLog = (obj: HashKeyRange): any => ({
    ...obj,
  });
}

export interface ChildShard {
  ShardId: string | undefined;
  ParentShards: string[] | undefined;
  /**
   * <p>The range of possible hash key values for the shard, which is a set of ordered
   *             contiguous positive integers.</p>
   */
  HashKeyRange: HashKeyRange | undefined;
}

export namespace ChildShard {
  export const filterSensitiveLog = (obj: ChildShard): any => ({
    ...obj,
  });
}

export enum ConsumerStatus {
  ACTIVE = "ACTIVE",
  CREATING = "CREATING",
  DELETING = "DELETING",
}

/**
 * <p>An object that represents the details of the consumer you registered. This type of
 *             object is returned by <a>RegisterStreamConsumer</a>.</p>
 */
export interface Consumer {
  /**
   * <p>The name of the consumer is something you choose when you register the
   *             consumer.</p>
   */
  ConsumerName: string | undefined;

  /**
   * <p>When you register a consumer, Kinesis Data Streams generates an ARN for it. You need
   *             this ARN to be able to call <a>SubscribeToShard</a>.</p>
   *         <p>If you delete a consumer and then create a new one with the same name, it won't have
   *             the same ARN. That's because consumer ARNs contain the creation timestamp. This is
   *             important to keep in mind if you have IAM policies that reference consumer ARNs.</p>
   */
  ConsumerARN: string | undefined;

  /**
   * <p>A consumer can't read data while in the <code>CREATING</code> or <code>DELETING</code>
   *             states.</p>
   */
  ConsumerStatus: ConsumerStatus | string | undefined;

  /**
   * <p></p>
   */
  ConsumerCreationTimestamp: Date | undefined;
}

export namespace Consumer {
  export const filterSensitiveLog = (obj: Consumer): any => ({
    ...obj,
  });
}

/**
 * <p>An object that represents the details of a registered consumer. This type of object is
 *             returned by <a>DescribeStreamConsumer</a>.</p>
 */
export interface ConsumerDescription {
  /**
   * <p>The name of the consumer is something you choose when you register the
   *             consumer.</p>
   */
  ConsumerName: string | undefined;

  /**
   * <p>When you register a consumer, Kinesis Data Streams generates an ARN for it. You need
   *             this ARN to be able to call <a>SubscribeToShard</a>.</p>
   *         <p>If you delete a consumer and then create a new one with the same name, it won't have
   *             the same ARN. That's because consumer ARNs contain the creation timestamp. This is
   *             important to keep in mind if you have IAM policies that reference consumer ARNs.</p>
   */
  ConsumerARN: string | undefined;

  /**
   * <p>A consumer can't read data while in the <code>CREATING</code> or <code>DELETING</code>
   *             states.</p>
   */
  ConsumerStatus: ConsumerStatus | string | undefined;

  /**
   * <p></p>
   */
  ConsumerCreationTimestamp: Date | undefined;

  /**
   * <p>The ARN of the stream with which you registered the consumer.</p>
   */
  StreamARN: string | undefined;
}

export namespace ConsumerDescription {
  export const filterSensitiveLog = (obj: ConsumerDescription): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the input for <code>CreateStream</code>.</p>
 */
export interface CreateStreamInput {
  /**
   * <p>A name to identify the stream. The stream name is scoped to the AWS account used by
   *             the application that creates the stream. It is also scoped by AWS Region. That is, two
   *             streams in two different AWS accounts can have the same name. Two streams in the same
   *             AWS account but in two different Regions can also have the same name.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>The number of shards that the stream will use. The throughput of the stream is a
   *             function of the number of shards; more shards are required for greater provisioned
   *             throughput.</p>
   */
  ShardCount: number | undefined;
}

export namespace CreateStreamInput {
  export const filterSensitiveLog = (obj: CreateStreamInput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the input for <a>DecreaseStreamRetentionPeriod</a>.</p>
 */
export interface DecreaseStreamRetentionPeriodInput {
  /**
   * <p>The name of the stream to modify.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>The new retention period of the stream, in hours. Must be less than the current
   *             retention period.</p>
   */
  RetentionPeriodHours: number | undefined;
}

export namespace DecreaseStreamRetentionPeriodInput {
  export const filterSensitiveLog = (obj: DecreaseStreamRetentionPeriodInput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the input for <a>DeleteStream</a>.</p>
 */
export interface DeleteStreamInput {
  /**
   * <p>The name of the stream to delete.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>If this parameter is unset (<code>null</code>) or if you set it to <code>false</code>,
   *             and the stream has registered consumers, the call to <code>DeleteStream</code> fails
   *             with a <code>ResourceInUseException</code>. </p>
   */
  EnforceConsumerDeletion?: boolean;
}

export namespace DeleteStreamInput {
  export const filterSensitiveLog = (obj: DeleteStreamInput): any => ({
    ...obj,
  });
}

export interface DeregisterStreamConsumerInput {
  /**
   * <p>The ARN of the Kinesis data stream that the consumer is registered with. For more
   *             information, see <a href="https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-kinesis-streams">Amazon Resource Names (ARNs) and AWS Service Namespaces</a>.</p>
   */
  StreamARN?: string;

  /**
   * <p>The name that you gave to the consumer.</p>
   */
  ConsumerName?: string;

  /**
   * <p>The ARN returned by Kinesis Data Streams when you registered the consumer. If you
   *             don't know the ARN of the consumer that you want to deregister, you can use the
   *             ListStreamConsumers operation to get a list of the descriptions of all the consumers
   *             that are currently registered with a given data stream. The description of a consumer
   *             contains its ARN.</p>
   */
  ConsumerARN?: string;
}

export namespace DeregisterStreamConsumerInput {
  export const filterSensitiveLog = (obj: DeregisterStreamConsumerInput): any => ({
    ...obj,
  });
}

export interface DescribeLimitsInput {}

export namespace DescribeLimitsInput {
  export const filterSensitiveLog = (obj: DescribeLimitsInput): any => ({
    ...obj,
  });
}

export interface DescribeLimitsOutput {
  /**
   * <p>The maximum number of shards.</p>
   */
  ShardLimit: number | undefined;

  /**
   * <p>The number of open shards.</p>
   */
  OpenShardCount: number | undefined;
}

export namespace DescribeLimitsOutput {
  export const filterSensitiveLog = (obj: DescribeLimitsOutput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the input for <code>DescribeStream</code>.</p>
 */
export interface DescribeStreamInput {
  /**
   * <p>The name of the stream to describe.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>The maximum number of shards to return in a single call. The default value is 100.
   *             If you specify a value greater than 100, at most 100 shards are returned.</p>
   */
  Limit?: number;

  /**
   * <p>The shard ID of the shard to start with.</p>
   */
  ExclusiveStartShardId?: string;
}

export namespace DescribeStreamInput {
  export const filterSensitiveLog = (obj: DescribeStreamInput): any => ({
    ...obj,
  });
}

export enum EncryptionType {
  KMS = "KMS",
  NONE = "NONE",
}

export enum MetricsName {
  ALL = "ALL",
  INCOMING_BYTES = "IncomingBytes",
  INCOMING_RECORDS = "IncomingRecords",
  ITERATOR_AGE_MILLISECONDS = "IteratorAgeMilliseconds",
  OUTGOING_BYTES = "OutgoingBytes",
  OUTGOING_RECORDS = "OutgoingRecords",
  READ_PROVISIONED_THROUGHPUT_EXCEEDED = "ReadProvisionedThroughputExceeded",
  WRITE_PROVISIONED_THROUGHPUT_EXCEEDED = "WriteProvisionedThroughputExceeded",
}

/**
 * <p>Represents enhanced metrics types.</p>
 */
export interface EnhancedMetrics {
  /**
   * <p>List of shard-level metrics.</p>
   *         <p>The following are the valid shard-level metrics. The value "<code>ALL</code>"
   *             enhances every metric.</p>
   *         <ul>
   *             <li>
   *                 <p>
   *                     <code>IncomingBytes</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>IncomingRecords</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>OutgoingBytes</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>OutgoingRecords</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>WriteProvisionedThroughputExceeded</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>ReadProvisionedThroughputExceeded</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>IteratorAgeMilliseconds</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>ALL</code>
   *                 </p>
   *             </li>
   *          </ul>
   *         <p>For more information, see <a href="https://docs.aws.amazon.com/kinesis/latest/dev/monitoring-with-cloudwatch.html">Monitoring the Amazon
   *                 Kinesis Data Streams Service with Amazon CloudWatch</a> in the <i>Amazon
   *                 Kinesis Data Streams Developer Guide</i>.</p>
   */
  ShardLevelMetrics?: (MetricsName | string)[];
}

export namespace EnhancedMetrics {
  export const filterSensitiveLog = (obj: EnhancedMetrics): any => ({
    ...obj,
  });
}

/**
 * <p>The range of possible sequence numbers for the shard.</p>
 */
export interface SequenceNumberRange {
  /**
   * <p>The starting sequence number for the range.</p>
   */
  StartingSequenceNumber: string | undefined;

  /**
   * <p>The ending sequence number for the range. Shards that are in the OPEN state have an
   *             ending sequence number of <code>null</code>.</p>
   */
  EndingSequenceNumber?: string;
}

export namespace SequenceNumberRange {
  export const filterSensitiveLog = (obj: SequenceNumberRange): any => ({
    ...obj,
  });
}

/**
 * <p>A uniquely identified group of data records in a Kinesis data stream.</p>
 */
export interface Shard {
  /**
   * <p>The unique identifier of the shard within the stream.</p>
   */
  ShardId: string | undefined;

  /**
   * <p>The shard ID of the shard's parent.</p>
   */
  ParentShardId?: string;

  /**
   * <p>The shard ID of the shard adjacent to the shard's parent.</p>
   */
  AdjacentParentShardId?: string;

  /**
   * <p>The range of possible hash key values for the shard, which is a set of ordered
   *             contiguous positive integers.</p>
   */
  HashKeyRange: HashKeyRange | undefined;

  /**
   * <p>The range of possible sequence numbers for the shard.</p>
   */
  SequenceNumberRange: SequenceNumberRange | undefined;
}

export namespace Shard {
  export const filterSensitiveLog = (obj: Shard): any => ({
    ...obj,
  });
}

export enum StreamStatus {
  ACTIVE = "ACTIVE",
  CREATING = "CREATING",
  DELETING = "DELETING",
  UPDATING = "UPDATING",
}

/**
 * <p>Represents the output for <a>DescribeStream</a>.</p>
 */
export interface StreamDescription {
  /**
   * <p>The name of the stream being described.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>The Amazon Resource Name (ARN) for the stream being described.</p>
   */
  StreamARN: string | undefined;

  /**
   * <p>The current status of the stream being described. The stream status is one of the
   *             following states:</p>
   *         <ul>
   *             <li>
   *                 <p>
   *                     <code>CREATING</code> - The stream is being created. Kinesis Data Streams
   *                     immediately returns and sets <code>StreamStatus</code> to
   *                     <code>CREATING</code>.</p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>DELETING</code> - The stream is being deleted. The specified stream is in
   *                     the <code>DELETING</code> state until Kinesis Data Streams completes the
   *                     deletion.</p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>ACTIVE</code> - The stream exists and is ready for read and write
   *                     operations or deletion. You should perform read and write operations only on an
   *                         <code>ACTIVE</code> stream.</p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>UPDATING</code> - Shards in the stream are being merged or split. Read and
   *                     write operations continue to work while the stream is in the
   *                         <code>UPDATING</code> state.</p>
   *             </li>
   *          </ul>
   */
  StreamStatus: StreamStatus | string | undefined;

  /**
   * <p>The shards that comprise the stream.</p>
   */
  Shards: Shard[] | undefined;

  /**
   * <p>If set to <code>true</code>, more shards in the stream are available to
   *             describe.</p>
   */
  HasMoreShards: boolean | undefined;

  /**
   * <p>The current retention period, in hours. Minimum value of 24. Maximum value of
   *             168.</p>
   */
  RetentionPeriodHours: number | undefined;

  /**
   * <p>The approximate time that the stream was created.</p>
   */
  StreamCreationTimestamp: Date | undefined;

  /**
   * <p>Represents the current enhanced monitoring settings of the stream.</p>
   */
  EnhancedMonitoring: EnhancedMetrics[] | undefined;

  /**
   * <p>The server-side encryption type used on the stream. This parameter can be one of
   *             the following values:</p>
   *         <ul>
   *             <li>
   *                 <p>
   *                   <code>NONE</code>: Do not encrypt the records in the stream.</p>
   *             </li>
   *             <li>
   *                 <p>
   *                   <code>KMS</code>: Use server-side encryption on the records in the stream
   *                     using a customer-managed AWS KMS key.</p>
   *             </li>
   *          </ul>
   */
  EncryptionType?: EncryptionType | string;

  /**
   * <p>The GUID for the customer-managed AWS KMS key to use for encryption. This value can
   *             be a globally unique identifier, a fully specified ARN to either an alias or a key, or
   *             an alias name prefixed by "alias/".You can also use a master key owned by Kinesis Data
   *             Streams by specifying the alias <code>aws/kinesis</code>.</p>
   *         <ul>
   *             <li>
   *                 <p>Key ARN example:
   *                         <code>arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012</code>
   *                </p>
   *             </li>
   *             <li>
   *                 <p>Alias ARN example:
   *                         <code>arn:aws:kms:us-east-1:123456789012:alias/MyAliasName</code>
   *                </p>
   *             </li>
   *             <li>
   *                 <p>Globally unique key ID example:
   *                         <code>12345678-1234-1234-1234-123456789012</code>
   *                </p>
   *             </li>
   *             <li>
   *                 <p>Alias name example: <code>alias/MyAliasName</code>
   *                </p>
   *             </li>
   *             <li>
   *                 <p>Master key owned by Kinesis Data Streams:
   *                     <code>alias/aws/kinesis</code>
   *                </p>
   *             </li>
   *          </ul>
   */
  KeyId?: string;
}

export namespace StreamDescription {
  export const filterSensitiveLog = (obj: StreamDescription): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the output for <code>DescribeStream</code>.</p>
 */
export interface DescribeStreamOutput {
  /**
   * <p>The current status of the stream, the stream Amazon Resource Name (ARN), an array
   *             of shard objects that comprise the stream, and whether there are more shards
   *             available.</p>
   */
  StreamDescription: StreamDescription | undefined;
}

export namespace DescribeStreamOutput {
  export const filterSensitiveLog = (obj: DescribeStreamOutput): any => ({
    ...obj,
  });
}

export interface DescribeStreamConsumerInput {
  /**
   * <p>The ARN of the Kinesis data stream that the consumer is registered with. For more
   *             information, see <a href="https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-kinesis-streams">Amazon Resource Names (ARNs) and AWS Service Namespaces</a>.</p>
   */
  StreamARN?: string;

  /**
   * <p>The name that you gave to the consumer.</p>
   */
  ConsumerName?: string;

  /**
   * <p>The ARN returned by Kinesis Data Streams when you registered the consumer.</p>
   */
  ConsumerARN?: string;
}

export namespace DescribeStreamConsumerInput {
  export const filterSensitiveLog = (obj: DescribeStreamConsumerInput): any => ({
    ...obj,
  });
}

export interface DescribeStreamConsumerOutput {
  /**
   * <p>An object that represents the details of the consumer.</p>
   */
  ConsumerDescription: ConsumerDescription | undefined;
}

export namespace DescribeStreamConsumerOutput {
  export const filterSensitiveLog = (obj: DescribeStreamConsumerOutput): any => ({
    ...obj,
  });
}

export interface DescribeStreamSummaryInput {
  /**
   * <p>The name of the stream to describe.</p>
   */
  StreamName: string | undefined;
}

export namespace DescribeStreamSummaryInput {
  export const filterSensitiveLog = (obj: DescribeStreamSummaryInput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the output for <a>DescribeStreamSummary</a>
 *          </p>
 */
export interface StreamDescriptionSummary {
  /**
   * <p>The name of the stream being described.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>The Amazon Resource Name (ARN) for the stream being described.</p>
   */
  StreamARN: string | undefined;

  /**
   * <p>The current status of the stream being described. The stream status is one of the
   *             following states:</p>
   *         <ul>
   *             <li>
   *                 <p>
   *                     <code>CREATING</code> - The stream is being created. Kinesis Data Streams
   *                     immediately returns and sets <code>StreamStatus</code> to
   *                     <code>CREATING</code>.</p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>DELETING</code> - The stream is being deleted. The specified stream is in
   *                     the <code>DELETING</code> state until Kinesis Data Streams completes the
   *                     deletion.</p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>ACTIVE</code> - The stream exists and is ready for read and write
   *                     operations or deletion. You should perform read and write operations only on an
   *                         <code>ACTIVE</code> stream.</p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>UPDATING</code> - Shards in the stream are being merged or split. Read and
   *                     write operations continue to work while the stream is in the
   *                         <code>UPDATING</code> state.</p>
   *             </li>
   *          </ul>
   */
  StreamStatus: StreamStatus | string | undefined;

  /**
   * <p>The current retention period, in hours.</p>
   */
  RetentionPeriodHours: number | undefined;

  /**
   * <p>The approximate time that the stream was created.</p>
   */
  StreamCreationTimestamp: Date | undefined;

  /**
   * <p>Represents the current enhanced monitoring settings of the stream.</p>
   */
  EnhancedMonitoring: EnhancedMetrics[] | undefined;

  /**
   * <p>The encryption type used. This value is one of the following:</p>
   *         <ul>
   *             <li>
   *                 <p>
   *                   <code>KMS</code>
   *                </p>
   *             </li>
   *             <li>
   *                 <p>
   *                   <code>NONE</code>
   *                </p>
   *             </li>
   *          </ul>
   */
  EncryptionType?: EncryptionType | string;

  /**
   * <p>The GUID for the customer-managed AWS KMS key to use for encryption. This value can
   *             be a globally unique identifier, a fully specified ARN to either an alias or a key, or
   *             an alias name prefixed by "alias/".You can also use a master key owned by Kinesis Data
   *             Streams by specifying the alias <code>aws/kinesis</code>.</p>
   *         <ul>
   *             <li>
   *                 <p>Key ARN example:
   *                         <code>arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012</code>
   *                </p>
   *             </li>
   *             <li>
   *                 <p>Alias ARN example: <code>
   *                         arn:aws:kms:us-east-1:123456789012:alias/MyAliasName</code>
   *                </p>
   *             </li>
   *             <li>
   *                 <p>Globally unique key ID example:
   *                         <code>12345678-1234-1234-1234-123456789012</code>
   *                </p>
   *             </li>
   *             <li>
   *                 <p>Alias name example: <code>alias/MyAliasName</code>
   *                </p>
   *             </li>
   *             <li>
   *                 <p>Master key owned by Kinesis Data Streams:
   *                     <code>alias/aws/kinesis</code>
   *                </p>
   *             </li>
   *          </ul>
   */
  KeyId?: string;

  /**
   * <p>The number of open shards in the stream.</p>
   */
  OpenShardCount: number | undefined;

  /**
   * <p>The number of enhanced fan-out consumers registered with the stream.</p>
   */
  ConsumerCount?: number;
}

export namespace StreamDescriptionSummary {
  export const filterSensitiveLog = (obj: StreamDescriptionSummary): any => ({
    ...obj,
  });
}

export interface DescribeStreamSummaryOutput {
  /**
   * <p>A <a>StreamDescriptionSummary</a> containing information about the
   *             stream.</p>
   */
  StreamDescriptionSummary: StreamDescriptionSummary | undefined;
}

export namespace DescribeStreamSummaryOutput {
  export const filterSensitiveLog = (obj: DescribeStreamSummaryOutput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the input for <a>DisableEnhancedMonitoring</a>.</p>
 */
export interface DisableEnhancedMonitoringInput {
  /**
   * <p>The name of the Kinesis data stream for which to disable enhanced
   *             monitoring.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>List of shard-level metrics to disable.</p>
   *         <p>The following are the valid shard-level metrics. The value "<code>ALL</code>"
   *             disables every metric.</p>
   *         <ul>
   *             <li>
   *                 <p>
   *                     <code>IncomingBytes</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>IncomingRecords</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>OutgoingBytes</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>OutgoingRecords</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>WriteProvisionedThroughputExceeded</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>ReadProvisionedThroughputExceeded</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>IteratorAgeMilliseconds</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>ALL</code>
   *                 </p>
   *             </li>
   *          </ul>
   *         <p>For more information, see <a href="https://docs.aws.amazon.com/kinesis/latest/dev/monitoring-with-cloudwatch.html">Monitoring the Amazon
   *                 Kinesis Data Streams Service with Amazon CloudWatch</a> in the <i>Amazon
   *                 Kinesis Data Streams Developer Guide</i>.</p>
   */
  ShardLevelMetrics: (MetricsName | string)[] | undefined;
}

export namespace DisableEnhancedMonitoringInput {
  export const filterSensitiveLog = (obj: DisableEnhancedMonitoringInput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the output for <a>EnableEnhancedMonitoring</a> and <a>DisableEnhancedMonitoring</a>.</p>
 */
export interface EnhancedMonitoringOutput {
  /**
   * <p>The name of the Kinesis data stream.</p>
   */
  StreamName?: string;

  /**
   * <p>Represents the current state of the metrics that are in the enhanced state before
   *             the operation.</p>
   */
  CurrentShardLevelMetrics?: (MetricsName | string)[];

  /**
   * <p>Represents the list of all the metrics that would be in the enhanced state after
   *             the operation.</p>
   */
  DesiredShardLevelMetrics?: (MetricsName | string)[];
}

export namespace EnhancedMonitoringOutput {
  export const filterSensitiveLog = (obj: EnhancedMonitoringOutput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the input for <a>EnableEnhancedMonitoring</a>.</p>
 */
export interface EnableEnhancedMonitoringInput {
  /**
   * <p>The name of the stream for which to enable enhanced monitoring.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>List of shard-level metrics to enable.</p>
   *         <p>The following are the valid shard-level metrics. The value "<code>ALL</code>"
   *             enables every metric.</p>
   *         <ul>
   *             <li>
   *                 <p>
   *                     <code>IncomingBytes</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>IncomingRecords</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>OutgoingBytes</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>OutgoingRecords</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>WriteProvisionedThroughputExceeded</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>ReadProvisionedThroughputExceeded</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>IteratorAgeMilliseconds</code>
   *                 </p>
   *             </li>
   *             <li>
   *                 <p>
   *                     <code>ALL</code>
   *                 </p>
   *             </li>
   *          </ul>
   *         <p>For more information, see <a href="https://docs.aws.amazon.com/kinesis/latest/dev/monitoring-with-cloudwatch.html">Monitoring the Amazon
   *                 Kinesis Data Streams Service with Amazon CloudWatch</a> in the <i>Amazon
   *                 Kinesis Data Streams Developer Guide</i>.</p>
   */
  ShardLevelMetrics: (MetricsName | string)[] | undefined;
}

export namespace EnableEnhancedMonitoringInput {
  export const filterSensitiveLog = (obj: EnableEnhancedMonitoringInput): any => ({
    ...obj,
  });
}

/**
 * <p>The provided iterator exceeds the maximum age allowed.</p>
 */
export interface ExpiredIteratorException extends __SmithyException, $MetadataBearer {
  name: "ExpiredIteratorException";
  $fault: "client";
  /**
   * <p>A message that provides information about the error.</p>
   */
  message?: string;
}

export namespace ExpiredIteratorException {
  export const filterSensitiveLog = (obj: ExpiredIteratorException): any => ({
    ...obj,
  });
}

/**
 * <p>The pagination token passed to the operation is expired.</p>
 */
export interface ExpiredNextTokenException extends __SmithyException, $MetadataBearer {
  name: "ExpiredNextTokenException";
  $fault: "client";
  message?: string;
}

export namespace ExpiredNextTokenException {
  export const filterSensitiveLog = (obj: ExpiredNextTokenException): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the input for <a>GetRecords</a>.</p>
 */
export interface GetRecordsInput {
  /**
   * <p>The position in the shard from which you want to start sequentially reading data
   *             records. A shard iterator specifies this position using the sequence number of a data
   *             record in the shard.</p>
   */
  ShardIterator: string | undefined;

  /**
   * <p>The maximum number of records to return. Specify a value of up to 10,000. If you
   *             specify a value that is greater than 10,000, <a>GetRecords</a> throws
   *                 <code>InvalidArgumentException</code>. The default value is 10,000.</p>
   */
  Limit?: number;
}

export namespace GetRecordsInput {
  export const filterSensitiveLog = (obj: GetRecordsInput): any => ({
    ...obj,
  });
}

/**
 * <p>The unit of data of the Kinesis data stream, which is composed of a sequence
 *             number, a partition key, and a data blob.</p>
 */
export interface _Record {
  /**
   * <p>The unique identifier of the record within its shard.</p>
   */
  SequenceNumber: string | undefined;

  /**
   * <p>The approximate time that the record was inserted into the stream.</p>
   */
  ApproximateArrivalTimestamp?: Date;

  /**
   * <p>The data blob. The data in the blob is both opaque and immutable to Kinesis Data
   *             Streams, which does not inspect, interpret, or change the data in the blob in any way.
   *             When the data blob (the payload before base64-encoding) is added to the partition key
   *             size, the total size must not exceed the maximum record size (1 MiB).</p>
   */
  Data: Uint8Array | undefined;

  /**
   * <p>Identifies which shard in the stream the data record is assigned to.</p>
   */
  PartitionKey: string | undefined;

  /**
   * <p>The encryption type used on the record. This parameter can be one of the following
   *             values:</p>
   *         <ul>
   *             <li>
   *                 <p>
   *                   <code>NONE</code>: Do not encrypt the records in the stream.</p>
   *             </li>
   *             <li>
   *                 <p>
   *                   <code>KMS</code>: Use server-side encryption on the records in the stream
   *                     using a customer-managed AWS KMS key.</p>
   *             </li>
   *          </ul>
   */
  EncryptionType?: EncryptionType | string;
}

export namespace _Record {
  export const filterSensitiveLog = (obj: _Record): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the output for <a>GetRecords</a>.</p>
 */
export interface GetRecordsOutput {
  /**
   * <p>The data records retrieved from the shard.</p>
   */
  Records: _Record[] | undefined;

  /**
   * <p>The next position in the shard from which to start sequentially reading data
   *             records. If set to <code>null</code>, the shard has been closed and the requested
   *             iterator does not return any more data. </p>
   */
  NextShardIterator?: string;

  /**
   * <p>The number of milliseconds the <a>GetRecords</a> response is from the
   *             tip of the stream, indicating how far behind current time the consumer is. A value of
   *             zero indicates that record processing is caught up, and there are no new records to
   *             process at this moment.</p>
   */
  MillisBehindLatest?: number;

  ChildShards?: ChildShard[];
}

export namespace GetRecordsOutput {
  export const filterSensitiveLog = (obj: GetRecordsOutput): any => ({
    ...obj,
  });
}

/**
 * <p>The ciphertext references a key that doesn't exist or that you don't have access
 *             to.</p>
 */
export interface KMSAccessDeniedException extends __SmithyException, $MetadataBearer {
  name: "KMSAccessDeniedException";
  $fault: "client";
  /**
   * <p>A message that provides information about the error.</p>
   */
  message?: string;
}

export namespace KMSAccessDeniedException {
  export const filterSensitiveLog = (obj: KMSAccessDeniedException): any => ({
    ...obj,
  });
}

/**
 * <p>The request was rejected because the specified customer master key (CMK) isn't
 *             enabled.</p>
 */
export interface KMSDisabledException extends __SmithyException, $MetadataBearer {
  name: "KMSDisabledException";
  $fault: "client";
  /**
   * <p>A message that provides information about the error.</p>
   */
  message?: string;
}

export namespace KMSDisabledException {
  export const filterSensitiveLog = (obj: KMSDisabledException): any => ({
    ...obj,
  });
}

/**
 * <p>The request was rejected because the state of the specified resource isn't valid
 *             for this request. For more information, see <a href="https://docs.aws.amazon.com/kms/latest/developerguide/key-state.html">How Key State Affects Use of a
 *                 Customer Master Key</a> in the <i>AWS Key Management Service Developer
 *                 Guide</i>.</p>
 */
export interface KMSInvalidStateException extends __SmithyException, $MetadataBearer {
  name: "KMSInvalidStateException";
  $fault: "client";
  /**
   * <p>A message that provides information about the error.</p>
   */
  message?: string;
}

export namespace KMSInvalidStateException {
  export const filterSensitiveLog = (obj: KMSInvalidStateException): any => ({
    ...obj,
  });
}

/**
 * <p>The request was rejected because the specified entity or resource can't be
 *             found.</p>
 */
export interface KMSNotFoundException extends __SmithyException, $MetadataBearer {
  name: "KMSNotFoundException";
  $fault: "client";
  /**
   * <p>A message that provides information about the error.</p>
   */
  message?: string;
}

export namespace KMSNotFoundException {
  export const filterSensitiveLog = (obj: KMSNotFoundException): any => ({
    ...obj,
  });
}

/**
 * <p>The AWS access key ID needs a subscription for the service.</p>
 */
export interface KMSOptInRequired extends __SmithyException, $MetadataBearer {
  name: "KMSOptInRequired";
  $fault: "client";
  /**
   * <p>A message that provides information about the error.</p>
   */
  message?: string;
}

export namespace KMSOptInRequired {
  export const filterSensitiveLog = (obj: KMSOptInRequired): any => ({
    ...obj,
  });
}

/**
 * <p>The request was denied due to request throttling. For more information about
 *             throttling, see <a href="https://docs.aws.amazon.com/kms/latest/developerguide/limits.html#requests-per-second">Limits</a> in
 *             the <i>AWS Key Management Service Developer Guide</i>.</p>
 */
export interface KMSThrottlingException extends __SmithyException, $MetadataBearer {
  name: "KMSThrottlingException";
  $fault: "client";
  /**
   * <p>A message that provides information about the error.</p>
   */
  message?: string;
}

export namespace KMSThrottlingException {
  export const filterSensitiveLog = (obj: KMSThrottlingException): any => ({
    ...obj,
  });
}

/**
 * <p>The request rate for the stream is too high, or the requested data is too large for
 *             the available throughput. Reduce the frequency or size of your requests. For more
 *             information, see <a href="https://docs.aws.amazon.com/kinesis/latest/dev/service-sizes-and-limits.html">Streams Limits</a> in the
 *                 <i>Amazon Kinesis Data Streams Developer Guide</i>, and <a href="https://docs.aws.amazon.com/general/latest/gr/api-retries.html">Error Retries and
 *                 Exponential Backoff in AWS</a> in the <i>AWS General
 *             Reference</i>.</p>
 */
export interface ProvisionedThroughputExceededException extends __SmithyException, $MetadataBearer {
  name: "ProvisionedThroughputExceededException";
  $fault: "client";
  /**
   * <p>A message that provides information about the error.</p>
   */
  message?: string;
}

export namespace ProvisionedThroughputExceededException {
  export const filterSensitiveLog = (obj: ProvisionedThroughputExceededException): any => ({
    ...obj,
  });
}

export enum ShardIteratorType {
  AFTER_SEQUENCE_NUMBER = "AFTER_SEQUENCE_NUMBER",
  AT_SEQUENCE_NUMBER = "AT_SEQUENCE_NUMBER",
  AT_TIMESTAMP = "AT_TIMESTAMP",
  LATEST = "LATEST",
  TRIM_HORIZON = "TRIM_HORIZON",
}

/**
 * <p>Represents the input for <code>GetShardIterator</code>.</p>
 */
export interface GetShardIteratorInput {
  /**
   * <p>The name of the Amazon Kinesis data stream.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>The shard ID of the Kinesis Data Streams shard to get the iterator for.</p>
   */
  ShardId: string | undefined;

  /**
   * <p>Determines how the shard iterator is used to start reading data records from the
   *             shard.</p>
   *         <p>The following are the valid Amazon Kinesis shard iterator types:</p>
   *         <ul>
   *             <li>
   *
   *                 <p>AT_SEQUENCE_NUMBER - Start reading from the position denoted by a specific
   *                     sequence number, provided in the value
   *                     <code>StartingSequenceNumber</code>.</p>
   *             </li>
   *             <li>
   *
   *                 <p>AFTER_SEQUENCE_NUMBER - Start reading right after the position denoted by a
   *                     specific sequence number, provided in the value
   *                         <code>StartingSequenceNumber</code>.</p>
   *             </li>
   *             <li>
   *
   *                 <p>AT_TIMESTAMP - Start reading from the position denoted by a specific time
   *                     stamp, provided in the value <code>Timestamp</code>.</p>
   *             </li>
   *             <li>
   *
   *                 <p>TRIM_HORIZON - Start reading at the last untrimmed record in the shard in
   *                     the system, which is the oldest data record in the shard.</p>
   *             </li>
   *             <li>
   *
   *                 <p>LATEST - Start reading just after the most recent record in the shard, so
   *                     that you always read the most recent data in the shard.</p>
   *             </li>
   *          </ul>
   */
  ShardIteratorType: ShardIteratorType | string | undefined;

  /**
   * <p>The sequence number of the data record in the shard from which to start reading.
   *             Used with shard iterator type AT_SEQUENCE_NUMBER and AFTER_SEQUENCE_NUMBER.</p>
   */
  StartingSequenceNumber?: string;

  /**
   * <p>The time stamp of the data record from which to start reading. Used with shard
   *             iterator type AT_TIMESTAMP. A time stamp is the Unix epoch date with precision in
   *             milliseconds. For example, <code>2016-04-04T19:58:46.480-00:00</code> or
   *                 <code>1459799926.480</code>. If a record with this exact time stamp does not exist,
   *             the iterator returned is for the next (later) record. If the time stamp is older than
   *             the current trim horizon, the iterator returned is for the oldest untrimmed data record
   *             (TRIM_HORIZON).</p>
   */
  Timestamp?: Date;
}

export namespace GetShardIteratorInput {
  export const filterSensitiveLog = (obj: GetShardIteratorInput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the output for <code>GetShardIterator</code>.</p>
 */
export interface GetShardIteratorOutput {
  /**
   * <p>The position in the shard from which to start reading data records sequentially. A
   *             shard iterator specifies this position using the sequence number of a data record in a
   *             shard.</p>
   */
  ShardIterator?: string;
}

export namespace GetShardIteratorOutput {
  export const filterSensitiveLog = (obj: GetShardIteratorOutput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the input for <a>IncreaseStreamRetentionPeriod</a>.</p>
 */
export interface IncreaseStreamRetentionPeriodInput {
  /**
   * <p>The name of the stream to modify.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>The new retention period of the stream, in hours. Must be more than the current
   *             retention period.</p>
   */
  RetentionPeriodHours: number | undefined;
}

export namespace IncreaseStreamRetentionPeriodInput {
  export const filterSensitiveLog = (obj: IncreaseStreamRetentionPeriodInput): any => ({
    ...obj,
  });
}

/**
 * <p>The processing of the request failed because of an unknown error, exception, or
 *             failure.</p>
 */
export interface InternalFailureException extends __SmithyException {
  name: "InternalFailureException";
  $fault: "server";
  message?: string;
}

export namespace InternalFailureException {
  export const filterSensitiveLog = (obj: InternalFailureException): any => ({
    ...obj,
  });
}

export enum ShardFilterType {
  AFTER_SHARD_ID = "AFTER_SHARD_ID",
  AT_LATEST = "AT_LATEST",
  AT_TIMESTAMP = "AT_TIMESTAMP",
  AT_TRIM_HORIZON = "AT_TRIM_HORIZON",
  FROM_TIMESTAMP = "FROM_TIMESTAMP",
  FROM_TRIM_HORIZON = "FROM_TRIM_HORIZON",
}

export interface ShardFilter {
  Type: ShardFilterType | string | undefined;
  ShardId?: string;
  Timestamp?: Date;
}

export namespace ShardFilter {
  export const filterSensitiveLog = (obj: ShardFilter): any => ({
    ...obj,
  });
}

export interface ListShardsInput {
  /**
   * <p>The name of the data stream whose shards you want to list. </p>
   *         <p>You cannot specify this parameter if you specify the <code>NextToken</code>
   *             parameter.</p>
   */
  StreamName?: string;

  /**
   * <p>When the number of shards in the data stream is greater than the default value for
   *             the <code>MaxResults</code> parameter, or if you explicitly specify a value for
   *                 <code>MaxResults</code> that is less than the number of shards in the data stream,
   *             the response includes a pagination token named <code>NextToken</code>. You can specify
   *             this <code>NextToken</code> value in a subsequent call to <code>ListShards</code> to
   *             list the next set of shards.</p>
   *         <p>Don't specify <code>StreamName</code> or <code>StreamCreationTimestamp</code> if
   *             you specify <code>NextToken</code> because the latter unambiguously identifies the
   *             stream.</p>
   *         <p>You can optionally specify a value for the <code>MaxResults</code> parameter when
   *             you specify <code>NextToken</code>. If you specify a <code>MaxResults</code> value that
   *             is less than the number of shards that the operation returns if you don't specify
   *                 <code>MaxResults</code>, the response will contain a new <code>NextToken</code>
   *             value. You can use the new <code>NextToken</code> value in a subsequent call to the
   *                 <code>ListShards</code> operation.</p>
   *         <important>
   *             <p>Tokens expire after 300 seconds. When you obtain a value for
   *                     <code>NextToken</code> in the response to a call to <code>ListShards</code>, you
   *                 have 300 seconds to use that value. If you specify an expired token in a call to
   *                     <code>ListShards</code>, you get
   *                 <code>ExpiredNextTokenException</code>.</p>
   *         </important>
   */
  NextToken?: string;

  /**
   * <p>Specify this parameter to indicate that you want to list the shards starting with
   *             the shard whose ID immediately follows <code>ExclusiveStartShardId</code>.</p>
   *         <p>If you don't specify this parameter, the default behavior is for
   *                 <code>ListShards</code> to list the shards starting with the first one in the
   *             stream.</p>
   *         <p>You cannot specify this parameter if you specify <code>NextToken</code>.</p>
   */
  ExclusiveStartShardId?: string;

  /**
   * <p>The maximum number of shards to return in a single call to <code>ListShards</code>.
   *             The minimum value you can specify for this parameter is 1, and the maximum is 10,000,
   *             which is also the default.</p>
   *         <p>When the number of shards to be listed is greater than the value of
   *                 <code>MaxResults</code>, the response contains a <code>NextToken</code> value that
   *             you can use in a subsequent call to <code>ListShards</code> to list the next set of
   *             shards.</p>
   */
  MaxResults?: number;

  /**
   * <p>Specify this input parameter to distinguish data streams that have the same name.
   *             For example, if you create a data stream and then delete it, and you later create
   *             another data stream with the same name, you can use this input parameter to specify
   *             which of the two streams you want to list the shards for.</p>
   *         <p>You cannot specify this parameter if you specify the <code>NextToken</code>
   *             parameter.</p>
   */
  StreamCreationTimestamp?: Date;

  ShardFilter?: ShardFilter;
}

export namespace ListShardsInput {
  export const filterSensitiveLog = (obj: ListShardsInput): any => ({
    ...obj,
  });
}

export interface ListShardsOutput {
  /**
   * <p>An array of JSON objects. Each object represents one shard and specifies the IDs of
   *             the shard, the shard's parent, and the shard that's adjacent to the shard's parent. Each
   *             object also contains the starting and ending hash keys and the starting and ending
   *             sequence numbers for the shard.</p>
   */
  Shards?: Shard[];

  /**
   * <p>When the number of shards in the data stream is greater than the default value for
   *             the <code>MaxResults</code> parameter, or if you explicitly specify a value for
   *                 <code>MaxResults</code> that is less than the number of shards in the data stream,
   *             the response includes a pagination token named <code>NextToken</code>. You can specify
   *             this <code>NextToken</code> value in a subsequent call to <code>ListShards</code> to
   *             list the next set of shards. For more information about the use of this pagination token
   *             when calling the <code>ListShards</code> operation, see <a>ListShardsInput$NextToken</a>.</p>
   *         <important>
   *             <p>Tokens expire after 300 seconds. When you obtain a value for
   *                     <code>NextToken</code> in the response to a call to <code>ListShards</code>, you
   *                 have 300 seconds to use that value. If you specify an expired token in a call to
   *                     <code>ListShards</code>, you get
   *                 <code>ExpiredNextTokenException</code>.</p>
   *         </important>
   */
  NextToken?: string;
}

export namespace ListShardsOutput {
  export const filterSensitiveLog = (obj: ListShardsOutput): any => ({
    ...obj,
  });
}

export interface ListStreamConsumersInput {
  /**
   * <p>The ARN of the Kinesis data stream for which you want to list the registered
   *             consumers. For more information, see <a href="https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-kinesis-streams">Amazon Resource Names (ARNs) and AWS Service Namespaces</a>.</p>
   */
  StreamARN: string | undefined;

  /**
   * <p>When the number of consumers that are registered with the data stream is greater than
   *             the default value for the <code>MaxResults</code> parameter, or if you explicitly
   *             specify a value for <code>MaxResults</code> that is less than the number of consumers
   *             that are registered with the data stream, the response includes a pagination token named
   *                 <code>NextToken</code>. You can specify this <code>NextToken</code> value in a
   *             subsequent call to <code>ListStreamConsumers</code> to list the next set of registered
   *             consumers.</p>
   *         <p>Don't specify <code>StreamName</code> or <code>StreamCreationTimestamp</code> if you
   *             specify <code>NextToken</code> because the latter unambiguously identifies the
   *             stream.</p>
   *         <p>You can optionally specify a value for the <code>MaxResults</code> parameter when you
   *             specify <code>NextToken</code>. If you specify a <code>MaxResults</code> value that is
   *             less than the number of consumers that the operation returns if you don't specify
   *                 <code>MaxResults</code>, the response will contain a new <code>NextToken</code>
   *             value. You can use the new <code>NextToken</code> value in a subsequent call to the
   *                 <code>ListStreamConsumers</code> operation to list the next set of consumers.</p>
   *         <important>
   *             <p>Tokens expire after 300 seconds. When you obtain a value for
   *                     <code>NextToken</code> in the response to a call to
   *                     <code>ListStreamConsumers</code>, you have 300 seconds to use that value. If you
   *                 specify an expired token in a call to <code>ListStreamConsumers</code>, you get
   *                     <code>ExpiredNextTokenException</code>.</p>
   *         </important>
   */
  NextToken?: string;

  /**
   * <p>The maximum number of consumers that you want a single call of
   *                 <code>ListStreamConsumers</code> to return.</p>
   */
  MaxResults?: number;

  /**
   * <p>Specify this input parameter to distinguish data streams that have the same name. For
   *             example, if you create a data stream and then delete it, and you later create another
   *             data stream with the same name, you can use this input parameter to specify which of the
   *             two streams you want to list the consumers for. </p>
   *         <p>You can't specify this parameter if you specify the NextToken parameter. </p>
   */
  StreamCreationTimestamp?: Date;
}

export namespace ListStreamConsumersInput {
  export const filterSensitiveLog = (obj: ListStreamConsumersInput): any => ({
    ...obj,
  });
}

export interface ListStreamConsumersOutput {
  /**
   * <p>An array of JSON objects. Each object represents one registered consumer.</p>
   */
  Consumers?: Consumer[];

  /**
   * <p>When the number of consumers that are registered with the data stream is greater than
   *             the default value for the <code>MaxResults</code> parameter, or if you explicitly
   *             specify a value for <code>MaxResults</code> that is less than the number of registered
   *             consumers, the response includes a pagination token named <code>NextToken</code>. You
   *             can specify this <code>NextToken</code> value in a subsequent call to
   *                 <code>ListStreamConsumers</code> to list the next set of registered consumers. For
   *             more information about the use of this pagination token when calling the
   *                 <code>ListStreamConsumers</code> operation, see <a>ListStreamConsumersInput$NextToken</a>.</p>
   *         <important>
   *             <p>Tokens expire after 300 seconds. When you obtain a value for
   *                     <code>NextToken</code> in the response to a call to
   *                     <code>ListStreamConsumers</code>, you have 300 seconds to use that value. If you
   *                 specify an expired token in a call to <code>ListStreamConsumers</code>, you get
   *                     <code>ExpiredNextTokenException</code>.</p>
   *         </important>
   */
  NextToken?: string;
}

export namespace ListStreamConsumersOutput {
  export const filterSensitiveLog = (obj: ListStreamConsumersOutput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the input for <code>ListStreams</code>.</p>
 */
export interface ListStreamsInput {
  /**
   * <p>The maximum number of streams to list.</p>
   */
  Limit?: number;

  /**
   * <p>The name of the stream to start the list with.</p>
   */
  ExclusiveStartStreamName?: string;
}

export namespace ListStreamsInput {
  export const filterSensitiveLog = (obj: ListStreamsInput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the output for <code>ListStreams</code>.</p>
 */
export interface ListStreamsOutput {
  /**
   * <p>The names of the streams that are associated with the AWS account making the
   *                 <code>ListStreams</code> request.</p>
   */
  StreamNames: string[] | undefined;

  /**
   * <p>If set to <code>true</code>, there are more streams available to list.</p>
   */
  HasMoreStreams: boolean | undefined;
}

export namespace ListStreamsOutput {
  export const filterSensitiveLog = (obj: ListStreamsOutput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the input for <code>ListTagsForStream</code>.</p>
 */
export interface ListTagsForStreamInput {
  /**
   * <p>The name of the stream.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>The key to use as the starting point for the list of tags. If this parameter is
   *             set, <code>ListTagsForStream</code> gets all tags that occur after
   *                 <code>ExclusiveStartTagKey</code>. </p>
   */
  ExclusiveStartTagKey?: string;

  /**
   * <p>The number of tags to return. If this number is less than the total number of tags
   *             associated with the stream, <code>HasMoreTags</code> is set to <code>true</code>. To
   *             list additional tags, set <code>ExclusiveStartTagKey</code> to the last key in the
   *             response.</p>
   */
  Limit?: number;
}

export namespace ListTagsForStreamInput {
  export const filterSensitiveLog = (obj: ListTagsForStreamInput): any => ({
    ...obj,
  });
}

/**
 * <p>Metadata assigned to the stream, consisting of a key-value pair.</p>
 */
export interface Tag {
  /**
   * <p>A unique identifier for the tag. Maximum length: 128 characters. Valid characters:
   *             Unicode letters, digits, white space, _ . / = + - % @</p>
   */
  Key: string | undefined;

  /**
   * <p>An optional string, typically used to describe or define the tag. Maximum length:
   *             256 characters. Valid characters: Unicode letters, digits, white space, _ . / = + - %
   *             @</p>
   */
  Value?: string;
}

export namespace Tag {
  export const filterSensitiveLog = (obj: Tag): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the output for <code>ListTagsForStream</code>.</p>
 */
export interface ListTagsForStreamOutput {
  /**
   * <p>A list of tags associated with <code>StreamName</code>, starting with the first tag
   *             after <code>ExclusiveStartTagKey</code> and up to the specified <code>Limit</code>.
   *         </p>
   */
  Tags: Tag[] | undefined;

  /**
   * <p>If set to <code>true</code>, more tags are available. To request additional tags,
   *             set <code>ExclusiveStartTagKey</code> to the key of the last tag returned.</p>
   */
  HasMoreTags: boolean | undefined;
}

export namespace ListTagsForStreamOutput {
  export const filterSensitiveLog = (obj: ListTagsForStreamOutput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the input for <code>MergeShards</code>.</p>
 */
export interface MergeShardsInput {
  /**
   * <p>The name of the stream for the merge.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>The shard ID of the shard to combine with the adjacent shard for the
   *             merge.</p>
   */
  ShardToMerge: string | undefined;

  /**
   * <p>The shard ID of the adjacent shard for the merge.</p>
   */
  AdjacentShardToMerge: string | undefined;
}

export namespace MergeShardsInput {
  export const filterSensitiveLog = (obj: MergeShardsInput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the input for <code>PutRecord</code>.</p>
 */
export interface PutRecordInput {
  /**
   * <p>The name of the stream to put the data record into.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>The data blob to put into the record, which is base64-encoded when the blob is
   *             serialized. When the data blob (the payload before base64-encoding) is added to the
   *             partition key size, the total size must not exceed the maximum record size (1
   *             MiB).</p>
   */
  Data: Uint8Array | undefined;

  /**
   * <p>Determines which shard in the stream the data record is assigned to. Partition keys
   *             are Unicode strings with a maximum length limit of 256 characters for each key. Amazon
   *             Kinesis Data Streams uses the partition key as input to a hash function that maps the
   *             partition key and associated data to a specific shard. Specifically, an MD5 hash
   *             function is used to map partition keys to 128-bit integer values and to map associated
   *             data records to shards. As a result of this hashing mechanism, all data records with the
   *             same partition key map to the same shard within the stream.</p>
   */
  PartitionKey: string | undefined;

  /**
   * <p>The hash value used to explicitly determine the shard the data record is assigned
   *             to by overriding the partition key hash.</p>
   */
  ExplicitHashKey?: string;

  /**
   * <p>Guarantees strictly increasing sequence numbers, for puts from the same client and
   *             to the same partition key. Usage: set the <code>SequenceNumberForOrdering</code> of
   *             record <i>n</i> to the sequence number of record <i>n-1</i>
   *             (as returned in the result when putting record <i>n-1</i>). If this
   *             parameter is not set, records are coarsely ordered based on arrival time.</p>
   */
  SequenceNumberForOrdering?: string;
}

export namespace PutRecordInput {
  export const filterSensitiveLog = (obj: PutRecordInput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the output for <code>PutRecord</code>.</p>
 */
export interface PutRecordOutput {
  /**
   * <p>The shard ID of the shard where the data record was placed.</p>
   */
  ShardId: string | undefined;

  /**
   * <p>The sequence number identifier that was assigned to the put data record. The
   *             sequence number for the record is unique across all records in the stream. A sequence
   *             number is the identifier associated with every record put into the stream.</p>
   */
  SequenceNumber: string | undefined;

  /**
   * <p>The encryption type to use on the record. This parameter can be one of the
   *             following values:</p>
   *         <ul>
   *             <li>
   *                 <p>
   *                   <code>NONE</code>: Do not encrypt the records in the stream.</p>
   *             </li>
   *             <li>
   *                 <p>
   *                   <code>KMS</code>: Use server-side encryption on the records in the stream
   *                     using a customer-managed AWS KMS key.</p>
   *             </li>
   *          </ul>
   */
  EncryptionType?: EncryptionType | string;
}

export namespace PutRecordOutput {
  export const filterSensitiveLog = (obj: PutRecordOutput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the output for <code>PutRecords</code>.</p>
 */
export interface PutRecordsRequestEntry {
  /**
   * <p>The data blob to put into the record, which is base64-encoded when the blob is
   *             serialized. When the data blob (the payload before base64-encoding) is added to the
   *             partition key size, the total size must not exceed the maximum record size (1
   *             MiB).</p>
   */
  Data: Uint8Array | undefined;

  /**
   * <p>The hash value used to determine explicitly the shard that the data record is
   *             assigned to by overriding the partition key hash.</p>
   */
  ExplicitHashKey?: string;

  /**
   * <p>Determines which shard in the stream the data record is assigned to. Partition keys
   *             are Unicode strings with a maximum length limit of 256 characters for each key. Amazon
   *             Kinesis Data Streams uses the partition key as input to a hash function that maps the
   *             partition key and associated data to a specific shard. Specifically, an MD5 hash
   *             function is used to map partition keys to 128-bit integer values and to map associated
   *             data records to shards. As a result of this hashing mechanism, all data records with the
   *             same partition key map to the same shard within the stream.</p>
   */
  PartitionKey: string | undefined;
}

export namespace PutRecordsRequestEntry {
  export const filterSensitiveLog = (obj: PutRecordsRequestEntry): any => ({
    ...obj,
  });
}

/**
 * <p>A <code>PutRecords</code> request.</p>
 */
export interface PutRecordsInput {
  /**
   * <p>The records associated with the request.</p>
   */
  Records: PutRecordsRequestEntry[] | undefined;

  /**
   * <p>The stream name associated with the request.</p>
   */
  StreamName: string | undefined;
}

export namespace PutRecordsInput {
  export const filterSensitiveLog = (obj: PutRecordsInput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the result of an individual record from a <code>PutRecords</code>
 *             request. A record that is successfully added to a stream includes
 *                 <code>SequenceNumber</code> and <code>ShardId</code> in the result. A record that
 *             fails to be added to the stream includes <code>ErrorCode</code> and
 *                 <code>ErrorMessage</code> in the result.</p>
 */
export interface PutRecordsResultEntry {
  /**
   * <p>The sequence number for an individual record result.</p>
   */
  SequenceNumber?: string;

  /**
   * <p>The shard ID for an individual record result.</p>
   */
  ShardId?: string;

  /**
   * <p>The error code for an individual record result. <code>ErrorCodes</code> can be
   *             either <code>ProvisionedThroughputExceededException</code> or
   *                 <code>InternalFailure</code>.</p>
   */
  ErrorCode?: string;

  /**
   * <p>The error message for an individual record result. An <code>ErrorCode</code> value
   *             of <code>ProvisionedThroughputExceededException</code> has an error message that
   *             includes the account ID, stream name, and shard ID. An <code>ErrorCode</code> value of
   *                 <code>InternalFailure</code> has the error message <code>"Internal Service
   *                 Failure"</code>.</p>
   */
  ErrorMessage?: string;
}

export namespace PutRecordsResultEntry {
  export const filterSensitiveLog = (obj: PutRecordsResultEntry): any => ({
    ...obj,
  });
}

/**
 * <p>
 *             <code>PutRecords</code> results.</p>
 */
export interface PutRecordsOutput {
  /**
   * <p>The number of unsuccessfully processed records in a <code>PutRecords</code>
   *             request.</p>
   */
  FailedRecordCount?: number;

  /**
   * <p>An array of successfully and unsuccessfully processed record results, correlated
   *             with the request by natural ordering. A record that is successfully added to a stream
   *             includes <code>SequenceNumber</code> and <code>ShardId</code> in the result. A record
   *             that fails to be added to a stream includes <code>ErrorCode</code> and
   *                 <code>ErrorMessage</code> in the result.</p>
   */
  Records: PutRecordsResultEntry[] | undefined;

  /**
   * <p>The encryption type used on the records. This parameter can be one of the following
   *             values:</p>
   *         <ul>
   *             <li>
   *                 <p>
   *                   <code>NONE</code>: Do not encrypt the records.</p>
   *             </li>
   *             <li>
   *                 <p>
   *                   <code>KMS</code>: Use server-side encryption on the records using a
   *                     customer-managed AWS KMS key.</p>
   *             </li>
   *          </ul>
   */
  EncryptionType?: EncryptionType | string;
}

export namespace PutRecordsOutput {
  export const filterSensitiveLog = (obj: PutRecordsOutput): any => ({
    ...obj,
  });
}

export interface RegisterStreamConsumerInput {
  /**
   * <p>The ARN of the Kinesis data stream that you want to register the consumer with. For
   *             more info, see <a href="https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-kinesis-streams">Amazon Resource Names (ARNs) and AWS Service Namespaces</a>.</p>
   */
  StreamARN: string | undefined;

  /**
   * <p>For a given Kinesis data stream, each consumer must have a unique name. However,
   *             consumer names don't have to be unique across data streams.</p>
   */
  ConsumerName: string | undefined;
}

export namespace RegisterStreamConsumerInput {
  export const filterSensitiveLog = (obj: RegisterStreamConsumerInput): any => ({
    ...obj,
  });
}

export interface RegisterStreamConsumerOutput {
  /**
   * <p>An object that represents the details of the consumer you registered. When you
   *             register a consumer, it gets an ARN that is generated by Kinesis Data Streams.</p>
   */
  Consumer: Consumer | undefined;
}

export namespace RegisterStreamConsumerOutput {
  export const filterSensitiveLog = (obj: RegisterStreamConsumerOutput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the input for <code>RemoveTagsFromStream</code>.</p>
 */
export interface RemoveTagsFromStreamInput {
  /**
   * <p>The name of the stream.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>A list of tag keys. Each corresponding tag is removed from the stream.</p>
   */
  TagKeys: string[] | undefined;
}

export namespace RemoveTagsFromStreamInput {
  export const filterSensitiveLog = (obj: RemoveTagsFromStreamInput): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the input for <code>SplitShard</code>.</p>
 */
export interface SplitShardInput {
  /**
   * <p>The name of the stream for the shard split.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>The shard ID of the shard to split.</p>
   */
  ShardToSplit: string | undefined;

  /**
   * <p>A hash key value for the starting hash key of one of the child shards created by
   *             the split. The hash key range for a given shard constitutes a set of ordered contiguous
   *             positive integers. The value for <code>NewStartingHashKey</code> must be in the range of
   *             hash keys being mapped into the shard. The <code>NewStartingHashKey</code> hash key
   *             value and all higher hash key values in hash key range are distributed to one of the
   *             child shards. All the lower hash key values in the range are distributed to the other
   *             child shard.</p>
   */
  NewStartingHashKey: string | undefined;
}

export namespace SplitShardInput {
  export const filterSensitiveLog = (obj: SplitShardInput): any => ({
    ...obj,
  });
}

export interface StartStreamEncryptionInput {
  /**
   * <p>The name of the stream for which to start encrypting records.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>The encryption type to use. The only valid value is <code>KMS</code>.</p>
   */
  EncryptionType: EncryptionType | string | undefined;

  /**
   * <p>The GUID for the customer-managed AWS KMS key to use for encryption. This value can
   *             be a globally unique identifier, a fully specified Amazon Resource Name (ARN) to either
   *             an alias or a key, or an alias name prefixed by "alias/".You can also use a master key
   *             owned by Kinesis Data Streams by specifying the alias
   *             <code>aws/kinesis</code>.</p>
   *         <ul>
   *             <li>
   *                 <p>Key ARN example:
   *                         <code>arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012</code>
   *                </p>
   *             </li>
   *             <li>
   *                 <p>Alias ARN example:
   *                         <code>arn:aws:kms:us-east-1:123456789012:alias/MyAliasName</code>
   *                </p>
   *             </li>
   *             <li>
   *                 <p>Globally unique key ID example:
   *                         <code>12345678-1234-1234-1234-123456789012</code>
   *                </p>
   *             </li>
   *             <li>
   *                 <p>Alias name example: <code>alias/MyAliasName</code>
   *                </p>
   *             </li>
   *             <li>
   *                 <p>Master key owned by Kinesis Data Streams:
   *                     <code>alias/aws/kinesis</code>
   *                </p>
   *             </li>
   *          </ul>
   */
  KeyId: string | undefined;
}

export namespace StartStreamEncryptionInput {
  export const filterSensitiveLog = (obj: StartStreamEncryptionInput): any => ({
    ...obj,
  });
}

export interface StopStreamEncryptionInput {
  /**
   * <p>The name of the stream on which to stop encrypting records.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>The encryption type. The only valid value is <code>KMS</code>.</p>
   */
  EncryptionType: EncryptionType | string | undefined;

  /**
   * <p>The GUID for the customer-managed AWS KMS key to use for encryption. This value can
   *             be a globally unique identifier, a fully specified Amazon Resource Name (ARN) to either
   *             an alias or a key, or an alias name prefixed by "alias/".You can also use a master key
   *             owned by Kinesis Data Streams by specifying the alias
   *             <code>aws/kinesis</code>.</p>
   *         <ul>
   *             <li>
   *                 <p>Key ARN example:
   *                         <code>arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012</code>
   *                </p>
   *             </li>
   *             <li>
   *                 <p>Alias ARN example:
   *                         <code>arn:aws:kms:us-east-1:123456789012:alias/MyAliasName</code>
   *                </p>
   *             </li>
   *             <li>
   *                 <p>Globally unique key ID example:
   *                         <code>12345678-1234-1234-1234-123456789012</code>
   *                </p>
   *             </li>
   *             <li>
   *                 <p>Alias name example: <code>alias/MyAliasName</code>
   *                </p>
   *             </li>
   *             <li>
   *                 <p>Master key owned by Kinesis Data Streams:
   *                     <code>alias/aws/kinesis</code>
   *                </p>
   *             </li>
   *          </ul>
   */
  KeyId: string | undefined;
}

export namespace StopStreamEncryptionInput {
  export const filterSensitiveLog = (obj: StopStreamEncryptionInput): any => ({
    ...obj,
  });
}

/**
 * <p></p>
 */
export interface StartingPosition {
  /**
   * <p>You can set the starting position to one of the following values:</p>
   *         <p>
   *             <code>AT_SEQUENCE_NUMBER</code>: Start streaming from the position denoted by the
   *             sequence number specified in the <code>SequenceNumber</code> field.</p>
   *         <p>
   *             <code>AFTER_SEQUENCE_NUMBER</code>: Start streaming right after the position denoted
   *             by the sequence number specified in the <code>SequenceNumber</code> field.</p>
   *         <p>
   *             <code>AT_TIMESTAMP</code>: Start streaming from the position denoted by the time stamp
   *             specified in the <code>Timestamp</code> field.</p>
   *         <p>
   *             <code>TRIM_HORIZON</code>: Start streaming at the last untrimmed record in the shard,
   *             which is the oldest data record in the shard.</p>
   *         <p>
   *             <code>LATEST</code>: Start streaming just after the most recent record in the shard,
   *             so that you always read the most recent data in the shard.</p>
   */
  Type: ShardIteratorType | string | undefined;

  /**
   * <p>The sequence number of the data record in the shard from which to start streaming. To
   *             specify a sequence number, set <code>StartingPosition</code> to
   *                 <code>AT_SEQUENCE_NUMBER</code> or <code>AFTER_SEQUENCE_NUMBER</code>.</p>
   */
  SequenceNumber?: string;

  /**
   * <p>The time stamp of the data record from which to start reading. To specify a time
   *             stamp, set <code>StartingPosition</code> to <code>Type AT_TIMESTAMP</code>. A time stamp
   *             is the Unix epoch date with precision in milliseconds. For example,
   *                 <code>2016-04-04T19:58:46.480-00:00</code> or <code>1459799926.480</code>. If a
   *             record with this exact time stamp does not exist, records will be streamed from the next
   *             (later) record. If the time stamp is older than the current trim horizon, records will
   *             be streamed from the oldest untrimmed data record (<code>TRIM_HORIZON</code>).</p>
   */
  Timestamp?: Date;
}

export namespace StartingPosition {
  export const filterSensitiveLog = (obj: StartingPosition): any => ({
    ...obj,
  });
}

export interface SubscribeToShardInput {
  /**
   * <p>For this parameter, use the value you obtained when you called <a>RegisterStreamConsumer</a>.</p>
   */
  ConsumerARN: string | undefined;

  /**
   * <p>The ID of the shard you want to subscribe to. To see a list of all the shards for a
   *             given stream, use <a>ListShards</a>.</p>
   */
  ShardId: string | undefined;

  /**
   * <p></p>
   */
  StartingPosition: StartingPosition | undefined;
}

export namespace SubscribeToShardInput {
  export const filterSensitiveLog = (obj: SubscribeToShardInput): any => ({
    ...obj,
  });
}

/**
 * <p>After you call <a>SubscribeToShard</a>, Kinesis Data Streams sends events
 *             of this type over an HTTP/2 connection to your consumer.</p>
 */
export interface SubscribeToShardEvent {
  /**
   * <p></p>
   */
  Records: _Record[] | undefined;

  /**
   * <p>Use this as <code>SequenceNumber</code> in the next call to <a>SubscribeToShard</a>, with <code>StartingPosition</code> set to
   *                 <code>AT_SEQUENCE_NUMBER</code> or <code>AFTER_SEQUENCE_NUMBER</code>. Use
   *                 <code>ContinuationSequenceNumber</code> for checkpointing because it captures your
   *             shard progress even when no data is written to the shard.</p>
   */
  ContinuationSequenceNumber: string | undefined;

  /**
   * <p>The number of milliseconds the read records are from the tip of the stream, indicating
   *             how far behind current time the consumer is. A value of zero indicates that record
   *             processing is caught up, and there are no new records to process at this moment.</p>
   */
  MillisBehindLatest: number | undefined;

  ChildShards?: ChildShard[];
}

export namespace SubscribeToShardEvent {
  export const filterSensitiveLog = (obj: SubscribeToShardEvent): any => ({
    ...obj,
  });
}

/**
 * <p>This is a tagged union for all of the types of events an enhanced fan-out consumer can
 *             receive over HTTP/2 after a call to <a>SubscribeToShard</a>.</p>
 */
export type SubscribeToShardEventStream =
  | SubscribeToShardEventStream.InternalFailureExceptionMember
  | SubscribeToShardEventStream.KMSAccessDeniedExceptionMember
  | SubscribeToShardEventStream.KMSDisabledExceptionMember
  | SubscribeToShardEventStream.KMSInvalidStateExceptionMember
  | SubscribeToShardEventStream.KMSNotFoundExceptionMember
  | SubscribeToShardEventStream.KMSOptInRequiredMember
  | SubscribeToShardEventStream.KMSThrottlingExceptionMember
  | SubscribeToShardEventStream.ResourceInUseExceptionMember
  | SubscribeToShardEventStream.ResourceNotFoundExceptionMember
  | SubscribeToShardEventStream.SubscribeToShardEventMember
  | SubscribeToShardEventStream.$UnknownMember;

export namespace SubscribeToShardEventStream {
  /**
   * <p>After you call <a>SubscribeToShard</a>, Kinesis Data Streams sends events
   *             of this type to your consumer. For an example of how to handle these events, see <a href="/streams/latest/dev/building-enhanced-consumers-api.html">Enhanced Fan-Out
   *                 Using the Kinesis Data Streams API</a>.</p>
   */
  export interface SubscribeToShardEventMember {
    SubscribeToShardEvent: SubscribeToShardEvent;
    ResourceNotFoundException?: never;
    ResourceInUseException?: never;
    KMSDisabledException?: never;
    KMSInvalidStateException?: never;
    KMSAccessDeniedException?: never;
    KMSNotFoundException?: never;
    KMSOptInRequired?: never;
    KMSThrottlingException?: never;
    InternalFailureException?: never;
    $unknown?: never;
  }

  /**
   * <p>The requested resource could not be found. The stream might not be specified
   *             correctly.</p>
   */
  export interface ResourceNotFoundExceptionMember {
    SubscribeToShardEvent?: never;
    ResourceNotFoundException: ResourceNotFoundException;
    ResourceInUseException?: never;
    KMSDisabledException?: never;
    KMSInvalidStateException?: never;
    KMSAccessDeniedException?: never;
    KMSNotFoundException?: never;
    KMSOptInRequired?: never;
    KMSThrottlingException?: never;
    InternalFailureException?: never;
    $unknown?: never;
  }

  /**
   * <p>The resource is not available for this operation. For successful operation, the
   *             resource must be in the <code>ACTIVE</code> state.</p>
   */
  export interface ResourceInUseExceptionMember {
    SubscribeToShardEvent?: never;
    ResourceNotFoundException?: never;
    ResourceInUseException: ResourceInUseException;
    KMSDisabledException?: never;
    KMSInvalidStateException?: never;
    KMSAccessDeniedException?: never;
    KMSNotFoundException?: never;
    KMSOptInRequired?: never;
    KMSThrottlingException?: never;
    InternalFailureException?: never;
    $unknown?: never;
  }

  /**
   * <p>The request was rejected because the specified customer master key (CMK) isn't
   *             enabled.</p>
   */
  export interface KMSDisabledExceptionMember {
    SubscribeToShardEvent?: never;
    ResourceNotFoundException?: never;
    ResourceInUseException?: never;
    KMSDisabledException: KMSDisabledException;
    KMSInvalidStateException?: never;
    KMSAccessDeniedException?: never;
    KMSNotFoundException?: never;
    KMSOptInRequired?: never;
    KMSThrottlingException?: never;
    InternalFailureException?: never;
    $unknown?: never;
  }

  /**
   * <p>The request was rejected because the state of the specified resource isn't valid
   *             for this request. For more information, see <a href="https://docs.aws.amazon.com/kms/latest/developerguide/key-state.html">How Key State Affects Use of a
   *                 Customer Master Key</a> in the <i>AWS Key Management Service Developer
   *                 Guide</i>.</p>
   */
  export interface KMSInvalidStateExceptionMember {
    SubscribeToShardEvent?: never;
    ResourceNotFoundException?: never;
    ResourceInUseException?: never;
    KMSDisabledException?: never;
    KMSInvalidStateException: KMSInvalidStateException;
    KMSAccessDeniedException?: never;
    KMSNotFoundException?: never;
    KMSOptInRequired?: never;
    KMSThrottlingException?: never;
    InternalFailureException?: never;
    $unknown?: never;
  }

  /**
   * <p>The ciphertext references a key that doesn't exist or that you don't have access
   *             to.</p>
   */
  export interface KMSAccessDeniedExceptionMember {
    SubscribeToShardEvent?: never;
    ResourceNotFoundException?: never;
    ResourceInUseException?: never;
    KMSDisabledException?: never;
    KMSInvalidStateException?: never;
    KMSAccessDeniedException: KMSAccessDeniedException;
    KMSNotFoundException?: never;
    KMSOptInRequired?: never;
    KMSThrottlingException?: never;
    InternalFailureException?: never;
    $unknown?: never;
  }

  /**
   * <p>The request was rejected because the specified entity or resource can't be
   *             found.</p>
   */
  export interface KMSNotFoundExceptionMember {
    SubscribeToShardEvent?: never;
    ResourceNotFoundException?: never;
    ResourceInUseException?: never;
    KMSDisabledException?: never;
    KMSInvalidStateException?: never;
    KMSAccessDeniedException?: never;
    KMSNotFoundException: KMSNotFoundException;
    KMSOptInRequired?: never;
    KMSThrottlingException?: never;
    InternalFailureException?: never;
    $unknown?: never;
  }

  /**
   * <p>The AWS access key ID needs a subscription for the service.</p>
   */
  export interface KMSOptInRequiredMember {
    SubscribeToShardEvent?: never;
    ResourceNotFoundException?: never;
    ResourceInUseException?: never;
    KMSDisabledException?: never;
    KMSInvalidStateException?: never;
    KMSAccessDeniedException?: never;
    KMSNotFoundException?: never;
    KMSOptInRequired: KMSOptInRequired;
    KMSThrottlingException?: never;
    InternalFailureException?: never;
    $unknown?: never;
  }

  /**
   * <p>The request was denied due to request throttling. For more information about
   *             throttling, see <a href="https://docs.aws.amazon.com/kms/latest/developerguide/limits.html#requests-per-second">Limits</a> in
   *             the <i>AWS Key Management Service Developer Guide</i>.</p>
   */
  export interface KMSThrottlingExceptionMember {
    SubscribeToShardEvent?: never;
    ResourceNotFoundException?: never;
    ResourceInUseException?: never;
    KMSDisabledException?: never;
    KMSInvalidStateException?: never;
    KMSAccessDeniedException?: never;
    KMSNotFoundException?: never;
    KMSOptInRequired?: never;
    KMSThrottlingException: KMSThrottlingException;
    InternalFailureException?: never;
    $unknown?: never;
  }

  /**
   * <p>The processing of the request failed because of an unknown error, exception, or
   *             failure.</p>
   */
  export interface InternalFailureExceptionMember {
    SubscribeToShardEvent?: never;
    ResourceNotFoundException?: never;
    ResourceInUseException?: never;
    KMSDisabledException?: never;
    KMSInvalidStateException?: never;
    KMSAccessDeniedException?: never;
    KMSNotFoundException?: never;
    KMSOptInRequired?: never;
    KMSThrottlingException?: never;
    InternalFailureException: InternalFailureException;
    $unknown?: never;
  }

  export interface $UnknownMember {
    SubscribeToShardEvent?: never;
    ResourceNotFoundException?: never;
    ResourceInUseException?: never;
    KMSDisabledException?: never;
    KMSInvalidStateException?: never;
    KMSAccessDeniedException?: never;
    KMSNotFoundException?: never;
    KMSOptInRequired?: never;
    KMSThrottlingException?: never;
    InternalFailureException?: never;
    $unknown: [string, any];
  }

  export interface Visitor<T> {
    SubscribeToShardEvent: (value: SubscribeToShardEvent) => T;
    ResourceNotFoundException: (value: ResourceNotFoundException) => T;
    ResourceInUseException: (value: ResourceInUseException) => T;
    KMSDisabledException: (value: KMSDisabledException) => T;
    KMSInvalidStateException: (value: KMSInvalidStateException) => T;
    KMSAccessDeniedException: (value: KMSAccessDeniedException) => T;
    KMSNotFoundException: (value: KMSNotFoundException) => T;
    KMSOptInRequired: (value: KMSOptInRequired) => T;
    KMSThrottlingException: (value: KMSThrottlingException) => T;
    InternalFailureException: (value: InternalFailureException) => T;
    _: (name: string, value: any) => T;
  }

  export const visit = <T>(value: SubscribeToShardEventStream, visitor: Visitor<T>): T => {
    if (value.SubscribeToShardEvent !== undefined) return visitor.SubscribeToShardEvent(value.SubscribeToShardEvent);
    if (value.ResourceNotFoundException !== undefined)
      return visitor.ResourceNotFoundException(value.ResourceNotFoundException);
    if (value.ResourceInUseException !== undefined) return visitor.ResourceInUseException(value.ResourceInUseException);
    if (value.KMSDisabledException !== undefined) return visitor.KMSDisabledException(value.KMSDisabledException);
    if (value.KMSInvalidStateException !== undefined)
      return visitor.KMSInvalidStateException(value.KMSInvalidStateException);
    if (value.KMSAccessDeniedException !== undefined)
      return visitor.KMSAccessDeniedException(value.KMSAccessDeniedException);
    if (value.KMSNotFoundException !== undefined) return visitor.KMSNotFoundException(value.KMSNotFoundException);
    if (value.KMSOptInRequired !== undefined) return visitor.KMSOptInRequired(value.KMSOptInRequired);
    if (value.KMSThrottlingException !== undefined) return visitor.KMSThrottlingException(value.KMSThrottlingException);
    if (value.InternalFailureException !== undefined)
      return visitor.InternalFailureException(value.InternalFailureException);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  };

  export const filterSensitiveLog = (obj: SubscribeToShardEventStream): any => {
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
    if (obj.$unknown !== undefined) return { [obj.$unknown[0]]: "UNKNOWN" };
  };
}

export interface SubscribeToShardOutput {
  /**
   * <p>The event stream that your consumer can use to read records from the shard.</p>
   */
  EventStream: AsyncIterable<SubscribeToShardEventStream> | undefined;
}

export namespace SubscribeToShardOutput {
  export const filterSensitiveLog = (obj: SubscribeToShardOutput): any => ({
    ...obj,
    ...(obj.EventStream && { EventStream: "STREAMING_CONTENT" }),
  });
}

export enum ScalingType {
  UNIFORM_SCALING = "UNIFORM_SCALING",
}

export interface UpdateShardCountInput {
  /**
   * <p>The name of the stream.</p>
   */
  StreamName: string | undefined;

  /**
   * <p>The new number of shards. This value has the following default limits. By default,
   *             you cannot do the following: </p>
   *         <ul>
   *             <li>
   *                 <p>Set this value to more than double your current shard count for a
   *                     stream.</p>
   *             </li>
   *             <li>
   *                 <p>Set this value below half your current shard count for a stream.</p>
   *             </li>
   *             <li>
   *                 <p>Set this value to more than 500 shards in a stream (the default limit for
   *                     shard count per stream is 500 per account per region), unless you request a
   *                     limit increase.</p>
   *             </li>
   *             <li>
   *                 <p>Scale a stream with more than 500 shards down unless you set this value to
   *                     less than 500 shards.</p>
   *             </li>
   *          </ul>
   */
  TargetShardCount: number | undefined;

  /**
   * <p>The scaling type. Uniform scaling creates shards of equal size.</p>
   */
  ScalingType: ScalingType | string | undefined;
}

export namespace UpdateShardCountInput {
  export const filterSensitiveLog = (obj: UpdateShardCountInput): any => ({
    ...obj,
  });
}

export interface UpdateShardCountOutput {
  /**
   * <p>The name of the stream.</p>
   */
  StreamName?: string;

  /**
   * <p>The current number of shards.</p>
   */
  CurrentShardCount?: number;

  /**
   * <p>The updated number of shards.</p>
   */
  TargetShardCount?: number;
}

export namespace UpdateShardCountOutput {
  export const filterSensitiveLog = (obj: UpdateShardCountOutput): any => ({
    ...obj,
  });
}
