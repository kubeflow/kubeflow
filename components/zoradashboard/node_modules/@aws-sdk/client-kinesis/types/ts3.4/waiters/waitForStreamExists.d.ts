import { KinesisClient } from "../KinesisClient";
import { DescribeStreamCommandInput } from "../commands/DescribeStreamCommand";
import { WaiterConfiguration, WaiterResult } from "@aws-sdk/util-waiter";
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeStreamCommand for polling.
 */
export declare const waitForStreamExists: (params: WaiterConfiguration<KinesisClient>, input: DescribeStreamCommandInput) => Promise<WaiterResult>;
