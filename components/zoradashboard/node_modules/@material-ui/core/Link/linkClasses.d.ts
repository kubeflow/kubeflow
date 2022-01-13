export interface LinkClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `underline="none"`. */
    underlineNone: string;
    /** Styles applied to the root element if `underline="hover"`. */
    underlineHover: string;
    /** Styles applied to the root element if `underline="always"`. */
    underlineAlways: string;
    /** Styles applied to the root element if `component="button"`. */
    button: string;
    /** Pseudo-class applied to the root element if the link is keyboard focused. */
    focusVisible: string;
}
export declare type LinkClassKey = keyof LinkClasses;
export declare function getLinkUtilityClass(slot: string): string;
declare const linkClasses: LinkClasses;
export default linkClasses;
