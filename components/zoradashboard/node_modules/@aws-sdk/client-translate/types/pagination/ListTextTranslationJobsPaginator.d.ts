import { ListTextTranslationJobsCommandInput, ListTextTranslationJobsCommandOutput } from "../commands/ListTextTranslationJobsCommand";
import { TranslatePaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListTextTranslationJobs(config: TranslatePaginationConfiguration, input: ListTextTranslationJobsCommandInput, ...additionalArguments: any): Paginator<ListTextTranslationJobsCommandOutput>;
