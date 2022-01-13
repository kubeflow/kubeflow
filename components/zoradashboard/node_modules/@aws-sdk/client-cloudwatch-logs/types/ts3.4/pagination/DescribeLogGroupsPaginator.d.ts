import { DescribeLogGroupsCommandInput, DescribeLogGroupsCommandOutput } from "../commands/DescribeLogGroupsCommand";
import { CloudWatchLogsPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateDescribeLogGroups(config: CloudWatchLogsPaginationConfiguration, input: DescribeLogGroupsCommandInput, ...additionalArguments: any): Paginator<DescribeLogGroupsCommandOutput>;
