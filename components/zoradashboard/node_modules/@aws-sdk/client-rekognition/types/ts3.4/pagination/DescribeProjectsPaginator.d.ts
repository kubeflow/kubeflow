import { DescribeProjectsCommandInput, DescribeProjectsCommandOutput } from "../commands/DescribeProjectsCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateDescribeProjects(config: RekognitionPaginationConfiguration, input: DescribeProjectsCommandInput, ...additionalArguments: any): Paginator<DescribeProjectsCommandOutput>;
