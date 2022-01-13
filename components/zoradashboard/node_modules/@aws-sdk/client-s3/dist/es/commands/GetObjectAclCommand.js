import { __extends } from "tslib";
import { GetObjectAclOutput, GetObjectAclRequest } from "../models/models_0";
import { deserializeAws_restXmlGetObjectAclCommand, serializeAws_restXmlGetObjectAclCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the access control list (ACL) of an object. To use this operation, you must have
 *             <code>READ_ACP</code> access to the object.</p>
 *          <p>This action is not supported by Amazon S3 on Outposts.</p>
 *             <p>
 *             <b>Versioning</b>
 *          </p>
 *          <p>By default, GET returns ACL information about the current version of an object. To
 *          return ACL information about a different version, use the versionId subresource.</p>
 *
 *          <p>The following operations are related to <code>GetObjectAcl</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObject.html">DeleteObject</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html">PutObject</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetObjectAclCommand = /** @class */ (function (_super) {
    __extends(GetObjectAclCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetObjectAclCommand(input) {
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
    GetObjectAclCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetObjectAclCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetObjectAclRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetObjectAclOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetObjectAclCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetObjectAclCommand(input, context);
    };
    GetObjectAclCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetObjectAclCommand(output, context);
    };
    return GetObjectAclCommand;
}($Command));
export { GetObjectAclCommand };
//# sourceMappingURL=GetObjectAclCommand.js.map