import * as React from 'react';
import { WrapperVariant } from '../wrappers/WrapperVariantContext';
import { DateInputPropsLike } from '../wrappers/WrapperProps';
import { PickerSelectionState } from '../hooks/usePickerState';
import { BasePickerProps, CalendarAndClockProps } from '../typings/BasePicker';
import { AllAvailableViews } from '../typings/Views';
export interface ExportedPickerProps extends Omit<BasePickerProps<unknown, unknown>, 'value' | 'onChange'>, CalendarAndClockProps<unknown> {
    dateRangeIcon?: React.ReactNode;
    /**
     * First view to show.
     */
    openTo?: AllAvailableViews;
    timeIcon?: React.ReactNode;
    /**
     * Array of views to show.
     */
    views?: readonly AllAvailableViews[];
}
export interface PickerProps<TDateValue = any> extends ExportedPickerProps {
    autoFocus?: boolean;
    date: TDateValue;
    DateInputProps: DateInputPropsLike;
    isMobileKeyboardViewOpen: boolean;
    onDateChange: (date: TDateValue, currentWrapperVariant: WrapperVariant, isFinish?: PickerSelectionState) => void;
    toggleMobileKeyboardView: () => void;
}
export declare const MobileKeyboardInputView: import("@material-ui/system").StyledComponent<{
    theme?: import("@material-ui/core/styles").Theme | undefined;
    as?: React.ElementType<any> | undefined;
    sx?: import("@material-ui/system").SxProps<import("@material-ui/core/styles").Theme> | undefined;
}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
declare function Picker(props: PickerProps): JSX.Element;
export default Picker;
