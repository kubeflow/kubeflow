import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";
import { ListBucketAnalyticsConfigurationsOutput, ListBucketAnalyticsConfigurationsRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListBucketAnalyticsConfigurationsCommandInput = ListBucketAnalyticsConfigurationsRequest;
export declare type ListBucketAnalyticsConfigurationsCommandOutput = ListBucketAnalyticsConfigurationsOutput & __MetadataBearer;
/**
 * <p>Lists the analytics configurations for the bucket. You can have up to 1,000 analytics
 *          configurations per bucket.</p>
 *
 *          <p>This operation supports list pagination and does not return more than 100 configurations
 *          at a time. You should always check the <code>IsTruncated</code> element in the response. If
 *          there are no more configurations to list, <code>IsTruncated</code> is set to false. If
 *          there are more configurations to list, <code>IsTruncated</code> is set to true, and there
 *          will be a value in <code>NextContinuationToken</code>. You use the
 *             <code>NextContinuationToken</code> value to continue the pagination of the list by
 *          passing the value in continuation-token in the request to <code>GET</code> the next
 *          page.</p>
 *
 *          <p>To use this operation, you must have permissions to perform the
 *             <code>s3:GetAnalyticsConfiguration</code> action. The bucket owner has this permission
 *          by default. The bucket owner can grant this permission to others. For more information
 *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
 *             Resources</a>.</p>
 *
 *          <p>For information about Amazon S3 analytics feature, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/analytics-storage-class.html">Amazon S3 Analytics – Storage Class
 *             Analysis</a>. </p>
 *
 *          <p>The following operations are related to
 *          <code>ListBucketAnalyticsConfigurations</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketAnalyticsConfiguration.html">GetBucketAnalyticsConfiguration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketAnalyticsConfiguration.html">DeleteBucketAnalyticsConfiguration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketAnalyticsConfiguration.html">PutBucketAnalyticsConfiguration</a>
 *                </p>
 *             </li>
 *          </ul>
 */
export declare class ListBucketAnalyticsConfigurationsCommand extends $Command<ListBucketAnalyticsConfigurationsCommandInput, ListBucketAnalyticsConfigurationsCommandOutput, S3ClientResolvedConfig> {
    readonly input: ListBucketAnalyticsConfigurationsCommandInput;
    constructor(input: ListBucketAnalyticsConfigurationsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: S3ClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListBucketAnalyticsConfigurationsCommandInput, ListBucketAnalyticsConfigurationsCommandOutput>;
    private serialize;
    private deserialize;
}
