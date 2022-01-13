import { Renderable, Toast, ToastOptions, DefaultToastOptions, ValueOrFunction } from './types';
declare type Message = ValueOrFunction<Renderable, Toast>;
declare type ToastHandler = (message: Message, options?: ToastOptions) => string;
declare const toast: {
    (message: Message, opts?: Partial<Pick<Toast, "id" | "icon" | "duration" | "ariaProps" | "className" | "style" | "position" | "iconTheme">> | undefined): string;
    error: ToastHandler;
    success: ToastHandler;
    loading: ToastHandler;
    custom: ToastHandler;
    dismiss(toastId?: string | undefined): void;
    remove(toastId?: string | undefined): void;
    promise<T>(promise: Promise<T>, msgs: {
        loading: Renderable;
        success: ValueOrFunction<Renderable, T>;
        error: ValueOrFunction<Renderable, any>;
    }, opts?: DefaultToastOptions | undefined): Promise<T>;
};
export { toast };
