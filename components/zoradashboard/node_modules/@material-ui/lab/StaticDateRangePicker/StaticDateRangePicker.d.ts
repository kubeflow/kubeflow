import * as React from 'react';
import { StaticWrapperProps } from '../internal/pickers/wrappers/StaticWrapper';
import { RangeInput, DateRange } from '../DateRangePicker/RangeTypes';
import { DateRangeValidationError, ValidationProps } from '../internal/pickers/hooks/useValidation';
import { ExportedDateRangePickerViewProps } from '../DateRangePicker/DateRangePickerView';
import { ExportedDateRangePickerInputProps } from '../DateRangePicker/DateRangePickerInput';
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
     */
    minDate?: TDate;
    /**
     * Max selectable date. @DateIOType
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
export interface StaticDateRangePickerProps<TDate = unknown> extends BaseDateRangePickerProps<TDate> {
    /**
     * Force static wrapper inner components to be rendered in mobile or desktop mode.
     * @default 'mobile'
     */
    displayStaticWrapperAs?: StaticWrapperProps['displayStaticWrapperAs'];
}
declare type StaticDateRangePickerComponent = (<TDate>(props: StaticDateRangePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
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
 * - [StaticDateRangePicker API](https://material-ui.com/api/static-date-range-picker/)
 */
declare const StaticDateRangePicker: StaticDateRangePickerComponent;
export default StaticDateRangePicker;
