import { ListKeyPhrasesDetectionJobsCommandInput, ListKeyPhrasesDetectionJobsCommandOutput } from "../commands/ListKeyPhrasesDetectionJobsCommand";
import { ComprehendPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListKeyPhrasesDetectionJobs(config: ComprehendPaginationConfiguration, input: ListKeyPhrasesDetectionJobsCommandInput, ...additionalArguments: any): Paginator<ListKeyPhrasesDetectionJobsCommandOutput>;
