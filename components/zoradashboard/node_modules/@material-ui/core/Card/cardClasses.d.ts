export interface CardClasses {
    /** Styles applied to the root element. */
    root: string;
}
export declare type CardClassKey = keyof CardClasses;
export declare function getCardUtilityClass(slot: string): string;
declare const cardClasses: CardClasses;
export default cardClasses;
