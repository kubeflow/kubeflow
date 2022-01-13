export interface ScopedCssBaselineClasses {
    /** Styles applied to the root element. */
    root: string;
}
export declare type ScopedCssBaselineClassKey = keyof ScopedCssBaselineClasses;
export declare function getScopedCssBaselineUtilityClass(slot: string): string;
declare const scopedCssBaselineClasses: Record<"root", string>;
export default scopedCssBaselineClasses;
