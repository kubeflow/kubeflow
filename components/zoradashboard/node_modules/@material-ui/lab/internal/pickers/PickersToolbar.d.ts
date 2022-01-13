import * as React from 'react';
import { ToolbarComponentProps } from './typings/BasePicker';
export interface PickersToolbarProps extends Pick<ToolbarComponentProps, 'getMobileKeyboardInputViewButtonText' | 'isMobileKeyboardViewOpen' | 'toggleMobileKeyboardView'> {
    className?: string;
    viewType?: 'calendar' | 'clock';
    isLandscape: boolean;
    landscapeDirection?: 'row' | 'column';
    penIconClassName?: string;
    toolbarTitle: React.ReactNode;
}
declare const PickersToolbar: React.ForwardRefExoticComponent<PickersToolbarProps & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>>;
export default PickersToolbar;
