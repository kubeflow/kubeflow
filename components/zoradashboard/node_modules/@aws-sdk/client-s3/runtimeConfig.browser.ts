import packageInfo from "./package.json";

import { Sha256 } from "@aws-crypto/sha256-browser";
import { eventStreamSerdeProvider } from "@aws-sdk/eventstream-serde-browser";
import { FetchHttpHandler, streamCollector } from "@aws-sdk/fetch-http-handler";
import { blobHasher as streamHasher } from "@aws-sdk/hash-blob-browser";
import { invalidProvider } from "@aws-sdk/invalid-dependency";
import { Md5 } from "@aws-sdk/md5-js";
import { DEFAULT_MAX_ATTEMPTS } from "@aws-sdk/middleware-retry";
import { fromBase64, toBase64 } from "@aws-sdk/util-base64-browser";
import { calculateBodyLength } from "@aws-sdk/util-body-length-browser";
import { defaultUserAgent } from "@aws-sdk/util-user-agent-browser";
import { fromUtf8, toUtf8 } from "@aws-sdk/util-utf8-browser";
import { ClientDefaults } from "./S3Client";
import { ClientSharedValues } from "./runtimeConfig.shared";

/**
 * @internal
 */
export const ClientDefaultValues: Required<ClientDefaults> = {
  ...ClientSharedValues,
  runtime: "browser",
  base64Decoder: fromBase64,
  base64Encoder: toBase64,
  bodyLengthChecker: calculateBodyLength,
  credentialDefaultProvider: (_: unknown) => () => Promise.reject(new Error("Credential is missing")),
  defaultUserAgentProvider: defaultUserAgent({
    serviceId: ClientSharedValues.serviceId,
    clientVersion: packageInfo.version,
  }),
  eventStreamSerdeProvider,
  maxAttempts: DEFAULT_MAX_ATTEMPTS,
  md5: Md5,
  region: invalidProvider("Region is missing"),
  requestHandler: new FetchHttpHandler(),
  sha256: Sha256,
  streamCollector,
  streamHasher,
  utf8Decoder: fromUtf8,
  utf8Encoder: toUtf8,
};
