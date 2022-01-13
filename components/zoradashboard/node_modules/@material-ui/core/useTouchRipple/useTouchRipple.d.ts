import * as React from 'react';
import { TouchRippleActions } from '../ButtonBase/TouchRipple';
interface UseTouchRippleProps {
    disabled: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    disableTouchRipple?: boolean;
    focusVisible: boolean;
    rippleRef: React.RefObject<TouchRippleActions>;
}
interface RippleEventHandlers {
    onBlur: React.FocusEventHandler;
    onContextMenu: React.MouseEventHandler;
    onDragLeave: React.DragEventHandler;
    onKeyDown: React.KeyboardEventHandler;
    onKeyUp: React.KeyboardEventHandler;
    onMouseDown: React.MouseEventHandler;
    onMouseLeave: React.MouseEventHandler;
    onMouseUp: React.MouseEventHandler;
    onTouchEnd: React.TouchEventHandler;
    onTouchMove: React.TouchEventHandler;
    onTouchStart: React.TouchEventHandler;
}
declare const useTouchRipple: (props: UseTouchRippleProps) => {
    enableTouchRipple: boolean;
    getRippleHandlers: (otherEvents?: Partial<RippleEventHandlers>) => RippleEventHandlers;
};
export default useTouchRipple;
