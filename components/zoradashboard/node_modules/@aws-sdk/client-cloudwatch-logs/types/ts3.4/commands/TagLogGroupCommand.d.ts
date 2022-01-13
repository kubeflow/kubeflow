import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { TagLogGroupRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type TagLogGroupCommandInput = TagLogGroupRequest;
export declare type TagLogGroupCommandOutput = __MetadataBearer;
/**
 * <p>Adds or updates the specified tags for the specified log group.</p>
 *          <p>To list the tags for a log group, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_ListTagsLogGroup.html">ListTagsLogGroup</a>.
 *       To remove tags, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_UntagLogGroup.html">UntagLogGroup</a>.</p>
 *          <p>For more information about tags, see <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#log-group-tagging">Tag Log Groups in Amazon CloudWatch Logs</a>
 *       in the <i>Amazon CloudWatch Logs User Guide</i>.</p>
 */
export declare class TagLogGroupCommand extends $Command<TagLogGroupCommandInput, TagLogGroupCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: TagLogGroupCommandInput;
    constructor(input: TagLogGroupCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<TagLogGroupCommandInput, TagLogGroupCommandOutput>;
    private serialize;
    private deserialize;
}
