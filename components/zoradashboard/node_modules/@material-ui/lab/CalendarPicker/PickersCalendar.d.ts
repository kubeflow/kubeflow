import * as React from 'react';
import { PickersDayProps } from '../PickersDay/PickersDay';
import { PickerOnChangeFn } from '../internal/pickers/hooks/useViews';
import { SlideDirection, SlideTransitionProps } from './PickersSlideTransition';
export interface ExportedCalendarProps<TDate> extends Pick<PickersDayProps<TDate>, 'disableHighlightToday' | 'showDaysOutsideCurrentMonth' | 'allowSameDateSelection'> {
    autoFocus?: boolean;
    /**
     * If `true` renders `LoadingComponent` in calendar instead of calendar view.
     * Can be used to preload information and show it in calendar.
     * @default false
     */
    loading?: boolean;
    /**
     * Calendar onChange.
     */
    onChange: PickerOnChangeFn<TDate>;
    /**
     * Custom renderer for day. Check the [PickersDay](https://material-ui.com/api/pickers-day/) component.
     */
    renderDay?: (day: TDate, selectedDates: Array<TDate | null>, pickersDayProps: PickersDayProps<TDate>) => JSX.Element;
    /**
     * Component displaying when passed `loading` true.
     * @default () => "..."
     */
    renderLoading?: () => React.ReactNode;
}
export interface PickersCalendarProps<TDate> extends ExportedCalendarProps<TDate> {
    autoFocus?: boolean;
    className?: string;
    currentMonth: TDate;
    date: TDate | [TDate | null, TDate | null] | null;
    focusedDay: TDate | null;
    isDateDisabled: (day: TDate) => boolean;
    isMonthSwitchingAnimating: boolean;
    onFocusedDayChange: (newFocusedDay: TDate) => void;
    onMonthSwitchingAnimationEnd: () => void;
    reduceAnimations: boolean;
    slideDirection: SlideDirection;
    TransitionProps?: Partial<SlideTransitionProps>;
}
/**
 * @ignore - do not document.
 */
declare function PickersCalendar<TDate>(props: PickersCalendarProps<TDate>): JSX.Element;
export default PickersCalendar;
