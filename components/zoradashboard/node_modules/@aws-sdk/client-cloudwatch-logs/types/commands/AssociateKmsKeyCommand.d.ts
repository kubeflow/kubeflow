import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { AssociateKmsKeyRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type AssociateKmsKeyCommandInput = AssociateKmsKeyRequest;
export declare type AssociateKmsKeyCommandOutput = __MetadataBearer;
/**
 * <p>Associates the specified AWS Key Management Service (AWS KMS) customer master key (CMK) with the specified log group.</p>
 *          <p>Associating an AWS KMS CMK with a log group overrides any existing associations between the log group and a CMK.
 *       After a CMK is associated with a log group, all newly ingested data for the log group is encrypted using the CMK.
 *       This association is stored as long as the data encrypted with the CMK is still within Amazon CloudWatch Logs.
 *       This enables Amazon CloudWatch Logs to decrypt this data whenever it is requested.</p>
 *          <important>
 *             <p>CloudWatch Logs supports only symmetric CMKs. Do not use an associate an asymmetric CMK
 *         with your log group. For more information, see <a href="https://docs.aws.amazon.com/kms/latest/developerguide/symmetric-asymmetric.html">Using Symmetric and Asymmetric
 *           Keys</a>.</p>
 *          </important>
 *          <p>It can take up to 5 minutes for this operation to take effect.</p>
 *          <p>If you attempt to associate a CMK with a log group but the CMK does not exist or the
 *       CMK is disabled, you receive an <code>InvalidParameterException</code> error. </p>
 */
export declare class AssociateKmsKeyCommand extends $Command<AssociateKmsKeyCommandInput, AssociateKmsKeyCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: AssociateKmsKeyCommandInput;
    constructor(input: AssociateKmsKeyCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<AssociateKmsKeyCommandInput, AssociateKmsKeyCommandOutput>;
    private serialize;
    private deserialize;
}
