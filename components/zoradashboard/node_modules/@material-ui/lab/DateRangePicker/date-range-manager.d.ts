import { DateRange } from './RangeTypes';
import { MuiPickersAdapter } from '../internal/pickers/hooks/useUtils';
interface CalculateRangeChangeOptions<TDate> {
    utils: MuiPickersAdapter<TDate>;
    range: DateRange<TDate>;
    newDate: TDate;
    currentlySelectingRangeEnd: 'start' | 'end';
}
export declare function calculateRangeChange<TDate>({ utils, range, newDate: selectedDate, currentlySelectingRangeEnd, }: CalculateRangeChangeOptions<TDate>): {
    nextSelection: 'start' | 'end';
    newRange: DateRange<TDate>;
};
export declare function calculateRangePreview<TDate>(options: CalculateRangeChangeOptions<TDate>): DateRange<TDate>;
export {};
