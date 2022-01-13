/// <reference types="react" />
import { DateRange } from './RangeTypes';
import { PickersCalendarProps } from '../CalendarPicker/PickersCalendar';
import { DateRangePickerDayProps } from '../DateRangePickerDay';
import { ExportedArrowSwitcherProps } from '../internal/pickers/PickersArrowSwitcher';
import { DateValidationProps } from '../internal/pickers/date-utils';
export interface ExportedDesktopDateRangeCalendarProps<TDate> {
    /**
     * The number of calendars that render on **desktop**.
     * @default 2
     */
    calendars?: 1 | 2 | 3;
    /**
     * Custom renderer for `<DateRangePicker />` days. @DateIOType
     * @example (date, dateRangePickerDayProps) => <DateRangePickerDay {...dateRangePickerDayProps} />
     */
    renderDay?: (date: TDate, dateRangePickerDayProps: DateRangePickerDayProps<TDate>) => JSX.Element;
}
interface DesktopDateRangeCalendarProps<TDate> extends ExportedDesktopDateRangeCalendarProps<TDate>, Omit<PickersCalendarProps<TDate>, 'renderDay' | 'onFocusedDayChange'>, DateValidationProps<TDate>, ExportedArrowSwitcherProps {
    calendars: 1 | 2 | 3;
    date: DateRange<TDate | null>;
    changeMonth: (date: TDate) => void;
    currentlySelectingRangeEnd: 'start' | 'end';
}
/**
 * @ignore - internal component.
 */
declare function DateRangePickerViewDesktop<TDate>(props: DesktopDateRangeCalendarProps<TDate>): JSX.Element;
export default DateRangePickerViewDesktop;
