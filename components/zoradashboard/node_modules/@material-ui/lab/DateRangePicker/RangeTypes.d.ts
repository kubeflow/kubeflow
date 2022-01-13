import { ParseableDate } from '../internal/pickers/constants/prop-types';
export declare type RangeInput<TDate> = [ParseableDate<TDate>, ParseableDate<TDate>];
export declare type DateRange<TDate> = [TDate | null, TDate | null];
export declare type NonEmptyDateRange<TDate> = [TDate, TDate];
export interface CurrentlySelectingRangeEndProps {
    currentlySelectingRangeEnd: 'start' | 'end';
    setCurrentlySelectingRangeEnd: (newSelectingEnd: 'start' | 'end') => void;
}
