import { ListDominantLanguageDetectionJobsCommandInput, ListDominantLanguageDetectionJobsCommandOutput } from "../commands/ListDominantLanguageDetectionJobsCommand";
import { ComprehendPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListDominantLanguageDetectionJobs(config: ComprehendPaginationConfiguration, input: ListDominantLanguageDetectionJobsCommandInput, ...additionalArguments: any): Paginator<ListDominantLanguageDetectionJobsCommandOutput>;
