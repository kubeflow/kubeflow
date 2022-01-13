import { CloudWatchLogsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchLogsClient";
import { CreateExportTaskRequest, CreateExportTaskResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type CreateExportTaskCommandInput = CreateExportTaskRequest;
export declare type CreateExportTaskCommandOutput = CreateExportTaskResponse & __MetadataBearer;
/**
 * <p>Creates an export task, which allows you to efficiently export data from a
 *       log group to an Amazon S3 bucket. When you perform a <code>CreateExportTask</code>
 *       operation, you must use credentials that have permission to write to the S3 bucket
 *       that you specify as the destination.</p>
 *          <p>This is an asynchronous call. If all the required information is provided, this
 *       operation initiates an export task and responds with the ID of the task. After the task has started,
 *       you can use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_DescribeExportTasks.html">DescribeExportTasks</a> to get the status of the export task. Each account can
 *       only have one active (<code>RUNNING</code> or <code>PENDING</code>) export task at a time.
 *       To cancel an export task, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_CancelExportTask.html">CancelExportTask</a>.</p>
 *          <p>You can export logs from multiple log groups or multiple time ranges to the same S3
 *       bucket. To separate out log data for each export task, you can specify a prefix to be used as
 *       the Amazon S3 key prefix for all exported objects.</p>
 *          <p>Exporting to S3 buckets that are encrypted with AES-256 is supported. Exporting to S3 buckets
 *       encrypted with SSE-KMS is not supported. </p>
 */
export declare class CreateExportTaskCommand extends $Command<CreateExportTaskCommandInput, CreateExportTaskCommandOutput, CloudWatchLogsClientResolvedConfig> {
    readonly input: CreateExportTaskCommandInput;
    constructor(input: CreateExportTaskCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchLogsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateExportTaskCommandInput, CreateExportTaskCommandOutput>;
    private serialize;
    private deserialize;
}
