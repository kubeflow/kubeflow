import * as React from 'react';
export interface YearProps {
    autoFocus?: boolean;
    children: React.ReactNode;
    classes?: {
        root?: string;
        modeDesktop?: string;
        modeMobile?: string;
        yearButton?: string;
        disabled?: string;
        selected?: string;
    };
    className?: string;
    disabled?: boolean;
    forwardedRef?: React.Ref<HTMLButtonElement>;
    onClick: (event: React.MouseEvent, value: number) => void;
    onKeyDown: (event: React.KeyboardEvent, value: number) => void;
    selected: boolean;
    value: number;
}
export declare function getPickersYearUtilityClass(slot: string): string;
export declare type PickersYearClassKey = keyof NonNullable<YearProps['classes']>;
export declare const pickersYearClasses: Record<"root" | "selected" | "disabled" | "modeDesktop" | "modeMobile" | "yearButton", string>;
/**
 * @ignore - internal component.
 */
declare const PickersYear: React.ForwardRefExoticComponent<YearProps & React.RefAttributes<HTMLButtonElement>>;
export default PickersYear;
