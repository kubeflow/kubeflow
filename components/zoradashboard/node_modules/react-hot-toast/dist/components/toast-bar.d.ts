import * as React from 'react';
import { Toast, ToastPosition, Renderable } from '../core/types';
interface ToastBarProps {
    toast: Toast;
    position?: ToastPosition;
    style?: React.CSSProperties;
    children?: (components: {
        icon: Renderable;
        message: Renderable;
    }) => Renderable;
}
export declare const ToastBar: React.FC<ToastBarProps>;
export {};
