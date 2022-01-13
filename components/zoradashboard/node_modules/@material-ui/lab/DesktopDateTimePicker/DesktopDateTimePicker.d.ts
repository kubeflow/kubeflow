import * as React from 'react';
import { BaseDateTimePickerProps } from '../DateTimePicker/shared';
import { DesktopWrapperProps } from '../internal/pickers/wrappers/DesktopWrapper';
export interface DesktopDateTimePickerProps<TDate = unknown> extends BaseDateTimePickerProps<TDate>, DesktopWrapperProps {
}
declare type DesktopDateTimePickerComponent = (<TDate>(props: DesktopDateTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
/**
 *
 * Demos:
 *
 * - [Date Time Picker](https://material-ui.com/components/date-time-picker/)
 *
 * API:
 *
 * - [DesktopDateTimePicker API](https://material-ui.com/api/desktop-date-time-picker/)
 */
declare const DesktopDateTimePicker: DesktopDateTimePickerComponent;
export default DesktopDateTimePicker;
