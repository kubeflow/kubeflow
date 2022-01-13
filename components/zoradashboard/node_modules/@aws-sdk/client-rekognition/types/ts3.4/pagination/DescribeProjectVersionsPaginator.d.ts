import { DescribeProjectVersionsCommandInput, DescribeProjectVersionsCommandOutput } from "../commands/DescribeProjectVersionsCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateDescribeProjectVersions(config: RekognitionPaginationConfiguration, input: DescribeProjectVersionsCommandInput, ...additionalArguments: any): Paginator<DescribeProjectVersionsCommandOutput>;
