import { S3Client } from "../S3Client";
import { HeadObjectCommandInput } from "../commands/HeadObjectCommand";
import { WaiterConfiguration, WaiterResult } from "@aws-sdk/util-waiter";
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to HeadObjectCommand for polling.
 */
export declare const waitForObjectExists: (params: WaiterConfiguration<S3Client>, input: HeadObjectCommandInput) => Promise<WaiterResult>;
