import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";
import { PutBucketLoggingRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type PutBucketLoggingCommandInput = PutBucketLoggingRequest;
export declare type PutBucketLoggingCommandOutput = __MetadataBearer;
/**
 * <p>Set the logging parameters for a bucket and to specify permissions for who can view and
 *          modify the logging parameters. All logs are saved to buckets in the same AWS Region as the
 *          source bucket. To set the logging status of a bucket, you must be the bucket owner.</p>
 *
 *          <p>The bucket owner is automatically granted FULL_CONTROL to all logs. You use the
 *             <code>Grantee</code> request element to grant access to other people. The
 *             <code>Permissions</code> request element specifies the kind of access the grantee has to
 *          the logs.</p>
 *
 *          <p>
 *             <b>Grantee Values</b>
 *          </p>
 *          <p>You can specify the person (grantee) to whom you're assigning access rights (using
 *          request elements) in the following ways:</p>
 *
 *          <ul>
 *             <li>
 *                <p>By the person's ID:</p>
 *                <p>
 *                   <code><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 *                   xsi:type="CanonicalUser"><ID><>ID<></ID><DisplayName><>GranteesEmail<></DisplayName>
 *                   </Grantee></code>
 *                </p>
 *                <p>DisplayName is optional and ignored in the request.</p>
 *             </li>
 *             <li>
 *                <p>By Email address:</p>
 *                <p>
 *                   <code> <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 *                   xsi:type="AmazonCustomerByEmail"><EmailAddress><>Grantees@email.com<></EmailAddress></Grantee></code>
 *                </p>
 *                <p>The grantee is resolved to the CanonicalUser and, in a response to a GET Object
 *                acl request, appears as the CanonicalUser.</p>
 *             </li>
 *             <li>
 *                <p>By URI:</p>
 *                <p>
 *                   <code><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 *                   xsi:type="Group"><URI><>http://acs.amazonaws.com/groups/global/AuthenticatedUsers<></URI></Grantee></code>
 *                </p>
 *             </li>
 *          </ul>
 *
 *
 *          <p>To enable logging, you use LoggingEnabled and its children request elements. To disable
 *          logging, you use an empty BucketLoggingStatus request element:</p>
 *
 *          <p>
 *             <code><BucketLoggingStatus xmlns="http://doc.s3.amazonaws.com/2006-03-01"
 *             /></code>
 *          </p>
 *
 *          <p>For more information about server access logging, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/ServerLogs.html">Server Access Logging</a>. </p>
 *
 *          <p>For more information about creating a bucket, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>. For more
 *          information about returning the logging status of a bucket, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLogging.html">GetBucketLogging</a>.</p>
 *
 *          <p>The following operations are related to <code>PutBucketLogging</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html">PutObject</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucket.html">DeleteBucket</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLogging.html">GetBucketLogging</a>
 *                </p>
 *             </li>
 *          </ul>
 */
export declare class PutBucketLoggingCommand extends $Command<PutBucketLoggingCommandInput, PutBucketLoggingCommandOutput, S3ClientResolvedConfig> {
    readonly input: PutBucketLoggingCommandInput;
    constructor(input: PutBucketLoggingCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: S3ClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PutBucketLoggingCommandInput, PutBucketLoggingCommandOutput>;
    private serialize;
    private deserialize;
}
