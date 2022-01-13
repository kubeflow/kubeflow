import { ListDocumentClassificationJobsCommandInput, ListDocumentClassificationJobsCommandOutput } from "../commands/ListDocumentClassificationJobsCommand";
import { ComprehendPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListDocumentClassificationJobs(config: ComprehendPaginationConfiguration, input: ListDocumentClassificationJobsCommandInput, ...additionalArguments: any): Paginator<ListDocumentClassificationJobsCommandOutput>;
