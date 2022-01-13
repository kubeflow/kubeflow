import * as React from 'react';
import { ResponsiveWrapperProps } from '../internal/pickers/wrappers/ResponsiveWrapper';
import { RangeInput, DateRange } from './RangeTypes';
import { ValidationProps } from '../internal/pickers/hooks/useValidation';
import { ExportedDateRangePickerViewProps } from './DateRangePickerView';
import { ExportedDateRangePickerInputProps } from './DateRangePickerInput';
import { DateRangeValidationError } from '../internal/pickers/date-utils';
interface BaseDateRangePickerProps<TDate> extends ExportedDateRangePickerViewProps<TDate>, ValidationProps<DateRangeValidationError, RangeInput<TDate>>, ExportedDateRangePickerInputProps {
    /**
     * The components used for each slot.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    components?: ExportedDateRangePickerViewProps<TDate>['components'] & ExportedDateRangePickerInputProps['components'];
    /**
     * Text for end input label and toolbar placeholder.
     * @default 'End'
     */
    endText?: React.ReactNode;
    /**
     * Custom mask. Can be used to override generate from format. (e.g. `__/__/____ __:__` or `__/__/____ __:__ _M`).
     * @default '__/__/____'
     */
    mask?: ExportedDateRangePickerInputProps['mask'];
    /**
     * Min selectable date. @DateIOType
     * @default defaultMinDate
     */
    minDate?: TDate;
    /**
     * Max selectable date. @DateIOType
     * @default defaultMaxDate
     */
    maxDate?: TDate;
    /**
     * Callback fired when the value (the selected date range) changes @DateIOType.
     */
    onChange: (date: DateRange<TDate>, keyboardInputValue?: string) => void;
    /**
     * Text for start input label and toolbar placeholder.
     * @default 'Start'
     */
    startText?: React.ReactNode;
    /**
     * The value of the date range picker.
     */
    value: RangeInput<TDate>;
}
export interface DateRangePickerProps<TDate> extends BaseDateRangePickerProps<TDate>, ResponsiveWrapperProps {
}
declare type DateRangePickerComponent = (<TDate>(props: DateRangePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes: unknown;
};
/**
 *
 * Demos:
 *
 * - [Date Range Picker](https://material-ui.com/components/date-range-picker/)
 *
 * API:
 *
 * - [DateRangePicker API](https://material-ui.com/api/date-range-picker/)
 */
declare const DateRangePicker: DateRangePickerComponent;
export default DateRangePicker;
