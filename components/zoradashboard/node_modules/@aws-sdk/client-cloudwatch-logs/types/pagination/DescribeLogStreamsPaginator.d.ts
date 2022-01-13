import { DescribeLogStreamsCommandInput, DescribeLogStreamsCommandOutput } from "../commands/DescribeLogStreamsCommand";
import { CloudWatchLogsPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateDescribeLogStreams(config: CloudWatchLogsPaginationConfiguration, input: DescribeLogStreamsCommandInput, ...additionalArguments: any): Paginator<DescribeLogStreamsCommandOutput>;
