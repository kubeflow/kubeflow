import { ListSpeechSynthesisTasksCommandInput, ListSpeechSynthesisTasksCommandOutput } from "../commands/ListSpeechSynthesisTasksCommand";
import { PollyPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListSpeechSynthesisTasks(config: PollyPaginationConfiguration, input: ListSpeechSynthesisTasksCommandInput, ...additionalArguments: any): Paginator<ListSpeechSynthesisTasksCommandOutput>;
