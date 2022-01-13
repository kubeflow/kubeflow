export interface ImageListItemBarClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `position="bottom"`. */
    positionBottom: string;
    /** Styles applied to the root element if `position="top"`. */
    positionTop: string;
    /** Styles applied to the root element if `position="below"`. */
    positionBelow: string;
    /** Styles applied to the title and subtitle container element. */
    titleWrap: string;
    /** Styles applied to the title and subtitle container element if `position="below"`. */
    titleWrapBelow: string;
    /** Styles applied to the container element if `actionPosition="left"`. */
    titleWrapActionPosLeft: string;
    /** Styles applied to the container element if `actionPosition="right"`. */
    titleWrapActionPosRight: string;
    /** Styles applied to the title container element. */
    title: string;
    /** Styles applied to the subtitle container element. */
    subtitle: string;
    /** Styles applied to the actionIcon if supplied. */
    actionIcon: string;
    /** Styles applied to the actionIcon if `actionPosition="left"`. */
    actionIconActionPosLeft: string;
}
export declare type ImageListItemBarClassKey = keyof ImageListItemBarClasses;
export declare function getImageListItemBarUtilityClass(slot: string): string;
declare const imageListItemBarClasses: ImageListItemBarClasses;
export default imageListItemBarClasses;
