export interface ToolbarClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element unless `disableGutters={true}`. */
    gutters: string;
    /** Styles applied to the root element if `variant="regular"`. */
    regular: string;
    /** Styles applied to the root element if `variant="dense"`. */
    dense: string;
}
export declare type ToolbarClassKey = keyof ToolbarClasses;
export declare function getToolbarUtilityClass(slot: string): string;
declare const toolbarClasses: ToolbarClasses;
export default toolbarClasses;
