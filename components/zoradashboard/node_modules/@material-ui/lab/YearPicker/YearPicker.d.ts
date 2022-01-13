/// <reference types="react" />
import { PickerOnChangeFn } from '../internal/pickers/hooks/useViews';
export interface ExportedYearPickerProps<TDate> {
    /**
     * Callback firing on year change @DateIOType.
     */
    onYearChange?: (date: TDate) => void;
    /**
     * Disable specific years dynamically.
     * Works like `shouldDisableDate` but for year selection view @DateIOType.
     */
    shouldDisableYear?: (day: TDate) => boolean;
}
export declare type YearPickerClassKey = keyof NonNullable<YearPickerProps<any>['classes']>;
export interface YearPickerProps<TDate> extends ExportedYearPickerProps<TDate> {
    autoFocus?: boolean;
    className?: string;
    classes?: {
        /** Styles applied to the root element. */
        root?: string;
    };
    date: TDate | null;
    disableFuture?: boolean | null;
    disablePast?: boolean | null;
    isDateDisabled: (day: TDate) => boolean;
    minDate: TDate;
    maxDate: TDate;
    onChange: PickerOnChangeFn<TDate>;
    onFocusedDayChange?: (day: TDate) => void;
}
declare const _default: <TDate>(props: YearPickerProps<TDate>) => JSX.Element;
/**
 *
 * Demos:
 *
 * - [Date Picker](https://material-ui.com/components/date-picker/)
 *
 * API:
 *
 * - [YearPicker API](https://material-ui.com/api/year-picker/)
 */
export default _default;
