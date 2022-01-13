import * as React from 'react';
export interface ClockNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
    'aria-label': string;
    disabled: boolean;
    /**
     * Make sure callers pass an id which. It should be defined if selected.
     */
    id: string | undefined;
    index: number;
    inner: boolean;
    label: string;
    selected: boolean;
}
export declare const classes: Record<"selected" | "disabled", string>;
/**
 * @ignore - internal component.
 */
declare function ClockNumber(props: ClockNumberProps): JSX.Element;
export default ClockNumber;
