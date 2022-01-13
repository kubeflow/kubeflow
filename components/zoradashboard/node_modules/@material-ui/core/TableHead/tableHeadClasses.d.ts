export interface TableHeadClasses {
    /** Styles applied to the root element. */
    root: string;
}
export declare type TableHeadClassKey = keyof TableHeadClasses;
export declare function getTableHeadUtilityClass(slot: string): string;
declare const tableHeadClasses: TableHeadClasses;
export default tableHeadClasses;
