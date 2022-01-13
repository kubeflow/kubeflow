import * as React from 'react';
import { ClockPickerProps } from './ClockPicker';
import { ClockView } from './shared';
export interface ClockPickerStandaloneProps<TDate> extends Omit<ClockPickerProps<TDate>, 'view' | 'openNextView' | 'openPreviousView' | 'nextViewAvailable' | 'previousViewAvailable'> {
    className?: string;
    /**
     * Callback fired on view change.
     */
    onViewChange?: (view: ClockView) => void;
    /**
     * Initially opened view.
     */
    openTo?: ClockView;
    /**
     * Controlled clock view.
     */
    view?: ClockView;
    /**
     * Available views for clock.
     */
    views?: readonly ClockView[];
}
declare const _default: <TDate>(props: ClockPickerStandaloneProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element;
/**
 * Wrapping public API for better standalone usage of './ClockPicker'
 * @ignore - internal component.
 */
export default _default;
