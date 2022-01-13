import { PickerSelectionState } from './usePickerState';
import { AllAvailableViews } from '../typings/Views';
export declare type PickerOnChangeFn<TDate> = (date: TDate | null, selectionState?: PickerSelectionState) => void;
interface UseViewsOptions<TDate, View extends AllAvailableViews> {
    onChange: PickerOnChangeFn<TDate>;
    onViewChange?: (newView: View) => void;
    openTo?: View;
    view: View | undefined;
    views: readonly View[];
}
export declare function useViews<TDate, View extends AllAvailableViews>({ onChange, onViewChange, openTo, view, views, }: UseViewsOptions<TDate, View>): {
    handleChangeAndOpenNext: (date: TDate, currentViewSelectionState?: PickerSelectionState | undefined) => void;
    nextView: View;
    previousView: View;
    openNext: () => void;
    openView: View;
    setOpenView: (newView: View) => void;
};
export {};
