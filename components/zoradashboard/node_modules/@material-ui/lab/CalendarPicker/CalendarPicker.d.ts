import * as React from 'react';
import { ExportedCalendarProps } from './PickersCalendar';
import { PickerOnChangeFn } from '../internal/pickers/hooks/useViews';
import { ExportedCalendarHeaderProps } from './PickersCalendarHeader';
import { ExportedYearPickerProps } from '../YearPicker/YearPicker';
import { CalendarPickerView } from './shared';
export interface CalendarPickerClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the transition group element. */
    viewTransitionContainer: string;
}
export declare type CalendarPickerClassKey = keyof CalendarPickerClasses;
export interface CalendarPickerProps<TDate> extends ExportedCalendarProps<TDate>, ExportedYearPickerProps<TDate>, ExportedCalendarHeaderProps<TDate> {
    className?: string;
    date: TDate | null;
    /**
     * Default calendar month displayed when `value={null}`.
     */
    defaultCalendarMonth?: TDate;
    /**
     * @default false
     */
    disableFuture?: boolean;
    /**
     * @default false
     */
    disablePast?: boolean;
    /**
     * Max selectable date. @DateIOType
     */
    maxDate?: TDate;
    /**
     * Min selectable date. @DateIOType
     */
    minDate?: TDate;
    /**
     * Callback fired on view change.
     */
    onViewChange?: (view: CalendarPickerView) => void;
    /**
     * Callback fired on date change
     */
    onChange: PickerOnChangeFn<TDate>;
    /**
     * Callback firing on month change. @DateIOType
     */
    onMonthChange?: (date: TDate) => void;
    /**
     * Initially open view.
     * @default 'day'
     */
    openTo?: CalendarPickerView;
    /**
     * Disable heavy animations.
     * @default typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent)
     */
    reduceAnimations?: boolean;
    /**
     * Component displaying when passed `loading` true.
     * @default () => <span data-mui-test="loading-progress">...</span>
     */
    renderLoading?: () => React.ReactNode;
    /**
     * Disable specific date. @DateIOType
     */
    shouldDisableDate?: (day: TDate) => boolean;
    /**
     * Controlled open view.
     */
    view?: CalendarPickerView;
    /**
     * Views for calendar picker.
     * @default ['year', 'day']
     */
    views?: readonly CalendarPickerView[];
}
export declare type ExportedCalendarPickerProps<TDate> = Omit<CalendarPickerProps<TDate>, 'date' | 'view' | 'views' | 'openTo' | 'onChange' | 'changeView' | 'slideDirection' | 'currentMonth' | 'className'>;
interface CalendarPickerPropsWithClasses<TDate> extends CalendarPickerProps<TDate> {
    classes?: Partial<CalendarPickerClasses>;
}
export declare function getCalendarPickerUtilityClass(slot: string): string;
export declare const calendarPickerClasses: CalendarPickerClasses;
export declare const defaultReduceAnimations: boolean;
declare const _default: <TDate>(props: CalendarPickerPropsWithClasses<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element;
/**
 *
 * Demos:
 *
 * - [Date Picker](https://material-ui.com/components/date-picker/)
 *
 * API:
 *
 * - [CalendarPicker API](https://material-ui.com/api/calendar-picker/)
 */
export default _default;
