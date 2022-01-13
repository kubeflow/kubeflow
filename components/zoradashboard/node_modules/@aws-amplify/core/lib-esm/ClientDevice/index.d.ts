export declare class ClientDevice {
    static clientInfo(): {
        platform?: undefined;
        make?: undefined;
        model?: undefined;
        version?: undefined;
        appVersion?: undefined;
        language?: undefined;
        timezone?: undefined;
    } | {
        platform: string;
        make: string;
        model: string;
        version: string;
        appVersion: string;
        language: string;
        timezone: string;
    };
    static dimension(): {
        width: number;
        height: number;
    };
}
/**
 * @deprecated use named import
 */
export default ClientDevice;
