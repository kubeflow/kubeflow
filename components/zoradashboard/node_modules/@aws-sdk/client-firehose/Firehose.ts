import { FirehoseClient } from "./FirehoseClient";
import {
  CreateDeliveryStreamCommand,
  CreateDeliveryStreamCommandInput,
  CreateDeliveryStreamCommandOutput,
} from "./commands/CreateDeliveryStreamCommand";
import {
  DeleteDeliveryStreamCommand,
  DeleteDeliveryStreamCommandInput,
  DeleteDeliveryStreamCommandOutput,
} from "./commands/DeleteDeliveryStreamCommand";
import {
  DescribeDeliveryStreamCommand,
  DescribeDeliveryStreamCommandInput,
  DescribeDeliveryStreamCommandOutput,
} from "./commands/DescribeDeliveryStreamCommand";
import {
  ListDeliveryStreamsCommand,
  ListDeliveryStreamsCommandInput,
  ListDeliveryStreamsCommandOutput,
} from "./commands/ListDeliveryStreamsCommand";
import {
  ListTagsForDeliveryStreamCommand,
  ListTagsForDeliveryStreamCommandInput,
  ListTagsForDeliveryStreamCommandOutput,
} from "./commands/ListTagsForDeliveryStreamCommand";
import {
  PutRecordBatchCommand,
  PutRecordBatchCommandInput,
  PutRecordBatchCommandOutput,
} from "./commands/PutRecordBatchCommand";
import { PutRecordCommand, PutRecordCommandInput, PutRecordCommandOutput } from "./commands/PutRecordCommand";
import {
  StartDeliveryStreamEncryptionCommand,
  StartDeliveryStreamEncryptionCommandInput,
  StartDeliveryStreamEncryptionCommandOutput,
} from "./commands/StartDeliveryStreamEncryptionCommand";
import {
  StopDeliveryStreamEncryptionCommand,
  StopDeliveryStreamEncryptionCommandInput,
  StopDeliveryStreamEncryptionCommandOutput,
} from "./commands/StopDeliveryStreamEncryptionCommand";
import {
  TagDeliveryStreamCommand,
  TagDeliveryStreamCommandInput,
  TagDeliveryStreamCommandOutput,
} from "./commands/TagDeliveryStreamCommand";
import {
  UntagDeliveryStreamCommand,
  UntagDeliveryStreamCommandInput,
  UntagDeliveryStreamCommandOutput,
} from "./commands/UntagDeliveryStreamCommand";
import {
  UpdateDestinationCommand,
  UpdateDestinationCommandInput,
  UpdateDestinationCommandOutput,
} from "./commands/UpdateDestinationCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";

/**
 * <fullname>Amazon Kinesis Data Firehose API Reference</fullname>
 *          <p>Amazon Kinesis Data Firehose is a fully managed service that delivers real-time
 *          streaming data to destinations such as Amazon Simple Storage Service (Amazon S3), Amazon
 *          Elasticsearch Service (Amazon ES), Amazon Redshift, and Splunk.</p>
 */
export class Firehose extends FirehoseClient {
  /**
   * <p>Creates a Kinesis Data Firehose delivery stream.</p>
   *
   *          <p>By default, you can create up to 50 delivery streams per AWS Region.</p>
   *          <p>This is an asynchronous operation that immediately returns. The initial status of the
   *          delivery stream is <code>CREATING</code>. After the delivery stream is created, its status
   *          is <code>ACTIVE</code> and it now accepts data. If the delivery stream creation fails, the
   *          status transitions to <code>CREATING_FAILED</code>. Attempts to send data to a delivery
   *          stream that is not in the <code>ACTIVE</code> state cause an exception. To check the state
   *          of a delivery stream, use <a>DescribeDeliveryStream</a>.</p>
   *          <p>If the status of a delivery stream is <code>CREATING_FAILED</code>, this status
   *          doesn't change, and you can't invoke <code>CreateDeliveryStream</code> again on it.
   *          However, you can invoke the <a>DeleteDeliveryStream</a> operation to delete
   *          it.</p>
   *          <p>A Kinesis Data Firehose delivery stream can be configured to receive records directly
   *          from providers using <a>PutRecord</a> or <a>PutRecordBatch</a>, or it
   *          can be configured to use an existing Kinesis stream as its source. To specify a Kinesis
   *          data stream as input, set the <code>DeliveryStreamType</code> parameter to
   *             <code>KinesisStreamAsSource</code>, and provide the Kinesis stream Amazon Resource Name
   *          (ARN) and role ARN in the <code>KinesisStreamSourceConfiguration</code>
   *          parameter.</p>
   *          <p>To create a delivery stream with server-side encryption (SSE) enabled, include <a>DeliveryStreamEncryptionConfigurationInput</a> in your request. This is
   *          optional. You can also invoke <a>StartDeliveryStreamEncryption</a> to turn on
   *          SSE for an existing delivery stream that doesn't have SSE enabled.</p>
   *          <p>A delivery stream is configured with a single destination: Amazon S3, Amazon ES,
   *          Amazon Redshift, or Splunk. You must specify only one of the following destination
   *          configuration parameters: <code>ExtendedS3DestinationConfiguration</code>,
   *             <code>S3DestinationConfiguration</code>,
   *             <code>ElasticsearchDestinationConfiguration</code>,
   *             <code>RedshiftDestinationConfiguration</code>, or
   *             <code>SplunkDestinationConfiguration</code>.</p>
   *          <p>When you specify <code>S3DestinationConfiguration</code>, you can also provide the
   *          following optional values: BufferingHints, <code>EncryptionConfiguration</code>, and
   *             <code>CompressionFormat</code>. By default, if no <code>BufferingHints</code> value is
   *          provided, Kinesis Data Firehose buffers data up to 5 MB or for 5 minutes, whichever
   *          condition is satisfied first. <code>BufferingHints</code> is a hint, so there are some
   *          cases where the service cannot adhere to these conditions strictly. For example, record
   *          boundaries might be such that the size is a little over or under the configured buffering
   *          size. By default, no encryption is performed. We strongly recommend that you enable
   *          encryption to ensure secure data storage in Amazon S3.</p>
   *
   *          <p>A few notes about Amazon Redshift as a destination:</p>
   *          <ul>
   *             <li>
   *                <p>An Amazon Redshift destination requires an S3 bucket as intermediate location.
   *                Kinesis Data Firehose first delivers data to Amazon S3 and then uses
   *                   <code>COPY</code> syntax to load data into an Amazon Redshift table. This is
   *                specified in the <code>RedshiftDestinationConfiguration.S3Configuration</code>
   *                parameter.</p>
   *
   *             </li>
   *             <li>
   *                <p>The compression formats <code>SNAPPY</code> or <code>ZIP</code> cannot be
   *                specified in <code>RedshiftDestinationConfiguration.S3Configuration</code> because
   *                the Amazon Redshift <code>COPY</code> operation that reads from the S3 bucket doesn't
   *                support these compression formats.</p>
   *             </li>
   *             <li>
   *                <p>We strongly recommend that you use the user name and password you provide
   *                exclusively with Kinesis Data Firehose, and that the permissions for the account are
   *                restricted for Amazon Redshift <code>INSERT</code> permissions.</p>
   *
   *             </li>
   *          </ul>
   *          <p>Kinesis Data Firehose assumes the IAM role that is configured as part of the
   *          destination. The role should allow the Kinesis Data Firehose principal to assume the role,
   *          and the role should have permissions that allow the service to deliver the data. For more
   *          information, see <a href="https://docs.aws.amazon.com/firehose/latest/dev/controlling-access.html#using-iam-s3">Grant Kinesis Data
   *             Firehose Access to an Amazon S3 Destination</a> in the <i>Amazon Kinesis Data
   *             Firehose Developer Guide</i>.</p>
   */
  public createDeliveryStream(
    args: CreateDeliveryStreamCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateDeliveryStreamCommandOutput>;
  public createDeliveryStream(
    args: CreateDeliveryStreamCommandInput,
    cb: (err: any, data?: CreateDeliveryStreamCommandOutput) => void
  ): void;
  public createDeliveryStream(
    args: CreateDeliveryStreamCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateDeliveryStreamCommandOutput) => void
  ): void;
  public createDeliveryStream(
    args: CreateDeliveryStreamCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateDeliveryStreamCommandOutput) => void),
    cb?: (err: any, data?: CreateDeliveryStreamCommandOutput) => void
  ): Promise<CreateDeliveryStreamCommandOutput> | void {
    const command = new CreateDeliveryStreamCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes a delivery stream and its data.</p>
   *          <p>To check the state of a delivery stream, use <a>DescribeDeliveryStream</a>. You can delete a delivery stream only if it is in one of the following states:
   *             <code>ACTIVE</code>, <code>DELETING</code>, <code>CREATING_FAILED</code>, or
   *             <code>DELETING_FAILED</code>. You can't delete a delivery stream that is in the
   *             <code>CREATING</code> state. While the deletion request is in process, the delivery
   *          stream is in the <code>DELETING</code> state.</p>
   *          <p>While the delivery stream is in the <code>DELETING</code> state, the service might
   *          continue to accept records, but it doesn't make any guarantees with respect to delivering
   *          the data. Therefore, as a best practice, first stop any applications that are sending
   *          records before you delete a delivery stream.</p>
   */
  public deleteDeliveryStream(
    args: DeleteDeliveryStreamCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteDeliveryStreamCommandOutput>;
  public deleteDeliveryStream(
    args: DeleteDeliveryStreamCommandInput,
    cb: (err: any, data?: DeleteDeliveryStreamCommandOutput) => void
  ): void;
  public deleteDeliveryStream(
    args: DeleteDeliveryStreamCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteDeliveryStreamCommandOutput) => void
  ): void;
  public deleteDeliveryStream(
    args: DeleteDeliveryStreamCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteDeliveryStreamCommandOutput) => void),
    cb?: (err: any, data?: DeleteDeliveryStreamCommandOutput) => void
  ): Promise<DeleteDeliveryStreamCommandOutput> | void {
    const command = new DeleteDeliveryStreamCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Describes the specified delivery stream and its status. For example, after your
   *          delivery stream is created, call <code>DescribeDeliveryStream</code> to see whether the
   *          delivery stream is <code>ACTIVE</code> and therefore ready for data to be sent to it. </p>
   *          <p>If the status of a delivery stream is <code>CREATING_FAILED</code>, this status
   *          doesn't change, and you can't invoke <a>CreateDeliveryStream</a> again on it.
   *          However, you can invoke the <a>DeleteDeliveryStream</a> operation to delete it.
   *          If the status is <code>DELETING_FAILED</code>, you can force deletion by invoking <a>DeleteDeliveryStream</a> again but with <a>DeleteDeliveryStreamInput$AllowForceDelete</a> set to true.</p>
   */
  public describeDeliveryStream(
    args: DescribeDeliveryStreamCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeDeliveryStreamCommandOutput>;
  public describeDeliveryStream(
    args: DescribeDeliveryStreamCommandInput,
    cb: (err: any, data?: DescribeDeliveryStreamCommandOutput) => void
  ): void;
  public describeDeliveryStream(
    args: DescribeDeliveryStreamCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeDeliveryStreamCommandOutput) => void
  ): void;
  public describeDeliveryStream(
    args: DescribeDeliveryStreamCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeDeliveryStreamCommandOutput) => void),
    cb?: (err: any, data?: DescribeDeliveryStreamCommandOutput) => void
  ): Promise<DescribeDeliveryStreamCommandOutput> | void {
    const command = new DescribeDeliveryStreamCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Lists your delivery streams in alphabetical order of their names.</p>
   *          <p>The number of delivery streams might be too large to return using a single call to
   *             <code>ListDeliveryStreams</code>. You can limit the number of delivery streams returned,
   *          using the <code>Limit</code> parameter. To determine whether there are more delivery
   *          streams to list, check the value of <code>HasMoreDeliveryStreams</code> in the output. If
   *          there are more delivery streams to list, you can request them by calling this operation
   *          again and setting the <code>ExclusiveStartDeliveryStreamName</code> parameter to the name
   *          of the last delivery stream returned in the last call.</p>
   */
  public listDeliveryStreams(
    args: ListDeliveryStreamsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListDeliveryStreamsCommandOutput>;
  public listDeliveryStreams(
    args: ListDeliveryStreamsCommandInput,
    cb: (err: any, data?: ListDeliveryStreamsCommandOutput) => void
  ): void;
  public listDeliveryStreams(
    args: ListDeliveryStreamsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListDeliveryStreamsCommandOutput) => void
  ): void;
  public listDeliveryStreams(
    args: ListDeliveryStreamsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListDeliveryStreamsCommandOutput) => void),
    cb?: (err: any, data?: ListDeliveryStreamsCommandOutput) => void
  ): Promise<ListDeliveryStreamsCommandOutput> | void {
    const command = new ListDeliveryStreamsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Lists the tags for the specified delivery stream. This operation has a limit of five
   *          transactions per second per account. </p>
   */
  public listTagsForDeliveryStream(
    args: ListTagsForDeliveryStreamCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListTagsForDeliveryStreamCommandOutput>;
  public listTagsForDeliveryStream(
    args: ListTagsForDeliveryStreamCommandInput,
    cb: (err: any, data?: ListTagsForDeliveryStreamCommandOutput) => void
  ): void;
  public listTagsForDeliveryStream(
    args: ListTagsForDeliveryStreamCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListTagsForDeliveryStreamCommandOutput) => void
  ): void;
  public listTagsForDeliveryStream(
    args: ListTagsForDeliveryStreamCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListTagsForDeliveryStreamCommandOutput) => void),
    cb?: (err: any, data?: ListTagsForDeliveryStreamCommandOutput) => void
  ): Promise<ListTagsForDeliveryStreamCommandOutput> | void {
    const command = new ListTagsForDeliveryStreamCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Writes a single data record into an Amazon Kinesis Data Firehose delivery stream. To
   *          write multiple data records into a delivery stream, use <a>PutRecordBatch</a>.
   *          Applications using these operations are referred to as producers.</p>
   *          <p>By default, each delivery stream can take in up to 2,000 transactions per second,
   *          5,000 records per second, or 5 MB per second. If you use <a>PutRecord</a> and
   *             <a>PutRecordBatch</a>, the limits are an aggregate across these two
   *          operations for each delivery stream. For more information about limits and how to request
   *          an increase, see <a href="https://docs.aws.amazon.com/firehose/latest/dev/limits.html">Amazon
   *             Kinesis Data Firehose Limits</a>. </p>
   *          <p>You must specify the name of the delivery stream and the data record when using <a>PutRecord</a>. The data record consists of a data blob that can be up to 1,000
   *          KB in size, and any kind of data. For example, it can be a segment from a log file,
   *          geographic location data, website clickstream data, and so on.</p>
   *          <p>Kinesis Data Firehose buffers records before delivering them to the destination. To
   *          disambiguate the data blobs at the destination, a common solution is to use delimiters in
   *          the data, such as a newline (<code>\n</code>) or some other character unique within the
   *          data. This allows the consumer application to parse individual data items when reading the
   *          data from the destination.</p>
   *          <p>The <code>PutRecord</code> operation returns a <code>RecordId</code>, which is a
   *          unique string assigned to each record. Producer applications can use this ID for purposes
   *          such as auditability and investigation.</p>
   *          <p>If the <code>PutRecord</code> operation throws a
   *             <code>ServiceUnavailableException</code>, back off and retry. If the exception persists,
   *          it is possible that the throughput limits have been exceeded for the delivery stream. </p>
   *          <p>Data records sent to Kinesis Data Firehose are stored for 24 hours from the time they
   *          are added to a delivery stream as it tries to send the records to the destination. If the
   *          destination is unreachable for more than 24 hours, the data is no longer
   *          available.</p>
   *
   *          <important>
   *             <p>Don't concatenate two or more base64 strings to form the data fields of your records.
   *             Instead, concatenate the raw data, then perform base64 encoding.</p>
   *          </important>
   */
  public putRecord(args: PutRecordCommandInput, options?: __HttpHandlerOptions): Promise<PutRecordCommandOutput>;
  public putRecord(args: PutRecordCommandInput, cb: (err: any, data?: PutRecordCommandOutput) => void): void;
  public putRecord(
    args: PutRecordCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutRecordCommandOutput) => void
  ): void;
  public putRecord(
    args: PutRecordCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutRecordCommandOutput) => void),
    cb?: (err: any, data?: PutRecordCommandOutput) => void
  ): Promise<PutRecordCommandOutput> | void {
    const command = new PutRecordCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Writes multiple data records into a delivery stream in a single call, which can
   *          achieve higher throughput per producer than when writing single records. To write single
   *          data records into a delivery stream, use <a>PutRecord</a>. Applications using
   *          these operations are referred to as producers.</p>
   *          <p>For information about service quota, see <a href="https://docs.aws.amazon.com/firehose/latest/dev/limits.html">Amazon Kinesis Data Firehose
   *          Quota</a>.</p>
   *          <p>Each <a>PutRecordBatch</a> request supports up to 500 records. Each record
   *          in the request can be as large as 1,000 KB (before 64-bit encoding), up to a limit of 4 MB
   *          for the entire request. These limits cannot be changed.</p>
   *          <p>You must specify the name of the delivery stream and the data record when using <a>PutRecord</a>. The data record consists of a data blob that can be up to 1,000
   *          KB in size, and any kind of data. For example, it could be a segment from a log file,
   *          geographic location data, website clickstream data, and so on.</p>
   *          <p>Kinesis Data Firehose buffers records before delivering them to the destination. To
   *          disambiguate the data blobs at the destination, a common solution is to use delimiters in
   *          the data, such as a newline (<code>\n</code>) or some other character unique within the
   *          data. This allows the consumer application to parse individual data items when reading the
   *          data from the destination.</p>
   *          <p>The <a>PutRecordBatch</a> response includes a count of failed records,
   *             <code>FailedPutCount</code>, and an array of responses, <code>RequestResponses</code>.
   *          Even if the <a>PutRecordBatch</a> call succeeds, the value of
   *             <code>FailedPutCount</code> may be greater than 0, indicating that there are records for
   *          which the operation didn't succeed. Each entry in the <code>RequestResponses</code> array
   *          provides additional information about the processed record. It directly correlates with a
   *          record in the request array using the same ordering, from the top to the bottom. The
   *          response array always includes the same number of records as the request array.
   *             <code>RequestResponses</code> includes both successfully and unsuccessfully processed
   *          records. Kinesis Data Firehose tries to process all records in each <a>PutRecordBatch</a> request. A single record failure does not stop the processing
   *          of subsequent records. </p>
   *          <p>A successfully processed record includes a <code>RecordId</code> value, which is
   *          unique for the record. An unsuccessfully processed record includes <code>ErrorCode</code>
   *          and <code>ErrorMessage</code> values. <code>ErrorCode</code> reflects the type of error,
   *          and is one of the following values: <code>ServiceUnavailableException</code> or
   *             <code>InternalFailure</code>. <code>ErrorMessage</code> provides more detailed
   *          information about the error.</p>
   *          <p>If there is an internal server error or a timeout, the write might have completed or
   *          it might have failed. If <code>FailedPutCount</code> is greater than 0, retry the request,
   *          resending only those records that might have failed processing. This minimizes the possible
   *          duplicate records and also reduces the total bytes sent (and corresponding charges). We
   *          recommend that you handle any duplicates at the destination.</p>
   *          <p>If <a>PutRecordBatch</a> throws <code>ServiceUnavailableException</code>,
   *          back off and retry. If the exception persists, it is possible that the throughput limits
   *          have been exceeded for the delivery stream.</p>
   *
   *          <p>Data records sent to Kinesis Data Firehose are stored for 24 hours from the time they
   *          are added to a delivery stream as it attempts to send the records to the destination. If
   *          the destination is unreachable for more than 24 hours, the data is no longer
   *          available.</p>
   *          <important>
   *             <p>Don't concatenate two or more base64 strings to form the data fields of your records.
   *             Instead, concatenate the raw data, then perform base64 encoding.</p>
   *          </important>
   */
  public putRecordBatch(
    args: PutRecordBatchCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutRecordBatchCommandOutput>;
  public putRecordBatch(
    args: PutRecordBatchCommandInput,
    cb: (err: any, data?: PutRecordBatchCommandOutput) => void
  ): void;
  public putRecordBatch(
    args: PutRecordBatchCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutRecordBatchCommandOutput) => void
  ): void;
  public putRecordBatch(
    args: PutRecordBatchCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutRecordBatchCommandOutput) => void),
    cb?: (err: any, data?: PutRecordBatchCommandOutput) => void
  ): Promise<PutRecordBatchCommandOutput> | void {
    const command = new PutRecordBatchCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Enables server-side encryption (SSE) for the delivery stream. </p>
   *          <p>This operation is asynchronous. It returns immediately. When you invoke it, Kinesis Data
   *          Firehose first sets the encryption status of the stream to <code>ENABLING</code>, and then
   *          to <code>ENABLED</code>. The encryption status of a delivery stream is the
   *             <code>Status</code> property in <a>DeliveryStreamEncryptionConfiguration</a>.
   *          If the operation fails, the encryption status changes to <code>ENABLING_FAILED</code>. You
   *          can continue to read and write data to your delivery stream while the encryption status is
   *             <code>ENABLING</code>, but the data is not encrypted. It can take up to 5 seconds after
   *          the encryption status changes to <code>ENABLED</code> before all records written to the
   *          delivery stream are encrypted. To find out whether a record or a batch of records was
   *          encrypted, check the response elements <a>PutRecordOutput$Encrypted</a> and
   *             <a>PutRecordBatchOutput$Encrypted</a>, respectively.</p>
   *          <p>To check the encryption status of a delivery stream, use <a>DescribeDeliveryStream</a>.</p>
   *          <p>Even if encryption is currently enabled for a delivery stream, you can still invoke this
   *          operation on it to change the ARN of the CMK or both its type and ARN. If you invoke this
   *          method to change the CMK, and the old CMK is of type <code>CUSTOMER_MANAGED_CMK</code>,
   *          Kinesis Data Firehose schedules the grant it had on the old CMK for retirement. If the new
   *          CMK is of type <code>CUSTOMER_MANAGED_CMK</code>, Kinesis Data Firehose creates a grant
   *          that enables it to use the new CMK to encrypt and decrypt data and to manage the
   *          grant.</p>
   *          <p>If a delivery stream already has encryption enabled and then you invoke this operation
   *          to change the ARN of the CMK or both its type and ARN and you get
   *             <code>ENABLING_FAILED</code>, this only means that the attempt to change the CMK failed.
   *          In this case, encryption remains enabled with the old CMK.</p>
   *          <p>If the encryption status of your delivery stream is <code>ENABLING_FAILED</code>, you
   *          can invoke this operation again with a valid CMK. The CMK must be enabled and the key
   *          policy mustn't explicitly deny the permission for Kinesis Data Firehose to invoke KMS
   *          encrypt and decrypt operations.</p>
   *          <p>You can enable SSE for a delivery stream only if it's a delivery stream that uses
   *             <code>DirectPut</code> as its source. </p>
   *          <p>The <code>StartDeliveryStreamEncryption</code> and
   *             <code>StopDeliveryStreamEncryption</code> operations have a combined limit of 25 calls
   *          per delivery stream per 24 hours. For example, you reach the limit if you call
   *             <code>StartDeliveryStreamEncryption</code> 13 times and
   *             <code>StopDeliveryStreamEncryption</code> 12 times for the same delivery stream in a
   *          24-hour period.</p>
   */
  public startDeliveryStreamEncryption(
    args: StartDeliveryStreamEncryptionCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StartDeliveryStreamEncryptionCommandOutput>;
  public startDeliveryStreamEncryption(
    args: StartDeliveryStreamEncryptionCommandInput,
    cb: (err: any, data?: StartDeliveryStreamEncryptionCommandOutput) => void
  ): void;
  public startDeliveryStreamEncryption(
    args: StartDeliveryStreamEncryptionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StartDeliveryStreamEncryptionCommandOutput) => void
  ): void;
  public startDeliveryStreamEncryption(
    args: StartDeliveryStreamEncryptionCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StartDeliveryStreamEncryptionCommandOutput) => void),
    cb?: (err: any, data?: StartDeliveryStreamEncryptionCommandOutput) => void
  ): Promise<StartDeliveryStreamEncryptionCommandOutput> | void {
    const command = new StartDeliveryStreamEncryptionCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Disables server-side encryption (SSE) for the delivery stream. </p>
   *          <p>This operation is asynchronous. It returns immediately. When you invoke it, Kinesis Data
   *          Firehose first sets the encryption status of the stream to <code>DISABLING</code>, and then
   *          to <code>DISABLED</code>. You can continue to read and write data to your stream while its
   *          status is <code>DISABLING</code>. It can take up to 5 seconds after the encryption status
   *          changes to <code>DISABLED</code> before all records written to the delivery stream are no
   *          longer subject to encryption. To find out whether a record or a batch of records was
   *          encrypted, check the response elements <a>PutRecordOutput$Encrypted</a> and
   *             <a>PutRecordBatchOutput$Encrypted</a>, respectively.</p>
   *          <p>To check the encryption state of a delivery stream, use <a>DescribeDeliveryStream</a>. </p>
   *          <p>If SSE is enabled using a customer managed CMK and then you invoke
   *             <code>StopDeliveryStreamEncryption</code>, Kinesis Data Firehose schedules the related
   *          KMS grant for retirement and then retires it after it ensures that it is finished
   *          delivering records to the destination.</p>
   *          <p>The <code>StartDeliveryStreamEncryption</code> and
   *             <code>StopDeliveryStreamEncryption</code> operations have a combined limit of 25 calls
   *          per delivery stream per 24 hours. For example, you reach the limit if you call
   *             <code>StartDeliveryStreamEncryption</code> 13 times and
   *             <code>StopDeliveryStreamEncryption</code> 12 times for the same delivery stream in a
   *          24-hour period.</p>
   */
  public stopDeliveryStreamEncryption(
    args: StopDeliveryStreamEncryptionCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<StopDeliveryStreamEncryptionCommandOutput>;
  public stopDeliveryStreamEncryption(
    args: StopDeliveryStreamEncryptionCommandInput,
    cb: (err: any, data?: StopDeliveryStreamEncryptionCommandOutput) => void
  ): void;
  public stopDeliveryStreamEncryption(
    args: StopDeliveryStreamEncryptionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StopDeliveryStreamEncryptionCommandOutput) => void
  ): void;
  public stopDeliveryStreamEncryption(
    args: StopDeliveryStreamEncryptionCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StopDeliveryStreamEncryptionCommandOutput) => void),
    cb?: (err: any, data?: StopDeliveryStreamEncryptionCommandOutput) => void
  ): Promise<StopDeliveryStreamEncryptionCommandOutput> | void {
    const command = new StopDeliveryStreamEncryptionCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Adds or updates tags for the specified delivery stream. A tag is a key-value pair
   *          that you can define and assign to AWS resources. If you specify a tag that already exists,
   *          the tag value is replaced with the value that you specify in the request. Tags are
   *          metadata. For example, you can add friendly names and descriptions or other types of
   *          information that can help you distinguish the delivery stream. For more information about
   *          tags, see <a href="https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html">Using Cost Allocation Tags</a> in the <i>AWS Billing and Cost Management
   *             User Guide</i>. </p>
   *          <p>Each delivery stream can have up to 50 tags. </p>
   *          <p>This operation has a limit of five transactions per second per account. </p>
   */
  public tagDeliveryStream(
    args: TagDeliveryStreamCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<TagDeliveryStreamCommandOutput>;
  public tagDeliveryStream(
    args: TagDeliveryStreamCommandInput,
    cb: (err: any, data?: TagDeliveryStreamCommandOutput) => void
  ): void;
  public tagDeliveryStream(
    args: TagDeliveryStreamCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: TagDeliveryStreamCommandOutput) => void
  ): void;
  public tagDeliveryStream(
    args: TagDeliveryStreamCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: TagDeliveryStreamCommandOutput) => void),
    cb?: (err: any, data?: TagDeliveryStreamCommandOutput) => void
  ): Promise<TagDeliveryStreamCommandOutput> | void {
    const command = new TagDeliveryStreamCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Removes tags from the specified delivery stream. Removed tags are deleted, and you
   *          can't recover them after this operation successfully completes.</p>
   *          <p>If you specify a tag that doesn't exist, the operation ignores it.</p>
   *          <p>This operation has a limit of five transactions per second per account. </p>
   */
  public untagDeliveryStream(
    args: UntagDeliveryStreamCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UntagDeliveryStreamCommandOutput>;
  public untagDeliveryStream(
    args: UntagDeliveryStreamCommandInput,
    cb: (err: any, data?: UntagDeliveryStreamCommandOutput) => void
  ): void;
  public untagDeliveryStream(
    args: UntagDeliveryStreamCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UntagDeliveryStreamCommandOutput) => void
  ): void;
  public untagDeliveryStream(
    args: UntagDeliveryStreamCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UntagDeliveryStreamCommandOutput) => void),
    cb?: (err: any, data?: UntagDeliveryStreamCommandOutput) => void
  ): Promise<UntagDeliveryStreamCommandOutput> | void {
    const command = new UntagDeliveryStreamCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Updates the specified destination of the specified delivery stream.</p>
   *
   *          <p>Use this operation to change the destination type (for example, to replace the Amazon
   *          S3 destination with Amazon Redshift) or change the parameters associated with a destination
   *          (for example, to change the bucket name of the Amazon S3 destination). The update might not
   *          occur immediately. The target delivery stream remains active while the configurations are
   *          updated, so data writes to the delivery stream can continue during this process. The
   *          updated configurations are usually effective within a few minutes.</p>
   *          <p>Switching between Amazon ES and other services is not supported. For an Amazon ES
   *          destination, you can only update to another Amazon ES destination.</p>
   *          <p>If the destination type is the same, Kinesis Data Firehose merges the configuration
   *          parameters specified with the destination configuration that already exists on the delivery
   *          stream. If any of the parameters are not specified in the call, the existing values are
   *          retained. For example, in the Amazon S3 destination, if <a>EncryptionConfiguration</a> is not specified, then the existing
   *             <code>EncryptionConfiguration</code> is maintained on the destination.</p>
   *          <p>If the destination type is not the same, for example, changing the destination from
   *          Amazon S3 to Amazon Redshift, Kinesis Data Firehose does not merge any parameters. In this
   *          case, all parameters must be specified.</p>
   *
   *          <p>Kinesis Data Firehose uses <code>CurrentDeliveryStreamVersionId</code> to avoid race
   *          conditions and conflicting merges. This is a required field, and the service updates the
   *          configuration only if the existing configuration has a version ID that matches. After the
   *          update is applied successfully, the version ID is updated, and can be retrieved using <a>DescribeDeliveryStream</a>. Use the new version ID to set
   *             <code>CurrentDeliveryStreamVersionId</code> in the next call.</p>
   */
  public updateDestination(
    args: UpdateDestinationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateDestinationCommandOutput>;
  public updateDestination(
    args: UpdateDestinationCommandInput,
    cb: (err: any, data?: UpdateDestinationCommandOutput) => void
  ): void;
  public updateDestination(
    args: UpdateDestinationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateDestinationCommandOutput) => void
  ): void;
  public updateDestination(
    args: UpdateDestinationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateDestinationCommandOutput) => void),
    cb?: (err: any, data?: UpdateDestinationCommandOutput) => void
  ): Promise<UpdateDestinationCommandOutput> | void {
    const command = new UpdateDestinationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }
}
