export interface ListItemButtonClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Pseudo-class applied to the `component`'s `focusVisibleClassName` prop. */
    focusVisible: string;
    /** Styles applied to the component element if dense. */
    dense: string;
    /** Styles applied to the component element if `alignItems="flex-start"`. */
    alignItemsFlexStart: string;
    /** Pseudo-class applied to the inner `component` element if `disabled={true}`. */
    disabled: string;
    /** Styles applied to the inner `component` element if `divider={true}`. */
    divider: string;
    /** Styles applied to the inner `component` element unless `disableGutters={true}`. */
    gutters: string;
    /** Pseudo-class applied to the root element if `selected={true}`. */
    selected: string;
}
export declare type ListItemButtonClassKey = keyof ListItemButtonClasses;
export declare function getListItemButtonUtilityClass(slot: string): string;
declare const listItemButtonClasses: ListItemButtonClasses;
export default listItemButtonClasses;
