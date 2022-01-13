import packageInfo from "./package.json";

import { Sha256 } from "@aws-crypto/sha256-browser";
import { FetchHttpHandler, streamCollector } from "@aws-sdk/fetch-http-handler";
import { invalidProvider } from "@aws-sdk/invalid-dependency";
import { DEFAULT_MAX_ATTEMPTS } from "@aws-sdk/middleware-retry";
import { fromBase64, toBase64 } from "@aws-sdk/util-base64-browser";
import { calculateBodyLength } from "@aws-sdk/util-body-length-browser";
import { defaultUserAgent } from "@aws-sdk/util-user-agent-browser";
import { fromUtf8, toUtf8 } from "@aws-sdk/util-utf8-browser";
import { ClientDefaults } from "./CognitoIdentityClient";
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
  maxAttempts: DEFAULT_MAX_ATTEMPTS,
  region: invalidProvider("Region is missing"),
  requestHandler: new FetchHttpHandler(),
  sha256: Sha256,
  streamCollector,
  utf8Decoder: fromUtf8,
  utf8Encoder: toUtf8,
};
