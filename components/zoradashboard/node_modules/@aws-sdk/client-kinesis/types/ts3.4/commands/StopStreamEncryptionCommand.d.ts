import { KinesisClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KinesisClient";
import { StopStreamEncryptionInput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StopStreamEncryptionCommandInput = StopStreamEncryptionInput;
export declare type StopStreamEncryptionCommandOutput = __MetadataBearer;
/**
 * <p>Disables server-side encryption for a specified stream. </p>
 *         <p>Stopping encryption is an asynchronous operation. Upon receiving the request,
 *             Kinesis Data Streams returns immediately and sets the status of the stream to
 *                 <code>UPDATING</code>. After the update is complete, Kinesis Data Streams sets the
 *             status of the stream back to <code>ACTIVE</code>. Stopping encryption normally takes a
 *             few seconds to complete, but it can take minutes. You can continue to read and write
 *             data to your stream while its status is <code>UPDATING</code>. Once the status of the
 *             stream is <code>ACTIVE</code>, records written to the stream are no longer encrypted by
 *             Kinesis Data Streams. </p>
 *         <p>API Limits: You can successfully disable server-side encryption 25 times in a
 *             rolling 24-hour period. </p>
 *         <p>Note: It can take up to 5 seconds after the stream is in an <code>ACTIVE</code>
 *             status before all records written to the stream are no longer subject to encryption.
 *             After you disabled encryption, you can verify that encryption is not applied by
 *             inspecting the API response from <code>PutRecord</code> or
 *             <code>PutRecords</code>.</p>
 */
export declare class StopStreamEncryptionCommand extends $Command<StopStreamEncryptionCommandInput, StopStreamEncryptionCommandOutput, KinesisClientResolvedConfig> {
    readonly input: StopStreamEncryptionCommandInput;
    constructor(input: StopStreamEncryptionCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KinesisClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StopStreamEncryptionCommandInput, StopStreamEncryptionCommandOutput>;
    private serialize;
    private deserialize;
}
