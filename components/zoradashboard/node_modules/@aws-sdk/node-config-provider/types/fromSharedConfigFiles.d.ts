import { Profile, SharedConfigFiles, SharedConfigInit as BaseSharedConfigInit } from "@aws-sdk/shared-ini-file-loader";
import { Provider } from "@aws-sdk/types";
export declare const ENV_PROFILE = "AWS_PROFILE";
export interface SharedConfigInit extends BaseSharedConfigInit {
    /**
     * The configuration profile to use.
     */
    profile?: string;
    /**
     * The preferred shared ini file to load the config. "config" option refers to
     * the shared config file(defaults to `~/.aws/config`). "credentials" option
     * refers to the shared credentials file(defaults to `~/.aws/credentials`)
     */
    preferredFile?: "config" | "credentials";
    /**
     * A promise that will be resolved with loaded and parsed credentials files.
     * Used to avoid loading shared config files multiple times.
     *
     * @internal
     */
    loadedConfig?: Promise<SharedConfigFiles>;
}
export declare type GetterFromConfig<T> = (profile: Profile) => T | undefined;
/**
 * Get config value from the shared config files with inferred profile name.
 */
export declare const fromSharedConfigFiles: <T = string>(configSelector: GetterFromConfig<T>, { preferredFile, ...init }?: SharedConfigInit) => Provider<T>;
