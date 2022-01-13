import * as React from 'react';
import { SlideDirection } from './PickersSlideTransition';
import { DateValidationProps } from '../internal/pickers/date-utils';
import { ExportedArrowSwitcherProps } from '../internal/pickers/PickersArrowSwitcher';
import { CalendarPickerView } from './shared';
export declare type ExportedCalendarHeaderProps<TDate> = Pick<PickersCalendarHeaderProps<TDate>, 'components' | 'componentsProps' | 'getViewSwitchingButtonText' | 'leftArrowButtonText' | 'rightArrowButtonText'>;
export interface PickersCalendarHeaderProps<TDate> extends ExportedArrowSwitcherProps, Omit<DateValidationProps<TDate>, 'shouldDisableDate'> {
    /**
     * The components used for each slot.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    components?: ExportedArrowSwitcherProps['components'] & {
        SwitchViewButton?: React.ElementType;
        SwitchViewIcon?: React.ElementType;
    };
    /**
     * The props used for each slot inside.
     * @default {}
     */
    componentsProps?: ExportedArrowSwitcherProps['componentsProps'] & {
        switchViewButton?: any;
    };
    currentMonth: TDate;
    views: readonly CalendarPickerView[];
    /**
     * Get aria-label text for switching between views button.
     */
    getViewSwitchingButtonText?: (currentView: CalendarPickerView) => string;
    onMonthChange: (date: TDate, slideDirection: SlideDirection) => void;
    openView: CalendarPickerView;
    reduceAnimations: boolean;
    onViewChange?: (view: CalendarPickerView) => void;
}
/**
 * @ignore - do not document.
 */
declare function PickersCalendarHeader<TDate>(props: PickersCalendarHeaderProps<TDate>): JSX.Element | null;
export default PickersCalendarHeader;
