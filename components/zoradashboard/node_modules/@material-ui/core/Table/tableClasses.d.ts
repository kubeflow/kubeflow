export interface TableClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `stickyHeader={true}`. */
    stickyHeader: string;
}
export declare type TableClassKey = keyof TableClasses;
export declare function getTableUtilityClass(slot: string): string;
declare const tableClasses: TableClasses;
export default tableClasses;
