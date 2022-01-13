import { ICredentials } from '@aws-amplify/core';
/**
 * Analytics instance options
 */
export interface AnalyticsOptions {
    appId: string;
    platform?: string;
    clientId?: string;
    region?: string;
    credentials?: ICredentials;
}
export interface EventAttributes {
    [key: string]: string;
}
export interface EventMetrics {
    [key: string]: number;
}
export interface pageViewTrackOpts {
    enable: boolean;
    type?: string;
    eventName?: string;
    provider?: string;
    attributes?: EventAttributes | (() => EventAttributes | Promise<EventAttributes>);
    getUrl?: () => string;
}
export interface EventTrackOpts {
    enable: boolean;
    events?: Array<string>;
    selectorPrefix?: string;
    provider?: string;
    attributes?: EventAttributes | (() => EventAttributes | Promise<EventAttributes>);
}
export interface SessionTrackOpts {
    enable: boolean;
    attributes?: EventAttributes | (() => EventAttributes | Promise<EventAttributes>);
    provider?: string;
}
