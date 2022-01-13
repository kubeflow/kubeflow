import { MetadataBearer } from "@aws-sdk/types";

import { SmithyException } from "./exception";

export type SdkError = Error & SmithyException & MetadataBearer;
