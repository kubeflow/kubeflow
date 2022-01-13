export interface DividerClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `absolute={true}`. */
    absolute: string;
    /** Styles applied to the root element if `variant="inset"`. */
    inset: string;
    /** Styles applied to the root element if `variant="fullWidth"`. */
    fullWidth: string;
    /** Styles applied to the root element if `light={true}`. */
    light: string;
    /** Styles applied to the root element if `variant="middle"`. */
    middle: string;
    /** Styles applied to the root element if `orientation="vertical"`. */
    vertical: string;
    /** Styles applied to the root element if `flexItem={true}`. */
    flexItem: string;
    /** Styles applied to the root element if divider have text. */
    withChildren: string;
    /** Styles applied to the root element if divider have text and `orientation="vertical"`. */
    withChildrenVertical: string;
    /** Styles applied to the root element if `textAlign="right" orientation="horizontal"`. */
    textAlignRight: string;
    /** Styles applied to the root element if `textAlign="left" orientation="horizontal"`. */
    textAlignLeft: string;
    /** Styles applied to the span children element if `orientation="horizontal"`. */
    wrapper: string;
    /** Styles applied to the span children element if `orientation="vertical"`. */
    wrapperVertical: string;
}
export declare type DividerClassKey = keyof DividerClasses;
export declare function getDividerUtilityClass(slot: string): string;
declare const dividerClasses: DividerClasses;
export default dividerClasses;
