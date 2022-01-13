import { FirehoseClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../FirehoseClient";
import { DescribeDeliveryStreamInput, DescribeDeliveryStreamOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeDeliveryStreamCommandInput = DescribeDeliveryStreamInput;
export declare type DescribeDeliveryStreamCommandOutput = DescribeDeliveryStreamOutput & __MetadataBearer;
/**
 * <p>Describes the specified delivery stream and its status. For example, after your
 *          delivery stream is created, call <code>DescribeDeliveryStream</code> to see whether the
 *          delivery stream is <code>ACTIVE</code> and therefore ready for data to be sent to it. </p>
 *          <p>If the status of a delivery stream is <code>CREATING_FAILED</code>, this status
 *          doesn't change, and you can't invoke <a>CreateDeliveryStream</a> again on it.
 *          However, you can invoke the <a>DeleteDeliveryStream</a> operation to delete it.
 *          If the status is <code>DELETING_FAILED</code>, you can force deletion by invoking <a>DeleteDeliveryStream</a> again but with <a>DeleteDeliveryStreamInput$AllowForceDelete</a> set to true.</p>
 */
export declare class DescribeDeliveryStreamCommand extends $Command<DescribeDeliveryStreamCommandInput, DescribeDeliveryStreamCommandOutput, FirehoseClientResolvedConfig> {
    readonly input: DescribeDeliveryStreamCommandInput;
    constructor(input: DescribeDeliveryStreamCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: FirehoseClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeDeliveryStreamCommandInput, DescribeDeliveryStreamCommandOutput>;
    private serialize;
    private deserialize;
}
