import { loadConfig } from "@aws-sdk/node-config-provider";
import { Provider, UserAgent } from "@aws-sdk/types";
import { platform, release } from "os";
import { env, versions } from "process";

export const UA_APP_ID_ENV_NAME = "AWS_SDK_UA_APP_ID";
export const UA_APP_ID_INI_NAME = "sdk-ua-app-id";

interface DefaultUserAgentOptions {
  serviceId?: string;
  clientVersion: string;
}

/**
 * Collect metrics from runtime to put into user agent.
 */
export const defaultUserAgent = ({
  serviceId,
  clientVersion,
}: DefaultUserAgentOptions): Provider<UserAgent> => async () => {
  const sections: UserAgent = [
    // sdk-metadata
    ["aws-sdk-js", clientVersion],
    // os-metadata
    [`os/${platform()}`, release()],
    // language-metadata
    // ECMAScript edition doesn't matter in JS, so no version needed.
    ["lang/js"],
    ["md/nodejs", `${versions.node}`],
  ];

  if (serviceId) {
    // api-metadata
    // service Id may not appear in non-AWS clients
    sections.push([`api/${serviceId}`, clientVersion]);
  }

  if (env.AWS_EXECUTION_ENV) {
    // env-metadata
    sections.push([`exec-env/${env.AWS_EXECUTION_ENV}`]);
  }

  const appId = await loadConfig<string | undefined>({
    environmentVariableSelector: (env) => env[UA_APP_ID_ENV_NAME],
    configFileSelector: (profile) => profile[UA_APP_ID_INI_NAME],
    default: undefined,
  })();
  if (appId) {
    sections.push([`app/${appId}`]);
  }

  return sections;
};
