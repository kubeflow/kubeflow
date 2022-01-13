import * as React from 'react';
import { ToolbarComponentProps } from '../internal/pickers/typings/BasePicker';
import { DateRange, CurrentlySelectingRangeEndProps } from './RangeTypes';
interface DateRangePickerToolbarProps extends CurrentlySelectingRangeEndProps, Pick<ToolbarComponentProps, 'isMobileKeyboardViewOpen' | 'toggleMobileKeyboardView' | 'toolbarTitle' | 'toolbarFormat'> {
    date: DateRange<unknown>;
    startText: React.ReactNode;
    endText: React.ReactNode;
    currentlySelectingRangeEnd: 'start' | 'end';
    setCurrentlySelectingRangeEnd: (newSelectingEnd: 'start' | 'end') => void;
}
/**
 * @ignore - internal component.
 */
declare const DateRangePickerToolbar: ({ currentlySelectingRangeEnd, date: [start, end], endText, isMobileKeyboardViewOpen, setCurrentlySelectingRangeEnd, startText, toggleMobileKeyboardView, toolbarFormat, toolbarTitle, }: DateRangePickerToolbarProps) => JSX.Element;
export default DateRangePickerToolbar;
