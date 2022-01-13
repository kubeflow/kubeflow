import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";
import { GetBucketNotificationConfigurationRequest, NotificationConfiguration } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type GetBucketNotificationConfigurationCommandInput = GetBucketNotificationConfigurationRequest;
export declare type GetBucketNotificationConfigurationCommandOutput = NotificationConfiguration & __MetadataBearer;
/**
 * <p>Returns the notification configuration of a bucket.</p>
 *          <p>If notifications are not enabled on the bucket, the operation returns an empty
 *             <code>NotificationConfiguration</code> element.</p>
 *
 *          <p>By default, you must be the bucket owner to read the notification configuration of a
 *          bucket. However, the bucket owner can use a bucket policy to grant permission to other
 *          users to read this configuration with the <code>s3:GetBucketNotification</code>
 *          permission.</p>
 *
 *          <p>For more information about setting and reading the notification configuration on a
 *          bucket, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html">Setting Up Notification of
 *             Bucket Events</a>. For more information about bucket policies, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-iam-policies.html">Using Bucket Policies</a>.</p>
 *
 *          <p>The following operation is related to <code>GetBucketNotification</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketNotification.html">PutBucketNotification</a>
 *                </p>
 *             </li>
 *          </ul>
 */
export declare class GetBucketNotificationConfigurationCommand extends $Command<GetBucketNotificationConfigurationCommandInput, GetBucketNotificationConfigurationCommandOutput, S3ClientResolvedConfig> {
    readonly input: GetBucketNotificationConfigurationCommandInput;
    constructor(input: GetBucketNotificationConfigurationCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: S3ClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetBucketNotificationConfigurationCommandInput, GetBucketNotificationConfigurationCommandOutput>;
    private serialize;
    private deserialize;
}
