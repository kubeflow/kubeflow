import { Provider, UserAgent } from "@aws-sdk/types";

import { DefaultUserAgentOptions } from "./configurations";

/**
 * Default provider to the user agent in ReactNative. It's a best effort to infer
 * the device information. It uses bowser library to detect the browser and virsion
 */
export const defaultUserAgent = ({
  serviceId,
  clientVersion,
}: DefaultUserAgentOptions): Provider<UserAgent> => async () => {
  const sections: UserAgent = [
    // sdk-metadata
    ["aws-sdk-js", clientVersion],
    // os-metadata
    ["os/other"],
    // language-metadata
    // ECMAScript edition doesn't matter in JS.
    ["lang/js"],
    ["md/rn"],
  ];

  if (serviceId) {
    // api-metadata
    // service Id may not appear in non-AWS clients
    sections.push([`api/${serviceId}`, clientVersion]);
  }

  return sections;
};
