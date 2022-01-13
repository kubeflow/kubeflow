"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PutBucketAclCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restXml_1 = require("../protocols/Aws_restXml");
const middleware_bucket_endpoint_1 = require("@aws-sdk/middleware-bucket-endpoint");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Sets the permissions on an existing bucket using access control lists (ACL). For more
 *          information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/S3_ACLs_UsingACLs.html">Using ACLs</a>. To set
 *          the ACL of a bucket, you must have <code>WRITE_ACP</code> permission.</p>
 *
 *          <p>You can use one of the following two ways to set a bucket's permissions:</p>
 *          <ul>
 *             <li>
 *                <p>Specify the ACL in the request body</p>
 *             </li>
 *             <li>
 *                <p>Specify permissions using request headers</p>
 *             </li>
 *          </ul>
 *
 *          <note>
 *             <p>You cannot specify access permission using both the body and the request
 *             headers.</p>
 *          </note>
 *
 *          <p>Depending on your application needs, you may choose to set the ACL on a bucket using
 *          either the request body or the headers. For example, if you have an existing application
 *          that updates a bucket ACL using the request body, then you can continue to use that
 *          approach.</p>
 *
 *
 *          <p>
 *             <b>Access Permissions</b>
 *          </p>
 *          <p>You can set access permissions using one of the following methods:</p>
 *          <ul>
 *             <li>
 *                <p>Specify a canned ACL with the <code>x-amz-acl</code> request header. Amazon S3 supports
 *                a set of predefined ACLs, known as <i>canned ACLs</i>. Each canned ACL
 *                has a predefined set of grantees and permissions. Specify the canned ACL name as the
 *                value of <code>x-amz-acl</code>. If you use this header, you cannot use other access
 *                control-specific headers in your request. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#CannedACL">Canned ACL</a>.</p>
 *             </li>
 *             <li>
 *                <p>Specify access permissions explicitly with the <code>x-amz-grant-read</code>,
 *                   <code>x-amz-grant-read-acp</code>, <code>x-amz-grant-write-acp</code>, and
 *                   <code>x-amz-grant-full-control</code> headers. When using these headers, you
 *                specify explicit access permissions and grantees (AWS accounts or Amazon S3 groups) who
 *                will receive the permission. If you use these ACL-specific headers, you cannot use
 *                the <code>x-amz-acl</code> header to set a canned ACL. These parameters map to the
 *                set of permissions that Amazon S3 supports in an ACL. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html">Access Control List (ACL)
 *                Overview</a>.</p>
 *                <p>You specify each grantee as a type=value pair, where the type is one of the
 *                following:</p>
 *                <ul>
 *                   <li>
 *                      <p>
 *                         <code>id</code> – if the value specified is the canonical user ID of an AWS
 *                      account</p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <code>uri</code> – if you are granting permissions to a predefined
 *                      group</p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <code>emailAddress</code> – if the value specified is the email address of
 *                      an AWS account</p>
 *                      <note>
 *                         <p>Using email addresses to specify a grantee is only supported in the following AWS Regions: </p>
 *                         <ul>
 *                            <li>
 *                               <p>US East (N. Virginia)</p>
 *                            </li>
 *                            <li>
 *                               <p>US West (N. California)</p>
 *                            </li>
 *                            <li>
 *                               <p> US West (Oregon)</p>
 *                            </li>
 *                            <li>
 *                               <p> Asia Pacific (Singapore)</p>
 *                            </li>
 *                            <li>
 *                               <p>Asia Pacific (Sydney)</p>
 *                            </li>
 *                            <li>
 *                               <p>Asia Pacific (Tokyo)</p>
 *                            </li>
 *                            <li>
 *                               <p>Europe (Ireland)</p>
 *                            </li>
 *                            <li>
 *                               <p>South America (São Paulo)</p>
 *                            </li>
 *                         </ul>
 *                         <p>For a list of all the Amazon S3 supported Regions and endpoints, see <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region">Regions and Endpoints</a> in the AWS General Reference.</p>
 *                      </note>
 *                   </li>
 *                </ul>
 *                <p>For example, the following <code>x-amz-grant-write</code> header grants create,
 *                overwrite, and delete objects permission to LogDelivery group predefined by Amazon S3 and
 *                two AWS accounts identified by their email addresses.</p>
 *                <p>
 *                   <code>x-amz-grant-write: uri="http://acs.amazonaws.com/groups/s3/LogDelivery",
 *                   id="111122223333", id="555566667777" </code>
 *                </p>
 *
 *             </li>
 *          </ul>
 *          <p>You can use either a canned ACL or specify access permissions explicitly. You cannot do
 *          both.</p>
 *          <p>
 *             <b>Grantee Values</b>
 *          </p>
 *          <p>You can specify the person (grantee) to whom you're assigning access rights (using
 *          request elements) in the following ways:</p>
 *          <ul>
 *             <li>
 *                <p>By the person's ID:</p>
 *                <p>
 *                   <code><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 *                   xsi:type="CanonicalUser"><ID><>ID<></ID><DisplayName><>GranteesEmail<></DisplayName>
 *                   </Grantee></code>
 *                </p>
 *                <p>DisplayName is optional and ignored in the request</p>
 *             </li>
 *             <li>
 *                <p>By URI:</p>
 *                <p>
 *                   <code><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 *                   xsi:type="Group"><URI><>http://acs.amazonaws.com/groups/global/AuthenticatedUsers<></URI></Grantee></code>
 *                </p>
 *             </li>
 *             <li>
 *                <p>By Email address:</p>
 *                <p>
 *                   <code><Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 *                   xsi:type="AmazonCustomerByEmail"><EmailAddress><>Grantees@email.com<></EmailAddress>lt;/Grantee></code>
 *                </p>
 *                <p>The grantee is resolved to the CanonicalUser and, in a response to a GET Object
 *                acl request, appears as the CanonicalUser. </p>
 *                <note>
 *                   <p>Using email addresses to specify a grantee is only supported in the following AWS Regions: </p>
 *                   <ul>
 *                      <li>
 *                         <p>US East (N. Virginia)</p>
 *                      </li>
 *                      <li>
 *                         <p>US West (N. California)</p>
 *                      </li>
 *                      <li>
 *                         <p> US West (Oregon)</p>
 *                      </li>
 *                      <li>
 *                         <p> Asia Pacific (Singapore)</p>
 *                      </li>
 *                      <li>
 *                         <p>Asia Pacific (Sydney)</p>
 *                      </li>
 *                      <li>
 *                         <p>Asia Pacific (Tokyo)</p>
 *                      </li>
 *                      <li>
 *                         <p>Europe (Ireland)</p>
 *                      </li>
 *                      <li>
 *                         <p>South America (São Paulo)</p>
 *                      </li>
 *                   </ul>
 *                   <p>For a list of all the Amazon S3 supported Regions and endpoints, see <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region">Regions and Endpoints</a> in the AWS General Reference.</p>
 *                </note>
 *             </li>
 *          </ul>
 *
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
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObjectAcl.html">GetObjectAcl</a>
 *                </p>
 *             </li>
 *          </ul>
 */
class PutBucketAclCommand extends smithy_client_1.Command {
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
        const commandName = "PutBucketAclCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.PutBucketAclRequest.filterSensitiveLog,
            outputFilterSensitiveLog: (output) => output,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restXml_1.serializeAws_restXmlPutBucketAclCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restXml_1.deserializeAws_restXmlPutBucketAclCommand(output, context);
    }
}
exports.PutBucketAclCommand = PutBucketAclCommand;
//# sourceMappingURL=PutBucketAclCommand.js.map