export interface ListItemTextClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the Typography component if primary and secondary are set. */
    multiline: string;
    /** Styles applied to the Typography component if dense. */
    dense: string;
    /** Styles applied to the root element if `inset={true}`. */
    inset: string;
    /** Styles applied to the primary `Typography` component. */
    primary: string;
    /** Styles applied to the secondary `Typography` component. */
    secondary: string;
}
export declare type ListItemTextClassKey = keyof ListItemTextClasses;
export declare function getListItemTextUtilityClass(slot: string): string;
declare const listItemTextClasses: ListItemTextClasses;
export default listItemTextClasses;
