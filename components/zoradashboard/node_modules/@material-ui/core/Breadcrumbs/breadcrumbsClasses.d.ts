export interface BreadcrumbsClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the ol element. */
    ol: string;
    /** Styles applied to the li element. */
    li: string;
    /** Styles applied to the separator element. */
    separator: string;
}
export declare type BreadcrumbsClassKey = keyof BreadcrumbsClasses;
export declare function getBreadcrumbsUtilityClass(slot: string): string;
declare const breadcrumbsClasses: BreadcrumbsClasses;
export default breadcrumbsClasses;
