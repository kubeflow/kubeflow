import * as React from 'react';
import { MuiPickersAdapter } from '../internal/pickers/hooks/useUtils';
import { TimeValidationProps } from '../internal/pickers/time-utils';
import { PickerOnChangeFn } from '../internal/pickers/hooks/useViews';
import { ClockView } from './shared';
export interface ClockPickerClasses {
    /** Styles applied to the arrowSwticher element. */
    arrowSwitcher: string;
}
export declare type ClockPickerClassKey = keyof ClockPickerClasses;
export declare function getClockPickerUtilityClass(slot: string): string;
export declare const clockPickerClasses: ClockPickerClasses;
export interface ExportedClockPickerProps<TDate> extends TimeValidationProps<TDate> {
    /**
     * 12h/24h view for hour selection clock.
     * @default false
     */
    ampm?: boolean;
    /**
     * Step over minutes.
     * @default 1
     */
    minutesStep?: number;
    /**
     * Display ampm controls under the clock (instead of in the toolbar).
     * @default false
     */
    ampmInClock?: boolean;
    /**
     * Accessible text that helps user to understand which time and view is selected.
     * @default <TDate extends any>(
     *   view: ClockView,
     *   time: TDate | null,
     *   adapter: MuiPickersAdapter<TDate>,
     * ) =>
     *   `Select ${view}. ${
     *     time === null ? 'No time selected' : `Selected time is ${adapter.format(time, 'fullTime')}`
     *   }`
     */
    getClockLabelText?: (view: ClockView, time: TDate | null, adapter: MuiPickersAdapter<TDate>) => string;
}
export interface ClockPickerProps<TDate> extends ExportedClockPickerProps<TDate> {
    /**
     * Set to `true` if focus should be moved to clock picker.
     */
    autoFocus?: boolean;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ClockPickerClasses>;
    /**
     * The components used for each slot.
     * Either a string to use a HTML element or a component.
     */
    components?: {
        LeftArrowButton?: React.ElementType;
        LeftArrowIcon?: React.ElementType;
        RightArrowButton?: React.ElementType;
        RightArrowIcon?: React.ElementType;
    };
    /**
     * The props used for each slot inside.
     */
    componentsProps?: {
        leftArrowButton?: any;
        rightArrowButton?: any;
    };
    /**
     * Selected date @DateIOType.
     */
    date: TDate | null;
    /**
     * Get clock number aria-text for hours.
     * @default (hours: string) => `${hours} hours`
     */
    getHoursClockNumberText?: (hours: string) => string;
    /**
     * Get clock number aria-text for minutes.
     * @default (minutes: string) => `${minutes} minutes`
     */
    getMinutesClockNumberText?: (minutes: string) => string;
    /**
     * Get clock number aria-text for seconds.
     * @default (seconds: string) => `${seconds} seconds`
     */
    getSecondsClockNumberText?: (seconds: string) => string;
    /**
     * Left arrow icon aria-label text.
     * @default 'open previous view'
     */
    leftArrowButtonText?: string;
    previousViewAvailable: boolean;
    nextViewAvailable: boolean;
    /**
     * On change callback @DateIOType.
     */
    onChange: PickerOnChangeFn<TDate>;
    openNextView: () => void;
    openPreviousView: () => void;
    /**
     * Right arrow icon aria-label text.
     * @default 'open next view'
     */
    rightArrowButtonText?: string;
    showViewSwitcher?: boolean;
    view: ClockView;
}
declare const _default: <TDate>(props: ClockPickerProps<TDate>) => JSX.Element;
/**
 *
 * Demos:
 *
 * - [Time Picker](https://material-ui.com/components/time-picker/)
 *
 * API:
 *
 * - [ClockPicker API](https://material-ui.com/api/clock-picker/)
 */
export default _default;
