export interface IconClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `color="primary"`. */
    colorPrimary: string;
    /** Styles applied to the root element if `color="secondary"`. */
    colorSecondary: string;
    /** Styles applied to the root element if `color="action"`. */
    colorAction: string;
    /** Styles applied to the root element if `color="error"`. */
    colorError: string;
    /** Styles applied to the root element if `color="disabled"`. */
    colorDisabled: string;
    /** Styles applied to the root element if `fontSize="inherit"`. */
    fontSizeInherit: string;
    /** Styles applied to the root element if `fontSize="small"`. */
    fontSizeSmall: string;
    /** Styles applied to the root element if `fontSize="large"`. */
    fontSizeLarge: string;
}
export declare type IconClassKey = keyof IconClasses;
export declare function getIconUtilityClass(slot: string): string;
declare const iconClasses: IconClasses;
export default iconClasses;
