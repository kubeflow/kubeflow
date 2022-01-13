import * as React from 'react';
import { ClockView } from './shared';
export interface ClockPointerProps extends React.HTMLAttributes<HTMLDivElement> {
    hasSelected: boolean;
    isInner: boolean;
    type: ClockView;
    value: number;
}
/**
 * @ignore - internal component.
 */
declare class ClockPointer extends React.Component<ClockPointerProps> {
    static getDerivedStateFromProps: (nextProps: ClockPointerProps, state: ClockPointer['state']) => {
        toAnimateTransform: boolean;
        previousType: ClockView;
    };
    state: {
        toAnimateTransform: boolean;
        previousType: undefined;
    };
    render(): JSX.Element;
}
export default ClockPointer;
