import { __extends } from "tslib";
import { CopyObjectOutput, CopyObjectRequest } from "../models/models_0";
import { deserializeAws_restXmlCopyObjectCommand, serializeAws_restXmlCopyObjectCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getThrow200ExceptionsPlugin } from "@aws-sdk/middleware-sdk-s3";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { getSsecPlugin } from "@aws-sdk/middleware-ssec";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates a copy of an object that is already stored in Amazon S3.</p>
 *          <note>
 *             <p>You can store individual objects of up to 5 TB in Amazon S3. You create a copy of your
 *             object up to 5 GB in size in a single atomic operation using this API. However, to copy
 *             an object greater than 5 GB, you must use the multipart upload Upload Part - Copy API.
 *             For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/CopyingObjctsUsingRESTMPUapi.html">Copy Object Using the REST Multipart Upload API</a>.</p>
 *          </note>
 *          <p>All copy requests must be authenticated. Additionally, you must have
 *             <i>read</i> access to the source object and <i>write</i>
 *          access to the destination bucket. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html">REST Authentication</a>. Both the Region
 *          that you want to copy the object from and the Region that you want to copy the object to
 *          must be enabled for your account.</p>
 *          <p>A copy request might return an error when Amazon S3 receives the copy request or while Amazon S3
 *          is copying the files. If the error occurs before the copy operation starts, you receive a
 *          standard Amazon S3 error. If the error occurs during the copy operation, the error response is
 *          embedded in the <code>200 OK</code> response. This means that a <code>200 OK</code>
 *          response can contain either a success or an error. Design your application to parse the
 *          contents of the response and handle it appropriately.</p>
 *          <p>If the copy is successful, you receive a response with information about the copied
 *          object.</p>
 *          <note>
 *             <p>If the request is an HTTP 1.1 request, the response is chunk encoded. If it were not,
 *             it would not contain the content-length, and you would need to read the entire
 *             body.</p>
 *          </note>
 *          <p>The copy request charge is based on the storage class and Region that you specify for
 *          the destination object. For pricing information, see <a href="https://aws.amazon.com/s3/pricing/">Amazon S3 pricing</a>.</p>
 *          <important>
 *             <p>Amazon S3 transfer acceleration does not support cross-Region copies. If you request a
 *             cross-Region copy using a transfer acceleration endpoint, you get a 400 <code>Bad
 *                Request</code> error. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html">Transfer Acceleration</a>.</p>
 *          </important>
 *          <p>
 *             <b>Metadata</b>
 *          </p>
 *          <p>When copying an object, you can preserve all metadata (default) or specify new metadata.
 *          However, the ACL is not preserved and is set to private for the user making the request. To
 *          override the default ACL setting, specify a new ACL when generating a copy request. For
 *          more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/S3_ACLs_UsingACLs.html">Using ACLs</a>. </p>
 *          <p>To specify whether you want the object metadata copied from the source object or
 *          replaced with metadata provided in the request, you can optionally add the
 *             <code>x-amz-metadata-directive</code> header. When you grant permissions, you can use
 *          the <code>s3:x-amz-metadata-directive</code> condition key to enforce certain metadata
 *          behavior when objects are uploaded. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/amazon-s3-policy-keys.html">Specifying Conditions in a
 *             Policy</a> in the <i>Amazon S3 Developer Guide</i>. For a complete list of
 *          Amazon S3-specific condition keys, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/list_amazons3.html">Actions, Resources, and Condition Keys for
 *             Amazon S3</a>.</p>
 *          <p>
 *             <b>
 *                <code>x-amz-copy-source-if</code> Headers</b>
 *          </p>
 *          <p>To only copy an object under certain conditions, such as whether the <code>Etag</code>
 *          matches or whether the object was modified before or after a specified date, use the
 *          following request parameters:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <code>x-amz-copy-source-if-match</code>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <code>x-amz-copy-source-if-none-match</code>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <code>x-amz-copy-source-if-unmodified-since</code>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <code>x-amz-copy-source-if-modified-since</code>
 *                </p>
 *             </li>
 *          </ul>
 *          <p> If both the <code>x-amz-copy-source-if-match</code> and
 *             <code>x-amz-copy-source-if-unmodified-since</code> headers are present in the request
 *          and evaluate as follows, Amazon S3 returns <code>200 OK</code> and copies the data:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <code>x-amz-copy-source-if-match</code> condition evaluates to true</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <code>x-amz-copy-source-if-unmodified-since</code> condition evaluates to
 *                false</p>
 *             </li>
 *          </ul>
 *
 *          <p>If both the <code>x-amz-copy-source-if-none-match</code> and
 *             <code>x-amz-copy-source-if-modified-since</code> headers are present in the request and
 *          evaluate as follows, Amazon S3 returns the <code>412 Precondition Failed</code> response
 *          code:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <code>x-amz-copy-source-if-none-match</code> condition evaluates to false</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <code>x-amz-copy-source-if-modified-since</code> condition evaluates to
 *                true</p>
 *             </li>
 *          </ul>
 *
 *          <note>
 *             <p>All headers with the <code>x-amz-</code> prefix, including
 *                <code>x-amz-copy-source</code>, must be signed.</p>
 *          </note>
 *          <p>
 *             <b>Server-side encryption</b>
 *          </p>
 *          <p>When you perform a CopyObject operation, you can optionally use the appropriate encryption-related headers to encrypt the object using server-side encryption with AWS managed encryption keys (SSE-S3 or SSE-KMS) or a customer-provided encryption key. With server-side encryption, Amazon S3 encrypts your data as it writes it to disks in its data centers and decrypts the data when you access it. For more information about server-side encryption, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/serv-side-encryption.html">Using
 *          Server-Side Encryption</a>.</p>
 *          <p>If a target object uses SSE-KMS, you can enable an S3 Bucket Key for the object. For more
 *          information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-key.html">Amazon S3 Bucket Keys</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
 *          <p>
 *             <b>Access Control List (ACL)-Specific Request
 *          Headers</b>
 *          </p>
 *          <p>When copying an object, you can optionally use headers to grant ACL-based permissions.
 *          By default, all objects are private. Only the owner has full access control. When adding a
 *          new object, you can grant permissions to individual AWS accounts or to predefined groups
 *          defined by Amazon S3. These permissions are then added to the ACL on the object. For more
 *          information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html">Access Control List (ACL) Overview</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-using-rest-api.html">Managing ACLs Using the REST
 *             API</a>. </p>
 *
 *          <p>
 *             <b>Storage Class Options</b>
 *          </p>
 *          <p>You can use the <code>CopyObject</code> operation to change the storage class of an
 *          object that is already stored in Amazon S3 using the <code>StorageClass</code> parameter. For
 *          more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html">Storage
 *             Classes</a> in the <i>Amazon S3 Service Developer Guide</i>.</p>
 *          <p>
 *             <b>Versioning</b>
 *          </p>
 *          <p>By default, <code>x-amz-copy-source</code> identifies the current version of an object
 *          to copy. If the current version is a delete marker, Amazon S3 behaves as if the object was
 *          deleted. To copy a different version, use the <code>versionId</code> subresource.</p>
 *          <p>If you enable versioning on the target bucket, Amazon S3 generates a unique version ID for
 *          the object being copied. This version ID is different from the version ID of the source
 *          object. Amazon S3 returns the version ID of the copied object in the
 *             <code>x-amz-version-id</code> response header in the response.</p>
 *          <p>If you do not enable versioning or suspend it on the target bucket, the version ID that
 *          Amazon S3 generates is always null.</p>
 *          <p>If the source object's storage class is GLACIER, you must restore a copy of this object
 *          before you can use it as a source object for the copy operation. For more information, see
 *             <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_RestoreObject.html">RestoreObject</a>.</p>
 *          <p>The following operations are related to <code>CopyObject</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html">PutObject</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>
 *                </p>
 *             </li>
 *          </ul>
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/CopyingObjectsExamples.html">Copying
 *             Objects</a>.</p>
 */
var CopyObjectCommand = /** @class */ (function (_super) {
    __extends(CopyObjectCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CopyObjectCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    CopyObjectCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getThrow200ExceptionsPlugin(configuration));
        this.middlewareStack.use(getSsecPlugin(configuration));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "CopyObjectCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CopyObjectRequest.filterSensitiveLog,
            outputFilterSensitiveLog: CopyObjectOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CopyObjectCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlCopyObjectCommand(input, context);
    };
    CopyObjectCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlCopyObjectCommand(output, context);
    };
    return CopyObjectCommand;
}($Command));
export { CopyObjectCommand };
//# sourceMappingURL=CopyObjectCommand.js.map