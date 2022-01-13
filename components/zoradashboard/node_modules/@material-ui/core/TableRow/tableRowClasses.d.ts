export interface TableRowClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Pseudo-class applied to the root element if `selected={true}`. */
    selected: string;
    /** Pseudo-class applied to the root element if `hover={true}`. */
    hover: string;
    /** Styles applied to the root element if table variant="head". */
    head: string;
    /** Styles applied to the root element if table variant="footer". */
    footer: string;
}
export declare type TableRowClassKey = keyof TableRowClasses;
export declare function getTableRowUtilityClass(slot: string): string;
declare const tableRowClasses: TableRowClasses;
export default tableRowClasses;
