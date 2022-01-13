export declare const CLOCK_WIDTH = 220;
export declare const CLOCK_HOUR_WIDTH = 36;
export declare type ClockView = 'hours' | 'minutes' | 'seconds';
export declare const getMinutes: (offsetX: number, offsetY: number, step?: number) => number;
export declare const getHours: (offsetX: number, offsetY: number, ampm: boolean) => number;
