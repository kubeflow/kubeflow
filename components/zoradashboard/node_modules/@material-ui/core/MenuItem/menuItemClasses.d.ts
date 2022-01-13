export interface MenuItemClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Pseudo-class applied to the root element if keyboard focused. */
    focusVisible: string;
    /** Styles applied to the root element if dense. */
    dense: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: string;
    /** Styles applied to the root element if `divider={true}`. */
    divider: string;
    /** Styles applied to the inner `component` element unless `disableGutters={true}`. */
    gutters: string;
    /** Pseudo-class applied to the root element if `selected={true}`. */
    selected: string;
}
export declare type MenuItemClassKey = keyof MenuItemClasses;
export declare function getMenuItemUtilityClass(slot: string): string;
declare const menuItemClasses: MenuItemClasses;
export default menuItemClasses;
