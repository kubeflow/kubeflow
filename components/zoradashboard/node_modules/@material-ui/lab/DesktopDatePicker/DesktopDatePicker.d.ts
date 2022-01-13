import * as React from 'react';
import { BaseDatePickerProps } from '../DatePicker/shared';
import { DesktopWrapperProps } from '../internal/pickers/wrappers/DesktopWrapper';
export interface DesktopDatePickerProps<TDate = unknown> extends BaseDatePickerProps<TDate>, DesktopWrapperProps {
}
declare type DesktopDatePickerComponent = (<TDate>(props: DesktopDatePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
/**
 *
 * Demos:
 *
 * - [Date Picker](https://material-ui.com/components/date-picker/)
 *
 * API:
 *
 * - [DesktopDatePicker API](https://material-ui.com/api/desktop-date-picker/)
 */
declare const DesktopDatePicker: DesktopDatePickerComponent;
export default DesktopDatePicker;
