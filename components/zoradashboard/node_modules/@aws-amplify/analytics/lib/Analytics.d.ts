import { AnalyticsProvider, EventMetrics } from './types';
/**
 * Provide mobile analytics client functions
 */
export declare class AnalyticsClass {
    private _config;
    private _pluggables;
    private _disabled;
    private _trackers;
    /**
     * Initialize Analtyics
     * @param config - Configuration of the Analytics
     */
    constructor();
    getModuleName(): string;
    /**
     * configure Analytics
     * @param {Object} config - Configuration of the Analytics
     */
    configure(config?: any): any;
    /**
     * add plugin into Analytics category
     * @param {Object} pluggable - an instance of the plugin
     */
    addPluggable(pluggable: AnalyticsProvider): any;
    /**
     * Get the plugin object
     * @param providerName - the name of the plugin
     */
    getPluggable(providerName: any): AnalyticsProvider;
    /**
     * Remove the plugin object
     * @param providerName - the name of the plugin
     */
    removePluggable(providerName: any): void;
    /**
     * stop sending events
     */
    disable(): void;
    /**
     * start sending events
     */
    enable(): void;
    /**
     * Record Session start
     * @return - A promise which resolves if buffer doesn't overflow
     */
    startSession(provider?: string): Promise<unknown>;
    /**
     * Record Session stop
     * @return - A promise which resolves if buffer doesn't overflow
     */
    stopSession(provider?: string): Promise<unknown>;
    /**
     * Record one analytic event and send it to Pinpoint
     * @param {String} name - The name of the event
     * @param {Object} [attributes] - Attributes of the event
     * @param {Object} [metrics] - Event metrics
     * @return - A promise which resolves if buffer doesn't overflow
     */
    record(event: string | object, provider?: any, metrics?: EventMetrics): Promise<unknown>;
    updateEndpoint(attrs: any, provider?: any): Promise<unknown>;
    private _sendEvent;
    autoTrack(trackerType: any, opts: any): void;
}
export declare const Analytics: AnalyticsClass;
