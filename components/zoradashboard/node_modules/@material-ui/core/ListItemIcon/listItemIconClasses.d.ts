export interface ListItemIconClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`. */
    alignItemsFlexStart: string;
}
export declare type ListItemIconClassKey = keyof ListItemIconClasses;
export declare function getListItemIconUtilityClass(slot: string): string;
declare const listItemIconClasses: ListItemIconClasses;
export default listItemIconClasses;
