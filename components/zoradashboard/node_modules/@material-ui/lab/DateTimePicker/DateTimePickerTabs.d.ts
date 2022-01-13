import * as React from 'react';
import { DateTimePickerView } from './shared';
export interface DateTimePickerTabsProps {
    dateRangeIcon?: React.ReactNode;
    onChange: (view: DateTimePickerView) => void;
    timeIcon?: React.ReactNode;
    view: DateTimePickerView;
}
/**
 * @ignore - internal component.
 */
declare const DateTimePickerTabs: (props: DateTimePickerTabsProps) => JSX.Element;
export default DateTimePickerTabs;
