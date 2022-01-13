export declare function clientInfo(): {
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
export declare function dimension(): {
    width: number;
    height: number;
};
export declare function browserType(userAgent: string): {
    type: string;
    version: string;
};
