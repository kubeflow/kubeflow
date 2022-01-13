export interface IconButtonClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `edge="start"`. */
    edgeStart: string;
    /** Styles applied to the root element if `edge="end"`. */
    edgeEnd: string;
    /** Styles applied to the root element if `color="inherit"`. */
    colorInherit: string;
    /** Styles applied to the root element if `color="primary"`. */
    colorPrimary: string;
    /** Styles applied to the root element if `color="secondary"`. */
    colorSecondary: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: string;
    /** Styles applied to the root element if `size="small"`. */
    sizeSmall: string;
    /** Styles applied to the root element if `size="medium"`. */
    sizeMedium: string;
    /** Styles applied to the root element if `size="large"`. */
    sizeLarge: string;
}
export declare type IconButtonClassKey = keyof IconButtonClasses;
export declare function getIconButtonUtilityClass(slot: string): string;
declare const iconButtonClasses: IconButtonClasses;
export default iconButtonClasses;
