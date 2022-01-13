import { RekognitionClient } from "../RekognitionClient";
import { DescribeProjectVersionsCommandInput } from "../commands/DescribeProjectVersionsCommand";
import { WaiterConfiguration, WaiterResult } from "@aws-sdk/util-waiter";
/**
 * Wait until the ProjectVersion is running.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeProjectVersionsCommand for polling.
 */
export declare const waitForProjectVersionRunning: (params: WaiterConfiguration<RekognitionClient>, input: DescribeProjectVersionsCommandInput) => Promise<WaiterResult>;
