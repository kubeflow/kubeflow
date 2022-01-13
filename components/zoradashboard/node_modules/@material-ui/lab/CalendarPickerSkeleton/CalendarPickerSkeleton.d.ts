/// <reference types="react" />
import { Theme } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';
declare type HTMLDivProps = JSX.IntrinsicElements['div'];
export interface CalendarPickerSkeletonClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the week element. */
    week: string;
    /** Styles applied to the day element. */
    daySkeleton: string;
}
export interface CalendarPickerSkeletonProps extends HTMLDivProps {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<CalendarPickerSkeletonClasses>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
}
export declare type CalendarPickerSkeletonClassKey = keyof CalendarPickerSkeletonClasses;
export declare function getCalendarPickerSkeletonUtilityClass(slot: string): string;
export declare const calendarPickerSkeletonClasses: CalendarPickerSkeletonClasses;
/**
 *
 * Demos:
 *
 * - [Date Picker](https://material-ui.com/components/date-picker/)
 *
 * API:
 *
 * - [CalendarPickerSkeleton API](https://material-ui.com/api/calendar-picker-skeleton/)
 */
declare function CalendarPickerSkeleton(props: CalendarPickerSkeletonProps): JSX.Element;
declare namespace CalendarPickerSkeleton {
    var propTypes: any;
}
export default CalendarPickerSkeleton;
