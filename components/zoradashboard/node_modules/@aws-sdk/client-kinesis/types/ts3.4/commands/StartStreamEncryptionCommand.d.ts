import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { StartStreamEncryptionInput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StartStreamEncryptionCommandInput = StartStreamEncryptionInput;
export declare type StartStreamEncryptionCommandOutput = __MetadataBearer;
/**
 * <p>Enables or updates server-side encryption using an AWS KMS key for a specified
 *             stream. </p>
 *         <p>Starting encryption is an asynchronous operation. Upon receiving the request,
 *             Kinesis Data Streams returns immediately and sets the status of the stream to
 *                 <code>UPDATING</code>. After the update is complete, Kinesis Data Streams sets the
 *             status of the stream back to <code>ACTIVE</code>. Updating or applying encryption
 *             normally takes a few seconds to complete, but it can take minutes. You can continue to
 *             read and write data to your stream while its status is <code>UPDATING</code>. Once the
 *             status of the stream is <code>ACTIVE</code>, encryption begins for records written to
 *             the stream. </p>
 *         <p>API Limits: You can successfully apply a new AWS KMS key for server-side encryption
 *             25 times in a rolling 24-hour period.</p>
 *         <p>Note: It can take up to 5 seconds after the stream is in an <code>ACTIVE</code>
 *             status before all records written to the stream are encrypted. After you enable
 *             encryption, you can verify that encryption is applied by inspecting the API response
 *             from <code>PutRecord</code> or <code>PutRecords</code>.</p>
 */
export declare class StartStreamEncryptionCommand extends $Command<StartStreamEncryptionCommandInput, StartStreamEncryptionCommandOutput, KinesisClientResolvedConfig> {
    readonly input: StartStreamEncryptionCommandInput;
    constructor(input: StartStreamEncryptionCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KinesisClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StartStreamEncryptionCommandInput, StartStreamEncryptionCommandOutput>;
    private serialize;
    private deserialize;
}
