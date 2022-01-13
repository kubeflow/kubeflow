import { MetadataBearer } from "@aws-sdk/types";
import { SmithyException } from "./exception";
export declare type SdkError = Error & SmithyException & MetadataBearer;
