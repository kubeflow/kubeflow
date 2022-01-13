export declare const ENV_CREDENTIALS_PATH = "AWS_SHARED_CREDENTIALS_FILE";
export declare const ENV_CONFIG_PATH = "AWS_CONFIG_FILE";
export interface SharedConfigInit {
    /**
     * The path at which to locate the ini credentials file. Defaults to the
     * value of the `AWS_SHARED_CREDENTIALS_FILE` environment variable (if
     * defined) or `~/.aws/credentials` otherwise.
     */
    filepath?: string;
    /**
     * The path at which to locate the ini config file. Defaults to the value of
     * the `AWS_CONFIG_FILE` environment variable (if defined) or
     * `~/.aws/config` otherwise.
     */
    configFilepath?: string;
}
export interface Profile {
    [key: string]: string | undefined;
}
export interface ParsedIniData {
    [key: string]: Profile;
}
export interface SharedConfigFiles {
    credentialsFile: ParsedIniData;
    configFile: ParsedIniData;
}
export declare const loadSharedConfigFiles: (init?: SharedConfigInit) => Promise<SharedConfigFiles>;
