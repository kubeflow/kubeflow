import { CloudWatchLogs } from "../CloudWatchLogs";
import { CloudWatchLogsClient } from "../CloudWatchLogsClient";
import { PaginationConfiguration } from "@aws-sdk/types";
export interface CloudWatchLogsPaginationConfiguration extends PaginationConfiguration {
    client: CloudWatchLogs | CloudWatchLogsClient;
}
