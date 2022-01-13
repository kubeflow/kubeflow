export interface MenuClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the Paper component. */
    paper: string;
    /** Styles applied to the List component via `MenuList`. */
    list: string;
}
export declare type MenuClassKey = keyof MenuClasses;
export declare function getMenuUtilityClass(slot: string): string;
declare const menuClasses: MenuClasses;
export default menuClasses;
