export interface TreeViewClasses {
    /** Styles applied to the root element. */
    root: string;
}
export declare type TreeViewClassKey = keyof TreeViewClasses;
export declare function getTreeViewUtilityClass(slot: string): string;
declare const treeViewClasses: TreeViewClasses;
export default treeViewClasses;
