export interface CardActionAreaClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Pseudo-class applied to the ButtonBase root element if the action area is keyboard focused. */
    focusVisible: string;
    /** Styles applied to the overlay that covers the action area when it is keyboard focused. */
    focusHighlight: string;
}
export declare type CardActionAreaClassKey = keyof CardActionAreaClasses;
export declare function getCardActionAreaUtilityClass(slot: string): string;
declare const cardActionAreaClasses: CardActionAreaClasses;
export default cardActionAreaClasses;
