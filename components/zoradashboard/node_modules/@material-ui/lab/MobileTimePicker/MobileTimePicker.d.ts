import * as React from 'react';
import { BaseTimePickerProps } from '../TimePicker/shared';
import { MobileWrapperProps } from '../internal/pickers/wrappers/MobileWrapper';
export interface MobileTimePickerProps<TDate = unknown> extends BaseTimePickerProps<TDate>, MobileWrapperProps {
}
declare type MobileTimePickerComponent = (<TDate>(props: MobileTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
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
 * - [MobileTimePicker API](https://material-ui.com/api/mobile-time-picker/)
 */
declare const MobileTimePicker: MobileTimePickerComponent;
export default MobileTimePicker;
