import * as React from 'react';
/**
 * @ignore - internal component.
 */
declare const DatePickerToolbar: React.ForwardRefExoticComponent<import("../CalendarPicker/CalendarPicker").ExportedCalendarPickerProps<unknown> & import("../ClockPicker/ClockPicker").ExportedClockPickerProps<unknown> & {
    ampmInClock?: boolean | undefined;
    date: unknown;
    dateRangeIcon?: React.ReactNode;
    getMobileKeyboardInputViewButtonText?: (() => string) | undefined;
    hideTabs?: boolean | undefined;
    isLandscape: boolean;
    isMobileKeyboardViewOpen: boolean;
    onChange: import("../internal/pickers/hooks/useViews").PickerOnChangeFn<unknown>;
    openView: import("../internal/pickers/typings/Views").AllAvailableViews;
    setOpenView: (view: import("../internal/pickers/typings/Views").AllAvailableViews) => void;
    timeIcon?: React.ReactNode;
    toggleMobileKeyboardView: () => void;
    toolbarFormat?: string | undefined;
    toolbarPlaceholder?: React.ReactNode;
    toolbarTitle?: React.ReactNode;
    views: readonly import("../internal/pickers/typings/Views").AllAvailableViews[];
} & React.RefAttributes<HTMLDivElement>>;
export default DatePickerToolbar;
