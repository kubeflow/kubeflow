import { TransitionProps as _TransitionProps, TransitionActions } from 'react-transition-group/Transition';
import * as React from 'react';
export declare type TransitionHandlerKeys = 'onEnter' | 'onEntering' | 'onEntered' | 'onExit' | 'onExiting' | 'onExited';
export declare type TransitionHandlerProps = Pick<_TransitionProps, TransitionHandlerKeys>;
export interface EasingProps {
    easing: string | {
        enter?: string;
        exit?: string;
    };
}
export declare type TransitionKeys = 'in' | 'mountOnEnter' | 'unmountOnExit' | 'timeout' | 'easing' | 'addEndListener' | TransitionHandlerKeys;
export interface TransitionProps extends TransitionActions, Partial<Pick<_TransitionProps & EasingProps, TransitionKeys>> {
    style?: React.CSSProperties;
}
