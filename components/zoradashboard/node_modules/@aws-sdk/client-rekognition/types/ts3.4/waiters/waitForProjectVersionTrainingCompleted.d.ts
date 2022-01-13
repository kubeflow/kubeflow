import { RekognitionClient } from "../RekognitionClient";
import { DescribeProjectVersionsCommandInput } from "../commands/DescribeProjectVersionsCommand";
import { WaiterConfiguration, WaiterResult } from "@aws-sdk/util-waiter";
/**
 * Wait until the ProjectVersion training completes.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeProjectVersionsCommand for polling.
 */
export declare const waitForProjectVersionTrainingCompleted: (params: WaiterConfiguration<RekognitionClient>, input: DescribeProjectVersionsCommandInput) => Promise<WaiterResult>;
