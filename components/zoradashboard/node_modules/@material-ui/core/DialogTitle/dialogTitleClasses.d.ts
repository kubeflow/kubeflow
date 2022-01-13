export interface DialogTitleClasses {
    /** Styles applied to the root element. */
    root: string;
}
export declare type DialogTitleClassKey = keyof DialogTitleClasses;
export declare function getDialogTitleUtilityClass(slot: string): string;
declare const dialogTitleClasses: DialogTitleClasses;
export default dialogTitleClasses;
