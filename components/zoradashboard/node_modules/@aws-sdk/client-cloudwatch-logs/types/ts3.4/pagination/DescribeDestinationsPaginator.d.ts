import { DescribeDestinationsCommandInput, DescribeDestinationsCommandOutput } from "../commands/DescribeDestinationsCommand";
import { CloudWatchLogsPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateDescribeDestinations(config: CloudWatchLogsPaginationConfiguration, input: DescribeDestinationsCommandInput, ...additionalArguments: any): Paginator<DescribeDestinationsCommandOutput>;
