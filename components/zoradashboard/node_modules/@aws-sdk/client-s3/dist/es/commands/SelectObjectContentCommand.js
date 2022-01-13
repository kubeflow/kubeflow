import { __extends } from "tslib";
import { SelectObjectContentOutput, SelectObjectContentRequest } from "../models/models_1";
import { deserializeAws_restXmlSelectObjectContentCommand, serializeAws_restXmlSelectObjectContentCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { getSsecPlugin } from "@aws-sdk/middleware-ssec";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>This operation filters the contents of an Amazon S3 object based on a simple structured query
 *          language (SQL) statement. In the request, along with the SQL expression, you must also
 *          specify a data serialization format (JSON, CSV, or Apache Parquet) of the object. Amazon S3 uses
 *          this format to parse object data into records, and returns only records that match the
 *          specified SQL expression. You must also specify the data serialization format for the
 *          response.</p>
 *          <p>This action is not supported by Amazon S3 on Outposts.</p>
 *          <p>For more information about Amazon S3 Select,
 *          see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/selecting-content-from-objects.html">Selecting Content from
 *             Objects</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
 *          <p>For more information about using SQL with Amazon S3 Select, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-glacier-select-sql-reference.html"> SQL Reference for Amazon S3 Select
 *             and S3 Glacier Select</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
 *          <p></p>
 *          <p>
 *             <b>Permissions</b>
 *          </p>
 *          <p>You must have <code>s3:GetObject</code> permission for this operation. Amazon S3 Select does
 *          not support anonymous access. For more information about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html">Specifying Permissions in a Policy</a>
 *          in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
 *          <p></p>
 *          <p>
 *             <i>Object Data Formats</i>
 *          </p>
 *          <p>You can use Amazon S3 Select to query objects that have the following format
 *          properties:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <i>CSV, JSON, and Parquet</i> - Objects must be in CSV, JSON, or
 *                Parquet format.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <i>UTF-8</i> - UTF-8 is the only encoding type Amazon S3 Select
 *                supports.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <i>GZIP or BZIP2</i> - CSV and JSON files can be compressed using
 *                GZIP or BZIP2. GZIP and BZIP2 are the only compression formats that Amazon S3 Select
 *                supports for CSV and JSON files. Amazon S3 Select supports columnar compression for
 *                Parquet using GZIP or Snappy. Amazon S3 Select does not support whole-object compression
 *                for Parquet objects.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <i>Server-side encryption</i> - Amazon S3 Select supports querying
 *                objects that are protected with server-side encryption.</p>
 *                <p>For objects that are encrypted with customer-provided encryption keys (SSE-C), you
 *                must use HTTPS, and you must use the headers that are documented in the <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>. For more information about SSE-C, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/ServerSideEncryptionCustomerKeys.html">Server-Side Encryption
 *                   (Using Customer-Provided Encryption Keys)</a> in the
 *                   <i>Amazon Simple Storage Service Developer Guide</i>.</p>
 *                <p>For objects that are encrypted with Amazon S3 managed encryption keys (SSE-S3) and
 *                customer master keys (CMKs) stored in AWS Key Management Service (SSE-KMS),
 *                server-side encryption is handled transparently, so you don't need to specify
 *                anything. For more information about server-side encryption, including SSE-S3 and
 *                SSE-KMS, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/serv-side-encryption.html">Protecting Data Using
 *                   Server-Side Encryption</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
 *             </li>
 *          </ul>
 *
 *          <p>
 *             <b>Working with the Response Body</b>
 *          </p>
 *          <p>Given the response size is unknown, Amazon S3 Select streams the response as a series of
 *          messages and includes a <code>Transfer-Encoding</code> header with <code>chunked</code> as
 *          its value in the response. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/RESTSelectObjectAppendix.html">Appendix: SelectObjectContent
 *             Response</a>
 *          .</p>
 *
 *          <p></p>
 *          <p>
 *             <b>GetObject Support</b>
 *          </p>
 *          <p>The <code>SelectObjectContent</code> operation does not support the following
 *             <code>GetObject</code> functionality. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>.</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <code>Range</code>: Although you can specify a scan range for an Amazon S3 Select request
 *                (see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_SelectObjectContent.html#AmazonS3-SelectObjectContent-request-ScanRange">SelectObjectContentRequest - ScanRange</a> in the request parameters),
 *                you cannot specify the range of bytes of an object to return. </p>
 *             </li>
 *             <li>
 *                <p>GLACIER, DEEP_ARCHIVE and REDUCED_REDUNDANCY storage classes: You cannot specify
 *                the GLACIER, DEEP_ARCHIVE, or <code>REDUCED_REDUNDANCY</code> storage classes. For
 *                more information, about storage classes see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html#storage-class-intro">Storage Classes</a>
 *                in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
 *             </li>
 *          </ul>
 *          <p></p>
 *          <p>
 *             <b>Special Errors</b>
 *          </p>
 *
 *          <p>For a list of special errors for this operation, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/ErrorResponses.html#SelectObjectContentErrorCodeList">List of
 *             SELECT Object Content Error Codes</a>
 *          </p>
 *          <p class="title">
 *             <b>Related Resources</b>
 *          </p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLifecycleConfiguration.html">GetBucketLifecycleConfiguration</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLifecycleConfiguration.html">PutBucketLifecycleConfiguration</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var SelectObjectContentCommand = /** @class */ (function (_super) {
    __extends(SelectObjectContentCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function SelectObjectContentCommand(input) {
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
    SelectObjectContentCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getSsecPlugin(configuration));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "SelectObjectContentCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SelectObjectContentRequest.filterSensitiveLog,
            outputFilterSensitiveLog: SelectObjectContentOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SelectObjectContentCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlSelectObjectContentCommand(input, context);
    };
    SelectObjectContentCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlSelectObjectContentCommand(output, context);
    };
    return SelectObjectContentCommand;
}($Command));
export { SelectObjectContentCommand };
//# sourceMappingURL=SelectObjectContentCommand.js.map