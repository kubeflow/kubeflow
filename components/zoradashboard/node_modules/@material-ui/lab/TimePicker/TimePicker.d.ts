import * as React from 'react';
import { DesktopTimePickerProps } from '../DesktopTimePicker';
import { MobileTimePickerProps } from '../MobileTimePicker';
export interface TimePickerProps<TDate = unknown> extends DesktopTimePickerProps<TDate>, MobileTimePickerProps<TDate> {
    /**
     * CSS media query when `Mobile` mode will be changed to `Desktop`.
     * @default '@media (pointer: fine)'
     * @example '@media (min-width: 720px)' or theme.breakpoints.up("sm")
     */
    desktopModeMediaQuery?: string;
}
declare type TimePickerComponent = (<TDate>(props: TimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
/**
 *
 * Demos:
 *
 * - [Pickers](https://material-ui.com/components/pickers/)
 * - [Time Picker](https://material-ui.com/components/time-picker/)
 *
 * API:
 *
 * - [TimePicker API](https://material-ui.com/api/time-picker/)
 */
declare const TimePicker: TimePickerComponent;
export default TimePicker;
