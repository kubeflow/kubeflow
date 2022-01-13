import { DescribeMetricFiltersCommandInput, DescribeMetricFiltersCommandOutput } from "../commands/DescribeMetricFiltersCommand";
import { CloudWatchLogsPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateDescribeMetricFilters(config: CloudWatchLogsPaginationConfiguration, input: DescribeMetricFiltersCommandInput, ...additionalArguments: any): Paginator<DescribeMetricFiltersCommandOutput>;
