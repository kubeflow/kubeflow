import * as React from 'react';
import { BaseDatePickerProps } from '../DatePicker/shared';
import { StaticWrapperProps } from '../internal/pickers/wrappers/StaticWrapper';
export interface StaticDatePickerProps<TDate = unknown> extends BaseDatePickerProps<TDate> {
    /**
     * Force static wrapper inner components to be rendered in mobile or desktop mode.
     * @default 'mobile'
     */
    displayStaticWrapperAs?: StaticWrapperProps['displayStaticWrapperAs'];
}
declare type StaticDatePickerComponent = (<TDate>(props: StaticDatePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
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
 * - [StaticDatePicker API](https://material-ui.com/api/static-date-picker/)
 */
declare const StaticDatePicker: StaticDatePickerComponent;
export default StaticDatePicker;
