import * as React from 'react';
import { BaseDatePickerProps } from '../DatePicker/shared';
import { MobileWrapperProps } from '../internal/pickers/wrappers/MobileWrapper';
export interface MobileDatePickerProps<TDate = unknown> extends BaseDatePickerProps<TDate>, MobileWrapperProps {
}
declare type MobileDatePickerComponent = (<TDate>(props: MobileDatePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
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
 * - [MobileDatePicker API](https://material-ui.com/api/mobile-date-picker/)
 */
declare const MobileDatePicker: MobileDatePickerComponent;
export default MobileDatePicker;
