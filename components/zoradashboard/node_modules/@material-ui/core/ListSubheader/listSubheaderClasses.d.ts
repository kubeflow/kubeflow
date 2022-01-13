export interface ListSubheaderClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `color="primary"`. */
    colorPrimary: string;
    /** Styles applied to the root element if `color="inherit"`. */
    colorInherit: string;
    /** Styles applied to the inner `component` element unless `disableGutters={true}`. */
    gutters: string;
    /** Styles applied to the root element if `inset={true}`. */
    inset: string;
    /** Styles applied to the root element unless `disableSticky={true}`. */
    sticky: string;
}
export declare type ListSubheaderClassKey = keyof ListSubheaderClasses;
export declare function getListSubheaderUtilityClass(slot: string): string;
declare const listSubheaderClasses: ListSubheaderClasses;
export default listSubheaderClasses;
