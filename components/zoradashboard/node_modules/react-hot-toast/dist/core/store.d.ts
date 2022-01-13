import { DefaultToastOptions, Toast } from './types';
export declare enum ActionType {
    ADD_TOAST = 0,
    UPDATE_TOAST = 1,
    UPSERT_TOAST = 2,
    DISMISS_TOAST = 3,
    REMOVE_TOAST = 4,
    START_PAUSE = 5,
    END_PAUSE = 6
}
declare type Action = {
    type: ActionType.ADD_TOAST;
    toast: Toast;
} | {
    type: ActionType.UPSERT_TOAST;
    toast: Toast;
} | {
    type: ActionType.UPDATE_TOAST;
    toast: Partial<Toast>;
} | {
    type: ActionType.DISMISS_TOAST;
    toastId?: string;
} | {
    type: ActionType.REMOVE_TOAST;
    toastId?: string;
} | {
    type: ActionType.START_PAUSE;
    time: number;
} | {
    type: ActionType.END_PAUSE;
    time: number;
};
interface State {
    toasts: Toast[];
    pausedAt: number | undefined;
}
export declare const reducer: (state: State, action: Action) => State;
export declare const dispatch: (action: Action) => void;
export declare const useStore: (toastOptions?: DefaultToastOptions) => State;
export {};
