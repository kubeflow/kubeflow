/// <reference types="react" />
import { ExportedCalendarHeaderProps } from '../CalendarPicker/PickersCalendarHeader';
import { DateRange } from './RangeTypes';
import { PickersCalendarProps } from '../CalendarPicker/PickersCalendar';
import { ExportedDesktopDateRangeCalendarProps } from './DateRangePickerViewDesktop';
import { DateValidationProps } from '../internal/pickers/date-utils';
export interface ExportedMobileDateRangeCalendarProps<TDate> extends Pick<ExportedDesktopDateRangeCalendarProps<TDate>, 'renderDay'> {
}
interface DesktopDateRangeCalendarProps<TDate> extends ExportedMobileDateRangeCalendarProps<TDate>, Omit<PickersCalendarProps<TDate>, 'date' | 'renderDay' | 'onFocusedDayChange'>, DateValidationProps<TDate>, ExportedCalendarHeaderProps<TDate> {
    date: DateRange<TDate>;
    changeMonth: (date: TDate) => void;
}
/**
 * @ignore - internal component.
 */
export declare function DateRangePickerViewMobile<TDate>(props: DesktopDateRangeCalendarProps<TDate>): JSX.Element;
export {};
