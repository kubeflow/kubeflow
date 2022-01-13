import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";
import { PutObjectLockConfigurationOutput, PutObjectLockConfigurationRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type PutObjectLockConfigurationCommandInput = PutObjectLockConfigurationRequest;
export declare type PutObjectLockConfigurationCommandOutput = PutObjectLockConfigurationOutput & __MetadataBearer;
/**
 * <p>Places an Object Lock configuration on the specified bucket. The rule specified in the
 *          Object Lock configuration will be applied by default to every new object placed in the
 *          specified bucket.</p>
 *          <note>
 *             <p>
 *                <code>DefaultRetention</code> requires either Days or Years. You can't specify both
 *             at the same time.</p>
 *          </note>
 *          <p class="title">
 *             <b>Related Resources</b>
 *          </p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock.html">Locking
 *                   Objects</a>
 *                </p>
 *             </li>
 *          </ul>
 */
export declare class PutObjectLockConfigurationCommand extends $Command<PutObjectLockConfigurationCommandInput, PutObjectLockConfigurationCommandOutput, S3ClientResolvedConfig> {
    readonly input: PutObjectLockConfigurationCommandInput;
    constructor(input: PutObjectLockConfigurationCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: S3ClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PutObjectLockConfigurationCommandInput, PutObjectLockConfigurationCommandOutput>;
    private serialize;
    private deserialize;
}
