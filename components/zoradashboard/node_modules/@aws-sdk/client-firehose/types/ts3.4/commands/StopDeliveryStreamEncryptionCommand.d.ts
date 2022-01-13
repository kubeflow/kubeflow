import { FirehoseClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../FirehoseClient";
import { StopDeliveryStreamEncryptionInput, StopDeliveryStreamEncryptionOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StopDeliveryStreamEncryptionCommandInput = StopDeliveryStreamEncryptionInput;
export declare type StopDeliveryStreamEncryptionCommandOutput = StopDeliveryStreamEncryptionOutput & __MetadataBearer;
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
export declare class StopDeliveryStreamEncryptionCommand extends $Command<StopDeliveryStreamEncryptionCommandInput, StopDeliveryStreamEncryptionCommandOutput, FirehoseClientResolvedConfig> {
    readonly input: StopDeliveryStreamEncryptionCommandInput;
    constructor(input: StopDeliveryStreamEncryptionCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: FirehoseClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StopDeliveryStreamEncryptionCommandInput, StopDeliveryStreamEncryptionCommandOutput>;
    private serialize;
    private deserialize;
}
