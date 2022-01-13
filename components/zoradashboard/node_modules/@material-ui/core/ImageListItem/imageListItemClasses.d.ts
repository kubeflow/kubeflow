export interface ImageListItemClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to an `img` element to ensure it covers the item. */
    img: string;
    /** Styles applied to the root element if `variant="standard"`. */
    standard: string;
    /** Styles applied to the root element if `variant="woven"`. */
    woven: string;
    /** Styles applied to the root element if `variant="masonry"`. */
    masonry: string;
    /** Styles applied to the root element if `variant="quilted"`. */
    quilted: string;
}
export declare type ImageListItemClassKey = keyof ImageListItemClasses;
export declare function getImageListItemUtilityClass(slot: string): string;
declare const imageListItemClasses: ImageListItemClasses;
export default imageListItemClasses;
