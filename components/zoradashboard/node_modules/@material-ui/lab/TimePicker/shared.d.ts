import * as React from 'react';
import { ParseableDate } from '../internal/pickers/constants/prop-types';
import { ExportedClockPickerProps } from '../ClockPicker/ClockPicker';
import { TimeValidationError, ValidationProps } from '../internal/pickers/hooks/useValidation';
import { BasePickerProps, ToolbarComponentProps } from '../internal/pickers/typings/BasePicker';
import { ExportedDateInputProps } from '../internal/pickers/PureDateInput';
export declare type TimePickerView = 'hours' | 'minutes' | 'seconds';
export interface BaseTimePickerProps<TDate> extends ExportedClockPickerProps<TDate>, BasePickerProps<ParseableDate<TDate>, TDate | null>, ValidationProps<TimeValidationError, ParseableDate<TDate>>, ExportedDateInputProps<ParseableDate<TDate>, TDate | null> {
    /**
     * First view to show.
     */
    openTo?: TimePickerView;
    /**
     * Component that will replace default toolbar renderer.
     * @default TimePickerToolbar
     */
    ToolbarComponent?: React.JSXElementConstructor<ToolbarComponentProps<TDate | null>>;
    /**
     * Mobile picker title, displaying in the toolbar.
     * @default 'Select time'
     */
    toolbarTitle?: React.ReactNode;
    /**
     * Array of views to show.
     */
    views?: readonly TimePickerView[];
}
declare type DefaultizedProps<Props> = Props & {
    inputFormat: string;
};
export declare function useTimePickerDefaultizedProps<Props extends BaseTimePickerProps<unknown>>({ ampm, components, inputFormat, openTo, views, ...other }: Props, name: string): DefaultizedProps<Props>;
export {};
