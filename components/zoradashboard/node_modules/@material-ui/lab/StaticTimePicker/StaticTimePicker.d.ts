import * as React from 'react';
import { BaseTimePickerProps } from '../TimePicker/shared';
import { StaticWrapperProps } from '../internal/pickers/wrappers/StaticWrapper';
export interface StaticTimePickerProps<TDate = unknown> extends BaseTimePickerProps<TDate> {
    /**
     * Force static wrapper inner components to be rendered in mobile or desktop mode.
     * @default 'mobile'
     */
    displayStaticWrapperAs?: StaticWrapperProps['displayStaticWrapperAs'];
}
declare type StaticTimePickerComponent = (<TDate>(props: StaticTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
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
 * - [StaticTimePicker API](https://material-ui.com/api/static-time-picker/)
 */
declare const StaticTimePicker: StaticTimePickerComponent;
export default StaticTimePicker;
