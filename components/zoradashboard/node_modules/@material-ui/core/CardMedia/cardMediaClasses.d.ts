export interface CardMediaClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `component="video, audio, picture, iframe, or img"`. */
    media: string;
    /** Styles applied to the root element if `component="picture or img"`. */
    img: string;
}
export declare type CardMediaClassKey = keyof CardMediaClasses;
export declare function getCardMediaUtilityClass(slot: string): string;
declare const cardMediaClasses: CardMediaClasses;
export default cardMediaClasses;
