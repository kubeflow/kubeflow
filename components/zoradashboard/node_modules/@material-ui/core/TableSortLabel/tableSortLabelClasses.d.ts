export interface TableSortLabelClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Pseudo-class applied to the root element if `active={true}`. */
    active: string;
    /** Styles applied to the icon component. */
    icon: string;
    /** Styles applied to the icon component if `direction="desc"`. */
    iconDirectionDesc: string;
    /** Styles applied to the icon component if `direction="asc"`. */
    iconDirectionAsc: string;
}
export declare type TableSortLabelClassKey = keyof TableSortLabelClasses;
export declare function getTableSortLabelUtilityClass(slot: string): string;
declare const tableSortLabelClasses: TableSortLabelClasses;
export default tableSortLabelClasses;
