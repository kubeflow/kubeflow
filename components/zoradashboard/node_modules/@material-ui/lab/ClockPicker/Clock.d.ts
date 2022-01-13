import * as React from 'react';
import { MuiPickersAdapter } from '../internal/pickers/hooks/useUtils';
import { PickerSelectionState } from '../internal/pickers/hooks/usePickerState';
import { useMeridiemMode } from '../internal/pickers/hooks/date-helpers-hooks';
import { ClockView } from './shared';
export interface ClockProps<TDate> extends ReturnType<typeof useMeridiemMode> {
    ampm: boolean;
    ampmInClock: boolean;
    autoFocus?: boolean;
    children: readonly React.ReactNode[];
    date: TDate | null;
    getClockLabelText: (view: ClockView, time: TDate | null, adapter: MuiPickersAdapter<TDate>) => string;
    isTimeDisabled: (timeValue: number, type: ClockView) => boolean;
    minutesStep?: number;
    onChange: (value: number, isFinish?: PickerSelectionState) => void;
    /**
     * DOM id that the selected option should have
     * Should only be `undefined` on the server
     */
    selectedId: string | undefined;
    type: ClockView;
    value: number;
}
/**
 * @ignore - internal component.
 */
declare function Clock<TDate>(props: ClockProps<TDate>): JSX.Element;
export default Clock;
