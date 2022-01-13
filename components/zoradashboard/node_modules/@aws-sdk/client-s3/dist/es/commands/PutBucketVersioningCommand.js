import { __extends } from "tslib";
import { PutBucketVersioningRequest } from "../models/models_0";
import { deserializeAws_restXmlPutBucketVersioningCommand, serializeAws_restXmlPutBucketVersioningCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Sets the versioning state of an existing bucket. To set the versioning state, you must
 *          be the bucket owner.</p>
 *          <p>You can set the versioning state with one of the following values:</p>
 *
 *          <p>
 *             <b>Enabled</b>—Enables versioning for the objects in the
 *          bucket. All objects added to the bucket receive a unique version ID.</p>
 *
 *          <p>
 *             <b>Suspended</b>—Disables versioning for the objects in the
 *          bucket. All objects added to the bucket receive the version ID null.</p>
 *
 *          <p>If the versioning state has never been set on a bucket, it has no versioning state; a
 *             <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketVersioning.html">GetBucketVersioning</a> request does not return a versioning state value.</p>
 *
 *          <p>If the bucket owner enables MFA Delete in the bucket versioning configuration, the
 *          bucket owner must include the <code>x-amz-mfa request</code> header and the
 *             <code>Status</code> and the <code>MfaDelete</code> request elements in a request to set
 *          the versioning state of the bucket.</p>
 *
 *          <important>
 *             <p>If you have an object expiration lifecycle policy in your non-versioned bucket and
 *             you want to maintain the same permanent delete behavior when you enable versioning, you
 *             must add a noncurrent expiration policy. The noncurrent expiration lifecycle policy will
 *             manage the deletes of the noncurrent object versions in the version-enabled bucket. (A
 *             version-enabled bucket maintains one current and zero or more noncurrent object
 *             versions.) For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html#lifecycle-and-other-bucket-config">Lifecycle and Versioning</a>.</p>
 *          </important>
 *
 *          <p class="title">
 *             <b>Related Resources</b>
 *          </p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucket.html">DeleteBucket</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketVersioning.html">GetBucketVersioning</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var PutBucketVersioningCommand = /** @class */ (function (_super) {
    __extends(PutBucketVersioningCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutBucketVersioningCommand(input) {
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
    PutBucketVersioningCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "PutBucketVersioningCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutBucketVersioningRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutBucketVersioningCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlPutBucketVersioningCommand(input, context);
    };
    PutBucketVersioningCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlPutBucketVersioningCommand(output, context);
    };
    return PutBucketVersioningCommand;
}($Command));
export { PutBucketVersioningCommand };
//# sourceMappingURL=PutBucketVersioningCommand.js.map