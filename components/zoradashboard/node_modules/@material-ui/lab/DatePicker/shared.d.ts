/// <reference types="react" />
import { ParseableDate } from '../internal/pickers/constants/prop-types';
import { OverrideParseableDateProps } from '../internal/pickers/hooks/date-helpers-hooks';
import { CalendarPickerView } from '../CalendarPicker';
import { ExportedCalendarPickerProps } from '../CalendarPicker/CalendarPicker';
import { DateValidationError, ValidationProps } from '../internal/pickers/hooks/useValidation';
import { ExportedDateInputProps } from '../internal/pickers/PureDateInput';
import { BasePickerProps, ToolbarComponentProps } from '../internal/pickers/typings/BasePicker';
export declare type DatePickerView = 'year' | 'day' | 'month';
export interface BaseDatePickerProps<TDate> extends ExportedCalendarPickerProps<TDate>, BasePickerProps<ParseableDate<TDate>, TDate | null>, ValidationProps<DateValidationError, ParseableDate<TDate>>, ExportedDateInputProps<ParseableDate<TDate>, TDate | null> {
    /**
     * The components used for each slot.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    components?: OverrideParseableDateProps<TDate, ExportedCalendarPickerProps<TDate>, 'minDate' | 'maxDate'>['components'] & ExportedDateInputProps<ParseableDate<TDate>, TDate | null>['components'];
    /**
     * First view to show.
     */
    openTo?: DatePickerView;
    /**
     * Component that will replace default toolbar renderer.
     * @default DatePickerToolbar
     */
    ToolbarComponent?: React.JSXElementConstructor<ToolbarComponentProps<TDate | null>>;
    /**
     * Mobile picker title, displaying in the toolbar.
     * @default 'Select date'
     */
    toolbarTitle?: React.ReactNode;
    /**
     * Array of views to show.
     */
    views?: readonly DatePickerView[];
}
export declare const isYearOnlyView: (views: readonly CalendarPickerView[]) => views is readonly "year"[];
export declare const isYearAndMonthViews: (views: readonly CalendarPickerView[]) => views is readonly ("month" | "year")[];
export declare type DefaultizedProps<Props> = Props & {
    inputFormat: string;
};
export declare function useDatePickerDefaultizedProps<Props extends BaseDatePickerProps<unknown>>({ openTo, views, minDate: minDateProp, maxDate: maxDateProp, ...other }: Props, name: string): DefaultizedProps<Props>;
