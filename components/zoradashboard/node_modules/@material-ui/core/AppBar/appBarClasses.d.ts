export interface AppBarClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `position="fixed"`. */
    positionFixed: string;
    /** Styles applied to the root element if `position="absolute"`. */
    positionAbsolute: string;
    /** Styles applied to the root element if `position="sticky"`. */
    positionSticky: string;
    /** Styles applied to the root element if `position="static"`. */
    positionStatic: string;
    /** Styles applied to the root element if `position="relative"`. */
    positionRelative: string;
    /** Styles applied to the root element if `color="default"`. */
    colorDefault: string;
    /** Styles applied to the root element if `color="primary"`. */
    colorPrimary: string;
    /** Styles applied to the root element if `color="secondary"`. */
    colorSecondary: string;
    /** Styles applied to the root element if `color="inherit"`. */
    colorInherit: string;
    /** Styles applied to the root element if `color="transparent"`. */
    colorTransparent: string;
}
export declare type AppBarClassKey = keyof AppBarClasses;
export declare function getAppBarUtilityClass(slot: string): string;
declare const appBarClasses: AppBarClasses;
export default appBarClasses;
