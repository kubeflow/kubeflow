import { ParseableDate } from '../constants/prop-types';
import { PickerOnChangeFn } from './useViews';
export declare type OverrideParseableDateProps<TDate, TProps, TKey extends keyof TProps> = Omit<TProps, TKey> & Partial<Record<TKey, ParseableDate<TDate>>>;
interface MonthValidationOptions {
    disablePast?: boolean;
    disableFuture?: boolean;
    minDate: unknown;
    maxDate: unknown;
}
export declare function useNextMonthDisabled(month: unknown, { disableFuture, maxDate }: Pick<MonthValidationOptions, 'disableFuture' | 'maxDate'>): boolean;
export declare function usePreviousMonthDisabled(month: unknown, { disablePast, minDate }: Pick<MonthValidationOptions, 'disablePast' | 'minDate'>): boolean;
export declare function useMeridiemMode<TDate>(date: TDate, ampm: boolean | undefined, onChange: PickerOnChangeFn<TDate>): {
    meridiemMode: "am" | "pm" | null;
    handleMeridiemChange: (mode: 'am' | 'pm') => void;
};
export {};
