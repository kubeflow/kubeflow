import * as React from 'react';
import { PaperProps as MuiPaperProps } from '@material-ui/core/Paper';
import { PopperProps as MuiPopperProps } from '@material-ui/core/Popper';
import { TrapFocusProps as MuiTrapFocusProps } from '@material-ui/core/Unstable_TrapFocus';
import { TransitionProps as MuiTransitionProps } from '@material-ui/core/transitions';
export interface ExportedPickerPopperProps {
    /**
     * Popper props passed down to [Popper](https://material-ui.com/api/popper/) component.
     */
    PopperProps?: Partial<MuiPopperProps>;
    /**
     * Custom component for popper [Transition](https://material-ui.com/components/transitions/#transitioncomponent-prop).
     */
    TransitionComponent?: React.JSXElementConstructor<MuiTransitionProps>;
}
export interface PickerPopperProps extends ExportedPickerPopperProps, MuiPaperProps {
    role: 'tooltip' | 'dialog';
    TrapFocusProps?: Partial<MuiTrapFocusProps>;
    anchorEl: MuiPopperProps['anchorEl'];
    open: MuiPopperProps['open'];
    containerRef?: React.Ref<HTMLDivElement>;
    onClose: () => void;
}
declare const PickersPopper: (props: PickerPopperProps) => JSX.Element;
export default PickersPopper;
