export interface RatingClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `size="small"`. */
    sizeSmall: string;
    /** Styles applied to the root element if `size="medium"`. */
    sizeMedium: string;
    /** Styles applied to the root element if `size="large"`. */
    sizeLarge: string;
    /** Styles applied to the root element if `readOnly={true}`. */
    readOnly: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: string;
    /** Pseudo-class applied to the root element if keyboard focused. */
    focusVisible: string;
    /** Visually hide an element. */
    visuallyHidden: string;
    /** Styles applied to the label elements. */
    label: string;
    /** Styles applied to the label of the "no value" input when it is active. */
    labelEmptyValueActive: string;
    /** Styles applied to the icon wrapping elements. */
    icon: string;
    /** Styles applied to the icon wrapping elements when empty. */
    iconEmpty: string;
    /** Styles applied to the icon wrapping elements when filled. */
    iconFilled: string;
    /** Styles applied to the icon wrapping elements when hover. */
    iconHover: string;
    /** Styles applied to the icon wrapping elements when focus. */
    iconFocus: string;
    /** Styles applied to the icon wrapping elements when active. */
    iconActive: string;
    /** Styles applied to the icon wrapping elements when decimals are necessary. */
    decimal: string;
}
export declare type RatingClassKey = keyof RatingClasses;
export declare function getRatingUtilityClass(slot: string): string;
declare const ratingClasses: RatingClasses;
export default ratingClasses;
