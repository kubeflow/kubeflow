import * as React from 'react';
import { DesktopDateTimePickerProps } from '../DesktopDateTimePicker';
import { MobileDateTimePickerProps } from '../MobileDateTimePicker';
export interface DateTimePickerProps<TDate = unknown> extends DesktopDateTimePickerProps<TDate>, MobileDateTimePickerProps<TDate> {
    /**
     * CSS media query when `Mobile` mode will be changed to `Desktop`.
     * @default '@media (pointer: fine)'
     * @example '@media (min-width: 720px)' or theme.breakpoints.up("sm")
     */
    desktopModeMediaQuery?: string;
}
declare type DateTimePickerComponent = (<TDate>(props: DateTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
/**
 *
 * Demos:
 *
 * - [Date Time Picker](https://material-ui.com/components/date-time-picker/)
 * - [Pickers](https://material-ui.com/components/pickers/)
 *
 * API:
 *
 * - [DateTimePicker API](https://material-ui.com/api/date-time-picker/)
 */
declare const DateTimePicker: DateTimePickerComponent;
export default DateTimePicker;
