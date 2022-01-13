export interface ImageListClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `variant="masonry"`. */
    masonry: string;
    /** Styles applied to the root element if `variant="quilted"`. */
    quilted: string;
    /** Styles applied to the root element if `variant="standard"`. */
    standard: string;
    /** Styles applied to the root element if `variant="woven"`. */
    woven: string;
}
export declare type ImageListClassKey = keyof ImageListClasses;
export declare function getImageListUtilityClass(slot: string): string;
declare const imageListClasses: ImageListClasses;
export default imageListClasses;
