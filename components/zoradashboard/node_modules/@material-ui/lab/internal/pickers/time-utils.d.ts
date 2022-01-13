import { ParseableDate } from './constants/prop-types';
import { MuiPickersAdapter } from './hooks/useUtils';
declare type Meridiem = 'am' | 'pm' | null;
export declare const getMeridiem: (date: unknown, utils: MuiPickersAdapter<unknown>) => Meridiem;
export declare const convertValueToMeridiem: (value: number, meridiem: Meridiem, ampm: boolean) => number;
export declare const convertToMeridiem: <TDate>(time: TDate, meridiem: 'am' | 'pm', ampm: boolean, utils: MuiPickersAdapter<TDate>) => TDate;
export declare function getSecondsInDay(date: unknown, utils: MuiPickersAdapter): number;
export declare const createIsAfterIgnoreDatePart: (disableIgnoringDatePartForTimeValidation: boolean, utils: MuiPickersAdapter<unknown>) => (dateLeft: unknown, dateRight: unknown) => boolean;
export interface TimeValidationProps<TDate> {
    /**
     * Min time acceptable time.
     * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
     */
    minTime?: TDate;
    /**
     * Max time acceptable time.
     * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
     */
    maxTime?: TDate;
    /**
     * Dynamically check if time is disabled or not.
     * If returns `false` appropriate time point will ot be acceptable.
     */
    shouldDisableTime?: (timeValue: number, clockType: 'hours' | 'minutes' | 'seconds') => boolean;
    /**
     * Do not ignore date part when validating min/max time.
     * @default false
     */
    disableIgnoringDatePartForTimeValidation?: boolean;
}
export declare const validateTime: <TDate>(utils: MuiPickersAdapter<unknown>, value: ParseableDate<TDate>, { minTime, maxTime, shouldDisableTime, disableIgnoringDatePartForTimeValidation, }: TimeValidationProps<TDate>) => "invalidDate" | "minTime" | "maxTime" | "shouldDisableTime-hours" | "shouldDisableTime-minutes" | "shouldDisableTime-seconds" | null;
export declare type TimeValidationError = ReturnType<typeof validateTime>;
export {};
