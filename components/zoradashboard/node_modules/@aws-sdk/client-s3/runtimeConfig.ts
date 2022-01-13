import packageInfo from "./package.json";

import { NODE_REGION_CONFIG_FILE_OPTIONS, NODE_REGION_CONFIG_OPTIONS } from "@aws-sdk/config-resolver";
import { defaultProvider as credentialDefaultProvider } from "@aws-sdk/credential-provider-node";
import { eventStreamSerdeProvider } from "@aws-sdk/eventstream-serde-node";
import { Hash } from "@aws-sdk/hash-node";
import { fileStreamHasher as streamHasher } from "@aws-sdk/hash-stream-node";
import { NODE_USE_ARN_REGION_CONFIG_OPTIONS } from "@aws-sdk/middleware-bucket-endpoint";
import { NODE_MAX_ATTEMPT_CONFIG_OPTIONS } from "@aws-sdk/middleware-retry";
import { loadConfig as loadNodeConfig } from "@aws-sdk/node-config-provider";
import { NodeHttpHandler, streamCollector } from "@aws-sdk/node-http-handler";
import { HashConstructor as __HashConstructor } from "@aws-sdk/types";
import { fromBase64, toBase64 } from "@aws-sdk/util-base64-node";
import { calculateBodyLength } from "@aws-sdk/util-body-length-node";
import { defaultUserAgent } from "@aws-sdk/util-user-agent-node";
import { fromUtf8, toUtf8 } from "@aws-sdk/util-utf8-node";
import { ClientDefaults } from "./S3Client";
import { ClientSharedValues } from "./runtimeConfig.shared";

/**
 * @internal
 */
export const ClientDefaultValues: Required<ClientDefaults> = {
  ...ClientSharedValues,
  runtime: "node",
  base64Decoder: fromBase64,
  base64Encoder: toBase64,
  bodyLengthChecker: calculateBodyLength,
  credentialDefaultProvider,
  defaultUserAgentProvider: defaultUserAgent({
    serviceId: ClientSharedValues.serviceId,
    clientVersion: packageInfo.version,
  }),
  eventStreamSerdeProvider,
  maxAttempts: loadNodeConfig(NODE_MAX_ATTEMPT_CONFIG_OPTIONS),
  md5: Hash.bind(null, "md5"),
  region: loadNodeConfig(NODE_REGION_CONFIG_OPTIONS, NODE_REGION_CONFIG_FILE_OPTIONS),
  requestHandler: new NodeHttpHandler(),
  sha256: Hash.bind(null, "sha256"),
  streamCollector,
  streamHasher,
  useArnRegion: loadNodeConfig(NODE_USE_ARN_REGION_CONFIG_OPTIONS),
  utf8Decoder: fromUtf8,
  utf8Encoder: toUtf8,
};
