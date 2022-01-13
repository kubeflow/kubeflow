import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { Theme } from '@material-ui/core/styles';
import { PickerOnChangeFn } from '../internal/pickers/hooks/useViews';
export interface MonthPickerProps<TDate> {
    /**
     * className applied to the root element.
     */
    className?: string;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
        /** Styles applied to the root element. */
        root?: string;
    };
    /** Date value for the MonthPicker */
    date: TDate | null;
    /** If `true` past days are disabled. */
    disablePast?: boolean | null;
    /** If `true` future days are disabled. */
    disableFuture?: boolean | null;
    /** Minimal selectable date. */
    minDate: TDate;
    /** Maximal selectable date. */
    maxDate: TDate;
    /** Callback fired on date change. */
    onChange: PickerOnChangeFn<TDate>;
    onMonthChange?: (date: TDate) => void | Promise<void>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
}
export declare function getMonthPickerUtilityClass(slot: string): string;
export declare type MonthPickerClassKey = keyof NonNullable<MonthPickerProps<unknown>['classes']>;
export declare const monthPickerClasses: Record<"root", string>;
declare const _default: <TDate>(props: MonthPickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element;
/**
 *
 * Demos:
 *
 * - [Date Picker](https://material-ui.com/components/date-picker/)
 *
 * API:
 *
 * - [MonthPicker API](https://material-ui.com/api/month-picker/)
 */
export default _default;
