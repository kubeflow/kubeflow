import { DescribeSubscriptionFiltersCommandInput, DescribeSubscriptionFiltersCommandOutput } from "../commands/DescribeSubscriptionFiltersCommand";
import { CloudWatchLogsPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateDescribeSubscriptionFilters(config: CloudWatchLogsPaginationConfiguration, input: DescribeSubscriptionFiltersCommandInput, ...additionalArguments: any): Paginator<DescribeSubscriptionFiltersCommandOutput>;
