"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteObjectCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restXml_1 = require("../protocols/Aws_restXml");
const middleware_bucket_endpoint_1 = require("@aws-sdk/middleware-bucket-endpoint");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Removes the null version (if there is one) of an object and inserts a delete marker,
 *          which becomes the latest version of the object. If there isn't a null version, Amazon S3 does
 *          not remove any objects.</p>
 *
 *          <p>To remove a specific version, you must be the bucket owner and you must use the version
 *          Id subresource. Using this subresource permanently deletes the version. If the object
 *          deleted is a delete marker, Amazon S3 sets the response header,
 *          <code>x-amz-delete-marker</code>, to true. </p>
 *
 *          <p>If the object you want to delete is in a bucket where the bucket versioning
 *          configuration is MFA Delete enabled, you must include the <code>x-amz-mfa</code> request
 *          header in the DELETE <code>versionId</code> request. Requests that include
 *             <code>x-amz-mfa</code> must use HTTPS. </p>
 *
 *          <p> For more information about MFA Delete, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMFADelete.html">Using MFA Delete</a>. To see sample requests that use versioning, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectDELETE.html#ExampleVersionObjectDelete">Sample Request</a>. </p>
 *
 *          <p>You can delete objects by explicitly calling the DELETE Object API or configure its
 *          lifecycle (<a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLifecycle.html">PutBucketLifecycle</a>) to
 *          enable Amazon S3 to remove them for you. If you want to block users or accounts from removing or
 *          deleting objects from your bucket, you must deny them the <code>s3:DeleteObject</code>,
 *             <code>s3:DeleteObjectVersion</code>, and <code>s3:PutLifeCycleConfiguration</code>
 *          actions. </p>
 *
 *          <p>The following operation is related to <code>DeleteObject</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html">PutObject</a>
 *                </p>
 *             </li>
 *          </ul>
 */
class DeleteObjectCommand extends smithy_client_1.Command {
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
        const commandName = "DeleteObjectCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DeleteObjectRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DeleteObjectOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restXml_1.serializeAws_restXmlDeleteObjectCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restXml_1.deserializeAws_restXmlDeleteObjectCommand(output, context);
    }
}
exports.DeleteObjectCommand = DeleteObjectCommand;
//# sourceMappingURL=DeleteObjectCommand.js.map