import { ParseableDate } from './constants/prop-types';
import { MuiPickersAdapter } from './hooks/useUtils';
import { DateValidationProps } from './date-utils';
import { TimeValidationProps } from './time-utils';
export interface DateTimeValidationProps<TDate> extends DateValidationProps<TDate>, TimeValidationProps<TDate> {
}
export declare function validateDateTime<TDate>(utils: MuiPickersAdapter<TDate>, value: ParseableDate<TDate>, { minDate, maxDate, disableFuture, shouldDisableDate, disablePast, ...timeValidationProps }: DateTimeValidationProps<TDate>): "invalidDate" | "shouldDisableDate" | "disableFuture" | "disablePast" | "minDate" | "maxDate" | "minTime" | "maxTime" | "shouldDisableTime-hours" | "shouldDisableTime-minutes" | "shouldDisableTime-seconds" | null;
export declare type DateTimeValidationError = ReturnType<typeof validateDateTime>;
