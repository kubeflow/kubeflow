import { InputLogEvent, LogGroup } from '@aws-sdk/client-cloudwatch-logs';
import { Credentials } from '@aws-sdk/types';
export interface AmplifyConfig {
    Analytics?: object;
    Auth?: object;
    API?: object;
    Logging?: object;
    Storage?: object;
    Cache?: object;
    ssr?: boolean;
}
export interface ICredentials {
    accessKeyId: string;
    sessionToken: string;
    secretAccessKey: string;
    identityId: string;
    authenticated: boolean;
    expiration?: Date;
}
/**
 * @private
 * Internal use of Amplify only
 */
export declare type DelayFunction = (attempt: number, args?: any[], error?: Error) => number | false;
export interface LoggingProvider {
    getProviderName(): string;
    getCategoryName(): string;
    configure(config?: object): object;
    pushLogs(logs: InputLogEvent[]): void;
}
export interface AWSCloudWatchProviderOptions {
    logGroupName?: string;
    logStreamName?: string;
    region?: string;
    credentials?: Credentials;
    endpoint?: string;
}
export interface CloudWatchDataTracker {
    eventUploadInProgress: boolean;
    logEvents: InputLogEvent[];
    verifiedLogGroup?: LogGroup;
}
