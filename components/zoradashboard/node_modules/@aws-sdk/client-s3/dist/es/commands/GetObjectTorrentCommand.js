import { __extends } from "tslib";
import { GetObjectTorrentOutput, GetObjectTorrentRequest } from "../models/models_0";
import { deserializeAws_restXmlGetObjectTorrentCommand, serializeAws_restXmlGetObjectTorrentCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns torrent files from a bucket. BitTorrent can save you bandwidth when you're
 *          distributing large files. For more information about BitTorrent, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/S3Torrent.html">Using BitTorrent with Amazon S3</a>.</p>
 *          <note>
 *             <p>You can get torrent only for objects that are less than 5 GB in size, and that are
 *             not encrypted using server-side encryption with a customer-provided encryption
 *             key.</p>
 *          </note>
 *          <p>To use GET, you must have READ access to the object.</p>
 *          <p>This action is not supported by Amazon S3 on Outposts.</p>
 *          <p>The following operation is related to <code>GetObjectTorrent</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html">GetObject</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetObjectTorrentCommand = /** @class */ (function (_super) {
    __extends(GetObjectTorrentCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetObjectTorrentCommand(input) {
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
    GetObjectTorrentCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetObjectTorrentCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetObjectTorrentRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetObjectTorrentOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetObjectTorrentCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetObjectTorrentCommand(input, context);
    };
    GetObjectTorrentCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetObjectTorrentCommand(output, context);
    };
    return GetObjectTorrentCommand;
}($Command));
export { GetObjectTorrentCommand };
//# sourceMappingURL=GetObjectTorrentCommand.js.map