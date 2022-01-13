import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { Theme } from '@material-ui/core/styles';
import { PickersDayProps } from '../PickersDay/PickersDay';
export interface DateRangePickerDayClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `isHighlighting=true` and `outsideCurrentMonth=false`. */
    rangeIntervalDayHighlight: string;
    /** Styles applied to the root element if `isStartOfHighlighting=true` or `day` is the start of the month. */
    rangeIntervalDayHighlightStart: string;
    /** Styles applied to the root element if `isEndOfHighlighting=true` or `day` is the end of the month. */
    rangeIntervalDayHighlightEnd: string;
    /** Styles applied to the preview element. */
    rangeIntervalPreview: string;
    /** Styles applied to the root element if `isPreviewing=true` and `outsideCurrentMonth=false`. */
    rangeIntervalDayPreview: string;
    /** Styles applied to the root element if `isStartOfPreviewing=true` or `day` is the start of the month. */
    rangeIntervalDayPreviewStart: string;
    /** Styles applied to the root element if `isEndOfPreviewing=true` or `day` is the end of the month. */
    rangeIntervalDayPreviewEnd: string;
    /** Styles applied to the day element. */
    day: string;
    /** Styles applied to the day element if `isHighlighting=false`. */
    dayOutsideRangeInterval: string;
    /** Styles applied to the day element if `selected=false` and `isHighlighting=true`. */
    dayInsideRangeInterval: string;
    /** Styles applied to the day element if `selected=false`. */
    notSelectedDate: string;
}
export declare type DateRangePickerDayClassKey = keyof DateRangePickerDayClasses;
export interface DateRangePickerDayProps<TDate> extends Omit<PickersDayProps<TDate>, 'classes'> {
    /**
     * Set to `true` if the `day` is in a highlighted date range.
     */
    isHighlighting: boolean;
    /**
     * Set to `true` if the `day` is the end of a highlighted date range.
     */
    isEndOfHighlighting: boolean;
    /**
     * Set to `true` if the `day` is the start of a highlighted date range.
     */
    isStartOfHighlighting: boolean;
    /**
     * Set to `true` if the `day` is in a preview date range.
     */
    isPreviewing: boolean;
    /**
     * Set to `true` if the `day` is the start of a highlighted date range.
     */
    isEndOfPreviewing: boolean;
    /**
     * Set to `true` if the `day` is the end of a highlighted date range.
     */
    isStartOfPreviewing: boolean;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<DateRangePickerDayClasses>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
}
export declare function getDateRangePickerDayUtilityClass(slot: string): string;
export declare const dateRangePickerDayClasses: DateRangePickerDayClasses;
declare const _default: <TDate>(props: DateRangePickerDayProps<TDate> & React.RefAttributes<HTMLButtonElement>) => JSX.Element;
/**
 *
 * Demos:
 *
 * - [Date Range Picker](https://material-ui.com/components/date-range-picker/)
 *
 * API:
 *
 * - [DateRangePickerDay API](https://material-ui.com/api/date-range-picker-day/)
 */
export default _default;
