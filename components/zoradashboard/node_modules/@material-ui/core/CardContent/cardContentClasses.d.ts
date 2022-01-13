export interface CardContentClasses {
    /** Styles applied to the root element. */
    root: string;
}
export declare type CardContentClassKey = keyof CardContentClasses;
export declare function getCardContentUtilityClass(slot: string): string;
declare const cardContentClasses: CardContentClasses;
export default cardContentClasses;
