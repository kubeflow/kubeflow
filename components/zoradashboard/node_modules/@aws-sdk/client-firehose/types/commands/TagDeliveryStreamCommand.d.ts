import { FirehoseClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../FirehoseClient";
import { TagDeliveryStreamInput, TagDeliveryStreamOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type TagDeliveryStreamCommandInput = TagDeliveryStreamInput;
export declare type TagDeliveryStreamCommandOutput = TagDeliveryStreamOutput & __MetadataBearer;
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
export declare class TagDeliveryStreamCommand extends $Command<TagDeliveryStreamCommandInput, TagDeliveryStreamCommandOutput, FirehoseClientResolvedConfig> {
    readonly input: TagDeliveryStreamCommandInput;
    constructor(input: TagDeliveryStreamCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: FirehoseClientResolvedConfig, options?: __HttpHandlerOptions): Handler<TagDeliveryStreamCommandInput, TagDeliveryStreamCommandOutput>;
    private serialize;
    private deserialize;
}
