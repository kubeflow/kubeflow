export interface PaginationClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the ul element. */
    ul: string;
    /** Styles applied to the root element if `variant="outlined"`. */
    outlined: string;
    /** Styles applied to the root element if `variant="text"`. */
    text: string;
}
export declare type PaginationClassKey = keyof PaginationClasses;
export declare function getPaginationUtilityClass(slot: string): string;
declare const paginationClasses: PaginationClasses;
export default paginationClasses;
