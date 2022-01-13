export interface TableBodyClasses {
    /** Styles applied to the root element. */
    root: string;
}
export declare type TableBodyClassKey = keyof TableBodyClasses;
export declare function getTableBodyUtilityClass(slot: string): string;
declare const tableBodyClasses: TableBodyClasses;
export default tableBodyClasses;
