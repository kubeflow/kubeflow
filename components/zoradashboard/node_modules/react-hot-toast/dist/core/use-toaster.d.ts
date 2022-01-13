import { DefaultToastOptions, Toast } from './types';
export declare const useToaster: (toastOptions?: DefaultToastOptions | undefined) => {
    toasts: Toast[];
    handlers: {
        startPause: () => void;
        endPause: () => void;
        updateHeight: (toastId: string, height: number) => void;
        calculateOffset: (toast: Toast, opts?: {
            reverseOrder?: boolean | undefined;
            gutter?: number | undefined;
            defaultPosition?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right" | undefined;
        } | undefined) => number;
    };
};
