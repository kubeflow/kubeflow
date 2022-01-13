export interface ListItemSecondaryActionClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element when the parent `ListItem` has `disableGutters={true}`. */
    disableGutters: string;
}
export declare type ListItemSecondaryActionClassKey = keyof ListItemSecondaryActionClasses;
export declare function getListItemSecondaryActionClassesUtilityClass(slot: string): string;
declare const listItemSecondaryActionClasses: ListItemSecondaryActionClasses;
export default listItemSecondaryActionClasses;
