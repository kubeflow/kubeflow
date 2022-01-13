import { CSSProperties } from 'react';
export declare type ToastType = 'success' | 'error' | 'loading' | 'blank' | 'custom';
export declare type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export declare type Renderable = JSX.Element | string | null;
export interface IconTheme {
    primary: string;
    secondary: string;
}
export declare type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export declare type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;
export declare const resolveValue: <TValue, TArg>(valOrFunction: ValueOrFunction<TValue, TArg>, arg: TArg) => TValue;
export interface Toast {
    type: ToastType;
    id: string;
    message: ValueOrFunction<Renderable, Toast>;
    icon?: Renderable;
    duration?: number;
    pauseDuration: number;
    position?: ToastPosition;
    ariaProps: {
        role: 'status' | 'alert';
        'aria-live': 'assertive' | 'off' | 'polite';
    };
    style?: CSSProperties;
    className?: string;
    iconTheme?: IconTheme;
    createdAt: number;
    visible: boolean;
    height?: number;
}
export declare type ToastOptions = Partial<Pick<Toast, 'id' | 'icon' | 'duration' | 'ariaProps' | 'className' | 'style' | 'position' | 'iconTheme'>>;
export declare type DefaultToastOptions = ToastOptions & {
    [key in ToastType]?: ToastOptions;
};
