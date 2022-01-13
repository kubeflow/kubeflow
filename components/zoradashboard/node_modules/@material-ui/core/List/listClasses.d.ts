export interface ListClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element unless `disablePadding={true}`. */
    padding: string;
    /** Styles applied to the root element if dense. */
    dense: string;
    /** Styles applied to the root element if a `subheader` is provided. */
    subheader: string;
}
export declare type ListClassKey = keyof ListClasses;
export declare function getListUtilityClass(slot: string): string;
declare const listClasses: ListClasses;
export default listClasses;
