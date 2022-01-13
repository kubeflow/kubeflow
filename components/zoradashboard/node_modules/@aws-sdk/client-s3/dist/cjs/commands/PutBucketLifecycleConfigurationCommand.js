"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PutBucketLifecycleConfigurationCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restXml_1 = require("../protocols/Aws_restXml");
const middleware_apply_body_checksum_1 = require("@aws-sdk/middleware-apply-body-checksum");
const middleware_bucket_endpoint_1 = require("@aws-sdk/middleware-bucket-endpoint");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Creates a new lifecycle configuration for the bucket or replaces an existing lifecycle
 *          configuration. For information about lifecycle configuration, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
 *             Resources</a>.</p>
 *
 *          <note>
 *             <p>Bucket lifecycle configuration now supports specifying a lifecycle rule using an
 *             object key name prefix, one or more object tags, or a combination of both. Accordingly,
 *             this section describes the latest API. The previous version of the API supported
 *             filtering based only on an object key name prefix, which is supported for backward
 *             compatibility. For the related API description, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLifecycle.html">PutBucketLifecycle</a>.</p>
 *          </note>
 *
 *
 *
 *          <p>
 *             <b>Rules</b>
 *          </p>
 *          <p>You specify the lifecycle configuration in your request body. The lifecycle
 *          configuration is specified as XML consisting of one or more rules. Each rule consists of
 *          the following:</p>
 *
 *          <ul>
 *             <li>
 *                <p>Filter identifying a subset of objects to which the rule applies. The filter can
 *                be based on a key name prefix, object tags, or a combination of both.</p>
 *             </li>
 *             <li>
 *                <p>Status whether the rule is in effect.</p>
 *             </li>
 *             <li>
 *                <p>One or more lifecycle transition and expiration actions that you want Amazon S3 to
 *                perform on the objects identified by the filter. If the state of your bucket is
 *                versioning-enabled or versioning-suspended, you can have many versions of the same
 *                object (one current version and zero or more noncurrent versions). Amazon S3 provides
 *                predefined actions that you can specify for current and noncurrent object
 *                versions.</p>
 *             </li>
 *          </ul>
 *
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html">Object
 *             Lifecycle Management</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/intro-lifecycle-rules.html">Lifecycle Configuration Elements</a>.</p>
 *
 *
 *          <p>
 *             <b>Permissions</b>
 *          </p>
 *
 *
 *          <p>By default, all Amazon S3 resources are private, including buckets, objects, and related
 *          subresources (for example, lifecycle configuration and website configuration). Only the
 *          resource owner (that is, the AWS account that created it) can access the resource. The
 *          resource owner can optionally grant access permissions to others by writing an access
 *          policy. For this operation, a user must get the s3:PutLifecycleConfiguration
 *          permission.</p>
 *
 *          <p>You can also explicitly deny permissions. Explicit deny also supersedes any other
 *          permissions. If you want to block users or accounts from removing or deleting objects from
 *          your bucket, you must deny them permissions for the following actions:</p>
 *
 *          <ul>
 *             <li>
 *                <p>s3:DeleteObject</p>
 *             </li>
 *             <li>
 *                <p>s3:DeleteObjectVersion</p>
 *             </li>
 *             <li>
 *                <p>s3:PutLifecycleConfiguration</p>
 *             </li>
 *          </ul>
 *
 *
 *          <p>For more information about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
 *             Resources</a>.</p>
 *
 *          <p>The following are related to <code>PutBucketLifecycleConfiguration</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/lifecycle-configuration-examples.html">Examples of
 *                   Lifecycle Configuration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLifecycleConfiguration.html">GetBucketLifecycleConfiguration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketLifecycle.html">DeleteBucketLifecycle</a>
 *                </p>
 *             </li>
 *          </ul>
 */
class PutBucketLifecycleConfigurationCommand extends smithy_client_1.Command {
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
        const commandName = "PutBucketLifecycleConfigurationCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.PutBucketLifecycleConfigurationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: (output) => output,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restXml_1.serializeAws_restXmlPutBucketLifecycleConfigurationCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restXml_1.deserializeAws_restXmlPutBucketLifecycleConfigurationCommand(output, context);
    }
}
exports.PutBucketLifecycleConfigurationCommand = PutBucketLifecycleConfigurationCommand;
//# sourceMappingURL=PutBucketLifecycleConfigurationCommand.js.map