import * as React from 'react';
import { ToolbarComponentProps } from '../internal/pickers/typings/BasePicker';
export interface TimePickerToolbarClasses {
    separator: string;
    hourMinuteLabel: string;
    hourMinuteLabelLandscape: string;
    hourMinuteLabelReverse: string;
    ampmSelection: string;
    ampmLandscape: string;
    ampmLabel: string;
    penIconLandscape: string;
}
export interface TimePickerToolbarProps extends ToolbarComponentProps {
    classes?: Partial<TimePickerToolbarClasses>;
}
export declare type TimePickerToolbarClassKey = keyof TimePickerToolbarClasses;
export declare function getTimePickerToolbarUtilityClass(slot: string): string;
export declare const timePickerToolbarClasses: TimePickerToolbarClasses;
/**
 * @ignore - internal component.
 */
declare const TimePickerToolbar: React.FC<ToolbarComponentProps>;
export default TimePickerToolbar;
