import * as React from 'react';
import { ExportedClockPickerProps } from '../ClockPicker/ClockPicker';
import { ExportedCalendarPickerProps } from '../CalendarPicker/CalendarPicker';
import { DateTimeValidationError, ValidationProps } from '../internal/pickers/hooks/useValidation';
import { ParseableDate } from '../internal/pickers/constants/prop-types';
import { BasePickerProps, ToolbarComponentProps } from '../internal/pickers/typings/BasePicker';
import { ExportedDateInputProps } from '../internal/pickers/PureDateInput';
export declare type DateTimePickerView = 'year' | 'day' | 'month' | 'hours' | 'minutes';
export interface BaseDateTimePickerProps<TDate> extends ExportedClockPickerProps<TDate>, ExportedCalendarPickerProps<TDate>, BasePickerProps<ParseableDate<TDate>, TDate | null>, ValidationProps<DateTimeValidationError, ParseableDate<TDate>>, ExportedDateInputProps<ParseableDate<TDate>, TDate | null> {
    /**
     * The components used for each slot.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    components?: ExportedCalendarPickerProps<TDate>['components'] & ExportedDateInputProps<ParseableDate<TDate>, TDate | null>['components'];
    /**
     * To show tabs.
     */
    hideTabs?: boolean;
    /**
     * Date tab icon.
     */
    dateRangeIcon?: React.ReactNode;
    /**
     * Time tab icon.
     */
    timeIcon?: React.ReactNode;
    /**
     * Minimal selectable moment of time with binding to date, to set min time in each day use `minTime`.
     */
    minDateTime?: TDate;
    /**
     * Minimal selectable moment of time with binding to date, to set max time in each day use `maxTime`.
     */
    maxDateTime?: TDate;
    /**
     * First view to show.
     */
    openTo?: DateTimePickerView;
    /**
     * Component that will replace default toolbar renderer.
     * @default DateTimePickerToolbar
     */
    ToolbarComponent?: React.JSXElementConstructor<ToolbarComponentProps<TDate | null>>;
    /**
     * Mobile picker title, displaying in the toolbar.
     * @default 'Select date & time'
     */
    toolbarTitle?: React.ReactNode;
    /**
     * Date format, that is displaying in toolbar.
     */
    toolbarFormat?: string;
    /**
     * Array of views to show.
     */
    views?: readonly DateTimePickerView[];
}
declare type DefaultizedProps<Props> = Props & {
    inputFormat: string;
};
export declare function useDateTimePickerDefaultizedProps<Props extends BaseDateTimePickerProps<unknown>>({ ampm, inputFormat, maxDate: maxDateProp, maxDateTime, maxTime, minDate: minDateProp, minDateTime, minTime, openTo, orientation, views, ...other }: Props, name: string): DefaultizedProps<Props>;
export {};
