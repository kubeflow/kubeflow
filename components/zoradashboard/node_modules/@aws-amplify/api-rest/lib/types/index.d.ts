/**
 * RestClient instance options
 */
export declare class RestClientOptions {
    /** AWS credentials */
    credentials: AWSCredentials;
    /**
     * Lookup key of AWS credentials.
     * If credentials not provided then lookup from sessionStorage.
     * Default 'awsCredentials'
     */
    credentials_key: string;
    /** Additional headers for all requests send by this client. e.g. user-agent */
    headers: object;
    constructor();
}
/**
 * AWS credentials needed for RestClient
 */
export declare class AWSCredentials {
    /**
     * Secret Access Key
     *
     * [Access Key ID and Secret Access Key]
     * (http://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys)
     */
    secretAccessKey: string;
    /**
     * Access Key ID
     *
     * [Access Key ID and Secret Access Key]
     * (http://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys)
     */
    accessKeyId: string;
    /** Access Token of current session */
    sessionToken: string;
}
export interface apiOptions {
    headers: object;
    endpoints: object;
    credentials?: object;
}
export declare type ApiInfo = {
    endpoint: string;
    region?: string;
    service?: string;
    custom_header?: () => {
        [key: string]: string;
    };
};
