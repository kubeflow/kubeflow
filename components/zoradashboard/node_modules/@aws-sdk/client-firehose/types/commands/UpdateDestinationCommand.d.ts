import { FirehoseClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../FirehoseClient";
import { UpdateDestinationInput, UpdateDestinationOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type UpdateDestinationCommandInput = UpdateDestinationInput;
export declare type UpdateDestinationCommandOutput = UpdateDestinationOutput & __MetadataBearer;
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
export declare class UpdateDestinationCommand extends $Command<UpdateDestinationCommandInput, UpdateDestinationCommandOutput, FirehoseClientResolvedConfig> {
    readonly input: UpdateDestinationCommandInput;
    constructor(input: UpdateDestinationCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: FirehoseClientResolvedConfig, options?: __HttpHandlerOptions): Handler<UpdateDestinationCommandInput, UpdateDestinationCommandOutput>;
    private serialize;
    private deserialize;
}
