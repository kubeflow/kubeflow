import * as React from 'react';
import { BaseDateTimePickerProps } from '../DateTimePicker/shared';
import { StaticWrapperProps } from '../internal/pickers/wrappers/StaticWrapper';
export interface StaticDateTimePickerProps<TDate = unknown> extends BaseDateTimePickerProps<TDate> {
    /**
     * Force static wrapper inner components to be rendered in mobile or desktop mode.
     * @default 'mobile'
     */
    displayStaticWrapperAs?: StaticWrapperProps['displayStaticWrapperAs'];
}
declare type StaticDateTimePickerComponent = (<TDate>(props: StaticDateTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
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
 * - [StaticDateTimePicker API](https://material-ui.com/api/static-date-time-picker/)
 */
declare const StaticDateTimePicker: StaticDateTimePickerComponent;
export default StaticDateTimePicker;
