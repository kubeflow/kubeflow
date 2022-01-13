import * as React from 'react';
import { BaseDateTimePickerProps } from '../DateTimePicker/shared';
import { MobileWrapperProps } from '../internal/pickers/wrappers/MobileWrapper';
export interface MobileDateTimePickerProps<TDate = unknown> extends BaseDateTimePickerProps<TDate>, MobileWrapperProps {
}
declare type MobileDateTimePickerComponent = (<TDate>(props: MobileDateTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
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
 * - [MobileDateTimePicker API](https://material-ui.com/api/mobile-date-time-picker/)
 */
declare const MobileDateTimePicker: MobileDateTimePickerComponent;
export default MobileDateTimePicker;
