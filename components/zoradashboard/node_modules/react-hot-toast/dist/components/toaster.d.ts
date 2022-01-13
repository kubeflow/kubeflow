import * as React from 'react';
import { ToastPosition, DefaultToastOptions, Toast } from '../core/types';
interface ToasterProps {
    position?: ToastPosition;
    toastOptions?: DefaultToastOptions;
    reverseOrder?: boolean;
    gutter?: number;
    containerStyle?: React.CSSProperties;
    containerClassName?: string;
    children?: (toast: Toast) => JSX.Element;
}
export declare const Toaster: React.FC<ToasterProps>;
export {};
