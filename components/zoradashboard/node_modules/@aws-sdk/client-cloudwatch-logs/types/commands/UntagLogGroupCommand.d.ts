import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { UntagLogGroupRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type UntagLogGroupCommandInput = UntagLogGroupRequest;
export declare type UntagLogGroupCommandOutput = __MetadataBearer;
/**
 * <p>Removes the specified tags from the specified log group.</p>
 *          <p>To list the tags for a log group, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_ListTagsLogGroup.html">ListTagsLogGroup</a>.
 *       To add tags, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_TagLogGroup.html">TagLogGroup</a>.</p>
 */
export declare class UntagLogGroupCommand extends $Command<UntagLogGroupCommandInput, UntagLogGroupCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: UntagLogGroupCommandInput;
    constructor(input: UntagLogGroupCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<UntagLogGroupCommandInput, UntagLogGroupCommandOutput>;
    private serialize;
    private deserialize;
}
