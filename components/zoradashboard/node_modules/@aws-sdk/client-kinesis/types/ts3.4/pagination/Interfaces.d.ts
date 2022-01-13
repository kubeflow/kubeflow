import { Kinesis } from "../Kinesis";
import { KinesisClient } from "../KinesisClient";
import { PaginationConfiguration } from "@aws-sdk/types";
export interface KinesisPaginationConfiguration extends PaginationConfiguration {
    client: Kinesis | KinesisClient;
}
