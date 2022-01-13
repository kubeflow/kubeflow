export interface TabScrollButtonClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `orientation="vertical"`. */
    vertical: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: string;
}
export declare type TabScrollButtonClassKey = keyof TabScrollButtonClasses;
export declare function getTabScrollButtonUtilityClass(slot: string): string;
declare const tabScrollButtonClasses: TabScrollButtonClasses;
export default tabScrollButtonClasses;
