"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PutBucketReplicationCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restXml_1 = require("../protocols/Aws_restXml");
const middleware_apply_body_checksum_1 = require("@aws-sdk/middleware-apply-body-checksum");
const middleware_bucket_endpoint_1 = require("@aws-sdk/middleware-bucket-endpoint");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p> Creates a replication configuration or replaces an existing one. For more information,
 *          see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/replication.html">Replication</a> in the <i>Amazon S3 Developer Guide</i>. </p>
 *          <note>
 *             <p>To perform this operation, the user or role performing the operation must have the
 *                <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html">iam:PassRole</a> permission.</p>
 *          </note>
 *          <p>Specify the replication configuration in the request body. In the replication
 *          configuration, you provide the name of the destination bucket or buckets where you want
 *          Amazon S3 to replicate objects, the IAM role that Amazon S3 can assume to replicate objects on your
 *          behalf, and other relevant information.</p>
 *
 *
 *          <p>A replication configuration must include at least one rule, and can contain a maximum of
 *          1,000. Each rule identifies a subset of objects to replicate by filtering the objects in
 *          the source bucket. To choose additional subsets of objects to replicate, add a rule for
 *          each subset.</p>
 *
 *          <p>To specify a subset of the objects in the source bucket to apply a replication rule to,
 *          add the Filter element as a child of the Rule element. You can filter objects based on an
 *          object key prefix, one or more object tags, or both. When you add the Filter element in the
 *          configuration, you must also add the following elements:
 *             <code>DeleteMarkerReplication</code>, <code>Status</code>, and
 *          <code>Priority</code>.</p>
 *          <note>
 *             <p>If you are using an earlier version of the replication configuration, Amazon S3 handles
 *             replication of delete markers differently. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/replication-add-config.html#replication-backward-compat-considerations">Backward Compatibility</a>.</p>
 *          </note>
 *          <p>For information about enabling versioning on a bucket, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html">Using Versioning</a>.</p>
 *
 *          <p>By default, a resource owner, in this case the AWS account that created the bucket, can
 *          perform this operation. The resource owner can also grant others permissions to perform the
 *          operation. For more information about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html">Specifying Permissions in a Policy</a>
 *          and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your
 *             Amazon S3 Resources</a>.</p>
 *
 *          <p>
 *             <b>Handling Replication of Encrypted Objects</b>
 *          </p>
 *          <p>By default, Amazon S3 doesn't replicate objects that are stored at rest using server-side
 *          encryption with CMKs stored in AWS KMS. To replicate AWS KMS-encrypted objects, add the
 *          following: <code>SourceSelectionCriteria</code>, <code>SseKmsEncryptedObjects</code>,
 *             <code>Status</code>, <code>EncryptionConfiguration</code>, and
 *             <code>ReplicaKmsKeyID</code>. For information about replication configuration, see
 *             <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/replication-config-for-kms-objects.html">Replicating Objects
 *             Created with SSE Using CMKs stored in AWS KMS</a>.</p>
 *
 *          <p>For information on <code>PutBucketReplication</code> errors, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/ErrorResponses.html#ReplicationErrorCodeList">List of
 *             replication-related error codes</a>
 *          </p>
 *
 *
 *          <p>The following operations are related to <code>PutBucketReplication</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketReplication.html">GetBucketReplication</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketReplication.html">DeleteBucketReplication</a>
 *                </p>
 *             </li>
 *          </ul>
 */
class PutBucketReplicationCommand extends smithy_client_1.Command {
    // Start section: command_properties
    // End section: command_properties
    constructor(input) {
        // Start section: command_constructor
        super();
        this.input = input;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use(middleware_serde_1.getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(middleware_bucket_endpoint_1.getBucketEndpointPlugin(configuration));
        this.middlewareStack.use(middleware_apply_body_checksum_1.getApplyMd5BodyChecksumPlugin(configuration));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "S3Client";
        const commandName = "PutBucketReplicationCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.PutBucketReplicationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: (output) => output,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restXml_1.serializeAws_restXmlPutBucketReplicationCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restXml_1.deserializeAws_restXmlPutBucketReplicationCommand(output, context);
    }
}
exports.PutBucketReplicationCommand = PutBucketReplicationCommand;
//# sourceMappingURL=PutBucketReplicationCommand.js.map