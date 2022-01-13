import * as React from 'react';
import PropTypes from 'prop-types';
import { BasePickerProps } from '../internal/pickers/typings/BasePicker';
import { WrapperVariant } from '../internal/pickers/wrappers/WrapperVariantContext';
import { DateRangeInputProps } from './DateRangePickerInput';
import { DateRange, CurrentlySelectingRangeEndProps, RangeInput } from './RangeTypes';
import { ExportedCalendarPickerProps } from '../CalendarPicker/CalendarPicker';
import { ExportedDesktopDateRangeCalendarProps } from './DateRangePickerViewDesktop';
import { PickerSelectionState } from '../internal/pickers/hooks/usePickerState';
declare type BaseCalendarPropsToReuse<TDate> = Omit<ExportedCalendarPickerProps<TDate>, 'onYearChange' | 'renderDay'>;
export interface ExportedDateRangePickerViewProps<TDate> extends BaseCalendarPropsToReuse<TDate>, ExportedDesktopDateRangeCalendarProps<TDate>, Omit<BasePickerProps<RangeInput<TDate>, DateRange<TDate>>, 'value' | 'onChange'> {
    /**
     * If `true`, after selecting `start` date calendar will not automatically switch to the month of `end` date.
     * @default false
     */
    disableAutoMonthSwitching?: boolean;
    /**
     * Mobile picker title, displaying in the toolbar.
     * @default 'Select date range'
     */
    toolbarTitle?: React.ReactNode;
}
interface DateRangePickerViewProps<TDate> extends CurrentlySelectingRangeEndProps, ExportedDateRangePickerViewProps<TDate> {
    calendars: 1 | 2 | 3;
    open: boolean;
    startText: React.ReactNode;
    endText: React.ReactNode;
    isMobileKeyboardViewOpen: boolean;
    toggleMobileKeyboardView: () => void;
    DateInputProps: DateRangeInputProps;
    date: DateRange<TDate>;
    onDateChange: (date: DateRange<TDate>, currentWrapperVariant: WrapperVariant, isFinish?: PickerSelectionState) => void;
}
/**
 * @ignore - internal component.
 */
export declare function DateRangePickerView<TDate>(props: DateRangePickerViewProps<TDate>): JSX.Element;
export declare namespace DateRangePickerView {
    var propTypes: {
        calendars: PropTypes.Requireable<number>;
        disableAutoMonthSwitching: PropTypes.Requireable<boolean>;
    };
}
export {};
