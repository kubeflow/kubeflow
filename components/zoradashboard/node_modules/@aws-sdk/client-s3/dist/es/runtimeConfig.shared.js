import { defaultRegionInfoProvider } from "./endpoints";
import { parseUrl } from "@aws-sdk/url-parser";
/**
 * @internal
 */
export var ClientSharedValues = {
    apiVersion: "2006-03-01",
    disableHostPrefix: false,
    logger: {},
    regionInfoProvider: defaultRegionInfoProvider,
    serviceId: "S3",
    signingEscapePath: false,
    urlParser: parseUrl,
    useArnRegion: false,
};
//# sourceMappingURL=runtimeConfig.shared.js.map