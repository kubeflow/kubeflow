import { ListSentimentDetectionJobsCommandInput, ListSentimentDetectionJobsCommandOutput } from "../commands/ListSentimentDetectionJobsCommand";
import { ComprehendPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListSentimentDetectionJobs(config: ComprehendPaginationConfiguration, input: ListSentimentDetectionJobsCommandInput, ...additionalArguments: any): Paginator<ListSentimentDetectionJobsCommandOutput>;
