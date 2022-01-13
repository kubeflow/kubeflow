import { ListStreamConsumersCommandInput, ListStreamConsumersCommandOutput } from "../commands/ListStreamConsumersCommand";
import { KinesisPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListStreamConsumers(config: KinesisPaginationConfiguration, input: ListStreamConsumersCommandInput, ...additionalArguments: any): Paginator<ListStreamConsumersCommandOutput>;
