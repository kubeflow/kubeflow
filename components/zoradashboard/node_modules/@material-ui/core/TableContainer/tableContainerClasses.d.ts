export interface TableContainerClasses {
    /** Styles applied to the root element. */
    root: string;
}
export declare type TableContainerClassKey = keyof TableContainerClasses;
export declare function getTableContainerUtilityClass(slot: string): string;
declare const tableContainerClasses: TableContainerClasses;
export default tableContainerClasses;
