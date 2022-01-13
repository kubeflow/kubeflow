import { Rekognition } from "../Rekognition";
import { RekognitionClient } from "../RekognitionClient";
import { PaginationConfiguration } from "@aws-sdk/types";

export interface RekognitionPaginationConfiguration extends PaginationConfiguration {
  client: Rekognition | RekognitionClient;
}
