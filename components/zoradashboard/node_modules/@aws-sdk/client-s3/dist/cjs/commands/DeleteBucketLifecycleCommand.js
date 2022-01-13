"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBucketLifecycleCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restXml_1 = require("../protocols/Aws_restXml");
const middleware_bucket_endpoint_1 = require("@aws-sdk/middleware-bucket-endpoint");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Deletes the lifecycle configuration from the specified bucket. Amazon S3 removes all the
 *          lifecycle configuration rules in the lifecycle subresource associated with the bucket. Your
 *          objects never expire, and Amazon S3 no longer automatically deletes any objects on the basis of
 *          rules contained in the deleted lifecycle configuration.</p>
 *          <p>To use this operation, you must have permission to perform the
 *             <code>s3:PutLifecycleConfiguration</code> action. By default, the bucket owner has this
 *          permission and the bucket owner can grant this permission to others.</p>
 *
 *          <p>There is usually some time lag before lifecycle configuration deletion is fully
 *          propagated to all the Amazon S3 systems.</p>
 *
 *          <p>For more information about the object expiration, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/intro-lifecycle-rules.html#intro-lifecycle-rules-actions">Elements to
 *             Describe Lifecycle Actions</a>.</p>
 *          <p>Related actions include:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLifecycleConfiguration.html">PutBucketLifecycleConfiguration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLifecycleConfiguration.html">GetBucketLifecycleConfiguration</a>
 *                </p>
 *             </li>
 *          </ul>
 */
class DeleteBucketLifecycleCommand extends smithy_client_1.Command {
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
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "S3Client";
        const commandName = "DeleteBucketLifecycleCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DeleteBucketLifecycleRequest.filterSensitiveLog,
            outputFilterSensitiveLog: (output) => output,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restXml_1.serializeAws_restXmlDeleteBucketLifecycleCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restXml_1.deserializeAws_restXmlDeleteBucketLifecycleCommand(output, context);
    }
}
exports.DeleteBucketLifecycleCommand = DeleteBucketLifecycleCommand;
//# sourceMappingURL=DeleteBucketLifecycleCommand.js.map