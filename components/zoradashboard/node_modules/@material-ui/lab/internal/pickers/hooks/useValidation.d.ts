import { DateValidationProps, RangeInput } from '../date-utils';
import { DateTimeValidationProps } from '../date-time-utils';
import { TimeValidationProps } from '../time-utils';
export interface ValidationProps<TError, TDateValue> {
    /**
     * Callback that fired when input value or new `value` prop validation returns **new** validation error (or value is valid after error).
     * In case of validation error detected `reason` prop return non-null value and `TextField` must be displayed in `error` state.
     * This can be used to render appropriate form error.
     *
     * [Read the guide](https://next.material-ui-pickers.dev/guides/forms) about form integration and error displaying.
     * @DateIOType
     */
    onError?: (reason: TError, value: TDateValue) => void;
    value: TDateValue;
}
export declare type TimeValidationError = import('../time-utils').TimeValidationError;
export declare function useTimeValidation<TDate>(props: TimeValidationProps<TDate> & ValidationProps<TimeValidationError, TDate>): TimeValidationError;
export declare type DateValidationError = import('../date-utils').DateValidationError;
export declare function useDateValidation<TDate>(props: DateValidationProps<TDate> & ValidationProps<DateValidationError, TDate>): DateValidationError;
export declare type DateTimeValidationError = import('../date-time-utils').DateTimeValidationError;
export declare function useDateTimeValidation<TDate>(props: DateTimeValidationProps<TDate> & ValidationProps<DateTimeValidationError, TDate>): DateTimeValidationError;
export declare type DateRangeValidationError = import('../date-utils').DateRangeValidationError;
export declare function useDateRangeValidation<TDate>(props: DateValidationProps<TDate> & ValidationProps<DateRangeValidationError, RangeInput<TDate>>): DateRangeValidationError;
