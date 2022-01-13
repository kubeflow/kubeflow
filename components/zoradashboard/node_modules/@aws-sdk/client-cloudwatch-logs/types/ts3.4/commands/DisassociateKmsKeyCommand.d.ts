import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { DisassociateKmsKeyRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DisassociateKmsKeyCommandInput = DisassociateKmsKeyRequest;
export declare type DisassociateKmsKeyCommandOutput = __MetadataBearer;
/**
 * <p>Disassociates the associated AWS Key Management Service (AWS KMS) customer master key (CMK) from the specified log group.</p>
 *          <p>After the AWS KMS CMK is disassociated from the log group, AWS CloudWatch Logs stops encrypting newly ingested data for the log group.
 *       All previously ingested data remains encrypted, and AWS CloudWatch Logs requires permissions for the CMK whenever the encrypted data is requested.</p>
 *          <p>Note that it can take up to 5 minutes for this operation to take effect.</p>
 */
export declare class DisassociateKmsKeyCommand extends $Command<DisassociateKmsKeyCommandInput, DisassociateKmsKeyCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: DisassociateKmsKeyCommandInput;
    constructor(input: DisassociateKmsKeyCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DisassociateKmsKeyCommandInput, DisassociateKmsKeyCommandOutput>;
    private serialize;
    private deserialize;
}
