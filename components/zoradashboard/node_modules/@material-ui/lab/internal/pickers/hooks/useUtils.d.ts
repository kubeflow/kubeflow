export declare type MuiPickersAdapter<TDate = unknown> = import('../../../LocalizationProvider').MuiPickersAdapter<TDate>;
export declare function useUtils<T = unknown>(): import("../../../LocalizationProvider").MuiPickersAdapter<T>;
export declare function useDefaultDates<T>(): {
    minDate: T;
    maxDate: T;
};
export declare function useNow<TDate = unknown>(): TDate;
