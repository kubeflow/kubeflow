export interface CardHeaderClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the avatar element. */
    avatar: string;
    /** Styles applied to the action element. */
    action: string;
    /** Styles applied to the content wrapper element. */
    content: string;
    /** Styles applied to the title Typography element. */
    title: string;
    /** Styles applied to the subheader Typography element. */
    subheader: string;
}
export declare type CardHeaderClassKey = keyof CardHeaderClasses;
export declare function getCardHeaderUtilityClass(slot: string): string;
declare const cardHeaderClasses: CardHeaderClasses;
export default cardHeaderClasses;
