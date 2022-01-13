import { ParseableDate } from './constants/prop-types';
import { MuiPickersAdapter } from './hooks/useUtils';
export declare function getTextFieldAriaText<TDate>(rawValue: ParseableDate<TDate>, utils: MuiPickersAdapter<TDate>): string;
export declare const getDisplayDate: <TDate>(utils: MuiPickersAdapter<TDate>, value: ParseableDate<TDate>, inputFormat: string) => string;
export declare function pick12hOr24hFormat(userFormat: string | undefined, ampm: boolean | undefined, formats: {
    localized: string;
    '12h': string;
    '24h': string;
}): string;
export declare function checkMaskIsValidForCurrentFormat(mask: string, format: string, acceptRegex: RegExp, utils: MuiPickersAdapter): boolean;
export declare const maskedDateFormatter: (mask: string, acceptRegexp: RegExp) => (value: string) => string;
