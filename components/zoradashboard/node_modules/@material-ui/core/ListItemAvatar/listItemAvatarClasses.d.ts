export interface ListItemAvatarClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`. */
    alignItemsFlexStart: string;
}
export declare type ListItemAvatarClassKey = keyof ListItemAvatarClasses;
export declare function getListItemAvatarUtilityClass(slot: string): string;
declare const listItemAvatarClasses: ListItemAvatarClasses;
export default listItemAvatarClasses;
