import * as React from 'react';
import { BaseTimePickerProps } from '../TimePicker/shared';
import { DesktopWrapperProps } from '../internal/pickers/wrappers/DesktopWrapper';
export interface DesktopTimePickerProps<TDate = unknown> extends BaseTimePickerProps<TDate>, DesktopWrapperProps {
}
declare type DesktopTimePickerComponent = (<TDate>(props: DesktopTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
/**
 *
 * Demos:
 *
 * - [Time Picker](https://material-ui.com/components/time-picker/)
 *
 * API:
 *
 * - [DesktopTimePicker API](https://material-ui.com/api/desktop-time-picker/)
 */
declare const DesktopTimePicker: DesktopTimePickerComponent;
export default DesktopTimePicker;
