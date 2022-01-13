import { NonEmptyDateRange, DateRange } from '../../DateRangePicker/RangeTypes';
import { ParseableDate } from './constants/prop-types';
import { MuiPickersAdapter } from './hooks/useUtils';
interface FindClosestDateParams<TDate> {
    date: TDate;
    disableFuture: boolean;
    disablePast: boolean;
    maxDate: TDate;
    minDate: TDate;
    shouldDisableDate: (date: TDate) => boolean;
    utils: MuiPickersAdapter<TDate>;
}
export declare const findClosestEnabledDate: <TDate>({ date, disableFuture, disablePast, maxDate, minDate, shouldDisableDate, utils, }: FindClosestDateParams<TDate>) => TDate;
export declare function parsePickerInputValue(utils: MuiPickersAdapter, value: unknown): unknown;
export declare type RangeInput<TDate> = import('../../DateRangePicker/RangeTypes').RangeInput<TDate>;
export declare function parseRangeInputValue<TDate>(utils: MuiPickersAdapter, value?: RangeInput<TDate>): DateRange<TDate>;
export declare const isRangeValid: <TDate>(utils: MuiPickersAdapter<TDate>, range: DateRange<TDate> | null) => range is NonEmptyDateRange<TDate>;
export declare const isWithinRange: <TDate>(utils: MuiPickersAdapter<TDate>, day: TDate, range: DateRange<TDate> | null) => boolean;
export declare const isStartOfRange: <TDate>(utils: MuiPickersAdapter<TDate>, day: TDate, range: DateRange<TDate> | null) => boolean;
export declare const isEndOfRange: <TDate>(utils: MuiPickersAdapter<TDate>, day: TDate, range: DateRange<TDate> | null) => boolean;
export interface DateValidationProps<TDate> {
    /**
     * Disable past dates.
     * @default false
     */
    disablePast?: boolean;
    /**
     * Disable future dates.
     * @default false
     */
    disableFuture?: boolean;
    /**
     * Min selectable date. @DateIOType
     * @default Date(1900-01-01)
     */
    minDate?: TDate;
    /**
     * Max selectable date. @DateIOType
     * @default Date(2099-31-12)
     */
    maxDate?: TDate;
    /**
     * Disable specific date. @DateIOType
     */
    shouldDisableDate?: (day: TDate) => boolean;
}
export declare const validateDate: <TDate>(utils: MuiPickersAdapter<TDate>, value: ParseableDate<TDate>, { disablePast, disableFuture, minDate, maxDate, shouldDisableDate }: DateValidationProps<TDate>) => "invalidDate" | "shouldDisableDate" | "disableFuture" | "disablePast" | "minDate" | "maxDate" | null;
export declare type DateValidationError = ReturnType<typeof validateDate>;
declare type DateRangeValidationErrorValue = DateValidationError | 'invalidRange' | null;
export declare const validateDateRange: <TDate>(utils: MuiPickersAdapter<TDate>, value: RangeInput<TDate>, dateValidationProps: DateValidationProps<TDate>) => [DateRangeValidationErrorValue, DateRangeValidationErrorValue];
export declare type DateRangeValidationError = ReturnType<typeof validateDateRange>;
export {};
